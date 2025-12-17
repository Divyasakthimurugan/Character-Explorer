"use client";


import { Input } from "@/components/ui/input";


export default function SearchInput({ onSearch }: { onSearch: (value: string) => void }) {
return (
<div className="w-full md:w-80">
<Input
placeholder="Search character name..."
onChange={(e) => onSearch(e.target.value)}
/>
</div>
);
}