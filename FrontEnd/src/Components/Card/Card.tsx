import './Card.css'
import { NavLink } from "react-router-dom";
import ChipTempo from '../ChipTempo/ChipTempo';

type CardProps = {
    imagem: string,
    titulo: string,
    categoria: string[],
    tempo: string
}

function Card({imagem, titulo, categoria, tempo}:CardProps){
    return(
        <article className='card'>
            <figure className='posterFilme'>
                <NavLink to='/'>
                    <img src={imagem} alt="Poster do Filme" />
                </NavLink>
            </figure>

            <section className='infoFilmeCard'>
                <div className='infoFilme'>
                    <h2>{titulo}</h2>
                    <p>{categoria.join(" | ")}</p>
                </div>

                <ChipTempo tempo={tempo}/>
            </section>
        </article>
    );
}

export default Card;