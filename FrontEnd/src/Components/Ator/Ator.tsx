import './Ator.css'
import Claquete from '../../Assets/Icons/claquete.png';

type atorProp = {
    foto: string,
    nome: string,
    nacionalidade: string
}

function Ator({foto, nome, nacionalidade}: atorProp){
    return(
        <article className='ator'>
            <figure className='fotoAtor'>
                <img src={foto} alt="Foto do(a) ator(riz)" />
            </figure>

            <article className='infoAtor'>
                <div className='infoAtorEscrita'>
                    <h2>{nome}</h2>
                    <p>{nacionalidade}</p>
                </div>

                <img src={Claquete} alt="Ícone de claquete" />
            </article>
        </article>
    );
}

export default Ator;