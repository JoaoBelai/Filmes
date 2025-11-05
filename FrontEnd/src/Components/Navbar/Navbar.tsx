import './Navbar.css'
import { NavLink } from "react-router-dom";
import Lupa from '../../Assets/Icons/lupa.png';
import Perfil from '../../Assets/Icons/perfil.png';
import Logo from '../../Assets/Images/Logo.png';

function Navbar(){
    return(
        <nav className='navbar'>
            <figure className='logoNavbar'>
                <img src={Logo} alt="Logo Site" />
            </figure>

            <article className='search'>
                <input type="text" placeholder='Pesquise um Filme por Nome ou Ano'/>
                <figure>
                    <img src={Lupa} alt="Lupa" />
                </figure>
            </article>

            <div className='links'>
                <NavLink to='/' className='link'>Home</NavLink>
                <NavLink to='/filmes' className='link'>Filmes</NavLink>
                <NavLink to='/sobre' className='link'>Sobre Nós</NavLink>
            </div>

            <figure className='fotoPerfil'>
                <img src={Perfil} alt="Imagem de Perfil do usuário" />
            </figure>
        </nav>
    );
}

export default Navbar