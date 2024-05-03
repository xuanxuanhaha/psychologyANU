import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './session1end.module.css';
import Navbar from '../../Navbar/Navbar';
import { useSelector } from 'react-redux';
import Typography from '../../ReusableComponents/Typography/Typography';

const Session1End = () => {
  const navigate = useNavigate();
  const userData = useSelector(state => state.auth.user);
  const [sessionId, setSessionId] = useState(0);
  const language = userData.language

  const [allowBack, setAllowBack] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0);
    const screenHeight = window.innerHeight;
    document.getElementById('background_image').style.minHeight = `${screenHeight - 100}px`;

    if(userData){
      session1End()
    }
  }, []);

  const session1End = () => {
    console.log('1 uncaught')
    const data = {
        'userid': userData.userid,
        'sessionid': 1,
        'finish': true
    }
    axios.put(`/api/sessions/1`, data)
      .then(response => {
        console.log('uncaught response', response)
        setAllowBack(true)
      })
      .catch(error => {
        // Handle any errors
        console.error(error);
      });
  };

  const gotodashboard = () => {
    navigate(`/dashboard`);
  };

  return (
      <div>
       <Navbar />
        <div className={styles.background_image} id="background_image">
          <div className={styles.whole_border}>
            <div className={styles.question_content}>
              <br />
              <br />
              <div className={styles.academic_p1_container}>
              <Typography title={'subtitle'} position={'left'} color={'primary'}>
                {language === 'English' ?
                  <p>You made it through the first session, congrats! If you want, you can continue immediately to the next session. If you prefer, you can take a one- or two-day break. We will send you email reminders to make sure you continue on your trip towards understanding your academic worry.</p>
                  :
                  <p>Tu as terminé la première séance, félicitations! Si tu le souhaites, tu peux passer immédiatement à la séance suivante. Si tu préfères, tu peux prendre une pause d'un ou deux jours. Nous t’enverrons des rappels par courriel pour que tu poursuives ton parcours afin de mieux l’inquiétude scolaire.</p>
                }
              </Typography>
            </div>

            <div className={styles.option_btn_div}>
                  <button className={allowBack ? `${styles.btn} ${styles.button_word_style}` : `${styles.button_word_style} ${styles.disabled}`} disabled={allowBack}  onClick={() => allowBack && gotodashboard()}>
                    {language === 'English' ? 'Back To Dashboard' : 'Retour au tableau de bord'} 
                  </button>
            </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Session1End;