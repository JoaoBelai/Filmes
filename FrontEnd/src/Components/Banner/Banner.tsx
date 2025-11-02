import './Banner.css'
import Info from '../../Assets/Icons/info.png'
import Chips from '../Chips/Chips';
import { NavLink } from 'react-router-dom';

type BannerProp = {
    poster: string,
    categoria: string[],
    link: string
}

function Banner({poster, categoria, link}: BannerProp){
    return(
        <>
            <figure className='imagemBanner'>
                <img src={poster} alt="Poster Filme" />
            </figure>

            <div className='chipsBanner'>
                {categoria.map (cat =>(
                    <Chips key={cat} categoria={cat}/>
                ))}
            </div>

            <NavLink to={link} className="botaoBanner">
              <img src={Info} alt="Ícone de Informações" /> Saiba Mais
            </NavLink>
        </>
    );
}

export default Banner;