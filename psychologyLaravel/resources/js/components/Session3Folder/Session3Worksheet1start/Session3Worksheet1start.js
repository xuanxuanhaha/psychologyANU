import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './session3worksheet1start.module.css';
import Navbar from '../../Navbar/Navbar';
import { useSelector } from 'react-redux';
import Button from '../../ReusableComponents/Button/Button';
import ProgressBar from '../../ReusableComponents/ProgressBar/ProgressBar';
import Typography from '../../ReusableComponents/Typography/Typography';

const Session3Worksheet1start = () => {
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
    navigate(`/session3worksheet1q1`);
  };

  return (
    <div>
       <Navbar />
      <div className={styles.background_image} id="background_image">
        
        <div className={styles.whole_border}>

          <Typography title={'subtitle'} position={'left'}>
            {
              language === 'English' ? 
              'Third Session' :
              'Troisième session'
            }
          </Typography>

          <ProgressBar percentageNo={28} language={language} />


          <div>
            <Typography title={'content'} position={'left'} color={'primary'}>
            {
                  language === 'English' ?
                  'Thanks for filling up this information! We will ask you this information again in the next session so please continue to record this information. '
                  :
                  "Merci d'avoir rempli ces informations ! Nous te demanderons à nouveau ces informations lors de la prochaine session, alors continue à les enregistrer."
                }
            </Typography>
          </div>
          <br />
          <div>
            <Typography title={'content'} position={'left'} color={'primary'}>
            {
                  language === 'English' ?
                  'Today you will learn another new skill through the exercises below: Self-compassion. '
                  :
                  "Aujourd’hui, à travers les exercices suivants, tu apprendras une autre nouvelle compétence: l’autocompassion."
                }
            </Typography>
          </div>

          <Button word={language === 'English' ? 'Start Worksheet1' : 'Suivant'} onClick={goToSession1WorksheetQ1} position={'center'} />

        </div>
      </div>
    </div>
  );
};

export default Session3Worksheet1start;