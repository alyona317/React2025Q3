import type { PokemonInfo } from '@customTypes/pokemon';

export const PokemonCard1 = () => {
  return (
    <div>
      <div className="cardContainer">
        <div className="cardInfo">
          <div className="cardImg">
            <div className="pokemonNumberContainer">
              <span className="pokemonNumber">1455</span>
            </div>
            pic
          </div>
          <div className="cardDescription">
            <h2 className="pokemonName">Name</h2>
            <div className="tagContainer">
              <span className="pokemonTag">Types:</span>
              <span className="pokemonTag">Base XP: 112</span>
              <span className="pokemonTag">Height: 45 cm</span>
              <span className="pokemonTag">Weight: 3 kg</span>
            </div>
            <div className="abilitiesContainer">
              <p className="pokemonAbilities">
                Abilities: abrakadabra abrakadab raabrakadab raabrakad abra
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
