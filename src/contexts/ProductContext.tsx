
import React, { createContext, useContext, ReactNode, useState } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'men' | 'women' | 'accessories';
  description: string;
  image: string;
  colors: string[];
  sizes: string[];
  featured?: boolean;
  newArrival?: boolean;
}

// Sample product data
const initialProductData: Product[] = [
  {
    id: 'p1',
    name: 'Classic White T-Shirt',
    price: 24.99,
    category: 'men',
    description: 'Timeless white t-shirt made from premium cotton for everyday comfort.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    colors: ['white', 'black', 'gray'],
    sizes: ['S', 'M', 'L', 'XL'],
    featured: true
  },
  {
    id: 'p2',
    name: 'Slim Fit Jeans',
    price: 59.99,
    category: 'men',
    description: 'Modern slim fit jeans with a comfortable stretch fabric.',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    colors: ['blue', 'black', 'gray'],
    sizes: ['30', '32', '34', '36'],
    newArrival: true
  },
  {
    id: 'p3',
    name: 'Cotton Cardigan',
    price: 49.99,
    category: 'women',
    description: 'Light and stylish cardigan perfect for layering in any season.',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    colors: ['cream', 'black', 'navy'],
    sizes: ['XS', 'S', 'M', 'L'],
    featured: true
  },
  {
    id: 'p4',
    name: 'Summer Floral Dress',
    price: 79.99,
    category: 'women',
    description: 'Beautiful floral pattern dress perfect for summer days.',
    image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    colors: ['blue', 'pink', 'yellow'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    newArrival: true
  },
  {
    id: 'p5',
    name: 'Leather Belt',
    price: 29.99,
    category: 'accessories',
    description: 'Classic genuine leather belt with a stylish metal buckle.',
    image: 'https://images.unsplash.com/photo-1604176354204-9268737828e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    colors: ['brown', 'black'],
    sizes: ['S', 'M', 'L'],
    featured: true
  },
  {
    id: 'p6',
    name: 'Stainless Steel Watch',
    price: 129.99,
    category: 'accessories',
    description: 'Elegant stainless steel watch with a minimalist design.',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    colors: ['silver', 'gold', 'rose gold'],
    sizes: ['One Size'],
    newArrival: true
  },
  {
    id: 'p7',
    name: 'Casual Button-Up Shirt',
    price: 44.99,
    category: 'men',
    description: 'Versatile button-up shirt for casual and semi-formal occasions.',
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    colors: ['blue', 'white', 'patterns'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'p8',
    name: 'Wool Sweater',
    price: 69.99,
    category: 'women',
    description: 'Warm and cozy wool sweater for the cold seasons.',
    image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    colors: ['beige', 'gray', 'red'],
    sizes: ['S', 'M', 'L']
  }
];

interface ProductContextType {
  products: Product[];
  getFeaturedProducts: () => Product[];
  getNewArrivals: () => Product[];
  getProductsByCategory: (category: string) => Product[];
  getProduct: (id: string) => Product | undefined;
  searchProducts: (query: string) => Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(initialProductData);

  const getFeaturedProducts = () => {
    return products.filter(product => product.featured);
  };

  const getNewArrivals = () => {
    return products.filter(product => product.newArrival);
  };

  const getProductsByCategory = (category: string) => {
    return products.filter(product => product.category === category);
  };

  const getProduct = (id: string) => {
    return products.find(product => product.id === id);
  };

  const searchProducts = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return products.filter(
      product => 
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.description.toLowerCase().includes(lowercaseQuery) ||
        product.category.toLowerCase().includes(lowercaseQuery)
    );
  };

  const addProduct = (product: Product) => {
    setProducts([...products, product]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(products.map(product => 
      product.id === updatedProduct.id ? updatedProduct : product
    ));
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <ProductContext.Provider value={{
      products,
      getFeaturedProducts,
      getNewArrivals,
      getProductsByCategory,
      getProduct,
      searchProducts,
      addProduct,
      updateProduct,
      deleteProduct
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
