import { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface User {
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const navigate = useNavigate();

  const isAuthenticated = !!user;

  // Simulate authentication - in a real app, this would connect to a backend
  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple validation - in a real app, this would verify credentials server-side
    if (password.length < 6) {
      toast.error("Invalid credentials");
      return;
    }
    
    const newUser = { email, name: email.split('@')[0] };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    toast.success("Login successful!");
    navigate("/welcome");
  };

  const register = async (name: string, email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple validation
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    
    const newUser = { email, name };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    toast.success("Registration successful!");
    navigate("/welcome");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};