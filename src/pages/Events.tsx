import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Phone, 
  Mail,
  Star,
  Filter,
  Search
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { OptimizedImage } from '@/components/OptimizedImage';
import eventsImage from '@/assets/hero-hotel-exterior.jpg';
import weddingImage from '@/assets/luxury-suite.jpg';
import conferenceImage from '@/assets/deluxe-room.jpg';
import birthdayImage from '@/assets/spa-amenity.jpg';

const Events = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Events' },
    { id: 'wedding', name: 'Weddings' },
    { id: 'corporate', name: 'Corporate' },
    { id: 'social', name: 'Social' },
    { id: 'seasonal', name: 'Seasonal' }
  ];

  const events = [
    {
      id: 1,
      category: 'wedding',
      title: 'Elegant Garden Wedding',
      date: '2023-09-15',
      time: '4:00 PM - 11:00 PM',
      location: 'Garden Pavilion',
      capacity: '150 guests',
      image: weddingImage,
      price: '$8,500',
      rating: 4.9,
      reviews: 42,
      description: 'Celebrate your special day in our beautifully landscaped garden pavilion with elegant floral arrangements and string lights.',
      amenities: ['Catering Included', 'Full Bar Service', 'Event Coordinator', 'Audio/Visual Equipment']
    },
    {
      id: 2,
      category: 'corporate',
      title: 'Annual Tech Conference',
      date: '2023-10-05',
      time: '9:00 AM - 6:00 PM',
      location: 'Grand Ballroom',
      capacity: '300 attendees',
      image: conferenceImage,
      price: '$12,000',
      rating: 4.8,
      reviews: 28,
      description: 'Host your next corporate event in our state-of-the-art conference facilities with premium audio/visual technology.',
      amenities: ['High-Speed WiFi', 'Catering Options', 'Breakout Rooms', 'Tech Support']
    },
    {
      id: 3,
      category: 'social',
      title: 'Birthday Celebration Package',
      date: 'Available Year-Round',
      time: 'Flexible',
      location: 'Private Dining Room',
      capacity: '20-50 guests',
      image: birthdayImage,
      price: 'From $1,200',
      rating: 4.7,
      reviews: 36,
      description: 'Make your special birthday unforgettable with our customizable celebration packages and personalized menu options.',
      amenities: ['Custom Menu', 'Decorations', 'Event Planning', 'Special Cake']
    },
    {
      id: 4,
      category: 'seasonal',
      title: 'Summer Wine Tasting',
      date: '2023-07-22',
      time: '6:00 PM - 9:00 PM',
      location: 'Rooftop Terrace',
      capacity: '80 guests',
      image: eventsImage,
      price: '$75 per person',
      rating: 4.9,
      reviews: 54,
      description: 'Enjoy an exclusive wine tasting experience featuring local vineyards on our stunning rooftop terrace with city views.',
      amenities: ['Premium Wine Selection', 'Cheese Pairings', 'Live Music', 'Scenic Views']
    },
    {
      id: 5,
      category: 'wedding',
      title: 'Intimate Beach Wedding',
      date: 'Available Year-Round',
      time: 'Flexible',
      location: 'Private Beach',
      capacity: '20-60 guests',
      image: weddingImage,
      price: '$5,200',
      rating: 4.9,
      reviews: 31,
      description: 'Exchange vows on our pristine private beach with the sound of waves as your soundtrack and sunset as your backdrop.',
      amenities: ['Beach Setup', 'Floral Arrangements', 'Catering', 'Photography']
    },
    {
      id: 6,
      category: 'corporate',
      title: 'Executive Retreat',
      date: 'Available Year-Round',
      time: 'Flexible',
      location: 'Executive Boardroom',
      capacity: '10-25 executives',
      image: conferenceImage,
      price: 'From $3,500/day',
      rating: 4.8,
      reviews: 19,
      description: 'Strategic planning and team building in our exclusive executive retreat space with panoramic views and premium amenities.',
      amenities: ['Private Boardroom', 'Accommodations', 'Catering', 'Team Activities']
    }
  ];

  const filteredEvents = events.filter(event => {
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          event.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-overlay z-10"></div>
        <OptimizedImage
          src={eventsImage}
          alt="Events and weddings"
          className="w-full h-full object-cover"
        />
        <div className="relative z-20 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-4 animate-fade-up">
            Events & Weddings
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto animate-fade-up animate-fade-in-delay">
            Create unforgettable moments in our stunning event spaces
          </p>
        </div>
      </section>

      {/* Events Search and Filter */}
      <section className="py-8 bg-cream sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Search */}
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Search events..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-input focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  className={`rounded-full transition-all duration-300 ${
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
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden shadow-strong hover:shadow-xl transition-all duration-500 group">
                  <div className="grid grid-cols-1 md:grid-cols-3">
                    <div className="relative h-64 md:h-auto md:col-span-1">
                      <OptimizedImage
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full flex items-center gap-1">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="font-semibold">{event.rating}</span>
                      </div>
                    </div>
                    <CardContent className="p-8 md:p-10 md:col-span-2 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-2xl font-playfair font-bold text-foreground">
                            {event.title}
                          </h3>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary">{event.price}</div>
                          </div>
                        </div>
                        
                        <div className="space-y-3 mb-6">
                          <div className="flex items-center gap-3 text-muted-foreground">
                            <Calendar className="w-5 h-5 text-primary" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-3 text-muted-foreground">
                            <Clock className="w-5 h-5 text-primary" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-3 text-muted-foreground">
                            <MapPin className="w-5 h-5 text-primary" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center gap-3 text-muted-foreground">
                            <Users className="w-5 h-5 text-primary" />
                            <span>{event.capacity}</span>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          {event.description}
                        </p>
                        
                        <div className="mb-6">
                          <h4 className="font-semibold text-foreground mb-3">Included Amenities</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {event.amenities.map((amenity, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span className="w-2 h-2 rounded-full bg-primary"></span>
                                <span>{amenity}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button className="flex-1 bg-primary hover:bg-primary-dark text-primary-foreground">
                          Book Event
                        </Button>
                        <Button variant="outline" className="flex-1">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Filter className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
              <h3 className="text-2xl font-playfair font-bold text-foreground mb-2">
                No Events Found
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                We couldn't find any events matching your search criteria. Try adjusting your filters.
              </p>
              <Button onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Event Spaces */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-4">
              Our Event Spaces
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our versatile venues designed to accommodate any type of gathering.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="shadow-medium text-center group">
              <CardContent className="p-8">
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-full bg-primary-light group-hover:bg-primary transition-colors duration-300">
                    <MapPin className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>
                <h3 className="text-xl font-playfair font-semibold text-foreground mb-3">
                  Outdoor Venues
                </h3>
                <p className="text-muted-foreground mb-4">
                  Beautiful gardens, terraces, and beachfront locations for outdoor ceremonies and receptions.
                </p>
                <ul className="text-left space-y-2 text-sm text-muted-foreground mb-6">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    <span>Garden Pavilion</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    <span>Rooftop Terrace</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    <span>Private Beach</span>
                  </li>
                </ul>
                <Button variant="outline" size="sm">
                  View Spaces
                </Button>
              </CardContent>
            </Card>
            
            <Card className="shadow-medium text-center group">
              <CardContent className="p-8">
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-full bg-primary-light group-hover:bg-primary transition-colors duration-300">
                    <Users className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>
                <h3 className="text-xl font-playfair font-semibold text-foreground mb-3">
                  Indoor Venues
                </h3>
                <p className="text-muted-foreground mb-4">
                  Elegant ballrooms and private dining rooms with customizable layouts and premium amenities.
                </p>
                <ul className="text-left space-y-2 text-sm text-muted-foreground mb-6">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    <span>Grand Ballroom</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    <span>Executive Boardroom</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    <span>Private Dining Rooms</span>
                  </li>
                </ul>
                <Button variant="outline" size="sm">
                  View Spaces
                </Button>
              </CardContent>
            </Card>
            
            <Card className="shadow-medium text-center group">
              <CardContent className="p-8">
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-full bg-primary-light group-hover:bg-primary transition-colors duration-300">
                    <Star className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>
                <h3 className="text-xl font-playfair font-semibold text-foreground mb-3">
                  Full Service Planning
                </h3>
                <p className="text-muted-foreground mb-4">
                  Our dedicated event team handles every detail to ensure your special occasion is perfect.
                </p>
                <ul className="text-left space-y-2 text-sm text-muted-foreground mb-6">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    <span>Event Coordination</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    <span>Catering & Bar Services</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    <span>Audio/Visual Support</span>
                  </li>
                </ul>
                <Button variant="outline" size="sm">
                  Event Services
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-6">
            Plan Your Perfect Event
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Our experienced event planners are ready to help you create an unforgettable experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-8 py-3 rounded-lg font-medium shadow-lg">
              <Phone className="w-5 h-5 mr-2" />
              Contact Event Team
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg font-medium">
              <Mail className="w-5 h-5 mr-2" />
              Request Proposal
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Events;