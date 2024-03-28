import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './session2summary.module.css';
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
import IconWordGrid from '../../ReusableComponents/IconWordGrid/IconWordGrid';

const Session2Summary = () => {
  const navigate = useNavigate();
  const userData = useSelector(state => state.auth.user);
  const language = userData.language

  const [questionA, setQuestionA] = useState('');
  

  useEffect(() => {
    window.scrollTo(0, 0);
    const screenHeight = window.innerHeight;
    document.getElementById('background_image').style.minHeight = `${screenHeight - 100}px`;

  }, []);

  const next = () => {
    jumptonextpage()
  };
  const jumptonextpage = () => {
    navigate(`/session2end`);
  };

  return (
    <div>
        {/* Assuming you have a navbar component */}
      <Navbar />
      <div className={styles.background_image} id="background_image">
        <div className={styles.whole_border}>
          <Typography title={'subtitle'} position={'left'}>
            {
            language === 'English' ?
            <p>Second Session Summary</p>
            :
            <p>RÉSUMÉ</p>

            }
          </Typography>

          <ProgressBar percentageNo={100} language={language} />

          <Typography title={'content'} position={'left'} color={'primary'} >
              {
                language === 'English' ?
                'In this session, you learned about behavioural activation, the ability to create and practise goal-oriented behaviours to reduce academic worry. We encouraged you to think about the goals and values of your university group and the resources they offer. '
                :
                'Lors de cette séance, tu as appris ce qu’est l’activation comportementale, la capacité à créer et à pratiquer des comportements axés vers un objectif afin de réduire l’inquiétude scolaire. Nous t’avons encouragé à réfléchir aux objectifs et aux valeurs de ton groupe universitaire et les ressources qu’ils t’offrent.'
              }
          </Typography>
          <br />
          <Typography title={'content'} position={'left'} color={'primary'} >
            <div className={styles.tab}>
              {
                language === 'English' ?
                'You are not alone, you are part of a university community! You share in their goals and values. '
                :
                'Tu n’es pas seul.e, tu fais partie de la communauté universitaire ! Tu partages leurs objectifs et leurs valeurs !'
              }
              </div>
          </Typography>
          <br />
          <Typography title={'content'} position={'left'} color={'primary'} >
              {
                language === 'English' ?
                <p>You also thought about your goals, and scheduled activities that would help you achieve your goals. </p>
                :
                <p>Tu as aussi réfléchi à tes objectifs, et planifié des activités qui t’aideraient à accomplir tes objectifs. </p>
              }
          </Typography>
          <br />
          <Typography title={'content'} position={'left'} color={'primary'} >
              <div className={styles.tab}>
                  {
                    language === 'English' ?
                    'You can plan activities that are in line with your goals! '
                    :
                    'Tu peux planifier des activités qui sont en ligne avec tes objectifs !'
                  }
              </div>
          </Typography>
          <br />
          <Typography title={'content'} position={'left'} color={'primary'} >
            <div className={styles.tab}>
              {
                language === 'English' ?
                'Your groups have physical and psychological resources that can help you in your goals. '
                :
                'Tes groupes ont des ressources physiques et psychologiques qui peuvent t’aider dans la poursuite de tes objectifs.'
              }
              </div>
          </Typography>
          <br />
          <Typography title={'content'} position={'left'} color={'primary'} >
              {
                language === 'English' ?
                'To best make use of this program, we encourage you to practice this schedule for the next two weeks. We will revisit it together in the last session of the program.'
                :
                'Pour une utilisation optimale de ce programme, nous t’encourageons à pratiquer cet horaire pour les deux prochaines semaines. Nous allons le revisiter lors de la dernière séance du programme.'
              }
          </Typography>
          <br />
          <Typography title={'content'} position={'left'} color={'primary'} >
              {
                language === 'English' ?
                'In the next session, you will learn another new skill: Self-compassion. See you then.'
                :
                'Dans la prochaine séance, tu vas apprendre une nouvelle compétence: l’autocompassion. À bientôt!'
              }
          </Typography>
            
            <Button word={language === 'English' ? 'Exercise B-1' : 'Suivant'} onClick={next} position={'center'} outlook={'round'} />

            </div>
            </div>

        </div>
    
  );
};

export default Session2Summary;