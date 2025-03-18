import CharacterCard from "./CharacterCard";

type CharacterListProps = {
  characters: any[];
};

export default function CharacterList({ characters }: CharacterListProps) {
  return (
    <div className="container">
      <div className="row">
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </div>
  );
}
