/**
 Responsável por renderizar a barra de navegação principal do site
 utiliza o 'AuthContext' (através do hook 'useAuth') para
 identificar se o usuário está logado e qual é a sua 'role' 
 Renderiza links de navegação padrão (Home, Filmes, Sobre Nós) para todos.
 Renderiza links de administração (ex: /requisicoes) condicionalmente,
 apenas se o 'user.role' for 'admin'.
 controla a função de 'logout', usando 'react-confirm-alert' para
 pedir confirmação do usuário antes de deslogar.
 * */

import './Navbar.css'
import { NavLink } from "react-router-dom";
import { useAuth } from '../../Contexts/AuthContext';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import Logo from '../../Assets/Images/Logo.png';
import Logout from '../../Assets/Icons/logout.png';

function Navbar(){
    // Busca o 'user' e a função 'logout'
    // do contexto global de autenticação.
    const { user, logout } = useAuth();

    // Função chamada quando o usuário clica no botão "Logout".
    const handleLogoutClick = () => {
        // Chama a biblioteca 'confirmAlert' para mostrar um modal de confirmação.
        confirmAlert({
            title: 'Confirmar Logout',
            message: 'Tem certeza que deseja fazer logout?',
            buttons: [
                 {
                     label: 'Não',
                     onClick: () => {} // Se "Não", não faz nada.
                },
                {
                     label: 'Sim',
                     onClick: () => logout() // Se "Sim", chama a função 'logout' do contexto.
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

                {/* Renderização Condicional para links de Admin
                    o operador '&&' garante que o <NavLink> 
                    só será renderizado se 'user' existir E 'user.role' for 'admin'. */}
                { user && user.role === 'admin' &&(
                        <NavLink to='/requisicoes' className='link'>Requisições</NavLink>
                )}
            </div>

            {/* Botão de Logout. */}
            {/* O 'onClick' está ligado à função 'handleLogoutClick'. */}
            <button onClick={handleLogoutClick} className='logoutButton'>
                <img src={Logout} alt="Ícone de Logout" />
                Logout
            </button>
        </nav>
    );
}

export default Navbar