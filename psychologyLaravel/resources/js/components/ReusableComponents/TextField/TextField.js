import React, { useEffect, useState } from 'react';
import styles from './textfield.module.css';

const TextField = (props) => {
  const { title, rows, cols, value, onChange, placeholder, questionError, errorWarningText, titleClassName, outerlassName, className, errorClassName, disabled } = props

  return (  
    <div className={outerlassName || styles.question_content}>
        <div className={titleClassName || styles.question_session}>
        {title}
        </div>
        <textarea
            className={`${className || styles.answer_textarea} ${questionError ? `${styles.error}` : ''}`}
            rows={rows}
            cols={cols}
            value={value}
            disabled={disabled}
            onChange={(e)=>onChange(e)}
            placeholder={placeholder}
        />
        {
            questionError &&
            <div className={errorClassName || styles.error_message}>
               {errorWarningText}
            </div>
        }
    </div>
  );
};

export default TextField;