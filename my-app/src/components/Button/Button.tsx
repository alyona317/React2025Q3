
import styles from './Button.module.css';


interface ButtonProps {
  name: string;
  onClick: () => void;
}
export const Button = ({ name, onClick }: ButtonProps) => {


    <button
      className={styles.button}
      onClick={onClick}
    >
      {name}
    </button>

};
