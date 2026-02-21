import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('hotel_user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (email && password) {
      const userData = {
        id: Date.now(),
        email,
        name: email.split('@')[0],
        loyaltyPoints: Math.floor(Math.random() * 5000),
        tier: 'bronze'
      };
      setUser(userData);
      localStorage.setItem('hotel_user', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const register = async (name, email, password) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const userData = {
      id: Date.now(),
      email,
      name,
      loyaltyPoints: 500,
      tier: 'bronze'
    };
    setUser(userData);
    localStorage.setItem('hotel_user', JSON.stringify(userData));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hotel_user');
  };

  const updateProfile = (updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem('hotel_user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export default AuthContext;
