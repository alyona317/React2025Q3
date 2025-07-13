import './App.css';
import { Component } from 'react';
import { Search } from './components/Search';
import { ShowResult } from './components/ShowResult';
import { PokemonLoader } from './components/PokemonLoader';

interface State {
  pokemonName: string;
}

export class App extends Component<object, State> {
  state: State = {
    pokemonName: '',
  };
  handleSearch = (name: string) => {
    this.setState({ pokemonName: name });
    localStorage.setItem('pokemonName', name);
  };
  componentDidMount() {
    const savedName = localStorage.getItem('pokemonName');
    if (savedName) {
      this.setState({ pokemonName: savedName });
    }
  }
  render() {
    return (
      <div style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'Arial' }}>
        <h2>Search pokemon</h2>
        <Search onSearch={this.handleSearch} />
        <PokemonLoader pokemonName={this.state.pokemonName}>
          {({ abilities, loading, error, pokemonName }) => (
            <ShowResult
              abilities={abilities}
              loading={loading}
              error={error}
              pokemonName={pokemonName}
            />
          )}
        </PokemonLoader>
      </div>
    );
  }
}
