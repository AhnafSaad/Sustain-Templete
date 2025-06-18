import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { KeyRound, Eye, EyeOff, Leaf, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tokenValid, setTokenValid] = useState(false); // Simulate token validation
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    // Simulate token validation. In a real app, you'd verify this token against a backend.
    if (token && token === "somefaketoken") { // For demonstration
        setTokenValid(true);
         toast({
            title: "Token Validated",
            description: "Please enter your new password.",
        });
    } else if (token) {
        setTokenValid(false);
        toast({
            title: "Invalid or Expired Token",
            description: "This password reset link is invalid or has expired. Please request a new one.",
            variant: "destructive",
        });
        navigate('/forgot-password');
    } else {
        // If no token, perhaps redirect or show minimal UI
        // For now, assume direct navigation means a problem
        setTokenValid(false);
        toast({
            title: "Missing Token",
            description: "Password reset token is missing. Please use the link from your email.",
            variant: "destructive",
        });
        navigate('/forgot-password');
    }
  }, [searchParams, toast, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tokenValid) {
        toast({
            title: "Token Error",
            description: "Cannot reset password due to an invalid or missing token.",
            variant: "destructive",
        });
        return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Passwords Don't Match",
        description: "Please ensure both password fields match.",
        variant: "destructive",
      });
      return;
    }
    if (password.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Your new password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate password update
    // In a real app, this would be an API call with the token and new password.
    // Since we are using localStorage, and don't have the user's email easily from a fake token,
    // we can't directly update their password in the users list.
    // We will just simulate success.
    setTimeout(() => {
      toast({
        title: "Password Reset Successfully! 🎉",
        description: "Your password has been updated. Please log in with your new password.",
      });
      setIsLoading(false);
      navigate('/login');
    }, 1500);
  };
  
  if (!tokenValid && searchParams.get('token')) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 py-16 flex flex-col items-center justify-center">
        <Leaf className="w-16 h-16 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Invalid Reset Link</h1>
        <p className="text-gray-600 mb-6 text-center max-w-md">
          The password reset link you used is invalid or has expired. This might happen if the link has already been used or is too old.
        </p>
        <Link to="/forgot-password">
          <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
            Request a New Reset Link
          </Button>
        </Link>
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
              <KeyRound className="w-8 h-8 text-white" />
            </motion.div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-900">Set New Password</h1>
              <p className="text-gray-600">Create a strong and memorable new password.</p>
            </div>
          </div>

          {tokenValid ? (
            <Card className="leaf-shadow">
              <CardHeader>
                <CardTitle className="text-center text-xl">Enter Your New Password</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-1">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      New Password
                    </label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter new password"
                        required
                        className="w-full pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                        required
                        className="w-full pr-10"
                      />
                       <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
                    size="lg"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Resetting...</span>
                      </div>
                    ) : (
                      'Reset Password'
                    )}
                  </Button>
                </form>
                <div className="mt-6 text-center">
                    <Link to="/login" className="text-sm text-green-600 hover:text-green-500 font-medium flex items-center justify-center">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back to Sign In
                    </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
             <Card className="leaf-shadow">
                <CardContent className="py-10 text-center">
                    <p className="text-gray-700 mb-4">
                        The password reset link seems to be invalid or missing.
                    </p>
                    <Link to="/forgot-password">
                        <Button variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
                            Request a New Link
                        </Button>
                    </Link>
                </CardContent>
             </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ResetPassword;