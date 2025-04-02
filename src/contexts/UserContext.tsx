
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

interface User {
  name: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoggedIn: boolean;
  login: (name: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Failed to parse user from localStorage', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = (name: string) => {
    if (!name.trim()) {
      toast.error('Please enter your name');
      return;
    }
    
    const newUser = { name };
    setUser(newUser);
    setIsLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(newUser));
    toast.success(`Welcome, ${name}!`);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('user');
    toast.success('You have been logged out');
  };

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
