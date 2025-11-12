import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Sobre from './Pages/Sobre/Sobre';
import Filmes from './Pages/Filmes/Filmes';
import Login from './Pages/Login/Login';
import FilmeEspec from './Pages/FilmeEspec/FilmeEspec';
import FormPage from './Pages/Form/FormPage';

function AppRoutes(){
    return(
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/sobre' element={<Sobre/>}/>
            <Route path='/filmes' element={<Filmes/>}/>
            <Route path='/filmes/:id' element={<FilmeEspec/>}/>
            <Route path='/form' element={<FormPage/>}/>
            <Route path='/form/:id' element={<FormPage/>}/>
        </Routes>
    );

}

export default AppRoutes;