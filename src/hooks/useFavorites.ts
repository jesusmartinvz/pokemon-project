import { useEffect, useState } from "react";
import type { PokemonItem } from "../types/pokemon.types";

const FAVORITES_KEY = "favoritePokemons";

function getLocalFavorites(): PokemonItem[] {
  const savedData = localStorage.getItem(FAVORITES_KEY);

  if (!savedData) {
    return [];
  }

  try {
    return JSON.parse(savedData) as PokemonItem[];
  } catch {
    return [];
  }
}

function saveFavorites(favorites: PokemonItem[]) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<PokemonItem[]>(getLocalFavorites);

  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  function isFavorite(pokemonName: string) {
    return favorites.some((pokemon) => pokemon.name === pokemonName);
  }

  function toggleFavorite(pokemon: PokemonItem) {
    const saved = isFavorite(pokemon.name);

    if (saved) {
      setFavorites((currentFavorites) =>
        currentFavorites.filter((item) => item.name !== pokemon.name),
      );

      return;
    }

    setFavorites((currentFavorites) => [...currentFavorites, pokemon]);
  }

  return {
    favorites,
    isFavorite,
    toggleFavorite,
  };
}