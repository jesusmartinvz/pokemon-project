import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, XCircle } from "lucide-react";
import TypeLabel from "../../components/TypeLabel/TypeLabel";
import { getPokemonDetails } from "../../api/pokemon-api";
import type { PokemonDetails } from "../../types/pokemon.types";
import styles from "./PokemonDetailPage.module.css";

function DetailSkeleton() {
  return (
    <article className={styles.card}>
      <div className={styles.imageBox}>
        <div className={styles.skImage} />
      </div>
      <div className={styles.content}>
        <div className={styles.skLine} style={{ width: 48, height: 12 }} />
        <div className={styles.skLine} style={{ width: 180, height: 36, marginTop: 10 }} />
        <div className={styles.skLine} style={{ width: 100, height: 22, marginTop: 18 }} />
        <div className={styles.skStats}>
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className={styles.skRow} />
          ))}
        </div>
      </div>
    </article>
  );
}

export function PokemonDetailPage() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let active = true;

    async function load() {
      if (!name) {
        setErrorMessage("Pokémon no encontrado.");
        setIsLoading(false);
        return;
      }

      try {
        const data = await getPokemonDetails(name);
        if (!active) return;
        setPokemon(data);
        setErrorMessage("");
      } catch {
        if (!active) return;
        setErrorMessage("No se pudieron cargar los detalles del Pokémon.");
      } finally {
        if (active) setIsLoading(false);
      }
    }

    void load();

    return () => { active = false; };
  }, [name]);

  if (errorMessage || (!isLoading && !pokemon)) {
    return (
      <section className={styles.page}>
        <div className={styles.error}>
          <XCircle size={44} className={styles.errorIcon} />
          <p>{errorMessage}</p>
          <Link to="/" className={styles.errorLink}>Volver a la lista</Link>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.page}>
      <button className={styles.backBtn} onClick={() => navigate(-1)}>
        <ArrowLeft size={16} />
        Volver
      </button>

      {isLoading ? <DetailSkeleton /> : pokemon && (
        <article className={styles.card}>
          <div className={styles.imageBox}>
            <img className={styles.image} src={pokemon.image} alt={pokemon.name} />
          </div>

          <div className={styles.content}>
            <span className={styles.number}>No. {pokemon.id}</span>

            <h1 className={styles.name}>{pokemon.name}</h1>

            <div className={styles.types}>
              {pokemon.types.map((type) => (
                <TypeLabel key={type} name={type} />
              ))}
            </div>

            <div className={styles.stats}>
              <h2>Estadísticas</h2>
              {pokemon.stats.map((stat) => (
                <div key={stat.name} className={styles.statRow}>
                  <span className={styles.statName}>{stat.name}</span>
                  <div className={styles.statBar}>
                    <span className={styles.statValue} style={{ width: `${Math.min(stat.value, 100)}%` }} />
                  </div>
                  <strong className={styles.statNumber}>{stat.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </article>
      )}
    </section>
  );
}
