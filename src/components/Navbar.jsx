import React, { useState, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, User, Menu, X, Leaf, Search, Zap, ChevronDown, Recycle, LogOut, Package, UserCircle, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { categories } from '@/data/products';

const Navbar = memo(() => {
  const [searchTerm, setSearchTerm] = useState('');
  const { getCartItemsCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully!",
      description: "See you next time! 🌱"
    });
    navigate('/');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
      const sheetCloseButton = document.querySelector('.sheet-close-button-selector');
      if (sheetCloseButton) sheetCloseButton.click();
    } else {
       toast({
        variant: "destructive",
        title: "Empty Search",
        description: "Please enter a term to search for."
      });
    }
  };

  const DesktopNavLink = ({ to, children, icon: Icon }) => (
    <Link
      to={to}
      className="flex items-center text-gray-700 hover:text-green-600 transition-colors px-3 py-2 rounded-md text-sm font-medium"
    >
      {Icon && <Icon className="w-4 h-4 mr-1 text-green-500" />}
      {children}
    </Link>
  );
  
  const MobileNavLink = ({ to, children, icon: Icon, onClick }) => (
    <SheetClose asChild>
      <Link
        to={to}
        onClick={onClick}
        className="flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors text-md font-medium"
      >
        {Icon && <Icon className="w-5 h-5 text-green-500" />}
        <span>{children}</span>
      </Link>
    </SheetClose>
  );

  const UserActionsDropdown = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <UserCircle className="w-7 h-7 text-gray-700 hover:text-green-600" />
          <span className="sr-only">User Menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {user ? (
          <>
            <DropdownMenuItem className="flex flex-col items-start p-3">
              <span className="font-semibold">{user.name}</span>
              <span className="text-xs text-gray-500">{user.email}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/my-account" className="flex items-center w-full">
                <Settings className="w-4 h-4 mr-2" /> My Account
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/my-orders" className="flex items-center w-full">
                <Package className="w-4 h-4 mr-2" /> My Orders
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:bg-red-50 focus:text-red-700 cursor-pointer">
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem asChild>
            <Link to="/login" className="flex items-center w-full">
              <User className="w-4 h-4 mr-2" /> Login / Register
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
  
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-green-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center"
            >
              <Leaf className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Sustain Sports
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2 flex-grow justify-center">
            <DesktopNavLink to="/">Home</DesktopNavLink>
            <DesktopNavLink to="/products">Products</DesktopNavLink>
            <DesktopNavLink to="/sustainability" icon={Zap}>Sustainability</DesktopNavLink>
            <DesktopNavLink to="/recycling" icon={Recycle}>Recycling</DesktopNavLink>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center text-gray-700 hover:text-green-600 transition-colors px-3 py-2 rounded-md text-sm font-medium">
                  Categories <ChevronDown className="w-4 h-4 ml-1" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link to="/products">All Categories</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {categories.map(category => (
                  <DropdownMenuItem key={category.id} asChild>
                    <Link to={`/products?category=${category.id}`}>{category.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Desktop Search, Cart, User Actions */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-3 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-32 lg:w-40 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search products"
              />
            </form>
            <Link to="/cart" className="relative" aria-label={`View Cart, ${getCartItemsCount()} items`}>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="p-2 text-gray-700 hover:text-green-600 transition-colors">
                <ShoppingCart className="w-6 h-6" />
                {getCartItemsCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getCartItemsCount()}
                  </span>
                )}
              </motion.div>
            </Link>
            <UserActionsDropdown />
          </div>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden flex items-center">
            <Link to="/cart" className="relative mr-2" aria-label={`View Cart, ${getCartItemsCount()} items`}>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="p-2 text-gray-700 hover:text-green-600 transition-colors">
                    <ShoppingCart className="w-6 h-6" />
                    {getCartItemsCount() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {getCartItemsCount()}
                    </span>
                    )}
                </motion.div>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="p-2 text-gray-700 hover:text-green-600">
                  <Menu className="w-6 h-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px] flex flex-col p-0">
                <SheetHeader className="p-4 border-b border-green-100">
                  <SheetTitle className="text-lg font-semibold text-green-700">Menu</SheetTitle>
                  <SheetClose className="sheet-close-button-selector absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </SheetClose>
                </SheetHeader>
                <div className="flex-grow overflow-y-auto p-4 space-y-2">
                  <form onSubmit={handleSearchSubmit} className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Search eco products..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      aria-label="Search products mobile"
                    />
                  </form>
                  <MobileNavLink to="/">Home</MobileNavLink>
                  <MobileNavLink to="/products">Products</MobileNavLink>
                  <MobileNavLink to="/sustainability" icon={Zap}>Sustainability</MobileNavLink>
                  <MobileNavLink to="/recycling" icon={Recycle}>Recycling</MobileNavLink>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center justify-between w-full px-3 py-3 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors text-left text-md font-medium">
                        <span className="flex items-center">Categories</span>
                        <ChevronDown className="w-4 h-4 ml-1" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[calc(100%-2rem)] ml-4">
                      <DropdownMenuItem asChild><SheetClose asChild><Link to="/products" className="block px-3 py-2">All Categories</Link></SheetClose></DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {categories.map(category => (
                        <DropdownMenuItem key={category.id} asChild><SheetClose asChild><Link to={`/products?category=${category.id}`} className="block px-3 py-2">{category.name}</Link></SheetClose></DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="p-4 border-t border-green-100">
                  {user ? (
                    <div className="space-y-3">
                        <div className="flex items-center space-x-2 px-3 py-2">
                            <UserCircle className="w-8 h-8 text-green-600" />
                            <div>
                                <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                                <p className="text-xs text-gray-500">{user.email}</p>
                            </div>
                        </div>
                        <MobileNavLink to="/my-account" icon={Settings}>My Account</MobileNavLink>
                        <MobileNavLink to="/my-orders" icon={Package}>My Orders</MobileNavLink>
                        <SheetClose asChild>
                            <Button variant="ghost" onClick={handleLogout} className="w-full justify-start px-3 py-3 text-red-600 hover:bg-red-50 hover:text-red-700 text-md font-medium">
                                <LogOut className="w-5 h-5 mr-3 text-red-500" />
                                Logout
                            </Button>
                        </SheetClose>
                    </div>
                  ) : (
                    <MobileNavLink to="/login" icon={User}>Login / Register</MobileNavLink>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
});

Navbar.displayName = 'Navbar';
export default Navbar;