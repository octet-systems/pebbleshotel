import { Card, CardContent } from '@/components/ui/card';
import { Waves, Utensils, Dumbbell, Wifi, Car, Coffee, Flower2, Shield, ConciergeBell, ParkingCircle, Camera, Gamepad2 } from 'lucide-react';
import { OptimizedImage } from '@/components/OptimizedImage';
import spaImage from '@/assets/spa-amenity.jpg';
import diningImage from '@/assets/luxury-suite.jpg';
import fitnessImage from '@/assets/deluxe-room.jpg';
import poolImage from '@/assets/hero-hotel-exterior.jpg';

const AmenitiesSection = () => {
  const amenities = [
    {
      icon: Waves,
      title: 'Spa & Wellness',
      description: 'Rejuvenate your body and mind with our full-service spa featuring massage therapy, wellness treatments, and relaxation areas.',
      image: spaImage,
      featured: true
    },
    {
      icon: Utensils,
      title: 'Fine Dining',
      description: 'Savor exquisite cuisine at our signature restaurant, featuring locally-sourced ingredients and international flavors.',
      image: diningImage,
      featured: true
    },
    {
      icon: Dumbbell,
      title: 'Fitness Center',
      description: 'Stay active with our state-of-the-art fitness facility equipped with modern equipment and personal training services.',
      image: fitnessImage,
      featured: true
    },
    {
      icon: Waves,
      title: 'Swimming Pool',
      description: 'Relax by our infinity pool with stunning views, perfect for unwinding after a day of exploration.',
      image: poolImage,
      featured: true
    },
    {
      icon: Wifi,
      title: 'High-Speed WiFi',
      description: 'Stay connected with complimentary high-speed internet access throughout the property.',
      image: spaImage,
    },
    {
      icon: Car,
      title: 'Valet Parking',
      description: 'Convenient valet parking service available 24/7 for all our guests.',
      image: poolImage,
    },
    {
      icon: Coffee,
      title: 'Room Service',
      description: '24-hour room service featuring gourmet meals and beverages delivered to your room.',
      image: diningImage,
    },
    {
      icon: Shield,
      title: 'Concierge Service',
      description: 'Our dedicated concierge team is available to assist with reservations, tours, and local recommendations.',
      image: fitnessImage,
    },
    {
      icon: ConciergeBell,
      title: 'Butler Service',
      description: 'Personalized butler service to attend to your every need during your stay.',
      image: spaImage,
    },
    {
      icon: ParkingCircle,
      title: 'Self Parking',
      description: 'Complimentary self-parking available for guests who prefer to drive themselves.',
      image: poolImage,
    },
    {
      icon: Camera,
      title: 'Photography Service',
      description: 'Professional photography services to capture your special moments during your stay.',
      image: diningImage,
    },
    {
      icon: Gamepad2,
      title: 'Entertainment',
      description: 'Game room with billiards, table tennis, and other recreational activities.',
      image: fitnessImage,
    }
  ];

  // Separate featured amenities
  const featuredAmenities = amenities.filter(amenity => amenity.featured);
  const regularAmenities = amenities.filter(amenity => !amenity.featured);

  return (
    <section id="amenities" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-extrabold text-foreground mb-4">
            Our Premium Amenities
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed text-balance">
            Discover a world of luxury with our carefully curated amenities, designed to elevate your stay and create unforgettable memories.
          </p>
        </div>

        {/* Featured Amenities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
          {featuredAmenities.map((amenity, index) => (
            <Card key={`featured-${index}`} className="overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 bg-white group transform hover:-translate-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {amenity.image && (
                  <div className="relative h-80 md:h-auto overflow-hidden aspect-w-16 aspect-h-9">
                    <OptimizedImage
                      src={amenity.image}
                      alt={amenity.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                )}
                <CardContent className="p-8 md:p-10 flex flex-col justify-center bg-gradient-to-b from-white to-background">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                      <amenity.icon className="w-6 h-6 text-primary group-hover:text-primary-dark transition-colors duration-300" />
                    </div>
                    <h3 className="text-2xl font-playfair font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {amenity.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                    {amenity.description}
                  </p>
                  <button 
                    className="self-start px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary-dark hover:shadow-lg transition-all duration-300"
                  >
                    Learn More
                  </button>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* Regular Amenities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {regularAmenities.map((amenity, index) => (
            <Card key={`regular-${index}`} className="overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-500 bg-white group transform hover:-translate-y-2">
              <div className="relative h-48 overflow-hidden aspect-w-4 aspect-h-3">
                <OptimizedImage
                  src={amenity.image}
                  alt={amenity.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                    <amenity.icon className="w-5 h-5 text-primary group-hover:text-primary-dark transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-playfair font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                    {amenity.title}
                  </h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed text-balance">
                  {amenity.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <Card className="max-w-4xl mx-auto p-8 rounded-2xl shadow-xl border-0 bg-gradient-to-br from-primary/10 to-background relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0,0 C50,30 70,70 100,100" fill="none" stroke="primary" strokeWidth="20"/>
              </svg>
            </div>
            <CardContent className="p-0 relative z-10">
              <h3 className="text-3xl md:text-4xl font-playfair font-extrabold text-foreground mb-4">
                Elevate Your Stay
              </h3>
              <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto leading-relaxed">
                Our dedicated team is here to craft a personalized experience tailored to your unique needs. Let us make your stay extraordinary.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold shadow-md hover:bg-primary-dark hover:shadow-lg transition-all duration-300"
                >
                  View All Services
                </button>
                <button 
                  className="px-8 py-3 border border-primary text-primary rounded-full font-semibold hover:bg-primary/10 hover:text-primary-dark transition-all duration-300"
                >
                  Contact Concierge
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AmenitiesSection;