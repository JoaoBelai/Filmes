import { createContext, useState, useContext, useEffect } from 'react';
// Importa o 'ReactNode' como um tipo, para o 'children' do provider.
import type { ReactNode } from 'react';
// Importa a biblioteca 'jwt-decode' para ler o conteúdo dos tokens.
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 

// Define a estrutura do payload que está DENTRO do token JWT.
interface UserPayload {
  id: number;
  role: 'admin' | 'user';
  exp: number; // 
}

// Define a estrutura dos dados que o Contexto vai fornecer.
type AuthContextType = {
  user: UserPayload | null; // O objeto do usuário logado (ou null se deslogado).
  authLoading: boolean; // Flag para saber se o contexto ainda está verificando o token.
  login: (token: string) => void; 
  logout: () => void; 
};

// Cria o Contexto de Autenticação com o tipo definido
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Estado para guardar os dados do usuário (decodificados do token).
  const [user, setUser] = useState<UserPayload | null>(null);
  // Estado de "carregando" da autenticação. Começa 'true' ao iniciar o app.
  const [authLoading, setAuthLoading] = useState(true);

  // Hook para permitir o redirecionamento de página
  const navigate = useNavigate();

  // UseEffect responsável por verificar se já existe um token válido no localStorage.
  useEffect(() => {
    // Busca o token salvo no localStorage do navegador.
    const tokenSalvo = localStorage.getItem('jwt_token');
    
    // Se encontrou um token...
    if (tokenSalvo) {
          try {
          // Tenta decodificar o token para ler o payload
                const payload = jwtDecode<UserPayload>(tokenSalvo);
          
          // Verifica se o token não expirou (o 'exp' é em segundos, Date.now() é em ms)
                if (payload.exp * 1000 > Date.now()) {
            // Se o token é válido: atualiza o estado 'user' com os dados do payload.
                  setUser(payload);
            // Configura o 'axios' para enviar este token em TODAS as requisições futuras.
                  axios.defaults.headers.common['Authorization'] = `Bearer ${tokenSalvo}`;
                } else {
            // Se o token expirou, remove ele do localStorage.
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
      // Decodifica o novo token recebido.
        const payload = jwtDecode<UserPayload>(token);
      // Salva o novo token no localStorage
        localStorage.setItem('jwt_token', token);
      // Atualiza o estado 'user' globalmente
        setUser(payload);
      // Configura o 'axios' para usar o novo token imediatamente
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
    } catch (error) {
        console.error("Falha ao decodificar o token no login:", error);
    }
  };

  const logout = () => {
    // Remove o token do localStorage.
    localStorage.removeItem('jwt_token');
    // Reseta o estado 'user' para 'null'.
    setUser(null);
    // Remove o cabeçalho 'Authorization' das futuras requisições do 'axios'.
    delete axios.defaults.headers.common['Authorization'];
    // Redireciona o usuário para a página inicial/login.
    navigate('/');
  };

  // Agrupa os valores (estados e funções) que o Provider vai fornecer.
  const value = { user, authLoading, login, logout };

  // Renderiza o Provider do Contexto.
  return (
    <AuthContext.Provider value={value}>
      {/* Não renderiza os 'children' (o resto do App) até que
          a verificação inicial do token (authLoading) esteja completa. */}
        {!authLoading && children}
    </AuthContext.Provider>
  );
}

// Hook customizado (useAuth) para facilitar o uso deste contexto
export function useAuth() {
  const context = useContext(AuthContext);
  // Garante que o hook só seja usado por componentes "filhos" do 'AuthProvider'.
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}