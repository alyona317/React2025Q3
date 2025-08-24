import { useState } from 'react';
import './App.css';
import { Button } from './components/Button/Button';
import { NativeForm } from '@components/NativeForm/NativeForm';
import { ReactForm } from '@components/ReactForm/ReactForm';
import { Modal } from '@components/Modal/Modal';

function App() {
  const [isFirstOpen, setFirstOpen] = useState(false);
  const [isSecondOpen, setSecondOpen] = useState(false);

  return (
    <>
      <div>
        <h1>Choose your form</h1>
        <div className="buttonContainer">
          <Button
            title="Uncontrolled Form"
            onclick={() => setFirstOpen(true)}
          />
          <Button
            color="blue"
            title="React Hook Form"
            onclick={() => setSecondOpen(true)}
          />

          <Modal isOpen={isFirstOpen} onClose={() => setFirstOpen(false)}>
            <NativeForm />
          </Modal>

          <Modal isOpen={isSecondOpen} onClose={() => setSecondOpen(false)}>
            <ReactForm/>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default App;
