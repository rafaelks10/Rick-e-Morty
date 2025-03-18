import { useState } from "react";
import CharacterDetails from "./CharacterDetails";
import { statusTraduzido, speciesTraduzida } from "../utils/translations";

type CharacterProps = {
  character: {
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
};

export default function CharacterCard({ character }: CharacterProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="col-md-6 col-lg-4 mb-4 d-flex">
      <div className="card card-custom shadow-lg border-0 rounded-4 d-flex flex-column w-100">
        {/* Imagem do personagem */}
        <div className="text-center p-3">
          <img
            src={character.image}
            alt={character.name}
            className="img-fluid rounded"
            style={{ width: "120px", height: "120px", objectFit: "cover" }}
          />
        </div>

        {/* Informações do personagem */}
        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <h5 className="fw-bold text-primary text-center">
              {character.name}
            </h5>
            <p className="small text-muted">
              🏷 <strong>Espécie:</strong>{" "}
              {speciesTraduzida[character.species] || character.species}
            </p>
            <p className="small text-muted">
              📍 <strong>Localização:</strong>{" "}
              <span className="d-block text-break">
                {character.location.name}
              </span>
            </p>
            <p className="small text-muted">
              🎬 <strong>Primeiro episódio:</strong>{" "}
              {character.episode[0]?.split("/").pop() || "Desconhecido"}
            </p>
          </div>

          {/* Botão de detalhes */}
          <button
            className="btn btn-primary btn-sm mt-3 align-self-center w-100"
            onClick={() => setShowDetails(true)}
          >
            Ver Detalhes
          </button>
        </div>
      </div>

      {/* Modal de detalhes */}
      {showDetails && (
        <CharacterDetails
          character={{
            ...character,
            type: character.type || "Desconhecido",
            gender: character.gender || "unknown",
            origin: character.origin || { name: "Desconhecido" },
          }}
          onClose={() => setShowDetails(false)}
        />
      )}
    </div>
  );
}
