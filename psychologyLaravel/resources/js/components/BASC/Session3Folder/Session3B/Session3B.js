import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './session3b.module.css';
import Navbar from '../../../Navbar/Navbar';
import { useSelector } from 'react-redux';
import Button from '../../../ReusableComponents/Button/Button';
import IconWordGrid from '../../../ReusableComponents/IconWordGrid/IconWordGrid';

import Typography from '../../../ReusableComponents/Typography/Typography';
import lockericon from './../../../../assets/assessment/oclock.jpg';
import HeadphoneSvg from '../../../ReusableComponents/HeadphoneSvg/HeadphoneSvg';

const Session3B = () => {
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
          'sessionid': 3,
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
    navigate(`/session3worksheet1b`);
  };

  return (
    <div>
       <Navbar />
      <div className={styles.background_image} id="background_image">
        <div className={styles.whole_border}>
            <Typography title={'title'}  position={'center'} color={'primary'}>
                {
                  language === 'English' ? 
                  'Session 3'
                  :
                  'Quatrième session'
                }
            </Typography>
            <br />
            <IconWordGrid imgsrc={lockericon} word={'20 mins'} />
            <br />
            <Typography title={'content'} position={'left'} color={'primary'} >
              {
                language === 'English' ?
                <p>In the last sessions, you learned skills to manage academic worry through <b>Behavioural Activation</b>. <b>Behavioural Activation</b> can help you overcome avoidance in your academic performance. As Behavioural Activation encourages practising goal-oriented behaviours to overcome avoidance, the first step of undertaking Behavioural Activation is to set up your goals.</p>
                :
                <p>Lors de cette séance, nous allons revoir les concepts et les exercices que nous avons appris lors des dernières séances.</p>
              }
            </Typography>
           
            <br />
            
            </div>

            {/* <HeadphoneSvg /> */}

          <Button word={language === 'English' ? 'NEXT' : 'Suivant'} onClick={next} position={'center'} />
          </div>
        </div>
    
  );
};

export default Session3B;