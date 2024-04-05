import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './session4end.module.css';
import Navbar from '../../Navbar/Navbar';
import { useSelector } from 'react-redux';
import Typography from '../../ReusableComponents/Typography/Typography';
import Speech from 'react-speech';
// import SpeechC from '../../ReusableComponents/SpeechC/SpeechC';
  
const Session4End = () => {
  const navigate = useNavigate();
  const userData = useSelector(state => state.auth.user);
  const [sessionId, setSessionId] = useState(0);
  const language = userData.language

  useEffect(() => {
    window.scrollTo(0, 0);
    const screenHeight = window.innerHeight;
    document.getElementById('background_image').style.minHeight = `${screenHeight - 100}px`;

    if(userData){
      session4End()
    }
  }, []);

  const session4End = () => {
    console.log('1 uncaught')
    const data = {
        'userid': userData.userid,
        'sessionid': 4,
        'finish': true
    }
    axios.put(`/api/sessions/4`, data)
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
                  <p>You made it through the Fourth session, well done! Since there are things to practice for this week, the next session is blocked until next week. Please take the following week to practice out the skills described today. We will send you a reminder email in 6-7 days to let you know that you can now access session 5. Looking forward to seeing you next week for our last session!</p>
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
        {/* <div className={styles.background_image} id="background_image">
          <div className={styles.whole_border}>
            <div className={styles.question_content}>
                <br />
                <br />
                
              <div className={styles.academic_p1_container}>
                <Typography title={'subtitle'} position={'left'} color={'primary'}>
                    {
                        language === 'English' ?
                        <React.Fragment >
                            <p>You made it through the fourth session, well done! You will be contacted by our team to answer some final questions. In the meanwhile, we hope you enjoyed this program.</p>
                        </React.Fragment>
                        :
                        <React.Fragment >

                        <p>
                          Félicitations ! Tu viens de finir la dernière séance de l’outil Apprendre à s’épanouir! Merci d’y avoir participé. À travers cet outil, tu as pu développer des compétences et prendre connaissances des ressources qui te sont disponibles. Nous t’encourageons à poursuivre l’utilisation de ses compétences et ses ressources dans tes études.
                        </p>
                        <p>
                          Lorsque tu auras terminé, une nouvelle fenêtre s'ouvrira avec le lien vers un questionnaire sur ton expérience avec Apprendre à s’épanouir. Tu peux aussi utiliser le lien suivant :  <a href="http://ls.sondages.umontreal.ca/882837?lang=fr">http://ls.sondages.umontreal.ca/882837?lang=fr</a>. Si nous n'avons pas de tes réponses, nous enverrons un courriel de rappel dans les prochains jours.
                        </p>
                        <p>
                          Nous te souhaitons une belle continuation dans le reste de tes études !
                        </p>
                        <p>
                          Nous espérons que tu as apprécié notre outil. Si tu as des questions ou des préoccupations, n’hésite pas à nous contacter au <a href = "mailto: apprendreasepanouir@umontreal.ca">apprendreasepanouir@umontreal.ca</a>.
                        </p>
                        </React.Fragment>

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
        </div> */}
      </div>
  );
};

export default Session4End;