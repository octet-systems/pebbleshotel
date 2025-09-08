import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { DemoBookingForm } from '@/components/DemoBookingForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Users, 
  CreditCard, 
  Calendar,
  CheckCircle,
  Star
} from 'lucide-react';

const BookingDemo = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Play className="w-8 h-8 text-primary" />
              <Badge variant="secondary" className="px-4 py-2 text-sm">Interactive Demo</Badge>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-playfair font-bold text-gray-900 mb-6">
              Experience Our
              <span className="block bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Booking System
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Try our interactive booking system with realistic demo data. Choose from different guest scenarios 
              and see how easy it is to make a reservation at Pebbles Boutique Hotel.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <Card className="text-center p-4">
                <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">5 Demo Scenarios</p>
                <p className="text-xs text-gray-600">Different guest types</p>
              </Card>
              <Card className="text-center p-4">
                <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Real-time Pricing</p>
                <p className="text-xs text-gray-600">Dynamic calculations</p>
              </Card>
              <Card className="text-center p-4">
                <Star className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Room Selection</p>
                <p className="text-xs text-gray-600">Available rooms</p>
              </Card>
              <Card className="text-center p-4">
                <CheckCircle className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Instant Confirmation</p>
                <p className="text-xs text-gray-600">Demo bookings</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Instructions */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-4">
              How to Use the Demo
            </h2>
            <p className="text-gray-600">
              Follow these simple steps to explore our booking system
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-primary">1</span>
              </div>
              <h3 className="font-semibold mb-2">Choose a Scenario</h3>
              <p className="text-sm text-gray-600">
                Select from business, romantic, family, weekend, or group booking scenarios
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-primary">2</span>
              </div>
              <h3 className="font-semibold mb-2">Review & Modify</h3>
              <p className="text-sm text-gray-600">
                The form auto-fills with realistic data. You can modify any details as needed
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-primary">3</span>
              </div>
              <h3 className="font-semibold mb-2">Create Booking</h3>
              <p className="text-sm text-gray-600">
                Complete the demo booking and receive a confirmation code
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Form Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DemoBookingForm />
        </div>
      </section>

      {/* Demo Features */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-4">
              Demo Features & Scenarios
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our demo includes various realistic booking scenarios to showcase different use cases
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Business Traveler */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-blue-600" />
                  </div>
                  Business Traveler
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">
                  Single professional on a work trip with specific requirements
                </p>
                <ul className="text-xs space-y-1 text-gray-500">
                  <li>• 3-night stay</li>
                  <li>• Deluxe room preference</li>
                  <li>• Early check-in request</li>
                  <li>• Business amenities focus</li>
                </ul>
              </CardContent>
            </Card>

            {/* Romantic Getaway */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-red-600" />
                  </div>
                  Romantic Getaway
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">
                  Couple celebrating their anniversary with luxury requests
                </p>
                <ul className="text-xs space-y-1 text-gray-500">
                  <li>• Luxury suite booking</li>
                  <li>• Multiple guests</li>
                  <li>• Special celebration requests</li>
                  <li>• Premium amenities</li>
                </ul>
              </CardContent>
            </Card>

            {/* Family Vacation */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-green-600" />
                  </div>
                  Family Vacation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">
                  Family with children requiring special accommodations
                </p>
                <ul className="text-xs space-y-1 text-gray-500">
                  <li>• 4-night family stay</li>
                  <li>• Adults + children booking</li>
                  <li>• Kid-friendly requests</li>
                  <li>• Suite accommodation</li>
                </ul>
              </CardContent>
            </Card>

            {/* Weekend Getaway */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-purple-600" />
                  </div>
                  Weekend Getaway
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">
                  Short leisure trip focused on relaxation and wellness
                </p>
                <ul className="text-xs space-y-1 text-gray-500">
                  <li>• Quick 2-night stay</li>
                  <li>• Premium room</li>
                  <li>• Spa service interest</li>
                  <li>• Quiet room preference</li>
                </ul>
              </CardContent>
            </Card>

            {/* Friends Group */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-orange-600" />
                  </div>
                  Friends Group
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">
                  Group of friends traveling together for a reunion
                </p>
                <ul className="text-xs space-y-1 text-gray-500">
                  <li>• Multi-guest booking</li>
                  <li>• Luxury suite preference</li>
                  <li>• Local attraction interest</li>
                  <li>• Group activity focus</li>
                </ul>
              </CardContent>
            </Card>

            {/* Random Scenario */}
            <Card className="hover:shadow-lg transition-shadow border-dashed border-2 border-gray-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-gray-600">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <Play className="w-4 h-4 text-gray-600" />
                  </div>
                  Random Scenario
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">
                  Use the "Random Scenario" button to try any of the above scenarios
                </p>
                <p className="text-xs text-gray-500 italic">
                  Perfect for exploring different booking types and seeing how the system adapts
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BookingDemo;
