import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Skip to content component for accessibility
const SkipToContent = () => (
  <a 
    href="#main-content"
    className="skip-link focus-ring-enhanced bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium"
    onFocus={(e) => {
      // Ensure the link is visible when focused
      e.target.style.position = 'fixed';
      e.target.style.top = '8px';
      e.target.style.left = '8px';
      e.target.style.zIndex = '9999';
    }}
    onBlur={(e) => {
      // Hide the link when not focused
      e.target.style.position = 'absolute';
      e.target.style.top = '-40px';
      e.target.style.left = '6px';
    }}
  >
    Skip to main content
  </a>
);
import Index from "./pages/Index";
import Services from "./pages/Services";
import About from "./pages/About";
import Rooms from "./pages/Rooms";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import Events from "./pages/Events";
import Blog from "./pages/Blog";
import RoomDetails from "./pages/RoomDetails";
import Booking from "./pages/Booking";
import BookingDemo from "./pages/BookingDemo";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminRooms from "./pages/admin/Rooms";
import AdminEvents from "./pages/admin/Events";
import AdminBookings from "./pages/admin/Bookings";
import AdminReports from "./pages/admin/Reports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SkipToContent />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/booking-demo" element={<BookingDemo />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/events" element={<Events />} />
          <Route path="/blog" element={<Blog />} />
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/rooms" element={<AdminRooms />} />
          <Route path="/admin/events" element={<AdminEvents />} />
          <Route path="/admin/bookings" element={<AdminBookings />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;