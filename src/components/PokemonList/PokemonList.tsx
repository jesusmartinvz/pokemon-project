import type { PokemonItem } from "../../types/pokemon.types";
import PokemonCard from "../PokemonCard/PokemonCard";
import styles from "./PokemonList.module.css";

type PokemonListProps = {
  pokemons: PokemonItem[];
  isFavorite: (pokemonName: string) => boolean;
  onFavoriteClick: (pokemon: PokemonItem) => void;
};

export default function PokemonList({
  pokemons,
  isFavorite,
  onFavoriteClick,
}: PokemonListProps) {
  return (
    <div className={styles.list}>
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          isFavorite={isFavorite(pokemon.name)}
          onFavoriteClick={onFavoriteClick}
        />
      ))}
    </div>
  );
}