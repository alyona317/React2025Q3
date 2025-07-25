import {Route, Routes} from 'react-router-dom';
import './App.css';
import { About } from './pages/About';
import { Navbar } from './components/NavBar';
import { Layout } from './components/Layout';
import { Homepage } from './components/HomePage';

export const App = ()=>{
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="about" element={<About />} />
          <Route path="search" element={<Homepage />} />
        </Route>
      </Routes>
    </>
  );
}
