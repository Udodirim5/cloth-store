
import React, { ReactNode, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useUser } from '@/contexts/UserContext';
import UserLoginModal from '@/components/auth/UserLoginModal';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isLoggedIn } = useUser();
  const [showLoginPrompt, setShowLoginPrompt] = React.useState(false);

  useEffect(() => {
    // Check if user has been prompted before
    const hasBeenPrompted = localStorage.getItem('loginPrompted');
    
    if (!isLoggedIn && !hasBeenPrompted) {
      // Wait a moment before showing the login prompt
      const timer = setTimeout(() => {
        setShowLoginPrompt(true);
        localStorage.setItem('loginPrompted', 'true');
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      
      {showLoginPrompt && (
        <UserLoginModal 
          isOpen={showLoginPrompt} 
          onClose={() => setShowLoginPrompt(false)} 
        />
      )}
    </div>
  );
};

export default Layout;
