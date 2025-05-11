import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { findUser } from '../data/users';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('busAppUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('busAppUser');
      }
    }
  }, []);
  
  const login = (username: string, password: string): boolean => {
    const foundUser = findUser(username, password);
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('busAppUser', JSON.stringify(foundUser));
      return true;
    }
    
    return false;
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('busAppUser');
  };
  
  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};