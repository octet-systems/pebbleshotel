import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Wifi, Car, Coffee } from 'lucide-react';
import luxurySuite from '@/assets/luxury-suite.jpg';
import deluxeRoom from '@/assets/deluxe-room.jpg';

const RoomsSection = () => {
  const rooms = [
    {
      id: 1,
      name: 'Luxury Suite',
      description: 'Spacious suite with panoramic views, separate living area, and premium amenities for the ultimate comfort experience.',
      price: 450,
      image: luxurySuite,
      guests: 3,
      size: '65 m²',
      amenities: ['King Bed', 'Living Area', 'City View', 'Minibar']
    },
    {
      id: 2,
      name: 'Deluxe Room',
      description: 'Elegantly appointed room featuring modern design, comfortable furnishings, and thoughtful touches for a memorable stay.',
      price: 280,
      image: deluxeRoom,
      guests: 2,
      size: '35 m²',
      amenities: ['Queen Bed', 'Work Desk', 'Garden View', 'Coffee Maker']
    },
    {
      id: 3,
      name: 'Premium Room',
      description: 'Contemporary room with sophisticated décor, high-quality amenities, and peaceful ambiance for relaxation.',
      price: 320,
      image: deluxeRoom,
      guests: 2,
      size: '40 m²',
      amenities: ['King Bed', 'Balcony', 'Mountain View', 'Tea Service']
    }
  ];

  return (
    <section id="rooms" className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
            Rooms & Suites
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Each room is thoughtfully designed to provide comfort, elegance, and tranquility for our guests.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <Card key={room.id} className="overflow-hidden shadow-medium hover:shadow-strong transition-smooth group">
              <div className="relative overflow-hidden">
                <img
                  src={room.image}
                  alt={`${room.name} featuring modern minimalist design with elegant furnishings`}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-spring"
                />
                <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                  {room.size}
                </Badge>
              </div>
              
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-playfair font-semibold text-foreground">
                    {room.name}
                  </h3>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-primary">${room.price}</span>
                    <span className="text-muted-foreground text-sm block">per night</span>
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

                <div className="flex gap-3">
                  <Button className="flex-1 bg-primary hover:bg-primary-dark text-primary-foreground">
                    Book Now
                  </Button>
                  <Button variant="outline" className="flex-1">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoomsSection;