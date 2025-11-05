import './GridCategorias.css'
import Categoria from '../Categoria/Categoria'
import IconeAcao from '../../Assets/Icons/acao.png';
import IconeAnimacao from '../../Assets/Icons/animacao.png';
import IconeAventura from '../../Assets/Icons/aventura.png';
import IconeTerror from '../../Assets/Icons/terror.png';
import IconeComedia from '../../Assets/Icons/Comedia.png';
import IconeScifi from '../../Assets/Icons/scifi.png';
import IconeDrama from '../../Assets/Icons/drama.png';
import IconeEsportivo from '../../Assets/Icons/esportivo.png';

function GridCategorias(){
    return(
        <section className='categorias'>
            <h1>CATEGORIAS</h1>
            <div className='gridCategorias'>
                <Categoria
                    icone={IconeAcao}
                    nome='Ação'
                />
                <Categoria
                    icone={IconeAnimacao}
                    nome='Animação'
                />
                <Categoria
                    icone={IconeAventura}
                    nome='Aventura'
                />
                <Categoria
                    icone={IconeComedia}
                    nome='Comédia'
                />
                <Categoria
                    icone={IconeDrama}
                    nome='Drama'
                />
                <Categoria
                    icone={IconeEsportivo}
                    nome='Esportivo'
                />
                <Categoria
                    icone={IconeScifi}
                    nome='Sci-fi'
                />
                <Categoria
                    icone={IconeTerror}
                    nome='Terror'
                />
            </div>
        </section>
    )
}

export default GridCategorias;