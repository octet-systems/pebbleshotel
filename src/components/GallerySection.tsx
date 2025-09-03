import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import heroImage from '@/assets/hero-hotel-exterior.jpg';
import luxurySuite from '@/assets/luxury-suite.jpg';
import deluxeRoom from '@/assets/deluxe-room.jpg';
import spaImage from '@/assets/spa-amenity.jpg';

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const galleryImages = [
    {
      src: heroImage,
      alt: 'Pebbles Boutique Hotel exterior with modern architecture',
      category: 'Exterior'
    },
    {
      src: luxurySuite,
      alt: 'Luxury suite with floor-to-ceiling windows and elegant furnishings',
      category: 'Suites'
    },
    {
      src: deluxeRoom,
      alt: 'Deluxe room featuring modern minimalist design',
      category: 'Rooms'
    },
    {
      src: spaImage,
      alt: 'Spa treatment room with natural stone features',
      category: 'Amenities'
    },
    {
      src: luxurySuite,
      alt: 'Hotel lobby with contemporary design',
      category: 'Interior'
    },
    {
      src: deluxeRoom,
      alt: 'Restaurant dining area with elegant ambiance',
      category: 'Dining'
    }
  ];

  const categories = ['All', 'Exterior', 'Rooms', 'Suites', 'Amenities', 'Interior', 'Dining'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredImages = activeCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  const openModal = (index: number) => {
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? filteredImages.length - 1 : selectedImage - 1);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
            Gallery
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Explore our beautiful spaces and discover the serene luxury that awaits you at Pebbles Boutique Hotels.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className={`${
                activeCategory === category 
                  ? 'bg-primary text-primary-foreground' 
                  : 'border-primary text-primary hover:bg-primary hover:text-primary-foreground'
              } transition-smooth`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-medium hover:shadow-strong transition-smooth cursor-pointer group"
              onClick={() => openModal(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover group-hover:scale-110 transition-spring"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-smooth flex items-center justify-center">
                <div className="text-white opacity-0 group-hover:opacity-100 transition-smooth">
                  <span className="text-lg font-semibold">{image.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        <Dialog open={selectedImage !== null} onOpenChange={closeModal}>
          <DialogContent className="max-w-4xl w-full h-[90vh] p-0 overflow-hidden">
            {selectedImage !== null && (
              <div className="relative w-full h-full">
                <img
                  src={filteredImages[selectedImage].src}
                  alt={filteredImages[selectedImage].alt}
                  className="w-full h-full object-contain bg-black"
                />
                
                {/* Navigation Buttons */}
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={prevImage}
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={nextImage}
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>

                {/* Close Button */}
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute top-4 right-4 bg-white/80 hover:bg-white"
                  onClick={closeModal}
                >
                  <X className="w-6 h-6" />
                </Button>

                {/* Image Info */}
                <div className="absolute bottom-4 left-4 bg-black/60 text-white px-4 py-2 rounded-lg">
                  <p className="text-sm font-medium">{filteredImages[selectedImage].category}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default GallerySection;