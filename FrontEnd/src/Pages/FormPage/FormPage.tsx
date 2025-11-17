/*
 Esta página serve como um "container" para o componente de formulário (Form)
 Ela é responsável por duas lógicas principais:
 1. Determinar se é um formulário de "Adição" (sem ID na URL) ou "Edição" (com ID na URL)
 se for "Edição", ela busca os dados do filme para pré-preencher o formulário
 2. Gerenciar o "submit" (envio), aplicando a regra de negócio de permissão 
 (Admins criam/editam direto, Usuários enviam para uma fila de aprovação)
 */

import './FormPage.css'
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLoading } from '../../Contexts/LoadingContext';
import { useAuth } from '../../Contexts/AuthContext'; 
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import Form from '../../Components/Form/Form'; 

// Tipagem do filme
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


function FormPage() {
    // Pega o 'id' da URL (ex: /form/123). Se for /form, 'id' será undefined.
    const { id } = useParams();
    // 'isEdit' é um booleano que define o modo da página.
    // Se 'id' existir (não for undefined), 'isEdit' será true.
    const isEdit = Boolean(id);

    const navigate = useNavigate();
    // Estado para guardar os dados iniciais do filme (apenas no modo de edição)
    const [initialData, setInitialData] = useState<FilmeInfo | undefined>(undefined);
    const { setIsLoading } = useLoading();

    // Pega o usuário logado e o status de loading da autenticação
    const { user, authLoading } = useAuth();

    // Efeito que busca os dados do filme, *apenas* se estiver no modo de edição.
    useEffect(() => {
        if (isEdit) { 
            const buscarInfoFilme = async () => {
                setIsLoading(true);
                try {
                    // Busca na API os dados do filme específico
                    const response = await axios.get(`http://localhost:8000/filmes/${id}`);
                    const filmeBuscado: FilmeInfo = response.data;

                    // Formata os dados 
                    const dados = {
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

                    // Define os dados iniciais, que serão passados para o <Form />
                    setInitialData(dados)

                } catch (error) {
                    console.error("Erro ao buscar filme: ", { error })
                } finally {
                    setIsLoading(false);
                }
            }

            buscarInfoFilme();
        }
    }, [id, isEdit, navigate]) 

    // Define o título da página (e do formulário) dinamicamente
    const title = isEdit ? 'Edição de Filme' : 'Adição de Filme';

    // Função de Submit. É ela que o componente <Form> vai chamar.
    const handleFormSubmit = async (data: FilmeInfo) => {
        setIsLoading(true);

        // Trava de segurança: não faz nada se o usuário não estiver logado ou se a auth ainda estiver carregando
        if (authLoading || !user) {
            setIsLoading(false);
            return
        }

        try {
            // Se o usuário for 'admin', ele pode editar ou adicionar diretamente.
            if (user.role === 'admin') {
                if (isEdit) {
                    // (Admin) Modo Edição: Faz um PUT para atualizar o filme.
                    await axios.put(`http://localhost:8000/filmes/${id}`, data);
                    toast.success('Filme atualizado com sucesso!');
                } else {
                    // (Admin) Modo Adição: Faz um POST para criar um novo filme.
                    await axios.post('http://localhost:8000/filmes', data);
                    toast.success('Filme adicionado com sucesso!');
                }
                navigate('/filmes') // Manda o admin de volta para a lista

                // --- LÓGICA PARA USER ---
                // Se for um 'user' normal, ele envia uma "solicitação"
            } else if (user.role === 'user') {
                let requestData;
                if (isEdit) {
                    // (User) Modo Edição: Monta um objeto de "solicitação de edição"
                    requestData = {
                        ...data,
                        tipo_solicitacao: 'edit',
                        id_filme_alvo: Number(id) // Informa qual filme é para editar
                    };
                } else {
                    // (User) Modo Adição: Monta um objeto de "solicitação de adição"
                    requestData = {
                        ...data,
                        tipo_solicitacao: 'add'
                    };
                }

                // Envia para a *fila de requests* (endpoint diferente) para aprovação do admin.
                await axios.post('http://localhost:8000/requests', requestData);
                toast.info('Solicitação enviada para aprovação!')
                navigate('/filmes') // Manda o user de volta para a lista
            }

        } catch (err) {
            // Tratamento de erro
            console.error("Erro ao enviar formulário:", err);
            if (axios.isAxiosError(err) && err.response) {
                toast.error(`Erro: ${err.response.data.erro}`);
            } else {
                toast.error('Ocorreu um erro inesperado.');
            }

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <header>
                <Navbar />
            </header>
            <main className='mainForm'>
                <Form
                    titulo={title}
                    initialData={initialData}
                    onSubmit={handleFormSubmit}
                />
            </main>
            <Footer />
        </>
    );
}

export default FormPage;