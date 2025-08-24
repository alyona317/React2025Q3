import styles from './Button.module.css';
export const Button = ({ ...props }) => {
  return (
    <button
      className={
        props.color === 'blue'
          ? styles.gradientBlueButton
          : styles.gradientPinkButton
      }
      onClick={props.onclick}
    >
      {props.title}
    </button>
  );
};
