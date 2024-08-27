import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './session4c.module.css';
import Navbar from '../../../Navbar/Navbar';
import { useSelector } from 'react-redux';
import Button from '../../../ReusableComponents/Button/Button';
import IconWordGrid from '../../../ReusableComponents/IconWordGrid/IconWordGrid';

import Typography from '../../../ReusableComponents/Typography/Typography';
import lockericon from './../../../../assets/assessment/oclock.jpg';
import HeadphoneSvg from '../../../ReusableComponents/HeadphoneSvg/HeadphoneSvg';

const Session4C = () => {
  const navigate = useNavigate();
  const userData = useSelector(state => state.auth.user);
  const language = userData.language


  useEffect(() => {
    window.scrollTo(0, 0);
    const screenHeight = window.innerHeight;
    document.getElementById('background_image').style.minHeight = `${screenHeight - 100}px`;
    if(userData){
      const data = {
          'userid': userData.userid,
          'sessionid': 4,
          'start': true
      }
      axios.post(`/api/sessions`, data)
        .then(response => {
          console.log('uncaught response', response)
          
        })
        .catch(error => {
          // Handle any errors
          console.error(error);
        });
  }
  }, []);

  const next = () => {
      passData();
  };

  const passData = () => {
    jumptonextpage()
  };

  const jumptonextpage = () => {
    navigate(`/session4prec`);
  };

  return (
    <div>
       <Navbar />
      <div className={styles.background_image} id="background_image">
        <div className={styles.whole_border}>
            <Typography title={'title'}  position={'center'} color={'primary'}>
                {
                  language === 'English' ? 
                  'Session 4'
                  :
                  'Quatrième session'
                }
            </Typography>
            <br />
            <IconWordGrid imgsrc={lockericon} word={'20 mins'} />
            <br />
            <Typography title={'content'} position={'center'}  >
              {
                language === 'English' ?
                'In this session you will learn about ways to look after your health and wellbeing.'
                :
                <p>Lors de cette séance, nous allons revoir les concepts et les exercices que nous avons appris lors des dernières séances.</p>
              }
            </Typography>
            
            </div>

            {/* <HeadphoneSvg /> */}
          <Button word={language === 'English' ? 'NEXT' : 'Suivant'} onClick={next} position={'center'} />
          </div>
        </div>
    
  );
};

export default Session4C;