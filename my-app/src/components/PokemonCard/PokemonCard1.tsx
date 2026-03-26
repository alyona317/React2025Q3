import type { PokemonInfo } from '@customTypes/pokemon';

export const PokemonCard1: React.FC<{ info: PokemonInfo }> = ({ info }) => {
  return (
    <div>
      <div className="cardContainer">
        <div className="cardInfo">
          <div className="cardImg">
            <div className="pokemonNumberContainer">
              <span className="pokemonNumber">{info.number}</span>
            </div>
            <img src={info.imageUrl} alt="profile photo" />
          </div>
          <div className="cardDescription">
            <h2 className="pokemonName">{info.name}</h2>
            <div className="tagContainer">
              <span className="pokemonTag">Types: {info.types.join(', ')}</span>
              <span className="pokemonTag">Base XP: {info.baseExperience}</span>
              <span className="pokemonTag">Height: {info.height} cm</span>
              <span className="pokemonTag">Weight: {info.weight} kg</span>
            </div>
            <div className="abilitiesContainer">
              <p className="pokemonAbilities">
                Abilities: {info.abilities.join(', ')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
