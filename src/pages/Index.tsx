import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import RoomsSection from '@/components/RoomsSection';
import BookingSection from '@/components/BookingSection';
import AmenitiesSection from '@/components/AmenitiesSection';
import GallerySection from '@/components/GallerySection';
import LocationSection from '@/components/LocationSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen scroll-smooth">
      <Navigation />
      <main>
        <HeroSection />
        <RoomsSection />
        <BookingSection />
        <AmenitiesSection />
        <GallerySection />
        <LocationSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
