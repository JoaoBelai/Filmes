import './Form.css'
import { useState, useEffect } from 'react';

type FilmeInfo = {
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

type FormProp ={
    titulo: string;
    initialData?: FilmeInfo;
    onSubmit: (data: FilmeInfo) => void; 
}

type FormState = {
  titulo: string;
  ano: string;
  sinopse: string;
  categoria: string;  
  categoria2: string; 
  categoria3: string;
  duracao: string; 
  poster: string;
  banner: string;
  diretores: string; 
  elenco: string; 
  produtora: string;
};

const defaultState: FormState = {
  titulo: '',
  ano: '',
  diretores: '',
  elenco: '',
  produtora: '',
  duracao: '',
  poster: '',
  banner: '',
  categoria: '',
  categoria2: '',
  categoria3: '',
  sinopse: '',
};

function convertInfoToForm(filme: FilmeInfo): FormState {
  return {
    titulo: filme.titulo,
    ano: filme.ano,
    sinopse: filme.sinopse,
    produtora: filme.produtora,
    poster: filme.poster,
    banner: filme.banner,
    duracao: String(filme.duracao),
    categoria: filme.generos[0] || '',
    categoria2: filme.generos[1] || '',
    categoria3: filme.generos[2] || '',
    diretores: filme.diretores.join(', '),
    elenco: filme.elenco.join(', '),
  };
}

function Form({titulo, initialData, onSubmit}: FormProp){
    const [formState, setFormState] = useState<FormState>(defaultState);

    useEffect(() => {
        if (initialData) {
            setFormState(convertInfoToForm(initialData));
        }else{
            setFormState(defaultState)
        }
    }, [initialData]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const {name, value} = e.target;
        setFormState((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const generosArray = [
        formState.categoria,
        formState.categoria2,
        formState.categoria3,
        ];

        const generosLimpos = generosArray.filter(g => g && g.trim() !== '');

        const diretoresArray = formState.diretores
        .split(',')
        .map((item) => item.trim())
        .filter((item) => item);

        const elencoArray = formState.elenco
        .split(',')
        .map((item) => item.trim())
        .filter((item) => item);

        const dataToSend: FilmeInfo = {
        titulo: formState.titulo,
        ano: formState.ano,
        sinopse: formState.sinopse,
        produtora: formState.produtora,
        poster: formState.poster,
        banner: formState.banner,
        duracao: Number(formState.duracao) || 0, 
        generos: generosLimpos, 
        diretores: diretoresArray, 
        elenco: elencoArray, 
        };

        onSubmit(dataToSend);
    };

    return(
            <form className="formFilme" onSubmit={handleSubmit}>
                <h1 className='formTitle'>{titulo}</h1>

                <div className='linhaForm'>
                    <article className='inputForm'>
                        <label htmlFor="titulo">Titulo *</label>
                        <input
                            type="text"
                            placeholder="Título do filme"
                            id='titulo'
                            required
                            name="titulo" 
                            value={formState.titulo} 
                            onChange={handleChange} 
                        />
                    </article>
                     
                    <article className='inputForm'>
                        <label htmlFor="ano">Ano *</label>
                        <input
                            type="text"
                            placeholder="Ano de lançamento do Filme"
                            id='ano'
                            required
                            name="ano" 
                            value={formState.ano} 
                            onChange={handleChange} 
                        />
                    </article>
                </div>

                <div className='linhaForm'>
                    <article className='inputForm'>
                        <label htmlFor="diretores">Diretor(es) *</label>
                        <input
                            type="text"
                            placeholder="Ex: Diretor 1, Diretor 2"
                            id='diretores'
                            required
                            name="diretores" 
                            value={formState.diretores} 
                            onChange={handleChange}
                        />
                    </article>
                     
                    <article className='inputForm'>
                        <label htmlFor="elenco">Ator/Atriz *</label>
                        <input
                            type="text"
                            placeholder="Ator ou Atriz Principal"
                            id='elenco'
                            required
                            name="elenco"
                            value={formState.elenco}
                            onChange={handleChange}
                        />
                    </article>
                </div>

                <div className='linhaForm'>
                    <article className='inputForm'>
                        <label htmlFor="produtora">Produtora *</label>
                        <input
                            type="text"
                            placeholder="Produtora do filme"
                            id='produtora'
                            required
                            name="produtora" 
                            value={formState.produtora} 
                            onChange={handleChange} 
                        />
                    </article>  
                     
                    <article className='inputForm'>
                        <label htmlFor="duracao">Duração *</label>
                        <input
                            type="number"
                            placeholder="Duração do filme em minutos"
                            id='duracao'
                            required
                            name="duracao" 
                            value={formState.duracao} 
                            onChange={handleChange} 
                        />
                    </article>
                </div>  

                <div className='linhaForm'>
                    <article className='inputForm'>
                        <label htmlFor="poster">Url Poster *</label>
                        <input
                            type="text"
                            placeholder="Url do Poster do filme"
                            id='poster'
                            required
                            name="poster" 
                            value={formState.poster} 
                            onChange={handleChange} 
                        />
                    </article>
                     
                    <article className='inputForm'>
                        <label htmlFor="banner">Url do Banner *</label>
                        <input
                            type="text"
                            placeholder="Url do Banner do filme"
                            id='banner'
                            required
                            name="banner" 
                            value={formState.banner} 
                            onChange={handleChange} 
                        />
                    </article>
                </div>

                <div className='linhaForm'>
                    <article className='inputForm'>
                        <label htmlFor="categoria">Categoria *</label>
                        <input
                            type="text"
                            placeholder="Categoria do filme"
                            id='categoria'
                            required
                            name="categoria" 
                            value={formState.categoria}
                            onChange={handleChange}
                        />
                    </article>
                     
                    <article className='inputForm'>
                        <label htmlFor="categoria2">2° Categoria</label>

                        <input
                            type="text"
                            placeholder="Segunda categoria do filme"
                            id='categoria2'
                            name="categoria2" 
                            value={formState.categoria2}
                            onChange={handleChange}
                        />
                    </article>

                    <article className='inputForm'>
                         <label htmlFor="categoria3">3° Categoria</label>

                        <input
                            type="text"
                            placeholder="Terceira categoria do filme"
                            id='categoria3'
                            name="categoria3" 
                            value={formState.categoria3}
                            onChange={handleChange}
                        />
                    </article>
                </div>

                <div className='linhaForm'>
                    <article className='inputForm'>
                        <label htmlFor="sinopse">Sinopse *</label>
                        <textarea
                            placeholder="Sinopse do filme"
                            id='sinopse'
                            required
                            name="sinopse" 
                            value={formState.sinopse} 
                            onChange={handleChange} 
                        ></textarea>
                    </article>
                </div>
                    
                    
                <button className='buttonForm' type="submit">Enviar</button>
            </form>
    )
}

export default Form;