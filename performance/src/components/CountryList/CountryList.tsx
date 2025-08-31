import { useState } from 'react';
import { co2DataResource } from '../../api/dataLoader';
import type { Country } from 'types/co2';
import { CountryCard } from '@components/CountryCard/CountryCard';
import { FilterPanel } from '@components/FilterPanel/FilterPanel';


export const CountryList = ()=>{
  const [filter, setFilter] = useState<{ year?: number }>({});
const dataset = co2DataResource.read();
  const countries: Country[] = Object.entries(dataset).map(([key, value]) => ({
    country: value.country,
    isoCode: value.iso_code,
    population: value.data.reverse().find((d) => d.population !== undefined)
      ?.population,
    data: value.data,
  }));

  const filtredCountries = filter.year ? countries.map((country)=>(
    {
      ...country, data: country.data.filter((row)=> row.year === filter.year)
    }
  ))
  .filter((c)=> c.data.length > 0)
  : countries

  return (
    <>
      <FilterPanel onChange={setFilter} />
      <ul>
        {filtredCountries.map((c) => (
          <CountryCard key={c.isoCode || c.country} country={c} />
        ))}
      </ul>
    </>
  );
}