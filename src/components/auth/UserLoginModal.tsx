
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUser } from '@/contexts/UserContext';

interface UserLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserLoginModal = ({ isOpen, onClose }: UserLoginModalProps) => {
  const [name, setName] = useState('');
  const { login } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      login(name);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Welcome to Style Street</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <p className="mb-4 text-gray-600">
            Please enter your name to continue shopping. This helps us personalize your experience and track your orders.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium">
                  Your Name
                </label>
                <Input 
                  id="name"
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Enter your name"
                  className="w-full"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-brand-purple hover:bg-brand-dark-purple">
                Continue
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserLoginModal;
