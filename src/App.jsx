import "./App.css";
import { languages } from "../language";
import { useState} from "react";
import { clsx } from "clsx"
import { getFarewellText } from "../utils";
 
export default function App() {
  // State Values
  const [currentWord, setCurrentWord] = useState("react");
  const [guessLetter, setGuessLetter] = useState([])
  const wordArray = [...currentWord.toUpperCase()];
  
  // Derived Values
  const wrongGuessCount = guessLetter.filter(letter => !wordArray.includes(letter)).length
  const isGameWon = wordArray.every(letter => guessLetter.includes(letter))
  const isGameLost = wrongGuessCount >= languages.length - 1 ? true : false
  const isLastGuessIncorrect = guessLetter.length > 0 && !wordArray.includes(guessLetter[guessLetter.length - 1])

  const isGameOver = isGameWon || isGameLost

  const languageElements = languages.map((language, index) => {
    const isLanguageLost = index < wrongGuessCount;
    return (
      <span
        className={clsx("language-card", isLanguageLost && "lost")}
        style={{
          backgroundColor: language.backgroundColor,
          color: language.color,
        }}
        key={index}
      >
        {language.name}
      </span>
    )
  })

  const currentWordElements = wordArray.map((letter, index) => (
    <span className="current-word-letter"
      key={index}>
        {guessLetter.includes(letter) && letter}
    </span>
  ));

  const chooseLetter = (letter) => {
    setGuessLetter(prevGuessLetter => 
      prevGuessLetter.includes(letter) ? prevGuessLetter : [...prevGuessLetter, letter]
    )
  }

  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const alphabetArray = [...alphabet.toUpperCase()];
  const alphabetElements = alphabetArray.map((letter, index) => (
    <button 
      key={index}
      className={clsx("alphabet-letter", {
        "right-letter": guessLetter.includes(letter) && wordArray.includes(letter),
        "wrong-letter": guessLetter.includes(letter) && !wordArray.includes(letter)
      })}
      onClick={() => chooseLetter(letter)}
    >
      {letter}
    </button>
  ))

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
        <section className={clsx("status-section", {
          "invisible": !(isGameOver || isLastGuessIncorrect),
          "you-win": isGameWon,
          "farewell": !isGameOver && isLastGuessIncorrect,
          "you-lose": isGameLost,
        })}>
          {!isGameOver && isLastGuessIncorrect && (
            <h2>{getFarewellText(languages[wrongGuessCount - 1]?.name)}</h2>
          )}
          {isGameOver && (
            <>
              <h2>{isGameWon ? "You win!" : "Game Over!"}</h2>
              <p>{isGameWon ? "Well done! 🎉" : "You lose! Better start learning Assembly 😭"}</p>
            </>
          )}
        </section>
        <div className="languages-wrapper">{languageElements}</div>
        <div className="current-word-wrapper">{currentWordElements}</div>
        <section className="keyboard-section">{alphabetElements}</section>
        <button className={clsx("new-game-btn", !isGameOver && "invisible")}>New Game</button>
      </main>
    </>
  );
}
