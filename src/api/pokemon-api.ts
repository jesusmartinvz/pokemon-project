import type { PokemonDetailsResponse, PokemonListResponse, TypeListResponse, TypeDetailResponse } from "../types/pokemon-api.types";
import type { PokemonDetails, PokemonItem, PokemonList } from "../types/pokemon.types";
import { toPokemonItem, toPokemonDetails } from "../mappers/pokemon.mapper";

const API_URL = "https://pokeapi.co/api/v2";

async function getPokemonByUrl(url: string): Promise<PokemonItem> {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Error al cargar la información del pokémon");
  return toPokemonItem(await res.json() as PokemonDetailsResponse);
}

export async function getPokemonList(limit: number, offset: number): Promise<PokemonList> {
  const res = await fetch(`${API_URL}/pokemon?limit=${limit}&offset=${offset}`);
  if (!res.ok) throw new Error("Error al cargar la lista de pokemones, intente nuevamente.");

  const data = await res.json() as PokemonListResponse;
  const pokemons = await Promise.all(data.results.map(({ url }) => getPokemonByUrl(url)));

  return { total: data.count, pokemons };
}

export async function getTypes(): Promise<string[]> {
  const res = await fetch(`${API_URL}/type`);
  if (!res.ok) throw new Error("Error al cargar los tipos");
  const data = await res.json() as TypeListResponse;
  return data.results
    .map(item => item.name)
    .filter(name => name !== "unknown" && name !== "shadow");
}

export async function getPokemonByType(type: string): Promise<PokemonItem[]> {
  const res = await fetch(`${API_URL}/type/${type}`);
  if (!res.ok) throw new Error("Error al cargar pokémon por tipo");
  const data = await res.json() as TypeDetailResponse;
  const slice = data.pokemon.slice(0, 20);
  return Promise.all(slice.map(item => getPokemonByUrl(item.pokemon.url)));
}

export async function getPokemonDetails(name: string): Promise<PokemonDetails> {
  const res = await fetch(`${API_URL}/pokemon/${name.toLowerCase()}`);
  if (!res.ok) throw new Error("Error al cargar la información del pokémon");

  return toPokemonDetails(await res.json() as PokemonDetailsResponse);
}
