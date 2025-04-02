
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/contexts/ProductContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <Link to={`/product/${product.id}`}>
        <div className="relative aspect-square overflow-hidden">
          <img 
            src={product.image || "/placeholder.svg" } 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {product.newArrival && (
            <div className="absolute top-2 right-2 bg-brand-purple text-white text-xs px-2 py-1 rounded">
              New
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium text-lg truncate">{product.name}</h3>
          <div className="flex justify-between items-center mt-2">
            <p className="font-semibold">${product.price.toFixed(2)}</p>
            <div className="flex space-x-1">
              {product.colors.slice(0, 3).map((color) => (
                <div 
                  key={color}
                  className="w-3 h-3 rounded-full border border-gray-300"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
              {product.colors.length > 3 && (
                <span className="text-xs text-gray-500">+{product.colors.length - 3}</span>
              )}
            </div>
          </div>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0">
        <Link to={`/product/${product.id}`} className="w-full">
          <Button 
            variant="outline" 
            className="w-full border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white"
          >
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
