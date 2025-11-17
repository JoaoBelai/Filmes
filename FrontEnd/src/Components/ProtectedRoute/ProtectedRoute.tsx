/**

 Este componente atua como um "guarda" para as rotas
 do React Router que exigem autenticação
 ele é usado no 'AppRoutes.tsx' para "envolver" as páginas que
 não podem ser acessadas por usuários deslogados
 Ele usa o 'AuthContext' para verificar se um usuário está logado
 e se a verificação inicial do localStorage (authLoading) já terminou.
 Se o usuário estiver logado, ele renderiza o '<Outlet />' (a página filha).
 Se não estiver logado, ele redireciona para a
 página principal (ou de login).
  */

import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext';

const ProtectedRoute = () => {
  // Busca o 'user' e o 'authLoading'
  // do contexto global de autenticação.
  const { user, authLoading } = useAuth();

  // 1. Verifica se o 'AuthContext' ainda está carregando
  if (authLoading) {
    // Retorna 'null' para esperar a verificação terminar.
    return null; 
  }

  // 2. Verifica se o usuário NÃO está logado.
  // Este 'if' só roda DEPOIS que 'authLoading' é 'false'.
  if (!user) {
    // Se não há usuário, renderiza o componente 'Navigate' do React Router.
    // Isso redireciona o usuário para a tela de login
    return <Navigate to="/" replace />;
  }

  // 3. Se o usuário ESTÁ logado.
  // Renderiza o '<Outlet />'. O Outlet é um placeholder do React Router
  // que representa a rota "filha" que está sendo protegida.
  return <Outlet />;
};

export default ProtectedRoute;