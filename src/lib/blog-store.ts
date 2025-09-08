import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  images: string[];
  category: 'travel' | 'dining' | 'events' | 'local' | 'tips' | 'news';
  tags: string[];
  author: {
    name: string;
    email: string;
    avatar?: string;
  };
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  seoTitle?: string;
  seoDescription?: string;
  readTimeMinutes: number;
}

export interface BlogFilters {
  category?: string;
  status?: string;
  featured?: boolean;
  author?: string;
  dateFrom?: Date;
  dateTo?: Date;
  search?: string;
  tags?: string[];
}

interface BlogStore {
  posts: BlogPost[];
  loading: boolean;
  error: string | null;
  
  // CRUD Operations
  createPost: (postData: Omit<BlogPost, 'id' | 'slug' | 'createdAt' | 'updatedAt' | 'viewCount' | 'likeCount' | 'commentCount'>) => Promise<string>;
  updatePost: (id: string, updates: Partial<BlogPost>) => Promise<boolean>;
  deletePost: (id: string) => Promise<boolean>;
  getPost: (id: string) => BlogPost | undefined;
  getPostBySlug: (slug: string) => BlogPost | undefined;
  getPosts: (filters?: BlogFilters) => BlogPost[];
  
  // Utility Actions
  generateSlug: (title: string) => string;
  calculateReadTime: (content: string) => number;
  incrementViewCount: (id: string) => void;
  toggleLike: (id: string) => void;
  
  // Bulk Actions
  bulkUpdateStatus: (ids: string[], status: BlogPost['status']) => Promise<boolean>;
  bulkDelete: (ids: string[]) => Promise<boolean>;
  
  // State Management
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearPosts: () => void;
}

