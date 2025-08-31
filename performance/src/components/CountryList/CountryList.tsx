import { co2DataResource } from '../../api/dataLoader';
import type { Country } from 'types/co2';
import { CountryCard } from '@components/CountryCard/CountryCard';
export const CountryList = ()=>{

const dataset = co2DataResource.read();
  const countries: Country[] = Object.entries(dataset).map(([key, value]) => ({
    name: value.country,
    isoCode: value.iso_code,
    population: value.data.reverse().find(d => d.population !== undefined)?.population,
    data: value.data
  }));

  return (
    <ul>
      {countries.map((c) => (
        <CountryCard key={c.isoCode || c.name} country={c} />
      ))}
    </ul>
  );
}