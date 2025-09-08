import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  Star
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { OptimizedImage } from '@/components/OptimizedImage';
import room1 from '@/assets/deluxe-room.jpg';
import room2 from '@/assets/luxury-suite.jpg';
import room3 from '@/assets/spa-amenity.jpg';
import suite1 from '@/assets/hero-hotel-exterior.jpg';
import { useBookingStore, type Room as BookingRoom } from '@/lib/booking-store';

const Rooms = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();
  const { setSelectedRoom, resetBookingFlow } = useBookingStore();
  
  const roomCategories = [
    { id: 'all', name: 'All Rooms' },
    { id: 'standard', name: 'Standard Rooms' },
    { id: 'deluxe', name: 'Deluxe Rooms' },
    { id: 'suite', name: 'Suites' }
  ];

  const rooms = [
    {
      id: '1',
      category: 'standard',
      name: 'Garden View Room',
      image: room1,
      price: 249000,
      originalPrice: 299000,
      rating: 4.8,
      reviews: 124,
      size: 320,
      occupancy: 2,
      beds: '1 King Bed',
      amenities: ['Free WiFi', 'Air Conditioning', 'Flat-screen TV', 'Mini Bar'],
      description: 'Our Garden View Rooms offer a peaceful retreat with beautiful views of our manicured gardens. Each room features modern amenities and elegant décor.'
    },
    {
      id: '2',
      category: 'standard',
      name: 'City View Room',
      image: room2,
      price: 279000,
      originalPrice: 329000,
      rating: 4.7,
      reviews: 98,
      size: 350,
      occupancy: 2,
      beds: '2 Queen Beds',
      amenities: ['Free WiFi', 'Air Conditioning', 'Flat-screen TV', 'Work Desk', 'Coffee Maker'],
      description: 'Enjoy stunning views of the city skyline from our City View Rooms. Spacious and comfortable with all modern conveniences.'
    },
    {
      id: '3',
      category: 'deluxe',
      name: 'Deluxe Ocean View',
      image: room3,
      price: 399000,
      originalPrice: 449000,
      rating: 4.9,
      reviews: 156,
      size: 450,
      occupancy: 3,
      beds: '1 King Bed, 1 Sofa Bed',
      amenities: ['Free WiFi', 'Ocean View', 'Balcony', 'Mini Bar', 'Coffee Maker', 'Bathtub'],
      description: 'Wake up to breathtaking ocean views from your private balcony. These spacious rooms offer luxury amenities and premium comfort.'
    },
    {
      id: '4',
      category: 'suite',
      name: 'Executive Suite',
      image: suite1,
      price: 599000,
      originalPrice: 699000,
      rating: 4.9,
      reviews: 87,
      size: 750,
      occupancy: 4,
      beds: '1 King Bed, 1 Queen Bed',
      amenities: ['Free WiFi', 'Ocean View', 'Private Balcony', 'Kitchenette', 'Living Area', 'Dining Area', 'Bathtub', 'Separate Shower'],
      description: 'Our Executive Suites offer the ultimate in luxury and comfort. Featuring a separate living area, dining space, and premium amenities.'
    }
  ];

  const filteredRooms = selectedCategory === 'all' 
    ? rooms 
    : rooms.filter(room => room.category === selectedCategory);

  const handleBookNow = (room: typeof rooms[0]) => {
    resetBookingFlow();
    const roomForStore: BookingRoom = {
      id: parseInt(room.id, 10),
      name: room.name,
      description: room.description,
      price: room.price,
      originalPrice: room.originalPrice,
      image: room.image,
      guests: room.occupancy,
      size: `${room.size} sq ft`,
      rating: room.rating,
      reviews: room.reviews,
      amenities: room.amenities,
      featured: false, // Not available in mock data
      available: true, // Assume available
      roomType: room.category as 'suite' | 'deluxe' | 'premium' | 'standard',
    };
    setSelectedRoom(roomForStore);
    navigate('/booking-demo');
  };

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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-overlay z-10"></div>
        <OptimizedImage
          src={suite1}
          alt="Luxury hotel rooms"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 z-15"></div>
        <div className="relative z-20 text-center text-white px-4 max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-8xl font-playfair font-bold mb-6 animate-fade-up">
            Luxury Accommodations
          </h1>
          <p className="text-2xl md:text-4xl max-w-4xl mx-auto animate-fade-up animate-fade-in-delay font-light mb-4">
            Experience unparalleled comfort and elegance
          </p>
          <p className="text-lg md:text-xl max-w-2xl mx-auto animate-fade-up animate-fade-in-delay font-light opacity-90 mb-12">
            Each room is thoughtfully designed to provide the perfect blend of modern luxury and timeless comfort
          </p>
          <div className="mt-10 animate-fade-up animate-fade-in-delay animate-slide-in-up">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary-dark text-primary-foreground px-10 py-6 text-xl rounded-full shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 font-medium tracking-wide"
              asChild
            >
              <Link to="/about">Discover Our Story</Link>
            </Button>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-white flex justify-center p-1">
            <div className="w-2 h-2 bg-white rounded-full mt-1"></div>
          </div>
        </div>
      </section>

      {/* Room Categories */}
      <section className="py-12 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {roomCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  selectedCategory === category.id 
                    ? 'bg-primary text-primary-foreground shadow-lg' 
                    : 'bg-background hover:bg-primary/10'
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>

          {/* Rooms Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
            {filteredRooms.map((room) => (
              <Card key={room.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group border-border/10 flex flex-col md:flex-row">
                <div className="relative md:w-2/5 h-64 md:h-auto flex-shrink-0">
                  <OptimizedImage
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-semibold">{room.rating}</span>
                  </div>
                  {room.originalPrice > room.price && (
                    <div className="absolute top-4 left-4 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-xs font-semibold">
                      Save MK{(room.originalPrice - room.price).toLocaleString()}
                    </div>
                  )}
                </div>
                <div className="flex flex-col md:w-3/5 flex-grow">
                  <CardContent className="p-6 md:p-8 flex flex-col flex-grow h-full">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-playfair font-bold text-foreground">
                        {room.name}
                      </h3>
                      <div className="text-right flex-shrink-0 pl-2">
                        <div className="text-2xl font-bold text-primary">MK{room.price.toLocaleString()}</div>
                        <div className="text-sm font-normal text-muted-foreground -mt-1">/night</div>
                        {room.originalPrice > room.price && (
                          <div className="text-xs text-muted-foreground line-through">MK{room.originalPrice.toLocaleString()}</div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4" />
                        <span>Up to {room.occupancy} guests</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Square className="w-4 h-4" />
                        <span>{room.size} sq ft</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Bed className="w-4 h-4" />
                        <span>{room.beds}</span>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed text-sm flex-grow">
                      {room.description}
                    </p>
                    
                    <div className="mt-auto pt-4 space-y-4">
                      <div>
                        <h4 className="font-semibold text-foreground mb-2 text-sm">Key Amenities</h4>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                          {room.amenities.slice(0, 4).map((amenity, idx) => {
                            const IconComponent = amenityIcons[amenity] || Coffee;
                            return (
                              <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                                <IconComponent className="w-3.5 h-3.5 text-primary" />
                                <span>{amenity}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3 border-t border-border/10 pt-4">
                        <Button
                          onClick={() => handleBookNow(room)}
                          className="flex-1 bg-primary hover:bg-primary-dark text-primary-foreground"
                        >
                          Book Now
                        </Button>
                        <Button variant="outline" className="flex-1" asChild>
                          <Link to={`/rooms/${room.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Room Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-4">
              Room Features & Amenities
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every room is designed with your comfort and convenience in mind.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="shadow-medium">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-full bg-primary-light">
                    <Bed className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-playfair font-semibold text-foreground">
                    Premium Bedding
                  </h3>
                </div>
                <p className="text-muted-foreground">
                  Experience ultimate comfort with our luxury mattresses, premium linens, and plush pillows for a restful night's sleep.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-medium">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-full bg-primary-light">
                    <Wifi className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-playfair font-semibold text-foreground">
                    High-Speed WiFi
                  </h3>
                </div>
                <p className="text-muted-foreground">
                  Stay connected with complimentary high-speed internet access throughout your stay.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-medium">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-full bg-primary-light">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-playfair font-semibold text-foreground">
                    Smart Security
                  </h3>
                </div>
                <p className="text-muted-foreground">
                  Your safety is our priority with electronic key cards, 24/7 security, and in-room safes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-6">
            Find Your Perfect Room
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Whether you're traveling for business or leisure, we have the perfect accommodation for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-8 py-3 rounded-lg font-medium shadow-lg" asChild>
              <Link to="/rooms">Check Availability</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg font-medium" asChild>
              <Link to="/contact">Contact Our Team</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Rooms;
