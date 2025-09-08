import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Types for booking system
export interface Room {
  id: number | string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  guests: number;
  size: number | string;
  rating: number;
  reviews: number;
  amenities: string[];
  featured?: boolean;
  available: boolean;
  roomType: 'suite' | 'deluxe' | 'premium' | 'standard';
  category?: string;
  beds?: string;
}

export interface Guest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age?: number;
  isMainGuest?: boolean;
}

export interface BookingData {
  id?: string;
  roomId: number | string;
  checkIn: Date;
  checkOut: Date;
  guests: Guest[];
  adultCount: number;
  childrenCount: number;
  specialRequests?: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  createdAt: Date;
  confirmationCode?: string;
}

export interface BookingFilters {
  dateRange?: { from: Date; to: Date };
  status?: BookingData['status'];
  roomType?: Room['roomType'];
  priceRange?: { min: number; max: number };
}

interface BookingStore {
  currentBooking: Partial<BookingData> | null;
  selectedRoom: Room | null;
  bookingStep: 'select-room' | 'select-dates' | 'guest-details' | 'payment' | 'confirmation';

  bookings: BookingData[];
  rooms: Room[];

  loading: boolean;
  error: string | null;

  setCurrentBooking: (booking: Partial<BookingData>) => void;
  updateCurrentBooking: (updates: Partial<BookingData>) => void;
  setSelectedRoom: (room: Room | null) => void;
  setBookingStep: (step: BookingStore['bookingStep']) => void;

  createBooking: (bookingData: Omit<BookingData, 'id' | 'createdAt' | 'confirmationCode'>) => Promise<string>;
  updateBooking: (id: string, updates: Partial<BookingData>) => Promise<void>;
  cancelBooking: (id: string) => Promise<void>;
  getBookingById: (id: string) => BookingData | undefined;
  getBookingsByRoom: (roomId: number | string) => BookingData[];

  setRooms: (rooms: Room[]) => void;
  createRoom: (roomData: Omit<Room, 'id'>) => void;
  updateRoom: (id: number | string, updates: Partial<Room>) => void;
  deleteRoom: (id: number | string) => void;
  updateRoomAvailability: (roomId: number | string, available: boolean) => void;
  getRoomById: (id: number | string) => Room | undefined;
  getAvailableRooms: (checkIn: Date, checkOut: Date, guests: number) => Room[];

