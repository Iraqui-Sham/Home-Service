import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface AuthUser {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  joinedDate: string;
  avatar: string | null;
  totalBookings: number;
  completedBookings: number;
  upcomingBookings: number;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoggedIn: boolean;
  login: (email: string, name?: string) => void;
  logout: () => void;
  updateUser: (data: Partial<AuthUser>) => void;
}

const MOCK_USER: AuthUser = {
  name: 'Rahul Sharma',
  email: 'rahul.sharma@example.com',
  phone: '+91 98765 43210',
  address: '42, 3rd Cross, Koramangala, Bengaluru – 560 034',
  city: 'Bengaluru',
  joinedDate: 'January 2024',
  avatar: null,
  totalBookings: 5,
  completedBookings: 2,
  upcomingBookings: 2,
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  updateUser: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const stored = localStorage.getItem('hs_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem('hs_user', JSON.stringify(user));
    else localStorage.removeItem('hs_user');
  }, [user]);

  const login = (email: string, name?: string) => {
    setUser({ ...MOCK_USER, email, name: name ?? MOCK_USER.name });
  };

  const logout = () => setUser(null);

  const updateUser = (data: Partial<AuthUser>) => {
    setUser((prev) => prev ? { ...prev, ...data } : prev);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
