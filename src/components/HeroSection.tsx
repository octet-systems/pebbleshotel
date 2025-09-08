import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronDown, Calendar, Star, ArrowRight } from 'lucide-react';
import { OptimizedImage } from '@/components/OptimizedImage';
import hotelHero from '@/assets/hotel-hero.jpg';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToRooms = () => {
    document.getElementById('rooms')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollToRooms();
    }
  };

  return (
    <section 
      id="home" 
      className="h-screen flex flex-col lg:flex-row items-center justify-center overflow-hidden bg-cream"
      aria-label="Luxury hotel experience at Pebbles Boutique Hotel"
      role="banner"
    >
      {/* Text Content */}
      <div
        className={`w-full lg:w-1/2 h-full flex flex-col items-start justify-center p-8 lg:p-16 text-left transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-playfair font-semibold text-primary mb-6 leading-tight tracking-tight">
          Experience Timeless<br />Luxury
        </h1>

        <p className="text-lg md:text-xl text-foreground/80 font-light max-w-2xl leading-relaxed mb-10">
          Our premier urban sanctuary in the heart of the city.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-start items-center mt-10">
          <Button 
            asChild 
            size="lg" 
            className="bg-primary hover:bg-primary-dark text-primary-foreground font-medium py-3 px-8 text-base uppercase tracking-wider transition duration-300 transform hover:scale-105 rounded-none"
          >
            <Link to="/rooms">
              <Calendar className="w-5 h-5 mr-2" />
              Reserve Your Stay
            </Link>
          </Button>
          <Button 
            asChild 
            variant="outline" 
            size="lg"
            className="border border-primary hover:bg-primary/10 text-primary font-medium py-3 px-8 text-base uppercase tracking-wider transition duration-300 rounded-none"
          >
            <Link to="/about">
              Explore Pebbles
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-8 left-8 text-primary animate-bounce-slow cursor-pointer"
          onClick={scrollToRooms}
          role="button"
          tabIndex={0}
          aria-label="Scroll down to discover more"
          onKeyDown={handleKeyDown}
        >
          <div className="flex flex-col items-center">
            <span className="text-xs uppercase tracking-widest mb-2">Scroll to discover</span>
            <div className="w-8 h-8 rounded-full flex items-center justify-center">
              <ChevronDown className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Image Content */}
      <div className="w-full lg:w-1/2 h-full overflow-hidden">
        <OptimizedImage
          src={hotelHero}
          alt="Pebbles Boutique Hotel exterior"
          className="w-full h-full object-cover"
          lazy={false}
        />
      </div>
    </section>
  );
};

export default HeroSection;