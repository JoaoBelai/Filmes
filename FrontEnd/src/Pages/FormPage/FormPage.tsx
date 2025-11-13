import './FormPage.css'
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLoading } from '../../Contexts/LoadingContext';
import { useAuth } from '../../Contexts/AuthContext';
import axios from 'axios';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import Form from '../../Components/Form/Form';


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

    const { user, authLoading } = useAuth();    

    useEffect(()=>{
        if(isEdit){
            const buscarInfoFilme = async () =>{
                setIsLoading(true);
                try{
                    const response = await axios.get(`http://localhost:8000/filmes/${id}`);
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

    const handleFormSubmit = async (data: FilmeInfo) => {
        setIsLoading(true);

        if(authLoading || !user){
            setIsLoading(false);
            return
        }

        try{
            if(user.role === 'admin'){
                if(isEdit){
                    await axios.put(`http://localhost:8000/filmes/${id}`, data);
                } else {
                    await axios.post('http://localhost:8000/filmes', data);
                }
                navigate('/filmes')
            } else if (user.role === 'user'){
                let requestData;
                if(isEdit){
                    requestData = {
                        ...data,
                        tipo_solicitacao: 'edit',
                        id_filme_alvo: Number(id)
                    };
                } else {
                    requestData = {
                        ...data,
                        tipo_solicitacao: 'add'
                    };
                }

                await axios.post('http://localhost:8000/requests', requestData);
                navigate('/filmes')
            }

        } catch (err) {
            console.error("Erro ao enviar formulário:", err);
            if (axios.isAxiosError(err) && err.response) {
                alert(`Erro: ${err.response.data.erro}`);
            } else {
                alert('Ocorreu um erro inesperado.');
            }

        } finally {
            setIsLoading(false);
        }
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