// Mock data for demo
const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Discover the Hidden Gems of Lake Malawi',
    slug: 'discover-hidden-gems-lake-malawi',
    excerpt: 'Explore the pristine beaches and crystal-clear waters of Lake Malawi, home to some of Africa\'s most spectacular scenery and diverse wildlife.',
    content: `
      <h2>Lake Malawi: Africa's Lake of Stars</h2>
      <p>Lake Malawi, also known as the "Lake of Stars," is one of Africa's Great Rift Valley lakes and the third-largest lake in Africa. With its crystal-clear waters stretching as far as the eye can see, it's no wonder that this magnificent body of water attracts visitors from around the world.</p>
      
      <h3>Pristine Beaches</h3>
      <p>The lake boasts some of the most beautiful beaches in Africa, with golden sand shores that rival any coastal destination. Cape Maclear and Nkhotakota are particularly stunning, offering perfect spots for relaxation and water activities.</p>
      
      <h3>Incredible Marine Life</h3>
      <p>Lake Malawi is home to more species of fish than any other lake in the world, with over 1,000 species of cichlid fish. Snorkeling and diving in these waters offers a unique freshwater aquarium experience.</p>
      
      <h3>Cultural Experiences</h3>
      <p>The communities around Lake Malawi offer rich cultural experiences, from traditional fishing villages to local markets filled with handcrafted goods and fresh produce.</p>
      
      <h3>Best Time to Visit</h3>
      <p>The dry season from May to October offers the best weather for lake activities, with clear skies and calm waters perfect for swimming, kayaking, and boat tours.</p>
    `,
    featuredImage: '/images/blog/lake-malawi-sunset.jpg',
    images: [
      '/images/blog/lake-malawi-beach.jpg',
      '/images/blog/lake-malawi-fishing.jpg',
      '/images/blog/lake-malawi-wildlife.jpg'
    ],
    category: 'travel',
    tags: ['Lake Malawi', 'Travel', 'Nature', 'Beach', 'Wildlife'],
    author: {
      name: 'Sarah Johnson',
      email: 'sarah@pebbles.com',
      avatar: '/images/authors/sarah.jpg'
    },
    status: 'published',
    featured: true,
    publishedAt: new Date('2024-03-15'),
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-03-15'),
    viewCount: 2456,
    likeCount: 189,
    commentCount: 34,
    seoTitle: 'Discover Lake Malawi - Hidden Gems and Travel Guide',
    seoDescription: 'Explore Lake Malawi\'s pristine beaches, incredible marine life, and cultural experiences. Complete travel guide to Africa\'s Lake of Stars.',
    readTimeMinutes: 8
  },
  {
    id: '2',
    title: 'Traditional Malawian Cuisine: A Culinary Journey',
    slug: 'traditional-malawian-cuisine-culinary-journey',
    excerpt: 'Embark on a flavorful journey through Malawi\'s rich culinary traditions, from nsima and relish to exotic local delicacies.',
    content: `
      <h2>The Heart of Malawian Culture: Food</h2>
      <p>Malawian cuisine reflects the country's agricultural heritage and cultural diversity. At the center of every meal is nsima, a staple made from maize flour that serves as the foundation for a variety of flavorful dishes.</p>
      
      <h3>Nsima: The Staple Food</h3>
      <p>Nsima is more than just food in Malawi; it's a cultural institution. This thick porridge made from maize flour is eaten with the hands and serves as the perfect complement to various relishes and vegetables.</p>
      
      <h3>Popular Relishes</h3>
      <ul>
        <li><strong>Ndiwo ya nsomba</strong> - Fish relish, often made with chambo from Lake Malawi</li>
        <li><strong>Ndiwo ya nkhuku</strong> - Chicken relish with tomatoes and onions</li>
        <li><strong>Ndiwo ya nyama</strong> - Beef relish with local spices</li>
        <li><strong>Phezi la nyama</strong> - Dried meat, perfect for travelers</li>
      </ul>
      
      <h3>Vegetarian Delights</h3>
      <p>Malawian cuisine offers plenty for vegetarians, including:</p>
      <ul>
        <li>Pumpkin leaves (nkhwani) cooked with groundnuts</li>
        <li>Sweet potato leaves with tomatoes</li>
        <li>Various bean dishes and groundnut stews</li>
      </ul>
      
      <h3>Experience Authentic Cuisine at Pebbles</h3>
      <p>Our hotel restaurant offers both traditional Malawian dishes and international cuisine, allowing guests to experience the best of local flavors during their stay.</p>
    `,
    featuredImage: '/images/blog/malawian-cuisine.jpg',
    images: [
      '/images/blog/nsima-relish.jpg',
      '/images/blog/chambo-fish.jpg',
      '/images/blog/local-market.jpg'
    ],
    category: 'dining',
    tags: ['Food', 'Culture', 'Dining', 'Local Cuisine', 'Malawi'],
    author: {
      name: 'Chef Michael Banda',
      email: 'chef@pebbles.com',
      avatar: '/images/authors/chef-banda.jpg'
    },
    status: 'published',
    featured: true,
    publishedAt: new Date('2024-03-10'),
    createdAt: new Date('2024-03-05'),
    updatedAt: new Date('2024-03-10'),
    viewCount: 1834,
    likeCount: 156,
    commentCount: 28,
    seoTitle: 'Traditional Malawian Food Guide - Authentic Cuisine Experience',
    seoDescription: 'Discover traditional Malawian cuisine including nsima, local relishes, and vegetarian dishes. Experience authentic flavors at Pebbles Hotel.',
    readTimeMinutes: 6
  },
  {
    id: '3',
    title: 'Planning Your Perfect Wedding at Pebbles',
    slug: 'planning-perfect-wedding-pebbles',
    excerpt: 'Everything you need to know about hosting your dream wedding at Pebbles Boutique Hotel, from venue selection to catering options.',
    content: `
      <h2>Your Dream Wedding Awaits</h2>
      <p>At Pebbles Boutique Hotel, we understand that your wedding day is one of the most important days of your life. Our dedicated wedding team works with you to create a magical celebration that reflects your unique love story.</p>
      
      <h3>Stunning Venue Options</h3>
      <p>Choose from our beautiful indoor and outdoor spaces:</p>
      <ul>
        <li><strong>Garden Pavilion</strong> - Perfect for outdoor ceremonies with natural beauty</li>
        <li><strong>Grand Ballroom</strong> - Elegant indoor space for receptions up to 200 guests</li>
        <li><strong>Lakeside Terrace</strong> - Intimate setting with water views</li>
        <li><strong>Private Dining Room</strong> - Cozy space for smaller celebrations</li>
      </ul>
      
      <h3>Comprehensive Packages</h3>
      <p>Our wedding packages include:</p>
      <ul>
        <li>Venue rental and setup</li>
        <li>Professional catering services</li>
        <li>Floral arrangements and decorations</li>
        <li>Wedding coordination services</li>
        <li>Bridal suite for preparation</li>
        <li>Photography and videography options</li>
      </ul>
      
      <h3>Catering Excellence</h3>
      <p>Our experienced chefs create customized menus featuring both international cuisine and local Malawian specialties. We accommodate all dietary requirements and preferences.</p>
      
      <h3>Planning Timeline</h3>
      <p>We recommend booking at least 6-12 months in advance to ensure your preferred date and to allow adequate time for planning all the special details that make your day unique.</p>
      
      <p><strong>Ready to start planning?</strong> Contact our wedding coordinator at weddings@pebbles.com or call +265 999 123 456.</p>
    `,
    featuredImage: '/images/blog/wedding-setup.jpg',
    images: [
      '/images/blog/wedding-ceremony.jpg',
      '/images/blog/wedding-reception.jpg',
      '/images/blog/bridal-suite.jpg'
    ],
    category: 'events',
    tags: ['Wedding', 'Events', 'Planning', 'Venues', 'Catering'],
    author: {
      name: 'Emma Williams',
      email: 'events@pebbles.com',
      avatar: '/images/authors/emma.jpg'
    },
    status: 'published',
    featured: false,
    publishedAt: new Date('2024-03-01'),
    createdAt: new Date('2024-02-25'),
    updatedAt: new Date('2024-03-01'),
    viewCount: 3421,
    likeCount: 267,
    commentCount: 45,
    seoTitle: 'Wedding Planning Guide - Pebbles Boutique Hotel Weddings',
    seoDescription: 'Plan your perfect wedding at Pebbles Boutique Hotel. Explore venue options, packages, and services for your dream celebration.',
    readTimeMinutes: 7
  }
];

