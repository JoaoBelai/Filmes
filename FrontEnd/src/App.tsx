import './App.css'
import { BrowserRouter } from "react-router-dom";
import AppRoutes from './AppRoutes';
// Importa o Provedor e o hook do Contexto de Loading.
import { LoadingProvider, useLoading } from './Contexts/LoadingContext'; 
// Importa o Provedor do Contexto de Autenticação.
import { AuthProvider } from './Contexts/AuthContext'
// Importa o componente 'ClipLoader' (a "bolinha") da biblioteca react-spinners.
import { ClipLoader } from 'react-spinners';
// Importa o container e o CSS da biblioteca 'react-toastify' (para 'snackbars').
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

// Componente interno responsável por renderizar o spinner global.
function GlobalSpinner() {
  // Lê o estado 'isLoading' do 'LoadingContext'.
   const { isLoading } = useLoading();

  // Se 'isLoading' for 'false', o componente não renderiza nada.
   if (!isLoading) return null;

  // Se 'isLoading' for 'true', renderiza o "overlay" (fundo) com a "bolinha".
   return (
     <div className="global-spinner-overlay">
        <ClipLoader color="#A74FF9" size={50} /> 
     </div>
   );
}

function App() {
   return (
     <>
        {/* O 'LoadingProvider' "envolve" tudo, fornecendo o estado 'isLoading'
         para qualquer componente filho (incluindo o AuthProvider e o AppRoutes). */}
        <LoadingProvider>
          <BrowserRouter>
          {/* O 'AuthProvider' "envolve" o AppRoutes, fornecendo os dados de
              'user', 'login', 'logout', etc. para as rotas. */}
             <AuthProvider>
            {/* O 'ToastContainer' é o componente da 'react-toastify'
                que renderiza as notificações (snackbars) na tela. */}
               <ToastContainer
                    position="top-right"
                    autoClose={5000} 
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark" 
               />

            {/* O 'GlobalSpinner' é renderizado aqui. Ele vai "escutar"
                o 'LoadingProvider' e aparecer/desaparecer conforme necessário. */}
               <GlobalSpinner />

            {/* O 'AppRoutes' contém a definição de todas as rotas (páginas) do site */}
               <AppRoutes />
              
             </AuthProvider>
          </BrowserRouter>
        </LoadingProvider>
     </>
   )
}

export default App;