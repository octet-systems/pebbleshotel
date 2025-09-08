import { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import {
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  LogIn,
  LogOut as CheckOutIcon,
  Star,
  Hotel,
  BarChart3,
  Settings,
  LogOut,
  Bell,
} from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { PageLoader } from '@/components/LoadingComponents';

import { useAdminStore, formatCurrency, formatDate } from '@/lib/admin-store';
import { useBookingStore } from '@/lib/booking-store';

const AdminDashboard = () => {
  const {
    isAuthenticated,
    user,
    loading,
    stats,
    fetchStats,
    logout,
  } = useAdminStore();

  const { bookings, rooms } = useBookingStore();

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const recentBookings = bookings
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const today = new Date();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000);

  const todayCheckIns = bookings.filter(
    (b) => new Date(b.checkIn) >= todayStart && new Date(b.checkIn) < todayEnd && b.status === 'confirmed'
  );

  const StatCard = ({ title, value, change, icon: Icon, color = 'text-primary' }: {
    title: string;
    value: string | number;
    change?: string;
    icon: React.ElementType;
    color?: string;
  }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className="text-xs text-muted-foreground">
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Hotel className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-playfair font-bold">Pebbles Admin</h1>
              </div>
              <Separator orientation="vertical" className="h-6" />
              <nav className="hidden md:flex items-center space-x-6">
                <Button asChild variant="ghost" size="sm" className="text-primary">
                  <Link to="/admin/dashboard">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Dashboard
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/admin/bookings">
                    Bookings
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/admin/rooms">
                    Rooms
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/admin/events">
                    Events
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/admin/reports">
                    Reports
                  </Link>
                </Button>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {user?.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{user?.role.replace('_', ' ')}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-playfair font-bold text-foreground mb-2">
            Welcome back, {user?.name.split(' ')[0]}!
          </h2>
          <p className="text-muted-foreground">
            Here's what's happening at your hotel today.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatCard
            title="Total Bookings"
            value={stats.totalBookings}
            change="+12% from last month"
            icon={Calendar}
          />
          <StatCard
            title="Revenue"
            value={formatCurrency(stats.totalRevenue)}
            change="+8% from last month"
            icon={DollarSign}
            color="text-green-600"
          />
          <StatCard
            title="Occupancy Rate"
            value={`${stats.occupancyRate}%`}
            change="+5% from last month"
            icon={Users}
            color="text-blue-600"
          />
          <StatCard
            title="Average Rating"
            value={stats.averageRating}
            change="★ Excellent"
            icon={Star}
            color="text-yellow-600"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="md:col-span-2 lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Today's Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <LogIn className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-700">{stats.checkInsToday}</div>
                  <p className="text-sm text-green-600">Check-ins</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <CheckOutIcon className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-700">{stats.checkOutsToday}</div>
                  <p className="text-sm text-blue-600">Check-outs</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <Calendar className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-700">{stats.newBookingsToday}</div>
                  <p className="text-sm text-purple-600">New Bookings</p>
                </div>
              </div>

              {todayCheckIns.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-semibold mb-3">Today's Check-ins</h4>
                  <div className="space-y-2">
                    {todayCheckIns.slice(0, 3).map((booking) => {
                      const room = rooms.find(r => r.id === booking.roomId);
                      return (
                        <div key={booking.id} className="flex items-center justify-between p-2 bg-muted rounded">
                          <div>
                            <p className="font-medium">{booking.guests[0]?.firstName} {booking.guests[0]?.lastName}</p>
                            <p className="text-sm text-muted-foreground">{room?.name}</p>
                          </div>
                          <Badge variant="secondary">{formatCurrency(booking.totalPrice)}</Badge>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage your hotel efficiently</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full justify-start" variant="outline">
                <Link to="/admin/bookings">
                  <Calendar className="mr-2 h-4 w-4" />
                  View All Bookings
                </Link>
              </Button>
              <Button asChild className="w-full justify-start" variant="outline">
                <Link to="/admin/rooms">
                  <Hotel className="mr-2 h-4 w-4" />
                  Manage Rooms
                </Link>
              </Button>
              <Button asChild className="w-full justify-start" variant="outline">
                <Link to="/admin/events">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Events
                </Link>
              </Button>
              <Button asChild className="w-full justify-start" variant="outline">
                <Link to="/admin/reports">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Reports
                </Link>
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Hotel Settings
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Bookings</CardTitle>
              <Button asChild variant="outline" size="sm">
                <Link to="/admin/bookings">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {recentBookings.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No bookings yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentBookings.map((booking) => {
                  const room = rooms.find(r => r.id === booking.roomId);
                  return (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">
                            {booking.guests[0]?.firstName} {booking.guests[0]?.lastName}
                          </p>
                          <Badge
                            variant={
                              booking.status === 'confirmed'
                                ? 'default'
                                : booking.status === 'pending'
                                ? 'secondary'
                                : 'destructive'
                            }
                          >
                            {booking.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {room?.name} • {formatDate(new Date(booking.checkIn))} - {formatDate(new Date(booking.checkOut))}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Confirmation: {booking.confirmationCode}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatCurrency(booking.totalPrice)}</p>
                        <p className="text-sm text-muted-foreground">
                          {booking.adultCount} guest{booking.adultCount > 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;
