import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './session1worksheet1startc.module.css';
import Navbar from '../../../Navbar/Navbar';
import { useSelector } from 'react-redux';
import Button from '../../../ReusableComponents/Button/Button';
import ProgressBar from '../../../ReusableComponents/ProgressBar/ProgressBar';
import Typography from '../../../ReusableComponents/Typography/Typography';

const Session1worksheet1startC = () => {
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
    navigate(`/session1worksheetq1b`);
  };

  return (
    <div>
       <Navbar />
      <div className={styles.background_image} id="background_image">
        
        <div className={styles.whole_border}>

          <Typography title={'subtitle'} position={'left'}>
            {
              language === 'English' ?
              'First Session'
              :
              'Première session'
            }
          </Typography>

          <ProgressBar percentageNo={40} language={language} />


          <div>
            <Typography title={'content'} position={'left'} color={'primary'}>
            {
                  language === 'English' ?
                  'Think about some academic-related issues that you have been worrying about over the past week. It could be an assignment, an exam, a group project, making it to class on time, or even staying awake in lectures.'
                  :
                  'Pense à des problèmes reliés aux études dont tu t’es inquiété pendant la semaine dernière. Il peut s’agir d’un travail, un examen, un projet de groupe, arriver aux cours à temps, ou même rester éveillé lors des cours.'
                }
            </Typography>
          </div>

          <Button word={language === 'English' ? 'Start Worksheet1' : 'Commencer Fiche 1'} onClick={goToSession1WorksheetQ1} position={'center'} />

        </div>
      </div>
    </div>
  );
};

export default Session1worksheet1startC;