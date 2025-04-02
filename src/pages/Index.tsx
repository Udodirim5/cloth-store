
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useProducts } from '@/contexts/ProductContext';
import ProductGrid from '@/components/products/ProductGrid';
import { Link } from 'react-router-dom';

const Index = () => {
  const { getFeaturedProducts, getNewArrivals } = useProducts();
  
  const featuredProducts = getFeaturedProducts();
  const newArrivals = getNewArrivals();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-brand-soft-gray py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Trendy Fashion Delivered to Your Door
              </h1>
              <p className="text-lg mb-6 text-gray-600">
                Shop the latest styles with our convenient pay-on-delivery service.
                No hassle, no wait - just great fashion.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/category/men">
                  <Button className="bg-brand-purple hover:bg-brand-dark-purple">
                    Shop Men
                  </Button>
                </Link>
                <Link to="/category/women">
                  <Button className="bg-brand-purple hover:bg-brand-dark-purple">
                    Shop Women
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 bg-white p-4 rounded-lg shadow-md">
              <img 
                src="/placeholder.svg" 
                alt="Fashion Collection" 
                className="w-full h-64 md:h-80 object-cover rounded" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Link to="/category/men" className="group">
              <div className="relative rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
                <img 
                  src="/images/man.png" 
                  alt="Men's Fashion" 
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">Men</h3>
                </div>
              </div>
            </Link>
            <Link to="/category/women" className="group">
              <div className="relative rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
                <img 
                  src="/images/woman.png" 
                  alt="Women's Fashion" 
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">Women</h3>
                </div>
              </div>
            </Link>
            <Link to="/category/accessories" className="group">
              <div className="relative rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
                <img 
                  src="/images/accessories.png" 
                  alt="Accessories" 
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">Accessories</h3>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Featured Products</h2>
          <ProductGrid products={featuredProducts} />
          <div className="text-center mt-8">
            <Link to="/products">
              <Button variant="outline" className="border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title">New Arrivals</h2>
          <ProductGrid products={newArrivals} />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-brand-soft-gray">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-brand-purple rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Browse & Order</h3>
              <p className="text-gray-600">
                Browse our collection, select your items, and place your order online.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-brand-purple rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Fast Delivery</h3>
              <p className="text-gray-600">
                We'll deliver your order to your doorstep within 1-3 business days.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-brand-purple rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Pay on Delivery</h3>
              <p className="text-gray-600">
                Check your items upon delivery and pay only if you're satisfied.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
