export interface Country {
  name: string;
  isoCode?: string;
  population?: number;
  data: YearlyData[];
}
export interface YearlyData {
  year: number;
  population?: number;
  co2?: number;
  co2_per_capita?: number;
}

export type CountryDataset = YearlyData[];

export type Dataset = Record<
  string,
  {
    country: string; 
    iso_code?: string; 
    data: YearlyData[];
  }
>;