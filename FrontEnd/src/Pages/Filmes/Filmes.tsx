/*
 Página principal que exibe os filmes. Ela possui duas visualizações:
 1. Padrão (sem filtros): Exibe o componente <CarrosselFilmes />.
 2. Com Filtros: Exibe o componente <GridFilmes /> com os resultados da busca.
 A página também gerencia todo o estado dos filtros
 e faz a requisição à API quando um filtro é aplicado.
 */

import "./Filmes.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Hook para "atrasar" a execução de uma função (evitar buscas a cada tecla)
import { useDebounce } from "use-debounce";
import { useLoading } from "../../Contexts/LoadingContext";
import axios from "axios";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import CarrosselFilmes from "../../Components/CarrosselFilmes/CarrosselFilmes";
import GridFilmes from "../../Components/GridFilmes/GridFilmes";
import Filter from "../../Components/Filter/Filter";
import Add from "../../Assets/Icons/add.png";

// Tipagem para as informações do filme (usada no grid/carrossel)
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

  // Estados para os filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [anoMin, setAnoMin] = useState("");
  const [anoMax, setAnoMax] = useState("");
  const [categorias, setCategorias] = useState<string[]>([]);

  // Estado para armazenar os filmes que vêm da busca/filtro
  const [filmesResult, setFilmesResult] = useState<FilmeInfo[]>([]);
  // Estado que controla se algum filtro está ativo (decide se mostra Grid ou Carrossel)
  const [isFiltrando, setIsFiltrando] = useState(false);

  // Cria uma versão "debounced" (atrasada) do searchTerm.
  // Isso evita que a API seja chamada a cada tecla digitada.
  const [debouncedSearch] = useDebounce(searchTerm, 500); // 500ms de atraso

  // Navega para a página de formulário para adicionar um novo filme
  const handleRotaForm = () => {
    navigate("/form");
  };

  // Efeito principal: Roda toda vez que um filtro (debouncedSearch, anoMin, etc.) é alterado.
  useEffect(() => {
    // Verifica se qualquer um dos filtros está preenchido
    const filtrosAtivos =
      debouncedSearch.trim() !== "" ||
      anoMin.trim() !== "" ||
      anoMax.trim() !== "" ||
      categorias.length > 0;

    // Atualiza o estado que controla a visualização
    setIsFiltrando(filtrosAtivos);

    // Se nenhum filtro estiver ativo, limpa os resultados e para a execução
    if (!filtrosAtivos) {
      setFilmesResult([]); // Limpa os resultados para o Grid sumir
      return;
    }

    // Função assíncrona que busca os filmes na API
    const fetchFilmesFiltrados = async () => {
      setIsLoading(true);

      try {
        // 'URLSearchParams' é um jeito fácil de montar a query string
        const params = new URLSearchParams();

        // Adiciona os parâmetros à query apenas se eles existirem
        if (debouncedSearch) params.append("search", debouncedSearch);
        if (anoMin) params.append("ano_min", anoMin);
        if (anoMax) params.append("ano_max", anoMax);
        // Adiciona cada categoria selecionada como um parâmetro 'categoria'
        categorias.forEach((cat) => params.append("categoria", cat));

        const queryString = params.toString();
        const response = await axios.get(
          `http://localhost:8000/filmes?${queryString}` // Envia a requisição com os filtros
        );

        setFilmesResult(response.data); // Atualiza o estado com os resultados
      } catch (err) {
        console.error("Erro ao buscar filmes filtrados:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilmesFiltrados();
  }, [debouncedSearch, anoMin, anoMax, categorias, setIsLoading]);

  // Função de "toggle" para as categorias
  const handleCategoriaClick = (nomeCategoria: string) => {
    setCategorias((prevCats) => {
      // Se a categoria já está no array, remove
      if (prevCats.includes(nomeCategoria)) {
        return prevCats.filter((cat) => cat !== nomeCategoria);
      } else {
        // Se não está, adiciona
        return [...prevCats, nomeCategoria];
      }
    });
  };

  // Limpa todos os filtros, resetando os estados
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

        {/* Componente de Filtro: passa os estados e as funções de callback */}
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

        {/* Renderização Condicional: */}
        {isFiltrando ? (
          // Se 'isFiltrando' (algum filtro ativo) for true, mostra o Grid
          <GridFilmes filmes={filmesResult} />
        ) : (
          // Se for false (nenhum filtro ativo), mostra o Carrossel
          <CarrosselFilmes />
        )}

      </main>

      <Footer />
    </>
  );
}

export default Filmes;