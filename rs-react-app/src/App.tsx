
import './App.css'
import { Button } from './components/Button/Button'

function App() {

  return (
    <>
      <div>
        <h1>Choose your form</h1>
        <div className="buttonContainer">
          <Button title="Uncontrolled Form" />
          <Button color='blue' title="React Hook Form" />
        </div>
      </div>
    </>
  );
}

export default App
