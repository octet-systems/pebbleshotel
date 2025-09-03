import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    hotel: [
      { name: 'About Us', href: '#' },
      { name: 'Our Story', href: '#' },
      { name: 'Awards', href: '#' },
      { name: 'Careers', href: '#' }
    ],
    services: [
      { name: 'Rooms & Suites', href: '#rooms' },
      { name: 'Dining', href: '#' },
      { name: 'Spa & Wellness', href: '#amenities' },
      { name: 'Events', href: '#' }
    ],
    support: [
      { name: 'Contact Us', href: '#contact' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'FAQs', href: '#' }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' }
  ];

  return (
    <footer className="bg-primary-dark text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Hotel Info */}
          <div className="lg:col-span-1">
            <h3 className="text-3xl font-playfair font-bold mb-4">Pebbles</h3>
            <p className="text-primary-light mb-6 leading-relaxed">
              Experience serene luxury in the heart of Area 49. Where modern elegance meets tranquil sophistication.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-sage-light" />
                <span className="text-sm">123 Serenity Boulevard, Area 49</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-sage-light" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-sage-light" />
                <span className="text-sm">reservations@pebblesboutique.com</span>
              </div>
            </div>
          </div>

          {/* Hotel Links */}
          <div>
            <h4 className="text-lg font-playfair font-semibold mb-4">Hotel</h4>
            <ul className="space-y-2">
              {footerLinks.hotel.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-primary-light hover:text-white transition-smooth text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-lg font-playfair font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-primary-light hover:text-white transition-smooth text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-lg font-playfair font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-primary-light hover:text-white transition-smooth text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-primary-light/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-primary-light hover:text-white transition-smooth"
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-primary-light text-sm">
                © {currentYear} Pebbles Boutique Hotels. All rights reserved.
              </p>
              <p className="text-primary-light text-xs mt-1">
                Crafted with care for your perfect stay.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;