import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Clock, Car, Plane } from 'lucide-react';

const LocationSection = () => {
  const attractions = [
    {
      name: 'Area 49 Nature Reserve',
      distance: '2 km',
      description: 'Pristine wilderness with hiking trails and wildlife viewing opportunities.'
    },
    {
      name: 'Historic Downtown District',
      distance: '5 km',
      description: 'Charming streets filled with boutique shops, galleries, and local restaurants.'
    },
    {
      name: 'Sunset Peak Observatory',
      distance: '15 km',
      description: 'World-class astronomical observatory with stunning panoramic views.'
    },
    {
      name: 'Area 49 Cultural Center',
      distance: '8 km',
      description: 'Modern arts center featuring exhibitions, performances, and workshops.'
    }
  ];

  const transportation = [
    {
      icon: Plane,
      title: 'Airport',
      description: 'Area 49 International Airport',
      distance: '25 minutes drive'
    },
    {
      icon: Car,
      title: 'City Center',
      description: 'Downtown Area 49',
      distance: '10 minutes drive'
    },
    {
      icon: Clock,
      title: 'Train Station',
      description: 'Area 49 Central Station',
      distance: '15 minutes drive'
    }
  ];

  return (
    <section id="location" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
            Location & Attractions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Perfectly positioned in the heart of Area 49, our hotel offers easy access to the region's finest attractions and experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Map Placeholder */}
          <div className="relative">
            <Card className="overflow-hidden shadow-medium h-96">
              <div className="relative w-full h-full bg-gradient-to-br from-sage-light to-primary-light flex items-center justify-center">
                <div className="text-center text-white">
                  <MapPin className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-playfair font-semibold mb-2">
                    Pebbles Boutique Hotels
                  </h3>
                  <p className="text-lg">123 Serenity Boulevard</p>
                  <p className="text-lg">Area 49, State 12345</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Transportation Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-playfair font-bold text-foreground mb-6">
              Getting Here
            </h3>
            {transportation.map((item, index) => (
              <Card key={index} className="shadow-soft hover:shadow-medium transition-smooth">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary-light">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-1">
                        {item.title}
                      </h4>
                      <p className="text-muted-foreground mb-2">
                        {item.description}
                      </p>
                      <p className="text-primary font-medium">
                        {item.distance}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Local Attractions */}
        <div>
          <h3 className="text-3xl font-playfair font-bold text-foreground text-center mb-12">
            Nearby Attractions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {attractions.map((attraction, index) => (
              <Card key={index} className="shadow-soft hover:shadow-medium transition-smooth">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-xl font-playfair font-semibold text-foreground">
                      {attraction.name}
                    </h4>
                    <span className="text-primary font-medium text-sm bg-primary-light px-3 py-1 rounded-full">
                      {attraction.distance}
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {attraction.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-16 text-center">
          <Card className="bg-cream shadow-medium max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-playfair font-bold text-foreground mb-6">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Address</h4>
                  <p className="text-muted-foreground">
                    123 Serenity Boulevard<br />
                    Area 49, State 12345
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Phone</h4>
                  <p className="text-muted-foreground">
                    +1 (555) 123-4567
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;