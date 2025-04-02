
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // This is a simple demo authentication - in a real app, you would validate against a secure backend
    setTimeout(() => {
      if (username === 'admin' && password === 'admin123') {
        // Store admin session in localStorage (in a real app, use a secure token)
        localStorage.setItem('adminAuthenticated', 'true');
        toast({
          title: "Login Successful",
          description: "Welcome to the admin dashboard.",
        });
        navigate('/admin/dashboard');
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid username or password. Please try again.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="text-gray-600 mt-2">Enter your credentials to access the admin dashboard</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-purple"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-purple"
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-brand-purple hover:bg-brand-dark-purple"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
          
          <div className="text-center mt-4 text-sm text-gray-600">
            <p>Demo credentials for testing:</p>
            <p>Username: admin</p>
            <p>Password: admin123</p>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <a href="/" className="text-brand-purple hover:underline">
            Return to Store
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
