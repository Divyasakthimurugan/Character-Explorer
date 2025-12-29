import CharacterCard from "./CharacterCard";
import { Character } from "@/types/character";

export default function CharacterGrid({
  characters,
  loading = false,
}: {
  characters: Character[];
  loading?: boolean;
}) {
  if (loading) {
    return <p className="text-center col-span-full">Loading characters...</p>;
  }

  if (characters.length === 0) {
    return <p className="text-center col-span-full">No characters found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {characters.map((char) => (
        <CharacterCard key={char.id} character={char} />
      ))}
    </div>
  );
}
