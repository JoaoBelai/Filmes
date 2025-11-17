/*
 Esta página é responsável por exibir os detalhes completos de um filme específico.
 Ela busca os dados do filme usando o 'id' da URL e também busca uma lista
 de filmes recomendados com base no gênero do filme principal.
 Permite ao usuário editar ou deletar o filme.
 */

import './FilmeEspec.css';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLoading } from '../../Contexts/LoadingContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/free-mode';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import InfoFilmes from '../../Components/InfoFilmes/InfoFilmes';
import InfoExtraFilme from '../../Components/InfoExtraFilme/InfoExtraFilme';
import Card from '../../Components/Card/Card';

// Define a estrutura (tipagem) das informações do filme
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

function FilmeEspec() {
    // Pega o 'id' da URL (ex: /filmes/5)
    const { id } = useParams<{ id: string }>();
    // Estado para armazenar os dados do filme principal
    const [filme, setFilme] = useState<FilmeInfo | null>(null);
    // Estado para armazenar a lista de filmes recomendados
    const [recomendados, setRecomendados] = useState<FilmeInfo[]>([])

    // Contexto para controlar o estado de loading global
    const { setIsLoading } = useLoading();

    const navigate = useNavigate();

    // Função para navegar para a página de outro filme (usado nos recomendados)
    const handleRotaFilme = (id: number) => {
        navigate(`/filmes/${id}`)
    }

    // Função para navegar para o formulário de edição deste filme
    const handleRotaForm = (id: number) => {
        navigate(`/form/${id}`)
    }

    // Função para deletar o filme atual
    const handleDeleteFilme = async (id: number) => {
        // Exibe um popup de confirmação antes de deletar
        confirmAlert({
            title: 'Confirmar Deleção',
            message: 'Tem certeza que deseja deletar este filme? Esta ação é permanente.',
            buttons: [
                {
                    label: 'Não, Cancelar',
                    onClick: () => { } // Não faz nada se cancelar
                },

                {
                    label: 'Sim, Deletar',
                    // Função assíncrona que roda se o usuário confirmar
                    onClick: async () => {
                        setIsLoading(true);
                        try {
                            // Faz a requisição DELETE para a API
                            await axios.delete(`http://localhost:8000/filmes/${id}`);
                            toast.success("Filme deletado com sucesso!");
                            // Navega de volta para a home após o sucesso
                            navigate('/home');

                        } catch (err) {
                            // Tratamento de erro
                            if (axios.isAxiosError(err) && err.response) {
                                toast.error(`Erro: ${err.response.data.erro}`);
                            } else {
                                toast.error('Ocorreu um erro inesperado.');
                            }

                        } finally {
                            setIsLoading(false)
                            _
                        }
                    }
                }
            ],
            overlayClassName: "confirm-overlay"
        });
    }

    // Efeito que busca os dados do filme e os recomendados
    // Roda quando o 'id' da URL muda
    useEffect(() => {
        if (id) {
            const buscarFilmeEspec = async () => {
                setIsLoading(true);
                try {
                    // 1. Busca o filme principal pelo ID
                    const response = await axios.get(`http://127.0.0.1:8000/filmes/${id}`);
                    const filmeBuscado: FilmeInfo = response.data;
                    setFilme(filmeBuscado);

                    // 2. Se o filme tiver gêneros, busca recomendados
                    if (filmeBuscado.generos && filmeBuscado.generos.length > 0) {
                        // Pega o primeiro gênero da lista para usar como filtro
                        const primeiroGenero = filmeBuscado.generos[0];
                        // Busca filmes filtrando pela categoria (gênero)
                        const resRecomendados = await axios.get(`http://127.0.0.1:8000/filmes/?categoria=${primeiroGenero}`);
                        const idAtual = Number(id);

                        // Filtra a lista de recomendados para não incluir o próprio filme que está sendo visto
                        const listaFiltrada = (resRecomendados.data as FilmeInfo[]).filter(
                            filme => filme.id !== idAtual
                        );

                        setRecomendados(listaFiltrada);
                    } else {
                        // Se não tiver gênero, a lista de recomendados fica vazia
                        setRecomendados([]);
                    }
                } catch (error) {
                    console.error("Erro ao buscar filme: ", { error })
                } finally {
                    setIsLoading(false);
                }
            };

            buscarFilmeEspec();
        }

    }, [id, setIsLoading])

    // Enquanto 'filme' for null (antes da API responder), não renderiza nada
    // Isso evita erros de tentar acessar 'filme.titulo' antes do 'filme' existir
    if (!filme) {
        return null;
    }

    return (
        <>
            <header>
                <Navbar />
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
                    onDeleteClick={() => handleDeleteFilme(filme.id)}
                />
                <InfoExtraFilme
                    duracao={filme.duracao}
                    diretores={filme.diretores}
                    elenco={filme.elenco}
                    produtora={filme.produtora}
                />

                {/* Seção do carrossel de filmes recomendados */}
                <section className='recomendadosSwiper'>
                    <h1>RECOMENDADOS</h1>
                    <Swiper
                        className='filmesRecomendadosSwiper'
                        modules={[FreeMode]}
                        slidesPerView={'auto'}
                        spaceBetween={115}
                        freeMode={true}
                    >
                        {recomendados.map(filme => (
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

            <Footer />
        </>
    );
}

export default FilmeEspec;