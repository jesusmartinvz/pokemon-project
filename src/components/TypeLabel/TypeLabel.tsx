import styles from "./TypeLabel.module.css";

export type TypeLabelProps = {
  name: string;
};

export default function TypeLabel({ name }: TypeLabelProps) {
  const typeClass = styles[name] ?? styles.defaultType;

  return (
    <span className={styles.type}>
      <span className={`${styles.pill} ${typeClass}`} />
      <span className={styles.label}>{name}</span>
    </span>
  );
}