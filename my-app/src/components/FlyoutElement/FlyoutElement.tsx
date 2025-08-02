import styles from './FlyoutElement.module.css'
import { Button } from '../Button/Button';

export const FlyoutElement = ()=>{

return (
  <div>
    <p>
      <span className="style.count"></span> items are selected
    </p>
    <div className="style.buttons">
      <Button name="Download" />
      <Button name="Unselect all" />
    </div>
  </div>
);
}