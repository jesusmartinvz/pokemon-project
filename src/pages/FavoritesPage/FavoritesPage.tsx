import { useMemo, useState } from "react";
import { Heart, SearchX } from "lucide-react";
import PokemonList from "../../components/PokemonList/PokemonList";
import Pagination from "../../components/Pagination/Pagination";
import SearchBox from "../../components/SearchBox/SearchBox";
import { useFavorites } from "../../hooks/useFavorites";
import styles from "./FavoritesPage.module.css";

const PAGE_SIZE = 20;

export function FavoritesPage() {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const filtered = useMemo(() => {
    const text = searchText.trim().toLowerCase();
    if (!text) return favorites;
    return favorites.filter((pokemon) => pokemon.name.toLowerCase().includes(text));
  }, [favorites, searchText]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const offset = (page - 1) * PAGE_SIZE;
  const visibleFavorites = filtered.slice(offset, offset + PAGE_SIZE);

  function goToPage(next: number) {
    setPage(next);
  }

  function handleSearch(value: string) {
    setSearchText(value);
    setPage(1);
  }

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Mis pokemones favoritos</h1>
        <p className={styles.description}>
          Aquí encontrará un listado de todos su pokemones marcados como favoritos. 
        </p>
        {favorites.length > 0 && (
          <div className={styles.searchPoke}>
            <SearchBox value={searchText} onChange={handleSearch} />
          </div>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className={styles.empty}>
          <Heart size={48} className={styles.emptyIcon} />
          <p className={styles.emptyTitle}>Sin favoritos aún</p>
          <p className={styles.emptyText}>Ve a la lista de Pokémon y guarda tu primer favorito.</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className={styles.empty}>
          <SearchX size={48} className={styles.emptyIcon} />
          <p className={styles.emptyTitle}>Sin resultados</p>
          <p className={styles.emptyText}>No hay favoritos que coincidan con "{searchText}"</p>
        </div>
      ) : (
        <>
          <PokemonList
            pokemons={visibleFavorites}
            isFavorite={isFavorite}
            onFavoriteClick={toggleFavorite}
          />
          <Pagination page={page} totalPages={totalPages} onPage={goToPage} />
        </>
      )}
    </section>
  );
}
