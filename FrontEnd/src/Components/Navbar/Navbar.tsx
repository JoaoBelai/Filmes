import './Navbar.css'
import { NavLink } from "react-router-dom";
import { useAuth } from '../../Contexts/AuthContext';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import Logo from '../../Assets/Images/Logo.png';
import Logout from '../../Assets/Icons/logout.png';

function Navbar(){
    const { user, logout } = useAuth();

    const handleLogoutClick = () => {
        confirmAlert({
            title: 'Confirmar Logout',
            message: 'Tem certeza que deseja fazer logout?',
            buttons: [
                {
                    label: 'Não',
                    onClick: () => {} 
                },
                {
                    label: 'Sim',
                    onClick: () => logout() 
                }
            ],
            overlayClassName: "confirm-overlay" 
        });
    };

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
                    <NavLink to='/requisicoes' className='link'>Requisições</NavLink>
                )}
            </div>

            <button onClick={handleLogoutClick} className='logoutButton'>
                <img src={Logout} alt="Ícone de Logout" />
                Logout
            </button>
        </nav>
    );
}

export default Navbar