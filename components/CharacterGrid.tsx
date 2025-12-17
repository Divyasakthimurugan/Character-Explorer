import CharacterCard from "./CharacterCard";
import { Character } from "@/types/character";

export default function CharacterGrid({
  characters,
}: {
  characters: Character[];
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {characters.map((char) => (
        <CharacterCard key={char.id} character={char} />
      ))}
    </div>
  );
}
