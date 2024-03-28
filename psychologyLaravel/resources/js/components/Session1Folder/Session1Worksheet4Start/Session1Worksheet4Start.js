import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './session1worksheet4start.module.css';
import Navbar from '../../Navbar/Navbar';
import { useSelector } from 'react-redux';
import lockericon from './../../../assets/assessment/oclock.jpg';
import english_chart from './english_chart.jpg'
import french_chart from './french_chart.png'
import avoid_cycle_france from './../../../assets/surveys/avoid_cycle_france.png'
import Button from '../../ReusableComponents/Button/Button';


import Modal from 'react-modal';
import ProgressBar from '../../ReusableComponents/ProgressBar/ProgressBar';
import Typography from '../../ReusableComponents/Typography/Typography';
import BorderContent from '../../ReusableComponents/BorderContent/BorderContent';
import TextField from '../../ReusableComponents/TextField/TextField';
import IconWordGrid from '../../ReusableComponents/IconWordGrid/IconWordGrid';

const Session1worksheet4Start = () => {
  const navigate = useNavigate();
  const userData = useSelector(state => state.auth.user);
  const language = userData.language  

  useEffect(() => {
    window.scrollTo(0, 0);
    const screenHeight = window.innerHeight;
    document.getElementById('background_image').style.minHeight = `${screenHeight - 100}px`;

  }, []);

  const next = () => {
    jumptonextpage()
  };
  const jumptonextpage = () => {
    navigate(`/session1worksheet4q1`);
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
              'First Session'
              :
              'Première session'
            }
          </Typography>

          <ProgressBar percentageNo={90} language={language} />

          <Typography title={'content'} position={'left'} color={'primary'} >
              {
                language === 'English' ?
                'It is good to be aware of the groups that you belong to as a university student. Feeling that you belong to social groups is good for your physical and psychological health.'
                :
                'Être conscient.e des groupes auxquels on appartient en tant que personne étudiante à l’université est bénéfique. Le sentiment d’appartenance à des groupes sociaux est bénéfique pour ta santé physique et psychologique.'
              }
          </Typography>
          <br />
          <Typography title={'content'} position={'left'} color={'primary'} >
              {
                language === 'English' ?
                'Here are some examples of how your group memberships can help you.'
                :
                'Voici des exemples démontrant comment vos groupes d’appartenance peuvent vous aider.'
              }
          </Typography>
          <br />
          {
            language === 'English' ?
            <img src={english_chart} className={styles.avoid_cycle_img} alt="Avoidance Cycle" />
            :
            <img src={french_chart} className={styles.avoid_cycle_img} alt="Avoidance Cycle" />
          }
          <br />
          <br />
          <Typography title={'content'} position={'left'} color={'primary'} >
              {
                language === 'English' ?
                <p>Being and feeling like you are part of a group can provide you with physical and psychological wellbeing. That is because being a member of groups gives you access to a wide variety of <b>resources </b>that help you solve everyday problems and achieve your goals.</p>
                :
                <p>Être et ressentir que tu fais partie d’un groupe peut te fournir du bien-être physique et psychologique. En effet, être un membre d’un groupe te donne accès à une grande variété de ressources qui t’aident à résoudre des problèmes quotidiens et à accomplir tes objectifs.</p>
              }
          </Typography>
          <br />
          <Typography title={'content'} position={'left'} color={'primary'} >
              {
                language === 'English' ?
                <p>Groups help you make sense of <b>what  </b>actions and values are important and <b>why </b>they are important. For example, your statistics class group tells you <b>what </b>is important for that group (doing statistics well) and <b>why </b>it is important (because it is part of your degree; because it is the basis for science). In other words, being a member of a group provides you with <b>clear goals and values</b>,  clear instructions about <b>what and why things matter</b>, which help guide your personal goals, values and behaviours. </p>
                :
                <p>Tes groupes t’aident à faire du sens de <b>quelles</b> actions et valeurs sont importantes et <b>pourquoi</b> elles sont importantes. Par exemple, le groupe de ton cours de statistiques te dit <b>qu’est-ce qui</b> est important pour ce groupe (bien faire des statistiques) et <b>pourquoi</b> cela est important (parce que cela fait partie de ton parcours, parce que c’est important en science). Autrement dit, être membre d’un groupe t'aide à créer <b>des objectifs et des valeurs clairs</b>, des instructions claires sur <b>ce qui est important et pourquoi</b>. Cette information aide en guidant tes objectifs personnels, tes valeurs et tes comportements.</p>
              }
          </Typography>
          {/* <Typography title={'content'} position={'left'} color={'primary'} >
              {
                language === 'English' ?
                <p>The following exercise is designed to help you think about how your groups’ goals and values may be aligned with your own goals and values.</p>
                :
                <p>The following exercise ... Need Translate!!!!</p>
              }
          </Typography> */}
            <Button word={'Suivant'} onClick={next} position={'center'} outlook={'round'} />

            </div>
            </div>

        </div>
    
  );
};

export default Session1worksheet4Start;