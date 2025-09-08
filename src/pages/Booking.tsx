import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { BookingForm } from '@/components/BookingForm';
import { useBookingStore } from '@/lib/booking-store';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Calendar, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Booking = () => {
  const navigate = useNavigate();
  const { bookingStep, currentBooking, resetBookingFlow } = useBookingStore();
  const [confirmationCode, setConfirmationCode] = useState<string>('');

  // This page is deprecated in favor of the demo page.
  // Redirect any traffic to the new booking demo experience.
  useEffect(() => {
    navigate('/booking-demo', { replace: true });
  }, [navigate]);

  const handleBookingComplete = (code: string) => {
    setConfirmationCode(code);
  };

  // Always show the form if there's no confirmation code, otherwise show confirmation
  const showForm = !confirmationCode;

  return (
    <div className="min-h-screen scroll-smooth text-rendering-optimized">
      <Navigation />
      <main id="main-content" className="pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
              Book Your Stay
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Complete your reservation in just a few steps. We're here to make your booking experience as smooth as possible.
            </p>
          </div>

          {/* Booking Form - now always shows unless there's a confirmation code */}
          {showForm && (
            <BookingForm onBookingComplete={handleBookingComplete} />
          )}

          {/* Confirmation - only shows after booking is complete */}
          {!showForm && (
            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                </div>
                <CardTitle className="text-3xl font-playfair text-green-700 mb-2">
                  Booking Confirmed!
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">
                    Confirmation Details
                  </h3>
                  <div className="space-y-2 text-left">
                    <div className="flex justify-between">
                      <span className="text-green-700">Confirmation Code:</span>
                      <span className="font-mono font-bold text-green-800">{confirmationCode}</span>
                    </div>
                    {currentBooking?.roomId && (
                      <div className="flex justify-between">
                        <span className="text-green-700">Room:</span>
                        <span className="text-green-800">{useBookingStore.getState().getRoomById(currentBooking.roomId)?.name}</span>
                      </div>
                    )}
                    {currentBooking?.totalPrice && (
                      <div className="flex justify-between">
                        <span className="text-green-700">Total Amount:</span>
                        <span className="font-semibold text-green-800">MK{currentBooking.totalPrice.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span>Confirmation email sent</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>Calendar invite included</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <span>Call if you need help</span>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <p className="text-muted-foreground mb-4">
                    Thank you for choosing Pebbles Boutique Hotel. We look forward to hosting you!
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Button asChild>
                      <Link to="/">Return to Home</Link>
                    </Button>
                    <Button variant="outline" onClick={resetBookingFlow}>
                      Book Another Room
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Booking;