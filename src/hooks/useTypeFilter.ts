import { useEffect, useState } from "react";
import { getTypes, getPokemonByTypePaged } from "../api/pokemon-api";
import type { PokemonItem } from "../types/pokemon.types";

const PAGE_SIZE = 20;

export function useTypeFilter() {
  const [types, setTypes] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState("");
  const [pokemons, setPokemons] = useState<PokemonItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
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
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!selectedType) return;

    let active = true;
    const offset = (page - 1) * PAGE_SIZE;

    async function load() {
      try {
        const data = await getPokemonByTypePaged(selectedType, PAGE_SIZE, offset);
        if (!active) return;
        setPokemons(data.pokemons);
        setTotal(data.total);
      } catch {
        if (!active) return;
        setErrorMessage("No se pudieron cargar los pokémon de este tipo.");
      } finally {
        if (active) setIsLoading(false);
      }
    }

    void load();
    return () => { active = false; };
  }, [selectedType, page]);

  function selectType(type: string) {
    const nextType = selectedType === type ? "" : type;
    setSelectedType(nextType);
    setPokemons([]);
    setTotal(0);
    setPage(1);
    setErrorMessage("");
    setIsLoading(Boolean(nextType));
  }

  function goToTypePage(next: number) {
    setIsLoading(true);
    setPokemons([]);
    setPage(next);
  }

  return {
    types,
    selectedType,
    pokemons,
    total,
    page,
    isLoading,
    errorMessage,
    selectType,
    goToTypePage,
  };
}
