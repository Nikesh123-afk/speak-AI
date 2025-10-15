/**
 * Authentication Context
 * Manages user authentication state across the app
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  plan: 'free' | 'standard' | 'premium';
  practiceCount: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('ielts_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error loading user:', error);
        localStorage.removeItem('ielts_user');
      }
    }
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('ielts_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('ielts_user');
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if user exists in localStorage (demo purposes)
    const usersData = localStorage.getItem('ielts_users');
    const users = usersData ? JSON.parse(usersData) : [];
    
    const existingUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (!existingUser) {
      throw new Error('Invalid email or password');
    }

    const userData: User = {
      id: existingUser.id,
      email: existingUser.email,
      name: existingUser.name,
      plan: existingUser.plan || 'free',
      practiceCount: existingUser.practiceCount || 0,
    };

    setUser(userData);
  };

  const signup = async (email: string, password: string, name: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if user already exists
    const usersData = localStorage.getItem('ielts_users');
    const users = usersData ? JSON.parse(usersData) : [];
    
    if (users.find((u: any) => u.email === email)) {
      throw new Error('User with this email already exists');
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email,
      password, // In production, this should be hashed on the backend
      name,
      plan: 'free' as const,
      practiceCount: 0,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem('ielts_users', JSON.stringify(users));

    const userData: User = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      plan: newUser.plan,
      practiceCount: newUser.practiceCount,
    };

    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ielts_user');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      
      // Update in users list
      const usersData = localStorage.getItem('ielts_users');
      const users = usersData ? JSON.parse(usersData) : [];
      const userIndex = users.findIndex((u: any) => u.id === user.id);
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...userData };
        localStorage.setItem('ielts_users', JSON.stringify(users));
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
