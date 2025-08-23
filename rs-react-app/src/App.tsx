import './App.css'
import { Button } from './components/Button/Button'
import { NativeForm } from '@components/NativeForm/NativeForm';
import { useState, type ChangeEvent } from 'react';

function App() {

  return (
    <>
      <div>
        <h1>Choose your form</h1>
        <div className="buttonContainer">
          <Button title="Uncontrolled Form" />
          <Button color="blue" title="React Hook Form" />
        </div>
        <NativeForm/>
      </div>
    </>
  );
}

export default App
