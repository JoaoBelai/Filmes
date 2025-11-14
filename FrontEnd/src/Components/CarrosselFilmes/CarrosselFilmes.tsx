import './CarrosselFilmes.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import { useLoading } from '../../Contexts/LoadingContext';
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/free-mode';
import Card from '../Card/Card';

type FilmeInfo = {
  id: number;
  titulo: string;
  generos: string[];
  duracao: number;
  poster: string;
  imagem: string;
  banner: string;
};

function CarrosselFilmes(){
    const[filmesDestaque, setFilmesDestaque] = useState<FilmeInfo[]>([])
    const[filmesClassicos, setFilmesClassicos] = useState<FilmeInfo[]>([])
    const[filmesCritica, setFilmesCritica] = useState<FilmeInfo[]>([])
    const[filmesNovos, setFilmesNovos] = useState<FilmeInfo[]>([])

    const { setIsLoading } = useLoading();

    const navigate = useNavigate();

    const handleRotaFilme = (id: number) =>{
        navigate(`/filmes/${id}`)
    }

    useEffect(() => {
        const buscarTodasAsListas = async () =>{
            setIsLoading(true);
            try{
                const [
                resDestaques,
                resClassicos,
                resCritica,
                resNovos
                ] = await Promise.all([
                    axios.get('http://localhost:8000/filmes/destaques'),
                    axios.get('http://localhost:8000/filmes/classicos'),
                    axios.get('http://localhost:8000/filmes/critica'),
                    axios.get('http://localhost:8000/filmes/novos'),
                ]);

                setFilmesDestaque(resDestaques.data);
                setFilmesClassicos(resClassicos.data);
                setFilmesCritica(resCritica.data);
                setFilmesNovos(resNovos.data);

            } catch (error) {
                console.error("Erro ao buscar filmes: ", error)
            } finally {
                setIsLoading(false);
            }
        };

        buscarTodasAsListas();
    }, [setIsLoading])

    return(
        <>
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
        </>
    )
    

}
export default CarrosselFilmes;