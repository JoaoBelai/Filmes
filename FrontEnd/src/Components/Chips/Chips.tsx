import './Chips.css'

type ChipProp = {
    categoria: string
    cor?: string
}

function Chips({categoria, cor}: ChipProp){
    return(
        <p className={`categoriaChip ${cor}`}>{categoria}</p>
    );
}

export default Chips;