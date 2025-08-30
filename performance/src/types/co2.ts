export interface YearlyData {
  year: number;
  region: string;
  population?: number;
  co2?: number;
  methane?: number;
  oil_co2?: number;
  tempreature_change_from_co2?: number;
  ISO_code?: number;
  co2_per_capita?: number;
}
export type CountryDataset = YearlyData[];

export type Dataset = Record<string, CountryDataset>;