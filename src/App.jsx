import "./App.css";
import { languages } from "../language";
import { useState } from "react";

export default function App() {
  const languageElements = languages.map((language, index) => (
    <span
      className="language-card"
      style={{
        backgroundColor: language.backgroundColor,
        color: language.color,
      }}
      key={index}
    >
      {language.name}
    </span>
  ));

  const [currentWord, setCurrentWord] = useState("react");
  const wordArray = [...currentWord.toUpperCase()];
  const currentWordElements = wordArray.map((letter, index) => (
    <span className="current-word-letter" key={index}>
      {letter}
    </span>
  ));

  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const alphabetArray = [...alphabet];
  const alphabetElements = alphabetArray.map((letter, index) => (
    <button className="alphabet-letter" key={index}>
      {letter}
    </button>
  ));

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
        <div className="current-word-wrapper">{currentWordElements}</div>
        <section className="keyboard-section">{alphabetElements}</section>
      </main>
    </>
  );
}
