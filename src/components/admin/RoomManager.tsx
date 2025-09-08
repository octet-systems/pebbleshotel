import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Plus,
  Save,
  X,
  Edit,
  Trash2,
  Star,
  Wifi,
  Tv,
  Car,
  Users,
  Bed,
  Bath,
  Coffee
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

import { ImageUpload } from './ImageUpload';
import { useBookingStore, Room, RoomType, formatCurrency } from '@/lib/booking-store';
import { LoadingSpinner } from '@/components/LoadingComponents';

const roomSchema = z.object({
  name: z.string().min(1, 'Room name is required'),
  type: z.enum(['standard', 'deluxe', 'suite', 'executive']),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  pricePerNight: z.number().min(1, 'Price must be greater than 0'),
  maxGuests: z.number().min(1, 'Max guests must be at least 1').max(10, 'Max guests cannot exceed 10'),
  size: z.number().min(1, 'Room size is required'),
  bedType: z.string().min(1, 'Bed type is required'),
  amenities: z.array(z.string()).min(1, 'At least one amenity is required'),
  available: z.boolean().default(true),
  featured: z.boolean().default(false),
});

type RoomFormData = z.infer<typeof roomSchema>;

const availableAmenities = [
  { id: 'wifi', label: 'Free WiFi', icon: Wifi },
  { id: 'tv', label: 'Smart TV', icon: Tv },
  { id: 'parking', label: 'Free Parking', icon: Car },
  { id: 'breakfast', label: 'Breakfast Included', icon: Coffee },
  { id: 'balcony', label: 'Private Balcony', icon: Users },
  { id: 'bathtub', label: 'Bathtub', icon: Bath },
  { id: 'minibar', label: 'Mini Bar', icon: Coffee },
  { id: 'aircon', label: 'Air Conditioning', icon: Users },
  { id: 'safe', label: 'In-room Safe', icon: Users },
  { id: 'roomservice', label: '24/7 Room Service', icon: Coffee }
];

const bedTypes = [
  'Single Bed',
  'Twin Beds',
  'Double Bed',
  'Queen Bed',
  'King Bed',
  'Sofa Bed'
];

interface RoomManagerProps {
  onClose?: () => void;
}

