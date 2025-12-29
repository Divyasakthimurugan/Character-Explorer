"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import CharacterGrid from "@/components/CharacterGrid";
import { Character } from "@/types/character";

export default function CharactersPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [search, setSearch] = useState(searchParams.get("name") || "");
  const [status, setStatus] = useState(searchParams.get("status") || "");
  const [gender, setGender] = useState(searchParams.get("gender") || "");
  const [species, setSpecies] = useState(searchParams.get("species") || "");
  const [page, setPage] = useState(Number(searchParams.get("page") || 1));

  const [characters, setCharacters] = useState<Character[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Sync URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("name", search);
    if (status) params.set("status", status);
    if (gender) params.set("gender", gender);
    if (species) params.set("species", species);
    params.set("page", String(page));

    router.replace(`/?${params.toString()}`);
  }, [search, status, gender, species, page, router]);

  // Fetch data
  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      const params = new URLSearchParams();
      params.set("page", page.toString());
      if (search) params.set("name", search);
      if (status) params.set("status", status);
      if (gender) params.set("gender", gender);
      if (species) params.set("species", species);

      try {
        const res = await fetch(
          `https://rickandmortyapi.com/api/character/?${params.toString()}`
        );
        const data = await res.json();

        setCharacters(data.results || []);
        setTotalPages(data.info?.pages || 1);
      } catch {
        setCharacters([]);
        setTotalPages(1);
      }

      setLoading(false);
    }

    fetchData();
  }, [search, status, gender, species, page]);

  return (
    <main className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Rick & Morty Character Explorer
      </h1>

      {/* 🔍 SEARCH + FILTERS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search character..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border p-2 rounded"
        />

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
          <option value="mythological creature">
            Mythological Creature
          </option>
        </select>
      </div>

      {/* 🧱 GRID */}
      <CharacterGrid characters={characters} loading={loading} />

      {/* 📄 PAGINATION */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="border px-4 py-2 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          className="border px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </main>
  );
}
