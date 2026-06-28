import { useEffect, useState } from "react";
import type { PokemonItem } from "../types/pokemon.types";
import { getPokemonList } from "../api/pokemon-api";

const PAGE_SIZE = 20;

export function usePokemonList() {
  const [pokemons, setPokemons] = useState<PokemonItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const offset = (page - 1) * PAGE_SIZE;

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const data = await getPokemonList(PAGE_SIZE, offset);
        if (!active) return;
        setPokemons(data.pokemons);
        setTotal(data.total);
        setErrorMessage("");
      } catch {
        if (!active) return;
        setErrorMessage("Ocurrió un error al cargar los pokemones. Intenta nuevamente.");
      } finally {
        if (active) setIsLoading(false);
      }
    }

    void load();

    return () => { active = false; };
  }, [offset, reload]);

  function goToPage(n: number) {
    setIsLoading(true);
    setErrorMessage("");
    setPage(n);
  }

  function reloadList() {
    setIsLoading(true);
    setErrorMessage("");
    setReload(n => n + 1);
  }

  return {
    pokemons,
    page,
    total,
    isLoading,
    errorMessage,
    goToPage,
    reloadList,
  };
}
