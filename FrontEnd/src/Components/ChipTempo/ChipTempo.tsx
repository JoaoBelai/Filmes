import './ChipTempo.css'
import Ampulheta from '../../Assets/Icons/ampulheta.png'

type ChipTempoProps ={
    tempo: string
}

function ChipTempo({tempo}:ChipTempoProps){
    return(
        <div className='chipTempo'>
            <figure className='iconeTempo'>
                <img src={Ampulheta} alt="Ícone de Ampulheta" />
            </figure>
            <p>{tempo}min</p>
        </div>
    );
}

export default ChipTempo