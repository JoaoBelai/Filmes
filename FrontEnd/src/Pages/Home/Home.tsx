import './Home.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '../../Contexts/LoadingContext';
import axios from 'axios';
import Navbar from '../../Components/Navbar/Navbar';
import Card from '../../Components/Card/Card';
import Banner from '../../Components/Banner/Banner';
import Ator from '../../Components/Ator/Ator';
import Footer from '../../Components/Footer/Footer';
import Forest from '../../Assets/Images/Forest.png';
import BradPitt from '../../Assets/Images/BradPitt.png';
import MargotRobbie from '../../Assets/Images/MargotRobbie.png';
import MichelBJordan from '../../Assets/Images/MichelBJordan.png';

type FilmeInfo = {
  id: number;
  titulo: string;
  generos: string[];
  duracao: number;
  poster: string;
  imagem: string;
  banner: string;
};

function Home(){
    const [filmesCarrossel, setFilmesCarrossel] = useState<FilmeInfo[]>([])
    const [filmeSelecionado, setFilmeSelecionado] = useState<FilmeInfo | null>(null);
    const [filmesAleatorios, setFilmesAleatorios] = useState<FilmeInfo[]>([]);

    const { setIsLoading } = useLoading();

    const navigate = useNavigate()

    useEffect(()=>{
        const fetchFilmes = async () => {
            setIsLoading(true);
            
            try{
                const response = await axios.get<FilmeInfo[]>('http://localhost:8000/filmes');
                const filmesRecebidos = response.data;

                if(filmesRecebidos && filmesRecebidos.length > 0){
                    
                    const filmesEmbaralhados = shuffleArray(filmesRecebidos);
                    setFilmeSelecionado(filmesEmbaralhados[0]);
                    setFilmesCarrossel(filmesEmbaralhados.slice(0,7))
                    setFilmesAleatorios(filmesEmbaralhados.slice(8,14));
                }

            } catch (error){
                console.error("Erro ao buscar filmes: ", error)
            } finally{
                setIsLoading(false);
            }
        };

        fetchFilmes();
    }, []);

    const handleSelecionarFilme = (filme: FilmeInfo) =>{
        setFilmeSelecionado(filme)
    }

    const handleRotaFilme = (id: Number) =>{
        navigate(`/filmes/${id}`)
    }

    function shuffleArray<T>(array: T[]): T[] {
        let copiaArray = [...array]; 
    
        for (let i = copiaArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copiaArray[i], copiaArray[j]] = [copiaArray[j], copiaArray[i]];
        }
        
        return copiaArray;
    }

    return(
        <>
            <header className='headerHome'>
                <Navbar/>   
                {filmeSelecionado && (
                    <Banner 
                        poster={filmeSelecionado.banner} 
                        categoria={filmeSelecionado.generos} 
                        link={`/filmes/${filmeSelecionado.id}`}
                    />
                )}
            </header>

            <main className='mainHome'>
                <section className='carrosselFilmes'>
                    {filmesCarrossel.map(filme =>(
                        <Card 
                            key={filme.id}
                            titulo={filme.titulo}
                            categoria={filme.generos} 
                            tempo={String(filme.duracao)}
                            imagem={filme.poster}

                            onCardClick={() => handleSelecionarFilme(filme)}                        
                        />
                    ))}
                </section>

                <section className='secaoBoasVindas'>
                    <div className='mensagemBoasVindas'>
                        <h2>O Palco dos Melhores Filmes</h2>
                        <p>
                            Aqui você encontra histórias que emocionam, surpreendem e ficam 
                            com você por muito tempo. Explore filmes de diferentes estilos, épocas 
                            e gêneros, mergulhe em universos cheios de imaginação e viva experiências 
                            que vão além da tela. Prepare-se para sentir cada cena como se estivesse 
                            dentro dela — seu catálogo cinematográfico favorito está aqui.
                        </p>
                        <p>
                            Descubra novos títulos, revisite clássicos e encontre obras que permanecem 
                            na memória e no coração. Aqui, cada filme é um convite para viver algo único.
                        </p>
                    </div>

                    <figure className='imagemBoasVindas'>
                        <img src={Forest} alt="Forest Gump Sentado em um banco olhando para esquerda"/>
                    </figure>
                </section>


                <section className='destaque'>
                    <h1>EM DESTAQUE</h1>
                    <article className='filmesDestaque'>
                        {filmesAleatorios.map(filme =>(
                            <Card 
                            key={filme.id}
                            titulo={filme.titulo}
                            categoria={filme.generos} 
                            tempo={String(filme.duracao)}
                            imagem={filme.poster}

                            onCardClick={() => handleRotaFilme(filme.id)}                        
                        />
                        ))}

                    </article>
                </section>

                <section className='atores'>
                    <h1>PRINCIPAIS ATORES</h1>
                    <article className='gridAtores'>
                        <Ator
                           nome='Brad Pitt'
                           nacionalidade='Americano' 
                           foto={BradPitt}
                        />
                        <Ator
                           nome='Margot Robbie'
                           nacionalidade='Australiana' 
                           foto={MargotRobbie}
                        />
                        <Ator
                           nome='Michael B. Jordan'
                           nacionalidade='Americano' 
                           foto={MichelBJordan}
                        />
                    </article>
                </section>
            </main>

            <Footer className='footerHome'/>
        </>
    );
}

export default Home;