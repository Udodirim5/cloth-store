
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Trash, Plus, Minus, ArrowRight } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import UserLoginModal from '@/components/auth/UserLoginModal';

const CartPage = () => {
  const { items, removeItem, updateQuantity, clearCart, subtotal, priorityDelivery, setPriorityDelivery, total } = useCart();
  const { isLoggedIn } = useUser();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = React.useState(false);

  const handleCheckout = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="mb-6">Looks like you haven't added any items to your cart yet.</p>
          <Link to="/">
            <Button>
              Continue Shopping
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="hidden md:grid md:grid-cols-5 text-sm font-medium text-gray-500 mb-4">
                <div className="col-span-2">Product</div>
                <div>Price</div>
                <div>Quantity</div>
                <div>Total</div>
              </div>
              
              <Separator className="mb-4 md:hidden" />
              
              {items.map(item => (
                <div key={`${item.id}-${item.size}-${item.color}`} className="mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                    <div className="md:col-span-2 flex items-center">
                      <div className="w-20 h-20 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" />
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium">{item.name}</h3>
                        <div className="flex items-center mt-1 text-sm text-gray-500">
                          <span className="mr-2">Size: {item.size}</span>
                          <div 
                            className="w-3 h-3 rounded-full border border-gray-300" 
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="ml-1">Color: {item.color}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:text-center">
                      <div className="md:hidden text-sm text-gray-500 mb-1">Price:</div>
                      ${item.price.toFixed(2)}
                    </div>
                    
                    <div className="flex items-center">
                      <div className="md:hidden text-sm text-gray-500 mb-1 mr-2">Quantity:</div>
                      <div className="flex items-center">
                        <Button
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                        >
                          <Minus size={16} />
                        </Button>
                        <span className="mx-3 w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                        >
                          <Plus size={16} />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between md:justify-start">
                      <div>
                        <div className="md:hidden text-sm text-gray-500 mb-1">Total:</div>
                        <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                      <Button
                        variant="ghost" 
                        size="icon" 
                        className="text-red-500 hover:text-red-700 md:ml-4"
                        onClick={() => removeItem(item.id, item.size, item.color)}
                      >
                        <Trash size={18} />
                      </Button>
                    </div>
                  </div>
                  <Separator className="mt-6" />
                </div>
              ))}
              
              <div className="flex justify-between mt-6">
                <Button 
                  variant="outline" 
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
                <Link to="/">
                  <Button variant="outline">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-gray-600">Priority Delivery</span>
                    <p className="text-xs text-gray-500">Get your items faster</p>
                  </div>
                  <Switch 
                    checked={priorityDelivery} 
                    onCheckedChange={setPriorityDelivery} 
                  />
                </div>
                {priorityDelivery && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Priority Fee (10%)</span>
                    <span>${(subtotal * 0.1).toFixed(2)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-semibold text-lg pt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              <Button 
                className="w-full bg-brand-purple hover:bg-brand-dark-purple"
                onClick={handleCheckout}
              >
                Proceed to Checkout <ArrowRight size={16} className="ml-2" />
              </Button>
              
              <div className="mt-6 text-sm text-gray-500">
                <p className="mb-2">Delivery within 2-3 business days</p>
                <p>Cash on Delivery Available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {showLoginModal && (
        <UserLoginModal 
          isOpen={showLoginModal} 
          onClose={() => setShowLoginModal(false)} 
        />
      )}
    </Layout>
  );
};

export default CartPage;
