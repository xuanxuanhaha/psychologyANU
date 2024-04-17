import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './session3b.module.css';
import Navbar from '../../../Navbar/Navbar';
import { useSelector } from 'react-redux';
import Button from '../../../ReusableComponents/Button/Button';
import IconWordGrid from '../../../ReusableComponents/IconWordGrid/IconWordGrid';

import Typography from '../../../ReusableComponents/Typography/Typography';
import lockericon from './../../../../assets/assessment/oclock.jpg';

const Session3B = () => {
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
      passData();
  };

  const passData = () => {
    jumptonextpage()
  };

  const jumptonextpage = () => {
    navigate(`/session3worksheet1b`);
  };

  return (
    <div>
       <Navbar />
      <div className={styles.background_image} id="background_image">
        <div className={styles.whole_border}>
            <Typography title={'title'}  position={'center'} color={'primary'}>
                {
                  language === 'English' ? 
                  'Session 3'
                  :
                  'Quatrième session'
                }
            </Typography>
            <br />
            <IconWordGrid imgsrc={lockericon} word={'20 mins'} />
            <br />
            <Typography title={'content'} position={'left'} color={'primary'} >
              {
                language === 'English' ?
                'Last session we saw how academic worry is a problem for many students, and that it leads to cognitive, affective and behavioural difficulties. We also learned that worry functions as avoidance, although it may make you feel relieved in the short-term, it often leads to long-term negative consequences, and contributes to worry in the future. We also learned about the importance of eating for our physical health.'
                :
                <p>Lors de cette séance, nous allons revoir les concepts et les exercices que nous avons appris lors des dernières séances.</p>
              }
            </Typography>
            <br />
            <Typography title={'content'} position={'left'} color={'primary'} >
              {
                language === 'English' ?
                <p>In this session, you will learn some skills to cope with your worry.</p>
                :
                <p>Premièrement, as-tu ton planificateur d’activités avec toi pour cette séance ? Assure-toi de les avoir accessibles puisque tu en auras de besoin pour l’exercice ci-dessous.</p>
              }
            </Typography>
            <br />
            
            </div>

            <div className={styles.containerheadset}>
          <Typography title={'description'} position={'center'}>
            {
              language === 'English' ? 
              'This session may include audios, please use your earphone.' :
              'Cette session pourrait inclure des sections audio, assure-toi d’avoir des écouteurs.'
            }
              
          </Typography>
          </div>
          <Button word={language === 'English' ? 'NEXT' : 'Suivant'} onClick={next} position={'center'} />
          </div>
        </div>
    
  );
};

export default Session3B;