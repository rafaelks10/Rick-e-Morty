import { useState } from "react";

type SearchBarProps = {
  onSearch: (query: string, status: string) => void;
};

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const handleSearch = () => {
    onSearch(search, status);
  };

  return (
    <div className="d-flex justify-content-center my-4">
      {/* Input de busca por nome */}
      <input
        type="text"
        placeholder="Buscar personagem..."
        className="form-control w-50 me-2"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Filtro por status */}
      <select
        className="form-select me-2"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">Todos</option>
        <option value="alive">Vivo</option>
        <option value="dead">Morto</option>
        <option value="unknown">Desconhecido</option>
      </select>

      {/* Botão de busca */}
      <button onClick={handleSearch} className="btn btn-primary">
        Buscar
      </button>
    </div>
  );
}
