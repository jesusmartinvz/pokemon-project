import styles from "./CardSkeleton.module.css";

export default function CardSkeleton() {
  return (
    <div className={styles.card}>
      <div className={styles.number} />
      <div className={styles.image} />
      <div className={styles.name} />
      <div className={styles.types} />
    </div>
  );
}
