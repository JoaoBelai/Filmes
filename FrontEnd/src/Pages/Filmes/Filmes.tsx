import './Filmes.css'
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import GridCategorias from '../../Components/GridCategorias/GridCategorias';
import Card from '../../Components/Card/Card';
import Add from '../../Assets/Icons/add.png';
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

function Filmes(){
    const navigate = useNavigate();

    const handleRotaFilme = (id: Number) =>{
        navigate(`${id}`)
    }

    return(
        <>
            <header>
                <Navbar/>
            </header>

            <main className='mainFilmes'>
                <article className='headerFilmes'>
                    <h1>Encontre seu novo clássico!</h1>

                    <button className='adicionarFilme'>
                        <img src={Add} alt="Ícone adiocionar" />
                        Novo Filme
                    </button>
                </article>

                <GridCategorias/>

                <section className='destaquesSwiper'>
                    <h1>EM DESTAQUE</h1>
                    <Swiper
                      className='filmesDestaqueSwiper'
                      modules={[FreeMode]}
                      slidesPerView={'auto'}
                      spaceBetween={115}
                      freeMode={true}
                    >
                        {mockFilmes.map(filme =>(
                          <SwiperSlide key={filme.id}>
                            <Card 
                              titulo={filme.titulo}
                              categoria={filme.categoria} 
                              tempo={filme.tempo}
                              imagem={filme.imagem}

                              onCardClick={() => handleRotaFilme(filme.id)}                        
                            />
                          </SwiperSlide>
                        ))}

                    </Swiper>
                </section>

                <section className='destaquesSwiper'>
                    <h1>NOVOS</h1>
                    <Swiper
                      className='filmesDestaqueSwiper'
                      modules={[FreeMode]}
                      slidesPerView={'auto'}
                      spaceBetween={115}
                      freeMode={true}
                    >
                        {mockFilmes.map(filme =>(
                          <SwiperSlide key={filme.id}>
                            <Card 
                              titulo={filme.titulo}
                              categoria={filme.categoria} 
                              tempo={filme.tempo}
                              imagem={filme.imagem}

                              onCardClick={() => handleRotaFilme(filme.id)}                        
                            />
                          </SwiperSlide>
                        ))}

                    </Swiper>
                </section>

                <section className='destaquesSwiper'>
                    <h1>CLÁSSICOS</h1>
                    <Swiper
                      className='filmesDestaqueSwiper'
                      modules={[FreeMode]}
                      slidesPerView={'auto'}
                      spaceBetween={115}
                      freeMode={true}
                    >
                        {mockFilmes.map(filme =>(
                          <SwiperSlide key={filme.id}>
                            <Card 
                              titulo={filme.titulo}
                              categoria={filme.categoria} 
                              tempo={filme.tempo}
                              imagem={filme.imagem}

                              onCardClick={() => handleRotaFilme(filme.id)}                        
                            />
                          </SwiperSlide>
                        ))}

                    </Swiper>
                </section>

                <section className='destaquesSwiper'>
                    <h1>ACLAMADOS PELA CRÍTICA</h1>
                    <Swiper
                      className='filmesDestaqueSwiper'
                      modules={[FreeMode]}
                      slidesPerView={'auto'}
                      spaceBetween={115}
                      freeMode={true}
                    >
                        {mockFilmes.map(filme =>(
                          <SwiperSlide key={filme.id}>
                            <Card 
                              titulo={filme.titulo}
                              categoria={filme.categoria} 
                              tempo={filme.tempo}
                              imagem={filme.imagem}

                              onCardClick={() => handleRotaFilme(filme.id)}                        
                            />
                          </SwiperSlide>
                        ))}

                    </Swiper>
                </section>
            
            </main>

            <Footer/>
        </>
    );
}

export default Filmes;