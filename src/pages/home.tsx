import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CharacterCard from "../components/CharacterCard";
import "./Home.css";

type CharacterType = {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  type?: string;
  gender?: "Female" | "Male" | "Genderless" | "unknown";
  image: string;
  origin?: { name: string };
  location: { name: string };
  episode: string[];
};

type ApiResponse = {
  info: { count: number; pages: number };
  results: CharacterType[];
};

export default function Home() {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [species, setSpecies] = useState<string>("");
  const [gender, setGender] = useState<string>("");

  const fetchCharacters = async (): Promise<ApiResponse> => {
    const apiUrl = `https://rickandmortyapi.com/api/character?page=${page}&name=${search}&status=${status}&species=${species}&gender=${gender}`;
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Erro ao buscar dados");
    return response.json();
  };

  const {
    data = { info: { count: 0, pages: 1 }, results: [] },
    isLoading,
    isError,
  } = useQuery<ApiResponse>({
    queryKey: ["characters", page, search, status, species, gender],
    queryFn: fetchCharacters,
    staleTime: 300000, // Mantém os dados válidos por 5 minutos antes de refazer a busca
  });

  return (
    <div className="container">
      <h2 className="text-center my-4">
        Total de personagens cadastrados: {data.info.count}
      </h2>

      {/* Filtros */}
      <div className="filters-container">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar personagem..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="form-select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Status: Todos</option>
          <option value="Alive">Vivo</option>
          <option value="Dead">Morto</option>
          <option value="unknown">Desconhecido</option>
        </select>

        <select
          className="form-select"
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
        >
          <option value="">Espécie: Todas</option>
          <option value="Human">Humano</option>
          <option value="Alien">Alienígena</option>
          <option value="Robot">Robô</option>
          <option value="Cronenberg">Cronenberg</option>
        </select>

        <select
          className="form-select"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Gênero: Todos</option>
          <option value="Male">Masculino</option>
          <option value="Female">Feminino</option>
          <option value="Genderless">Sem Gênero</option>
          <option value="unknown">Desconhecido</option>
        </select>

        <button
          className="btn btn-secondary"
          onClick={() => {
            setSearch("");
            setStatus("");
            setSpecies("");
            setGender("");
            setPage(1);
          }}
        >
          ❌ Limpar Filtros
        </button>
      </div>

      {/* Lista de personagens */}
      {isLoading ? (
        <p className="text-center">Carregando...</p>
      ) : isError ? (
        <p className="text-center text-danger">
          Erro ao carregar os personagens.
        </p>
      ) : data.results.length === 0 ? (
        <p className="text-center text-danger">Nenhum personagem encontrado!</p>
      ) : (
        <div className="row">
          {data.results.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      )}

      {/* Paginação */}
      <div className="d-flex justify-content-center align-items-center gap-3 my-4">
        <button
          className="btn btn-outline-primary"
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          disabled={page === 1}
        >
          ⬅ Página Anterior
        </button>

        <span>
          Página {page} de {data.info.pages}
        </span>

        <button
          className="btn btn-outline-primary"
          onClick={() => setPage((prev) => Math.min(data.info.pages, prev + 1))}
          disabled={page === data.info.pages}
        >
          Próxima Página ➡
        </button>
      </div>

      {/* NAVEGAÇÃO LATERAL */}
      {page > 1 && (
        <button
          className="nav-button left"
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
        >
          &#11013;
        </button>
      )}

      {page < data.info.pages && (
        <button
          className="nav-button right"
          onClick={() => setPage((prev) => Math.min(data.info.pages, prev + 1))}
        >
          &#10145;
        </button>
      )}
    </div>
  );
}
