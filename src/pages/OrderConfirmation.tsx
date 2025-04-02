
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useOrder } from '@/contexts/OrderContext';
import { Button } from '@/components/ui/button';
import { CheckCircle, Package } from 'lucide-react';
import { format } from 'date-fns';

const OrderConfirmation = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { getOrder } = useOrder();
  
  const order = orderId ? getOrder(orderId) : undefined;

  // Use the store URL to format dates
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'PPP');
    } catch (error) {
      return dateString;
    }
  };

  if (!order) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
          <p className="mb-6">The order you're looking for doesn't exist or has been removed.</p>
          <Link to="/">
            <Button>
              Return to Home
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-6 md:p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle size={32} className="text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-lg text-gray-600">Thank you for your order</p>
          </div>
          
          <div className="mb-8 p-4 bg-brand-soft-gray rounded-lg">
            <div className="flex flex-wrap justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-sm text-gray-500 mb-1">Order Number</p>
                <p className="font-semibold">{order.id}</p>
              </div>
              <div className="mb-4 md:mb-0">
                <p className="text-sm text-gray-500 mb-1">Order Date</p>
                <p className="font-semibold">{formatDate(order.createdAt)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Estimated Delivery</p>
                <p className="font-semibold">{formatDate(order.estimatedDelivery)}</p>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            
            <div className="space-y-4">
              {order.items.map((item, index) => (
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
                  {order.priorityDelivery 
                    ? (order.total / 1.1).toFixed(2) 
                    : order.total.toFixed(2)
                  }
                </span>
              </div>
              {order.priorityDelivery && (
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Priority Delivery (10%)</span>
                  <span>${(order.total - (order.total / 1.1)).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-semibold text-lg pt-2">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Customer Name</p>
                <p className="font-medium">{order.customerName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                <p className="font-medium">{order.phone}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-500 mb-1">Delivery Address</p>
                <p className="font-medium">{order.address}</p>
              </div>
              {order.email && (
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <p className="font-medium">{order.email}</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="p-4 bg-brand-soft-gray rounded-lg flex items-start mb-8">
            <Package className="flex-shrink-0 text-brand-purple mr-3 mt-1" size={24} />
            <div>
              <h3 className="font-semibold mb-1">Shipping Information</h3>
              <p className="text-sm text-gray-600">
                Your order will be delivered to your doorstep. You'll receive your items by {formatDate(order.estimatedDelivery)}.
                Payment will be collected upon delivery.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/track-order" className="flex-1">
              <Button variant="outline" className="w-full">
                Track Your Order
              </Button>
            </Link>
            <Link to="/" className="flex-1">
              <Button className="w-full bg-brand-purple hover:bg-brand-dark-purple">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmation;
