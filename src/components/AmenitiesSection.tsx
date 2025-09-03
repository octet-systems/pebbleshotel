import { Card, CardContent } from '@/components/ui/card';
import { Waves, Utensils, Dumbbell, Wifi, Car, Coffee, Flower2, Shield } from 'lucide-react';
import spaImage from '@/assets/spa-amenity.jpg';

const AmenitiesSection = () => {
  const amenities = [
    {
      icon: Waves,
      title: 'Spa & Wellness',
      description: 'Rejuvenate your body and mind with our full-service spa featuring massage therapy, wellness treatments, and relaxation areas.',
      image: spaImage
    },
    {
      icon: Utensils,
      title: 'Fine Dining',
      description: 'Savor exquisite cuisine at our signature restaurant, featuring locally-sourced ingredients and international flavors.',
      featured: true
    },
    {
      icon: Dumbbell,
      title: 'Fitness Center',
      description: 'Stay active with our state-of-the-art fitness facility equipped with modern equipment and personal training services.',
    },
    {
      icon: Waves,
      title: 'Swimming Pool',
      description: 'Relax by our infinity pool with stunning views, perfect for unwinding after a day of exploration.',
    },
    {
      icon: Wifi,
      title: 'High-Speed WiFi',
      description: 'Stay connected with complimentary high-speed internet access throughout the property.',
    },
    {
      icon: Car,
      title: 'Valet Parking',
      description: 'Convenient valet parking service available 24/7 for all our guests.',
    },
    {
      icon: Coffee,
      title: 'Room Service',
      description: '24-hour room service featuring gourmet meals and beverages delivered to your room.',
    },
    {
      icon: Shield,
      title: 'Concierge Service',
      description: 'Our dedicated concierge team is available to assist with reservations, tours, and local recommendations.',
    }
  ];

  return (
    <section id="amenities" className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
            Amenities & Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Discover our carefully curated amenities designed to enhance your stay and create lasting memories.
          </p>
        </div>

        {/* Featured Spa Section */}
        <div className="mb-16">
          <Card className="overflow-hidden shadow-strong">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto">
                <img
                  src={spaImage}
                  alt="Elegant spa treatment room with natural stone features and zen-like atmosphere"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-full bg-sage-light">
                    <Flower2 className="w-6 h-6 text-sage" />
                  </div>
                  <h3 className="text-3xl font-playfair font-bold text-foreground">
                    Spa & Wellness Center
                  </h3>
                </div>
                <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                  Immerse yourself in tranquility at our award-winning spa. From therapeutic massages to revitalizing facial treatments, 
                  our expert therapists use premium products and ancient techniques to restore your inner balance.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div>• Massage Therapy</div>
                  <div>• Facial Treatments</div>
                  <div>• Body Treatments</div>
                  <div>• Meditation Space</div>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {amenities.filter(amenity => amenity.title !== 'Spa & Wellness').map((amenity, index) => (
            <Card key={index} className="text-center shadow-medium hover:shadow-strong transition-smooth group">
              <CardContent className="p-8">
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-full bg-primary-light group-hover:bg-primary transition-smooth">
                    <amenity.icon className="w-8 h-8 text-primary group-hover:text-white transition-smooth" />
                  </div>
                </div>
                <h3 className="text-xl font-playfair font-semibold text-foreground mb-3">
                  {amenity.title}
                </h3>
                <p className="text-muted-foreground text-balance leading-relaxed">
                  {amenity.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AmenitiesSection;