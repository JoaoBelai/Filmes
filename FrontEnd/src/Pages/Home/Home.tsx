import './Home.css'
import { useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Card from '../../Components/Card/Card';
import Banner from '../../Components/Banner/Banner';
import Categoria from '../../Components/Categoria/Categoria';
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
import IconeAcao from '../../Assets/Icons/acao.png';
import IconeAnimacao from '../../Assets/Icons/animacao.png';
import IconeAventura from '../../Assets/Icons/aventura.png';
import IconeTerror from '../../Assets/Icons/terror.png';
import IconeComedia from '../../Assets/Icons/Comedia.png';
import IconeScifi from '../../Assets/Icons/scifi.png';
import IconeDrama from '../../Assets/Icons/drama.png';
import IconeEsportivo from '../../Assets/Icons/esportivo.png';
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
    link: '/' 
  },
  { 
    id: 2, 
    titulo: 'Avatar o Caminho da Água', 
    categoria: ["Sci-Fi", "Ação", "Aventura"], 
    tempo: '192', 
    imagem: Avatar, 
    banner: AvatarBanner,
    link: '/' 
  },
  { 
    id: 3, 
    titulo: 'Interstellar', 
    categoria: ["Sci-fi", "Aventura"], 
    tempo: '169', 
    imagem: Interstellar, 
    banner: BannerInterstellar,
    link: '/'
  },
  { 
    id: 4, 
    titulo: 'Superman', 
    categoria: ["Ação", "Fantasia", "Super Herói"], 
    tempo: '165', 
    imagem: Superman, 
    banner: BannerSuper,
    link: '/' 
  },
  { 
    id: 5, 
    titulo: 'Kung Fu Panda 2', 
    categoria: ["Animação", "Ação", "Comédia"], 
    tempo: '90', 
    imagem: Panda, 
    banner: PandaBanner,
    link: '/' 
  },
  { 
    id: 6, 
    titulo: 'Homem-Aranha: Através do Aranhaverso', 
    categoria: ["Animação", "Ação", "Aventura"], 
    tempo: '140', 
    imagem: Aranha, 
    banner: BannerAranha,
    link: '/' 
  },
  { 
    id: 7, 
    titulo: 'F1: O Filme', 
    categoria: ["Esportivo", "Drama"], 
    tempo: '156', 
    imagem: F1, 
    banner: F1Banner,
    link: '/' 
  },
];

function Home(){
    const [filmeSelecionado, setFilmeSelecionado] = useState<FilmeInfo>(mockFilmes[0])

    const handleSelecionarFilme = (filme: FilmeInfo) =>{
        setFilmeSelecionado(filme)
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
            <header>
                <Navbar/>   
                <Banner poster={filmeSelecionado.banner} categoria={filmeSelecionado.categoria} link={filmeSelecionado.link}/>
            </header>

            <main>
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

                            onCardClick={() => handleSelecionarFilme(filme)}                        
                        />
                        ))}

                    </article>
                </section>


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

            <Footer/>
        </>
    );
}

export default Home;