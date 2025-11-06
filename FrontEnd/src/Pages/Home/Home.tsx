import './Home.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import Card from '../../Components/Card/Card';
import Banner from '../../Components/Banner/Banner';
import GridCategorias from '../../Components/GridCategorias/GridCategorias';
import Ator from '../../Components/Ator/Ator';
import Footer from '../../Components/Footer/Footer';
import Vingadores from '../../Assets/Images/vingadores.png'
import AvatarBanner from '../../Assets/Images/BannerAvatar.png';
import Avatar from '../../Assets/Images/avatar.png';
import VingadoresBanner from '../../Assets/Images/BannerVingadores.png'
import F1Banner from '../../Assets/Images/BannerF1.png';
import F1 from '../../Assets/Images/f1.png'
import Panda from '../../Assets/Images/panda.png';
import PandaBanner from '../../Assets/Images/PandaBanner.png';
import Superman from '../../Assets/Images/SuperMan.png';
import BannerSuper from '../../Assets/Images/BannerSuper.png';
import Interstellar from '../../Assets/Images/interstellar.png';
import BannerInterstellar from '../../Assets/Images/BannerInterstellar.png';
import Aranha from '../../Assets/Images/aranha.png';
import BannerAranha from '../../Assets/Images/BannerAranha.png';
import Forest from '../../Assets/Images/Forest.png';
import BradPitt from '../../Assets/Images/BradPitt.png';
import MargotRobbie from '../../Assets/Images/MargotRobbie.png';
import MichelBJordan from '../../Assets/Images/MichelBJordan.png';

type FilmeInfo = {
  id: number;
  titulo: string;
  categoria: string[];
  tempo: string;
  imagem: string;
  banner: string;
  link: string;
};

const mockFilmes: FilmeInfo[] = [
  { 
    id: 1, 
    titulo: 'Vingadores Ultimato', 
    categoria: ["Sci-Fi", "Ação", "Aventura"], 
    tempo: '181', 
    imagem: Vingadores, 
    banner: VingadoresBanner,
    link: '/filmes/1' 
  },
  { 
    id: 2, 
    titulo: 'Avatar o Caminho da Água', 
    categoria: ["Sci-Fi", "Ação", "Aventura"], 
    tempo: '192', 
    imagem: Avatar, 
    banner: AvatarBanner,
    link: '/filmes/2' 
  },
  { 
    id: 3, 
    titulo: 'Interstellar', 
    categoria: ["Sci-fi", "Aventura"], 
    tempo: '169', 
    imagem: Interstellar, 
    banner: BannerInterstellar,
    link: '/filmes/3'
  },
  { 
    id: 4, 
    titulo: 'Superman', 
    categoria: ["Ação", "Fantasia", "Super Herói"], 
    tempo: '165', 
    imagem: Superman, 
    banner: BannerSuper,
    link: '/filmes/4' 
  },
  { 
    id: 5, 
    titulo: 'Kung Fu Panda 2', 
    categoria: ["Animação", "Ação", "Comédia"], 
    tempo: '90', 
    imagem: Panda, 
    banner: PandaBanner,
    link: '/filmes/5' 
  },
  { 
    id: 6, 
    titulo: 'Homem-Aranha: Através do Aranhaverso', 
    categoria: ["Animação", "Ação", "Aventura"], 
    tempo: '140', 
    imagem: Aranha, 
    banner: BannerAranha,
    link: '/filmes/6' 
  },
  { 
    id: 7, 
    titulo: 'F1: O Filme', 
    categoria: ["Esportivo", "Drama"], 
    tempo: '156', 
    imagem: F1, 
    banner: F1Banner,
    link: '/filmes/7' 
  },
];

function Home(){
    const [filmeSelecionado, setFilmeSelecionado] = useState<FilmeInfo>(mockFilmes[0])
    const navigate = useNavigate()

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

    const [filmesAleatorios, setFilmesAleatorios] = useState(() => {  
        const filmesEmbaralhados = shuffleArray(mockFilmes);
        return filmesEmbaralhados.slice(0, 6);
    });

    return(
        <>
            <header className='headerHome'>
                <Navbar/>   
                <Banner poster={filmeSelecionado.banner} categoria={filmeSelecionado.categoria} link={filmeSelecionado.link}/>
            </header>

            <main className='mainHome'>
                <section className='carrosselFilmes'>
                    {mockFilmes.map(filme =>(
                        <Card 
                            key={filme.id}
                            titulo={filme.titulo}
                            categoria={filme.categoria} 
                            tempo={filme.tempo}
                            imagem={filme.imagem}

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
                            categoria={filme.categoria} 
                            tempo={filme.tempo}
                            imagem={filme.imagem}

                            onCardClick={() => handleRotaFilme(filme.id)}                        
                        />
                        ))}

                    </article>
                </section>


                <GridCategorias/>

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