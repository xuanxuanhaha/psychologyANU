import React, { useEffect, useState } from 'react';
import styles from './helppop.module.css';
import Typography from '../Typography/Typography';
import Slider from '@mui/material/Slider';

const Helppop = (props) => {
  const { helptext, label, step, marks, min, max, onChange, slidervalue } = props

  return (  
        <div className={styles.answer_textarea}>
            <div className={styles.leftword}>
                <Typography title={'description'} position={'center'}>
                    {label}
                </Typography>
            </div>
            <div className={styles.help_tip}>
                {helptext} 
            </div>
        </div>
  );
};

export default Helppop;