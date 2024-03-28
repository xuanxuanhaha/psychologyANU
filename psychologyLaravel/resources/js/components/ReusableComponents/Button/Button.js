import React, { useEffect, useState } from 'react';
import styles from './button.module.css';

const Button = (props) => {
  const { disabled, word, onClick, position, outlook, controverse, className } = props

  return (  
    <div className={position==='center' ? styles.center : (position === 'left'? styles.left : styles.right)}>
      <button className={`${className || (controverse ? styles.controverse_button_word_style : styles.button_word_style) } ${outlook==='round' ? styles.round : null}`} onClick={onClick} disabled={disabled}>
          {word}
      </button>
    </div>
  );
};

export default Button;