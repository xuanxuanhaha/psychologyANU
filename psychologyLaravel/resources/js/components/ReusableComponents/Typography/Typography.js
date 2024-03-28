import React, { useEffect, useState } from 'react';
import styles from './typography.module.css';

const Typography = (props) => {
  const { title, position, children, className, color, contentwidth } = props
  const colorCode = color === 'primary'? '#0054b4' :'black'

  const wordInFormat = (children) => {
    if(title === 'title'){
        return <h1 className={className || styles.p1title} style={{color: colorCode}}>{children}</h1>
    }else if(title === 'subtitle'){
      return <h2 className={className || styles.p2title} style={{color: colorCode}}>{children}</h2>
    }else if (title === 'content'){
      return <p className={className || styles.p4content} style={{color: colorCode, width: contentwidth || '90%'}}>{children}</p>
    }else if (title === 'description'){
      return <p className={className || styles.p5description} style={{color: colorCode}}>{children}</p>
    }
  }

  return (  
    <div className={position==='center' ? styles.center : (position === 'left'? styles.left : styles.right)}>
      {wordInFormat(children)}
    </div>
  );
};

export default Typography;