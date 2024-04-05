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
          'sessionid': 4,
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
    // navigate(`/session3review`);
    navigate('/session4intro');

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
              'This session may include audios, please use your earphone.' :
              'Cette session pourrait inclure des sections audio, assure-toi d’avoir des écouteurs.'
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