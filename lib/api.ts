import { ApiResponse } from "@/types/character";


const BASE_URL = "https://rickandmortyapi.com/api/character";


export async function fetchCharacters(
page: number,
status?: string,
gender?: string
): Promise<ApiResponse> {
const params = new URLSearchParams({
page: page.toString(),
...(status && { status }),
...(gender && { gender }),
});


const res = await fetch(`${BASE_URL}?${params}`);
if (!res.ok) throw new Error("Failed to fetch characters");
return res.json();
}