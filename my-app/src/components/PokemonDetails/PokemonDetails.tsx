import styles from './PokemonDetails.module.css'
import type { PokemonInfo } from '@customTypes/pokemon';

interface PokemonDetailsProps {
  info: PokemonInfo;
}

export default function PokemonDetails({ info }: PokemonDetailsProps) {

  return (
    <div className={styles.container}>
      <h2 className={styles.cardTitle}>Information about {info.name}</h2>
      <h2 className={styles.cardTitle}>
        {info.sprite && <img src={info.sprite} alt="pokemon" />}
      </h2>
      <p className={styles.cardInfo}>
        <strong>Types:</strong> {info.types.join(', ')}
      </p>
      <p className={styles.cardInfo}>
        <strong>Height:</strong> {info.height}
      </p>
      <p className={styles.cardInfo}>
        <strong>Weight:</strong> {info.weight}
      </p>
      <p className={styles.cardInfo}>
        <strong>Base XP:</strong> {info.baseExperience}
      </p>
      <p className={styles.cardInfo}>
        <strong>Abilities:</strong> {info.abilities.join(', ')}
      </p>
    </div>
  );
};
