import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useBookingStore, Room } from '@/lib/booking-store';
import { PageHeader } from '@/components/admin/PageHeader';

const roomSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().min(0, 'Price must be a positive number'),
  guests: z.number().min(1, 'Guests must be at least 1'),
  size: z.string(),
  image: z.string().url('Invalid URL'),
  roomType: z.enum(['suite', 'deluxe', 'premium', 'standard']),
  amenities: z.array(z.string()),
  available: z.boolean(),
  featured: z.boolean(),
  rating: z.number().min(0).max(5),
  reviews: z.number().min(0),
});

type RoomFormData = z.infer<typeof roomSchema>;

const RoomForm = ({ room, onSave, onCancel }: { room?: Room, onSave: (data: Omit<Room, 'id'> | Room) => void, onCancel: () => void }) => {
  const { register, handleSubmit, formState: { errors }, control } = useForm<RoomFormData>({
    resolver: zodResolver(roomSchema),
    defaultValues: room ? { ...room, size: room.size.toString() } : { amenities: [], available: true, featured: false, rating: 4.5, reviews: 0 },
  });

  const onSubmit = (data: RoomFormData) => {
    if (room) {
      onSave({ ...room, ...data });
    } else {
      onSave(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Name</Label>
          <Input {...register('name')} />
          {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label>Price</Label>
          <Input type="number" {...register('price', { valueAsNumber: true })} />
          {errors.price && <p className="text-sm text-red-600">{errors.price.message}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Guests</Label>
          <Input type="number" {...register('guests', { valueAsNumber: true })} />
          {errors.guests && <p className="text-sm text-red-600">{errors.guests.message}</p>}
        </div>
        <div className="space-y-2">
          <Label>Size (sqm)</Label>
          <Input {...register('size')} />
          {errors.size && <p className="text-sm text-red-600">{errors.size.message}</p>}
        </div>
      </div>
      <div className="space-y-2">
        <Label>Image URL</Label>
        <Input {...register('image')} />
        {errors.image && <p className="text-sm text-red-600">{errors.image.message}</p>}
      </div>
      <div className="space-y-2">
        <Label>Room Type</Label>
        <select {...register('roomType')} className="w-full p-2 border rounded">
          <option value="standard">Standard</option>
          <option value="deluxe">Deluxe</option>
          <option value="premium">Premium</option>
          <option value="suite">Suite</option>
        </select>
        {errors.roomType && <p className="text-sm text-red-600">{errors.roomType.message}</p>}
      </div>
      <div className="space-y-2">
        <Label>Amenities (comma separated)</Label>
        <Input {...register('amenities', { setValueAs: (v) => v.split(',').map(s => s.trim()) })} />
      </div>
      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea {...register('description')} />
        {errors.description && <p className="text-sm text-red-600">{errors.description.message}</p>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox id="available" {...register('available')} />
          <Label htmlFor="available">Available</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="featured" {...register('featured')} />
          <Label htmlFor="featured">Featured</Label>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Rating</Label>
          <Input type="number" step="0.1" {...register('rating', { valueAsNumber: true })} />
          {errors.rating && <p className="text-sm text-red-600">{errors.rating.message}</p>}
        </div>
        <div className="space-y-2">
          <Label>Reviews</Label>
          <Input type="number" {...register('reviews', { valueAsNumber: true })} />
          {errors.reviews && <p className="text-sm text-red-600">{errors.reviews.message}</p>}
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

const AdminRooms = () => {
  const { rooms, createRoom, updateRoom, deleteRoom } = useBookingStore();
  const [editingRoom, setEditingRoom] = useState<Room | undefined>(undefined);
  const [isCreating, setIsCreating] = useState(false);

  const handleSave = (data: Omit<Room, 'id'> | Room) => {
    if ('id' in data) {
      updateRoom(data.id, data);
    } else {
      createRoom(data);
    }
    setEditingRoom(undefined);
    setIsCreating(false);
  };

  return (
    <div>
      <PageHeader title="Rooms" />
      <div className="p-4">
        <div className="flex justify-end mb-4">
          <Button onClick={() => { setIsCreating(true); setEditingRoom(undefined); }}>
            <PlusCircle className="mr-2 h-4 w-4" /> Create Room
          </Button>
        </div>

        {(isCreating || editingRoom) && (
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>{isCreating ? 'Create Room' : 'Edit Room'}</CardTitle>
            </CardHeader>
            <CardContent>
              <RoomForm
                room={editingRoom}
                onSave={handleSave}
                onCancel={() => { setIsCreating(false); setEditingRoom(undefined); }}
              />
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <Card key={room.id}>
              <img src={room.image} alt={room.name} className="w-full h-48 object-cover" />
              <CardHeader>
                <CardTitle>{room.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{room.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-sm text-muted-foreground">{room.price} / night</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setEditingRoom(room)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => deleteRoom(room.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminRooms;