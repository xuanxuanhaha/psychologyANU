import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './session4worksheet1end.module.css';
import Navbar from '../../Navbar/Navbar';
import { useSelector } from 'react-redux';
import Button from '../../ReusableComponents/Button/Button';
import ProgressBar from '../../ReusableComponents/ProgressBar/ProgressBar';
import Typography from '../../ReusableComponents/Typography/Typography';

const Session4Worksheet1end = () => {
  const navigate = useNavigate();
  const userData = useSelector(state => state.auth.user);
  const language = userData.language

  const [sessionId, setSessionId] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const screenHeight = window.innerHeight;
    document.getElementById('background_image').style.minHeight = `${screenHeight - 100}px`;
  }, []);

  const next = () => {
    // navigate(`/session4end`);
    navigate(`/session5end`);
  };

  return (
    <div>
       <Navbar />
      <div className={styles.background_image} id="background_image">
        
        <div className={styles.whole_border}>

          <Typography title={'subtitle'} position={'left'}>
            {
              language === 'English' ?
              'Fifth Session' :
              'Quatrième session'
            }
          </Typography>

          <ProgressBar percentageNo={100} language={language} />


          <div>
            <Typography title={'content'} position={'left'} color={'primary'}>
            {
                  language === 'English' ?
                  'Thank you for participating in “Learning to Thrive ”. This is the final session of “Learning to Thrive”. Through this program, you have learned skills such as the importance of the group in helping us plan and achieve our goals (behavioural activation) and self-compassion (i.e., community connection, kindness to all, and mindfulness). These skills can be applied to any other academic difficulties, and we encourage you to keep practicing these skills in your routine academic performance.'
                  :
                  "Merci d’avoir participé dans « Apprendre à s’épanouir à l’UdeM ». Ceci est la dernière séance. À travers ce programme, tu as appris des compétences telles que l’importance du groupe pour nous aider à planifier et atteindre nos objectifs (activation comportementale) et l’autocompassion (reconnaitre que nous faisons partie d’une communauté universitaire, la bienveillance envers tous et la pleine conscience). Ces compétences peuvent être appliquées à toute autre difficulté reliée aux études et nous t’encourageons à continuer à pratiquer ces compétences dans ta vie universitaire."
                }
            </Typography>
          </div>
          <Button word={language === 'English' ? 'NEXT' : 'Suivant'} onClick={next} position={'center'} />

        </div>
      </div>
    </div>
  );
};

export default Session4Worksheet1end;