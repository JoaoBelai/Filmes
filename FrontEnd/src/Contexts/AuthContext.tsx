import { createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 

interface UserPayload {
  id: number;
  role: 'admin' | 'user';
  exp: number;
}

type AuthContextType = {
  user: UserPayload | null;
  authLoading: boolean;
  login: (token: string) => void; 
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserPayload | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const tokenSalvo = localStorage.getItem('jwt_token');
    if (tokenSalvo) {
        try {
            const payload = jwtDecode<UserPayload>(tokenSalvo);
            if (payload.exp * 1000 > Date.now()) {
            setUser(payload);
            axios.defaults.headers.common['Authorization'] = `Bearer ${tokenSalvo}`;
            } else {
            localStorage.removeItem('jwt_token');
            }
        } catch (error) {
            localStorage.removeItem('jwt_token');
        }
    }
    setAuthLoading(false);
  }, []);

 
  const login = (token: string) => {
    try {
      const payload = jwtDecode<UserPayload>(token);
      localStorage.setItem('jwt_token', token);
      setUser(payload);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
    } catch (error) {
      console.error("Falha ao decodificar o token no login:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem('jwt_token');
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
    navigate('/login');
  };

  const value = { user, authLoading, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {!authLoading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}