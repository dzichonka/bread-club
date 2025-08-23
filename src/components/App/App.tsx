import Members from '@/components/Members/Members';

function App() {
  return (
    <div className="container">
      <main className="section">
        <h1>The Bread Club App</h1>
        <p>
          Do you identify yourself as bread? Welcome to the club! Here you’ll
          find like-minded bread enthusiasts.
        </p>
        <div>
          🍞 Not sure what kind of bread you are? Take the{' '}
          <a className="btn" href="https://w-o-s.ru/article/19262">
            test
          </a>{' '}
          and discover your true grain.
        </div>
        <div>
          🥐 Ready to join? Fill out the form and become part of our community.
        </div>
        <p>
          Register in the Bread Club as yourself... or as your bread
          personality!
        </p>
        <button className="btn" type="button">
          Register as human
        </button>
        <button className="btn" type="button">
          Register as bread
        </button>
        <div className="mt-8 flex justify-center flex-col items-center">
          <h2>Our Members</h2>
          <Members />
        </div>
      </main>
    </div>
  );
}

export default App;
