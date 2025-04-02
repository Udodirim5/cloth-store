
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useProducts } from '@/contexts/ProductContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ShoppingCart } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProduct } = useProducts();
  const { addItem } = useCart();
  
  const product = getProduct(id || '');
  
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  
  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/')}>
            Return to Home
          </Button>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    if (!selectedColor) {
      alert('Please select a color');
      return;
    }
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: selectedColor
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row -mx-4">
          {/* Product Image */}
          <div className="md:w-1/2 px-4 mb-6 md:mb-0">
            <div className="sticky top-24">
              <div className="bg-white rounded-lg overflow-hidden border">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
          
          {/* Product Details */}
          <div className="md:w-1/2 px-4">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-2xl font-semibold mb-4">${product.price.toFixed(2)}</p>
            
            <div className="mb-6">
              <p className="text-gray-700">{product.description}</p>
            </div>
            
            <Separator className="my-6" />
            
            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Select Size</h3>
              <RadioGroup 
                value={selectedSize} 
                onValueChange={setSelectedSize}
                className="flex flex-wrap gap-3"
              >
                {product.sizes.map((size) => (
                  <div key={size} className="flex items-center space-x-2">
                    <RadioGroupItem value={size} id={`size-${size}`} className="peer sr-only" />
                    <Label
                      htmlFor={`size-${size}`}
                      className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white text-sm font-medium peer-data-[state=checked]:border-brand-purple peer-data-[state=checked]:bg-brand-light-purple cursor-pointer"
                    >
                      {size}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            {/* Color Selection */}
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-3">Select Color</h3>
              <RadioGroup 
                value={selectedColor} 
                onValueChange={setSelectedColor}
                className="flex flex-wrap gap-3"
              >
                {product.colors.map((color) => (
                  <div key={color} className="flex items-center space-x-2">
                    <RadioGroupItem value={color} id={`color-${color}`} className="peer sr-only" />
                    <Label
                      htmlFor={`color-${color}`}
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-200 peer-data-[state=checked]:border-brand-purple cursor-pointer"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            {/* Add to Cart Button */}
            <Button 
              onClick={handleAddToCart} 
              className="w-full py-6 bg-brand-purple hover:bg-brand-dark-purple"
            >
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
            
            {/* Product Details and Shipping */}
            <div className="mt-8 space-y-4">
              <div className="p-4 bg-gray-50 rounded">
                <h3 className="font-medium mb-2">Delivery</h3>
                <p className="text-sm text-gray-600">
                  Pay on delivery available. Standard delivery within 2-3 business days.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded">
                <h3 className="font-medium mb-2">Returns & Exchanges</h3>
                <p className="text-sm text-gray-600">
                  Easy returns within 7 days of delivery. Conditions apply.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
