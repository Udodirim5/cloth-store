
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Search, ShoppingBag } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center max-w-lg px-4">
        <h1 className="text-6xl font-bold text-brand-purple mb-4">404</h1>
        <p className="text-2xl font-semibold mb-2">Oops! Page not found</p>
        <p className="text-gray-600 mb-8">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="w-full md:w-auto bg-brand-purple hover:bg-brand-dark-purple flex items-center gap-2">
              <Home size={18} />
              Back to Home
            </Button>
          </Link>
          
          <Link to="/track-order">
            <Button variant="outline" className="w-full md:w-auto flex items-center gap-2">
              <ShoppingBag size={18} />
              Track Order
            </Button>
          </Link>
          
          <Link to="/search">
            <Button variant="outline" className="w-full md:w-auto flex items-center gap-2">
              <Search size={18} />
              Search Products
            </Button>
          </Link>
        </div>
        
        <div className="mt-12">
          <p className="text-gray-500 text-sm">
            If you believe this is an error, please contact our{" "}
            <Link to="/contact" className="text-brand-purple hover:underline">
              customer support
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
