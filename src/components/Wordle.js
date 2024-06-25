import React, { useState, useEffect, useRef } from "react";
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
    Array(6).fill({ guess: "", feedback: Array(5).fill("gray") })
  );
  const [gameOver, setGameOver] = useState(false);
  const [guessCount, setGuessCount] = useState(0);
  const inputRefs = useRef(
    Array(6)
      .fill(0)
      .map((_, i) =>
        Array(5)
          .fill(0)
          .map((_, j) => React.createRef())
      )
  );

  useEffect(() => {
    setWord(words[Math.floor(Math.random() * words.length)]);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (gameOver) {
      return;
    }

    const guess = inputRefs.current[guessCount]
      .map((ref) => ref.current.value)
      .join("");
    const feedback = guess.split("").map((g, i) => {
      if (g === word[i]) return "green";
      if (word.includes(g)) return "yellow";
      return "gray";
    });
    setGuesses(
      guesses.map((g, i) => (i === guessCount ? { guess, feedback } : g))
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
              {Array(5)
                .fill(0)
                .map((_, j) => (
                  <input
                    key={j}
                    type="text"
                    ref={inputRefs.current[index][j]}
                    maxLength="1"
                    disabled={index !== guessCount || gameOver}
                    className={`guess-cell guess-cell-${guess.feedback[j]}`}
                    value={guess.guess[j] || ""}
                    onChange={(e) => {
                      const newGuesses = [...guesses];
                      newGuesses[index].guess =
                        newGuesses[index].guess.substr(0, j) +
                        e.target.value +
                        newGuesses[index].guess.substr(j + 1);
                      setGuesses(newGuesses);
                    }}
                  />
                ))}
            </div>
          ))}
        </div>
        <button type="submit">Guess</button>
      </form>
      {gameOver && (
        <p>
          You {guesses[guesses.length - 1].guess === word ? "won" : "lost"}!
        </p>
      )}
    </div>
  );
}

export default Wordle;
