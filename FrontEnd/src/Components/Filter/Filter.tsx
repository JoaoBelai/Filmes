import './Filter.css'
import Search from '../Search/Search'
import GridCategorias from '../GridCategorias/GridCategorias'
import NoFilter from '../../Assets/Icons/noFilter.png';

type FilterProps = {
    searchTerm: string;
    anoMin: string;
    anoMax: string;
    categoriasSelecionadas: string[];
    
    onSearchChange: (value: string) => void;
    onAnoMinChange: (value: string) => void;
    onAnoMaxChange: (value: string) => void;
    onCategoriaClick: (nome: string) => void;
    onLimparFiltros: () => void;
}

function Filter({
    searchTerm, anoMin, anoMax, categoriasSelecionadas,
    onSearchChange, onAnoMinChange, onAnoMaxChange,
    onCategoriaClick, onLimparFiltros
}: FilterProps){
    return(
        <section className='filterContainer'>
            <h2 className='titleFilter'>Filtros</h2>
            
            <article className='filters'>
                <Search 
                    placeholder="Pesquise um Filme, Ator ou Diretor"
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                />

                <input 
                    className='anoFiltro' 
                    type="number" 
                    placeholder='Ano Mín.'
                    value={anoMin}
                    onChange={(e) => onAnoMinChange(e.target.value)}
                />

                <input 
                    className='anoFiltro' 
                    type="number" 
                    placeholder='Ano Máx.'
                    value={anoMax}
                    onChange={(e) => onAnoMaxChange(e.target.value)}
                />

                <button className='limparFiltro' onClick={onLimparFiltros}>
                    <img src={NoFilter} alt="Ícone de retirar Filtros" />
                    Limpar
                </button> 
            </article>

            <GridCategorias
                categoriasSelecionadas={categoriasSelecionadas}
                onCategoriaClick={onCategoriaClick}
            />
        </section>
    );
}

export default Filter;

