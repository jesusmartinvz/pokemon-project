import styles from "./PokemonFavPage.module.css";

export default function PokemonFavPage() {
  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Mi pokemon favorito</h1>
        <p className={styles.description}>
          Pokemones favoritos
        </p>
      </div>
    </section>
  )
}
