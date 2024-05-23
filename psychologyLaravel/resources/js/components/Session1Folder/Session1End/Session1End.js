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
        setAllowBack(true)
      })
      .catch(error => {
        // Handle any errors
        console.error(error);
      });
  };

  const gotodashboard = () => {
    if(allowBack){
      navigate(`/dashboard`);
    }
  };

  return (
      <div>
       <Navbar />
        <div className={styles.background_image} id="background_image">
              <div className={styles.whole_border}>
                <br />
                <br />
                <br />
                <br />
                <br />
                <div className={styles.question_content}>
                  <Typography title={'content'} position={'left'} color={'primary'}>
                  {language === 'English' ?
                    <p><i>Congratulations, you have completed the first session!</i></p>
                    :
                    <p>Tu as terminé la première séance, félicitations! Si tu le souhaites, tu peux passer immédiatement à la séance suivante. Si tu préfères, tu peux prendre une pause d'un ou deux jours. Nous t’enverrons des rappels par courriel pour que tu poursuives ton parcours afin de mieux l’inquiétude scolaire.</p>
                  }
                </Typography>
                <Typography title={'content'} position={'left'} color={'primary'}>
                  {language === 'English' ?
                    <p><i>You can continue to the next session immediately, or if you would prefer, you can take a break and return later. We will send you reminders via email to ensure you continue your path to understanding academic worry and building your tool kit.</i></p>
                    :
                    <p>Tu as terminé la première séance, félicitations! Si tu le souhaites, tu peux passer immédiatement à la séance suivante. Si tu préfères, tu peux prendre une pause d'un ou deux jours. Nous t’enverrons des rappels par courriel pour que tu poursuives ton parcours afin de mieux l’inquiétude scolaire.</p>
                  }
                </Typography>
              <Typography title={'content'} position={'left'} color={'primary'}>
                {language === 'English' ?
                  <p><i>If you have any questions or concerns, please do not hesitate to contact us at <a href="mailto:learningtothrive.rsp@anu.edu.au">learningtothrive.rsp@anu.edu.au</a></i></p>
                  :
                  <p>Tu as terminé la première séance, félicitations! Si tu le souhaites, tu peux passer immédiatement à la séance suivante. Si tu préfères, tu peux prendre une pause d'un ou deux jours. Nous t’enverrons des rappels par courriel pour que tu poursuives ton parcours afin de mieux l’inquiétude scolaire.</p>
                }
              </Typography>

              <br />
              <br />
              <div className={styles.option_btn_div}>
                  <button className={allowBack ? `${styles.btn} ${styles.button_word_style}` : `${styles.button_word_style} ${styles.disabled}`}  onClick={() => gotodashboard()}>
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