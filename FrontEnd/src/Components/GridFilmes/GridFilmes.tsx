import './GridFilmes.css';
import { useNavigate } from 'react-router-dom';
import Card from '../Card/Card';

type FilmeInfo = {
  id: number;
  titulo: string;
  generos: string[];
  duracao: number;
  poster: string;
  imagem: string;
  banner: string;
};

type GridProps = {
  filmes: FilmeInfo[];
}

function GridFilmes({ filmes }: GridProps) {
  const navigate = useNavigate();

  const handleRotaFilme = (id: number) => {
    navigate(`/filmes/${id}`)
  }

  if (filmes.length === 0) {
    return (
      <section className='gridFilmesUnresult'>
        <h2 className='titleGridFilmes'>Nenhum resultado encontrado.</h2>
        <p className='textGridFilmes'>Tente ajustar seus filtros.</p>
      </section>
    );
  }

  return (
    <section className='gridFilmes'>
      <h2 className='titleGridFilmes'>Resultados da Busca</h2>

      <article className='gridContainer'>
        {filmes.map(filme => (
          <Card
            key={filme.id}
            titulo={filme.titulo}
            categoria={filme.generos}
            tempo={String(filme.duracao)}
            imagem={filme.poster}
            onCardClick={() => handleRotaFilme(filme.id)}
          />
        ))}
      </article>
    </section>
  );
}

export default GridFilmes;