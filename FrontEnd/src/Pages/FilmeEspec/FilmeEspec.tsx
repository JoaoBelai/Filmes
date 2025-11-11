import './FilmeEspec.css';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

type FilmeInfo = {
  id: number;
  titulo: string;
  generos: string[];
  duracao: number;
  poster: string;
  imagem: string;
  banner: string;
};

function FilmeEspec(){
    return(
        <>
            <header>
                <Navbar/>
            </header>
            
            <main>
                
            </main>
            
            <Footer/>
        </>
    );
}

export default FilmeEspec;