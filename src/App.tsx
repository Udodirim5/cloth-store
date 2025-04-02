
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmation from "./pages/OrderConfirmation";
import TrackOrder from "./pages/TrackOrder";
import MyOrders from "./pages/MyOrders";
import OrderDetails from "./pages/OrderDetails";
import SearchPage from "./pages/SearchPage";
import NotFound from "./pages/NotFound";
import { UserProvider } from "./contexts/UserContext";
import { CartProvider } from "./contexts/CartContext";
import { OrderProvider } from "./contexts/OrderContext";
import { ProductProvider } from "./contexts/ProductContext";
import NewArrivals from "./pages/NewArrivals";
import ContactUs from "./pages/ContactUs";
import Returns from "./pages/Returns";
import Delivery from "./pages/Delivery";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Products from "./pages/Products";
import ScrollToTop from "./hooks/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <UserProvider>
        <ProductProvider>
          <CartProvider>
            <OrderProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
              <ScrollToTop /> 
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/category/:category" element={<CategoryPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
                  <Route path="/track-order" element={<TrackOrder />} />
                  <Route path="/my-orders" element={<MyOrders />} />
                  <Route path="/order-details/:orderId" element={<OrderDetails />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/new-arrivals" element={<NewArrivals />} />
                  <Route path="/contact" element={<ContactUs />} />
                  <Route path="/returns" element={<Returns />} />
                  <Route path="/delivery" element={<Delivery />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms-of-service" element={<TermsOfService />} />
                  <Route path="/admin" element={<AdminLogin />} />
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </OrderProvider>
          </CartProvider>
        </ProductProvider>
      </UserProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
