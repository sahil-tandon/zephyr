import React, { useState, useEffect } from "react";

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
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [guessCount, setGuessCount] = useState(0);

  useEffect(() => {
    setWord(words[Math.floor(Math.random() * words.length)]);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const guess = event.target.elements.guess.value;
    setGuess(guess);
    const feedback = guess.split("").map((g, i) => {
      if (g === word[i]) return "green";
      if (word.includes(g)) return "yellow";
      return "gray";
    });
    setGuesses([...guesses, { guess, feedback }]);
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
    event.target.elements.guess.value = "";
  };

  return (
    <div>
      <h1>Wordle</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="guess" maxLength="5" />
        <button type="submit">Guess</button>
      </form>
      {guesses.map((guess, index) => (
        <p key={index}>
          {guess.guess.split("").map((g, i) => (
            <span key={i} style={{ color: guess.feedback[i] }}>
              {g}
            </span>
          ))}
        </p>
      ))}
      {gameOver && <p>You {guess === word ? "won" : "lost"}!</p>}
    </div>
  );
}

export default Wordle;
