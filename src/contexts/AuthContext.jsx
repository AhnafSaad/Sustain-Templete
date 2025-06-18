import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('sustainSportsUser');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        const users = JSON.parse(localStorage.getItem('sustainSportsRegisteredUsers') || '[]');
        const registeredUser = users.find(u => u.id === parsedUser.id);
        if (registeredUser) {
          setUser({ ...parsedUser, isVerified: registeredUser.isVerified, name: registeredUser.name });
        } else {
          setUser(parsedUser); 
        }
      } catch (error) {
        localStorage.removeItem('sustainSportsUser');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    if (email === 'demo@sustainsports.com' && password === 'demo123') {
      const mockUser = {
        id: 'demo-user',
        name: 'Demo User',
        email: email,
        isAdmin: false,
        isVerified: true 
      };
      setUser(mockUser);
      localStorage.setItem('sustainSportsUser', JSON.stringify(mockUser));
      return mockUser;
    }
    
    if (email === 'admin@sustainsports.com' && password === 'admin123') {
      const mockUser = {
        id: 'admin-user',
        name: 'Admin User',
        email: email,
        isAdmin: true,
        isVerified: true
      };
      setUser(mockUser);
      localStorage.setItem('sustainSportsUser', JSON.stringify(mockUser));
      return mockUser;
    }

    const users = JSON.parse(localStorage.getItem('sustainSportsRegisteredUsers') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password); 

    if (foundUser) {
      if (!foundUser.isVerified) {
        toast({
          title: "Email Not Verified",
          description: "Please verify your email address before logging in. Check your inbox for the verification link.",
          variant: "destructive",
        });
        throw new Error('Email not verified');
      }
      setUser(foundUser);
      localStorage.setItem('sustainSportsUser', JSON.stringify(foundUser));
      return foundUser;
    }
    
    throw new Error('Invalid credentials');
  };

  const register = async (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('sustainSportsRegisteredUsers') || '[]');
    const existingUser = users.find(u => u.email === email);

    if (existingUser) {
      toast({
        title: "Registration Failed",
        description: "This email is already registered.",
        variant: "destructive",
      });
      throw new Error('User already exists');
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name: name,
      email: email,
      password: password, 
      isAdmin: false,
      isVerified: false 
    };
    
    users.push(newUser);
    localStorage.setItem('sustainSportsRegisteredUsers', JSON.stringify(users));
    return newUser;
  };

  const verifyUserEmail = async (userId) => {
    const users = JSON.parse(localStorage.getItem('sustainSportsRegisteredUsers') || '[]');
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex !== -1) {
      users[userIndex].isVerified = true;
      localStorage.setItem('sustainSportsRegisteredUsers', JSON.stringify(users));
      
      if (user && user.id === userId) {
        setUser(prevUser => ({ ...prevUser, isVerified: true }));
      }
      return users[userIndex];
    }
    throw new Error('User not found for verification');
  };

  const updateUserProfile = async (userId, newName) => {
    let users = JSON.parse(localStorage.getItem('sustainSportsRegisteredUsers') || '[]');
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex !== -1) {
      users[userIndex].name = newName;
      localStorage.setItem('sustainSportsRegisteredUsers', JSON.stringify(users));
      
      if (user && user.id === userId) {
        const updatedUser = { ...user, name: newName };
        setUser(updatedUser);
        localStorage.setItem('sustainSportsUser', JSON.stringify(updatedUser));
      }
      return users[userIndex];
    }
    throw new Error('User not found for profile update.');
  };

  const changePassword = async (userId, currentPassword, newPassword) => {
    let users = JSON.parse(localStorage.getItem('sustainSportsRegisteredUsers') || '[]');
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
      throw new Error('User not found.');
    }

    if (users[userIndex].password !== currentPassword) {
      throw new Error('Incorrect current password.');
    }

    users[userIndex].password = newPassword;
    localStorage.setItem('sustainSportsRegisteredUsers', JSON.stringify(users));

    if (user && user.id === userId) {
      const updatedUser = { ...user, password: newPassword }; 
      setUser(updatedUser);
      localStorage.setItem('sustainSportsUser', JSON.stringify(updatedUser));
    }
    return users[userIndex];
  };


  const logout = () => {
    setUser(null);
    localStorage.removeItem('sustainSportsUser');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      loading,
      verifyUserEmail,
      updateUserProfile,
      changePassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};