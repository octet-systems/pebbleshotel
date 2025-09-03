import { Calendar, Clock, Users, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const EventsSection = () => {
  const events = [
    {
      id: 1,
      title: 'Malawian Cultural Night',
      description: 'Experience traditional dances, local music, and authentic Malawian cuisine.',
      date: '2024-09-15',
      time: '7:00 PM - 10:00 PM',
      location: 'Hotel Gardens',
      capacity: '50 guests',
      price: 'Free for guests',
      category: 'Cultural',
      featured: true
    },
    {
      id: 2,
      title: 'Lake Malawi Day Trip',
      description: 'Guided excursion to the beautiful shores of Lake Malawi with lunch included.',
      date: '2024-09-18',
      time: '8:00 AM - 6:00 PM',
      location: 'Cape Maclear',
      capacity: '20 guests',
      price: '$85 per person',
      category: 'Adventure',
      featured: true
    },
    {
      id: 3,
      title: 'Wine & Art Evening',
      description: 'Showcase of local Malawian artists with wine tasting and live jazz music.',
      date: '2024-09-22',
      time: '6:30 PM - 9:30 PM',
      location: 'Boutique Lounge',
      capacity: '30 guests',
      price: '$25 per person',
      category: 'Art & Culture',
      featured: false
    },
    {
      id: 4,
      title: 'Dedza Pottery Workshop',
      description: 'Hands-on pottery making experience at the famous Dedza Pottery Lodge.',
      date: '2024-09-25',
      time: '9:00 AM - 4:00 PM',
      location: 'Dedza (45 min drive)',
      capacity: '15 guests',
      price: '$60 per person',
      category: 'Workshop',
      featured: false
    },
    {
      id: 5,
      title: 'Lilongwe City Tour',
      description: 'Explore the capital city, visit local markets, and discover hidden gems.',
      date: '2024-09-28',
      time: '10:00 AM - 3:00 PM',
      location: 'Lilongwe City',
      capacity: '25 guests',
      price: '$35 per person',
      category: 'Sightseeing',
      featured: false
    },
    {
      id: 6,
      title: 'Traditional Cooking Class',
      description: 'Learn to prepare authentic Malawian dishes with our local chef.',
      date: '2024-10-02',
      time: '11:00 AM - 2:00 PM',
      location: 'Hotel Kitchen',
      capacity: '12 guests',
      price: '$40 per person',
      category: 'Culinary',
      featured: true
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      'Cultural': 'bg-sage/20 text-sage',
      'Adventure': 'bg-primary/20 text-primary',
      'Art & Culture': 'bg-warm-beige/20 text-foreground',
      'Workshop': 'bg-soft-gold/20 text-foreground',
      'Sightseeing': 'bg-muted text-muted-foreground',
      'Culinary': 'bg-accent/20 text-accent-foreground'
    };
    return colors[category as keyof typeof colors] || 'bg-muted text-muted-foreground';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <section id="events" className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
            Upcoming Events
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Immerse yourself in the rich culture and natural beauty of Malawi with our carefully curated experiences and events.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {events.map((event) => (
            <Card 
              key={event.id} 
              className={`shadow-medium hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 ${
                event.featured ? 'ring-2 ring-primary/20' : ''
              }`}
            >
              <CardHeader className="space-y-3">
                <div className="flex items-start justify-between">
                  <Badge className={getCategoryColor(event.category)}>
                    {event.category}
                  </Badge>
                  {event.featured && (
                    <Badge variant="outline" className="text-primary border-primary">
                      Featured
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl font-playfair leading-tight">
                  {event.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {event.description}
                </p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{event.capacity}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="font-semibold text-primary text-lg">
                    {event.price}
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="hover:bg-primary hover:text-primary-foreground"
                  >
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary-dark text-primary-foreground px-8"
          >
            View All Events
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;