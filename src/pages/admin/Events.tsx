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
import { useEventStore, EventData } from '@/lib/event-store';
import { PageHeader } from '@/components/admin/PageHeader';

const eventSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  date: z.date(),
  location: z.string().min(3, 'Location must be at least 3 characters'),
  image: z.string().url('Invalid URL'),
});

type EventFormData = z.infer<typeof eventSchema>;

const EventForm = ({ event, onSave, onCancel }: { event?: EventData, onSave: (data: EventData) => void, onCancel: () => void }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: event ? { ...event, date: new Date(event.date) } : { date: new Date() },
  });

  const onSubmit = (data: EventFormData) => {
    onSave({ ...event, ...data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Title</Label>
          <Input {...register('title')} />
          {errors.title && <p className="text-sm text-red-600">{errors.title.message}</p>}
        </div>
        <div className="space-y-2">
          <Label>Location</Label>
          <Input {...register('location')} />
          {errors.location && <p className="text-sm text-red-600">{errors.location.message}</p>}
        </div>
      </div>
      <div className="space-y-2">
        <Label>Date</Label>
        <Input type="date" {...register('date', { valueAsDate: true })} />
        {errors.date && <p className="text-sm text-red-600">{errors.date.message}</p>}
      </div>
      <div className="space-y-2">
        <Label>Image URL</Label>
        <Input {...register('image')} />
        {errors.image && <p className="text-sm text-red-600">{errors.image.message}</p>}
      </div>
      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea {...register('description')} />
        {errors.description && <p className="text-sm text-red-600">{errors.description.message}</p>}
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

const AdminEvents = () => {
  const { events, createEvent, updateEvent, deleteEvent } = useEventStore();
  const [editingEvent, setEditingEvent] = useState<EventData | undefined>(undefined);
  const [isCreating, setIsCreating] = useState(false);

  const handleSave = (data: EventData) => {
    if (isCreating) {
      createEvent(data);
    } else if (editingEvent) {
      updateEvent(editingEvent.id, data);
    }
    setEditingEvent(undefined);
    setIsCreating(false);
  };

  return (
    <div>
      <PageHeader title="Events" />
      <div className="p-4">
        <div className="flex justify-end mb-4">
          <Button onClick={() => { setIsCreating(true); setEditingEvent(undefined); }}>
            <PlusCircle className="mr-2 h-4 w-4" /> Create Event
          </Button>
        </div>

        {(isCreating || editingEvent) && (
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>{isCreating ? 'Create Event' : 'Edit Event'}</CardTitle>
            </CardHeader>
            <CardContent>
              <EventForm
                event={editingEvent}
                onSave={handleSave}
                onCancel={() => { setIsCreating(false); setEditingEvent(undefined); }}
              />
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Card key={event.id}>
              <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{event.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-sm text-muted-foreground">{new Date(event.date).toLocaleDateString()}</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setEditingEvent(event)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => deleteEvent(event.id)}>
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

export default AdminEvents;