/*
  Esta página é destinada a administradores.
  Ela busca e exibe uma lista de todas as "solicitações" pendentes
  (adições ou edições de filmes) feitas por usuários comuns.
  O admin pode então "Aprovar" (o que executa a ação) ou "Rejeitar"
  (o que deleta a solicitação) cada item da lista.
 */

import './Requisicoes.css'
import { useState, useEffect } from 'react';
import { useLoading } from '../../Contexts/LoadingContext';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert'; // Para o modal de confirmação
import axios from 'axios';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/Navbar/Navbar';
import Request from '../../Components/Request/Request';

// Tipagem da solicitação (como vem da API)
type Solicitacao = {
    id: number;
    tipo: 'add' | 'edit';
    dados_propostos: string;
    id_usuario_solicitante: number;
    role_solicitante: string;
    status: string;
}

function Requisicoes() {
    // Estado para armazenar a lista de solicitações
    const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);
    const { setIsLoading } = useLoading();

    // Função para buscar todas as solicitações pendentes na API
    const fetchSolicitacoes = async () => {
        setIsLoading(true)

        try {
            const response = await axios.get('http://localhost:8000/requests')
            setSolicitacoes(response.data);

        } catch (error) {
            console.error("Erro ao buscar solicitações:", error);
            if (axios.isAxiosError(error) && error.response) {
                toast.error(`Erro: ${error.response.data.erro}`);
            }

        } finally {
            setIsLoading(false);
        }
    };

    // useEffect para buscar as solicitações assim que a página carregar
    useEffect(() => {
        fetchSolicitacoes();
    }, []);

    // Função para APROVAR uma solicitação
    const handleAprovar = async (id: number) => {
        // Exibe um popup de confirmação
        confirmAlert({
            title: 'Confirmar Aprovação',
            message: 'Tem certeza que deseja APROVAR esta solicitação?',
            buttons: [
                {
                    label: 'Não'
                },
                {
                    label: 'Sim, Aprovar',
                    onClick: async () => { // Função que roda se o admin confirmar
                        setIsLoading(true);
                        try {
                            // Faz a requisição PUT para o endpoint de 'requests'
                            // O backend deve cuidar da lógica de "processar" a aprovação
                            await axios.put(`http://localhost:8000/requests/${id}`);
                            toast.success("Solicitação aprovada com sucesso!");
                            // Remove a solicitação da lista no frontend
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

    // Função para REJEITAR uma solicitação
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
                            // Faz a requisição DELETE para simplesmente remover a solicitação
                            await axios.delete(`http://localhost:8000/requests/${id}`);
                            toast.info("Solicitação rejeitada.");
                            // Remove da lista no frontend
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

    return (
        <>
            <header>
                <Navbar />
            </header>

            <main className='mainRequisicoes'>
                <h1 className='requisicoesTitle'>Requisições Pendentes</h1>

                {/* Renderização condicional */}
                {solicitacoes.length > 0 ? (
                    // Se houver solicitações, mapeia e renderiza um <Request> para cada
                    solicitacoes.map(sol => (
                        <Request
                            key={sol.id}
                            solicitacao={sol}
                            onClickAccept={() => handleAprovar(sol.id)}
                            onClickRefuse={() => handleRejeitar(sol.id)}
                        />
                    ))
                ) : (
                    // Se o array de solicitações estiver vazio
                    <p className='semRequisicoes'>Nenhuma solicitação pendente.</p>
                )}

            </main>

            <Footer />
        </>
    );
}

export default Requisicoes;