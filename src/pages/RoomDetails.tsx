import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { format, addDays } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Bed, 
  Users, 
  Square, 
  Wifi, 
  Car, 
  Coffee, 
  Waves, 
  Dumbbell,
  Shield,
  Heart,
  Star,
  ArrowLeft,
  Calendar,
  Check,
  Phone,
  MapPin
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { OptimizedImage } from '@/components/OptimizedImage';
import { DatePicker } from '@/components/DatePicker';
import deluxeRoom from '@/assets/deluxe-room.jpg';
import luxurySuite from '@/assets/luxury-suite.jpg';
import spaAmenity from '@/assets/spa-amenity.jpg';
import heroHotel from '@/assets/hero-hotel-exterior.jpg';
import { useBookingStore, Room } from '@/lib/booking-store'; // Added import for booking store

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setSelectedRoom, resetBookingFlow, updateCurrentBooking } = useBookingStore(); // Added booking store hooks
  const [checkIn, setCheckIn] = useState<Date>(new Date());
  const [checkOut, setCheckOut] = useState<Date>(addDays(new Date(), 3));
  const [guests, setGuests] = useState(2);
  
  // Mock room data - in a real app this would come from an API
  const rooms = [
    {
      id: '1',
      category: 'standard',
      name: 'Garden View Room',
      images: [deluxeRoom, luxurySuite, spaAmenity, heroHotel],
      price: 249000,
      originalPrice: 299000,
      rating: 4.8,
      reviews: 124,
      size: 320,
      occupancy: 2,
      beds: '1 King Bed',
      amenities: ['Free WiFi', 'Air Conditioning', 'Flat-screen TV', 'Mini Bar'],
      description: 'Our Garden View Rooms offer a peaceful retreat with beautiful views of our manicured gardens. Each room features modern amenities and elegant décor.',
      details: [
        'Soundproof windows for peaceful sleep',
        'Blackout curtains for optimal rest',
        'Premium bedding with 300-thread count sheets',
        'Spacious work desk with ergonomic chair',
        'In-room safe for valuables',
        'Iron and ironing board',
        'Hair dryer',
        'Complimentary toiletries'
      ]
    },
    {
      id: '2',
      category: 'standard',
      name: 'City View Room',
      images: [luxurySuite, deluxeRoom, spaAmenity, heroHotel],
      price: 279000,
      originalPrice: 329000,
      rating: 4.7,
      reviews: 98,
      size: 350,
      occupancy: 2,
      beds: '2 Queen Beds',
      amenities: ['Free WiFi', 'Air Conditioning', 'Flat-screen TV', 'Work Desk', 'Coffee Maker'],
      description: 'Enjoy stunning views of the city skyline from our City View Rooms. Spacious and comfortable with all modern conveniences.',
      details: [
        'Panoramic city views from floor-to-ceiling windows',
        'Premium bedding with 400-thread count sheets',
        'Spacious work desk with ergonomic chair',
        'In-room safe for valuables',
        'Iron and ironing board',
        'Hair dryer',
        'Complimentary toiletries',
        'Nespresso coffee machine'
      ]
    },
    {
      id: '3',
      category: 'deluxe',
      name: 'Deluxe Ocean View',
      images: [spaAmenity, deluxeRoom, luxurySuite, heroHotel],
      price: 399000,
      originalPrice: 449000,
      rating: 4.9,
      reviews: 156,
      size: 450,
      occupancy: 3,
      beds: '1 King Bed, 1 Sofa Bed',
      amenities: ['Free WiFi', 'Ocean View', 'Balcony', 'Mini Bar', 'Coffee Maker', 'Bathtub'],
      description: 'Wake up to breathtaking ocean views from your private balcony. These spacious rooms offer luxury amenities and premium comfort.',
      details: [
        'Private balcony with ocean views',
        'Premium bedding with 600-thread count sheets',
        'Spacious work desk with ergonomic chair',
        'In-room safe for valuables',
        'Iron and ironing board',
        'Hair dryer',
        'Complimentary toiletries',
        'Nespresso coffee machine',
        'Mini bar with premium beverages',
        'Deep soaking bathtub',
        'Separate rain shower',
        'Robes and slippers'
      ]
    },
    {
      id: '4',
      category: 'suite',
      name: 'Executive Suite',
      images: [heroHotel, luxurySuite, deluxeRoom, spaAmenity],
      price: 599000,
      originalPrice: 699000,
      rating: 4.9,
      reviews: 87,
      size: 750,
      occupancy: 4,
      beds: '1 King Bed, 1 Queen Bed',
      amenities: ['Free WiFi', 'Ocean View', 'Private Balcony', 'Kitchenette', 'Living Area', 'Dining Area', 'Bathtub', 'Separate Shower'],
      description: 'Our Executive Suites offer the ultimate in luxury and comfort. Featuring a separate living area, dining space, and premium amenities.',
      details: [
        'Separate living and sleeping areas',
        'Private balcony with panoramic views',
        'Fully equipped kitchenette',
        'Dining area for up to 6 guests',
        'Premium bedding with 800-thread count sheets',
        'Spacious work desk with ergonomic chair',
        'In-room safe for valuables',
        'Iron and ironing board',
        'Hair dryer',
        'Complimentary toiletries',
        'Nespresso coffee machine',
        'Mini bar with premium beverages',
        'Deep soaking bathtub',
        'Separate rain shower',
        'Robes and slippers',
        'Turndown service',
        '24-hour butler service'
      ]
    }
  ];

  const room = rooms.find(r => r.id === id) || rooms[0];
  
  // Room amenities icons mapping
  const amenityIcons: Record<string, React.ElementType> = {
    'Free WiFi': Wifi,
    'Air Conditioning': Shield,
    'Ocean View': Waves,
    'Balcony': Coffee,
    'Kitchenette': Coffee,
    'Living Area': Coffee,
    'Dining Area': Coffee,
    'Bathtub': Waves,
    'Separate Shower': Waves,
    'Work Desk': Coffee,
    'Coffee Maker': Coffee,
    'Mini Bar': Coffee,
    'Flat-screen TV': Coffee
  };

  // Updated handleBooking to use the booking store
  const handleBooking = () => {
    resetBookingFlow();

    const roomForStore: Room = {
      id: parseInt(room.id, 10),
      name: room.name,
      description: room.description,
      price: room.price,
      originalPrice: room.originalPrice,
      image: room.images[0],
      guests: room.occupancy,
      size: `${room.size} sq ft`,
      rating: room.rating,
      reviews: room.reviews,
      amenities: room.amenities,
      featured: false, // Not available in mock data
      available: true, // Assume available
      roomType: room.category as 'suite' | 'deluxe' | 'premium' | 'standard',
    };

    updateCurrentBooking({ checkIn, checkOut, adultCount: guests, childrenCount: 0 });
    setSelectedRoom(roomForStore);
    navigate('/booking-demo');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link to="/rooms" className="hover:text-primary transition-colors">Rooms</Link>
          <span>/</span>
          <span className="text-foreground">{room.name}</span>
        </nav>
      </div>
      
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Rooms
        </Button>
      </div>
      
      {/* Room Gallery */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="aspect-video lg:aspect-square rounded-xl overflow-hidden shadow-lg">
                <OptimizedImage
                  src={room.images[0]}
                  alt={room.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {room.images.slice(1).map((image, index) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden shadow-md">
                    <OptimizedImage
                      src={image}
                      alt={`${room.name} ${index + 2}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Booking Form */}
            <Card className="shadow-strong sticky top-24 h-fit">
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-playfair font-bold text-foreground mb-2">
                      {room.name}
                    </h2>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-5 h-5 ${i < Math.floor(room.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-muted-foreground">
                        {room.rating} ({room.reviews} reviews)
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary">MK{room.price}<span className="text-lg font-normal text-muted-foreground">/night</span></div>
                    {room.originalPrice > room.price && (
                      <div className="text-sm text-muted-foreground line-through">MK{room.originalPrice}</div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-cream rounded-lg">
                      <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Check-in</p>
                      <DatePicker
                        value={checkIn ? format(checkIn, 'yyyy-MM-dd') : ''}
                        onChange={(dateString) => setCheckIn(new Date(dateString + 'T00:00'))}
                      />
                    </div>
                    <div className="text-center p-4 bg-cream rounded-lg">
                      <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Check-out</p>
                      <DatePicker
                        value={checkOut ? format(checkOut, 'yyyy-MM-dd') : ''}
                        onChange={(dateString) => setCheckOut(new Date(dateString + 'T00:00'))}
                      />
                    </div>
                    <div className="text-center p-4 bg-cream rounded-lg">
                      <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Guests</p>
                      <select 
                        value={guests}
                        onChange={(e) => setGuests(parseInt(e.target.value))}
                        className="w-full bg-background border border-input rounded-md px-2 py-1 text-center"
                      >
                        {[...Array(room.occupancy)].map((_, i) => (
                          <option key={i} value={i + 1}>{i + 1} Guest{i > 0 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-cream rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">MK{room.price} x {checkOut && checkIn ? Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 3600 * 24)) : 1} nights</p>
                      <p className="text-sm text-muted-foreground">Includes taxes and fees</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-foreground">MK{room.price * (checkOut && checkIn ? Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 3600 * 24)) : 1)}</p>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleBooking}
                    className="w-full bg-primary hover:bg-primary-dark text-primary-foreground py-6 text-lg font-medium"
                  >
                    Book Now
                  </Button>
                  
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">Need assistance?</p>
                    <Button variant="outline" className="w-full">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Us: +1 (555) 123-4567
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Room Details */}
      <section className="py-12 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="mb-12">
                <h2 className="text-3xl font-playfair font-bold text-foreground mb-6">
                  Room Description
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  {room.description}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Designed with your comfort in mind, this room combines modern amenities with elegant décor 
                  to create a relaxing sanctuary. Whether you're traveling for business or leisure, you'll 
                  find everything you need for a memorable stay.
                </p>
              </div>
              
              <div className="mb-12">
                <h2 className="text-3xl font-playfair font-bold text-foreground mb-6">
                  Room Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {room.details.map((detail, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-muted-foreground">{detail}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-3xl font-playfair font-bold text-foreground mb-6">
                  Amenities
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {room.amenities.map((amenity, index) => {
                    const IconComponent = amenityIcons[amenity] || Coffee;
                    return (
                      <div key={index} className="flex items-center gap-3 p-4 bg-background rounded-lg shadow-medium">
                        <div className="p-2 rounded-full bg-primary-light">
                          <IconComponent className="w-5 h-5 text-primary" />
                        </div>
                        <span className="font-medium text-foreground">{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            <div>
              <Card className="shadow-medium sticky top-24">
                <CardContent className="p-6">
                  <h3 className="text-xl font-playfair font-bold text-foreground mb-4">
                    Room Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Size</span>
                      <span className="font-medium text-foreground">{room.size} sq ft</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Occupancy</span>
                      <span className="font-medium text-foreground">Up to {room.occupancy} guests</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Beds</span>
                      <span className="font-medium text-foreground">{room.beds}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Category</span>
                      <span className="font-medium text-foreground capitalize">{room.category}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Views</span>
                      <span className="font-medium text-foreground">
                        {room.amenities.includes('Ocean View') ? 'Ocean View' : 
                         room.name.includes('Garden') ? 'Garden View' : 
                         'City View'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-xl font-playfair font-bold text-foreground mb-4">
                      Cancellation Policy
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Free cancellation up to 48 hours before arrival. After that, one night's stay will be charged.
                    </p>
                    <Button variant="outline" className="w-full">
                      View All Policies
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* Similar Rooms */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-playfair font-bold text-foreground mb-4 text-center">
            You Might Also Like
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Explore other exceptional rooms and suites available at our hotel
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rooms.filter(r => r.id !== id).slice(0, 3).map((similarRoom) => (
              <Card key={similarRoom.id} className="overflow-hidden shadow-medium hover:shadow-strong transition-all duration-300 group">
                <div className="relative">
                  <OptimizedImage
                    src={similarRoom.images[0]}
                    alt={similarRoom.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-semibold">{similarRoom.rating}</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-playfair font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {similarRoom.name}
                  </h3>
                  <div className="flex items-center gap-4 mb-4 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>Up to {similarRoom.occupancy} guests</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Square className="w-4 h-4" />
                      <span>{similarRoom.size} sq ft</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-right">
                      <div className="text-xl font-bold text-primary">MK{similarRoom.price}<span className="text-sm font-normal text-muted-foreground">/night</span></div>
                      {similarRoom.originalPrice > similarRoom.price && (
                        <div className="text-xs text-muted-foreground line-through">MK{similarRoom.originalPrice}</div>
                      )}
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/rooms/${similarRoom.id}`}>View Details</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default RoomDetails;