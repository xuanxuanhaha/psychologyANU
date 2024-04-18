import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './session4worksheet1start.module.css';
import Navbar from '../../Navbar/Navbar';
import { useSelector } from 'react-redux';
import Button from '../../ReusableComponents/Button/Button';
import ProgressBar from '../../ReusableComponents/ProgressBar/ProgressBar';
import Typography from '../../ReusableComponents/Typography/Typography';

const Session4Worksheet1Start = () => {
  const navigate = useNavigate();
  const userData = useSelector(state => state.auth.user);
  const language = userData.language

  const [sessionId, setSessionId] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const screenHeight = window.innerHeight;
    document.getElementById('background_image').style.minHeight = `${screenHeight - 100}px`;
  }, []);

  const goToSession1WorksheetQ1 = () => {
    navigate(`/session4worksheet1q1`);
  };

  return (
    <div>
       <Navbar />
      <div className={styles.background_image} id="background_image">
        
        <div className={styles.whole_border}>

          <Typography title={'subtitle'} position={'left'}>
            Fifth Session
          </Typography>

          <ProgressBar percentageNo={40} language={language} />


          <div>
            <Typography title={'content'} position={'left'} color={'primary'}>
            {
                  language === 'English' ?
                  'You did a great job in practising Self-compassion skills, well done! '
                  :
                  "Tu as fait du bon travail dans ta pratique des compétences d’autocompassion, bravo !"
                }
            </Typography>
          </div>
          <br />
          <div>
            <Typography title={'content'} position={'left'} color={'primary'}>
            {
                  language === 'English' ?
                  'In this session, you will review and consolidate self-compassion skills. Let’s get started.'
                  :
                  "Dans cette séance, tu vas réviser et consolider tes compétences d’autocompassion. Commençons !"
                }
            </Typography>
          </div>

          <Button word={language === 'English' ? 'NEXT' : 'Commencer Fiche 1'} onClick={goToSession1WorksheetQ1} position={'center'} />

        </div>
      </div>
    </div>
  );
};

export default Session4Worksheet1Start;