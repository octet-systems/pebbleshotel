import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'admin' | 'manager';
  avatar?: string;
  createdAt: Date;
  lastLogin?: Date;
}

export interface AdminStats {
  totalBookings: number;
  totalRevenue: number;
  occupancyRate: number;
  averageRating: number;
  newBookingsToday: number;
  checkInsToday: number;
  checkOutsToday: number;
  upcomingArrivals: number;
}

interface AdminStore {
  // Authentication state
  isAuthenticated: boolean;
  user: AdminUser | null;
  loading: boolean;
  error: string | null;
  
  // Dashboard state
  stats: AdminStats;
  
  // Actions
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<AdminUser>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Data actions
  fetchStats: () => Promise<void>;
  
  // Utility
  hasPermission: (action: string) => boolean;
}

// Mock admin users for demo
const mockAdminUsers: AdminUser[] = [
  {
    id: '1',
    email: 'admin@pebbles.com',
    name: 'Hotel Administrator',
    role: 'super_admin',
    createdAt: new Date('2023-01-01'),
    lastLogin: new Date(),
  },
  {
    id: '2',
    email: 'manager@pebbles.com',
    name: 'Hotel Manager',
    role: 'manager',
    createdAt: new Date('2023-02-01'),
    lastLogin: new Date(),
  },
];

const defaultStats: AdminStats = {
  totalBookings: 0,
  totalRevenue: 0,
  occupancyRate: 0,
  averageRating: 0,
  newBookingsToday: 0,
  checkInsToday: 0,
  checkOutsToday: 0,
  upcomingArrivals: 0,
};

export const useAdminStore = create<AdminStore>()(
  persist(
    (set, get) => ({
      // Initial state
      isAuthenticated: false,
      user: null,
      loading: false,
      error: null,
      stats: defaultStats,

      // Authentication actions
      login: async (email: string, password: string) => {
        set({ loading: true, error: null });
        
        try {
          // Mock authentication - in production, this would be a real API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Demo credentials
          if ((email === 'admin@pebbles.com' && password === 'admin123') ||
              (email === 'manager@pebbles.com' && password === 'manager123')) {
            
            const user = mockAdminUsers.find(u => u.email === email);
            if (user) {
              const updatedUser = { ...user, lastLogin: new Date() };
              set({ 
                isAuthenticated: true, 
                user: updatedUser, 
                loading: false 
              });
              return true;
            }
          }
          
          set({ 
            error: 'Invalid email or password', 
            loading: false 
          });
          return false;
        } catch (error) {
          set({ 
            error: 'Login failed. Please try again.', 
            loading: false 
          });
          return false;
        }
      },

      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          error: null,
        });
      },

      updateUser: (updates) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        }));
      },

      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),

      // Data actions
      fetchStats: async () => {
        set({ loading: true });
        
        try {
          // Mock API call - in production, this would fetch real stats
          await new Promise(resolve => setTimeout(resolve, 800));
          
          // Calculate stats from booking store
          const bookingStore = await import('./booking-store');
          const bookings = bookingStore.useBookingStore.getState().bookings;
          const rooms = bookingStore.useBookingStore.getState().rooms;
          
          const today = new Date();
          const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
          const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000);
          
          const confirmedBookings = bookings.filter(b => b.status === 'confirmed');
          const totalRevenue = confirmedBookings.reduce((sum, b) => sum + b.totalPrice, 0);
          const occupancyRate = (confirmedBookings.length / rooms.length) * 100;
          const averageRating = rooms.reduce((sum, r) => sum + r.rating, 0) / rooms.length;
          
          const newBookingsToday = bookings.filter(b => 
            b.createdAt >= todayStart && b.createdAt < todayEnd
          ).length;
          
          const checkInsToday = bookings.filter(b => 
            b.checkIn >= todayStart && b.checkIn < todayEnd && b.status === 'confirmed'
          ).length;
          
          const checkOutsToday = bookings.filter(b => 
            b.checkOut >= todayStart && b.checkOut < todayEnd && b.status === 'confirmed'
          ).length;
          
          const upcomingArrivals = bookings.filter(b => 
            b.checkIn > today && b.status === 'confirmed'
          ).length;

          const stats: AdminStats = {
            totalBookings: bookings.length,
            totalRevenue,
            occupancyRate: Math.round(occupancyRate),
            averageRating: Math.round(averageRating * 10) / 10,
            newBookingsToday,
            checkInsToday,
            checkOutsToday,
            upcomingArrivals,
          };
          
          set({ stats, loading: false });
        } catch (error) {
          set({ error: 'Failed to fetch statistics', loading: false });
        }
      },

      // Utility functions
      hasPermission: (action: string) => {
        const { user } = get();
        if (!user) return false;
        
        // Define permissions based on role
        const permissions = {
          super_admin: ['*'], // All permissions
          admin: [
            'view_dashboard',
            'manage_bookings',
            'manage_rooms',
            'view_reports',
            'update_booking_status'
          ],
          manager: [
            'view_dashboard',
            'view_bookings',
            'update_booking_status',
            'view_reports'
          ],
        };
        
        const userPermissions = permissions[user.role] || [];
        return userPermissions.includes('*') || userPermissions.includes(action);
      },
    }),
    {
      name: 'admin-store',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    }
  )
);

// Helper functions
export const formatCurrency = (amount: number): string => {
  return `MK${amount.toLocaleString()}`;
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatDateTime = (date: Date): string => {
  return date.toLocaleString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
