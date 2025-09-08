import { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  lazy?: boolean;
  optimize?: boolean;
  quality?: number;
  width?: number;
  height?: number;
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
  onLoad?: () => void;
  onError?: () => void;
}

export function OptimizedImage({
  src,
  alt,
  className,
  lazy = true,
  optimize = true,
  quality = 80,
  width,
  height,
  format = 'auto',
  onLoad,
  onError,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Handle image loading states
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const handleLoad = () => {
      setIsLoading(false);
      onLoad?.();
    };

    const handleError = () => {
      setIsLoading(false);
      setHasError(true);
      onError?.();
    };

    img.addEventListener('load', handleLoad);
    img.addEventListener('error', handleError);

    // Check if image is already loaded
    if (img.complete && img.naturalHeight !== 0) {
      setIsLoading(false);
    }

    return () => {
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
    };
  }, [onLoad, onError]);

  // Construct optimized image URL if needed
  const getImageSrc = useCallback(() => {
    if (!optimize) return src;
    
    // For demo purposes, we'll just return the original src
    // In a real implementation, this would connect to an image optimization service
    // Example: return `https://image-optimizer.example.com/${src}?w=${width}&h=${height}&q=${quality}`;
    return src;
  }, [optimize, src]);

  // Generate srcSet for responsive images
  const generateSrcSet = () => {
    if (!src || !optimize) return undefined;
    
    // Generate responsive image URLs for different screen densities
    const breakpoints = [480, 768, 1024, 1280, 1600];
    const srcSetArray = breakpoints.map(bp => {
      // In production, this would use your image optimization service
      return `${src}?w=${bp} ${bp}w`;
    });
    
    return srcSetArray.join(', ');
  };

  // Enhanced intersection observer with better performance
  useEffect(() => {
    if (!lazy || !imgRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            // When `src` is an empty string, the browser resolves `img.src` to the page URL.
            // We check the attribute directly to see if it's the initial empty state for lazy loading.
            if (img.getAttribute('src') === '') {
              img.src = getImageSrc();
              // Add fade-in animation when image loads
              img.style.opacity = '0';
              img.style.transition = 'opacity 0.3s ease-in-out';
              img.onload = () => {
                img.style.opacity = '1';
              };
            }
            observer.unobserve(img); // Stop observing once loaded
          }
        });
      },
      { 
        rootMargin: '100px', // Start loading earlier for better UX
        threshold: 0.1 // Trigger when 10% of image is visible
      }
    );
    
    observer.observe(imgRef.current);
    
    return () => {
      observer.disconnect();
    };
  }, [lazy, src, getImageSrc]);

  // Handle loading and error states
  if (hasError) {
    return (
      <div 
        className={cn(
          'bg-muted flex items-center justify-center',
          width && `w-[${width}px]`,
          height && `h-[${height}px]`,
          className
        )}
      >
        <div className="text-muted-foreground text-sm">Image unavailable</div>
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {isLoading && (
        <div className={cn(
          'absolute inset-0 bg-muted animate-pulse flex items-center justify-center',
          width && `w-[${width}px]`,
          height && `h-[${height}px]`
        )}>
          <div className="w-1/3 h-1/3 bg-white/20 rounded-full animate-pulse" />
        </div>
      )}
      
      <img
        ref={imgRef}
        src={lazy ? '' : getImageSrc()} // Don't set src initially for lazy loading
        srcSet={generateSrcSet()}
        sizes={width ? `${width}px` : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
        alt={alt}
        className={cn(
          'transition-all duration-500 ease-in-out',
          isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100',
          'object-cover w-full h-full'
        )}
        loading={lazy ? 'lazy' : 'eager'}
        decoding="async"
        {...props}
      />
    </div>
  );
}