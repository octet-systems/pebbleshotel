import { useState } from 'react';
import { useBookingStore, BookingData } from '@/lib/booking-store';
import { PageHeader } from '@/components/admin/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

const AdminBookings = () => {
  const { bookings, updateBooking } = useBookingStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredBookings = bookings
    .filter((booking) => {
      if (statusFilter !== 'all' && booking.status !== statusFilter) {
        return false;
      }
      if (searchTerm === '') {
        return true;
      }
      const guest = booking.guests[0];
      const lowerCaseSearch = searchTerm.toLowerCase();
      return (
        guest.firstName.toLowerCase().includes(lowerCaseSearch) ||
        guest.lastName.toLowerCase().includes(lowerCaseSearch) ||
        booking.confirmationCode?.toLowerCase().includes(lowerCaseSearch)
      );
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div>
      <PageHeader title="Bookings" />
      <div className="p-4">
        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle>All Bookings</CardTitle>
              <div className="flex gap-2">
                <Input
                  placeholder="Search by name or code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
                <Select onValueChange={setStatusFilter} defaultValue="all">
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Guest</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => {
                  const room = useBookingStore.getState().getRoomById(booking.roomId);
                  return (
                    <TableRow key={booking.id}>
                      <TableCell>
                        <div className="font-medium">{booking.guests[0].firstName} {booking.guests[0].lastName}</div>
                        <div className="text-sm text-muted-foreground">{booking.confirmationCode}</div>
                      </TableCell>
                      <TableCell>
                        {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{room?.name}</TableCell>
                      <TableCell>
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
                      </TableCell>
                      <TableCell>{booking.totalPrice}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminBookings;
