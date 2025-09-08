import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Wifi, Car, Coffee, Star, Heart, Eye } from 'lucide-react';
import { RoomCardSkeleton } from '@/components/LoadingComponents';
import { OptimizedImage } from '@/components/OptimizedImage';
import { useBookingStore, Room } from '@/lib/booking-store';

const RoomsSection = () => {
  const navigate = useNavigate();
  const { rooms, setSelectedRoom, resetBookingFlow } = useBookingStore();
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);
  
  const toggleFavorite = (roomId: number) => {
    setFavorites(prev => 
      prev.includes(roomId) 
        ? prev.filter(id => id !== roomId)
        : [...prev, roomId]
    );
  };

  const handleBookRoom = (room: Room) => {
    resetBookingFlow();
    setSelectedRoom(room);
    navigate('/booking-demo');
  };

  return (
    <section id="rooms" className="py-20 bg-secondary" aria-labelledby="rooms-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 id="rooms-heading" className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
            Rooms & Suites
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Each room is thoughtfully designed to provide comfort, elegance, and tranquility for our guests.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {loading ? (
            // Show skeletons while loading
            Array.from({ length: 3 }).map((_, index) => (
              <RoomCardSkeleton key={index} />
            ))
          ) : (
            rooms.map((room, index) => (
            <Card key={room.id} className={`overflow-hidden shadow-medium hover:shadow-strong transition-all duration-500 group hover-lift animate-scale-in ${
              room.featured ? 'ring-2 ring-primary ring-opacity-50' : ''
            }`} style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="relative overflow-hidden image-overlay">
                <OptimizedImage
                  src={room.image}
                  alt={`${room.name} featuring modern minimalist design with elegant furnishings and ${room.amenities.join(', ')}`}
                  className="w-full object-cover group-hover:scale-110 transition-transform duration-700 aspect-w-16 aspect-h-9"
                  loading="lazy"
                />
                
                {/* Overlay Controls */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center" aria-hidden="true">
                  <div className="flex gap-3">
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      className="rounded-full glass backdrop-blur-sm hover:scale-110 transition-transform"
                      aria-label={`View details for ${room.name}`}
                    >
                      <Eye className="w-4 h-4" aria-hidden="true" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      className="rounded-full glass backdrop-blur-sm hover:scale-110 transition-transform"
                      onClick={() => toggleFavorite(Number(room.id))}
                      aria-label={favorites.includes(Number(room.id)) ? `Remove ${room.name} from favorites` : `Add ${room.name} to favorites`}
                    >
                      <Heart className={`w-4 h-4 ${favorites.includes(Number(room.id)) ? 'fill-accent text-accent' : ''}`} aria-hidden="true" />
                    </Button>
                  </div>
                </div>
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge className="bg-primary text-primary-foreground backdrop-blur-sm">
                    {room.size}
                  </Badge>
                  {room.featured && (
                    <Badge className="bg-accent text-accent-foreground backdrop-blur-sm">
                      Featured
                    </Badge>
                  )}
                </div>
                
                {/* Discount Badge */}
                {room.originalPrice && (
                  <Badge className="absolute top-4 right-4 bg-red-500 text-white backdrop-blur-sm">
                    {Math.round((1 - room.price / room.originalPrice) * 100)}% OFF
                  </Badge>
                )}
              </div>
              
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3 gap-4">
                  <div className="flex-grow min-w-0">
                    <h3 className="text-xl sm:text-2xl font-playfair font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                      {room.name}
                    </h3>
                    {/* Rating */}
                    <div className="flex items-center gap-1 mt-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(room.rating) ? 'fill-primary text-primary' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground ml-1">({room.reviews})</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="flex flex-col items-end gap-1">
                      {room.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">MK{room.originalPrice.toLocaleString()}</span>
                      )}
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl sm:text-3xl font-bold text-primary">MK{room.price.toLocaleString()}</span>
                      </div>
                      <span className="text-muted-foreground text-xs">per night</span>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4 text-balance">
                  {room.description}
                </p>

                <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{room.guests} guests</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Wifi className="w-4 h-4" />
                    <span>Free WiFi</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {room.amenities.map((amenity) => (
                    <Badge key={amenity} variant="secondary" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Button 
                    onClick={() => handleBookRoom(room)}
                    className="flex-1 bg-primary hover:bg-primary-dark text-primary-foreground btn-modern hover-lift rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    aria-label={`Book ${room.name} starting at MK${room.price.toLocaleString()} per night`}
                  >
                    Book Now
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 hover-lift rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    aria-label={`View detailed information about ${room.name}`}
                    asChild
                  >
                    <Link to={`/rooms/${room.id}`}>Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
          )}
        </div>
      </div>
    </section>
  );
};

export default RoomsSection;