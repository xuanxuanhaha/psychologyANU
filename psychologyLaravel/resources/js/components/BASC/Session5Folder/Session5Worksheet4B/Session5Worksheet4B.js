import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './session5worksheet4b.module.css';
import Navbar from '../../../Navbar/Navbar';
import { useSelector } from 'react-redux';
import Button from '../../../ReusableComponents/Button/Button';
import ProgressBar from '../../../ReusableComponents/ProgressBar/ProgressBar';
import Typography from '../../../ReusableComponents/Typography/Typography';

const Session5Worksheet4B = () => {
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
    navigate(`/session5worksheet5b`);
  };

  return (
    <div>
       <Navbar />
      <div className={styles.background_image} id="background_image">
        
        <div className={styles.whole_border}>

          <Typography title={'subtitle'} position={'left'}>
            Fifth Session
          </Typography>

          <ProgressBar percentageNo={75} language={language} />


          <div>
          <Typography title={'content'} position={'left'} color={'primary'}>
            {
                  language === 'English' ?
                  'You did a great job in practising self-compassion skills this week, well done!'
                  :
                  "Tu as fait du bon travail dans ta pratique des compétences d’autocompassion, bravo !"
                }
            </Typography>
            <Typography title={'content'} position={'left'} color={'primary'}>
            {
                  language === 'English' ?
                  'In this session, you will review and consolidate self-compassion skills. Let’s get started.'
                  :
                  "Tu as fait du bon travail dans ta pratique des compétences d’autocompassion, bravo !"
                }
            </Typography>
          </div>

          <Button word={language === 'English' ? 'Start' : 'Commencer Fiche 1'} onClick={goToSession1WorksheetQ1} position={'center'} />

        </div>
      </div>
    </div>
  );
};

export default Session5Worksheet4B;