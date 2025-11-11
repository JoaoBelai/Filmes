import './Filmes.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import { useLoading } from '../../Contexts/LoadingContext';
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/free-mode';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import GridCategorias from '../../Components/GridCategorias/GridCategorias';
import Card from '../../Components/Card/Card';
import Add from '../../Assets/Icons/add.png';

type FilmeInfo = {
  id: number;
  titulo: string;
  generos: string[];
  duracao: number;
  poster: string;
  imagem: string;
  banner: string;
};

function Filmes(){
    const[filmesDestaque, setFilmesDestaque] = useState<FilmeInfo[]>([])
    const[filmesClassicos, setFilmesClassicos] = useState<FilmeInfo[]>([])
    const[filmesCritica, setFilmesCritica] = useState<FilmeInfo[]>([])
    const[filmesNovos, setFilmesNovos] = useState<FilmeInfo[]>([])

    const { setIsLoading } = useLoading();
    const idFilmesDestaque = [ 21, 22, 12, 6, 9, 10, 15, 3, 8, 14]
    const idFilmesClassicos = [ 1, 2, 4, 5, 6, 7, 8, 12]
    const idFilmesCritica = [ 21, 22, 12, 4, 8, 7, 6, 5, 1, 2]
    const idFilmesNovos = [ 24, 25, 26  , 27, 28, 29, 30, 31, 32, 33]

  
    const navigate = useNavigate();

    const handleRotaFilme = (id: number) =>{
        navigate(`${id}`)
    }

    useEffect(() => {
      const fetchListaPorIds = async (ids: number[]): Promise<FilmeInfo[]> =>{
        const promessas = ids.map(async (id) => {
          if (!id) return null;

          try {
                const response = await axios.get(`http://127.0.0.1:8000/filmes/${id}`);
                return await response.data;
              }catch (err) {
                console.error(`Erro no fetch do filme ${id}:`, err);
                return null; 
              }
        });

        const FilmesBuscados= await Promise.all(promessas)

        return FilmesBuscados.filter(filme => filme != null) as FilmeInfo[];
      };

      const buscarTodasAsListas = async () =>{
        setIsLoading(true);
          try{
            const [
              dataDestaques,
              dataClassicos,
              dataCritica,
              dataNovos
            ] = await Promise.all([
              fetchListaPorIds(idFilmesDestaque),
              fetchListaPorIds(idFilmesClassicos),
              fetchListaPorIds(idFilmesCritica),
              fetchListaPorIds(idFilmesNovos)
            ]);

            setFilmesDestaque(dataDestaques);
            setFilmesClassicos(dataClassicos);
            setFilmesCritica(dataCritica);
            setFilmesNovos(dataNovos);

          } catch (error) {
            console.error("Erro ao buscar filmes: ", error)
          } finally {
            setIsLoading(false);
          }
        };

        buscarTodasAsListas();
    }, [])

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
                        {filmesDestaque.map(filme =>(
                          <SwiperSlide key={filme.id}>
                            <Card 
                              titulo={filme.titulo}
                              categoria={filme.generos} 
                              tempo={String(filme.duracao)}
                              imagem={filme.poster}

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
                        {filmesNovos.map(filme =>(
                          <SwiperSlide key={filme.id}>
                            <Card 
                              titulo={filme.titulo}
                              categoria={filme.generos} 
                              tempo={String(filme.duracao)}
                              imagem={filme.poster}

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
                        {filmesClassicos.map(filme =>(
                          <SwiperSlide key={filme.id}>
                            <Card 
                              titulo={filme.titulo}
                              categoria={filme.generos} 
                              tempo={String(filme.duracao)}
                              imagem={filme.poster}

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
                        {filmesCritica.map(filme =>(
                          <SwiperSlide key={filme.id}>
                            <Card 
                              titulo={filme.titulo}
                              categoria={filme.generos} 
                              tempo={String(filme.duracao)}
                              imagem={filme.poster}

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