export const useBlogStore = create<BlogStore>()(
  persist(
    (set, get) => ({
      posts: mockPosts,
      loading: false,
      error: null,

      createPost: async (postData) => {
        set({ loading: true, error: null });

        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));

          const slug = get().generateSlug(postData.title);
          const readTime = get().calculateReadTime(postData.content);

          const newPost: BlogPost = {
            ...postData,
            id: Date.now().toString(),
            slug,
            readTimeMinutes: readTime,
            createdAt: new Date(),
            updatedAt: new Date(),
            viewCount: 0,
            likeCount: 0,
            commentCount: 0,
          };

          set(state => ({
            posts: [...state.posts, newPost],
            loading: false
          }));

          return newPost.id;
        } catch (error) {
          set({ error: 'Failed to create blog post', loading: false });
          throw error;
        }
      },

      updatePost: async (id, updates) => {
        set({ loading: true, error: null });

        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 800));

          // Update slug if title changed
          if (updates.title) {
            updates.slug = get().generateSlug(updates.title);
          }

          // Recalculate read time if content changed
          if (updates.content) {
            updates.readTimeMinutes = get().calculateReadTime(updates.content);
          }

          set(state => ({
            posts: state.posts.map(post =>
              post.id === id
                ? { ...post, ...updates, updatedAt: new Date() }
                : post
            ),
            loading: false
          }));

          return true;
        } catch (error) {
          set({ error: 'Failed to update blog post', loading: false });
          return false;
        }
      },

      deletePost: async (id) => {
        set({ loading: true, error: null });

        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 500));

          set(state => ({
            posts: state.posts.filter(post => post.id !== id),
            loading: false
          }));

          return true;
        } catch (error) {
          set({ error: 'Failed to delete blog post', loading: false });
          return false;
        }
      },

      getPost: (id) => {
        return get().posts.find(post => post.id === id);
      },

      getPostBySlug: (slug) => {
        return get().posts.find(post => post.slug === slug);
      },

      getPosts: (filters) => {
        let posts = get().posts;

        if (!filters) return posts;

        // Apply filters
        if (filters.category) {
          posts = posts.filter(post => post.category === filters.category);
        }

        if (filters.status) {
          posts = posts.filter(post => post.status === filters.status);
        }

        if (filters.featured !== undefined) {
          posts = posts.filter(post => post.featured === filters.featured);
        }

        if (filters.author) {
          posts = posts.filter(post => post.author.name.toLowerCase().includes(filters.author!.toLowerCase()));
        }

        if (filters.dateFrom) {
          posts = posts.filter(post => 
            post.publishedAt && post.publishedAt >= filters.dateFrom!
          );
        }

        if (filters.dateTo) {
          posts = posts.filter(post => 
            post.publishedAt && post.publishedAt <= filters.dateTo!
          );
        }

        if (filters.tags && filters.tags.length > 0) {
          posts = posts.filter(post => 
            filters.tags!.some(tag => post.tags.includes(tag))
          );
        }

        if (filters.search) {
          const searchLower = filters.search.toLowerCase();
          posts = posts.filter(post =>
            post.title.toLowerCase().includes(searchLower) ||
            post.excerpt.toLowerCase().includes(searchLower) ||
            post.content.toLowerCase().includes(searchLower) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchLower))
          );
        }

        return posts.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.createdAt.getTime() - a.createdAt.getTime();
        });
      },

      generateSlug: (title) => {
        return title
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim();
      },

      calculateReadTime: (content) => {
        const wordsPerMinute = 200;
        const words = content.split(/\s+/).length;
        return Math.ceil(words / wordsPerMinute);
      },

      incrementViewCount: (id) => {
        set(state => ({
          posts: state.posts.map(post =>
            post.id === id
              ? { ...post, viewCount: post.viewCount + 1 }
              : post
          )
        }));
      },

      toggleLike: (id) => {
        set(state => ({
          posts: state.posts.map(post =>
            post.id === id
              ? { ...post, likeCount: post.likeCount + 1 }
              : post
          )
        }));
      },

      bulkUpdateStatus: async (ids, status) => {
        set({ loading: true, error: null });

        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));

          set(state => ({
            posts: state.posts.map(post =>
              ids.includes(post.id)
                ? { ...post, status, updatedAt: new Date() }
                : post
            ),
            loading: false
          }));

          return true;
        } catch (error) {
          set({ error: 'Failed to update posts', loading: false });
          return false;
        }
      },

      bulkDelete: async (ids) => {
        set({ loading: true, error: null });

        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));

          set(state => ({
            posts: state.posts.filter(post => !ids.includes(post.id)),
            loading: false
          }));

          return true;
        } catch (error) {
          set({ error: 'Failed to delete posts', loading: false });
          return false;
        }
      },

      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      clearPosts: () => set({ posts: [] }),
    }),
    {
      name: 'blog-store',
      partialize: (state) => ({ posts: state.posts }),
    }
  )
);

// Helper functions
export const formatBlogDate = (date: Date): string => {
  return date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const getBlogCategories = () => [
  { value: 'travel', label: 'Travel' },
  { value: 'dining', label: 'Dining' },
  { value: 'events', label: 'Events' },
  { value: 'local', label: 'Local' },
  { value: 'tips', label: 'Tips' },
  { value: 'news', label: 'News' },
];

export const extractTags = (content: string): string[] => {
  // Simple tag extraction from content (in a real app, this would be more sophisticated)
  const words = content.toLowerCase().match(/\b\w{4,}\b/g) || [];
  const uniqueWords = [...new Set(words)];
  return uniqueWords.slice(0, 10); // Return top 10 potential tags
};
