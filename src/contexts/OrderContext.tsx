
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem } from './CartContext';
import { toast } from 'sonner';

export interface Order {
  id: string;
  customerName: string;
  items: CartItem[];
  address: string;
  phone: string;
  email?: string;
  priorityDelivery: boolean;
  total: number;
  status: 'pending' | 'delivered' | 'received';
  createdAt: string;
  estimatedDelivery: string;
}

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'estimatedDelivery' | 'status'>) => string;
  getOrder: (orderId: string) => Order | undefined;
  getUserOrders: (name: string) => Order[];
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  trackOrder: (orderId: string, customerName: string) => Order | null;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  // Load orders from localStorage on init
  useEffect(() => {
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
      try {
        setOrders(JSON.parse(storedOrders));
      } catch (error) {
        console.error('Failed to parse orders from localStorage', error);
      }
    }
  }, []);

  // Save orders to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  // Generate a random order ID
  const generateOrderId = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  // Add a new order
  const addOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'estimatedDelivery' | 'status'>) => {
    const orderId = generateOrderId();
    
    // Calculate estimated delivery date (2-3 days from now, less if priority)
    const deliveryDays = orderData.priorityDelivery ? 1 : Math.floor(Math.random() * 2) + 2;
    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + deliveryDays);
    
    const newOrder: Order = {
      id: orderId,
      ...orderData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      estimatedDelivery: estimatedDelivery.toISOString(),
    };
    
    setOrders(prev => [...prev, newOrder]);
    return orderId;
  };

  // Get a specific order by ID
  const getOrder = (orderId: string) => {
    return orders.find(order => order.id === orderId);
  };

  // Get all orders for a user
  const getUserOrders = (name: string) => {
    return orders.filter(order => order.customerName.toLowerCase() === name.toLowerCase());
  };

  // Update an order's status
  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId ? { ...order, status } : order
      )
    );
    
    const statusMessages = {
      pending: 'Order is now pending',
      delivered: 'Order has been marked as delivered',
      received: 'Order has been marked as received'
    };
    
    toast.success(statusMessages[status]);
  };

  // Track an order by ID and name
  const trackOrder = (orderId: string, customerName: string) => {
    const order = getOrder(orderId);
    
    if (!order) {
      toast.error('Order not found');
      return null;
    }
    
    if (order.customerName.toLowerCase() !== customerName.toLowerCase()) {
      toast.error('Customer name does not match order');
      return null;
    }
    
    return order;
  };

  return (
    <OrderContext.Provider value={{
      orders,
      addOrder,
      getOrder,
      getUserOrders,
      updateOrderStatus,
      trackOrder
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};
