import './App.css'
import { BrowserRouter } from "react-router-dom";
import AppRoutes from './AppRoutes';
import { LoadingProvider, useLoading } from './Contexts/LoadingContext'; 
import { ClipLoader } from 'react-spinners';

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

          <GlobalSpinner />
          
          <AppRoutes />

        </BrowserRouter>
      </LoadingProvider>
    </>
  )
}

export default App;