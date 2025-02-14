import React from 'react';
import './ScoreBoard.css';

const ScoreBoard = ({ playerScore, computerScore }) => {
  return (
    <div className="scoreboard">
      <div className="score-container">
        <span className="score-label">Player</span>
        <span className="score player-score">{playerScore}</span>
      </div>
      <div className="score-container">
        <span className="score-label">Computer</span>
        <span className="score computer-score">{computerScore}</span>
      </div>
    </div>
  );
};

export default ScoreBoard;
