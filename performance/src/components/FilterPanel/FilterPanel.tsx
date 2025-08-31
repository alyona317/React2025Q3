import { useState } from 'react';
import type { YearFilter } from 'types/co2Filters';
import styles from './FilterPanel.module.css';

interface FiltersPanelProps {
  onChange: (filters: YearFilter) => void;
}

export const FilterPanel: React.FC<FiltersPanelProps> = ({ onChange }) => {
  const [year, setYear] = useState<number | ''>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseInt(e.target.value, 10) : undefined;
    setYear(e.target.value ? parseInt(e.target.value, 10) : '');
    onChange({ year: value });
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Filters</h3>

      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label className={styles.label}>Country</label>
          <input
            className={styles.input}
            type="number"
            value={year}
            onChange={handleChange}
            placeholder="example, 2000"
          />
        </div>
      </div>
    </div>
  );
};
