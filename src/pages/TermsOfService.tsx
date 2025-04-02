
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
          <p className="text-gray-600 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>
          
          <div className="prose max-w-none">
            <p className="font-medium">
              Please read these Terms of Service carefully before using the Style Street website.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing or using our website, you agree to be bound by these Terms of Service and our Privacy Policy. 
              If you do not agree to these Terms, you may not access or use our website.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">2. Changes to Terms</h2>
            <p>
              We may update these Terms from time to time. If we make material changes, we will notify you by posting a 
              notice on our website or by sending you an email. Your continued use of our website after such notice 
              constitutes your acceptance of the new Terms.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">3. Creating an Account</h2>
            <p>
              When you place an order with us, we collect your name and contact information to facilitate the order process.
              You are responsible for providing accurate information and maintaining the confidentiality of your information.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">4. Products and Ordering</h2>
            <p>
              We strive to display our products and their colors as accurately as possible. However, we cannot guarantee 
              that your device's display accurately reflects the actual colors of the products.
            </p>
            <p>
              By placing an order, you are making an offer to purchase the products. We reserve the right to refuse or 
              cancel any order for any reason, including but not limited to product availability, errors in product or 
              pricing information, or identification of fraudulent activity.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">5. Prices and Payment</h2>
            <p>
              All prices are shown in USD and do not include delivery fees where applicable. We reserve the right to change 
              prices at any time without notice.
            </p>
            <p>
              We offer pay-on-delivery services. Payment is collected at the time of delivery, and we accept cash and card payments.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">6. Delivery</h2>
            <p>
              Delivery times are estimates and are not guaranteed. We are not responsible for delays due to unforeseen 
              circumstances or factors outside our control.
            </p>
            <p>
              You are responsible for providing accurate delivery information. If a delivery fails due to incorrect 
              information or your unavailability, additional delivery fees may apply.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">7. Returns and Exchanges</h2>
            <p>
              Please refer to our <Link to="/returns" className="text-brand-purple hover:underline">Returns & Exchanges Policy</Link> for 
              information on how to return or exchange products.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">8. Intellectual Property</h2>
            <p>
              All content on our website, including text, graphics, logos, images, and software, is the property of 
              Style Street and is protected by copyright and other intellectual property laws.
            </p>
            <p>
              You may not reproduce, distribute, modify, or create derivative works from any content without our express 
              written permission.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">9. User Content</h2>
            <p>
              If you submit content to our website (such as product reviews), you grant us a non-exclusive, worldwide, 
              royalty-free license to use, reproduce, modify, publish, and display such content.
            </p>
            <p>
              You are solely responsible for any content you submit, and it must not be illegal, misleading, or infringe 
              on the rights of others.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">10. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Style Street shall not be liable for any indirect, incidental, 
              special, consequential, or punitive damages arising out of or related to your use of our website or any 
              products purchased through our website.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">11. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless Style Street and its officers, directors, employees, and agents 
              from any claims, damages, losses, liabilities, and expenses (including legal fees) arising out of or related 
              to your use of our website or any violation of these Terms.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">12. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the State of [Your State], 
              without regard to its conflict of law provisions.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">13. Dispute Resolution</h2>
            <p>
              Any dispute arising out of or relating to these Terms shall be resolved through binding arbitration in 
              accordance with the rules of the American Arbitration Association.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">14. Severability</h2>
            <p>
              If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will 
              remain in full force and effect.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">15. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <address className="not-italic mb-4">
              <p>Style Street</p>
              <p>123 Fashion Street</p>
              <p>Style City, SC 12345</p>
              <p>Email: legal@stylestreet.com</p>
              <p>Phone: +1 (123) 456-7890</p>
            </address>
            
            <div className="mt-8 border-t pt-6">
              <p>
                For more information, please see our <Link to="/privacy-policy" className="text-brand-purple hover:underline">Privacy Policy</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsOfService;
