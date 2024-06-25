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
];

function Wordle() {
  const [word, setWord] = useState(
    words[Math.floor(Math.random() * words.length)]
  );
  const [guesses, setGuesses] = useState(
    Array.from({ length: 6 }, () => ({
      guess: Array(5).fill(""),
      feedback: Array(5).fill("gray"),
    }))
  );
  const [gameOver, setGameOver] = useState(false);
  const [guessCount, setGuessCount] = useState(0);
  const [lastGuess, setLastGuess] = useState("");

  const inputRefs = Array(6)
    .fill(0)
    .map(() =>
      Array(5)
        .fill(0)
        .map(() => createRef())
    );

  useEffect(() => {
    setWord(words[Math.floor(Math.random() * words.length)]);
  }, []);

  useEffect(() => {
    if (guessCount < 6) {
      inputRefs[guessCount][0].current.focus();
    }
  }, [guessCount]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (gameOver) {
      return;
    }

    const guess = guesses[guessCount].guess.join("");
    setLastGuess(guess);
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
        } else if (newCount < 6) {
          inputRefs[newCount][0].current.focus();
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
              {Array(5)
                .fill(0)
                .map((_, j) => (
                  <input
                    key={j}
                    type="text"
                    maxLength="1"
                    disabled={index !== guessCount || gameOver}
                    className={`guess-cell guess-cell-${guess.feedback[j]}`}
                    value={guess.guess[j] || ""}
                    ref={inputRefs[index][j]}
                    onChange={(e) => {
                      if (index === guessCount) {
                        const newGuesses = [...guesses];
                        newGuesses[index].guess[j] = e.target.value;
                        setGuesses(newGuesses);
                        if (j < 4) {
                          inputRefs[index][j + 1].current.focus();
                        }
                      }
                    }}
                  />
                ))}
            </div>
          ))}
        </div>
        <button type="submit">Guess</button>
      </form>
      {gameOver && <p>You {lastGuess === word ? "won" : "lost"}!</p>}
    </div>
  );
}

export default Wordle;
