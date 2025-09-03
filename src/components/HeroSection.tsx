import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-hotel-exterior.jpg';

const HeroSection = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Pebbles Boutique Hotel exterior with modern architecture surrounded by lush greenery"
          className="w-full h-full object-cover"
        />
        <div className="hero-overlay absolute inset-0"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-6 animate-fade-up text-balance">
          Welcome to
          <span className="block text-primary-light">Pebbles Boutique</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-gray-200 font-light animate-fade-in-delay max-w-2xl mx-auto text-balance">
          Experience serene luxury in the heart of Area 49. Where modern elegance meets tranquil sophistication.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary-dark text-primary-foreground px-8 py-3 text-lg font-medium transition-spring"
          >
            Reserve Your Stay
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-foreground px-8 py-3 text-lg font-medium transition-spring"
          >
            Explore Rooms
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;