import {
  statusTraduzido,
  speciesTraduzida,
  genderTraduzido,
} from "../utils/translations";

type CharacterDetailsProps = {
  character: {
    name: string;
    status: "Alive" | "Dead" | "unknown";
    species: string;
    type: string;
    gender: "Female" | "Male" | "Genderless" | "unknown";
    image: string;
    origin: { name: string };
    location: { name: string };
    episode: string[];
  };
  onClose: () => void;
};

export default function CharacterDetails({
  character,
  onClose,
}: CharacterDetailsProps) {
  return (
    <div
      className="modal show d-block"
      tabIndex={-1}
      role="dialog"
      style={{ background: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p-3">
          <div className="modal-header border-0">
            <h5 className="modal-title fw-bold">{character.name}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body text-center">
            {/* Imagem */}
            <img
              src={character.image}
              alt={character.name}
              className="img-fluid rounded shadow-sm mb-3"
              style={{ width: "60%" }}
            />

            {/* Informações do personagem */}
            <div className="text-start px-3">
              <p className="fw-bold text-center">
                {statusTraduzido[character.status]} -{" "}
                {speciesTraduzida[character.species] || character.species}
              </p>
              <p>
                <strong>🆔 Tipo:</strong> {character.type}
              </p>
              <p>
                <strong>🌀 Gênero:</strong> {genderTraduzido[character.gender]}
              </p>
              <p>
                <strong>🌍 Origem:</strong> {character.origin.name}
              </p>
              <p>
                <strong>📍 Localização Atual:</strong> {character.location.name}
              </p>
              <p>
                <strong>🎬 Total de Episódios:</strong>{" "}
                {character.episode.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
