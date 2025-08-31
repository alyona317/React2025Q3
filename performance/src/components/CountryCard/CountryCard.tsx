import React from 'react';
import styles from './CountryCard.module.css';
import type { Country } from 'types/co2';

interface CountryCardProps {
  country: Country;
}

export const CountryCard: React.FC<CountryCardProps> = React.memo(({ country }) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{country.country}</h2>
      <p className={styles.meta}>Population: {country.population ?? 'N/A'}</p>
      {country.isoCode && (
        <p className={styles.iso}>ISO Code: {country.isoCode}</p>
      )}

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Year</th>
            <th>Population</th>
            <th>CO₂</th>
            <th>CO₂ / Capita</th>
          </tr>
        </thead>
        <tbody>
          {country.data.map((row) => (
            <tr key={row.year}>
              <td>{row.year}</td>
              <td>{row.population ?? 'N/A'}</td>
              <td>{row.co2 ?? 'N/A'}</td>
              <td>{row.co2_per_capita ?? 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
})
