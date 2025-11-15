import './App.css'
import { BrowserRouter } from "react-router-dom";
import AppRoutes from './AppRoutes';
import { LoadingProvider, useLoading } from './Contexts/LoadingContext'; 
import { AuthProvider } from './Contexts/AuthContext'
import { ClipLoader } from 'react-spinners';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

function GlobalSpinner() {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="global-spinner-overlay">
      <ClipLoader color="#A74FF9" size={50} /> 
    </div>
  );
}

function App() {
  return (
    <>
      
      <LoadingProvider>
        <BrowserRouter>
          <AuthProvider>
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

            <GlobalSpinner />

            <AppRoutes />
            
          </AuthProvider>
        </BrowserRouter>
      </LoadingProvider>
    </>
  )
}

export default App;