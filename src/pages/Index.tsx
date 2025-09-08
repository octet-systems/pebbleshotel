import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import RoomsSection from '@/components/RoomsSection';
import BookingSection from '@/components/BookingSection';
import AmenitiesSection from '@/components/AmenitiesSection';
import GallerySection from '@/components/GallerySection';
import EventsSection from '@/components/EventsSection';
import LocationSection from '@/components/LocationSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen scroll-smooth text-rendering-optimized">
      <Navigation />
      <main id="main-content" role="main" aria-label="Main content">
        <HeroSection />
        <section id="rooms" aria-label="Hotel rooms and accommodations">
          <RoomsSection />
        </section>
        <section id="booking" aria-label="Room booking">
          <BookingSection />
        </section>
        <section id="amenities" aria-label="Hotel amenities and facilities">
          <AmenitiesSection />
        </section>
        <section id="gallery" aria-label="Photo gallery">
          <GallerySection />
        </section>
        <section id="events" aria-label="Events and special occasions">
          <EventsSection />
        </section>
        <section id="location" aria-label="Hotel location and directions">
          <LocationSection />
        </section>
        <section id="contact" aria-label="Contact information">
          <ContactSection />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
