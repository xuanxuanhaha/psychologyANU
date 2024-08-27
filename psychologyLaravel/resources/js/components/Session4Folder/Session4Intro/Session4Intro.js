import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './session4intro.module.css';
import Navbar from '../../Navbar/Navbar';
import { useSelector } from 'react-redux';
import Button from '../../ReusableComponents/Button/Button';
import ProgressBar from '../../ReusableComponents/ProgressBar/ProgressBar';
import Typography from '../../ReusableComponents/Typography/Typography';

const Session4Intro = () => {
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
              'Fourth Session'
              :
              'Deuxième session'
            }
          </Typography>

          <ProgressBar percentageNo={34} language={language} />


          <div>
            <Typography title={'content'} position={'left'} color={'primary'}>
            {
                language === 'English' ?
                'In the last sessions, we saw how academic worry is related to avoidance. We also learned that groups can helps us understand who we are, our goals and values, and be better prepared to attain these goals. You then created a plan that has the potential to help you succeed at addressing your academic worry. Today you will learn another new skill through the exercises below: Self-compassion. '
                :
                'Durant les dernières séances, nous avons vu comment l’inquiétude scolaire est reliée à l’évitement. Nous avons aussi appris que les groupes peuvent nous aider à comprendre qui nous sommes, nos objectifs et nos valeurs, et à être mieux préparé pour atteindre ces objectifs. Tu as, ensuite, créé un plan qui a le potentiel de t’aider à faire face à ton inquiétude scolaire.'
              }
            </Typography>
          </div>


          <Button word={'Exercise D-1'} onClick={next} position={'center'} />

        </div>
      </div>
    </div>
  );
};

export default Session4Intro;