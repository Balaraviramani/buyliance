
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountedPrice?: number;
  currency: string;
  images: string[];
  category: string;
  tags: string[];
  rating: number;
  reviews: number;
  stock: number;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  brand?: string; // Added for filtering by brand
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  address?: Address;
  orders?: Order[];
  wishlist?: string[]; // Array of product IDs
  isAdmin: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  shippingAddress: Address;
  paymentMethod: string;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  paymentStatus?: 'pending' | 'paid' | 'failed';
  trackingNumber?: string;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
  isApproved: boolean;
}

export interface Wishlist {
  userId: string;
  productIds: string[];
}

export interface FilterOptions {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
}

export interface Coupon {
  id: string;
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue?: number;
  maxDiscountValue?: number;
  validFrom: string;
  validTo: string;
  usageLimit?: number;
  usageCount: number;
  isActive: boolean;
}

export interface DashboardStats {
  totalSales: number;
  totalOrders: number;
  totalUsers: number;
  topSellingProducts: {
    product: Product;
    quantity: number;
  }[];
}
