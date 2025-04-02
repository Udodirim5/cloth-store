
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useOrder } from '@/contexts/OrderContext';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

const MyOrders = () => {
  const { user } = useUser();
  const { getUserOrders } = useOrder();
  
  const orders = user ? getUserOrders(user.name) : [];

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'PPP');
    } catch (error) {
      return dateString;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>
        
        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <h2 className="text-xl font-semibold mb-4">No Orders Found</h2>
            <p className="text-gray-600 mb-6">
              You haven't placed any orders yet. Check out our products and place your first order!
            </p>
            <Link to="/">
              <Button className="bg-brand-purple hover:bg-brand-dark-purple">
                Start Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex flex-col md:flex-row justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold">Order #{order.id}</h2>
                    <p className="text-sm text-gray-500">Placed on {formatDate(order.createdAt)}</p>
                  </div>
                  <div className="mt-2 md:mt-0">
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
                </div>
                
                <div className="overflow-hidden">
                  <div className="flex flex-wrap -mx-2">
                    {order.items.slice(0, 3).map((item, index) => (
                      <div key={index} className="w-1/3 sm:w-1/4 md:w-1/6 p-2">
                        <div className="aspect-square overflow-hidden rounded">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className="w-1/3 sm:w-1/4 md:w-1/6 p-2 flex items-center justify-center">
                        <span className="text-sm text-gray-500">
                          +{order.items.length - 3} more
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex flex-col sm:flex-row justify-between">
                  <div className="mb-4 sm:mb-0">
                    <p className="text-gray-600">Total: <span className="font-semibold">${order.total.toFixed(2)}</span></p>
                    <p className="text-sm text-gray-500">
                      {order.items.reduce((acc, item) => acc + item.quantity, 0)} items
                      {order.priorityDelivery && ' • Priority Delivery'}
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <Link to={`/track-order`}>
                      <Button variant="outline">
                        Track Order
                      </Button>
                    </Link>
                    <Link to={`/order-details/${order.id}`}>
                      <Button className="bg-brand-purple hover:bg-brand-dark-purple">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyOrders;
