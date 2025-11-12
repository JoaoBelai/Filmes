import './InfoExtraFilme.css'

type InfoExtraProp = {
    diretores: string[];
    elenco: string[];
    produtora: string;
    duracao: number;
}

function InfoExtraFilme({diretores, elenco, produtora, duracao}: InfoExtraProp){
    return(
        <section className='infoExtraFilme'>
            <h1>Outras Informações</h1>
            <article className='boxOutrasInfos'>
                <div className='escrita'>
                    <p className='titleExtraInfo'>Duração:</p>
                    <p className='escritaExtraInfo'>{duracao}min</p>
                </div>

                <div className='escrita'>
                    <p className='titleExtraInfo'>Produtora:</p>
                    <p className='escritaExtraInfo'>{produtora}</p>
                </div>

                <div className='escrita'>
                    <p className='titleExtraInfo'>Direção:</p>
                    <p className='escritaExtraInfo'>{diretores.join(', ')}</p>
                </div>

                <div className='escrita'>
                    <p className='titleExtraInfo'>Elenco:</p>
                    <p className='escritaExtraInfo'>{elenco.join(', ')}</p>
                </div>
            </article>
        </section>
    );
}

export default InfoExtraFilme;