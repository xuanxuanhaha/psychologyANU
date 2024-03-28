import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './session3worksheet1end.module.css';
import Navbar from '../../Navbar/Navbar';
import { useSelector } from 'react-redux';
import Button from '../../ReusableComponents/Button/Button';
import ProgressBar from '../../ReusableComponents/ProgressBar/ProgressBar';
import Typography from '../../ReusableComponents/Typography/Typography';

const Session3Worksheet1end = () => {
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
    navigate(`/session3end`);
  };

  return (
    <div>
       <Navbar />
      <div className={styles.background_image} id="background_image">
        
        <div className={styles.whole_border}>

          <Typography title={'subtitle'} position={'left'}>
            {
              language === 'English' ? 
              'Third Session' :
              'Troisième session'
            }
          </Typography>

          <ProgressBar percentageNo={100} language={language} />


          <div>
            <Typography title={'content'} position={'left'} color={'primary'}>
            {
                  language === 'English' ?
                  'In this session, you learned about self-compassion, being kind to yourself as you would towards any other student.'
                  :
                  "Dans cette séance, tu as appris à propos de l’autocompassion, être bienveillant envers toi-même comme tu le serais avec une autre personne étudiante."
                }
            </Typography>
          </div>
          <br />
          <div>
            <Typography title={'content'} position={'left'} color={'primary'}>
            {
                  language === 'English' ?
                  'Treat yourself with the same kindness that you would fellow students!'
                  :
                  "Accorde-toi la même bienveillance que tu accorderais à tes camarades !"
                }
            </Typography>
            </div>
            <br />
            <div>
                <Typography title={'content'} position={'left'} color={'primary'}>
                {
                    language === 'English' ?
                    'You practiced ways of being self-compassion, including phrases that speak to you personally. '
                    :
                    "Tu as pratiqué des moyens d’autocompassion, incluant des phrases qui t’interpellent personnellement."
                    }
                </Typography>
            </div>
            <br />
            <div>
                <Typography title={'content'} position={'left'} color={'primary'}>
                {
                    language === 'English' ?
                    'Just as your university community, may you learn to accept yourself as you are.'
                    :
                    "Tout comme ta communauté universitaire, tu peux apprendre à t’accepter tel que tu l’es."
                    }
                </Typography>
            </div>
            <br />
            <div>
                <Typography title={'content'} position={'left'} color={'primary'}>
                {
                    language === 'English' ?
                    'In the next session, we will revise the behavioural activation and self-compassion exercises, so please fill out the activity planner from Session 2 and self-compassion counter from this session (Session 3).'
                    :
                    "Dans la prochaine séance, nous allons réviser l’activation comportementale et les exercices d’autocompassion, remplis donc le planificateur d’activités de la séance 2 pour la semaine prochaine et le tableau d’autocompassion de cette séance (séance 3)."
                    }
                </Typography>
            </div>
            <br />
            <div>
                <Typography title={'content'} position={'left'} color={'primary'}>
                {
                    language === 'English' ?
                    'So please bring your filled-out documents, as you will fill in this information in the program.'
                    :
                    "Assure-toi d’avoir ces documents remplis et accessibles lors de la prochaine session (dans 5 jours), puisque tu auras à inscrire ces informations dans le programme."
                    }
                </Typography>
            </div>
          <Button word={language === 'English' ? 'NEXT' : 'Suivant'} onClick={next} position={'center'} />

        </div>
      </div>
    </div>
  );
};

export default Session3Worksheet1end;