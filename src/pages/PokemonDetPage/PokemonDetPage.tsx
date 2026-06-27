import { Link, useParams } from "react-router-dom";
import styles from "./PokemonDetPage.module.css";

type PokemonRouteParams = {
  name: string;
};

export default function PokemonDetPage() {
  const { name } = useParams<PokemonRouteParams>();
  return (
    <section className={styles.page}>
      <Link to="/" className={styles.backLink}>
        Regresar a la lista
      </Link>
      
    <div className={styles.card}>
        <h1 className={styles.title}>{name ?? "Pokemon"}</h1>
        <p className={styles.description}>
            --
        </p>
    </div>
    </section>

  );
}
