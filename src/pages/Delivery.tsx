
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Delivery = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Delivery Information</h1>
          
          <div className="bg-brand-soft-gray p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-3">Pay on Delivery</h2>
            <p className="text-gray-700">
              At Style Street, we offer a convenient pay-on-delivery service. Browse and shop with confidence, 
              knowing you only pay when your items arrive at your doorstep.
            </p>
          </div>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4">Delivery Areas</h2>
              <p className="text-gray-700 mb-4">
                We currently deliver to the following areas:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-medium mb-2">Urban Areas</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Downtown</li>
                    <li>Metropolitan Area</li>
                    <li>Central Business District</li>
                    <li>Urban Residential Zones</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-medium mb-2">Suburban Areas</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>North Suburbs</li>
                    <li>South Suburbs</li>
                    <li>East Residential District</li>
                    <li>West Residential Zone</li>
                  </ul>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">Delivery Timeframes</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-brand-purple pl-4 py-1">
                  <h3 className="font-medium">Standard Delivery</h3>
                  <p className="text-gray-600">
                    1-3 business days within city limits
                  </p>
                </div>
                
                <div className="border-l-4 border-brand-purple pl-4 py-1">
                  <h3 className="font-medium">Suburban Delivery</h3>
                  <p className="text-gray-600">
                    3-5 business days for suburbs and surrounding areas
                  </p>
                </div>
                
                <div className="border-l-4 border-brand-purple pl-4 py-1">
                  <h3 className="font-medium">Priority Delivery</h3>
                  <p className="text-gray-600">
                    Next-day delivery within city limits (additional 10% fee applies)
                  </p>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">Delivery Process</h2>
              <ol className="list-decimal list-inside space-y-3 text-gray-700">
                <li>
                  <span className="font-medium">Order Confirmation:</span> You'll receive an order confirmation email with your order code.
                </li>
                <li>
                  <span className="font-medium">Processing:</span> Your order will be processed and prepared for shipping (typically 1 business day).
                </li>
                <li>
                  <span className="font-medium">Dispatch:</span> Once your order is dispatched, you'll receive an email with the estimated delivery date.
                </li>
                <li>
                  <span className="font-medium">Delivery:</span> Our delivery partner will contact you before arrival.
                </li>
                <li>
                  <span className="font-medium">Payment:</span> Pay for your order upon delivery with cash or card.
                </li>
              </ol>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">Tracking Your Order</h2>
              <p className="text-gray-700 mb-4">
                You can track your order at any time using the order code provided in your confirmation email.
                Visit our Track Order page and enter your name and order code to see the current status.
              </p>
              <Link to="/track-order">
                <Button className="bg-brand-purple hover:bg-brand-dark-purple">
                  Track Your Order
                </Button>
              </Link>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">Delivery Fees</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 border-b text-left">Area</th>
                      <th className="px-4 py-2 border-b text-left">Standard Delivery</th>
                      <th className="px-4 py-2 border-b text-left">Priority Delivery</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2 border-b">City Center</td>
                      <td className="px-4 py-2 border-b">Free</td>
                      <td className="px-4 py-2 border-b">+10% of order value</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border-b">Urban Areas</td>
                      <td className="px-4 py-2 border-b">Free</td>
                      <td className="px-4 py-2 border-b">+10% of order value</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border-b">Suburbs</td>
                      <td className="px-4 py-2 border-b">$5</td>
                      <td className="px-4 py-2 border-b">+10% of order value + $5</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            
            <section className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Need Help?</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about our delivery services, please don't hesitate to contact us.
              </p>
              <Link to="/contact">
                <Button className="bg-brand-purple hover:bg-brand-dark-purple">
                  Contact Customer Service
                </Button>
              </Link>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Delivery;
