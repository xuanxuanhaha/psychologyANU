import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './session2.module.css';
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

const Session2 = () => {
  const navigate = useNavigate();
  const userData = useSelector(state => state.auth.user);
  const language = userData.language


  useEffect(() => {
    window.scrollTo(0, 0);
    const screenHeight = window.innerHeight;
    document.getElementById('background_image').style.minHeight = `${screenHeight - 100}px`;

    
  }, []);

  const next = () => {
      passData();
  };

  const passData = () => {
    jumptonextpage()
  };

  const jumptonextpage = () => {
    navigate(`/session2worksheet1q1`);
  };

  return (
    <div>
       <Navbar />
      <div className={styles.background_image} id="background_image">
        <div className={styles.whole_border}>
            <Typography title={'title'}  position={'center'} color={'primary'}>
            {
              language === 'English' ?
              'Worksheet 2' :
              'Séance 2'
            }
            </Typography>
            <br />
            <br />
            <Typography title={'content'} position={'left'} color={'primary'} >
                {
                  language === 'English' ?
                  'In the previous session, you learned about academic worry and how often it is experienced by students. '
                  :
                  <p>Durant la dernière séance, tu as appris ce qu'est l’inquiétude scolaire et à quel point elle est vécue par la population étudiante.</p>
                }
            </Typography>
            <br />
            <Typography title={'content'} position={'left'} color={'primary'} >
                <div className={styles.tab}>

                    {
                      language === 'English' ?
                      ''
                      :
                      <p>C’est normal de s’inquiéter au sujet de ses études !</p>
                    }
                </div>
            </Typography>

            <br />
            <Typography title={'content'} position={'left'} color={'primary'} >
              {
                language === 'English' ?
                <p>You also learned about behavioural activation, the ability to create and practise goal-oriented behaviours to reduce academic worry.</p>
                :
                <p>Tu as aussi appris par rapport à l’activation comportementale, soit la capacité de créer et d’adopter des comportements fixés sur des objectifs pour réduire l’inquiétude scolaire.</p>
              }
            </Typography>
            <br />
            <Typography title={'content'} position={'left'} color={'primary'} >
              <div className={styles.tab}>
                {
                  language === 'English' ?
                  <p>You can create plans and practice these plans to feel less worried!</p>
                  :
                  <p>Tu peux créer des plans et les pratiquer pour moins te soucier !</p>
                }
              </div>
            </Typography>
            <br />
            <Typography title={'content'} position={'left'} color={'primary'} >
              {
                language === 'English' ?
                <p>We also invited you to think about the multiple groups to which you belong to as a member of the university community. </p>
                :
                <p>Nous t’avons aussi invité à réfléchir sur les groupes auxquels tu appartiens en tant que membre de la communauté universitaire.</p>
              }
            </Typography>
            <br />
            <Typography title={'content'} position={'left'} color={'primary'} >
              <div className={styles.tab}>
                {
                  language === 'English' ?
                  <p>You are not alone, you are part of a university community and belong to multiple university groups! </p>
                  :
                  <p>Tu n’es pas seul.e, tu fais partie d’une communauté universitaire et tu appartiens à plusieurs groupes au sein de l’université !</p>
                }
              </div>
            </Typography>
            <br />
            <Typography title={'content'} position={'left'} color={'primary'} >
              {
                language === 'English' ?
                <p>In this session, we will put into action behavioural activation through your university community. </p>
                :
                <p>Dans cette séance, nous allons mettre en action l’activation comportementale à l’aide de ta communauté universitaire. </p>
              }
            </Typography>

            <br />
            <Typography title={'content'} position={'left'} color={'primary'} >
              {
                language === 'English' ?
                <p>The following exercise is designed to help you think about how your groups’ goals and values may be aligned with your own goals and values.</p>
                :
                <p>L’exercice suivant vise à t’aider à réfléchir sur la façon dont les objectifs et les valeurs de tes groupes s’alignent avec les tiens.</p>
              }
            </Typography>
            <br />
            <Button word={language === 'English' ? 'NEXT' : 'Suivant'} onClick={next} position={'center'} />
            </div>
            </div>

        </div>
    
  );
};

export default Session2;