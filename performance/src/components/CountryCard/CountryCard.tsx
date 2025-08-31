import styles from './CountryCard.module.css';
import type { Country } from 'types/co2';


interface CountryCardProps {
  country: Country;
  key: string;
}

export const CountryCard: React.FC<CountryCardProps> = ({ country, key }) => {
  return (
    <div className="border rounded-2xl p-4 shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-2">{country.name}</h2>
      <p className="text-gray-700">Population: {country.population ?? 'N/A'}</p>
      {country.isoCode && (
        <p className="text-gray-500">ISO Code: {country.isoCode}</p>
      )}

      <table className="w-full border-collapse mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1 text-left">Year</th>
            <th className="border px-2 py-1 text-left">Population</th>
            <th className="border px-2 py-1 text-left">CO₂</th>
            <th className="border px-2 py-1 text-left">CO₂ / Capita</th>
          </tr>
        </thead>
        <tbody>
          {country.data.map((row) => (
            <tr key={row.year}>
              <td className="border px-2 py-1">{row.year}</td>
              <td className="border px-2 py-1">{row.population ?? 'N/A'}</td>
              <td className="border px-2 py-1">{row.co2 ?? 'N/A'}</td>
              <td className="border px-2 py-1">
                {row.co2_per_capita ?? 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};