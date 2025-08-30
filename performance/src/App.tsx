import { useState } from 'react';
import { Suspense } from 'react';
import { co2DataResource } from './api/dataLoader';
import type { Dataset } from 'types/co2';
import { SkeletonImg } from '@components/skeleton/skeleton';
import './App.css'

function CountriesList() {
  const data: Dataset = co2DataResource.read();
  const countries = Object.keys(data);

  return (
    <div>
      <h2>Countries: {countries.length}</h2>
      <ul>
        {countries.slice(0, 20).map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
    </div>
  );
}

function App() {

  return (
    <>
      <div>
        <Suspense fallback={<SkeletonImg/>}>
          <CountriesList />
        </Suspense>
      </div>
      <h1>Vite + React</h1>
    </>
  );
}

export default App
