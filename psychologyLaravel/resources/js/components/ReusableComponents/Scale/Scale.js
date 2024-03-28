import React, { useEffect, useState } from 'react';
import styles from './scale.module.css';
import Typography from '../Typography/Typography';
import Slider from '@mui/material/Slider';
import Helppop from '../Helppop/Helppop';

const Scale = (props) => {
  const { step, marks, min, max, onChange, slidervalue } = props;

  // Override mark label styles
  const customMarks = marks.map((mark) => ({
    ...mark,
    label: (
      <span style={{ position: 'absolute', top: '-20px' }}>
        {mark.label}
      </span>
    ),
  }));

  return (
    <Slider
      aria-label="academic"
      value={slidervalue}
      getAriaValueText={(value) => `${value}`}
      valueLabelDisplay="on"
      step={step}
      style={{ color: '#0054b4' }}
      marks={customMarks}
      min={min}
      max={max}
      onChange={(_, value) => onChange(value)}
      sx={{
        '& .MuiSlider-markLabel': {
          position: 'absolute',
          top: '-20px', // Adjust this value as needed
        },
      }}
    />
  );
};

export default Scale;