
import React from 'react';
import Layout from '@/components/layout/Layout';
import ProductGrid from '@/components/products/ProductGrid';
import { useProducts } from '@/contexts/ProductContext';

const Products = () => {
  const { products } = useProducts();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">All Products</h1>
        <p className="text-gray-600 mb-8">
          Browse our complete collection of products. Find your perfect style from our wide range of options.
        </p>
        
        <ProductGrid products={products} />
        
        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No products available at the moment. Please check back later.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Products;
