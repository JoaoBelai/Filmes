import './Requisicoes.css'
import { useState, useEffect } from 'react';
import { useLoading } from '../../Contexts/LoadingContext';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import axios from 'axios';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/Navbar/Navbar';
import Request from '../../Components/Request/Request';

type Solicitacao = {
    id: number;
    tipo: 'add' | 'edit';
    dados_propostos: string; 
    id_usuario_solicitante: number;
    role_solicitante: string;
    status: string;
}

function Requisicoes(){
    const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);
    const { setIsLoading } = useLoading();

    const fetchSolicitacoes = async () =>{
        setIsLoading(true)

        try{
            const response = await axios.get('http://localhost:8000/requests')
            setSolicitacoes(response.data);

        } catch (error){
            console.error("Erro ao buscar solicitações:", error);
            if (axios.isAxiosError(error) && error.response) {
                toast.error(`Erro: ${error.response.data.erro}`);
            }

        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSolicitacoes();
    }, []);

    const handleAprovar = async (id: number) => {
        confirmAlert({
            title: 'Confirmar Aprovação',
            message: 'Tem certeza que deseja APROVAR esta solicitação?',
            buttons: [
                {
                    label: 'Não'
                },

                {
                    label: 'Sim, Aprovar',
                    onClick: async () => {
                        setIsLoading(true);
                        try {
                            await axios.put(`http://localhost:8000/requests/${id}`);
                            toast.success("Solicitação aprovada com sucesso!");
                            setSolicitacoes(prev => prev.filter(sol => sol.id !== id));

                        } catch (err) {
                            console.error("Erro ao aprovar:", err);
                            if (axios.isAxiosError(err) && err.response) {
                                toast.error(`Erro: ${err.response.data.erro}`);
                            } else {
                                toast.error('Erro inesperado ao aprovar.');
                            }

                        } finally {
                            setIsLoading(false);
                        }
                    }

                }
            ]
        });
    };

    const handleRejeitar = async (id: number) => {
        confirmAlert({
            title: 'Confirmar Rejeição',
            message: 'Tem certeza que deseja REJEITAR esta solicitação?',
            buttons: [
                {
                    label: 'Não'
                },

                {
                    label: 'Sim, Rejeitar',
                    onClick: async () => {
                        setIsLoading(true);
                        try {
                            await axios.delete(`http://localhost:8000/requests/${id}`);
                            toast.info("Solicitação rejeitada.");
                            setSolicitacoes(prev => prev.filter(sol => sol.id !== id));

                        } catch (err) {
                            console.error("Erro ao rejeitar:", err);
                            if (axios.isAxiosError(err) && err.response) {
                                toast.error(`Erro: ${err.response.data.erro}`);
                            } else {
                                toast.error('Erro inesperado ao rejeitar.');
                            }

                        } finally {
                            setIsLoading(false);
                        }
                    }
                }
            ]
        });
    };

    return(
        <>
            <header>
                <Navbar/>
            </header>

            <main className='mainRequisicoes'>
                <h1 className='requisicoesTitle'>Requisições Pendentes</h1>

                {solicitacoes.length > 0 ? (
                    solicitacoes.map(sol => (
                        <Request 
                            key={sol.id}
                            solicitacao={sol}
                            onClickAccept={() => handleAprovar(sol.id)}
                            onClickRefuse={() => handleRejeitar(sol.id)}
                        />
                    ))
                ) : (
                    <p className='semRequisicoes'>Nenhuma solicitação pendente.</p>
                )}
                
            </main>

            <Footer/>
        </>
    );
}

export default Requisicoes;