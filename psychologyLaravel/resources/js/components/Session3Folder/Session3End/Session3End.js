import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './session3end.module.css';
import Navbar from '../../Navbar/Navbar';
import { useSelector } from 'react-redux';
import Typography from '../../ReusableComponents/Typography/Typography';

const Session3End = () => {
  const navigate = useNavigate();
  const userData = useSelector(state => state.auth.user);
  const [sessionId, setSessionId] = useState(0);
  const language = userData.language

  useEffect(() => {
    window.scrollTo(0, 0);
    const screenHeight = window.innerHeight;
    document.getElementById('background_image').style.minHeight = `${screenHeight - 100}px`;

    if(userData){
      session3End()
    }
  }, []);

  const session3End = () => {
    console.log('1 uncaught')
    const data = {
        'userid': userData.userid,
        'sessionid': 3,
        'finish': true
    }
    axios.put(`/api/sessions/3`, data)
      .then(response => {
        console.log('uncaught response', response)
        
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
                  <p>You made it through the third session, well done! Since there are things to practice for this week, the next session is blocked until next week. Please take the following week to practice out the skills described today. We will send you a reminder email in 6-7 days to let you know that you can now access session 4. Looking forward to seeing you next week for our last session!</p>
                  :
                  <p>Tu as complété la troisième séance, bravo ! Comme il y a des choses à pratiquer cette semaine, la prochaine session est bloquée jusqu'à la semaine prochaine. Prends la semaine suivante pour mettre en pratique les compétences décrites aujourd'hui. Nous t’enverrons un courriel de rappel dans 6-7 jours pour t’informer que tu peux maintenant accéder à la session 4. Au plaisir de te voir la semaine prochaine pour notre dernière séance!</p>
                }
              </Typography>
            </div>

            <div className={styles.option_btn_div}>
                  <button className={`${styles.btn} ${styles.button_word_style}`}  onClick={() => gotodashboard()}>
                    {language === 'English' ? 'Back To Dashboard' : 'Retour au tableau de bord'} 
                  </button>
            </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Session3End;