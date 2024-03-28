import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './session1worksheet2start.module.css';
import Navbar from '../../Navbar/Navbar';
import { useSelector } from 'react-redux';
import lockericon from './../../../assets/assessment/oclock.jpg';
import Button from '../../ReusableComponents/Button/Button';
import Typography from '../../ReusableComponents/Typography/Typography';
import IconWordGrid from '../../ReusableComponents/IconWordGrid/IconWordGrid';

const Session1worksheet2start = () => {
  const navigate = useNavigate();
  const userData = useSelector(state => state.auth.user);
  const language = userData.language

  const [sessionId, setSessionId] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const screenHeight = window.innerHeight;
    document.getElementById('background_image').style.minHeight = `${screenHeight - 100}px`;
  }, []);

  const goToSession1Grading = () => {
    navigate(`/session1worksheet2q1`);

  };

  return (
    <div>
       <Navbar />
      <div className={styles.background_image} id="background_image">
        <div className={styles.whole_border}>
          <Typography title={'title'}  position={'center'} color={'primary'}>
            {
              language === 'English' ?
              'Worksheet 2' :
              'Fiche 2'
            }
          </Typography>
          {
            language === 'English' ?
            <Typography title={'subtitle'} position={'center'} color={'primary'}>
              Behavioural Activation
            </Typography>
            :
            <Typography title={'subtitle'} position={'center'} color={'primary'}>
              Activation comportementale
            </Typography>
          }
          <IconWordGrid imgsrc={lockericon} word={'5-8 mins'} />

          <Button word={language === 'English' ? 'Start Now' : 'Suivant'} onClick={goToSession1Grading} position={'center'} />

        </div>
      </div>
    </div>
  );
};

export default Session1worksheet2start;