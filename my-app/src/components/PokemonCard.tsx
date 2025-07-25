import type { PokemonInfo } from '../types/pokemon';

export const PokemonCard: React.FC<{ info: PokemonInfo }> = ({ info }) => (
  <div>
    <h2>{info.sprite && <img src={info.sprite} alt="pokemon" />}</h2>
    <p>
      <strong>Types:</strong> {info.types.join(', ')}
    </p>
    <p>
      <strong>Height:</strong> {info.height}
    </p>
    <p>
      <strong>Weight:</strong> {info.weight}
    </p>
    <p>
      <strong>Base XP:</strong> {info.baseExperience}
    </p>
    <p>
      <strong>Abilities:</strong> {info.abilities.join(', ')}
    </p>
  </div>
);
