import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

// Enhanced Room Card Skeleton
export const RoomCardSkeleton = () => (
  <Card className="overflow-hidden shadow-medium animate-fade-in hover:shadow-lg transition-shadow duration-300">
    <div className="relative">
      <Skeleton className="w-full h-72" />
      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10 animate-shimmer" />
    </div>
    <CardContent className="p-6">
      <div className="flex justify-between items-start mb-3">
        <div className="space-y-2">
          <Skeleton className="h-8 w-32" />
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-12" />
          </div>
        </div>
        <div className="text-right space-y-1">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
      <Skeleton className="h-16 w-full mb-4" />
      <div className="flex items-center gap-4 mb-4">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-20" />
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-18" />
      </div>
      <div className="flex gap-4">
        <Skeleton className="flex-1 h-10 rounded-full" />
        <Skeleton className="flex-1 h-10 rounded-full" />
      </div>
    </CardContent>
  </Card>
);

// Amenity Card Skeleton
export const AmenityCardSkeleton = () => (
  <Card className="text-center shadow-medium">
    <CardContent className="p-8">
      <div className="flex justify-center mb-4">
        <Skeleton className="w-16 h-16 rounded-full" />
      </div>
      <Skeleton className="h-6 w-24 mx-auto mb-3" />
      <Skeleton className="h-20 w-full" />
    </CardContent>
  </Card>
);

// Gallery Image Skeleton
export const GalleryImageSkeleton = () => (
  <div className="relative overflow-hidden rounded-lg">
    <Skeleton className="w-full h-64" />
  </div>
);

// Booking Form Skeleton
export const BookingFormSkeleton = () => (
  <Card className="shadow-medium">
    <div className="bg-sage text-white p-6">
      <Skeleton className="h-8 w-48 mx-auto bg-white/20" />
    </div>
    <CardContent className="p-8">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
        <div className="border-t pt-6">
          <Skeleton className="h-6 w-40 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
        <Skeleton className="h-12 w-full rounded-full" />
      </div>
    </CardContent>
  </Card>
);

// Section Header Skeleton
export const SectionHeaderSkeleton = () => (
  <div className="text-center mb-16">
    <Skeleton className="h-12 w-64 mx-auto mb-4" />
    <Skeleton className="h-24 w-96 mx-auto" />
  </div>
);

// Enhanced Loading Spinner Component
export const LoadingSpinner = ({ size = "md", className = "" }: { size?: "sm" | "md" | "lg", className?: string }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  };

  return (
    <div className="flex items-center justify-center relative">
      <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-primary/30 border-t-primary transition-all duration-300 ${className}`} />
      <div className={`absolute ${sizeClasses[size]} animate-pulse rounded-full border border-primary/20`} />
    </div>
  );
};

// Enhanced Full Page Loading
export const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background/95 backdrop-blur-sm">
    <div className="text-center animate-fade-in">
      <div className="relative mb-6">
        <LoadingSpinner size="lg" />
        <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping" />
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-playfair text-foreground animate-pulse">Loading Pebbles Boutique Hotel...</h2>
        <div className="flex justify-center space-x-1">
          {[...Array(3)].map((_, i) => (
            <div 
              key={i}
              className="w-2 h-2 bg-primary rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Enhanced Button Loading State
export const ButtonLoading = ({ children, loading, ...props }: { 
  children: React.ReactNode; 
  loading: boolean;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button 
    disabled={loading} 
    className={`transition-all duration-300 ${loading ? 'opacity-75 cursor-not-allowed scale-95' : 'hover:scale-105 active:scale-95'} ${props.className || ''}`}
    {...props}
  >
    <div className="flex items-center justify-center transition-all duration-200">
      {loading ? (
        <>
          <LoadingSpinner size="sm" className="mr-2" />
          <span className="animate-pulse">Loading...</span>
        </>
      ) : (
        <span className="transition-transform duration-200 group-hover:scale-105">
          {children}
        </span>
      )}
    </div>
  </button>
);