import { useEffect, useState } from 'react';
import '../App.css';
import { Search } from './Search';
import { PokemonCard } from './PokemonCard';
import { PokemonList } from './PokemonList';
import { PokemonLoader } from './PokemonLoader';

export  const Homepage = ()=>{
  const [searchTerm, setSearchTerm] = useState(()=>{
    return localStorage.getItem('search') || ''
  });


  useEffect(() => {
    if (searchTerm.trim()) {
localStorage.setItem('search', searchTerm);
    } 
  }, [searchTerm]);

  


  return (
    <PokemonLoader pokemonName={searchTerm} searchTerm={searchTerm}>
      {({ loading, error, pokemonList, info }) => (
        <div>
          <Search onSearch={setSearchTerm} />
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {info ? (
            <PokemonCard info={info} />
          ) : (
            pokemonList && <PokemonList pokemons={pokemonList} />
          )}
        </div>
      )}
    </PokemonLoader>
  );
}

// export class App extends Component<object, State> {
//   state: State = {
//     pokemonName: '',
//   };
//   handleSearch = (name: string) => {
//     this.setState({ pokemonName: name });
//     localStorage.setItem('pokemonName', name);
//   };
//   componentDidMount() {
//     const savedName = localStorage.getItem('pokemonName');
//     if (savedName) {
//       this.setState({ pokemonName: savedName });
//     }
//   }
//   render() {
//     return (
//       <div style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'Arial' }}>
//         <h2>Search pokemon</h2>
//         <Search onSearch={this.handleSearch} />
//         <PokemonLoader pokemonName={this.state.pokemonName}>
//           {({ abilities, loading, error, pokemonName }) => (
//             <ShowResult
//               abilities={abilities}
//               loading={loading}
//               error={error}
//               pokemonName={pokemonName}
//             />
//           )}
//         </PokemonLoader>
//       </div>
//     );
//   }
// }
