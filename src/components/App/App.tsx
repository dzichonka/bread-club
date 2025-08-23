import Members from '@/components/Members/Members';
import Portal from '@/components/Portal/Portal';
import HookForm from '@/components/HookForm/HookForm';
import { useState } from 'react';
import UncontrolledForm from '@/components/UncontrolledForm/UncontrolledForm';

function App() {
  const [openForm, setOpenForm] = useState<'uncontrolled' | 'hook' | null>(
    null
  );
  return (
    <div className="container">
      <Portal isOpen={openForm !== null} onClose={() => setOpenForm(null)}>
        {openForm === 'uncontrolled' && <UncontrolledForm />}
        {openForm === 'hook' && <HookForm />}
      </Portal>
      <main className="section">
        <h1>🥯 The Bread Club App 🥖</h1>
        <p>
          Do you identify yourself as bread? Welcome to the club! Here you’ll
          find like-minded bread enthusiasts. 🫓
        </p>
        <div>
          🍞 Not sure what kind of bread you are? Take the{' '}
          <a className="btn-icon" href="https://w-o-s.ru/article/19262">
            test
          </a>{' '}
          and discover your true grain. 🥪
        </div>
        <div>
          🥐 Ready to join? Fill out the form and become part of our community.
        </div>
        <p>
          Register in the Bread Club as yourself... or as your bread
          personality!
        </p>
        <div className="flex gap-4 justify-center">
          {' '}
          <button
            className="btn"
            type="button"
            onClick={() => setOpenForm('uncontrolled')}
          >
            Register as human
          </button>
          <button
            className="btn"
            type="button"
            onClick={() => setOpenForm('hook')}
          >
            Register as bread
          </button>
        </div>
        <div className="mt-8 flex justify-center flex-col items-center">
          <Members />
        </div>
      </main>
    </div>
  );
}

export default App;
