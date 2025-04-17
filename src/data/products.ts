import { Product } from "@/types";
import { additionalProducts } from "./additional-products";

// Convert USD to INR (assuming 1 USD = 83 INR)
const usdToInr = (price?: number) => price ? Math.round(price * 83) : undefined;

// Existing products with INR conversion
const existingProductsInr: Product[] = [
  {
    id: "1",
    name: "Wireless Noise-Cancelling Headphones",
    description: "Experience premium sound quality with our wireless noise-cancelling headphones. Perfect for music lovers who want to block out external noise.",
    price: usdToInr(129.99),
    currency: "₹",
    discountedPrice: usdToInr(99.99),
    rating: 4.5,
    reviews: 153,
    stock: 25,
    category: "Electronics",
    tags: ["headphones", "wireless", "audio"],
    images: [
      "https://images.unsplash.com/photo-1545127398-14699f92334b?q=80&w=2535&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1616424525073-d5532ee6afb2?q=80&w=2664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1625873526852-381ab99fd305?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    featured: true
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    description: "Track your fitness goals with our advanced smart watch. Features include heart rate monitoring, step counting, and smartphone notifications.",
    price: usdToInr(199.99),
    currency: "₹",
    discountedPrice: usdToInr(159.99),
    rating: 4.3,
    reviews: 78,
    stock: 15,
    category: "Electronics",
    tags: ["smartwatch", "fitness", "wearable"],
    images: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=2428&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1617043786394-f977fa12eddf?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    featured: true
  },
  {
    id: "3",
    name: "Professional Camera Kit",
    description: "Capture stunning photos with our professional camera kit. Includes a high-resolution camera body, multiple lenses, and a carrying case.",
    price: usdToInr(999.99),
    currency: "₹",
    rating: 4.8,
    reviews: 42,
    stock: 5,
    category: "Electronics",
    tags: ["camera", "photography", "professional"],
    images: [
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1516724562728-afc824a36e84?q=80&w=2651&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1480365501497-199581be0e66?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ]
  },
  {
    id: "4",
    name: "Leather Weekend Bag",
    description: "A stylish and durable leather weekend bag perfect for short trips. Features multiple compartments and a comfortable shoulder strap.",
    price: usdToInr(149.99),
    currency: "₹",
    rating: 4.6,
    reviews: 65,
    stock: 20,
    category: "Fashion",
    tags: ["bag", "leather", "travel"],
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=2579&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ]
  },
  {
    id: "5",
    name: "Organic Cotton T-Shirt",
    description: "A comfortable and eco-friendly t-shirt made from 100% organic cotton. Available in multiple colors and sizes.",
    price: usdToInr(29.99),
    currency: "₹",
    discountedPrice: usdToInr(24.99),
    rating: 4.2,
    reviews: 112,
    stock: 50,
    category: "Fashion",
    tags: ["clothing", "organic", "t-shirt"],
    images: [
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=2654&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    featured: true
  },
  {
    id: "6",
    name: "Designer Sunglasses",
    description: "Protect your eyes in style with our designer sunglasses. Featuring UV protection and a comfortable fit.",
    price: usdToInr(89.99),
    currency: "₹",
    discountedPrice: usdToInr(69.99),
    rating: 4.4,
    reviews: 48,
    stock: 30,
    category: "Fashion",
    tags: ["accessories", "sunglasses", "summer"],
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=2580&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1534118007900-95c82793a121?q=80&w=2302&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ]
  },
  {
    id: "7",
    name: "Aromatherapy Candle Set",
    description: "A set of 3 aromatherapy candles to help you relax and create a calming atmosphere in your home.",
    price: usdToInr(34.99),
    currency: "₹",
    rating: 4.1,
    reviews: 87,
    stock: 40,
    category: "Home Decor",
    tags: ["candles", "aromatherapy", "relaxation"],
    images: [
      "https://images.unsplash.com/photo-1601652589223-38f82aa24fee?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1603006905001-faa502d2e4fd?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1582126977466-ac882a29eef5?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ]
  },
  {
    id: "8",
    name: "Ceramic Plant Pots (Set of 3)",
    description: "Enhance your home decor with these elegant ceramic plant pots. Perfect for small to medium indoor plants.",
    price: usdToInr(49.99),
    currency: "₹",
    discountedPrice: usdToInr(39.99),
    rating: 4.7,
    reviews: 59,
    stock: 25,
    category: "Home Decor",
    tags: ["plant pots", "ceramics", "home decor"],
    images: [
      "https://images.unsplash.com/photo-1512428813834-c702c7702b78?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?q=80&w=2575&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1618810158890-4c7bc1741ec1?q=80&w=2627&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ]
  },
  {
    id: "9",
    name: "Bluetooth Portable Speaker",
    description: "Take your music anywhere with our waterproof, portable Bluetooth speaker. Up to 12 hours of battery life.",
    price: usdToInr(79.99),
    currency: "₹",
    discountedPrice: usdToInr(59.99),
    rating: 4.5,
    reviews: 134,
    stock: 15,
    category: "Electronics",
    tags: ["speaker", "bluetooth", "portable"],
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1589003511303-d10653ff1e1e?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1585595283238-ea010d2020cf?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ]
  },
  {
    id: "10",
    name: "Premium Yoga Mat",
    description: "A non-slip, eco-friendly yoga mat perfect for all types of yoga. Comes with a carrying strap.",
    price: usdToInr(45.99),
    currency: "₹",
    rating: 4.6,
    reviews: 92,
    stock: 35,
    category: "Fitness",
    tags: ["yoga", "fitness", "exercise"],
    images: [
      "https://images.unsplash.com/photo-1588286840104-8957b019727f?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1603988363607-e1e4a66962c6?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    featured: true
  },
  {
    id: "11",
    name: "Adjustable Dumbbell Set",
    description: "Save space with our adjustable dumbbell set that replaces multiple sets of weights. Perfect for home workouts.",
    price: usdToInr(199.99),
    currency: "₹",
    discountedPrice: usdToInr(169.99),
    rating: 4.8,
    reviews: 47,
    stock: 10,
    category: "Fitness",
    tags: ["weights", "fitness", "exercise"],
    images: [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1580086319619-3ed498161c77?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ]
  },
  {
    id: "12",
    name: "Handcrafted Wooden Chess Set",
    description: "A beautiful, handcrafted wooden chess set with meticulously detailed pieces. Perfect for chess enthusiasts.",
    price: usdToInr(89.99),
    currency: "₹",
    rating: 4.9,
    reviews: 28,
    stock: 8,
    category: "Toys & Games",
    tags: ["chess", "board game", "handcrafted"],
    images: [
      "https://images.unsplash.com/photo-1586165368502-1bad197a6461?q=80&w=2358&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1580541832626-2a7131ee809f?q=80&w=2651&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ]
  }
];

// Combine existing products (with INR conversion) and new products
export const products: Product[] = [...existingProductsInr, ...additionalProducts];
