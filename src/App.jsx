import "./App.css";
import { languages } from "../language";

export default function App() {
  const languageElements = languages.map((language) => 
    <span className="language-card" style={{backgroundColor: language.backgroundColor, color: language.color}}>{language.name}</span>);

  return (
    <>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>
          Guess the word in under 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>
      <main>
        <section className="status-section">
          <p className="status-text">"Farewell HTML & CSS"</p>
        </section>
        <div className="languages-wrapper">{languageElements}</div>
      </main>
    </>
  );
}
