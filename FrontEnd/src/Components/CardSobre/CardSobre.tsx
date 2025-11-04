import { useState } from 'react';
import './CardSobre.css'


type CardProp ={
    icone: string,
    titulo: string,
    texto: string
}

function CardSobre({texto, icone, titulo}: CardProp){
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return(
        <article className='flipCard' onClick={handleFlip}>

            <div className={`flipCardInner ${isFlipped ? 'flip' : ''}`}>
                <div className='cardFront'>
                    <h2>{titulo}</h2>
                    <p>{texto}</p>
                </div>

                <div className='cardBack'>
                    <figure>
                        <img src={icone} alt="Ícone do Pilar" />
                    </figure>
                    <h2>{titulo}</h2>
                </div>
            </div>

        </article>
    );
}

export default CardSobre;