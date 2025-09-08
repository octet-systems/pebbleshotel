import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Waves, 
  Utensils, 
  Dumbbell, 
  Wifi, 
  Car, 
  Coffee, 
  Flower2, 
  Shield, 
  ConciergeBell, 
  ParkingCircle, 
  Camera, 
  Gamepad2,
  Calendar,
  Clock,
  MapPin,
  Phone,
  ChevronRight,
  Star
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { OptimizedImage } from '@/components/OptimizedImage';
import spaImage from '@/assets/spa-amenity.jpg';
import diningImage from '@/assets/deluxe-room.jpg';
import fitnessImage from '@/assets/deluxe-room.jpg';


const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isFiltering, setIsFiltering] = useState(false);
  
  const serviceCategories = [
    { id: 'all', name: 'All Services', icon: Star },
    { id: 'wellness', name: 'Wellness', icon: Waves },
    { id: 'dining', name: 'Dining', icon: Utensils },
    { id: 'activities', name: 'Activities', icon: Dumbbell },
    { id: 'business', name: 'Business', icon: Wifi },
    { id: 'concierge', name: 'Concierge', icon: ConciergeBell }
  ];

  const services = [
    {
      id: 1,
      category: 'wellness',
      icon: Waves,
      title: 'Full-Service Spa',
      description: 'Indulge in our award-winning spa featuring a range of treatments from massages to facials. Our expert therapists use premium products and ancient techniques to restore your inner balance.',
      image: spaImage,
      featured: true,
      details: [
        'Swedish, Deep Tissue, and Hot Stone Massages',
        'Facials and Body Treatments',
        'Aromatherapy and Hydrotherapy',
        'Meditation and Yoga Sessions'
      ],
      pricing: 'From $120',
      duration: '30-90 min',
      rating: 4.9
    },
    {
      id: 2,
      category: 'dining',
      icon: Utensils,
      title: 'Signature Restaurant',
      description: 'Experience culinary excellence at our signature restaurant featuring locally-sourced ingredients and international flavors crafted by our award-winning chef.',
      image: diningImage,
      featured: true,
      details: [
        'Breakfast, Lunch, and Dinner Service',
        'International and Local Cuisine',
        'Wine Pairing Options',
        'Private Dining Available'
      ],
      pricing: 'Fine Dining',
      duration: 'Daily 7am-10pm',
      rating: 4.8
    },
    {
      id: 3,
      category: 'activities',
      icon: Dumbbell,
      title: 'Fitness Center',
      description: 'Stay active with our state-of-the-art fitness facility equipped with modern equipment and personal training services.',
      image: fitnessImage,
      details: [
        'Cardio and Strength Equipment',
        'Free Weights and Functional Training Area',
        'Personal Training Sessions',
        'Group Fitness Classes'
      ],
      pricing: 'Complimentary',
      duration: '24/7 Access',
      rating: 4.7
    },
    {
      id: 4,
      category: 'wellness',
      icon: Waves,
      title: 'Infinity Pool',
      description: 'Relax by our infinity pool with stunning views, perfect for unwinding after a day of exploration.',
      details: [
        'Heated Pool and Spa',
        'Poolside Service',
        'Sun Loungers and Cabanas',
        'Towel Service'
      ],
      pricing: 'Complimentary',
      duration: 'Daily 7am-9pm',
      rating: 4.8
    },
    {
      id: 5,
      category: 'business',
      icon: Wifi,
      title: 'High-Speed WiFi',
      description: 'Stay connected with complimentary high-speed internet access throughout the property.',
      details: [
        'Complimentary WiFi in All Areas',
        'Premium Business WiFi',
        'Dedicated Workstations',
        'Printing and Copying Services'
      ],
      pricing: 'Complimentary',
      duration: '24/7',
      rating: 4.6
    },
    {
      id: 6,
      category: 'activities',
      icon: Car,
      title: 'Valet Parking',
      description: 'Convenient valet parking service available 24/7 for all our guests.',
      details: [
        '24/7 Valet Service',
        'Self-Parking Also Available',
        'Electric Vehicle Charging',
        'Car Wash Service'
      ],
      pricing: '$35/day',
      duration: '24/7',
      rating: 4.5
    },
    {
      id: 7,
      category: 'concierge',
      icon: Coffee,
      title: '24-Hour Room Service',
      description: 'Gourmet meals and beverages delivered to your room around the clock.',
      details: [
        '24/7 Room Service',
        'Extensive Menu Selection',
        'Special Dietary Accommodations',
        'Wine and Cocktail Service'
      ],
      pricing: 'Menu Pricing',
      duration: '24/7',
      rating: 4.7
    },
    {
      id: 8,
      category: 'concierge',
      icon: Shield,
      title: 'Concierge Service',
      description: 'Our dedicated concierge team is available to assist with reservations, tours, and local recommendations.',
      details: [
        'Local Attraction Tickets',
        'Restaurant Reservations',
        'Transportation Arrangements',
        'Custom Itinerary Planning'
      ],
      pricing: 'Complimentary',
      duration: '24/7',
      rating: 4.9
    }
  ];

  useEffect(() => {
    if (selectedCategory) {
      setIsFiltering(true);
      const timer = setTimeout(() => setIsFiltering(false), 300);
      return () => clearTimeout(timer);
    }
  }, [selectedCategory]);

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  const featuredServices = filteredServices.filter(service => service.featured);
  const regularServices = filteredServices.filter(service => !service.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-gray-900/30 to-gray-900/60 z-10"></div>
        <OptimizedImage
          src={spaImage}
          alt="Luxury hotel services"
          className="w-full h-full object-cover scale-105 transition-transform duration-[10s] hover:scale-100"
          priority
        />
        <div className="relative z-20 text-center text-white px-4 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-playfair font-extrabold mb-6 animate-slide-up drop-shadow-lg">
            Discover Our Premium Services
          </h1>
          <div className="w-32 h-1 bg-amber-400 mx-auto mb-8 rounded-full"></div>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed tracking-wide">
            Immerse yourself in luxury with our carefully curated amenities and personalized services designed for your comfort.
          </p>
          <Button className="bg-amber-400 hover:bg-amber-500 text-gray-900 px-10 py-4 rounded-full font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-300">
            Explore Services
            <ChevronRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent z-20"></div>
      </section>

      {/* Services Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-extrabold text-gray-900 mb-4">
              Curated Experiences
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Explore our exclusive services crafted to elevate your stay to extraordinary heights.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {serviceCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  className={`flex items-center px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category.id 
                      ? 'bg-amber-400 text-gray-900 shadow-md scale-105' 
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 hover:shadow-md'
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <IconComponent className="w-5 h-5 mr-2" />
                  {category.name}
                </button>
              );
            })}
          </div>

          {/* Featured Services */}
          {featuredServices.length > 0 && (
            <div className={`grid grid-cols-1 gap-12 mb-20 transition-opacity duration-500 ${isFiltering ? 'opacity-60' : 'opacity-100'}`}>
              {featuredServices.map((service) => (
                <Card key={service.id} className="overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 bg-white">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="relative h-96 lg:h-auto overflow-hidden">
                      <OptimizedImage
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center shadow-sm">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400 mr-1" />
                        <span className="text-sm font-semibold text-gray-900">{service.rating}</span>
                      </div>
                    </div>
                    <CardContent className="p-8 lg:p-10 flex flex-col justify-center bg-gradient-to-b from-white to-gray-50">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-full bg-amber-100/50">
                          <service.icon className="w-6 h-6 text-amber-500" />
                        </div>
                        <h3 className="text-3xl font-playfair font-bold text-gray-900">
                          {service.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                        {service.description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-amber-500" />
                          <span className="text-sm text-gray-700">{service.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-amber-500">{service.pricing}</span>
                        </div>
                      </div>
                      
                      <ul className="mb-6 space-y-3">
                        {service.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-600">
                            <span className="text-amber-500 mt-1.5">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="flex flex-wrap gap-4 mt-4">
                        <Button className="bg-amber-400 hover:bg-amber-500 text-gray-900 px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition-all">
                          Book Now
                        </Button>
                        <Button variant="outline" className="border-amber-400 text-amber-500 hover:bg-amber-50 px-8 py-3 rounded-full font-semibold transition-all">
                          Learn More
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Regular Services Grid */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-500 ${isFiltering ? 'opacity-60' : 'opacity-100'}`}>
            {regularServices.map((service) => (
              <Card key={service.id} className="overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 bg-white h-full flex flex-col group">
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent z-10"></div>
                  <OptimizedImage
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-2 py-1 rounded-full flex items-center shadow-sm z-20">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400 mr-1" />
                    <span className="text-xs font-semibold text-gray-900">{service.rating}</span>
                  </div>
                  <div className="absolute top-4 left-4 z-20">
                    <div className="p-2 rounded-full bg-amber-100/50">
                      <service.icon className="w-5 h-5 text-amber-500" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-playfair font-semibold text-gray-900 mb-3 group-hover:text-amber-500 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 flex-grow leading-relaxed text-sm">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-amber-500" />
                      <span className="text-gray-700">{service.duration}</span>
                    </div>
                    <span className="font-semibold text-amber-500">{service.pricing}</span>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-auto border-amber-400 text-amber-500 hover:bg-amber-50 rounded-full font-semibold group-hover:border-amber-500 group-hover:text-amber-600 transition-all"
                  >
                    View Details
                    <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-600 text-lg font-medium">No services found in this category</div>
              <Button 
                variant="outline" 
                className="mt-4 border-amber-400 text-amber-500 hover:bg-amber-50 px-8 py-3 rounded-full font-semibold"
                onClick={() => setSelectedCategory('all')}
              >
                View All Services
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-amber-50 to-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,0 C50,30 70,70 100,100" fill="none" stroke="amber-200" strokeWidth="20"/>
          </svg>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-playfair font-extrabold text-gray-900 mb-6">
            Tailored Luxury Awaits
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Let our dedicated team craft a personalized experience that exceeds your expectations. Your perfect stay begins here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-amber-400 text-gray-900 hover:bg-amber-500 px-10 py-4 rounded-full font-semibold shadow-md hover:shadow-lg transition-all"
            >
              <Phone className="w-5 h-5 mr-2" />
              Contact Concierge
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-amber-400 text-amber-500 hover:bg-amber-50 px-10 py-4 rounded-full font-semibold transition-all"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book a Service
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;