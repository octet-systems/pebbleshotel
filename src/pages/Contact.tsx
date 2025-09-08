import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle,
  Instagram,
  Facebook,
  Twitter,
  Linkedin
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { OptimizedImage } from '@/components/OptimizedImage';
import contactImage from '@/assets/hero-hotel-exterior.jpg';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: '+265 999 771 155',
      subtext: 'Available 24/7 for bookings & support'
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'reservations@pebblesboutique.com',
      subtext: 'We reply within 24 hours'
    },
    {
      icon: MapPin,
      title: 'Address',
      details: 'Mangochi Road, Area 49',
      subtext: 'Lilongwe, Malawi'
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' }
  ];

  return (
    <div className="min-h-screen bg-cream">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-overlay z-10"></div>
        <OptimizedImage
          src={contactImage}
          alt="Contact us"
          className="w-full h-full object-cover"
        />
        <div className="relative z-20 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-4 animate-fade-up">
            Get in Touch
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto animate-fade-up animate-fade-in-delay">
            We're here to assist you with any questions or requests
          </p>
        </div>
      </section>

      {/* Contact Information and Form */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Information Cards */}
            <div className="lg:col-span-2 space-y-8">
              {contactInfo.map((item, index) => (
                <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white rounded-xl">
                  <CardContent className="p-6 flex items-center gap-6">
                    <div className="p-4 rounded-full bg-primary/10">
                      <item.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-playfair font-semibold text-primary mb-1">
                        {item.title}
                      </h3>
                      <p className="text-foreground font-medium text-lg">
                        {item.details}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {item.subtext}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <Card className="shadow-xl bg-white rounded-2xl">
                <CardHeader className="bg-primary text-white rounded-t-2xl">
                  <CardTitle className="text-2xl font-playfair p-4">
                    Send us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="contact-name">Full Name</Label>
                        <Input
                          id="contact-name"
                          placeholder="e.g. John Doe"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="py-6"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-email">Email Address</Label>
                        <Input
                          id="contact-email"
                          type="email"
                          placeholder="e.g. john.doe@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="py-6"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-subject">Subject</Label>
                      <Input
                        id="contact-subject"
                        placeholder="What is this regarding?"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="py-6"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-message">Message</Label>
                      <Textarea
                        id="contact-message"
                        placeholder="Tell us how we can help you..."
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      size="lg"
                      className="w-full bg-primary hover:bg-primary-dark text-primary-foreground text-lg py-7 rounded-lg transition-transform transform hover:scale-105"
                    >
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
            <Card className="shadow-lg bg-white rounded-xl">
              <CardHeader>
                <h3 className="text-xl font-playfair font-semibold text-primary">Follow Us</h3>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center gap-6">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className="p-4 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-white transition-all duration-300 transform hover:scale-110"
                    >
                      <social.icon className="w-6 h-6" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg bg-white rounded-xl">
              <CardHeader>
                <h3 className="text-xl font-playfair font-semibold text-primary">Reception Hours</h3>
              </CardHeader>
              <CardContent className="space-y-3 text-foreground/80">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="font-medium flex items-center gap-2"><Clock size={16} /> Check-in:</span>
                  <span className="font-mono">3:00 PM - 11:00 PM</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="font-medium flex items-center gap-2"><Clock size={16} /> Check-out:</span>
                  <span className="font-mono">6:00 AM - 12:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium flex items-center gap-2"><Clock size={16} /> Front Desk:</span>
                  <span className="font-mono">24/7</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;