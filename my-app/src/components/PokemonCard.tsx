import type { PokemonInfo } from '../types/pokemon';
import { useTheme } from './ThemeContext';

export const PokemonCard: React.FC<{ info: PokemonInfo }> = ({ info }) => {
    const { theme } = useTheme();
  return (
    <div>
      <h2 className={theme === 'light' ? 'cardTitleLight' : 'cardTitleDark'}>
        {info.sprite && <img src={info.sprite} alt="pokemon" />}
      </h2>
      <p className={theme === 'light' ? 'cardInfoLight' : 'cardInfoDark'}>
        <strong>Types:</strong> {info.types.join(', ')}
      </p>
      <p className={theme === 'light' ? 'cardInfoLight' : 'cardInfoDark'}>
        <strong>Height:</strong> {info.height}
      </p>
      <p className={theme === 'light' ? 'cardInfoLight' : 'cardInfoDark'}>
        <strong>Weight:</strong> {info.weight}
      </p>
      <p className={theme === 'light' ? 'cardInfoLight' : 'cardInfoDark'}>
        <strong>Base XP:</strong> {info.baseExperience}
      </p>
      <p className={theme === 'light' ? 'cardInfoLight' : 'cardInfoDark'}>
        <strong>Abilities:</strong> {info.abilities.join(', ')}
      </p>
    </div>
  );

};
