import "./Filmes.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { useLoading } from "../../Contexts/LoadingContext";
import axios from "axios";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import CarrosselFilmes from "../../Components/CarrosselFilmes/CarrosselFilmes";
import GridFilmes from "../../Components/GridFilmes/GridFilmes";
import Filter from "../../Components/Filter/Filter";
import Add from "../../Assets/Icons/add.png";

type FilmeInfo = {
  id: number;
  titulo: string;
  generos: string[];
  duracao: number;
  poster: string;
  imagem: string;
  banner: string;
};

function Filmes() {
  const { setIsLoading } = useLoading();

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [anoMin, setAnoMin] = useState("");
  const [anoMax, setAnoMax] = useState("");
  const [categorias, setCategorias] = useState<string[]>([]);
  const [filmesResult, setFilmesResult] = useState<FilmeInfo[]>([]);
  const [isFiltrando, setIsFiltrando] = useState(false);

  const [debouncedSearch] = useDebounce(searchTerm, 500);

  const handleRotaForm = () => {
    navigate("/form");
  };

  useEffect(() => {
    const filtrosAtivos =
      debouncedSearch.trim() !== "" ||
      anoMin.trim() !== "" ||
      anoMax.trim() !== "" ||
      categorias.length > 0;

    setIsFiltrando(filtrosAtivos);

    if (!filtrosAtivos) {
      setFilmesResult([]);
      return;
    }

    const fetchFilmesFiltrados = async () => {
      setIsLoading(true);

      try {
        const params = new URLSearchParams();

        if (debouncedSearch) params.append("search", debouncedSearch);
        if (anoMin) params.append("ano_min", anoMin);
        if (anoMax) params.append("ano_max", anoMax);
        categorias.forEach((cat) => params.append("categoria", cat));

        const queryString = params.toString();
        const response = await axios.get(
          `http://localhost:8000/filmes?${queryString}`
        );

        setFilmesResult(response.data);
      } catch (err) {
        console.error("Erro ao buscar filmes filtrados:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilmesFiltrados();
  }, [debouncedSearch, anoMin, anoMax, categorias, setIsLoading]);

  const handleCategoriaClick = (nomeCategoria: string) => {
    setCategorias((prevCats) => {
      if (prevCats.includes(nomeCategoria)) {
        return prevCats.filter((cat) => cat !== nomeCategoria);
      } else {
        return [...prevCats, nomeCategoria];
      }
    });
  };

  const handleLimparFiltros = () => {
    setSearchTerm("");
    setAnoMin("");
    setAnoMax("");
    setCategorias([]);
  };

  return (
    <>
      <header>
        <Navbar />
      </header>

      <main className="mainFilmes">
        <article className="headerFilmes">
          <h1>Encontre seu novo clássico!</h1>

          <button className="adicionarFilme" onClick={handleRotaForm}>
            <img src={Add} alt="Ícone adiocionar" />
            Novo Filme
          </button>
        </article>

        <Filter
          searchTerm={searchTerm}
          anoMin={anoMin}
          anoMax={anoMax}
          categoriasSelecionadas={categorias}
          onSearchChange={setSearchTerm}
          onAnoMinChange={setAnoMin}
          onAnoMaxChange={setAnoMax}
          onCategoriaClick={handleCategoriaClick}
          onLimparFiltros={handleLimparFiltros}
        />

        {isFiltrando ? (
          <GridFilmes filmes={filmesResult} />
        ) : (
          <CarrosselFilmes />
        )}

      </main>

      <Footer />
    </>
  );
}

export default Filmes;
