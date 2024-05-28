import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './session4b.module.css';
import Navbar from '../../../Navbar/Navbar';
import { useSelector } from 'react-redux';
import Button from '../../../ReusableComponents/Button/Button';
import IconWordGrid from '../../../ReusableComponents/IconWordGrid/IconWordGrid';

import Typography from '../../../ReusableComponents/Typography/Typography';
import lockericon from './../../../../assets/assessment/oclock.jpg';
import HeadphoneSvg from '../../../ReusableComponents/HeadphoneSvg/HeadphoneSvg';

const Session4B = () => {
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
    navigate(`/session4worksheet1b`);
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
                <br />
                <br />
                {
                  language === 'English' ? 
                  'Self-compassion'
                  :
                  'Quatrième session'
                }
            </Typography>
            <br />
            <IconWordGrid imgsrc={lockericon} word={'20 mins'} />
            <br />
            <Typography title={'content'} position={'left'} >
              {
                language === 'English' ?
                'In the last sessions, we saw how academic worry is related to avoidance. We also learned how to overcome avoidance related to academic worry by practicing goal-oriented activities. You then created a plan that has the potential to help you succeed at addressing your academic worry. Today you will learn another new skill through the exercises below: Self-compassion.'
                :
                <p>Lors de cette séance, nous allons revoir les concepts et les exercices que nous avons appris lors des dernières séances.</p>
              }
            </Typography>

            <br />
            
            </div>

            <HeadphoneSvg />

          <Button word={language === 'English' ? 'NEXT' : 'Suivant'} onClick={next} position={'center'} />
          <br />
          </div>
        </div>
    
  );
};

export default Session4B;