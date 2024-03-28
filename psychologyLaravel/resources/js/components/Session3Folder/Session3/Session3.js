import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './session3.module.css';
import Navbar from '../../Navbar/Navbar';
import { useSelector } from 'react-redux';
import lockericon from './../../../assets/assessment/oclock.jpg';
import Button from '../../ReusableComponents/Button/Button';
import Typography from '../../ReusableComponents/Typography/Typography';
import IconWordGrid from '../../ReusableComponents/IconWordGrid/IconWordGrid';

const Session3 = () => {
  const navigate = useNavigate();
  const userData = useSelector(state => state.auth.user);
  const language = userData.language
  const [sessionId, setSessionId] = useState(0);

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
    navigate(`/session3review`);

  };
  return (
    <div>
       <Navbar />
      <div className={styles.background_image} id="background_image">
        <div className={styles.whole_border}>

          <Typography title={'title'}  position={'center'} color={'primary'}>
            {
                language === 'English' ?
                'Worksheet 3'
                :
                'Fiche 3'
            }
          </Typography>
            {
              language === 'English' ?
              <Typography title={'subtitle'} position={'center'} color={'primary'}>
                Self-compassion
              </Typography>
              :
              <Typography title={'subtitle'} position={'center'} color={'primary'}>
                L’autocompassion
              </Typography>
            }
          <IconWordGrid imgsrc={lockericon} word={'12-15 mins'} />

          <div className={styles.containerheadset}>
          <Typography title={'description'} position={'center'}>
              {
                language === 'English' ?
                'In the last sessions, we saw how academic worry is related to avoidance. We also learned that groups can helps us understand who we are, our goals and values, and be better prepared to attain these goals. You then created a plan that has the potential to help you succeed at addressing your academic worry. Today you will learn another new skill through the exercises below: Self-compassion. '
                :
                'Durant les dernières séances, nous avons vu comment l’inquiétude scolaire est reliée à l’évitement. Nous avons aussi appris que les groupes peuvent nous aider à comprendre qui nous sommes, nos objectifs et nos valeurs, et à être mieux préparé pour atteindre ces objectifs. Tu as, ensuite, créé un plan qui a le potentiel de t’aider à faire face à ton inquiétude scolaire.'
              }
          </Typography>
          </div>
            
          <Button word={
              language === 'English' ?
              'Start Now'
              :
              'Suivant'
            } onClick={next} position={'center'} />
        </div>
      </div>
    </div>
  );
};

export default Session3;