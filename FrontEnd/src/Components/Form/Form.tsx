import './Form.css'
import React, { useState, useEffect } from 'react';

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

const defaultState: FilmeInfo = {
  titulo: '',
  ano: '',
  diretores: [],
  elenco: [],
  produtora: '',
  duracao: 0,
  poster: '',
  banner: '',
  generos: [],
  sinopse: '',
};

function Form({titulo, initialData, onSubmit}: FormProp){

    const [formData, setFormData] = useState<FilmeInfo>(initialData || defaultState);

    useEffect(() => {
        if (initialData) {
        setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); 
        onSubmit(formData); 
    };

    return(
            <form className="formFilme">
                <h1 className='formTitle'>{titulo}</h1>

                <div className='linhaForm'>
                    <article className='inputForm'>
                        <label htmlFor="titulo">Titulo *</label>
                        <input
                            type="text"
                            placeholder="Título do filme"
                            id='titulo'
                            required
                        />
                    </article>
                     
                    <article className='inputForm'>
                        <label htmlFor="ano">Ano *</label>
                        <input
                            type="text"
                            placeholder="Ano"
                            id='ano'
                            required
                        />
                    </article>
                </div>

                <div className='linhaForm'>
                    <article className='inputForm'>
                        <label htmlFor="diretor">Diretor *</label>
                        <input
                            type="text"
                            placeholder="Diretor do filme"
                            id='diretor'
                            required
                        />
                    </article>
                     
                    <article className='inputForm'>
                        <label htmlFor="ator">Ator/Atriz *</label>
                        <input
                            type="text"
                            placeholder="Ator ou Atriz Principal"
                            id='ator'
                            required
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
                        />
                    </article>  
                     
                    <article className='inputForm'>
                        <label htmlFor="duracao">Duração *</label>
                        <input
                            type="text"
                            placeholder="Duração do filme em minutos"
                            id='duracao'
                            required
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
                        />
                    </article>
                     
                    <article className='inputForm'>
                        <label htmlFor="banner">Url do Banner *</label>
                        <input
                            type="text"
                            placeholder="Url do Banner do filme"
                            id='banner'
                            required
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
                        />
                    </article>
                     
                    <article className='inputForm'>
                        <label htmlFor="categoria2">2° Categoria</label>

                        <input
                            type="text"
                            placeholder="Segunda categoria do filme"
                            id='categoria2'
                        />
                    </article>

                    <article className='inputForm'>
                         <label htmlFor="categoria3">3° Categoria</label>

                        <input
                            type="text"
                            placeholder="Terceira categoria do filme"
                            id='categoria3'
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
                        ></textarea>
                    </article>
                </div>
                    
                    
                <button className='buttonForm' type="submit">Enviar</button>
            </form>
    )
}

export default Form;