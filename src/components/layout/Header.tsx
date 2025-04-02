
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';
import { useCart } from '@/contexts/CartContext';
import { Badge } from '@/components/ui/badge';
import UserLoginModal from '@/components/auth/UserLoginModal';

const Header = () => {
  const { user, isLoggedIn, logout } = useUser();
  const { itemCount } = useCart();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-brand-purple">
            Style Street
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/category/men" className="hover:text-brand-purple transition-colors">
              Men
            </Link>
            <Link to="/category/women" className="hover:text-brand-purple transition-colors">
              Women
            </Link>
            <Link to="/category/accessories" className="hover:text-brand-purple transition-colors">
              Accessories
            </Link>
            <Link to="/track-order" className="hover:text-brand-purple transition-colors">
              Track Order
            </Link>
          </nav>

          {/* Search, User and Cart */}
          <div className="flex items-center space-x-4">
            <div className={`relative ${isSearchOpen ? 'block' : 'hidden md:block'}`}>
              <form onSubmit={handleSearch} className="flex items-center">
                <input
                  type="text"
                  placeholder="Search..."
                  className="input-field rounded-full py-1 pl-3 pr-10 text-sm focus:ring-1"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <Search size={18} className="text-gray-500" />
                </button>
              </form>
            </div>
            
            <button 
              className="md:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search size={20} />
            </button>

            {isLoggedIn ? (
              <div className="relative group">
                <Button variant="ghost" size="icon" className="relative">
                  <User size={20} />
                </Button>
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md hidden group-hover:block">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-medium">Hello, {user?.name}</p>
                  </div>
                  <Link to="/my-orders" className="block px-4 py-2 text-sm hover:bg-gray-100">
                    My Orders
                  </Link>
                  <button 
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowLoginModal(true)}
              >
                <User size={20} />
              </Button>
            )}

            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart size={20} />
                {itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-brand-purple text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="mt-4 pt-4 border-t md:hidden">
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/category/men" 
                  className="block hover:text-brand-purple"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Men
                </Link>
              </li>
              <li>
                <Link 
                  to="/category/women" 
                  className="block hover:text-brand-purple"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Women
                </Link>
              </li>
              <li>
                <Link 
                  to="/category/accessories" 
                  className="block hover:text-brand-purple"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Accessories
                </Link>
              </li>
              <li>
                <Link 
                  to="/track-order" 
                  className="block hover:text-brand-purple"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Track Order
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
      
      {showLoginModal && (
        <UserLoginModal 
          isOpen={showLoginModal} 
          onClose={() => setShowLoginModal(false)} 
        />
      )}
    </header>
  );
};

export default Header;
