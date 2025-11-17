/**
  Este componente é responsável por renderizar um único item na lista de
  solicitações pendentes (na página Requisicoes.tsx)
  ele é um componente "controlado", recebendo o objeto 'solicitacao'
  e as funções de 'aprovar'/'recusar' 
  diretamente de seu componente "pai" (Requisicoes.tsx)
  ele gerencia o seu próprio estado interno 'aberto' para controlar o dropdown
  de detalhes
  ele também é responsável por converter a string JSON
 'dados_propostos' que vem do back-end para um objeto que o JSX possa ler.
 */

import './Request.css'
import { useState } from 'react';
import Check from '../../Assets/Icons/Check.png';
import Xis from '../../Assets/Icons/xis.png';
import { ChevronDown, ChevronUp} from "lucide-react";

// Define a estrutura (Type) do objeto de filme que está DENTRO
// da string JSON 'dados_propostos'.
type DadosFilmeProposto = {
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

// Define a estrutura (Type) do objeto 'solicitacao'
// como ele vem da API (recebido pela página 'Requisicoes.tsx').
type Solicitacao = {
    id: number;
    tipo: 'add' | 'edit';
    dados_propostos: string; 
}

// Define as 'props' que este componente espera receber do seu "pai".
type RequestProp = {
    solicitacao: Solicitacao; // O objeto de dados da solicitação.
    onClickAccept?: () => void; 
    onClickRefuse?: () => void; 
}

function Request({solicitacao, onClickAccept, onClickRefuse}:RequestProp){
    // Estado interno para controlar se o dropdown de detalhes está aberto ou fechado
     const [aberto, setAberto] = useState(false); 
    
    // Extrai a propriedade 'tipo' de dentro da prop 'solicitacao'.
     const { tipo } = solicitacao;

    // Tenta converter a string JSON 'solicitacao.dados_propostos'
    // para um objeto 'DadosFilmeProposto'
     let dadosFilme: DadosFilmeProposto | null = null;
     try {
         dadosFilme = JSON.parse(solicitacao.dados_propostos);
     } catch (e) {
        // Se o JSON estiver quebrado ou inválido, loga o erro.
         console.error("Erro ao parsear dados_propostos:", e);
     }

    // Define o título a ser exibido. Usa o título de 'dadosFilme' se ele existir,
    // senão, usa um texto padrão "Título Indisponível".
     const titulo = dadosFilme?.titulo || "Título Indisponível";

    // Lógica ternária para definir variáveis de exibição 
     const corClasse = tipo === 'add' ? 'add' : 'edit' // Classe CSS para cor 
     const Tipo = tipo === 'add' ? 'Adição:' : 'Edição:' // Texto a ser exibido

    // Função local que inverte o estado 'aberto' (true -> false, false -> true).
     const alternarDropdown = () => {
         setAberto(!aberto);
     }

     return(
         <>           
            <article className={`request ${corClasse} ${aberto ? "aberto" : ""}`}>
              <div className='requestInfos'>
                   <h2 className='requestTipo'>{Tipo}</h2>
                   <h3 className='requestTitulo'>{titulo}</h3>
              </div>

              <div className='requestButtons'>
                   <button className='refuseButton' onClick={onClickRefuse}>
                       <img src={Xis} alt="Ícone de X para recusar" />
                       Recusar
                   </button>

                   <button className='acceptButton' onClick={onClickAccept}>
                       <img src={Check} alt="Ícone de check para aceitar" />
                       Aprovar
                   </button>

                   <button className='setaButton' onClick={alternarDropdown}>
                        {/* Renderiza o ícone de seta para cima ou para baixo baseado no estado 'aberto'. */}
                       {aberto ? <ChevronUp size={50} strokeWidth={1.5}/> : <ChevronDown size={50} strokeWidth={1.5}/>}
                   </button>
              </div>
            </article>

            {/* Renderização Condicional: 
             esta seção (o dropdown de detalhes) só é renderizada se 
            'aberto' for 'true' E 'dadosFilme' não for 'null' */}
            {aberto && dadosFilme && (
              <section className='requestMoreInfo'>
                   <p>Titulo: {dadosFilme.titulo}</p> 
                   <p>Ano: {dadosFilme.ano}</p> 
                   <p>Duração: {dadosFilme.duracao} min</p>
                   <p>Produtora: {dadosFilme.produtora}</p>
                   <p>Gêneros: {dadosFilme.generos.join(', ')}</p> 
                   <p>Diretores: {dadosFilme.diretores.join(', ')}</p> A
                   <p>Elenco: {dadosFilme.elenco.join(', ')}</p> 
                   <p>Poster URL: {dadosFilme.poster}</p>
                   <p>Banner URL: {dadosFilme.banner}</p>
                   <p>Sinopse: {dadosFilme.sinopse}</p>
              </section>
            )}
         </>
     )
}

export default Request;