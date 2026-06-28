import { useEffect, useState } from "react";
import { getTypes, getPokemonByType } from "../api/pokemon-api";
import type { PokemonItem } from "../types/pokemon.types";

export function useTypeFilter() {
  const [types, setTypes] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState("");
  const [pokemons, setPokemons] = useState<PokemonItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let active = true;

    async function loadTypes() {
      const data = await getTypes().catch(() => [] as string[]);

      if (!active) return;

      setTypes(data);
    }

    void loadTypes();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!selectedType) return;

    let active = true;

    async function load() {
      try {
        const data = await getPokemonByType(selectedType);

        if (!active) return;

        setPokemons(data);
      } catch {
        if (!active) return;

        setErrorMessage("No se pudieron cargar los pokémon de este tipo.");
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    void load();

    return () => {
      active = false;
    };
  }, [selectedType]);

  function selectType(type: string) {
    const nextType = selectedType === type ? "" : type;

    setSelectedType(nextType);
    setPokemons([]);
    setErrorMessage("");
    setIsLoading(Boolean(nextType));
  }

  return {
    types,
    selectedType,
    pokemons,
    isLoading,
    errorMessage,
    selectType,
  };
}