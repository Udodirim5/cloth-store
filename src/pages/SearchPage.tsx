
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useProducts } from '@/contexts/ProductContext';
import ProductGrid from '@/components/products/ProductGrid';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const SearchPage = () => {
  const location = useLocation();
  const { searchProducts } = useProducts();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || '';
    setSearchQuery(query);
    
    if (query) {
      const results = searchProducts(query);
      setSearchResults(results);
    }
  }, [location.search, searchProducts]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchQuery.trim()) {
      const results = searchProducts(searchQuery);
      setSearchResults(results);
      
      // Update the URL
      const params = new URLSearchParams();
      params.set('q', searchQuery);
      window.history.pushState({}, '', `${location.pathname}?${params.toString()}`);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Search Results</h1>
        
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products..."
              className="flex-grow"
            />
            <Button type="submit" className="bg-brand-purple hover:bg-brand-dark-purple">
              <Search size={20} className="mr-2" /> Search
            </Button>
          </form>
        </div>
        
        {searchQuery ? (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Search results for "{searchQuery}"
            </h2>
            <ProductGrid products={searchResults} />
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">Start searching for products</h2>
            <p className="text-gray-600">
              Enter a search term above to find products by name, description, or category.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SearchPage;
