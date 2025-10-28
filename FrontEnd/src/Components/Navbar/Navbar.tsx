import './Navbar.css'
import Lupa from '../../Assets/Icons/lupa.png'
import Perfil from '../../Assets/Icons/perfil.png'
import { NavLink } from "react-router-dom";

function Navbar(){
    return(
        <nav className='navbar'>
            <figure className='logoNavbar'>
                <img src="" alt="Logo Site" />
            </figure>

            <article className='search'>
                <input type="text" placeholder='Pesquise um Filme por Nome ou Ano'/>
                <figure>
                    <img src={Lupa} alt="Lupa" />
                </figure>
            </article>

            <div className='links'>
                <NavLink to='/' className='link'>Home</NavLink>
                <NavLink to='/' className='link'>Filmes</NavLink>
                <NavLink to='/' className='link'>Novo Filme</NavLink>
            </div>

            <figure className='fotoPerfil'>
                <img src={Perfil} alt="Imagem de Perfil do usuário" />
            </figure>
        </nav>
    );
}

export default Navbar