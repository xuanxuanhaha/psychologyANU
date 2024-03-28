import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './session1worksheet4q1.module.css';
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

const Session1worksheet4Q1 = () => {
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
    navigate(`/session1End`);
  };

  return (
    <div>
       <Navbar />
      <div className={styles.background_image} id="background_image">
        <div className={styles.whole_border}>
            <Typography title={'subtitle'} position={'left'}>
                {
                    language === 'English' ?
                    'SUMMARY'
                     :
                    'RÉSUMÉ'
                }
            </Typography>

            <ProgressBar percentageNo={100} language={language} />

            
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
                    <p>In this session, you learned about academic worry and how often it is experienced by students.</p>
                    :
                    <p>Lors de cette séance, tu as appris ce qu'est l’inquiétude scolaire et qu'il est très fréquent chez les personnes étudiantes.</p>
                }
            </Typography>
            <br />
            <Typography title={'content'} position={'left'} color={'primary'}>
                <div className={styles.tab}>
                    {
                        language === 'English' ?
                        <p>It is normal to feel worried about academic issues!</p>
                        :
                        <p>C’est normal de sentir de l’inquiétude quant à des difficultés académiques !</p>
                    }
                </div>

            </Typography>
            <br />
            <Typography title={'content'} position={'left'} color={'primary'} >
                {
                    language === 'English' ?
                    <p>You also learned about behavioural activation, the ability to create and practise goal-oriented behaviours to reduce academic worry. </p>
                    :
                    <p>Tu as aussi appris sur l’activation comportementale, la capacité à créer et à pratiquer des comportements axés sur un objectif afin de réduire l’inquiétude scolaire.</p>
                }
            </Typography>
            <br />
            <Typography title={'content'} position={'left'} color={'primary'} >
                <div className={styles.tab}>
                    {
                        language === 'English' ?
                        <p>You can create plans and practice these plans to feel less worried!</p>
                        :
                        <p>Tu peux créer des plans et les pratiquer pour sentir moins de souci !</p>
                    }
                </div>
            </Typography>
            <br />
            <Typography title={'content'} position={'left'} color={'primary'} >
                {
                    language === 'English' ?
                    <p>We also invited you to think about the multiple groups to which you belong to as a member of the university community.</p>
                    :
                    <p>Nous t’avons aussi invité à penser aux divers groupes auxquels tu appartiens en tant que membre de la communauté universitaire.</p>
                }
            </Typography>
            <br />
            <Typography title={'content'} position={'left'} color={'primary'} >
                <div className={styles.tab}>
                    {
                        language === 'English' ?
                        <p>You are not alone, you are part of a university community and belong to multiple university groups!</p>
                        :
                        <p>Tu n’es pas seul.e, tu fais partie d’une communauté universitaire et appartiens à plusieurs groupes universitaires !</p>
                    }
                </div>
            </Typography>
            <br />
            <Typography title={'content'} position={'left'} color={'primary'} >
                {
                    language === 'English' ?
                    <p>In the next session, we will put into action behavioural activation through your university community. We will see how your multiple group memberships at your university can provide the physical and psychological resources to help you succeed in your goals.</p>
                    :
                    <p>Lors de la prochaine séance, nous mettrons en action l’activation comportementale à travers ta communauté universitaire. Nous verrons comment tes divers groupes d’appartenance peuvent te fournir les ressources physiques et psychologiques qui t’aideront à réussir dans vos aspirations.</p>
                }
            </Typography>
            <br />
            <Button word={language === 'English' ? 'NEXT' : 'Suivant'} onClick={next} position={'center'} />
            </div>
            </div>

        </div>
    
  );
};

export default Session1worksheet4Q1;