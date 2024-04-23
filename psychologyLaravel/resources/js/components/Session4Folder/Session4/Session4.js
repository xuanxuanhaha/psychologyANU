import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './session4.module.css';
import Navbar from '../../Navbar/Navbar';
import { useSelector } from 'react-redux';
import lockericon from './../../../assets/assessment/oclock.jpg';
import avoid_cycle from './../../../assets/surveys/avoid_cycle.png'
import avoid_cycle_france from './../../../assets/surveys/avoid_cycle_france.png'
import Button from '../../ReusableComponents/Button/Button';


import Modal from 'react-modal';
import ProgressBar from '../../ReusableComponents/ProgressBar/ProgressBar';
import Typography from '../../ReusableComponents/Typography/Typography';
import BorderContent from '../../ReusableComponents/BorderContent/BorderContent';
import TextField from '../../ReusableComponents/TextField/TextField';
import Helppop from '../../ReusableComponents/Helppop/Helppop';
import Scale from '../../ReusableComponents/Scale/Scale';
import HeadphoneSvg from '../../ReusableComponents/HeadphoneSvg/HeadphoneSvg';

const Session4 = () => {
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
          'sessionid': 5,
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
    navigate(`/session4review`);
  };

  return (
    <div>
       <Navbar />
      <div className={styles.background_image} id="background_image">
        <div className={styles.whole_border}>
            <Typography title={'title'}  position={'center'} color={'primary'}>
                {
                  language === 'English' ? 
                  'Session 5'
                  :
                  'Quatrième session'
                }
            </Typography>
            <br />
            <br />

            <Typography title={'content'} position={'left'} color={'primary'} >
              {
                language === 'English' ?
                'In this session, we will review the concepts and exercises we learned about in the last sessions.'
                :
                <p>Lors de cette séance, nous allons revoir les concepts et les exercices que nous avons appris lors des dernières séances.</p>
              }
            </Typography>
            <br />
            <Typography title={'content'} position={'left'} color={'primary'} >
              {
                language === 'English' ?
                <p>First, do you have the Activity Planner with you for this session? If not, please get it ready as you will need it for the exercise below. </p>
                :
                <p>Premièrement, as-tu ton planificateur d’activités avec toi pour cette séance ? Assure-toi de les avoir accessibles puisque tu en auras de besoin pour l’exercice ci-dessous.</p>
              }
            </Typography>
            <br />
            <Typography title={'content'} position={'left'} color={'primary'} >
              {
                language === 'English' ?
                <p>Let’s review your goal and check how you practiced the scheduled activity(ties) prior to Session 5.</p>
                :
                <p>Premièrement, as-tu ton planificateur d’activités avec toi pour cette séance ? Assure-toi de les avoir accessibles puisque tu en auras de besoin pour l’exercice ci-dessous.</p>
              }
            </Typography>
            </div>

            <HeadphoneSvg />
            
          <Button word={language === 'English' ? 'NEXT' : 'Suivant'} onClick={next} position={'center'} />
          </div>
        </div>
    
  );
};

export default Session4;