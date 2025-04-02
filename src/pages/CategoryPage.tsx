
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useProducts } from '@/contexts/ProductContext';
import ProductGrid from '@/components/products/ProductGrid';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Product } from '@/contexts/ProductContext';

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const { getProductsByCategory, products } = useProducts();
  
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  const categoryTitle = category 
    ? category.charAt(0).toUpperCase() + category.slice(1) 
    : 'Products';

  // Get unique sizes and colors for filters
  const allSizes = Array.from(new Set(
    products.flatMap(product => product.sizes)
  ));
  
  const allColors = Array.from(new Set(
    products.flatMap(product => product.colors)
  ));

  useEffect(() => {
    if (category) {
      let categoryProducts = getProductsByCategory(category);
      
      // Apply filters
      if (selectedSizes.length > 0) {
        categoryProducts = categoryProducts.filter(product => 
          product.sizes.some(size => selectedSizes.includes(size))
        );
      }
      
      if (selectedColors.length > 0) {
        categoryProducts = categoryProducts.filter(product => 
          product.colors.some(color => selectedColors.includes(color))
        );
      }
      
      categoryProducts = categoryProducts.filter(product => 
        product.price >= priceRange[0] && product.price <= priceRange[1]
      );
      
      setFilteredProducts(categoryProducts);
    }
  }, [category, selectedSizes, selectedColors, priceRange, getProductsByCategory]);

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size) 
        : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color) 
        : [...prev, color]
    );
  };

  const resetFilters = () => {
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange([0, 200]);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">{categoryTitle}</h1>
        
        <div className="flex flex-col md:flex-row">
          {/* Mobile filter button */}
          <div className="md:hidden mb-4">
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="w-full mb-4"
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </div>
          
          {/* Filters */}
          <div className={`md:w-1/4 md:pr-8 ${showFilters ? 'block' : 'hidden md:block'}`}>
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <h2 className="font-semibold text-lg mb-4">Filters</h2>
              
              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Price Range</h3>
                <Slider
                  defaultValue={[priceRange[0], priceRange[1]]}
                  max={200}
                  step={5}
                  onValueChange={(value) => setPriceRange([value[0], value[1]])}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
              
              {/* Size Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Size</h3>
                <div className="space-y-2">
                  {allSizes.map(size => (
                    <div key={size} className="flex items-center">
                      <Checkbox 
                        id={`size-${size}`} 
                        checked={selectedSizes.includes(size)}
                        onCheckedChange={() => toggleSize(size)}
                      />
                      <label 
                        htmlFor={`size-${size}`}
                        className="ml-2 text-sm font-medium cursor-pointer"
                      >
                        {size}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Color Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {allColors.map(color => (
                    <div 
                      key={color}
                      className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
                        selectedColors.includes(color) ? 'border-brand-purple' : 'border-gray-200'
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => toggleColor(color)}
                      title={color}
                    />
                  ))}
                </div>
              </div>
              
              <Button 
                variant="outline" 
                onClick={resetFilters}
                className="w-full mt-4"
              >
                Reset Filters
              </Button>
            </div>
          </div>
          
          {/* Products */}
          <div className="md:w-3/4">
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
