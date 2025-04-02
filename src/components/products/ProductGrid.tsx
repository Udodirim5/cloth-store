
import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/contexts/ProductContext';

interface ProductGridProps {
  products: Product[];
  title?: string;
}

const ProductGrid = ({ products, title }: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold mb-2">No products found</h2>
        <p className="text-gray-500">Try adjusting your filters or search criteria.</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      {title && <h2 className="section-title">{title}</h2>}
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
