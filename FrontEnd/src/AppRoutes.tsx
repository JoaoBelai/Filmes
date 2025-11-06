import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Sobre from './Pages/Sobre/Sobre';
import Filmes from './Pages/Filmes/Filmes';
import Login from './Pages/Login/Login';

function AppRoutes(){
    return(
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/sobre' element={<Sobre/>}/>
            <Route path='/filmes' element={<Filmes/>}/>
        </Routes>
    );

}

export default AppRoutes;