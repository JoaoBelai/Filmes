import './FilmeEspec.css';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/free-mode';
import { useLoading } from '../../Contexts/LoadingContext';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import InfoFilmes from '../../Components/InfoFilmes/InfoFilmes';
import InfoExtraFilme from '../../Components/InfoExtraFilme/InfoExtraFilme';
import Card from '../../Components/Card/Card';


type FilmeInfo = {
    id: number;
    titulo: string;
    ano: string;
    sinopse: string;
    generos: string[];
    duracao: number;
    poster: string;
    banner: string;
    diretores: string[];
    elenco: string[];
    produtora: string;
};

function FilmeEspec(){
    const {id} = useParams<{id: string}>();
    const [filme, setFilme] = useState<FilmeInfo | null>(null);
    const [recomendados, setRecomendados] = useState<FilmeInfo[]>([])
    const {setIsLoading} = useLoading();

    const navigate = useNavigate();
    
    const handleRotaFilme = (id: number) =>{
        navigate(`/filmes/${id}`)
    }

    const handleRotaForm = (id: number ) =>{
        navigate(`/form/${id}`)
    }

    useEffect(()=>{
        if(id){
            const buscarFilmeEspec = async () => { 
                setIsLoading(true);
                try{
                    const response = await axios.get(`http://127.0.0.1:8000/filmes/${id}`);
                    const filmeBuscado: FilmeInfo = response.data;
                    setFilme(filmeBuscado); 

                    if (filmeBuscado.generos && filmeBuscado.generos.length > 0) {
                        const primeiroGenero = filmeBuscado.generos[0];
                        const resRecomendados = await axios.get(`http://127.0.0.1:8000/filmes/?categoria=${primeiroGenero}`);
                        const idAtual = Number(id); 
                        
                        const listaFiltrada = (resRecomendados.data as FilmeInfo[]).filter(
                            filme => filme.id !== idAtual
                        );

                        setRecomendados(listaFiltrada);
                    } else {
                        setRecomendados([]);
                    }
                } catch (error) {
                    console.error("Erro ao buscar filme: ", {error})
                } finally {
                    setIsLoading(false);
                }
            };

            buscarFilmeEspec();
        }

    }, [id, setIsLoading])

    if (!filme) {
        return null; 
    }

    return(
        <>
            <header>
                <Navbar/>
            </header>
            <main className='mainFilmeEspec'>
                <figure className='bannerFilmeEspec'>
                    <img src={filme.banner} alt="Banner Filme" />
                </figure>
                
                <InfoFilmes 
                    titulo={filme.titulo}
                    ano={filme.ano}
                    generos={filme.generos}
                    poster={filme.poster}
                    sinopse={filme.sinopse}
                    onButtonClick={() => handleRotaForm(filme.id)}
                />

                <InfoExtraFilme
                    duracao={filme.duracao}
                    diretores={filme.diretores}
                    elenco={filme.elenco}
                    produtora={filme.produtora}
                />

                <section className='recomendadosSwiper'>
                    <h1>RECOMENDADOS</h1>
                    <Swiper
                      className='filmesRecomendadosSwiper'
                      modules={[FreeMode]}
                      slidesPerView={'auto'}
                      spaceBetween={115}
                      freeMode={true}
                    >
                        {recomendados.map(filme =>(
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

export default FilmeEspec;