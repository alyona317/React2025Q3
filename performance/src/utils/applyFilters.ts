// utils/applyFilters.ts
import type { Dataset, Country } from 'types/co2';
import type { CO2Filters } from 'types/co2Filters';

export function applyFilters(
  dataset: Dataset,
  filters?: CO2Filters
): Country[] {
  let countries: Country[] = Object.entries(dataset).map(
    ([country, yearlyData]) => ({
      country,
      data: yearlyData,
    })
  );

  // 🔹 фильтр по названию страны
  if (filters?.countryName) {
    countries = countries.filter((c) =>
      c.country.toLowerCase().includes(filters.countryName!.toLowerCase())
    );
  }

  // 🔹 фильтр по населению
  if (filters?.minPopulation || filters?.maxPopulation) {
    countries = countries.map((c) => ({
      ...c,
      data: c.data.filter((row) => {
        if (
          filters.minPopulation &&
          (row.population ?? 0) < filters.minPopulation
        ) {
          return false;
        }
        if (
          filters.maxPopulation &&
          (row.population ?? 0) > filters.maxPopulation
        ) {
          return false;
        }
        return true;
      }),
    }));
  }

  // 🔹 фильтр по диапазону лет
  if (filters?.year ) {
    countries = countries.map((c) => ({
      ...c,
      data: c.data.filter((row) => {
        if (filters.year !== row.year ) return false;
        return true;
      }),
    }));
  }

  return countries;
}
