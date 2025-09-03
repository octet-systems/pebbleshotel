import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Users, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BookingSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: '',
    roomType: '',
    name: '',
    email: '',
    phone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate booking logic
    const bookingId = Math.random().toString(36).substr(2, 9).toUpperCase();
    const totalNights = formData.checkIn && formData.checkOut ? 
      Math.ceil((new Date(formData.checkOut).getTime() - new Date(formData.checkIn).getTime()) / (1000 * 60 * 60 * 24)) : 1;
    
    const roomPrices = {
      deluxe: 280,
      premium: 320,
      suite: 450
    };
    
    const roomPrice = roomPrices[formData.roomType as keyof typeof roomPrices] || 280;
    const totalAmount = roomPrice * totalNights;
    
    toast({
      title: "Booking Confirmed!",
      description: `Booking ID: ${bookingId} | Total: $${totalAmount} for ${totalNights} night(s). We'll call +265 999 771 155 to confirm payment.`,
    });
    
    // Reset form
    setFormData({
      checkIn: '',
      checkOut: '',
      guests: '',
      roomType: '',
      name: '',
      email: '',
      phone: ''
    });
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
            Reserve Your Stay
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Plan your perfect escape with our easy booking system. Let us create an unforgettable experience for you.
          </p>
        </div>

        <Card className="shadow-medium">
          <CardHeader className="bg-sage text-white">
            <CardTitle className="text-2xl font-playfair text-center">
              Booking Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Date Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="checkin" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Check-in Date
                  </Label>
                  <Input
                    id="checkin"
                    type="date"
                    value={formData.checkIn}
                    onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="checkout" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Check-out Date
                  </Label>
                  <Input
                    id="checkout"
                    type="date"
                    value={formData.checkOut}
                    onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Room and Guests */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="guests" className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Number of Guests
                  </Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, guests: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select guests" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Guest</SelectItem>
                      <SelectItem value="2">2 Guests</SelectItem>
                      <SelectItem value="3">3 Guests</SelectItem>
                      <SelectItem value="4">4 Guests</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="roomtype">Room Type</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, roomType: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select room type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="deluxe">Deluxe Room - $280/night</SelectItem>
                      <SelectItem value="premium">Premium Room - $320/night</SelectItem>
                      <SelectItem value="suite">Luxury Suite - $450/night</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Guest Information */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-playfair font-semibold mb-4">Guest Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary-dark text-primary-foreground text-lg py-3"
              >
                Submit Booking Request
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default BookingSection;