import './InfoFilmes.css'
import Chips from '../Chips/Chips';
import Lapis from '../../Assets/Icons/lapis.png';

type InfoFilmeProp ={
    titulo: string;
    ano: string;
    generos: string[];
    sinopse: string;
    poster: string;
}

function InfoFilmes({titulo, ano, generos, sinopse, poster}:InfoFilmeProp){
    return(
        <section className='filmeContainer'>
            <article className='infoFilmeEspec'>
                <figure className='posterFilmeEspec'>
                    <img src={poster} alt="Poster do Filme" />
                </figure>
                
                <div className='dadosFilme'>
                    <h1>{titulo}</h1>
                    <p className='anoFilme'>({ano})</p>

                    <div className='chipsFilme'>
                        {generos.map (cat =>(
                            <Chips key={cat} categoria={cat} cor='secondary'/>
                        ))}
                    </div>

                    <h3>Sinopse:</h3>
                    <p className='sinopseFilme'>{sinopse}</p>
                </div>
            </article>

           <article className='buttonsFilme'>
                <button className='botaoEditar'>
                    <img src={Lapis} alt="Ícone de lápis para edição" />
                    Editar
                </button>
           </article>

        </section>
    );
}

export default InfoFilmes;