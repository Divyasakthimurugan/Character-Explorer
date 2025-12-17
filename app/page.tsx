"use client";

import CharacterCard from "@/components/CharacterCard";
import { useState, useEffect } from "react";

interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
  gender: string;
  species: string;
}

export default function Page() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [gender, setGender] = useState("");
  const [species, setSpecies] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      const params = new URLSearchParams();
      params.append("page", page.toString());
      if (search) params.append("name", search);
      if (status) params.append("status", status);
      if (gender) params.append("gender", gender);
      if (species) params.append("species", species);

      const res = await fetch(
        `https://rickandmortyapi.com/api/character/?${params.toString()}`
      );

      const data = await res.json();

      setCharacters(data.results || []);
      setTotalPages(data.info?.pages || 1);
      setLoading(false);
    }

    fetchData();
  }, [search, status, gender, species, page]);

  return (
    <main className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Rick & Morty Character Explorer
      </h1>

      {/* SEARCH + FILTERS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search character..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border p-2 rounded w-full"
        />

        {/* STATUS */}
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          className="border p-2 rounded"
        >
          <option value="">Status</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>

        {/* GENDER */}
        <select
          value={gender}
          onChange={(e) => {
            setGender(e.target.value);
            setPage(1);
          }}
          className="border p-2 rounded"
        >
          <option value="">Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>

        {/* SPECIES */}
        <select
          value={species}
          onChange={(e) => {
            setSpecies(e.target.value);
            setPage(1);
          }}
          className="border p-2 rounded"
        >
          <option value="">Species</option>
          <option value="human">Human</option>
          <option value="alien">Alien</option>
          <option value="robot">Robot</option>
          <option value="mythological creature">Mythological Creature</option>
        </select>
      </div>

      {loading && <p>Loading...</p>}

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      
          {characters.map((character: Character) => (
              
              <CharacterCard key={character.id} character={character} />
            ))}
         
        
      </div>

      {/* PAGINATION */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="border px-4 py-2 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="flex items-center">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="border px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </main>
  );
}
