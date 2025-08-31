import { useState } from 'react';
import { Suspense } from 'react';
import { co2DataResource } from './api/dataLoader';
import type { Dataset } from 'types/co2';
import { SkeletonImg } from '@components/Skeleton/Skeleton';
import { FilterPanel } from '@components/FilterPanel/FilterPanel';
import { CountryList } from '@components/CountryList/CountryList';
import type { CO2Filters } from 'types/co2Filters';
import './App.css'

// function CountriesList() {
//   const data: Dataset = co2DataResource.read();
//   const countries = Object.keys(data);

//   return (
//     <div>
//       <h2>Countries: {countries.length}</h2>
//       <ul>
//         {countries.map((c) => (
//           <li key={c}>{c}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

function App() {
  const [filters, setFilters] = useState<CO2Filters>({});
  return (
    <>
      <h1>CO2 information</h1>

      <div>
        <Suspense fallback={<SkeletonImg />}>
          <CountryList />
        </Suspense>
      </div>
    </>
  );
}

export default App
