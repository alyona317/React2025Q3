import { useState} from "react";
import { useNavigate } from "react-router-dom";
import styles from './PokemonItem.module.css';

export const PokemonItem = (props: {name:string} ) => {
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  const handleChange = () => {
    setChecked(!checked);
  };
  return (
    <li onClick={() => navigate(`${props.name}`)} className={styles.item}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        onClick={(e) => e.stopPropagation()}
        className={styles.checkbox}
      />
      <span className={styles.name}> {props.name} </span>
    </li>
  );
};