import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MailCheck, Send, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const { verifyUserEmail, user } = useAuth(); 
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const userEmail = searchParams.get('email');
    if (userEmail) {
      setEmail(userEmail);
    } else if (user && user.email) {
      setEmail(user.email);
    } else {
      toast({
        title: "Missing Information",
        description: "User email not found. Please try registering again.",
        variant: "destructive"
      });
      navigate('/register');
    }
  }, [searchParams, user, navigate, toast]);

  const handleResendVerification = () => {
    setIsLoading(true);
    setTimeout(() => {
      toast({
        title: "Verification Email Resent",
        description: `A new verification link has been sent to ${email}. Please check your inbox (and spam folder).`,
      });
      setIsLoading(false);
    }, 1000);
  };

  const handleProceedToLogin = async () => {
    setIsLoading(true);
    // Simulate verification - in a real app, this would happen after clicking a link
    // For now, we assume if they click this, they "verified"
    try {
      // Find user by email to get their ID for verification
      const users = JSON.parse(localStorage.getItem('sustainSportsRegisteredUsers') || '[]');
      const registeredUser = users.find(u => u.email === email);

      if (registeredUser) {
        await verifyUserEmail(registeredUser.id); 
        toast({
          title: "Email Verified! 🎉",
          description: "Your email has been successfully verified. You can now log in.",
        });
        navigate('/login');
      } else {
         toast({
          title: "Verification Failed",
          description: "Could not find user to verify. Please try registering again.",
          variant: "destructive"
        });
        navigate('/register');
      }
    } catch (error) {
      toast({
        title: "Verification Error",
        description: error.message || "An unexpected error occurred during verification.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!email) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-16">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="text-center space-y-4">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center"
            >
              <Leaf className="w-8 h-8 text-white" />
            </motion.div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-900">Verify Your Email</h1>
              <p className="text-gray-600">Almost there! We need to confirm your email address.</p>
            </div>
          </div>

          <Card className="leaf-shadow">
            <CardHeader>
              <CardTitle className="text-center text-xl flex items-center justify-center">
                <MailCheck className="w-6 h-6 mr-2 text-green-600" />
                Check Your Inbox
              </CardTitle>
              <CardDescription className="text-center">
                We've sent a verification link to <strong className="text-green-700">{email}</strong>. Please click the link in that email to complete your registration.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-sm text-gray-500 text-center">
                If you don't see the email, please check your spam or junk folder.
              </p>
              
              <Button
                onClick={handleProceedToLogin}
                disabled={isLoading}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
                size="lg"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Verifying...</span>
                  </div>
                ) : (
                  "I've Clicked the Link / Proceed to Login"
                )}
              </Button>

              <div className="text-center">
                <Button
                  variant="link"
                  onClick={handleResendVerification}
                  disabled={isLoading}
                  className="text-green-600 hover:text-green-500 font-medium"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Didn't receive the email? Resend
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="text-center text-sm text-gray-500">
            <p>Having trouble? Contact <a href="/contact" className="text-green-600 hover:underline">customer support</a>.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VerifyEmail;