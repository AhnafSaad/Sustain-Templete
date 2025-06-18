import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Truck, Shield, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

const Checkout = () => {
  const { items, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to proceed with checkout.",
        variant: "destructive",
      });
      navigate('/login', { state: { from: '/checkout' } });
    } else {
      setFormData(prev => ({
        ...prev,
        email: user.email,
        firstName: user.name?.split(' ')[0] || '',
        lastName: user.name?.split(' ').slice(1).join(' ') || '',
      }));
    }
  }, [user, navigate]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to place an order.",
        variant: "destructive",
      });
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }

    setIsProcessing(true);

    const newOrder = {
      id: `SS-ORD-${Date.now()}`,
      userId: user.id,
      date: new Date().toISOString().split('T')[0],
      total: parseFloat((getCartTotal() * 1.08).toFixed(2)), // Assuming 8% tax
      status: 'Processing',
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        imagePlaceholder: item.imagePlaceholder || `Image of ${item.name}`
      })),
      shippingAddress: {
        name: `${formData.firstName} ${formData.lastName}`,
        address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`,
        country: formData.country,
        phone: formData.phone || '' 
      },
      billingAddress: { // Assuming same as shipping for simplicity
        name: `${formData.firstName} ${formData.lastName}`,
        address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`,
        country: formData.country,
      },
      paymentMethod: `Card ending in ${formData.cardNumber.slice(-4)}`,
      shippingMethod: 'Standard Eco-Shipping (3-5 days)',
      trackingNumber: null,
    };

    setTimeout(() => {
      const existingOrders = JSON.parse(localStorage.getItem('sustainSportsUserOrders') || '[]');
      existingOrders.push(newOrder);
      localStorage.setItem('sustainSportsUserOrders', JSON.stringify(existingOrders));
      
      clearCart();
      setIsProcessing(false);
      toast({
        title: "Order placed successfully! 🎉",
        description: "Thank you for your eco-friendly purchase! You'll receive a confirmation email shortly."
      });
      navigate('/my-orders');
    }, 2000);
  };

  if (!user && items.length > 0) {
     return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Add some eco-friendly products before checkout.</p>
          <Link to="/products">
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Shop Now
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4 mb-8"
        >
          <Link to="/cart">
            <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Cart
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <Card className="leaf-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <span>Contact Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    readOnly={!!user?.email} 
                    className={user?.email ? "bg-gray-100" : ""}
                  />
                </CardContent>
              </Card>

              <Card className="leaf-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Truck className="w-5 h-5 text-green-600" />
                    <span>Shipping Address</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <Input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                   <Input
                    type="text"
                    name="phone"
                    placeholder="Phone (Optional)"
                    value={formData.phone || ''}
                    onChange={handleInputChange}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      type="text"
                      name="zipCode"
                      placeholder="ZIP code"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="leaf-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="w-5 h-5 text-green-600" />
                    <span>Payment Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    type="text"
                    name="nameOnCard"
                    placeholder="Name on card"
                    value={formData.nameOnCard}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    type="text"
                    name="cardNumber"
                    placeholder="Card number (e.g., 1234 5678 9012 3456)"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required
                    pattern="\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}"
                    title="Enter a valid 16-digit card number"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      type="text"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      required
                      pattern="(0[1-9]|1[0-2])\/\d{2}"
                      title="Enter date in MM/YY format"
                    />
                    <Input
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      required
                      pattern="\d{3,4}"
                      title="Enter a 3 or 4 digit CVV"
                    />
                  </div>
                </CardContent>
              </Card>

              <Button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
                size="lg"
              >
                {isProcessing ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  `Place Order - ${(getCartTotal() * 1.08).toFixed(2)}`
                )}
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            <Card className="leaf-shadow">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 py-3 border-b border-gray-200 last:border-b-0">
                    <div className="w-16 h-16 rounded-lg bg-gray-200 overflow-hidden">
                      <img  
                        className="w-full h-full object-cover"
                        alt={item.name}
                       src="https://images.unsplash.com/photo-1581156404134-9bf1c6ab0b3d" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="leaf-shadow">
              <CardContent className="space-y-3 pt-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (8%):</span>
                  <span className="font-medium">${(getCartTotal() * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total:</span>
                    <span className="text-lg font-bold text-green-600">
                      ${(getCartTotal() * 1.08).toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="leaf-shadow">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-700">SSL encrypted checkout</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-700">30-day money-back guarantee</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Truck className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-700">Free shipping on all orders</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="leaf-shadow bg-green-50">
              <CardContent className="pt-6">
                <h4 className="font-semibold text-green-800 mb-3">🌱 Your Eco Impact</h4>
                <div className="space-y-2 text-sm text-green-700">
                  <p>• This order saves an estimated 2.5kg CO₂ emissions</p>
                  <p>• Supports sustainable manufacturing practices</p>
                  <p>• Contributes to ocean cleanup initiatives</p>
                  <p>• Plants 1 tree through our partnership program</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;