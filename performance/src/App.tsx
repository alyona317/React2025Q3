import { Suspense } from 'react';
import { SkeletonImg } from '@components/Skeleton/Skeleton';
import { CountryList } from '@components/CountryList/CountryList';

import './App.css';

function App() {
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

export default App;
