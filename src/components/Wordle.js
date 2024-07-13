import React, { useState, useEffect, createRef } from "react";
import "./Wordle.css";

const words = [
  "music",
  "sound",
  "light",
  "earth",
  "magic",
  "windy",
  "charm",
  "spark",
  "peace",
].map((word) => word.toUpperCase());

const keyboardRows = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
];

function Wordle() {
  const [word, setWord] = useState("");
  const [guesses, setGuesses] = useState(
    Array.from({ length: 6 }, () => ({
      guess: Array(5).fill(""),
      feedback: Array(5).fill("gray"),
    }))
  );
  const [gameOver, setGameOver] = useState(false);
  const [guessCount, setGuessCount] = useState(0);

  const inputRefs = guesses.map((row) => row.guess.map(() => createRef()));

  useEffect(() => {
    setWord(words[Math.floor(Math.random() * words.length)]);
  }, []);

  useEffect(() => {
    if (guessCount < 6) {
      inputRefs[guessCount][0].current.focus();
    }
  }, [guessCount]);

  const handleKeyPress = (key) => {
    if (gameOver) return;

    const newGuesses = [...guesses];
    const currentGuess = newGuesses[guessCount].guess;

    if (key === "Backspace") {
      let indexToClear = -1;
      for (let i = currentGuess.length - 1; i >= 0; i--) {
        if (currentGuess[i] !== "") {
          indexToClear = i;
          break;
        }
      }

      if (indexToClear !== -1) {
        newGuesses[guessCount].guess[indexToClear] = "";
        setGuesses(newGuesses);
        inputRefs[guessCount][indexToClear].current.focus();
      } else {
        inputRefs[guessCount][0].current.focus();
      }
    } else if (key === "Enter") {
      handleSubmit(new Event("submit"));
    } else {
      const firstEmptyIndex = currentGuess.indexOf("");
      if (firstEmptyIndex !== -1) {
        newGuesses[guessCount].guess[firstEmptyIndex] = key;
        setGuesses(newGuesses);
        if (firstEmptyIndex < currentGuess.length - 1) {
          inputRefs[guessCount][firstEmptyIndex + 1].current.focus();
        } else {
          inputRefs[guessCount][firstEmptyIndex].current.focus();
        }
      } else {
        inputRefs[guessCount][currentGuess.length - 1].current.focus();
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (gameOver) {
      return;
    }

    const guess = guesses[guessCount].guess.join("");
    if (guess.length < 5) {
      return;
    }
    const feedback = guess.split("").map((g, i) => {
      if (g === word[i]) return "green";
      if (word.includes(g)) return "yellow";
      return "gray";
    });
    setGuesses(
      guesses.map((g, i) =>
        i === guessCount ? { guess: guess.split(""), feedback } : g
      )
    );
    if (guess === word) {
      setGameOver(true);
    } else {
      setGuessCount((prevCount) => {
        const newCount = prevCount + 1;
        if (newCount === 6) {
          setGameOver(true);
        }
        return newCount;
      });
    }
  };

  return (
    <div>
      <h1>Wordle</h1>
      <form onSubmit={handleSubmit}>
        <div className="guess-grid">
          {guesses.map((guess, index) => (
            <div key={index} className="guess-row">
              {guess.guess.map((letter, j) => (
                <input
                  key={j}
                  type="text"
                  maxLength="1"
                  disabled={index !== guessCount || gameOver}
                  className={`guess-cell guess-cell-${guess.feedback[j]}`}
                  value={letter}
                  ref={inputRefs[index][j]}
                  onChange={(e) => {
                    const newGuesses = [...guesses];
                    newGuesses[index].guess[j] = e.target.value.toUpperCase();
                    setGuesses(newGuesses);
                    if (newGuesses[index].guess[j] === "") {
                      inputRefs[index][j].current.focus();
                    } else if (j < 4) {
                      inputRefs[index][j + 1].current.focus();
                    }
                  }}
                  onKeyDown={(e) => {
                    if (
                      e.key === "Backspace" &&
                      e.target.value === "" &&
                      j > 0
                    ) {
                      inputRefs[index][j - 1].current.focus();
                      const newGuesses = [...guesses];
                      newGuesses[index].guess[j - 1] = "";
                      setGuesses(newGuesses);
                    }
                  }}
                />
              ))}
            </div>
          ))}
        </div>
        <button type="submit" hidden>
          Guess
        </button>
      </form>
      {gameOver && (
        <p
          className={`game-over-message ${
            guessCount === 6 && guesses[guessCount - 1].guess.join("") !== word
              ? "game-over-lost"
              : "game-over-won"
          }`}
        >
          The word was {word}. You{" "}
          {guessCount === 6 && guesses[guessCount - 1].guess.join("") !== word
            ? "lost"
            : "won"}
          !
        </p>
      )}
      <div className="virtual-keyboard">
        {keyboardRows.map((row, rowIndex) => (
          <div key={rowIndex} className="keyboard-row">
            {row.map((key) => (
              <button
                key={key}
                onClick={() => handleKeyPress(key)}
                className="keyboard-key"
              >
                {key}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wordle;
