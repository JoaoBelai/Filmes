/**
 Este componente é o formulário para Adicionar ou Editar um filme
 ele recebe 'initialData' (se for edição) e uma função 'onSubmit' 
 ele é responsável por gerenciar o estado interno de todos os inputs
 ele também contém a lógica para converter os dados do formulário "planos"
de volta para o formato de objeto que a API espera 
 * */

import './Form.css'
import { useState, useEffect } from 'react';

// Define o formato de dados que a API (e a FormPage) espera.
// Este é o formato "final" dos dados.
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

// Define as props que este componente <Form> recebe de seu da FormPage.
type FormProp ={
    titulo: string; 
    initialData?: FilmeInfo; // Dados opcionais para popular o form (usado na edição)
    onSubmit: (data: FilmeInfo) => void;
}

// Define o formato do *estado interno* do formulário.
// 'generos', 'diretores' e 'elenco' são "planos" (strings)
// para se adequarem aos inputs de texto.
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

// Define o estado inicial para um formulário limpo (modo "Adição").
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

/**
 * Função Helper de transformação de dados.
 * Converte o objeto 'FilmeInfo' para o 'FormState'
 * Isso é usado para preencher o formulário no modo "Edição".
 */
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
    // Estado principal que armazena os valores de TODOS os inputs do formulário.
    const [formState, setFormState] = useState<FormState>(defaultState);

    /**
     * Hook 'useEffect' que "escuta" mudanças na prop 'initialData'
     * isso é o que popula o formulário quando o usuário entra no modo "Edição"
     */
    useEffect(() => {
        if (initialData) {
            // Se 'initialData' foi fornecido, preenche o formulário
            setFormState(convertInfoToForm(initialData));
        }else{
            // Se não reseta o formulário para o estado padrão
            setFormState(defaultState)
        }
    }, [initialData]); 

    /**
     * Handler genérico para todos os inputs do formulário
     * Atualiza o 'formState' dinamicamente usando o atributo 'name' do input
     */
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const {name, value} = e.target; // Pega o 'name' e o 'value'
        setFormState((prevData) => ({
            ...prevData, // Mantém todos os outros valores
            [name]: value,  // Atualiza dinamicamente a chave 
        }))
    };

    /**
     * Handler chamado quando o botão 'submit' é clicado.
     * Responsável por transformar o estado "plano" do formulário
     * de volta para o objeto 'FilmeInfo' 
     */
    const handleSubmit = (e: React.FormEvent) => {
        // Previne o recarregamento padrão do formulário HTML
        e.preventDefault();
        
        // Junta os 3 inputs de categoria em um array
        const generosArray = [
          formState.categoria,
          formState.categoria2,
          formState.categoria3,
        ];
        // Limpa o array 
        const generosLimpos = generosArray.filter(g => g && g.trim() !== '');

        // Pega a string 
        const diretoresArray = formState.diretores
          .split(',') // Quebra em array
          .map((item) => item.trim()) // Limpa espaços
          .filter((item) => item); // Remove itens vazios
        
        const elencoArray = formState.elenco
          .split(',')
          .map((item) => item.trim())
          .filter((item) => item);

        // Cria o objeto 'FilmeInfo' que a FormPage espera.
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

        // Chama a função 'onSubmit'
        // e passa os dados prontos para a API.
        onSubmit(dataToSend);
    };

    return(
            // Conecta o handler 'handleSubmit' ao 'onSubmit' do form
            <form className="formFilme" onSubmit={handleSubmit}>
                <h1 className='formTitle'>{titulo}</h1>

                {/* Cada input está conectado ao 'formState' via 'value' e 'onChange' */}
                
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