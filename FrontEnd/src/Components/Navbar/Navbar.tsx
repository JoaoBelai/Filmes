import './Navbar.css'
import { NavLink } from "react-router-dom";
import { useAuth } from '../../Contexts/AuthContext';
import Logo from '../../Assets/Images/Logo.png';
import Logout from '../../Assets/Icons/logout.png';

function Navbar(){
    const { user, logout } = useAuth();

    return(
        <nav className='navbar'>
            <figure className='logoNavbar'>
                <img src={Logo} alt="Logo do Site Orion" />
            </figure>

            <div className='links'>
                <NavLink to='/home' className='link'>Home</NavLink>
                <NavLink to='/filmes' className='link'>Filmes</NavLink>
                <NavLink to='/sobre' className='link'>Sobre Nós</NavLink>

                { user && user.role === 'admin' &&(
                    <NavLink to='/solicitacoes' className='link'>Requisições</NavLink>
                )}
            </div>

            <button onClick={logout} className='logoutButton'>
                <img src={Logout} alt="Ícone de Logout" />
                Logout
            </button>
        </nav>
    );
}

export default Navbar