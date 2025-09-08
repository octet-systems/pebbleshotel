import { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, ChevronLeft, ChevronRight, ZoomIn, Download, Share2, Heart } from 'lucide-react';
import { GalleryImageSkeleton } from '@/components/LoadingComponents';
import { OptimizedImage } from '@/components/OptimizedImage';

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [imageLoaded, setImageLoaded] = useState<Record<number, boolean>>({});

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const toggleFavorite = (index: number) => {
    setFavorites(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleImageLoad = (index: number) => {
    setImageLoaded(prev => ({ ...prev, [index]: true }));
  };

  const galleryImages = [
    {
      src: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
      alt: 'Pebbles Boutique Hotel exterior with modern architecture',
      category: 'Exterior',
      featured: true
    },
    {
      src: 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&h=600&fit=crop',
      alt: 'Luxury suite with floor-to-ceiling windows and elegant furnishings',
      category: 'Suites',
      featured: true
    },
    {
      src: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop',
      alt: 'Deluxe room featuring modern minimalist design',
      category: 'Rooms'
    },
    {
      src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
      alt: 'Spa treatment room with natural stone features',
      category: 'Amenities'
    },
    {
      src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop',
      alt: 'Hotel lobby with contemporary design',
      category: 'Interior'
    },
    {
      src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      alt: 'Restaurant dining area with elegant ambiance',
      category: 'Dining'
    },
    {
      src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
      alt: 'Swimming pool with infinity edge and city views',
      category: 'Amenities'
    },
    {
      src: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop',
      alt: 'Hotel bathroom with luxury fixtures and marble finishes',
      category: 'Rooms'
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

  const closeModal = useCallback(() => {
    setSelectedImage(null);
  }, []);

  const nextImage = useCallback(() => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredImages.length);
    }
  }, [selectedImage, filteredImages.length]);

  const prevImage = useCallback(() => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? filteredImages.length - 1 : selectedImage - 1);
    }
  }, [selectedImage, filteredImages.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          prevImage();
          break;
        case 'ArrowRight':
          nextImage();
          break;
        case 'Escape':
          closeModal();
          break;
      }
    };

    if (selectedImage !== null) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedImage, nextImage, prevImage, closeModal]);

  return (
    <section id="gallery" className="py-20 bg-secondary" aria-labelledby="gallery-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 id="gallery-heading" className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
            Gallery
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Explore our beautiful spaces and discover the serene luxury that awaits you at Pebbles Boutique Hotel.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12" role="tablist" aria-label="Gallery categories">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className={`${
                activeCategory === category 
                  ? 'bg-primary text-primary-foreground' 
                  : 'border-primary text-primary hover:bg-primary hover:text-primary-foreground'
              } transition-smooth touch-target mobile-optimized focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
              role="tab"
              aria-selected={activeCategory === category}
              aria-controls="gallery-images"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          id="gallery-images"
          role="tabpanel"
        >
          {loading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <GalleryImageSkeleton key={index} />
            ))
          ) : (
            filteredImages.map((image, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg shadow-medium hover:shadow-strong transition-all duration-500 cursor-pointer group hover-lift animate-scale-in"
                onClick={() => openModal(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openModal(index);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Open ${image.alt} in lightbox`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-square overflow-hidden">
                  {!imageLoaded[index] && (
                    <div className="w-full h-full bg-muted animate-pulse" />
                  )}
                  <OptimizedImage
                    src={image.src}
                    alt={image.alt}
                    className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ${
                      imageLoaded[index] ? 'opacity-100' : 'opacity-0'
                    }`}
                    loading="lazy"
                    onLoad={() => handleImageLoad(index)}
                  />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-white/90 text-black backdrop-blur-sm">
                        {image.category}
                      </Badge>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="w-8 h-8 rounded-full bg-white/90 hover:bg-white backdrop-blur-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(index);
                          }}
                          aria-label={favorites.includes(index) ? 'Remove from favorites' : 'Add to favorites'}
                        >
                          <Heart className={`w-4 h-4 ${favorites.includes(index) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="w-8 h-8 rounded-full bg-white/90 hover:bg-white backdrop-blur-sm"
                          aria-label="View in lightbox"
                        >
                          <ZoomIn className="w-4 h-4 text-gray-600" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Featured Badge */}
                {image.featured && (
                  <Badge className="absolute top-4 left-4 bg-amber-500 text-white backdrop-blur-sm">
                    Featured
                  </Badge>
                )}
              </div>
            ))
          )}
        </div>

        {/* Enhanced Modal */}
        <Dialog open={selectedImage !== null} onOpenChange={closeModal}>
          <DialogContent className="max-w-6xl w-full h-[95vh] p-0 overflow-hidden bg-black/95 border-0">
            {selectedImage !== null && (
              <div className="relative w-full h-full flex items-center justify-center">
                <OptimizedImage
                  src={filteredImages[selectedImage].src}
                  alt={filteredImages[selectedImage].alt}
                  className="max-w-full max-h-full object-contain"
                  style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))' }}
                />
                
                {/* Navigation Buttons */}
                {filteredImages.length > 1 && (
                  <>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 border-white/20 backdrop-blur-sm w-12 h-12 rounded-full"
                      onClick={prevImage}
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-6 h-6 text-white" />
                    </Button>
                    
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 border-white/20 backdrop-blur-sm w-12 h-12 rounded-full"
                      onClick={nextImage}
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-6 h-6 text-white" />
                    </Button>
                  </>
                )}

                {/* Top Controls */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="bg-white/10 hover:bg-white/20 border-white/20 backdrop-blur-sm w-10 h-10 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(selectedImage);
                    }}
                    aria-label={favorites.includes(selectedImage) ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Heart className={`w-5 h-5 ${favorites.includes(selectedImage) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="bg-white/10 hover:bg-white/20 border-white/20 backdrop-blur-sm w-10 h-10 rounded-full"
                    onClick={() => {
                      // Simulate share functionality
                      navigator.share?.({
                        title: 'Pebbles Boutique Hotel',
                        text: filteredImages[selectedImage].alt,
                        url: window.location.href
                      }).catch(() => {
                        // Fallback to copy to clipboard
                        navigator.clipboard?.writeText(window.location.href);
                      });
                    }}
                    aria-label="Share image"
                  >
                    <Share2 className="w-5 h-5 text-white" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="bg-white/10 hover:bg-white/20 border-white/20 backdrop-blur-sm w-10 h-10 rounded-full"
                    onClick={closeModal}
                    aria-label="Close lightbox"
                  >
                    <X className="w-5 h-5 text-white" />
                  </Button>
                </div>

                {/* Bottom Info Panel */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <div className="flex items-center justify-between text-white">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{filteredImages[selectedImage].category}</h3>
                      <p className="text-sm text-white/80">{filteredImages[selectedImage].alt}</p>
                    </div>
                    <div className="text-sm text-white/80">
                      {selectedImage + 1} of {filteredImages.length}
                    </div>
                  </div>
                </div>

                {/* Thumbnail Strip */}
                {filteredImages.length > 1 && (
                  <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2 max-w-xs overflow-x-auto scrollbar-hide">
                    {filteredImages.slice(Math.max(0, selectedImage - 2), selectedImage + 3).map((img, idx) => {
                      const actualIndex = Math.max(0, selectedImage - 2) + idx;
                      return (
                        <button
                          key={actualIndex}
                          className={`flex-shrink-0 w-12 h-12 rounded overflow-hidden border-2 transition-all ${
                            actualIndex === selectedImage 
                              ? 'border-white scale-110' 
                              : 'border-white/30 hover:border-white/60'
                          }`}
                          onClick={() => setSelectedImage(actualIndex)}
                          aria-label={`View image ${actualIndex + 1}`}
                        >
                          <OptimizedImage
                            src={img.src}
                            alt={img.alt}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default GallerySection;