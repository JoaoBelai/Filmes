import './Sobre.css'
import CardSobre from '../../Components/CardSobre/CardSobre';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import Alvo from '../../Assets/Icons/alvo.png';
import Binoculo from '../../Assets/Icons/binoculos.png';
import Balanca from '../../Assets/Icons/balanca.png';

function Sobre(){
    return(
        <>
            <header className='headerSobre'>
                <Navbar/>
            </header>

            <main className='mainSobre'>
                <h1 className='tituloSobre'>Sobre Nós</h1>

                <article className='cardsSobre'>
                    <CardSobre 
                        titulo='Missão' 
                        texto='Conectar pessoas ao universo do cinema, 
                        oferecendo informações completas, confiáveis e 
                        organizadas sobre filmes, artistas e produções. 
                        Queremos tornar a experiência de explorar filmes 
                        simples e agradável.'
                        icone={Alvo}
                    />

                    <CardSobre 
                        titulo='Visão' 
                        texto='Nos tornarmos a plataforma referência 
                        para pesquisa e descoberta cinematográfica, 
                        unindo design moderno, tecnologia e paixão pela 
                        sétima arte. Nosso objetivo é criar um espaço onde 
                        cada usuário se sinta guiado em uma jornada pelo 
                        vasto cosmos do cinema.'
                        icone={Binoculo}
                    />

                    <CardSobre 
                        titulo='Valores' 
                        texto='Transparência e precisão nas informações.
                                Experiência simples, moderna e intuitiva.
                                Criatividade e inovação constante.
                                Respeito à arte, às histórias e ao público.
                                Paixão autêntica pelo universo cinematográfico.'
                        icone={Balanca}
                    />
                </article>

                <p className='mensagemSobre'>
                    Muito obrigado por acessar nossa página, 
                    esperamos que você se divirta com as nossas 
                    seleções, estoure uma pipoca, pegue um refri e 
                    boa noite de filmes.
                </p>
            </main>

            <Footer/>
        </>
        
    );
}

export default Sobre;