import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AuthUser } from '../types';

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  signup: (data: { name: string; email: string; phone: string; password: string }) => Promise<{ message: string }>;
  verifyOtp: (email: string, otp: string) => Promise<AuthUser>;
  resendOtp: (email: string) => Promise<{ message: string }>;
  login: (email: string, password: string) => Promise<AuthUser>;
  logout: () => Promise<void>;
  refreshMe: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

async function apiFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`/api${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || data.error || 'Something went wrong. Please try again.');
  }
  return data;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshMe = useCallback(async () => {
    try {
      const data = await apiFetch('/auth/me');
      setUser(data.user || null);
    } catch {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await refreshMe();
      setLoading(false);
    })();
  }, [refreshMe]);

  const signup: AuthContextValue['signup'] = async (data) => {
    return apiFetch('/auth/signup', { method: 'POST', body: JSON.stringify(data) });
  };

  const verifyOtp: AuthContextValue['verifyOtp'] = async (email, otp) => {
    const data = await apiFetch('/auth/verify-otp', { method: 'POST', body: JSON.stringify({ email, otp }) });
    setUser(data.user);
    return data.user;
  };

  const resendOtp: AuthContextValue['resendOtp'] = async (email) => {
    return apiFetch('/auth/resend-otp', { method: 'POST', body: JSON.stringify({ email }) });
  };

  const login: AuthContextValue['login'] = async (email, password) => {
    const data = await apiFetch('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
    setUser(data.user);
    return data.user;
  };

  const logout = async () => {
    try {
      await apiFetch('/auth/logout', { method: 'POST' });
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, verifyOtp, resendOtp, login, logout, refreshMe }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
