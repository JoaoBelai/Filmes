import './InfoFilmes.css'
import { useAuth } from '../../Contexts/AuthContext';
import Chips from '../Chips/Chips';
import Lapis from '../../Assets/Icons/lapis.png';
import Lixeira from '../../Assets/Icons/lixeira.png';

type InfoFilmeProp ={
    titulo: string;
    ano: string;
    generos: string[];
    sinopse: string;
    poster: string;
    onButtonClick: () => void;
    onDeleteClick: () => void;
}

function InfoFilmes({titulo, ano, generos, sinopse, poster, onButtonClick, onDeleteClick}:InfoFilmeProp){
    const { user } = useAuth();
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
                <button className='botaoEditar' onClick={onButtonClick}>
                    <img src={Lapis} alt="Ícone de lápis para edição" />
                    Editar
                </button>
                {user && user.role === 'admin' &&(
                    <button className='botaoDeletar' onClick={onDeleteClick}>
                        <img src={Lixeira} alt="Ícone de lixeira para Deleção" />
                        Deletar
                    </button>
                )}
           </article>

        </section>
    );
}

export default InfoFilmes;