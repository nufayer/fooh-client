"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { authClient } from "@/lib/auth-client";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await authClient.getSession();
        if (session?.data?.user) {
          setUser({
            id: session.data.user.id,
            name: session.data.user.name || "User",
            email: session.data.user.email,
            avatar: session.data.user.image || null,
          });
        }
      } catch {
        // Not authenticated
      } finally {
        setIsLoading(false);
      }
    };
    checkSession();
  }, []);

  const login = async (email: string, password: string) => {
    const result = await authClient.signIn.email({
      email,
      password,
    });
    if (result.error) {
      throw new Error(result.error.message || "Login failed");
    }
    if (result.data?.user) {
      setUser({
        id: result.data.user.id,
        name: result.data.user.name || "User",
        email: result.data.user.email,
        avatar: result.data.user.image || null,
      });
    }
  };

  const register = async (name: string, email: string, password: string) => {
    const result = await authClient.signUp.email({
      name,
      email,
      password,
    });
    if (result.error) {
      throw new Error(result.error.message || "Registration failed");
    }
    if (result.data?.user) {
      setUser({
        id: result.data.user.id,
        name: result.data.user.name || "User",
        email: result.data.user.email,
        avatar: result.data.user.image || null,
      });
    }
  };

  const logout = async () => {
    await authClient.signOut();
    setUser(null);
  };

  const loginWithGoogle = async () => {
    const result = await authClient.signIn.social({
      provider: "google",
    });
    if (result.error) {
      throw new Error(result.error.message || "Google login failed");
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, loginWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
