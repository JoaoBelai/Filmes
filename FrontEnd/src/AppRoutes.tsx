import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Sobre from './Pages/Sobre/Sobre';

function AppRoutes(){
    return(
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/sobre' element={<Sobre/>}/>
        </Routes>
    );

}

export default AppRoutes;