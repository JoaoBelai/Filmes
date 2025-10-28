import './Banner.css'
import Info from '../../Assets/Icons/info.png'
import Chips from '../Chips/Chips';

type BannerProp = {
    poster: string,
}

function Banner({poster}: BannerProp){
    return(
        <>
            <figure className='imagemBanner'>
                <img src={poster} alt="Poster Filme" />
            </figure>

            <div className='chipsBanner'>
                <Chips categoria='Aventura'/>
                <Chips categoria='Ação'/>
                <Chips categoria='Sci-Fi'/>
            </div>

            <button>
                <img src={Info} alt="Ícone de Informações" /> Saiba Mais
            </button>
        </>
    );
}

export default Banner;