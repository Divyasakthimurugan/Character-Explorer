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

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("name", search);
    if (status) params.set("status", status);
    if (gender) params.set("gender", gender);
    if (species) params.set("species", species);
    params.set("page", String(page));

    router.replace(`/?${params.toString()}`);
  }, [search, status, gender, species, page, router]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      const params = new URLSearchParams();
      params.append("page", page.toString());
      if (search) params.append("name", search);
      if (status) params.append("status", status);
      if (gender) params.append("gender", gender);
      if (species) params.append("species", species);

      try {
        const res = await fetch(
          `https://rickandmortyapi.com/api/character/?${params.toString()}`
        );
        const data = await res.json();

        setCharacters(data.results || []);
        setTotalPages(data.info?.pages || 1);
      } catch (err) {
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

      {/* filters + grid + pagination (same as before) */}
      <CharacterGrid characters={characters} loading={loading} />
    </main>
  );
}
