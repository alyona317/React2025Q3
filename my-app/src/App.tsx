import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import { About } from './pages/About';
import { Layout } from './components/Layout';
import { Homepage } from './components/HomePage';
import { Welcome } from './pages/Welcome';
import { Error } from './pages/Error';
import { PokemonDetails } from './components/PokemonDetails';
import './style/variable.css';

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
      </Routes>
    </>
  );
};
