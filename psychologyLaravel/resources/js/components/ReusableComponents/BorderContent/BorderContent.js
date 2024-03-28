import React, { useEffect, useState } from 'react';
import styles from './bordercontent.module.css';

const BorderContent = (props) => {
  const { children, word, onClick, position, className } = props

  return (  
    <div className={styles.question_content}>
        <div className={className || styles.question_wording}>
            {children}
        </div>
    </div>
  );
};

export default BorderContent;