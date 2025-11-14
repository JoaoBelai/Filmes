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

type GridProps = {
    categoriasSelecionadas: string[];
    onCategoriaClick: (nome: string) => void;
}

const categoriasLista = [
    { nome: 'Ação', icone: IconeAcao },
    { nome: 'Animação', icone: IconeAnimacao },
    { nome: 'Aventura', icone: IconeAventura },
    { nome: 'Comédia', icone: IconeComedia },
    { nome: 'Drama', icone: IconeDrama },
    { nome: 'Esportivo', icone: IconeEsportivo },
    { nome: 'Ficção Científica', icone: IconeScifi },
    { nome: 'Terror', icone: IconeTerror }
];

function GridCategorias({categoriasSelecionadas, onCategoriaClick}: GridProps){
    return(
        <section className='categorias'>
            {categoriasLista.map((cat)=>(
                <Categoria
                    key={cat.nome}
                    icone={cat.icone}
                    nome={cat.nome}
                    onClickCategoria={() => onCategoriaClick(cat.nome)}
                    active={categoriasSelecionadas.includes(cat.nome)}
                />
            ))}
        </section>
    )
}

export default GridCategorias;