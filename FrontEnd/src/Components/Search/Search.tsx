import './Search.css'
import Lupa from '../../Assets/Icons/lupa.png';

function Search(){
    return(
        <article className='search'>
            <input type="text" placeholder='Pesquise um Filme, Ator ou Diretor'/>
            <figure>
                <img src={Lupa} alt="Lupa" />
            </figure>
        </article>
    )
}

export default Search;