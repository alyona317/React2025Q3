import { createResource } from '../utils/createResource';
import type { Dataset } from 'types/co2';
import type { CO2Filters } from 'types/co2Filters';



async function fetchCO2Data(): Promise<Dataset> {
  const response = await fetch(
    'https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json'
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status}`);
  }
  const data: Dataset = await response.json();
  return data;
}

export const co2DataResource = createResource(fetchCO2Data());
