import type { PokemonDetailsResponse } from "../types/pokemon-api.types";
import type { PokemonDetails, PokemonItem, PokemonStatName } from "../types/pokemon.types";

const MAIN_STATS = ["hp", "attack", "defense", "speed"];

export function toPokemonItem(data: PokemonDetailsResponse): PokemonItem {
  return {
    id: data.id,
    name: data.name,
    image: data.sprites.front_default ?? "",
    types: data.types.map(item => item.type.name),
  };
}

export function toPokemonDetails(data: PokemonDetailsResponse): PokemonDetails {
  const stats = data.stats
    .filter(item => MAIN_STATS.includes(item.stat.name))
    .map(item => ({ name: item.stat.name as PokemonStatName, value: item.base_stat }));

  return { ...toPokemonItem(data), stats };
}
