import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const id = href.substring(1);
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      history.pushState(null, null, href);
    }
  };

  // Navigation items for homepage sections
  const homeNavItems = [
    { name: 'Home', href: '#home' },
    { name: 'Rooms', href: '#rooms' },
    { name: 'Amenities', href: '#amenities' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Location', href: '#location' },
    { name: 'Contact', href: '#contact' },
  ];

  // Navigation items for all pages
  const pageNavItems = [
    { name: 'Home', href: '/' },
    { name: 'Rooms', href: '/rooms' },
    { name: 'Services', href: '/services' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Events', href: '/events' },
    { name: 'About', href: '/about' },
    { name: 'Demo', href: '/booking-demo' },
    { name: 'Contact', href: '/contact' },
  ];

  // Determine which nav items to show based on current page
  const isHomePage = location.pathname === '/';
  const navItems = isHomePage ? homeNavItems : pageNavItems;
  const navClasses = isHomePage
    ? `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-medium' 
          : 'bg-transparent'
      }`
    : 'fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-medium';

  return (
    <nav 
      className={navClasses}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" aria-label="Pebbles Boutique Hotel - Go to home page">
              <h1 className={`text-3xl font-playfair font-bold transition-colors duration-300 ${
                isHomePage && !scrolled ? 'text-white' : 'text-primary'
              }`}>
                Pebbles
                <span className="text-sm font-light block -mt-1">BOUTIQUE</span>
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <nav className="ml-10 flex items-center space-x-8" role="menubar" aria-label="Main menu">
              {navItems.map((item, index) => (
                isHomePage ? (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                      isHomePage && !scrolled ? 'text-white/90 hover:text-white' : 'text-foreground hover:text-primary'
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={(e) => handleScrollTo(e, item.href)}
                    role="menuitem"
                    aria-label={`Navigate to ${item.name} section`}
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" aria-hidden="true"></span>
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                      isHomePage && !scrolled ? 'text-white/90 hover:text-white' : 'text-foreground hover:text-primary'
                    } ${location.pathname === item.href ? 'text-primary font-semibold' : ''}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    role="menuitem"
                    aria-label={`Navigate to ${item.name} page`}
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" aria-hidden="true"></span>
                  </Link>
                )
              ))}
            </nav>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`${isHomePage && !scrolled ? 'text-white hover:text-primary-light' : 'text-foreground hover:text-primary'} transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
              aria-label="Call hotel for immediate assistance"
              asChild
            >
              <a href="tel:+265999771155">
                <Phone className="w-4 h-4 mr-2" aria-hidden="true" />
                Call Us
              </a>
            </Button>
            <Button 
              className="w-full bg-primary hover:bg-primary-dark text-primary-foreground rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Book your hotel room now"
              asChild
            >
              <Link to="/rooms">Book Now</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className={`${isHomePage && !scrolled ? 'text-white' : 'text-foreground'} hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-screen border-t border-border/20' : 'max-h-0'
          } backdrop-blur-md`}
          id="mobile-menu"
          role="menu"
          aria-label="Mobile navigation menu"
        >
          <div className={`px-4 pt-4 pb-6 space-y-2 transition-all duration-300 ${
            isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}>
              {navItems.map((item, index) => (
                isHomePage ? (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`block px-4 py-4 text-base font-medium rounded-xl transition-all duration-200 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 min-h-[48px] flex items-center mobile-touch-target ${
                      isHomePage && !scrolled ? 'text-white hover:text-primary-light' : 'text-foreground hover:text-primary'
                    } transform hover:scale-105 active:scale-95`}
                    onClick={(e) => {
                      setIsOpen(false);
                      handleScrollTo(e, item.href);
                    }}
                    style={{ animationDelay: `${index * 0.05}s` }}
                    role="menuitem"
                    aria-label={`Navigate to ${item.name} section`}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-4 py-4 text-base font-medium rounded-xl transition-all duration-200 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 min-h-[48px] flex items-center mobile-touch-target ${
                      isHomePage && !scrolled ? 'text-white hover:text-primary-light' : 'text-foreground hover:text-primary'
                    } ${location.pathname === item.href ? 'text-primary font-semibold bg-primary/10' : ''} transform hover:scale-105 active:scale-95`}
                    onClick={() => setIsOpen(false)}
                    style={{ animationDelay: `${index * 0.05}s` }}
                    role="menuitem"
                    aria-label={`Navigate to ${item.name} page`}
                  >
                    {item.name}
                  </Link>
                )
              ))}
              <div className="pt-6 space-y-4 border-t border-white/10">
                <Button 
                  variant="ghost" 
                  size="lg"
                  className={`w-full justify-start min-h-[48px] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 ${
                    isHomePage && !scrolled ? 'text-white hover:bg-white/10' : 'text-foreground hover:bg-foreground/10'
                  }`}
                  aria-label="Call hotel for immediate assistance"
                  asChild
                >
                  <a href="tel:+265999771155">
                    <Phone className="w-5 h-5 mr-3" aria-hidden="true" />
                    <span className="text-base font-medium">Call Us</span>
                  </a>
                </Button>
                <Button 
                  size="lg"
                  className="w-full bg-primary hover:bg-primary-dark text-primary-foreground rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 min-h-[48px] transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
                  aria-label="Book your hotel room now"
                  asChild
                >
                  <Link to="/rooms">
                    <span className="text-base font-semibold">Book Now</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
      </div>
    </nav>
  );
};

export default Navigation;