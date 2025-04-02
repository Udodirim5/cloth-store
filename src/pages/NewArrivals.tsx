
import React from 'react';
import Layout from '@/components/layout/Layout';
import ProductGrid from '@/components/products/ProductGrid';
import { useProducts } from '@/contexts/ProductContext';

const NewArrivals = () => {
  const { getNewArrivals } = useProducts();
  const newProducts = getNewArrivals();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">New Arrivals</h1>
        <p className="text-gray-600 mb-8">
          Discover our latest collections and stay ahead of the fashion curve with our freshest styles.
        </p>
        
        <ProductGrid products={newProducts} />
        
        {newProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">New arrivals coming soon! Check back later for updates.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default NewArrivals;
