
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Returns = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Returns & Exchanges</h1>
          
          <div className="bg-brand-soft-gray p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-3">Our Promise</h2>
            <p className="text-gray-700">
              We want you to be completely satisfied with your purchase. If you're not happy with your order for any reason, 
              we offer a simple and hassle-free returns and exchange process.
            </p>
          </div>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4">Return Policy</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-brand-purple pl-4 py-1">
                  <h3 className="font-medium">Return Window</h3>
                  <p className="text-gray-600">
                    You have 14 days from the delivery date to return your items.
                  </p>
                </div>
                
                <div className="border-l-4 border-brand-purple pl-4 py-1">
                  <h3 className="font-medium">Condition of Items</h3>
                  <p className="text-gray-600">
                    Items must be unworn, unwashed, and in their original packaging with all tags attached.
                  </p>
                </div>
                
                <div className="border-l-4 border-brand-purple pl-4 py-1">
                  <h3 className="font-medium">Non-Returnable Items</h3>
                  <p className="text-gray-600">
                    Intimate apparel, swimwear, and sale items marked as "Final Sale" cannot be returned.
                  </p>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">Exchange Policy</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-brand-purple pl-4 py-1">
                  <h3 className="font-medium">Exchange Window</h3>
                  <p className="text-gray-600">
                    You have 14 days from the delivery date to request an exchange for a different size or color.
                  </p>
                </div>
                
                <div className="border-l-4 border-brand-purple pl-4 py-1">
                  <h3 className="font-medium">Availability</h3>
                  <p className="text-gray-600">
                    Exchanges are subject to availability. If the requested item is out of stock, we'll provide a refund.
                  </p>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">How to Return or Exchange</h2>
              <ol className="list-decimal list-inside space-y-3 text-gray-700">
                <li>
                  Contact our customer service by email or phone to request a return authorization.
                </li>
                <li>
                  Package the items securely in their original packaging.
                </li>
                <li>
                  Include your order number and return reason in the package.
                </li>
                <li>
                  For pay-on-delivery orders, we'll process your refund once we receive and inspect the items.
                </li>
              </ol>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">Processing Time</h2>
              <p className="text-gray-700 mb-4">
                Returns and exchanges are typically processed within 3-5 business days after we receive your items.
                Refunds will be issued to your original payment method.
              </p>
            </section>
            
            <section className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Need Help?</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about our return or exchange policy, please don't hesitate to contact us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <Button className="w-full sm:w-auto bg-brand-purple hover:bg-brand-dark-purple">
                    Contact Us
                  </Button>
                </Link>
                <Link to="/track-order">
                  <Button variant="outline" className="w-full sm:w-auto border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white">
                    Track Your Order
                  </Button>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Returns;
