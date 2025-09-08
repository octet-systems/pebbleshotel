import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "Thank you for your inquiry. We'll get back to you soon!",
    });
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
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
    <section id="contact" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-primary mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto text-balance">
            We're here to help you plan your perfect stay. Reach out to us for reservations, inquiries, or any assistance you need.
          </p>
        </div>

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
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
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
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
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

        {/* Additional Info Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
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
  );
};

export default ContactSection;