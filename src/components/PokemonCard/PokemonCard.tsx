import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import styles from "./PokemonCard.module.css";
import type { PokemonItem } from "../../types/pokemon.types";
import TypeLabel from "../TypeLabel/TypeLabel";

type PokemonCardProps = {
  pokemon: PokemonItem;
  isFavorite: boolean;
  onFavoriteClick: (pokemon: PokemonItem) => void;
};

export default function PokemonCard({
  pokemon,
  isFavorite,
  onFavoriteClick,
}: PokemonCardProps) {
  const number = `No. ${pokemon.id}`;

  return (
    <article className={styles.card}>
      <Link to={`/pokemon/${pokemon.name}`} className={styles.cardLink}>
        <span className={styles.number}>{number}</span>

        <img
          className={styles.image}
          src={pokemon.image}
          alt={pokemon.name}
          loading="lazy"
        />

        <h3 className={styles.name}>{pokemon.name}</h3>

        <div className={styles.types}>
          {pokemon.types.map((type, index) => (
            <span key={type} className={styles.typeItem}>
              <TypeLabel name={type} />
              {index < pokemon.types.length - 1 && (
                <span className={styles.separator}>·</span>
              )}
            </span>
          ))}
        </div>
      </Link>

      <button
        type="button"
        className={styles.favoriteButton}
        aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
        onClick={() => onFavoriteClick(pokemon)}
      >
        <Heart
          size={16}
          strokeWidth={2}
          fill={isFavorite ? "#ef4444" : "none"}
          stroke={isFavorite ? "#ef4444" : "#94a3b8"}
        />
      </button>
    </article>
  );
}