  calculateTotalPrice: (roomId: number | string, checkIn: Date, checkOut: Date) => number;
  isRoomAvailable: (roomId: number | string, checkIn: Date, checkOut: Date) => boolean;
  generateConfirmationCode: () => string;
  resetBookingFlow: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

// Default room data
const defaultRooms: Room[] = [
  {
    id: '1',
    name: 'Luxury Suite',
    description: 'Spacious suite with panoramic views...',
    price: 450000,
    originalPrice: 520000,
    image: 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&h=600&fit=crop',
    guests: 3,
    size: 65,
    rating: 4.9,
    reviews: 124,
    amenities: ['King Bed', 'Living Area', 'City View', 'Minibar', 'Jacuzzi', 'Butler Service'],
    featured: true,
    available: true,
    roomType: 'suite',
    category: 'suite',
    beds: '1 King Bed, 1 Queen Bed'
  },
  {
    id: '2',
    name: 'Deluxe Room',
    description: 'Elegantly appointed room...',
    price: 280000,
    originalPrice: 320000,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop',
    guests: 2,
    size: 35,
    rating: 4.7,
    reviews: 89,
    amenities: ['Queen Bed', 'Work Desk', 'Garden View', 'Coffee Maker', 'Mini Fridge'],
    available: true,
    roomType: 'deluxe',
    category: 'deluxe',
    beds: '1 King Bed'
  },
  {
    id: '3',
    name: 'Premium Room',
    description: 'Contemporary room with sophisticated décor...',
    price: 320000,
    originalPrice: 380000,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop',
    guests: 2,
    size: 40,
    rating: 4.8,
    reviews: 67,
    amenities: ['King Bed', 'Balcony', 'Mountain View', 'Tea Service', 'Bathrobes'],
    available: true,
    roomType: 'premium',
    category: 'deluxe',
    beds: '1 King Bed, 1 Sofa Bed'
  },
  {
    id: '4',
    name: 'Standard Room',
    description: 'Comfortable and well-appointed...',
    price: 180000,
    originalPrice: 220000,
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop',
    guests: 2,
    size: 25,
    rating: 4.5,
    reviews: 156,
    amenities: ['Double Bed', 'City View', 'WiFi', 'Air Conditioning'],
    available: true,
    roomType: 'standard',
    category: 'standard',
    beds: '2 Queen Beds'
  }
];

// Placeholder booking data
const defaultBookings: BookingData[] = [
  {
    id: '1',
    roomId: '1',
    checkIn: new Date(new Date().setDate(new Date().getDate() - 5)),
    checkOut: new Date(new Date().setDate(new Date().getDate() - 2)),
    guests: [{ firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', phone: '1234567890' }],
    adultCount: 2,
    childrenCount: 0,
    totalPrice: 1350000,
    status: 'completed',
    paymentStatus: 'paid',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 10)),
    confirmationCode: 'JD123XYZ'
  },
  {
    id: '2',
    roomId: '2',
    checkIn: new Date(),
    checkOut: new Date(new Date().setDate(new Date().getDate() + 3)),
    guests: [{ firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', phone: '0987654321' }],
    adultCount: 1,
    childrenCount: 1,
    totalPrice: 840000,
    status: 'confirmed',
    paymentStatus: 'paid',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    confirmationCode: 'JS456ABC'
  },
  {
    id: '3',
    roomId: '3',
    checkIn: new Date(new Date().setDate(new Date().getDate() + 2)),
    checkOut: new Date(new Date().setDate(new Date().getDate() + 5)),
    guests: [{ firstName: 'Peter', lastName: 'Jones', email: 'peter.jones@example.com', phone: '1122334455' }],
    adultCount: 2,
    childrenCount: 0,
    totalPrice: 960000,
    status: 'pending',
    paymentStatus: 'pending',
    createdAt: new Date(),
    confirmationCode: 'PJ789DEF'
  }
];

export const useBookingStore = create<BookingStore>()(
  persist(
    (set, get) => ({
      // Initial state
      currentBooking: null,
      selectedRoom: null,
      bookingStep: 'select-room',
      bookings: defaultBookings,
      rooms: defaultRooms,
      loading: false,
      error: null,

      // State setters
      setCurrentBooking: (booking) => set({ currentBooking: booking }),
      updateCurrentBooking: (updates) =>
        set((state) => ({
          currentBooking: { ...state.currentBooking, ...updates }
        })),
      setSelectedRoom: (room) => set({ selectedRoom: room }),
      setBookingStep: (step) => set({ bookingStep: step }),

      // Booking operations
      createBooking: async (bookingData) => {
        set({ loading: true, error: null });
        try {
          const confirmationCode = get().generateConfirmationCode();
          const id = Date.now().toString();
          const newBooking: BookingData = {
            ...bookingData,
            id,
            confirmationCode,
            createdAt: new Date()
          };
          set((state) => ({
            bookings: [...state.bookings, newBooking],
            loading: false
          }));
          return confirmationCode;
        } catch (error) {
          set({ error: 'Failed to create booking', loading: false });
          throw error;
        }
      },

      updateBooking: async (id, updates) => {
        set({ loading: true, error: null });
        try {
          set((state) => ({
            bookings: state.bookings.map((booking) =>
              booking.id === id
                ? { ...booking, ...updates }
                : booking
            ),
            loading: false
          }));
        } catch (error) {
          set({ error: 'Failed to update booking', loading: false });
          throw error;
        }
      },

      cancelBooking: async (id) => {
        set({ loading: true, error: null });
        try {
          set((state) => ({
            bookings: state.bookings.map((booking) =>
              booking.id === id ? { ...booking, status: 'cancelled' } : booking
            ),
            loading: false
          }));
        } catch (error) {
          set({ error: 'Failed to cancel booking', loading: false });
          throw error;
        }
      },

      getBookingById: (id) => get().bookings.find((booking) => booking.id === id),
      getBookingsByRoom: (roomId) => get().bookings.filter((booking) => booking.roomId === roomId),

      // Room operations
      setRooms: (rooms) => set({ rooms }),
      createRoom: (roomData) => {
        const newRoom: Room = {
          ...roomData,
          id: Date.now().toString(),
        };
        set((state) => ({ rooms: [...state.rooms, newRoom] }));
      },
      updateRoom: (id, updates) => {
        set((state) => ({
          rooms: state.rooms.map((room) =>
            room.id === id ? { ...room, ...updates } : room
          ),
        }));
      },
      deleteRoom: (id) => {
        set((state) => ({ rooms: state.rooms.filter((room) => room.id !== id) }));
      },
      updateRoomAvailability: (roomId, available) =>
        set((state) => ({
          rooms: state.rooms.map((room) =>
            room.id === roomId ? { ...room, available } : room
          )
        })),
      getRoomById: (id) => get().rooms.find((room) => room.id === id),

      getAvailableRooms: (checkIn, checkOut, guests) => {
        return get().rooms.filter((room) => {
          const overlaps = get()
            .getBookingsByRoom(room.id)
            .some((booking) => {
              const bIn = new Date(booking.checkIn).getTime();
              const bOut = new Date(booking.checkOut).getTime();
              return (
                (checkIn.getTime() < bOut && checkOut.getTime() > bIn) &&
                booking.status !== 'cancelled'
              );
            });
          return room.available && room.guests >= guests && !overlaps;
        });
      },

      calculateTotalPrice: (roomId, checkIn, checkOut) => {
        const room = get().getRoomById(roomId);
        if (!room) return 0;
        const nights = Math.ceil(
          (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
        );
        return room.price * nights;
      },

      isRoomAvailable: (roomId, checkIn, checkOut) => {
        const room = get().getRoomById(roomId);
        if (!room) return false;
        return get()
          .getAvailableRooms(checkIn, checkOut, 1)
          .some((r) => r.id === roomId);
      },

      generateConfirmationCode: () =>
        Math.random().toString(36).substring(2, 10).toUpperCase(),

      resetBookingFlow: () =>
        set({
          currentBooking: null,
          selectedRoom: null,
          bookingStep: 'select-room'
        }),

      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error })
    }),
    { name: 'booking-storage' }
  )
);