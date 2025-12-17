import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url);

    const page = searchParams.get("page") || "1";
    const name = searchParams.get("name") || "";
    const status = searchParams.get("status") || "";
    const gender = searchParams.get("gender") || "";

    // Build API URL
    const apiUrl = new URL("https://rickandmortyapi.com/api/character");
    apiUrl.searchParams.append("page", page);
    if (name) apiUrl.searchParams.append("name", name);
    if (status) apiUrl.searchParams.append("status", status);
    if (gender) apiUrl.searchParams.append("gender", gender);

    // Fetch data from Rick & Morty API
    const res = await fetch(apiUrl.toString());
    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch characters" },
      { status: 500 }
    );
  }
}
