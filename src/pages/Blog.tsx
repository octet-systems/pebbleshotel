import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  User, 
  Tag, 
  Search,
  ChevronLeft,
  ChevronRight,
  Clock
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { OptimizedImage } from '@/components/OptimizedImage';
import blogImage1 from '@/assets/hero-hotel-exterior.jpg';
import blogImage2 from '@/assets/luxury-suite.jpg';
import blogImage3 from '@/assets/spa-amenity.jpg';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'travel', name: 'Travel' },
    { id: 'lifestyle', name: 'Lifestyle' },
    { id: 'hotel', name: 'Hotel News' },
    { id: 'events', name: 'Events' },
    { id: 'wellness', name: 'Wellness' }
  ];

  const blogPosts = [
    {
      id: 1,
      title: '10 Hidden Gems to Explore Near Our Hotel',
      excerpt: 'Discover the secret spots that only locals know about in our beautiful city. From quaint cafes to hidden beaches, we\'ve curated the ultimate guide for adventurous travelers.',
      author: 'Sarah Johnson',
      date: '2023-06-15',
      readTime: '5 min read',
      category: 'travel',
      image: blogImage1,
      tags: ['Local Guides', 'City Exploration', 'Hidden Spots']
    },
    {
      id: 2,
      title: 'The Art of Mindful Travel: Finding Peace on the Road',
      excerpt: 'Learn how to incorporate mindfulness practices into your travels to create deeper connections with the places you visit and enhance your overall well-being.',
      author: 'Michael Chen',
      date: '2023-06-10',
      readTime: '8 min read',
      category: 'wellness',
      image: blogImage2,
      tags: ['Mindfulness', 'Wellness', 'Travel Tips']
    },
    {
      id: 3,
      title: 'Sustainable Luxury: Our Commitment to Eco-Friendly Hospitality',
      excerpt: 'Explore our innovative eco-initiatives and how we\'re redefining luxury hospitality with sustainable practices that protect our beautiful environment.',
      author: 'Elena Rodriguez',
      date: '2023-06-05',
      readTime: '6 min read',
      category: 'hotel',
      image: blogImage3,
      tags: ['Sustainability', 'Eco-Friendly', 'Luxury']
    },
    {
      id: 4,
      title: 'Summer Culinary Series: Chef\'s Seasonal Creations',
      excerpt: 'Get a behind-the-scenes look at our chef\'s inspiration for the summer menu, featuring locally-sourced ingredients and innovative techniques.',
      author: 'Michael Chen',
      date: '2023-05-28',
      readTime: '4 min read',
      category: 'lifestyle',
      image: blogImage1,
      tags: ['Culinary', 'Chef Features', 'Seasonal']
    },
    {
      id: 5,
      title: 'Planning the Perfect Destination Wedding',
      excerpt: 'Expert tips and insider advice for couples planning their dream destination wedding at our stunning oceanfront venue.',
      author: 'Sarah Johnson',
      date: '2023-05-22',
      readTime: '10 min read',
      category: 'events',
      image: blogImage2,
      tags: ['Weddings', 'Events', 'Planning']
    },
    {
      id: 6,
      title: 'Spa Retreats: Rejuvenate Your Mind, Body, and Soul',
      excerpt: 'Discover the transformative power of our signature spa treatments and wellness programs designed to restore balance and vitality.',
      author: 'Elena Rodriguez',
      date: '2023-05-15',
      readTime: '7 min read',
      category: 'wellness',
      image: blogImage3,
      tags: ['Spa', 'Wellness', 'Self-Care']
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Pagination
  const postsPerPage = 4;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-overlay z-10"></div>
        <OptimizedImage
          src={blogImage1}
          alt="Hotel blog"
          className="w-full h-full object-cover"
        />
        <div className="relative z-20 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-4 animate-fade-up">
            Pebbles Journal
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto animate-fade-up animate-fade-in-delay">
            Stories, insights, and inspiration from our luxury boutique hotel
          </p>
        </div>
      </section>

      {/* Blog Controls */}
      <section className="py-8 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Search */}
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-input focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
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
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setCurrentPage(1);
                  }}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {paginatedPosts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {paginatedPosts.map((post, index) => (
                  <Card key={post.id} className="overflow-hidden shadow-medium hover:shadow-strong transition-all duration-300 group">
                    <div className="relative">
                      <OptimizedImage
                        src={post.image}
                        alt={post.title}
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                        {categories.find(cat => cat.id === post.category)?.name}
                      </div>
                    </div>
                    <CardContent className="p-8">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-playfair font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                        {post.title}
                      </h3>
                      
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {post.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="flex items-center gap-1 text-xs bg-primary-light text-primary px-2 py-1 rounded-full">
                            <Tag className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-hero flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{post.author}</p>
                            <p className="text-xs text-muted-foreground">Author</p>
                          </div>
                        </div>
                        
                        <Button variant="outline" className="rounded-full">
                          Read More
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="rounded-full"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                      className={`rounded-full ${currentPage === page ? 'bg-primary text-primary-foreground' : ''}`}
                    >
                      {page}
                    </Button>
                  ))}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="rounded-full"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <Search className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
              <h3 className="text-2xl font-playfair font-bold text-foreground mb-2">
                No Articles Found
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                We couldn't find any articles matching your search criteria. Try adjusting your filters.
              </p>
              <Button onClick={() => { setSearchTerm(''); setSelectedCategory('all'); setCurrentPage(1); }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-6">
            Stay Inspired
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest stories, travel tips, and exclusive offers.
          </p>
          
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Button className="bg-white text-primary hover:bg-white/90 px-6 py-3 rounded-lg font-medium shadow-lg whitespace-nowrap">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;