export const RoomManager: React.FC<RoomManagerProps> = ({ onClose }) => {
  const { rooms, createRoom, updateRoom, deleteRoom, loading } = useBookingStore();
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);

  const form = useForm<RoomFormData>({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      name: '',
      type: 'standard',
      description: '',
      pricePerNight: 0,
      maxGuests: 2,
      size: 0,
      bedType: '',
      amenities: [],
      available: true,
      featured: false,
    },
  });

  const startEdit = (room: Room) => {
    setSelectedRoom(room);
    setIsEditing(true);
    setUploadedImages([]);
    
    // Populate form with room data
    form.reset({
      name: room.name,
      type: room.type as RoomFormData['type'],
      description: room.description,
      pricePerNight: room.pricePerNight,
      maxGuests: room.maxGuests,
      size: room.size,
      bedType: room.bedType,
      amenities: room.amenities,
      available: room.available,
      featured: room.featured,
    });
  };

  const startCreate = () => {
    setSelectedRoom(null);
    setIsEditing(true);
    setUploadedImages([]);
    form.reset();
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setSelectedRoom(null);
    setUploadedImages([]);
    form.reset();
  };

  const onSubmit = async (data: RoomFormData) => {
    try {
      // Simulate image upload URLs (in real app, these would be uploaded to a server)
      const imageUrls = uploadedImages.map((file, index) => 
        URL.createObjectURL(file) // In production, this would be the actual uploaded URL
      );

      const roomData = {
        ...data,
        images: selectedRoom ? [...selectedRoom.images, ...imageUrls] : imageUrls,
        rating: selectedRoom?.rating || 4.5, // Default rating for new rooms
      };

      if (selectedRoom) {
        await updateRoom(selectedRoom.id, roomData);
      } else {
        await createRoom(roomData);
      }

      cancelEdit();
    } catch (error) {
      console.error('Failed to save room:', error);
    }
  };

  const handleDelete = async (roomId: string) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        await deleteRoom(roomId);
      } catch (error) {
        console.error('Failed to delete room:', error);
      }
    }
  };

  const toggleAmenity = (amenityId: string) => {
    const currentAmenities = form.getValues('amenities');
    const updatedAmenities = currentAmenities.includes(amenityId)
      ? currentAmenities.filter(id => id !== amenityId)
      : [...currentAmenities, amenityId];
    
    form.setValue('amenities', updatedAmenities);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-playfair font-bold">Room Management</h2>
          <p className="text-muted-foreground">Create and manage hotel rooms</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={startCreate} className="bg-primary hover:bg-primary-dark">
            <Plus className="w-4 h-4 mr-2" />
            Add New Room
          </Button>
          {onClose && (
            <Button variant="outline" onClick={onClose}>
              <X className="w-4 h-4 mr-2" />
              Close
            </Button>
          )}
        </div>
      </div>

      {/* Room Form */}
      {isEditing && (
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {selectedRoom ? (
                <>
                  <Edit className="w-5 h-5" />
                  Edit Room: {selectedRoom.name}
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Create New Room
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Room Name</Label>
                  <Input
                    id="name"
                    {...form.register('name')}
                    placeholder="e.g., Deluxe Garden View"
                  />
                  {form.formState.errors.name && (
                    <p className="text-sm text-red-600">{form.formState.errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Room Type</Label>
                  <Controller
                    name="type"
                    control={form.control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select room type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="deluxe">Deluxe</SelectItem>
                          <SelectItem value="suite">Suite</SelectItem>
                          <SelectItem value="executive">Executive</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pricePerNight">Price per Night (MK)</Label>
                  <Input
                    id="pricePerNight"
                    type="number"
                    {...form.register('pricePerNight', { valueAsNumber: true })}
                    placeholder="0"
                  />
                  {form.formState.errors.pricePerNight && (
                    <p className="text-sm text-red-600">{form.formState.errors.pricePerNight.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxGuests">Max Guests</Label>
                  <Input
                    id="maxGuests"
                    type="number"
                    {...form.register('maxGuests', { valueAsNumber: true })}
                    min="1"
                    max="10"
                  />
                  {form.formState.errors.maxGuests && (
                    <p className="text-sm text-red-600">{form.formState.errors.maxGuests.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="size">Room Size (sq ft)</Label>
                  <Input
                    id="size"
                    type="number"
                    {...form.register('size', { valueAsNumber: true })}
                    placeholder="e.g., 350"
                  />
                  {form.formState.errors.size && (
                    <p className="text-sm text-red-600">{form.formState.errors.size.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bedType">Bed Type</Label>
                  <Controller
                    name="bedType"
                    control={form.control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select bed type" />
                        </SelectTrigger>
                        <SelectContent>
                          {bedTypes.map((bed) => (
                            <SelectItem key={bed} value={bed}>{bed}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  {...form.register('description')}
                  placeholder="Describe the room's features, views, and atmosphere..."
                  className="min-h-[100px]"
                />
                {form.formState.errors.description && (
                  <p className="text-sm text-red-600">{form.formState.errors.description.message}</p>
                )}
              </div>

              {/* Amenities */}
              <div className="space-y-4">
                <Label>Amenities</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {availableAmenities.map((amenity) => {
                    const Icon = amenity.icon;
                    const isSelected = form.watch('amenities').includes(amenity.id);
                    
                    return (
                      <Button
                        key={amenity.id}
                        type="button"
                        variant={isSelected ? "default" : "outline"}
                        className="flex items-center gap-2 h-auto p-3"
                        onClick={() => toggleAmenity(amenity.id)}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-xs">{amenity.label}</span>
                      </Button>
                    );
                  })}
                </div>
                {form.formState.errors.amenities && (
                  <p className="text-sm text-red-600">{form.formState.errors.amenities.message}</p>
                )}
              </div>

              {/* Settings */}
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center space-x-2">
                  <Controller
                    name="available"
                    control={form.control}
                    render={({ field }) => (
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                  <Label>Room Available</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Controller
                    name="featured"
                    control={form.control}
                    render={({ field }) => (
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                  <Label>Featured Room</Label>
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-4">
                <Label>Room Images</Label>
                <ImageUpload
                  onImagesChange={setUploadedImages}
                  maxFiles={8}
                  existingImages={selectedRoom?.images || []}
                />
              </div>

              {/* Form Actions */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary-dark"
                  disabled={loading}
                >
                  {loading ? (
                    <LoadingSpinner size="sm" className="mr-2" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  {selectedRoom ? 'Update Room' : 'Create Room'}
                </Button>
                <Button type="button" variant="outline" onClick={cancelEdit}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Rooms List */}
      {!isEditing && (
        <div className="grid gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Current Rooms ({rooms.length})</h3>
          </div>

          <div className="grid gap-4">
            {rooms.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <Bed className="w-16 h-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Rooms Yet</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    Create your first room to get started with room management.
                  </p>
                  <Button onClick={startCreate}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add First Room
                  </Button>
                </CardContent>
              </Card>
            ) : (
              rooms.map((room) => (
                <Card key={room.id} className="overflow-hidden">
                  <div className="flex">
                    {/* Room Image */}
                    <div className="w-48 h-32 flex-shrink-0">
                      <img
                        src={room.images[0] || '/images/rooms/placeholder.jpg'}
                        alt={room.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Room Details */}
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-lg">{room.name}</h4>
                            {room.featured && (
                              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                                <Star className="w-3 h-3 mr-1" />
                                Featured
                              </Badge>
                            )}
                            <Badge variant={room.available ? "success" : "secondary"}>
                              {room.available ? 'Available' : 'Unavailable'}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground text-sm mb-2 capitalize">
                            {room.type} • {room.maxGuests} guests • {room.size} sq ft • {room.bedType}
                          </p>
                          <p className="text-sm mb-3 line-clamp-2">{room.description}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {room.maxGuests} guests
                            </span>
                            <span>{room.amenities.length} amenities</span>
                            <span className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500" />
                              {room.rating}
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary mb-2">
                            {formatCurrency(room.pricePerNight)}
                          </p>
                          <p className="text-sm text-muted-foreground mb-3">per night</p>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => startEdit(room)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDelete(room.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
