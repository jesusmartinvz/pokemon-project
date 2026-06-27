import styles from "./HomePage.module.css"

export default function HomePage() {
  return (
    <section className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Busca tu pokemon</h1>
        <p className={styles.description}>
          Lista de pokemones
        </p>
      </div>
    </section>
  );
}
