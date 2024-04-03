import React, { useEffect, useState } from 'react';
import styles from './progressbar.module.css';

const ProgressBar = (props) => {
  const { percentageNo, language } = props

  return (  
    <div className={styles.progress_div}>
        <b className={styles.progress_wording_b}>
          {
            language === 'English' ?
            'PROGRESS STATUS:' :
            'Statut du progrès'
          }
          </b>
        <div className={styles.progress_background}>
        <div className={styles.progress_bar} style={{width: `${percentageNo}%`}}>{percentageNo}%</div>
        </div>
        <br />
    </div>
  );
};

export default ProgressBar;