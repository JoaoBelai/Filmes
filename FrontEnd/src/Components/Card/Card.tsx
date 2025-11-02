import './Card.css'
import { NavLink } from "react-router-dom";
import ChipTempo from '../ChipTempo/ChipTempo';

type CardProps = {
    imagem: string,
    titulo: string,
    categoria: string[],
    tempo: string,
    onCardClick: () => void;
}

function Card({imagem, titulo, categoria, tempo, onCardClick}:CardProps){
    return(
        <article className='card' onClick={onCardClick}>
            <figure className='posterFilme'>
                <NavLink to='/'>
                    <img src={imagem} alt="Poster do Filme" />
                </NavLink>
            </figure>

            <section className='infoFilmeCard'>
                <div className='infoFilme'>
                    <h2 data-titulo={titulo}>{titulo}</h2>
                    <p>{categoria.join(" | ")}</p>
                </div>

                <ChipTempo tempo={tempo}/>
            </section>
        </article>
    );
}

export default Card;