
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
  color: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (itemId: string, size: string, color: string) => void;
  updateQuantity: (itemId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  priorityDelivery: boolean;
  setPriorityDelivery: (value: boolean) => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [priorityDelivery, setPriorityDelivery] = useState<boolean>(false);

  // Load cart from localStorage on init
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage', error);
      }
    }
    
    const storedPriority = localStorage.getItem('priorityDelivery');
    if (storedPriority) {
      setPriorityDelivery(storedPriority === 'true');
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);
  
  // Save priority delivery setting
  useEffect(() => {
    localStorage.setItem('priorityDelivery', priorityDelivery.toString());
  }, [priorityDelivery]);

  const findItemIndex = (itemId: string, size: string, color: string) => {
    return items.findIndex(
      item => item.id === itemId && item.size === size && item.color === color
    );
  };

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    const itemIndex = findItemIndex(item.id, item.size, item.color);
    
    if (itemIndex >= 0) {
      // Item already exists, update quantity
      const updatedItems = [...items];
      updatedItems[itemIndex].quantity += 1;
      setItems(updatedItems);
      toast.success('Item quantity updated in cart');
    } else {
      // Add new item
      setItems([...items, { ...item, quantity: 1 }]);
      toast.success('Item added to cart');
    }
  };

  const removeItem = (itemId: string, size: string, color: string) => {
    const updatedItems = items.filter(
      item => !(item.id === itemId && item.size === size && item.color === color)
    );
    setItems(updatedItems);
    toast.success('Item removed from cart');
  };

  const updateQuantity = (itemId: string, size: string, color: string, quantity: number) => {
    const itemIndex = findItemIndex(itemId, size, color);
    
    if (itemIndex >= 0) {
      if (quantity <= 0) {
        removeItem(itemId, size, color);
        return;
      }
      
      const updatedItems = [...items];
      updatedItems[itemIndex].quantity = quantity;
      setItems(updatedItems);
    }
  };

  const clearCart = () => {
    setItems([]);
    setPriorityDelivery(false);
    toast.success('Cart cleared');
  };

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  const total = priorityDelivery ? subtotal * 1.1 : subtotal;

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      itemCount,
      subtotal,
      priorityDelivery,
      setPriorityDelivery,
      total
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
