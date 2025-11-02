import './Categoria.css'
import { NavLink } from "react-router-dom";

type CategoriaProp = {
    icone: string,
    nome: string
}

function Categoria({icone, nome}: CategoriaProp){
    return(
        <article className='categoria'>
            <figure className='categoriaImagem'>
                <NavLink to='/'>
                    <img src={icone} alt="Ícone da Categoria" />
                </NavLink>
            </figure>

            <h3>{nome}</h3>
        </article>
    );
}

export default Categoria