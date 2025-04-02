
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>
          
          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Introduction</h2>
            <p>
              At Style Street, we respect your privacy and are committed to protecting your personal data. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website
              or make a purchase from our store.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">2. Information We Collect</h2>
            <p>We collect information that you provide directly to us, including:</p>
            <ul className="list-disc list-inside mb-4 pl-4">
              <li>Personal information (name, email address, phone number, delivery address)</li>
              <li>Order information (products purchased, order value, delivery instructions)</li>
              <li>Communications you send to us (customer service inquiries, product reviews)</li>
            </ul>
            <p>
              We also automatically collect certain information when you visit our website, including:
            </p>
            <ul className="list-disc list-inside mb-4 pl-4">
              <li>Device information (IP address, browser type, device type)</li>
              <li>Usage data (pages visited, time spent on pages, links clicked)</li>
              <li>Location data (based on your IP address)</li>
              <li>Cookies and similar technologies</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">3. How We Use Your Information</h2>
            <p>We use your information for various purposes, including to:</p>
            <ul className="list-disc list-inside mb-4 pl-4">
              <li>Process and fulfill your orders</li>
              <li>Create and manage your account</li>
              <li>Communicate with you about your orders and provide customer support</li>
              <li>Improve our website, products, and services</li>
              <li>Send you marketing communications (if you've opted in)</li>
              <li>Detect and prevent fraud</li>
              <li>Comply with legal obligations</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">4. Sharing Your Information</h2>
            <p>
              We may share your information with third parties in certain circumstances:
            </p>
            <ul className="list-disc list-inside mb-4 pl-4">
              <li>With service providers who help us operate our business</li>
              <li>With delivery partners to fulfill your orders</li>
              <li>When required by law or to protect our rights</li>
              <li>In connection with a business transfer or acquisition</li>
            </ul>
            <p>
              We do not sell your personal information to third parties.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">5. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information. 
              However, please note that no method of transmission over the internet or electronic storage is 100% secure.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">6. Your Privacy Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, such as:
            </p>
            <ul className="list-disc list-inside mb-4 pl-4">
              <li>The right to access your personal information</li>
              <li>The right to correct inaccurate information</li>
              <li>The right to delete your personal information</li>
              <li>The right to object to processing of your personal information</li>
              <li>The right to withdraw consent</li>
            </ul>
            <p>
              To exercise these rights, please contact us using the information provided in the "Contact Us" section.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">7. Cookies</h2>
            <p>
              We use cookies and similar technologies to enhance your browsing experience, analyze website traffic, 
              and personalize content. You can manage your cookie preferences through your browser settings.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">8. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or for legal reasons. 
              The updated version will be indicated by a revised "Last Updated" date at the top of this Privacy Policy.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">9. Contact Us</h2>
            <p>
              If you have any questions or concerns about our Privacy Policy, please contact us at:
            </p>
            <address className="not-italic mb-4">
              <p>Style Street</p>
              <p>123 Fashion Street</p>
              <p>Style City, SC 12345</p>
              <p>Email: privacy@stylestreet.com</p>
              <p>Phone: +1 (123) 456-7890</p>
            </address>
            
            <p className="mt-8">
              By using our website, you consent to this Privacy Policy.
            </p>
            
            <div className="mt-8 border-t pt-6">
              <p>
                For more information, please see our <Link to="/terms-of-service" className="text-brand-purple hover:underline">Terms of Service</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
