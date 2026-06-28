import styles from "./Pagination.module.css";

type PaginationProps = {
  page: number;
  totalPages: number;
  onPage: (page: number) => void;
};

export default function Pagination({ page, totalPages, onPage }: PaginationProps) {
  const start = Math.max(1, Math.min(page - 2, totalPages - 4));
  const end = Math.min(totalPages, start + 4);
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <div className={styles.pagination}>
      <button
        className={styles.button}
        disabled={page === 1}
        onClick={() => onPage(page - 1)}
      >
        Anterior
      </button>

      {pages.map(n => (
        <button
          key={n}
          className={n === page ? `${styles.button} ${styles.active}` : styles.button}
          onClick={() => onPage(n)}
        >
          {n}
        </button>
      ))}

      <button
        className={styles.button}
        disabled={page === totalPages}
        onClick={() => onPage(page + 1)}
      >
        Siguiente
      </button>
    </div>
  );
}
