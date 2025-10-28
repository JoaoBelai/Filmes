import './Chips.css'

type ChipProp = {
    categoria: string
}

function Chips({categoria}: ChipProp){
    return(
        <p className='categoriaChip'>{categoria}</p>
    );
}

export default Chips;