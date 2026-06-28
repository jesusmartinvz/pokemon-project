import { Search } from "lucide-react";
import styles from "./SearchBox.module.css";

type SearchBoxProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBox({ value, onChange }: SearchBoxProps) {
  return (
    <label className={styles.searchBox}>
      <input
        className={styles.input}
        type="search"
        value={value}
        placeholder="Buscar Pokémon por nombre..."
        onChange={(e) => onChange(e.target.value)}
      />
      <Search size={18} className={styles.icon} />
    </label>
  );
}
