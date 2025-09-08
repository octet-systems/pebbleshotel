import React, { useState, useEffect } from 'react';
import { format, addDays } from 'date-fns';
import { 
  Calendar, 
  Users, 
  MapPin, 
  CreditCard, 
  Shuffle, 
  Play,
  CheckCircle,
  Clock,
  Star
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { LoadingSpinner } from '@/components/LoadingComponents';

import { useBookingStore, type Guest, type Room } from '@/lib/booking-store';
import { formatCurrency as formatPrice } from '@/lib/admin-store';

// Demo user scenarios with realistic data
const DEMO_SCENARIOS = [
  {
    id: 'business',
    name: 'Business Traveler',
    description: 'Single professional on a work trip',
    checkIn: addDays(new Date(), 3),
    checkOut: addDays(new Date(), 6),
    adultCount: 1,
    childrenCount: 0,
    preferredRoom: 2, // Deluxe Room
    guests: [
      {
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.johnson@techcorp.com',
        phone: '+265-999-123-456',
        isMainGuest: true
      }
    ],
    specialRequests: 'Need early check-in at 12:00 PM due to business meeting. Request high-floor room with good WiFi signal for video conferences.'
  },
  {
    id: 'romantic',
    name: 'Romantic Getaway',
    description: 'Couple celebrating anniversary',
    checkIn: addDays(new Date(), 7),
    checkOut: addDays(new Date(), 10),
    adultCount: 2,
    childrenCount: 0,
    preferredRoom: 1, // Luxury Suite
    guests: [
      {
        firstName: 'Michael',
        lastName: 'Chen',
        email: 'michael.chen@gmail.com',
        phone: '+265-999-987-654',
        isMainGuest: true
      },
      {
        firstName: 'Emma',
        lastName: 'Chen',
        email: 'emma.chen@gmail.com',
        phone: '+265-999-987-655',
        isMainGuest: false
      }
    ],
    specialRequests: 'Celebrating our 5th anniversary! Would appreciate rose petals, champagne, and late checkout if possible. Room with romantic city view preferred.'
  },
  {
    id: 'family',
    name: 'Family Vacation',
    description: 'Family with children on holiday',
    checkIn: addDays(new Date(), 14),
    checkOut: addDays(new Date(), 18),
    adultCount: 2,
    childrenCount: 2,
    preferredRoom: 1, // Luxury Suite (can accommodate more guests)
    guests: [
      {
        firstName: 'David',
        lastName: 'Williams',
        email: 'david.williams@family.com',
        phone: '+265-999-555-123',
        isMainGuest: true
      },
      {
        firstName: 'Lisa',
        lastName: 'Williams',
        email: 'lisa.williams@family.com',
        phone: '+265-999-555-124',
        isMainGuest: false
      }
    ],
    specialRequests: 'Traveling with 2 children (ages 8 and 12). Need connecting rooms or suite with extra space. Baby cot not required. Kid-friendly amenities appreciated.'
  },
  {
    id: 'weekend',
    name: 'Weekend Getaway',
    description: 'Short leisure trip',
    checkIn: addDays(new Date(), 2),
    checkOut: addDays(new Date(), 4),
    adultCount: 1,
    childrenCount: 0,
    preferredRoom: 3, // Premium Room
    guests: [
      {
        firstName: 'Alex',
        lastName: 'Rodriguez',
        email: 'alex.rodriguez@email.com',
        phone: '+265-999-777-888',
        isMainGuest: true
      }
    ],
    specialRequests: 'Quick weekend getaway for relaxation. Interested in spa services and pool access. Prefer quiet room away from elevator.'
  },
  {
    id: 'group',
    name: 'Friends Group',
    description: 'Group of friends traveling together',
    checkIn: addDays(new Date(), 21),
    checkOut: addDays(new Date(), 24),
    adultCount: 3,
    childrenCount: 0,
    preferredRoom: 1, // Luxury Suite
    guests: [
      {
        firstName: 'James',
        lastName: 'Thompson',
        email: 'james.thompson@friends.com',
        phone: '+265-999-111-222',
        isMainGuest: true
      },
      {
        firstName: 'Maria',
        lastName: 'Garcia',
        email: 'maria.garcia@friends.com',
        phone: '+265-999-111-223',
        isMainGuest: false
      },
      {
        firstName: 'John',
        lastName: 'Davis',
        email: 'john.davis@friends.com',
        phone: '+265-999-111-224',
        isMainGuest: false
      }
    ],
    specialRequests: 'Group of college friends reunion! Would love recommendations for local attractions and dining. Happy to upgrade if larger suite available.'
  }
];

interface DemoBookingFormProps {
  className?: string;
}

export const DemoBookingForm: React.FC<DemoBookingFormProps> = ({ className = '' }) => {
  const { toast } = useToast();
  const {
    selectedRoom,
    currentBooking,
    rooms,
    loading,
    error,
    setSelectedRoom,
    createBooking,
    calculateTotalPrice,
    getAvailableRooms,
    updateCurrentBooking,
    // resetBookingFlow, // Now handled by individual pages before navigation
    setError
  } = useBookingStore();

  // Demo state
  const [currentScenario, setCurrentScenario] = useState(DEMO_SCENARIOS[0]);
  const [isAutoFilling, setIsAutoFilling] = useState(false);
  const [bookingStep, setBookingStep] = useState<'demo' | 'booking' | 'confirmation'>('demo');
  const [confirmationCode, setConfirmationCode] = useState<string>('');
  const [totalPrice, setTotalPrice] = useState(0);

  // Initialize form state from booking store if available, otherwise from the first demo scenario
  const initialCheckIn = currentBooking?.checkIn || DEMO_SCENARIOS[0].checkIn;
  const initialCheckOut = currentBooking?.checkOut || DEMO_SCENARIOS[0].checkOut;
  const initialAdultCount = currentBooking?.adultCount || DEMO_SCENARIOS[0].adultCount;
  const initialChildrenCount = currentBooking?.childrenCount || DEMO_SCENARIOS[0].childrenCount;
  const initialGuests = currentBooking?.guests && currentBooking.guests.length > 0 ? currentBooking.guests : DEMO_SCENARIOS[0].guests;
  const initialSpecialRequests = currentBooking?.specialRequests || DEMO_SCENARIOS[0].specialRequests;

  // Form state
  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);
  const [adultCount, setAdultCount] = useState(initialAdultCount);
  const [childrenCount, setChildrenCount] = useState(initialChildrenCount);
  const [guests, setGuests] = useState<Guest[]>(initialGuests);
  const [specialRequests, setSpecialRequests] = useState(initialSpecialRequests);

  // Auto-select preferred room when scenario changes
  useEffect(() => {
    // If a room is already selected from a previous page, keep it.
    if (selectedRoom) return;

    const availableRooms = getAvailableRooms(checkIn, checkOut, adultCount + childrenCount);
    const preferredRoom = availableRooms.find(room => room.id === currentScenario.preferredRoom);
    if (preferredRoom) {
      setSelectedRoom(preferredRoom);
    } else if (availableRooms.length > 0) {
      setSelectedRoom(availableRooms[0]);
    }
  }, [currentScenario, checkIn, checkOut, adultCount, childrenCount, getAvailableRooms, setSelectedRoom, selectedRoom]);

  // Calculate total price when room or dates change
  useEffect(() => {
    if (selectedRoom && checkIn && checkOut) {
      const price = calculateTotalPrice(selectedRoom.id, checkIn, checkOut);
      setTotalPrice(price);
      updateCurrentBooking({ checkIn, checkOut, adultCount, childrenCount, guests, specialRequests, totalPrice: price, roomId: selectedRoom.id });
    }
  }, [selectedRoom, checkIn, checkOut, adultCount, childrenCount, guests, specialRequests, calculateTotalPrice, updateCurrentBooking]);

  const loadScenario = async (scenario: typeof DEMO_SCENARIOS[0]) => {
    setIsAutoFilling(true);
    setCurrentScenario(scenario);
    
    // Simulate typing effect for better demo experience
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setCheckIn(scenario.checkIn);
    setCheckOut(scenario.checkOut);
    setAdultCount(scenario.adultCount);
    setChildrenCount(scenario.childrenCount);
    setGuests(scenario.guests);
    setSpecialRequests(scenario.specialRequests);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsAutoFilling(false);
    
    toast({
      title: `${scenario.name} Scenario Loaded`,
      description: scenario.description,
    });
  };

  const handleQuickBook = async () => {
    if (!selectedRoom) {
      setError('Please select a room first');
      return;
    }

    if (guests.length === 0) {
      setError('Please add at least one guest');
      return;
    }

    try {
      const confirmationCode = await createBooking({
        roomId: selectedRoom.id,
        checkIn,
        checkOut,
        guests,
        adultCount,
        childrenCount,
        specialRequests,
        totalPrice,
        status: 'pending',
        paymentStatus: 'pending',
      });

      setConfirmationCode(confirmationCode);
      setBookingStep('confirmation');
      
      toast({
        title: 'Demo Booking Created!',
        description: `Confirmation code: ${confirmationCode}`,
      });
    } catch (error) {
      toast({
        title: 'Booking Failed',
        description: 'There was an error creating your demo booking.',
        variant: 'destructive',
      });
    }
  };

  const resetDemo = () => {
    // resetBookingFlow(); // This clears selected room and dates, which we don't want if user just wants to try another scenario
    setBookingStep('demo');
    setConfirmationCode('');
    loadScenario(DEMO_SCENARIOS[Math.floor(Math.random() * DEMO_SCENARIOS.length)]);
  };

  const numberOfNights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));

  if (bookingStep === 'confirmation') {
    return (
      <Card className={`max-w-2xl mx-auto ${className}`}>
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-green-700">Booking Confirmed!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center p-6 bg-green-50 rounded-lg">
            <p className="text-sm text-green-600 mb-2">Confirmation Code</p>
            <p className="text-2xl font-bold text-green-700 tracking-wider">{confirmationCode}</p>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold">Booking Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Guest:</span>
                <span>{guests[0]?.firstName} {guests[0]?.lastName}</span>
              </div>
              <div className="flex justify-between">
                <span>Room:</span>
                <span>{selectedRoom?.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Dates:</span>
                <span>{format(checkIn, 'MMM dd')} - {format(checkOut, 'MMM dd, yyyy')}</span>
              </div>
              <div className="flex justify-between">
                <span>Guests:</span>
                <span>{adultCount} adult{adultCount > 1 ? 's' : ''}{childrenCount > 0 ? `, ${childrenCount} children` : ''}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total:</span>
                <span className="text-primary">{formatPrice(totalPrice)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Button onClick={resetDemo} className="flex-1">
              Try Another Scenario
            </Button>
            <Button variant="outline" className="flex-1">
              View Booking Details
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Demo Controls */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Play className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-blue-900">Interactive Booking Demo</CardTitle>
          </div>
          <p className="text-sm text-blue-700">
            Try different booking scenarios with pre-filled realistic data. Select a scenario below to see how the booking system works.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DEMO_SCENARIOS.map((scenario) => (
              <Card
                key={scenario.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  currentScenario.id === scenario.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                }`}
                onClick={() => loadScenario(scenario)}
              >
                <CardContent className="p-4">
                  <h3 className="font-semibold text-sm mb-2">{scenario.name}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{scenario.description}</p>
                  <div className="flex justify-between text-xs">
                    <span>{scenario.adultCount + scenario.childrenCount} guests</span>
                    <span>{Math.ceil((scenario.checkOut.getTime() - scenario.checkIn.getTime()) / (1000 * 60 * 60 * 24))} nights</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="flex gap-2 mt-4">
            <Button
              onClick={() => {
                const randomScenario = DEMO_SCENARIOS[Math.floor(Math.random() * DEMO_SCENARIOS.length)];
                loadScenario(randomScenario);
              }}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <Shuffle className="w-4 h-4" />
              Random Scenario
            </Button>
            {isAutoFilling && <LoadingSpinner size="sm" />}
          </div>
        </CardContent>
      </Card>

      {/* Selected Room Display */}
      {selectedRoom && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <img
                src={selectedRoom.image}
                alt={selectedRoom.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{selectedRoom.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="text-sm font-medium">{selectedRoom.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {selectedRoom.size} • Up to {selectedRoom.guests} guests
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="font-semibold text-primary">
                    {formatPrice(selectedRoom.price)}/night
                  </span>
                  {numberOfNights > 0 && (
                    <span className="text-muted-foreground">
                      × {numberOfNights} nights = {formatPrice(totalPrice)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Booking Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Booking Details */}
        <div className="space-y-6">
          {/* Date Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Stay Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Check-in Date</Label>
                  <Input
                    type="date"
                    value={format(checkIn, 'yyyy-MM-dd')}
                    onChange={(e) => setCheckIn(new Date(e.target.value))}
                    min={format(new Date(), 'yyyy-MM-dd')}
                    className={isAutoFilling ? 'animate-pulse' : ''}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Check-out Date</Label>
                  <Input
                    type="date"
                    value={format(checkOut, 'yyyy-MM-dd')}
                    onChange={(e) => setCheckOut(new Date(e.target.value))}
                    min={format(addDays(checkIn, 1), 'yyyy-MM-dd')}
                    className={isAutoFilling ? 'animate-pulse' : ''}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Adults</Label>
                  <Select value={adultCount.toString()} onValueChange={(value) => setAdultCount(parseInt(value))}>
                    <SelectTrigger className={isAutoFilling ? 'animate-pulse' : ''}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[...Array(10)].map((_, i) => (
                        <SelectItem key={i + 1} value={(i + 1).toString()}>
                          {i + 1} Adult{i + 1 > 1 ? 's' : ''}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Children</Label>
                  <Select value={childrenCount.toString()} onValueChange={(value) => setChildrenCount(parseInt(value))}>
                    <SelectTrigger className={isAutoFilling ? 'animate-pulse' : ''}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[...Array(6)].map((_, i) => (
                        <SelectItem key={i} value={i.toString()}>
                          {i} {i === 1 ? 'Child' : 'Children'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="text-center p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Total stay: <span className="font-semibold">{numberOfNights} nights</span>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Guest Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Guest Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {guests.map((guest, index) => (
                  <div key={index} className="space-y-4 p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">
                        Guest {index + 1} {guest.isMainGuest && (
                          <Badge variant="secondary">Main Guest</Badge>
                        )}
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>First Name</Label>
                        <Input
                          value={guest.firstName}
                          onChange={(e) => {
                            const updatedGuests = guests.map((g, i) => 
                              i === index ? { ...g, firstName: e.target.value } : g
                            );
                            setGuests(updatedGuests);
                          }}
                          className={isAutoFilling ? 'animate-pulse' : ''}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Last Name</Label>
                        <Input
                          value={guest.lastName}
                          onChange={(e) => {
                            const updatedGuests = guests.map((g, i) => 
                              i === index ? { ...g, lastName: e.target.value } : g
                            );
                            setGuests(updatedGuests);
                          }}
                          className={isAutoFilling ? 'animate-pulse' : ''}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input
                          type="email"
                          value={guest.email}
                          onChange={(e) => {
                            const updatedGuests = guests.map((g, i) => 
                              i === index ? { ...g, email: e.target.value } : g
                            );
                            setGuests(updatedGuests);
                          }}
                          className={isAutoFilling ? 'animate-pulse' : ''}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Phone</Label>
                        <Input
                          value={guest.phone}
                          onChange={(e) => {
                            const updatedGuests = guests.map((g, i) => 
                              i === index ? { ...g, phone: e.target.value } : g
                            );
                            setGuests(updatedGuests);
                          }}
                          className={isAutoFilling ? 'animate-pulse' : ''}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Special Requests & Summary */}
        <div className="space-y-6">
          {/* Special Requests */}
          <Card>
            <CardHeader>
              <CardTitle>Special Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="Any special requests or requirements for your stay?"
                className={`min-h-[120px] ${isAutoFilling ? 'animate-pulse' : ''}`}
              />
            </CardContent>
          </Card>

          {/* Booking Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Scenario:</span>
                  <span className="text-primary font-medium">{currentScenario.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Room:</span>
                  <span>{selectedRoom?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Dates:</span>
                  <span>
                    {format(checkIn, 'MMM dd')} - {format(checkOut, 'MMM dd, yyyy')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Guests:</span>
                  <span>
                    {adultCount} adult{adultCount > 1 ? 's' : ''}
                    {childrenCount > 0 && `, ${childrenCount} children`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Nights:</span>
                  <span>{numberOfNights}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span className="text-primary">{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <Button
                  onClick={handleQuickBook}
                  disabled={loading || !selectedRoom || guests.length === 0}
                  className="w-full bg-primary hover:bg-primary-dark"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Creating Demo Booking...
                    </>
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Create Demo Booking
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  This is a demo booking. No actual payment will be processed.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Demo Tips */}
          <Card className="bg-amber-50 border-amber-200">
            <CardHeader>
              <CardTitle className="text-amber-800 text-sm">Demo Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-xs space-y-1 text-amber-700">
                <li>• Pre-filled realistic guest data</li>
                <li>• Different scenarios (business, romantic, family)</li>
                <li>• Real-time price calculation</li>
                <li>• Room availability checking</li>
                <li>• Form validation and error handling</li>
                <li>• Booking confirmation system</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
};
