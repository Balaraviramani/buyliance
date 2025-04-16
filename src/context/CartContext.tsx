
import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { CartItem, Product } from '@/types';

type CartAction = 
  | { type: 'ADD_ITEM'; payload: { product: Product, quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: string } // product id
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string, quantity: number } }
  | { type: 'CLEAR_CART' };

interface CartState {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
}

interface CartContextType extends CartState {
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const initialState: CartState = {
  items: [],
  itemCount: 0,
  subtotal: 0
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.product.id === product.id);
      
      if (existingItemIndex > -1) {
        // Update quantity of existing item
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
        
        return {
          ...state,
          items: updatedItems,
          itemCount: state.itemCount + quantity,
          subtotal: state.subtotal + (product.discountedPrice || product.price) * quantity
        };
      } else {
        // Add new item
        return {
          ...state,
          items: [...state.items, { product, quantity }],
          itemCount: state.itemCount + quantity,
          subtotal: state.subtotal + (product.discountedPrice || product.price) * quantity
        };
      }
    }
    
    case 'REMOVE_ITEM': {
      const productId = action.payload;
      const itemToRemove = state.items.find(item => item.product.id === productId);
      
      if (!itemToRemove) return state;
      
      return {
        ...state,
        items: state.items.filter(item => item.product.id !== productId),
        itemCount: state.itemCount - itemToRemove.quantity,
        subtotal: state.subtotal - 
          (itemToRemove.product.discountedPrice || itemToRemove.product.price) * 
          itemToRemove.quantity
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.product.id === productId);
      
      if (existingItemIndex === -1) return state;
      
      const item = state.items[existingItemIndex];
      const quantityDiff = quantity - item.quantity;
      
      // Create a new array with the updated item
      const updatedItems = [...state.items];
      updatedItems[existingItemIndex] = { ...item, quantity };
      
      return {
        ...state,
        items: updatedItems,
        itemCount: state.itemCount + quantityDiff,
        subtotal: state.subtotal + 
          (item.product.discountedPrice || item.product.price) * quantityDiff
      };
    }
    
    case 'CLEAR_CART':
      return initialState;
    
    default:
      return state;
  }
}

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState, () => {
    // Load cart from localStorage on initialization
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : initialState;
  });
  
  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);
  
  const addItem = (product: Product, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });
  };
  
  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };
  
  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  
  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
