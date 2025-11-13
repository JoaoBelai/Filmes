import './FormPage.css'
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import Form from '../../Components/Form/Form';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLoading } from '../../Contexts/LoadingContext';
import axios from 'axios';


type FilmeInfo = {
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


function FormPage(){
    const{id} = useParams();
    const isEdit = Boolean(id);

    const navigate = useNavigate();
    const [initialData, setInitialData] = useState<FilmeInfo | undefined>(undefined);
    const {setIsLoading} = useLoading();

    useEffect(()=>{
        if(isEdit){
            const buscarInfoFilme = async () =>{
                setIsLoading(true);
                try{
                    const response = await axios.get(`http://127.0.0.1:8000/filmes/${id}`);
                    const filmeBuscado: FilmeInfo = response.data;

                    const dados  ={
                        titulo: filmeBuscado.titulo,
                        ano: filmeBuscado.ano,
                        produtora: filmeBuscado.produtora,
                        poster: filmeBuscado.poster,
                        banner: filmeBuscado.banner,
                        duracao: filmeBuscado.duracao,
                        sinopse: filmeBuscado.sinopse,
                        generos: filmeBuscado.generos,
                        diretores: filmeBuscado.diretores, 
                        elenco: filmeBuscado.elenco,
                    }

                    setInitialData(dados)

                } catch (error) {
                    console.error("Erro ao buscar filme: ", {error})
                } finally {
                    setIsLoading(false);
                }
            }

            buscarInfoFilme();
        }
    }, [id, isEdit, navigate])

    const title = isEdit ? 'Edição de Filme' : 'Adição de Filme';

    const handleFormSubmit = (data: FilmeInfo) => {
        console.log('Formulário enviado! Dados prontos (mas não enviados para a API):');
        console.log(data); 
    };

    return(
        <>
            <header>
                <Navbar/>
            </header>
            <main className='mainForm'>
                <Form 
                    titulo={title}
                    initialData={initialData}
                    onSubmit={handleFormSubmit}
                />
            </main>
            <Footer/>
        </>
    );
}

export default FormPage;