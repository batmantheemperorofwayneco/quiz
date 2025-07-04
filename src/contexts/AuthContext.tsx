import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  userType: 'teacher' | 'student' | null;
  login: (email: string, password: string, type: 'teacher' | 'student') => Promise<boolean>;
  register: (userData: any, type: 'teacher' | 'student') => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<'teacher' | 'student' | null>(null);

  useEffect(() => {
    // Check for stored auth data
    const storedUser = localStorage.getItem('user');
    const storedUserType = localStorage.getItem('userType');
    
    if (storedUser && storedUserType) {
      setUser(JSON.parse(storedUser));
      setUserType(storedUserType as 'teacher' | 'student');
    }
  }, []);

  const login = async (email: string, password: string, type: 'teacher' | 'student'): Promise<boolean> => {
    // Mock authentication - in real app, this would call an API
    const mockUser = {
      id: '1',
      name: type === 'teacher' ? 'Ms. Sarah Johnson' : 'Alex Johnson',
      email: email,
      avatar: ''
    };

    setUser(mockUser);
    setUserType(type);
    
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('userType', type);
    
    return true;
  };

  const register = async (userData: any, type: 'teacher' | 'student'): Promise<boolean> => {
    // Mock registration - in real app, this would call an API
    const newUser = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      avatar: ''
    };

    setUser(newUser);
    setUserType(type);
    
    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('userType', type);
    
    return true;
  };

  const logout = () => {
    setUser(null);
    setUserType(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
  };

  return (
    <AuthContext.Provider value={{ user, userType, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};