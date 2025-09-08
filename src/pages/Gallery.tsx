import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, ChevronLeft, ChevronRight, Grid, List, Camera } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { OptimizedImage } from '@/components/OptimizedImage';

// We'll use existing images for the gallery
import room1 from '@/assets/deluxe-room.jpg';
import room2 from '@/assets/luxury-suite.jpg';
import room3 from '@/assets/spa-amenity.jpg';
import suite1 from '@/assets/hero-hotel-exterior.jpg';
import spaImage from '@/assets/spa-amenity.jpg';
import diningImage from '@/assets/deluxe-room.jpg';
import fitnessImage from '@/assets/luxury-suite.jpg';
import aboutImage from '@/assets/hero-hotel-exterior.jpg';
import contactImage from '@/assets/spa-amenity.jpg';
import heroImage from '@/assets/hero-hotel-exterior.jpg';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const categories = [
    { id: 'all', name: 'All Photos' },
    { id: 'rooms', name: 'Rooms & Suites' },
    { id: 'amenities', name: 'Amenities' },
    { id: 'dining', name: 'Dining' },
    { id: 'events', name: 'Events' },
    { id: 'hotel', name: 'Hotel & Grounds' }
  ];

  const galleryImages = [
    { id: 1, src: heroImage, alt: 'Luxury hotel exterior', category: 'hotel' },
    { id: 2, src: room1, alt: 'Elegant guest room', category: 'rooms' },
    { id: 3, src: room2, alt: 'Modern bathroom', category: 'rooms' },
    { id: 4, src: room3, alt: 'Ocean view suite', category: 'rooms' },
    { id: 5, src: suite1, alt: 'Luxurious suite living area', category: 'rooms' },
    { id: 6, src: spaImage, alt: 'Spa treatment room', category: 'amenities' },
    { id: 7, src: diningImage, alt: 'Fine dining restaurant', category: 'dining' },
    { id: 8, src: fitnessImage, alt: 'Modern fitness center', category: 'amenities' },
    { id: 9, src: aboutImage, alt: 'Hotel lobby', category: 'hotel' },
    { id: 10, src: contactImage, alt: 'Hotel garden', category: 'hotel' },
    { id: 11, src: heroImage, alt: 'Swimming pool area', category: 'amenities' },
    { id: 12, src: diningImage, alt: 'Breakfast buffet', category: 'dining' }
  ];

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(image => image.category === selectedCategory);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  // Handle keyboard navigation in lightbox
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-overlay z-10"></div>
        <OptimizedImage
          src={heroImage}
          alt="Hotel gallery"
          className="w-full h-full object-cover"
        />
        <div className="relative z-20 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-4 animate-fade-up">
            Photo Gallery
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto animate-fade-up animate-fade-in-delay">
            Explore our luxury hotel through our carefully curated collection of images
          </p>
        </div>
      </section>

      {/* Gallery Controls */}
      <section className="py-8 bg-cream sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  className={`rounded-full transition-all duration-300 ${
                    selectedCategory === category.id 
                      ? 'bg-primary text-primary-foreground shadow-lg' 
                      : 'bg-background hover:bg-primary/10'
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
            
            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-sm">View:</span>
              <div className="flex bg-background rounded-lg p-1 shadow">
                <Button
                  variant={viewMode === 'grid' ? "default" : "ghost"}
                  size="sm"
                  className={`rounded-md ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? "default" : "ghost"}
                  size="sm"
                  className={`rounded-md ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredImages.map((image, index) => (
                <div 
                  key={image.id} 
                  className="relative group cursor-pointer overflow-hidden rounded-lg shadow-medium hover:shadow-strong transition-all duration-300"
                  onClick={() => openLightbox(index)}
                >
                  <div className="aspect-square">
                    <OptimizedImage
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredImages.map((image, index) => (
                <Card 
                  key={image.id} 
                  className="overflow-hidden shadow-medium hover:shadow-strong transition-all duration-300 cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                      <div className="aspect-video md:aspect-square">
                        <OptimizedImage
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="md:col-span-2 p-6">
                      <h3 className="text-xl font-playfair font-semibold text-foreground mb-2">
                        {image.alt}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Explore this beautiful space at Pebbles Boutique Hotels. Each area of our property 
                        has been thoughtfully designed to provide an exceptional experience for our guests.
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Camera className="w-4 h-4" />
                        <span>Click to view larger image</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
          
          {filteredImages.length === 0 && (
            <div className="text-center py-16">
              <Camera className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
              <h3 className="text-2xl font-playfair font-bold text-foreground mb-2">
                No Images Found
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                There are no images in the selected category. Try selecting a different category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && selectedImage !== null && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className="relative max-w-6xl max-h-full" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute top-4 right-4 text-white hover:text-primary z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>
            
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-primary z-10 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
              onClick={prevImage}
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-primary z-10 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
              onClick={nextImage}
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            
            <div className="max-h-[90vh]">
              <OptimizedImage
                src={filteredImages[selectedImage].src}
                alt={filteredImages[selectedImage].alt}
                className="max-h-[80vh] w-auto max-w-full object-contain"
              />
            </div>
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full">
              {selectedImage + 1} of {filteredImages.length}
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-6">
            Experience Our Luxury Firsthand
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            These images only begin to capture the beauty and elegance of our property. 
            Book your stay today to experience it in person.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-8 py-3 rounded-lg font-medium shadow-lg">
              Book Your Stay
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg font-medium">
              Virtual Tour
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;