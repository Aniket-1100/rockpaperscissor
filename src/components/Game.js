import React, { useState, useEffect, useRef } from 'react';
import ChoiceButton from './ChoiceButton';
import ScoreBoard from './ScoreBoard';
import './Game.css';

const Game = () => {
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState('');
  const [isPlaying, setIsPlaying] = useState(true);

  const backgroundMusic = `${process.env.PUBLIC_URL}/sounds/background.mp3`; // Reference music from public/sounds
  const winSound = `${process.env.PUBLIC_URL}/sounds/win.mp3`;
  const loseSound = `${process.env.PUBLIC_URL}/sounds/lose.mp3`;
  const drawSound = `${process.env.PUBLIC_URL}/sounds/draw.mp3`;
  const clickSound = `${process.env.PUBLIC_URL}/sounds/click.mp3`;

  const audioRef = useRef(new Audio(backgroundMusic));
  audioRef.current.loop = true; // Loop the music

  useEffect(() => {
    audioRef.current.volume = 0.5;
    audioRef.current.play().catch((error) => console.log("Autoplay failed:", error));

    return () => {
      audioRef.current.pause();
    };
  }, []);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const choices = ['Rock', 'Paper', 'Scissors'];

  const playGame = (choice) => {
    setPlayerChoice(choice);
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(randomChoice);

    // Play click sound when a choice is made
    new Audio(clickSound).play();

    determineWinner(choice, randomChoice);
  };

  const determineWinner = (player, computer) => {
    if (player === computer) {
      setResult("It's a tie!");
      new Audio(drawSound).play(); // Play draw sound
    } else if (
      (player === 'Rock' && computer === 'Scissors') ||
      (player === 'Paper' && computer === 'Rock') ||
      (player === 'Scissors' && computer === 'Paper')
    ) {
      setResult('You Win!');
      setPlayerScore((prevScore) => prevScore + 1); // ✅ Correctly update player score
      new Audio(winSound).play(); // Play win sound
    } else {
      setResult('Computer Wins!');
      setComputerScore((prevScore) => prevScore + 1); // ✅ Correctly update computer score
      new Audio(loseSound).play(); // Play lose sound
    }
  };

  return (
    <div className="game-container">
      <h1 className="game-title">Rock Paper Scissors</h1>
      <ScoreBoard playerScore={playerScore} computerScore={computerScore} />

      <div className="choices">
        {choices.map((choice) => (
          <ChoiceButton key={choice} choice={choice} onClick={() => playGame(choice)} />
        ))}
      </div>

      <div className="results">
        <h2>{result}</h2>
        <p>Player Choice: <strong>{playerChoice}</strong></p>
        <p>Computer Choice: <strong>{computerChoice}</strong></p>
      </div>

      <button onClick={toggleMusic} className="music-toggle">
        {isPlaying ? "Pause Music" : "Play Music"}
      </button>
    </div>
  );
};

export default Game;
