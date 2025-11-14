import './Search.css'

type SearchProp ={
    placeholder: string,
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Search({placeholder, value, onChange}: SearchProp){
    return(
        <input 
            className="search" 
            type="text" 
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    )
}

export default Search;