import './Request.css'
import { useState } from 'react';
import Check from '../../Assets/Icons/Check.png';
import Xis from '../../Assets/Icons/xis.png';
import { ChevronDown, ChevronUp} from "lucide-react";

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

type Solicitacao = {
    id: number;
    tipo: 'add' | 'edit';
    dados_propostos: string;
}

type RequestProp = {
    solicitacao: Solicitacao;
    onClickAccept?: () => void;
    onClickRefuse?: () => void;
}

function Request({solicitacao, onClickAccept, onClickRefuse}:RequestProp){
    const [aberto, setAberto] = useState(false); 
    
    const { tipo } = solicitacao;

    let dadosFilme: DadosFilmeProposto | null = null;
    try {
        dadosFilme = JSON.parse(solicitacao.dados_propostos);
    } catch (e) {
        console.error("Erro ao parsear dados_propostos:", e);
    }

    const titulo = dadosFilme?.titulo || "Título Indisponível";

    const corClasse = tipo === 'add' ? 'add' : 'edit'
    const Tipo = tipo === 'add' ? 'Adição:' : 'Edição:'
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
                        {aberto ?  <ChevronUp size={50} strokeWidth={1.5}/> : <ChevronDown size={50} strokeWidth={1.5}/>}
                    </button>
                </div>
            </article>
            {aberto && dadosFilme && (
                <section className='requestMoreInfo'>
                    <p>Titulo: {dadosFilme.titulo}</p> 
                    <p>Ano: {dadosFilme.ano}</p> 
                    <p>Duração: {dadosFilme.duracao} min</p>
                    <p>Produtora: {dadosFilme.produtora}</p>
                    <p>Gêneros: {dadosFilme.generos.join(', ')}</p> 
                    <p>Diretores: {dadosFilme.diretores.join(', ')}</p>  
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