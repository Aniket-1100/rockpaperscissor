import React from 'react';
import './ChoiceButton.css';

const ChoiceButton = ({ choice, onClick }) => {
  return (
    <button className="choice-button" onClick={onClick}>
      {choice}
    </button>
  );
};

export default ChoiceButton;
