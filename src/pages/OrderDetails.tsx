
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useOrder } from '@/contexts/OrderContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

const OrderDetails = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { getOrder, updateOrderStatus } = useOrder();
  
  const order = orderId ? getOrder(orderId) : undefined;

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'PPP');
    } catch (error) {
      return dateString;
    }
  };

  const handleMarkReceived = () => {
    if (order) {
      updateOrderStatus(order.id, 'received');
      // Force re-render by navigating to the same page
      navigate(`/order-details/${order.id}`);
    }
  };

  if (!order) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
          <p className="mb-6">The order you're looking for doesn't exist or has been removed.</p>
          <Link to="/my-orders">
            <Button>
              Back to My Orders
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold">Order #{order.id}</h1>
              <p className="text-gray-500">Placed on {formatDate(order.createdAt)}</p>
            </div>
            <Badge className={
              order.status === 'received' 
                ? 'bg-green-500'
                : order.status === 'delivered' 
                  ? 'bg-blue-500' 
                  : 'bg-amber-500'
            }>
              {order.status === 'pending' && 'Pending'}
              {order.status === 'delivered' && 'Delivered'}
              {order.status === 'received' && 'Received'}
            </Badge>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex">
                  <div className="w-20 h-20 flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" />
                  </div>
                  <div className="ml-4 flex-grow">
                    <h3 className="font-medium">{item.name}</h3>
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
          
          <Separator className="my-6" />
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Delivery Address</p>
                <p className="font-medium">{order.address}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                <p className="font-medium">{order.phone}</p>
              </div>
              {order.email && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <p className="font-medium">{order.email}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-500 mb-1">Estimated Delivery</p>
                <p className="font-medium">{formatDate(order.estimatedDelivery)}</p>
              </div>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Delivery Status</h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-3"></div>
                <div>
                  <p className="font-medium">Order Placed</p>
                  <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
                </div>
              </div>
              
              {(order.status === 'delivered' || order.status === 'received') && (
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-3"></div>
                  <div>
                    <p className="font-medium">Order Delivered</p>
                    <p className="text-sm text-gray-500">Your order has been delivered</p>
                  </div>
                </div>
              )}
              
              {order.status === 'received' && (
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-3"></div>
                  <div>
                    <p className="font-medium">Order Received</p>
                    <p className="text-sm text-gray-500">You confirmed receipt of your order</p>
                  </div>
                </div>
              )}
              
              {order.status === 'pending' && (
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-gray-300 mr-3"></div>
                  <div>
                    <p className="font-medium">Order Pending</p>
                    <p className="text-sm text-gray-500">
                      Estimated delivery: {formatDate(order.estimatedDelivery)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <Link to="/my-orders">
              <Button variant="outline">
                Back to My Orders
              </Button>
            </Link>
            
            {order.status === 'delivered' && (
              <Button 
                onClick={handleMarkReceived}
                className="bg-green-500 hover:bg-green-600"
              >
                Mark as Received
              </Button>
            )}
            
            <Link to="/track-order">
              <Button className="bg-brand-purple hover:bg-brand-dark-purple">
                Track Order
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetails;
