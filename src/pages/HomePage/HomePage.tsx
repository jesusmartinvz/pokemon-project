import { useMemo, useState } from "react";
import { SearchX } from "lucide-react";
import PokemonList from "../../components/PokemonList/PokemonList";
import CardSkeleton from "../../components/CardSkeleton/CardSkeleton";
import SearchBox from "../../components/SearchBox/SearchBox";
import Pagination from "../../components/Pagination/Pagination";
import { useFavorites } from "../../hooks/useFavorites";
import { usePokemonList } from "../../hooks/usePokemonList";
import { useTypeFilter } from "../../hooks/useTypeFilter";
import styles from "./HomePage.module.css";

const PAGE_SIZE = 20;

export default function HomePage() {
  const [searchText, setSearchText] = useState("");

  const { pokemons, page, total, isLoading, errorMessage, goToPage, reloadList } = usePokemonList();
  const { types, selectedType, pokemons: typePokemons, isLoading: typeLoading, errorMessage: typeError, selectType } = useTypeFilter();
  const { isFavorite, toggleFavorite } = useFavorites();

  const totalPages = Math.ceil(total / PAGE_SIZE);
  const activePokemons = selectedType ? typePokemons : pokemons;
  const activeLoading = selectedType ? typeLoading : isLoading;
  const activeError = selectedType ? typeError : errorMessage;

  const visiblePokemons = useMemo(() => {
    const text = searchText.trim().toLowerCase();
    if (!text) return activePokemons;
    return activePokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(text));
  }, [activePokemons, searchText]);

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Busca tu pokemón</h1>
        <p className={styles.description}>
          Busca tu pokemon por nombre o por tipo, visualiza sus detalles y guarda a tus favoritos.
        </p>
        <div className={styles.searchPoke}>
          <SearchBox value={searchText} onChange={setSearchText} />
        </div>

        {types.length > 0 && (
          <div className={styles.typeFilter}>
            {types.map((type) => (
              <button
                key={type}
                type="button"
                className={type === selectedType ? `${styles.typeBtn} ${styles.typeBtnActive}` : styles.typeBtn}
                onClick={() => selectType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        )}
      </div>

      {activeLoading && (
        <div className={styles.skeletonGrid}>
          {Array.from({ length: 20 }, (_, i) => <CardSkeleton key={i} />)}
        </div>
      )}

      {!activeLoading && activeError && (
        <div className={styles.error}>
          <p>{activeError}</p>
          {!selectedType && <button type="button" onClick={reloadList}>Intentar de nuevo</button>}
        </div>
      )}

      {!activeLoading && !activeError && (
        visiblePokemons.length === 0
          ? (
            <div className={styles.empty}>
              <SearchX size={48} className={styles.emptyIcon} />
              <p className={styles.emptyTitle}>Sin resultados</p>
              <p className={styles.emptyText}>No se encontraron datos que contenga la palabra "{searchText}"</p>
            </div>
          )
          : <PokemonList pokemons={visiblePokemons} isFavorite={isFavorite} onFavoriteClick={toggleFavorite} />
      )}

      {!selectedType && totalPages > 1 && (
        <Pagination page={page} totalPages={totalPages} onPage={goToPage} />
      )}
    </section>
  );
}
