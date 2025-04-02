
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useCart } from '@/contexts/CartContext';
import { useUser } from '@/contexts/UserContext';
import { useOrder } from '@/contexts/OrderContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { items, subtotal, priorityDelivery, setPriorityDelivery, total, clearCart } = useCart();
  const { addOrder } = useOrder();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    address: '',
    phone: '',
    email: '',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name.trim() || !formData.address.trim() || !formData.phone.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // Create the order
    const orderId = addOrder({
      customerName: formData.name,
      items: items,
      address: formData.address,
      phone: formData.phone,
      email: formData.email || undefined,
      priorityDelivery: priorityDelivery,
      total: total
    });
    
    // Clear the cart
    clearCart();
    
    // Navigate to the order confirmation page
    navigate(`/order-confirmation/${orderId}`);
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Checkout Form */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6">Delivery Information</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4 mb-6">
                  <div>
                    <Label htmlFor="name" className="block mb-2">
                      Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="address" className="block mb-2">
                      Delivery Address <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full"
                      rows={3}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="block mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="block mb-2">
                      Email (Optional)
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="notes" className="block mb-2">
                      Order Notes (Optional)
                    </Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      className="w-full"
                      rows={3}
                      placeholder="Any special instructions for delivery"
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <span className="font-medium">Priority Delivery</span>
                    <p className="text-sm text-gray-500">Get your items faster (additional 10% fee)</p>
                  </div>
                  <Switch 
                    checked={priorityDelivery} 
                    onCheckedChange={setPriorityDelivery} 
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-brand-purple hover:bg-brand-dark-purple py-6 text-lg"
                >
                  Place Order
                </Button>
              </form>
              
              <div className="mt-8 text-sm text-gray-500">
                <p>
                  By placing an order, you agree to our <a href="#" className="text-brand-purple">Terms and Conditions</a> and <a href="#" className="text-brand-purple">Privacy Policy</a>.
                </p>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {items.map(item => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="flex">
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
              
              <Separator className="mb-4" />
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {priorityDelivery && (
                  <div className="flex justify-between">
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
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-2">Payment Method</h3>
                <p className="text-gray-600">Cash on Delivery</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
