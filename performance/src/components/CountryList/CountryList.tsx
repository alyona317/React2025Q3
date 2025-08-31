import { useState, useMemo } from 'react';
import { co2DataResource } from '../../api/dataLoader';
import type { Country } from 'types/co2';
import { CountryCard } from '@components/CountryCard/CountryCard';
import { FilterPanel } from '@components/FilterPanel/FilterPanel';

export const CountryList = () => {
  const [filter, setFilter] = useState<{ year?: number }>({});
  const dataset = co2DataResource.read();

  const filteredCountries: Country[] = useMemo(() => {
    // создаём массив стран
    let countries: Country[] = Object.entries(dataset).slice(0,20).map(([key, value]) => ({
      country: value.country, // имя страны
      isoCode: value.iso_code, // ISO код
      population: value.data
        .slice()
        .reverse()
        .find((d) => d.population !== undefined)?.population,
      data: value.data,
    }));

    // если выбран год, фильтруем данные
    if (filter.year) {
      countries = countries
        .map((country) => ({
          ...country,
          data: country.data.filter((row) => row.year === filter.year),
        }))
        .filter((c) => c.data.length > 0);
    }

    return countries;
  }, [dataset, filter.year]);

  return (
    <>
      <FilterPanel onChange={({year}) => setFilter({ year })} />
      <ul>
        {filteredCountries.map((c) => (
          <CountryCard key={c.isoCode || c.country} country={c} />
        ))}
      </ul>
    </>
  );
};
