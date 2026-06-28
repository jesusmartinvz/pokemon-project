export type PokemonStatName = "defense" | "speed" | "hp" | "attack";

export type PokemonItem = {
  id: number;
  name: string;
  image: string;
  types: string[];
};

export type PokemonStat = {
  name: PokemonStatName;
  value: number;
};

export type PokemonDetails = PokemonItem & {
  stats: PokemonStat[];
};

export type PokemonList = {
  total: number;
  pokemons: PokemonItem[];
};
