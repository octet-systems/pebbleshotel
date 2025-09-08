import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDays } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Users, MapPin, Loader2, CreditCard, Shield } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { LoadingSpinner } from '@/components/LoadingComponents';
import { DatePicker } from '@/components/DatePicker';
import { useBookingStore } from '@/lib/booking-store';

const BookingSection = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { rooms, updateCurrentBooking, setSelectedRoom, resetBookingFlow } = useBookingStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: '',
    roomType: '',
    name: '',
    email: '',
    phone: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    resetBookingFlow();

    // Find a room that matches the selected type
    const selectedRoomObject = rooms.find(r => r.roomType === formData.roomType);
    if (selectedRoomObject) {
      setSelectedRoom(selectedRoomObject);
    }

    // Update booking details in the store
    updateCurrentBooking({
      checkIn: formData.checkIn ? new Date(formData.checkIn + 'T00:00:00') : new Date(),
      checkOut: formData.checkOut ? new Date(formData.checkOut + 'T00:00:00') : addDays(new Date(), 1),
      adultCount: formData.guests ? parseInt(formData.guests, 10) : 1,
      childrenCount: 0,
      guests: [{
        firstName: formData.name.split(' ')[0] || 'Guest',
        lastName: formData.name.split(' ')[1] || '',
        email: formData.email,
        phone: formData.phone,
        isMainGuest: true,
      }],
    });

    // Simulate some processing
    await new Promise(resolve => setTimeout(resolve, 500));

    setIsSubmitting(false);
    navigate('/booking-demo');
  };

  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-foreground mb-4 text-responsive-lg">
            Reserve Your Stay
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto text-balance text-responsive">
            Plan your perfect escape with our easy booking system. Let us create an unforgettable experience for you.
          </p>
        </div>

        <Card className="shadow-medium mobile-optimized">
          <CardHeader className="bg-sage text-white p-4 md:p-6">
            <CardTitle className="text-xl md:text-2xl font-playfair text-center">
              Booking Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              {/* Date Selection with Enhanced DatePicker */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="checkin" className="flex items-center gap-2 text-sm md:text-base">
                    <Calendar className="w-4 h-4" />
                    Check-in Date
                  </Label>
                  <DatePicker
                    value={formData.checkIn}
                    onChange={(date) => setFormData({ ...formData, checkIn: date })}
                    placeholder="Select check-in date"
                    maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="checkout" className="flex items-center gap-2 text-sm md:text-base">
                    <Calendar className="w-4 h-4" />
                    Check-out Date
                  </Label>
                  <DatePicker
                    value={formData.checkOut}
                    onChange={(date) => setFormData({ ...formData, checkOut: date })}
                    placeholder="Select check-out date"
                    minDate={formData.checkIn || undefined}
                    maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Room and Guests */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="guests" className="flex items-center gap-2 text-sm md:text-base">
                    <Users className="w-4 h-4" />
                    Number of Guests
                  </Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, guests: value })}>
                    <SelectTrigger className="touch-target mobile-optimized">
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
                  <Label htmlFor="roomtype" className="text-sm md:text-base">Room Type</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, roomType: value })}>
                    <SelectTrigger className="touch-target mobile-optimized">
                      <SelectValue placeholder="Select room type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="deluxe">Deluxe Room - MK 420,000/night</SelectItem>
                      <SelectItem value="premium">Premium Room - MK 480,000/night</SelectItem>
                      <SelectItem value="suite">Luxury Suite - MK 675,000/night</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Guest Information */}
              <div className="border-t pt-4 md:pt-6">
                <h3 className="text-base md:text-lg font-playfair font-semibold mb-4">Guest Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm md:text-base">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="touch-target mobile-optimized"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm md:text-base">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="touch-target mobile-optimized"
                      required
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <Label htmlFor="phone" className="text-sm md:text-base">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="touch-target mobile-optimized"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary-dark text-primary-foreground text-base md:text-lg py-3 md:py-4 touch-target mobile-optimized btn-modern hover-lift rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  'Submit Booking Request'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default BookingSection;