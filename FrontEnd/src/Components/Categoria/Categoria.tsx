import './Categoria.css'

type CategoriaProp = {
    icone: string,
    nome: string,
    active?: boolean,
    onClickCategoria: () => void
}

function Categoria({icone, nome, active, onClickCategoria}: CategoriaProp){

    const activeClass = active ? 'active' : '';

    return(
        <article onClick={onClickCategoria} className={`categoria ${activeClass}`}>
            <figure className='categoriaImagem'>
                <img src={icone} alt="Ícone da Categoria" />
            </figure>

            <h3>{nome}</h3>
        </article>
    );
}

export default Categoria