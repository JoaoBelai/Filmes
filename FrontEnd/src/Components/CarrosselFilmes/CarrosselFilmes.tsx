/**
  Este componente é responsável por buscar e exibir os 4 carrosséis 
  principais da página de filmes 
  Ele é otimizado para performance: em vez de fazer 30-40 chamadas de API
  separadas (uma para cada filme), ele faz apenas 4 chamadas em paralelo
  para 4 rotas específicas do back-end 
 * */

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

// Define a estrutura de dados (TypeScript) de um filme, como vem da API.
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
    // Estados locais para armazenar as 4 listas de filmes separadamente.
    const[filmesDestaque, setFilmesDestaque] = useState<FilmeInfo[]>([])
    const[filmesClassicos, setFilmesClassicos] = useState<FilmeInfo[]>([])
    const[filmesCritica, setFilmesCritica] = useState<FilmeInfo[]>([])
    const[filmesNovos, setFilmesNovos] = useState<FilmeInfo[]>([])

    // Hook para controlar o spinner de carregamento global 
    const { setIsLoading } = useLoading();

    // Hook do React Router para navegar entre páginas.
    const navigate = useNavigate();

    // Função de navegação, chamada quando um card de filme é clicado.
    const handleRotaFilme = (id: number) =>{
        navigate(`/filmes/${id}`) 
    }

    // Hook principal. Roda UMA VEZ quando o componente é montado.
    useEffect(() => {
        
        // Função assíncrona que busca todas as 4 listas de filmes.
        const buscarTodasAsListas = async () =>{
            setIsLoading(true);
            try{
                // Dispara todas as 4 chamadas de API *em paralelo*
                const [
                  resDestaques,
                  resClassicos,
                  resCritica,
                  resNovos
                ] = await Promise.all([
                    // Cada 'get' chama uma rota específica do back-end.
                    axios.get('http://localhost:8000/filmes/destaques'),
                    axios.get('http://localhost:8000/filmes/classicos'),
                    axios.get('http://localhost:8000/filmes/critica'),
                    axios.get('http://localhost:8000/filmes/novos'),
                ]);

                // Quando todas as chamadas terminam, popula os 4 estados com os dados.
                // O '.data' é onde o axios guarda a resposta JSON.
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

        // Chama a função de busca.
        buscarTodasAsListas();
    }, [setIsLoading]) 

    // Renderiza os 4 carrosséis.
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