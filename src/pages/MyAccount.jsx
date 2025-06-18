import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, ShoppingBag, Edit3, Shield, LogOut, ArrowLeft, Leaf, KeyRound, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const MyAccount = () => {
  const { user, logout, updateUserProfile, changePassword: authChangePassword } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  
  const [editName, setEditName] = useState(user?.name || '');
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] p-4 text-center">
        <Leaf className="w-16 h-16 text-green-500 mb-4 animate-bounce" />
        <h1 className="text-2xl font-semibold mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-4">Please log in to view your account details.</p>
        <Button onClick={() => navigate('/login')}>Go to Login</Button>
      </div>
    );
  }

  const handleEditProfile = async (e) => {
    e.preventDefault();
    if (!editName.trim()) {
      toast({ title: "Validation Error", description: "Name cannot be empty.", variant: "destructive" });
      return;
    }
    try {
      await updateUserProfile(user.id, editName);
      toast({ title: "Profile Updated", description: "Your name has been successfully updated." });
      setEditProfileOpen(false);
    } catch (error) {
      toast({ title: "Update Failed", description: error.message, variant: "destructive" });
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      toast({ title: "Validation Error", description: "All password fields are required.", variant: "destructive" });
      return;
    }
    if (newPassword !== confirmNewPassword) {
      toast({ title: "Validation Error", description: "New passwords do not match.", variant: "destructive" });
      return;
    }
    if (newPassword.length < 6) {
      toast({ title: "Validation Error", description: "New password must be at least 6 characters long.", variant: "destructive" });
      return;
    }

    try {
      await authChangePassword(user.id, currentPassword, newPassword);
      toast({ title: "Password Changed", description: "Your password has been successfully updated." });
      setChangePasswordOpen(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (error) {
      toast({ title: "Change Password Failed", description: error.message, variant: "destructive" });
    }
  };
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully!",
      description: "See you next time! 🌱"
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link to="/">
            <Button variant="outline" className="text-green-700 border-green-700 hover:bg-green-100">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="leaf-shadow overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 p-6">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 rounded-full bg-white/30 flex items-center justify-center border-2 border-white">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div>
                  <CardTitle className="text-3xl font-bold text-white">My Account</CardTitle>
                  <CardDescription className="text-green-100 text-lg">Welcome back, {user.name}!</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoCard title="Name" value={user.name} />
                <InfoCard title="Email" value={user.email} />
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Account Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <AccountActionItem icon={ShoppingBag} label="My Orders" to="/my-orders" />
                  
                  <Dialog open={editProfileOpen} onOpenChange={setEditProfileOpen}>
                    <DialogTrigger asChild>
                      <AccountActionItem icon={Edit3} label="Edit Profile" onClick={() => { setEditName(user.name); setEditProfileOpen(true); }} />
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle className="flex items-center"><Edit3 className="mr-2 h-5 w-5 text-green-600" />Edit Profile</DialogTitle>
                        <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleEditProfile}>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Name</Label>
                            <Input id="name" value={editName} onChange={(e) => setEditName(e.target.value)} className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">Email</Label>
                            <Input id="email" value={user.email} readOnly disabled className="col-span-3 bg-gray-100" />
                          </div>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
                          <Button type="submit" className="bg-green-600 hover:bg-green-700"><Save className="mr-2 h-4 w-4"/>Save changes</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={changePasswordOpen} onOpenChange={setChangePasswordOpen}>
                    <DialogTrigger asChild>
                       <AccountActionItem icon={Shield} label="Change Password" onClick={() => setChangePasswordOpen(true)} />
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle className="flex items-center"><KeyRound className="mr-2 h-5 w-5 text-green-600" />Change Password</DialogTitle>
                        <DialogDescription>Enter your current and new password. Click save when you're done.</DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleChangePassword}>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="currentPassword" className="text-right whitespace-nowrap">Current Password</Label>
                            <Input id="currentPassword" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="newPassword" className="text-right whitespace-nowrap">New Password</Label>
                            <Input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="confirmNewPassword" className="text-right whitespace-nowrap">Confirm New</Label>
                            <Input id="confirmNewPassword" type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} className="col-span-3" />
                          </div>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild><Button type="button" variant="outline" onClick={() => {setCurrentPassword(''); setNewPassword(''); setConfirmNewPassword('');}}>Cancel</Button></DialogClose>
                          <Button type="submit" className="bg-green-600 hover:bg-green-700"><Save className="mr-2 h-4 w-4"/>Save Password</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>

                  <AccountActionItem icon={LogOut} label="Logout" onClick={handleLogout} isButton={true} />
                </div>
              </div>

              <div className="mt-8 p-4 bg-green-100/50 border border-green-200 rounded-lg">
                <h4 className="text-lg font-semibold text-green-700 mb-2">Sustainability Contributor</h4>
                <p className="text-green-600 text-sm">
                  Thank you for choosing Sustain Sports! Every purchase helps us invest in eco-friendly practices and support our planet.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

const InfoCard = ({ title, value }) => (
  <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
    <p className="text-sm font-medium text-gray-500">{title}</p>
    <p className="text-lg font-semibold text-gray-800">{value}</p>
  </div>
);

const AccountActionItem = ({ icon: Icon, label, to, onClick, isButton = false, ...props }) => {
  const commonClasses = "flex items-center space-x-3 p-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 w-full text-left";
  
  if (isButton) {
    return (
      <motion.button
        whileHover={{ backgroundColor: "#dc2626", color: "#ffffff" }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={`${commonClasses} bg-red-50 hover:bg-red-600 text-red-700 hover:text-white border border-red-200 shadow-sm`}
        {...props}
      >
        <Icon className="w-6 h-6" />
        <span className="text-md font-medium">{label}</span>
      </motion.button>
    );
  }
  
  const content = (
    <>
      <Icon className="w-6 h-6" />
      <span className="text-md font-medium">{label}</span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={`${commonClasses} bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 shadow-sm`} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={`${commonClasses} bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 shadow-sm`} {...props}>
      {content}
    </button>
  );
};

export default MyAccount;