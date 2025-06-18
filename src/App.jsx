
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/contexts/CartContext';
import { AuthProvider } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

const Home = lazy(() => import('@/pages/Home'));
const Products = lazy(() => import('@/pages/Products'));
const ProductDetail = lazy(() => import('@/pages/ProductDetail'));
const Cart = lazy(() => import('@/pages/Cart'));
const Checkout = lazy(() => import('@/pages/Checkout'));
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const VerifyEmail = lazy(() => import('@/pages/VerifyEmail'));
const ForgotPassword = lazy(() => import('@/pages/ForgotPassword'));
const ResetPassword = lazy(() => import('@/pages/ResetPassword'));
const MyAccount = lazy(() => import('@/pages/MyAccount'));
const MyOrders = lazy(() => import('@/pages/MyOrders'));
const OrderDetail = lazy(() => import('@/pages/OrderDetail'));
const Contact = lazy(() => import('@/pages/Contact'));
const Sustainability = lazy(() => import('@/pages/Sustainability'));
const About = lazy(() => import('@/pages/About'));
const PrivacyPolicy = lazy(() => import('@/pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('@/pages/TermsOfService'));
const CookiePolicy = lazy(() => import('@/pages/CookiePolicy'));
const RecyclingPage = lazy(() => import('@/pages/DonationRecycling')); 

const ImpactReport = lazy(() => import('@/pages/sustainability/ImpactReport'));
const EcoFriendlyMaterials = lazy(() => import('@/pages/sustainability/EcoFriendlyMaterials'));
const CircularEconomySummary = lazy(() => import('@/pages/sustainability/CircularEconomy'));
const WaterConservation = lazy(() => import('@/pages/sustainability/WaterConservation'));

const HundredPercentEcoFriendly = lazy(() => import('@/pages/sustainability/HundredPercentEcoFriendly'));
const CircularEconomyDetail = lazy(() => import('@/pages/sustainability/CircularEconomyDetail'));
const PlanetPositive = lazy(() => import('@/pages/sustainability/PlanetPositive'));

const LoadingFallback = () => (
  <div className="flex justify-center items-center min-h-[calc(100vh-128px)]">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/verify-email" element={<VerifyEmail />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/my-account" element={<MyAccount />} />
                  <Route path="/my-orders" element={<MyOrders />} />
                  <Route path="/my-orders/:orderId" element={<OrderDetail />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/sustainability" element={<Sustainability />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms-of-service" element={<TermsOfService />} />
                  <Route path="/cookie-policy" element={<CookiePolicy />} />
                  <Route path="/recycling" element={<RecyclingPage />} />
                  
                  <Route path="/sustainability/impact-report" element={<ImpactReport />} />
                  <Route path="/sustainability/eco-friendly-materials" element={<EcoFriendlyMaterials />} />
                  <Route path="/sustainability/circular-economy-summary" element={<CircularEconomySummary />} /> 
                  <Route path="/sustainability/water-conservation" element={<WaterConservation />} />
                  
                  <Route path="/sustainability/100-eco-friendly" element={<HundredPercentEcoFriendly />} />
                  <Route path="/sustainability/circular-economy" element={<CircularEconomyDetail />} />
                  <Route path="/sustainability/planet-positive" element={<PlanetPositive />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
            <Toaster />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;