import { Suspense } from "react";
import CharactersPageClient from "./CharactersPageClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <CharactersPageClient />
    </Suspense>
  );
}
