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

  useEffect(() => {
    setWord(words[Math.floor(Math.random() * words.length)]);
  }, []);

  const handleChange = (event) => {
    setGuess(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const feedback = guess.split("").map((g, i) => {
      if (g === word[i]) return "green";
      if (word.includes(g)) return "yellow";
      return "gray";
    });
    setGuesses([...guesses, { guess, feedback }]);
    setGuess("");
    if (guess === word) {
      setGameOver(true);
    }
  };

  return (
    <div>
      <h1>Wordle</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={guess}
          onChange={handleChange}
          maxLength="5"
        />
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
      {gameOver && <p>You won!</p>}
    </div>
  );
}

export default Wordle;
