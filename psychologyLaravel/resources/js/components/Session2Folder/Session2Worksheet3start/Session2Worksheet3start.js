import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './session2worksheet3start.module.css';
import Navbar from '../../Navbar/Navbar';
import { useSelector } from 'react-redux';
import Button from '../../ReusableComponents/Button/Button';
import ProgressBar from '../../ReusableComponents/ProgressBar/ProgressBar';
import Typography from '../../ReusableComponents/Typography/Typography';

const Session2Worksheet3start = () => {
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
    navigate(`/session2worksheet3q1`);
  };

  return (
    <div>
       <Navbar />
      <div className={styles.background_image} id="background_image">
        
        <div className={styles.whole_border}>

          <Typography title={'subtitle'} position={'left'}>
            {
              language === 'English' ?
              'Third Session'
              :
              'Deuxième session'
            }
          </Typography>

          <ProgressBar percentageNo={33} language={language} />


          <div>
            <Typography title={'content'} position={'left'} color={'primary'}>
            {
                  language === 'English' ?
                  'In the last sessions, we saw how academic worry is related to avoidance and we also reviewed how groups can be helpful when you aim to achieve your goals of overcoming academic worry. Groups can help us clarify who we are and offer resources to advance our personal and group goals.'
                  :
                  'Durant les dernières séances, nous avons vu comment l’inquiétude scolaire est relié à l’évitement et nous avons aussi examiné comment les groupes peuvent être utiles lorsque tu vises à accomplir tes objectifs et surmonter ton inquiétude scolaire. Les groupes peuvent nous aider à clarifier qui nous sommes et nous offrir des ressources pour avancer dans nos objectifs personnels et de groupe.'
                }
            </Typography>
          </div>

          <Button word={'Exercise C-1'} onClick={next} position={'center'} />

        </div>
      </div>
    </div>
  );
};

export default Session2Worksheet3start;