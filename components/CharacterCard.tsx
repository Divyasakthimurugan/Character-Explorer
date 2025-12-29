import { Character } from "@/types/character";

export default function CharacterCard({ character }: { character: Character }) {
  return (
    <div className="rounded-xl shadow p-4 bg-white">
      <img
        src={character.image}
        alt={character.name}
        width={200}
        height={200}
        className="rounded-lg w-full h-48 object-cover"
      />

      <h3 className="mt-2 font-semibold">{character.name}</h3>

      <p className="text-sm text-gray-600">Status : {character.status}</p>

      <p className="text-sm text-gray-600">Gender : {character.gender}</p>
    </div>
  );
}
