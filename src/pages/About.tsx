import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, Clock, Award, Users, Heart, Leaf } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { OptimizedImage } from '@/components/OptimizedImage';
import aboutImage from '@/assets/hero-hotel-exterior.jpg';
import teamImage from '@/assets/luxury-suite.jpg';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Passion',
      description: 'We are passionate about creating unforgettable experiences for our guests.'
    },
    {
      icon: Users,
      title: 'Hospitality',
      description: 'Exceptional service and genuine care are at the heart of everything we do.'
    },
    {
      icon: Leaf,
      title: 'Sustainability',
      description: 'We are committed to environmentally responsible practices.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of our operations.'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      position: 'General Manager',
      experience: '15 years in luxury hospitality'
    },
    {
      name: 'Michael Chen',
      position: 'Executive Chef',
      experience: '12 years culinary expertise'
    },
    {
      name: 'Elena Rodriguez',
      position: 'Spa Director',
      experience: '10 years wellness industry'
    },
    {
      name: 'David Wilson',
      position: 'Concierge Manager',
      experience: '8 years guest experience'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-overlay z-10"></div>
        <OptimizedImage
          src={aboutImage}
          alt="Elegant hotel interior"
          className="w-full h-full object-cover"
        />
        <div className="relative z-20 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-4 animate-fade-up">
            Our Story
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto animate-fade-up animate-fade-in-delay">
            Discover the passion and dedication behind Pebbles Boutique Hotels
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-6">
                A Legacy of Excellence
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Founded in 2010, Pebbles Boutique Hotels began with a simple vision: to create intimate, 
                luxurious spaces where travelers could experience authentic hospitality and exceptional service.
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                What started as a single property has grown into a collection of distinctive hotels, 
                each reflecting the unique character of its location while maintaining our commitment to 
                personalized service and attention to detail.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Today, we continue to honor our founding principles while embracing innovation and 
                sustainability to provide memorable experiences for discerning travelers from around the world.
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary-dark text-primary-foreground px-8 py-3 rounded-lg font-medium">
                Our Philosophy
              </Button>
            </div>
            <div className="relative">
              <OptimizedImage
                src={aboutImage}
                alt="Hotel history"
                className="rounded-xl shadow-strong"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-lg">
                <p className="text-3xl font-bold font-playfair">14+</p>
                <p className="text-lg">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do and define who we are as a hospitality brand.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center shadow-medium hover:shadow-strong transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-6">
                    <div className="p-4 rounded-full bg-primary-light group-hover:bg-primary transition-colors duration-300">
                      <value.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>
                  <h3 className="text-xl font-playfair font-semibold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-balance">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-4">
              Meet Our Leadership
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The passionate individuals who bring our vision to life every day.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center shadow-medium hover:shadow-strong transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="relative mb-6 mx-auto w-32 h-32">
                    <div className="w-full h-full rounded-full bg-gradient-hero flex items-center justify-center">
                      <Users className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-playfair font-semibold text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-2">
                    {member.position}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {member.experience}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-playfair font-bold text-foreground mb-6">
                  Get in Touch
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  We'd love to hear from you. Whether you have questions about our properties, 
                  services, or career opportunities, our team is ready to assist you.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary-light">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Visit Us</h3>
                      <p className="text-muted-foreground">
                        123 Luxury Avenue<br />
                        Serene City, SC 12345
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary-light">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Call Us</h3>
                      <p className="text-muted-foreground">
                        +1 (555) 123-4567<br />
                        24/7 Concierge: +1 (555) 123-4568
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary-light">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Email Us</h3>
                      <p className="text-muted-foreground">
                        info@pebblesboutiquehotels.com<br />
                        careers@pebblesboutiquehotels.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-cream rounded-xl p-8">
                <h3 className="text-2xl font-playfair font-bold text-foreground mb-6">
                  Send us a Message
                </h3>
                <form className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-4 py-3 rounded-lg border border-input focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full px-4 py-3 rounded-lg border border-input focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Your Message"
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-input focus:outline-none focus:ring-2 focus:ring-primary"
                    ></textarea>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary-dark text-primary-foreground py-3">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;