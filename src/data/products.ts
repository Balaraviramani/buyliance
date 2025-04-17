
import { Product, Category } from '@/types';

export const categories: Category[] = [
  {
    id: "cat1",
    name: "Electronics",
    description: "Latest gadgets and electronic devices",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=2070&auto=format&fit=crop",
    slug: "electronics"
  },
  {
    id: "cat2",
    name: "Clothing",
    description: "Stylish and comfortable clothing for all seasons",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop",
    slug: "clothing"
  },
  {
    id: "cat3",
    name: "Home & Kitchen",
    description: "Essential items for your home and kitchen",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2070&auto=format&fit=crop",
    slug: "home-kitchen"
  },
  {
    id: "cat4",
    name: "Beauty & Personal Care",
    description: "Quality beauty and personal care products",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2080&auto=format&fit=crop",
    slug: "beauty-personal-care"
  }
];

export const products: Product[] = [
  // Electronics Category
  {
    id: "1",
    name: "Premium Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation feature, perfect for music lovers and professionals alike. Enjoy crystal-clear audio and comfortable wear for extended periods.",
    price: 12499,
    discountedPrice: 10999,
    currency: "₹",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=2065&auto=format&fit=crop"
    ],
    category: "Electronics",
    tags: ["headphones", "wireless", "audio", "music"],
    rating: 4.8,
    reviews: 245,
    stock: 50,
    featured: true,
    createdAt: "2023-01-15T08:00:00Z",
    updatedAt: "2023-06-10T10:30:00Z"
  },
  {
    id: "2",
    name: "Smartphone Pro Max",
    description: "Latest smartphone with advanced camera system, all-day battery life, and stunning display. Perfect for photography enthusiasts and mobile gamers.",
    price: 84999,
    currency: "₹",
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=2080&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1592750475338-74b7b21a3228?q=80&w=2087&auto=format&fit=crop"
    ],
    category: "Electronics",
    tags: ["smartphone", "mobile", "camera", "tech"],
    rating: 4.9,
    reviews: 320,
    stock: 30,
    featured: true,
    createdAt: "2023-02-01T09:15:00Z",
    updatedAt: "2023-05-20T14:40:00Z"
  },
  {
    id: "3",
    name: "Smart Fitness Watch",
    description: "Track your health metrics, workouts, and sleep patterns with this advanced fitness watch. Water-resistant and long battery life.",
    price: 16999,
    discountedPrice: 14999,
    currency: "₹",
    images: [
      "https://images.unsplash.com/photo-1539874754764-5a96559165b0?q=80&w=2080&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?q=80&w=2080&auto=format&fit=crop"
    ],
    category: "Electronics",
    tags: ["fitness", "watch", "health", "smart"],
    rating: 4.7,
    reviews: 185,
    stock: 75,
    featured: true,
    createdAt: "2023-01-20T11:30:00Z",
    updatedAt: "2023-04-15T09:20:00Z"
  },
  {
    id: "9",
    name: "Bluetooth Portable Speaker",
    description: "Compact portable speaker with impressive sound quality and 20-hour battery life. Waterproof design makes it perfect for outdoor adventures.",
    price: 5999,
    discountedPrice: 4999,
    currency: "₹",
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=2069&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1589003786077-f73d7f8afb6c?q=80&w=2073&auto=format&fit=crop"
    ],
    category: "Electronics",
    tags: ["speaker", "bluetooth", "portable", "audio"],
    rating: 4.6,
    reviews: 128,
    stock: 45,
    featured: false,
    createdAt: "2023-03-05T13:45:00Z",
    updatedAt: "2023-07-12T09:30:00Z"
  },
  {
    id: "10",
    name: "Ultra HD Smart TV",
    description: "65-inch 4K Ultra HD smart television with voice control and multiple streaming apps built-in. Immersive viewing experience with brilliant colors and sharp details.",
    price: 79999,
    discountedPrice: 64999,
    currency: "₹",
    images: [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=2070&auto=format&fit=crop"
    ],
    category: "Electronics",
    tags: ["tv", "smart", "4k", "ultra-hd"],
    rating: 4.8,
    reviews: 210,
    stock: 15,
    featured: true,
    createdAt: "2023-02-15T10:20:00Z",
    updatedAt: "2023-08-01T14:15:00Z"
  },
  
  // Clothing Category
  {
    id: "4",
    name: "Designer Cotton T-Shirt",
    description: "Premium cotton t-shirt with unique designer print. Comfortable fit for everyday wear with durable fabric that stays soft wash after wash.",
    price: 2999,
    currency: "₹",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=2080&auto=format&fit=crop"
    ],
    category: "Clothing",
    tags: ["t-shirt", "cotton", "casual", "comfortable"],
    rating: 4.5,
    reviews: 120,
    stock: 200,
    featured: false,
    createdAt: "2023-03-10T13:45:00Z",
    updatedAt: "2023-06-05T16:20:00Z"
  },
  {
    id: "5",
    name: "Slim-Fit Jeans",
    description: "Modern slim-fit jeans made from quality denim. Perfect for casual and semi-formal occasions with excellent comfort and durability.",
    price: 4999,
    discountedPrice: 3999,
    currency: "₹",
    images: [
      "https://images.unsplash.com/photo-1582552938357-32b906df40cb?q=80&w=2080&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=2087&auto=format&fit=crop"
    ],
    category: "Clothing",
    tags: ["jeans", "denim", "slim-fit", "casual"],
    rating: 4.6,
    reviews: 95,
    stock: 150,
    featured: false,
    createdAt: "2023-02-15T10:20:00Z",
    updatedAt: "2023-05-01T12:10:00Z"
  },
  {
    id: "11",
    name: "Classic Formal Shirt",
    description: "Premium cotton formal shirt with crisp collar and perfect fit. Ideal for office wear or formal events with wrinkle-resistant fabric.",
    price: 3499,
    discountedPrice: 2999,
    currency: "₹",
    images: [
      "https://images.unsplash.com/photo-1598032895397-b9472444bf93?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563630423918-b58f07336ac5?q=80&w=2087&auto=format&fit=crop"
    ],
    category: "Clothing",
    tags: ["shirt", "formal", "office", "cotton"],
    rating: 4.7,
    reviews: 88,
    stock: 120,
    featured: false,
    createdAt: "2023-03-22T09:30:00Z",
    updatedAt: "2023-07-15T11:45:00Z"
  },
  {
    id: "12",
    name: "Women's Casual Sundress",
    description: "Stylish floral print sundress perfect for summer days. Lightweight fabric with adjustable straps and comfortable fit.",
    price: 3799,
    discountedPrice: 2999,
    currency: "₹",
    images: [
      "https://images.unsplash.com/photo-1612336307429-8a898d10e223?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=2076&auto=format&fit=crop"
    ],
    category: "Clothing",
    tags: ["dress", "women", "summer", "casual"],
    rating: 4.8,
    reviews: 156,
    stock: 75,
    featured: true,
    createdAt: "2023-04-05T14:20:00Z",
    updatedAt: "2023-08-10T10:15:00Z"
  },
  
  // Home & Kitchen Category
  {
    id: "6",
    name: "Stainless Steel Cookware Set",
    description: "Complete set of professional-grade stainless steel cookware. Includes pots and pans of various sizes with heat-resistant handles and lids.",
    price: 20999,
    discountedPrice: 16999,
    currency: "₹",
    images: [
      "https://images.unsplash.com/photo-1584990347449-b88300bd9253?q=80&w=2080&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1585837575652-267c041d77d4?q=80&w=2080&auto=format&fit=crop"
    ],
    category: "Home & Kitchen",
    tags: ["cookware", "kitchen", "stainless-steel", "cooking"],
    rating: 4.8,
    reviews: 75,
    stock: 40,
    featured: true,
    createdAt: "2023-01-10T14:30:00Z",
    updatedAt: "2023-04-30T11:45:00Z"
  },
  {
    id: "7",
    name: "Smart Home Speaker",
    description: "Voice-controlled speaker with premium sound quality and smart home integration. Control your music, get answers, and manage your smart home devices.",
    price: 10999,
    currency: "₹",
    images: [
      "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?q=80&w=2087&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=2080&auto=format&fit=crop"
    ],
    category: "Electronics",
    tags: ["speaker", "smart-home", "voice-control", "audio"],
    rating: 4.7,
    reviews: 210,
    stock: 60,
    featured: true,
    createdAt: "2023-01-25T09:40:00Z",
    updatedAt: "2023-05-15T10:35:00Z"
  },
  {
    id: "13",
    name: "Modern Coffee Table",
    description: "Elegant coffee table with minimalist design. Sturdy construction with wooden top and metal legs, perfect for any living room.",
    price: 14999,
    discountedPrice: 12999,
    currency: "₹",
    images: [
      "https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=2087&auto=format&fit=crop"
    ],
    category: "Home & Kitchen",
    tags: ["furniture", "table", "living room", "modern"],
    rating: 4.6,
    reviews: 65,
    stock: 25,
    featured: false,
    createdAt: "2023-04-15T11:30:00Z",
    updatedAt: "2023-08-20T09:45:00Z"
  },
  {
    id: "14",
    name: "Premium Bedding Set",
    description: "Luxurious 400-thread-count cotton bedding set including duvet cover, fitted sheet, and pillowcases. Soft, comfortable, and durable.",
    price: 8999,
    discountedPrice: 7499,
    currency: "₹",
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2071&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?q=80&w=2069&auto=format&fit=crop"
    ],
    category: "Home & Kitchen",
    tags: ["bedding", "sheets", "cotton", "bedroom"],
    rating: 4.9,
    reviews: 112,
    stock: 50,
    featured: true,
    createdAt: "2023-03-10T15:20:00Z",
    updatedAt: "2023-07-25T13:15:00Z"
  },
  
  // Beauty & Personal Care Category
  {
    id: "8",
    name: "Organic Face Serum",
    description: "Hydrating face serum made with organic ingredients. Perfect for all skin types, helping to moisturize and rejuvenate your skin naturally.",
    price: 2999,
    currency: "₹",
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1974&auto=format&fit=crop"
    ],
    category: "Beauty & Personal Care",
    tags: ["skincare", "organic", "face-serum", "beauty"],
    rating: 4.6,
    reviews: 160,
    stock: 100,
    featured: false,
    createdAt: "2023-02-20T15:15:00Z",
    updatedAt: "2023-06-15T17:30:00Z"
  },
  {
    id: "15",
    name: "Luxury Bath Set",
    description: "Complete bath set with bath bombs, essential oils, and premium towels for a spa-like experience at home. Made with all-natural ingredients.",
    price: 3499,
    discountedPrice: 2999,
    currency: "₹",
    images: [
      "https://images.unsplash.com/photo-1570194065650-d707c4c1b2be?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=2070&auto=format&fit=crop"
    ],
    category: "Beauty & Personal Care",
    tags: ["bath", "spa", "relaxation", "self-care"],
    rating: 4.8,
    reviews: 95,
    stock: 60,
    featured: true,
    createdAt: "2023-05-05T10:45:00Z",
    updatedAt: "2023-09-01T14:30:00Z"
  },
  {
    id: "16",
    name: "Hair Care Gift Set",
    description: "Premium hair care set with shampoo, conditioner, and hair mask. Made with natural ingredients for healthy, shiny hair.",
    price: 4999,
    discountedPrice: 3999,
    currency: "₹",
    images: [
      "https://images.unsplash.com/photo-1626710115837-819a6c59f36f?q=80&w=2076&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1610705267928-1b9f2fa7f1c5?q=80&w=2070&auto=format&fit=crop"
    ],
    category: "Beauty & Personal Care",
    tags: ["hair care", "shampoo", "conditioner", "natural"],
    rating: 4.7,
    reviews: 78,
    stock: 40,
    featured: false,
    createdAt: "2023-04-20T13:25:00Z",
    updatedAt: "2023-08-15T11:30:00Z"
  }
];
