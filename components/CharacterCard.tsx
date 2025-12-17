import { Character } from "@/types/character";
import Image from "next/image";

export default function CharacterCard({ character }: { character: Character }) {
  return (
    <div className="rounded-xl shadow p-4 bg-white">
      <Image
        src={character.image}
        alt={character.name}
        width={200}
        height={200}
        className="rounded-lg"
      />

      <h3 className="mt-2 font-semibold">{character.name}</h3>

      <p className="text-sm text-gray-600">{character.status}</p>

      <p className="text-sm text-gray-600">{character.gender}</p>
    </div>
  );
}
