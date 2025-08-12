import { Route, Routes, Navigate } from 'react-router-dom';
import { About } from '@pages/About/About';
import { Layout } from '@components/Layout';
import { Homepage } from '@pages/HomePage/Homepage';
import { Welcome } from '@pages/Welcome/Welcome';
import { Error } from '@pages/Error/Error';
import { PokemonDetails } from '@components/PokemonDetails/PokemonDetails';
import './App.css';

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Welcome />} />
          <Route path="about" element={<About />} />

          <Route path="search" element={<Homepage />}>
            <Route path=":name" element={<PokemonDetails />} />
          </Route>

          <Route path="/error" element={<Error />} />
          <Route path="*" element={<Navigate to="/error" replace />} />
        </Route>
        <Route path="*" element={<Navigate to="/error" replace />} />
      </Routes>
    </>
  );
};
