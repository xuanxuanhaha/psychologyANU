import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './session1worksheet2q2.module.css';
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

const Session1worksheet2Q2 = () => {
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
    navigate(`/session1worksheet3q1`);
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

          <ProgressBar percentageNo={60} language={language} />

          <Typography title={'content'} position={'left'} color={'primary'} >
              {
                language === 'English' ?
                'In the previous section, we saw how academic worry is a problem for many students, and that it leads to cognitive, affective and behavioural difficulties. We also learned that worry functions as avoidance, although it may make you feel relieved in the short-term, it often leads to long-term negative consequences, and contributes to worry in the future.'
                :
                "Dans la section précédente, nous avons vu comment l’inquiétude scolaire est un problème pour plusieurs personnes étudiantes, et que cela mène à des difficultés cognitives, affectives et comportementales. Nous avons aussi appris que l’inquiétude fonctionne comme de l’évitement, bien que tu puisses ressentir un soulagement à court terme, elle entraîne souvent des conséquences négatives à long terme et contribue à l'inquiétude dans le futur."
              }
          </Typography>
          <br />
          <Typography title={'content'} position={'left'} color={'primary'} >
              {
                language === 'English' ?
                'In this section, you will learn some skills to cope with your worry.'
                :
                'Dans ce programme, tu apprendras des compétences pour faire face à ton inquiétude.'
              }
          </Typography>
          <br />
          <Typography title={'content'} position={'left'} color={'primary'} >
              {
                language === 'English' ?
                <p>One way of conquering avoidance is to have specific goals to work towards. By practising goal-oriented behaviours, you will be able to reduce avoidance related to academic worry (Behavioural Activation). Thankfully, as <b>a university student, you belong to a broader university community</b>, with members of this community working towards the same set of goal and values: helping students succeed academically. </p>
                :
                <p>Une façon pour conquérir l’évitement est d’avoir des objectifs spécifiques à atteindre. En pratiquant des comportements axés sur un objectif, tu pourrais réduire l’évitement relié à l’inquiétude scolaire (activation comportementale). Heureusement, en tant que <b>personne étudiante à l’université, tu appartiens à une large communauté universitaire</b>, dont ses membres travaillent sur les mêmes objectifs et valeurs : aider la population étudiante à réussir.</p>
              }
          </Typography>
          <br />
          <Typography title={'content'} position={'left'} color={'primary'} >
              {
                language === 'English' ?
                'As a university student, what groups do you belong to? These groups can be very broad, such as your university, or they can be very specific, like your sports team. They can be formally defined groups, such as your class/course, or informally defined, such as your group of friends. Other examples include tutor groups, study group, clubs and activities, lunch groups, friend’s groups at your university, and many more. The following section is designed to help you think about your groups and how important they can be for you.'
                :
                'En tant que personne étudiante à l’université, à quel groupe appartiens-tu ? Ces groupes peuvent être très grands, comme toute la communauté universitaire, ou ils peuvent être petits, comme ton équipe de sport. Ils peuvent être des groupes formels, comme ton groupe de classe, ou des groupes informels, comme ton groupe d’amis. D’autres exemples incluent des groupes d’étude, des clubs et d’activités, des groupes de lunch, des groupes d’amis dans l’université, et plein d’autres. La section suivante est désignée pour t’aider à penser à tes groupes et l’importance que tu leur apportes.'
              }
          </Typography>
            
            <Button word={language === 'English' ? 'Exercise B-1' : 'Exercice B-1'} onClick={next} position={'center'} outlook={'round'} />

            </div>
            </div>

        </div>
    
  );
};

export default Session1worksheet2Q2;