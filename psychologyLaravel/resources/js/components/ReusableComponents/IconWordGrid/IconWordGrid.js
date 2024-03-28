import React, { useEffect, useState } from 'react';
import styles from './iconwordgrid.module.css';

const IconWordGrid = (props) => {
  const { imgsrc, word, onClick, position } = props

  return (  
    <div className={styles.container_clock_time}>
        <div className={styles.clock_left}>
            <img src={imgsrc} className={styles.oclock} alt="Clock" />
        </div>
        <br />
        <div className={styles.time_right}>
            {word}
        </div>
    </div>
  );
};

export default IconWordGrid;