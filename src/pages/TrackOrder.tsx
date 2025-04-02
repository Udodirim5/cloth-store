
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useOrder, Order } from '@/contexts/OrderContext';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { CheckCircle, Clock, Package, Truck } from 'lucide-react';
import { format } from 'date-fns';

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [trackedOrder, setTrackedOrder] = useState<Order | null>(null);
  
  const { trackOrder, updateOrderStatus } = useOrder();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!orderId.trim() || !customerName.trim()) {
      toast.error('Please enter both order ID and name');
      return;
    }
    
    const order = trackOrder(orderId, customerName);
    if (order) {
      setTrackedOrder(order);
      toast.success('Order found');
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'PPP');
    } catch (error) {
      return dateString;
    }
  };

  const handleMarkReceived = () => {
    if (trackedOrder) {
      updateOrderStatus(trackedOrder.id, 'received');
      setTrackedOrder({ ...trackedOrder, status: 'received' });
      toast.success('Order marked as received. Thank you!');
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Track Your Order</h1>
        
        <div className="max-w-3xl mx-auto">
          {!trackedOrder ? (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <p className="mb-6 text-gray-600">
                Enter your order number and the name you used to place the order to check its status.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="orderId" className="block text-sm font-medium mb-2">
                    Order Number
                  </label>
                  <Input
                    id="orderId"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="Enter your order number (e.g. AB123456)"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="customerName" className="block text-sm font-medium mb-2">
                    Your Name
                  </label>
                  <Input
                    id="customerName"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter the name used for ordering"
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full bg-brand-purple hover:bg-brand-dark-purple">
                  Track Order
                </Button>
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Order #{trackedOrder.id}</h2>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <span>Ordered on: {formatDate(trackedOrder.createdAt)}</span>
                  <span>Estimated delivery: {formatDate(trackedOrder.estimatedDelivery)}</span>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="font-semibold mb-4">Order Status</h3>
                
                <div className="relative">
                  {/* Status timeline */}
                  <div className="hidden md:block absolute left-8 top-8 h-[calc(100%-64px)] w-0.5 bg-gray-200"></div>
                  
                  <div className="space-y-8">
                    <div className="flex items-start">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center border-2 ${
                        'border-green-500 bg-green-50'
                      } mr-4`}>
                        <CheckCircle size={24} className="text-green-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">Order Confirmed</h4>
                        <p className="text-sm text-gray-500">{formatDate(trackedOrder.createdAt)}</p>
                        <p className="mt-1 text-sm">Your order has been confirmed and is being processed.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center border-2 ${
                        trackedOrder.status !== 'pending' ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50'
                      } mr-4`}>
                        <Package size={24} className={trackedOrder.status !== 'pending' ? 'text-green-500' : 'text-gray-400'} />
                      </div>
                      <div>
                        <h4 className="font-medium">Order Processed</h4>
                        <p className="text-sm text-gray-500">{
                          trackedOrder.status !== 'pending' 
                            ? formatDate(new Date(new Date(trackedOrder.createdAt).getTime() + 1000 * 60 * 60).toISOString())
                            : 'Pending'
                        }</p>
                        <p className="mt-1 text-sm">
                          {trackedOrder.status !== 'pending' 
                            ? 'Your order has been processed and is being prepared for delivery.'
                            : 'Your order will be processed soon.'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center border-2 ${
                        trackedOrder.status === 'delivered' || trackedOrder.status === 'received' 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-gray-300 bg-gray-50'
                      } mr-4`}>
                        <Truck size={24} className={
                          trackedOrder.status === 'delivered' || trackedOrder.status === 'received' 
                            ? 'text-green-500' 
                            : 'text-gray-400'
                        } />
                      </div>
                      <div>
                        <h4 className="font-medium">Delivered</h4>
                        <p className="text-sm text-gray-500">
                          {trackedOrder.status === 'delivered' || trackedOrder.status === 'received'
                            ? 'Delivered'
                            : `Estimated: ${formatDate(trackedOrder.estimatedDelivery)}`}
                        </p>
                        <p className="mt-1 text-sm">
                          {trackedOrder.status === 'delivered' || trackedOrder.status === 'received'
                            ? 'Your order has been delivered. Please mark as received once you get your items.'
                            : 'Your order will be delivered soon.'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center border-2 ${
                        trackedOrder.status === 'received' 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-gray-300 bg-gray-50'
                      } mr-4`}>
                        <CheckCircle size={24} className={
                          trackedOrder.status === 'received' 
                            ? 'text-green-500' 
                            : 'text-gray-400'
                        } />
                      </div>
                      <div>
                        <h4 className="font-medium">Received</h4>
                        <p className="text-sm text-gray-500">
                          {trackedOrder.status === 'received' ? 'Completed' : 'Pending'}
                        </p>
                        <p className="mt-1 text-sm">
                          {trackedOrder.status === 'received'
                            ? 'You have confirmed receipt of your order. Thank you for shopping with us!'
                            : 'Please mark your order as received once you get your items.'}
                        </p>
                        
                        {trackedOrder.status === 'delivered' && (
                          <Button 
                            onClick={handleMarkReceived}
                            className="mt-3 bg-brand-purple hover:bg-brand-dark-purple"
                          >
                            Mark as Received
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div>
                <h3 className="font-semibold mb-4">Order Items</h3>
                <div className="space-y-4">
                  {trackedOrder.items.map((item, index) => (
                    <div key={index} className="flex">
                      <div className="w-16 h-16 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" />
                      </div>
                      <div className="ml-4 flex-grow">
                        <p className="font-medium">{item.name}</p>
                        <div className="flex justify-between">
                          <p className="text-sm text-gray-500">
                            {item.size}, {item.color} × {item.quantity}
                          </p>
                          <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span>
                      $
                      {trackedOrder.priorityDelivery 
                        ? (trackedOrder.total / 1.1).toFixed(2) 
                        : trackedOrder.total.toFixed(2)
                      }
                    </span>
                  </div>
                  {trackedOrder.priorityDelivery && (
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Priority Delivery (10%)</span>
                      <span>${(trackedOrder.total - (trackedOrder.total / 1.1)).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-semibold text-lg pt-2">
                    <span>Total</span>
                    <span>${trackedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex space-x-4">
                <Button variant="outline" onClick={() => setTrackedOrder(null)}>
                  Track Another Order
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default TrackOrder;
