import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface EventData {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  image: string;
}

interface EventStore {
  events: EventData[];
  createEvent: (eventData: Omit<EventData, 'id'>) => void;
  updateEvent: (id: string, updates: Partial<EventData>) => void;
  deleteEvent: (id: string) => void;
}

const defaultEvents: EventData[] = [
  {
    id: '1',
    title: 'Jazz Night',
    description: 'Enjoy a relaxing evening with live jazz music.',
    date: new Date(new Date().setDate(new Date().getDate() + 10)),
    location: 'Hotel Lounge',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=600&fit=crop'
  },
  {
    id: '2',
    title: 'Wine Tasting',
    description: 'Explore a selection of local and international wines.',
    date: new Date(new Date().setDate(new Date().getDate() + 20)),
    location: 'Rooftop Bar',
    image: 'https://images.unsplash.com/photo-1547595628-c61a2c4c4c05?w=800&h=600&fit=crop'
  }
];

export const useEventStore = create<EventStore>()(
  persist(
    (set) => ({
      events: defaultEvents,
      createEvent: (eventData) => {
        const newEvent: EventData = {
          ...eventData,
          id: Date.now().toString(),
        };
        set((state) => ({ events: [...state.events, newEvent] }));
      },
      updateEvent: (id, updates) => {
        set((state) => ({
          events: state.events.map((event) =>
            event.id === id ? { ...event, ...updates } : event
          ),
        }));
      },
      deleteEvent: (id) => {
        set((state) => ({ events: state.events.filter((event) => event.id !== id) }));
      },
    }),
    { name: 'event-storage' }
  )
);