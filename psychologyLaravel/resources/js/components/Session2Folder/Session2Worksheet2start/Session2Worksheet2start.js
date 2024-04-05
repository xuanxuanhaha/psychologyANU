import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './session2worksheet2start.module.css';
import Navbar from '../../Navbar/Navbar';
import { useSelector } from 'react-redux';
import lockericon from './../../../assets/assessment/oclock.jpg';
import english_chart_team from './english_chart_team.jpg'
import french_chart_team from './french_chart_team.png'
import avoid_cycle_france from './../../../assets/surveys/avoid_cycle_france.png'
import Button from '../../ReusableComponents/Button/Button';


import Modal from 'react-modal';
import ProgressBar from '../../ReusableComponents/ProgressBar/ProgressBar';
import Typography from '../../ReusableComponents/Typography/Typography';
import BorderContent from '../../ReusableComponents/BorderContent/BorderContent';
import TextField from '../../ReusableComponents/TextField/TextField';

const Session1worksheet2Q1 = () => {
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
    navigate(`/session2worksheet2q1`);
  };


  return (
    <div>
       <Navbar />
      <div className={styles.background_image} id="background_image">
        <div className={styles.whole_border}>
          <Typography title={'subtitle'} position={'left'}>
            {
              language === 'English' ?
              'Second Session'
              :
              'Deuxième session'
            }
          </Typography>

          <ProgressBar percentageNo={72} language={language} />
            
            <br />
            <br />
            <Typography title={'content'} position={'center'} color={'primary'}>
                {
                    language === 'English' ?
                    <b>Resources Provided by Groups</b>
                    : <b>Ressources fournies par les groupes</b>
                }
            </Typography>
            <br />
            <br />

            <BorderContent>
                  {
                    language === 'English' ?
                    <p>By being a member of a group, you get the “ <b>how to</b>” or tools necessary to achieve the valued actions. Going back to the statistical course example, being in the statistics course gives you access to the lecturer, tutors, textbooks, fellow students who want to study with you, a shared community that understand the pain of statistics and many such resources to help you succeed in your shared goal to learn statistics. </p>
                    :
                    <p>En étant membre d’un groupe, tu obtiens « <b>le comment</b> » ou les outils nécessaires pour accomplir les actions valorisées. Si nous retournons à l’exemple du cours de statistiques, être inscrit au cours te donne accès au professeur, aux auxiliaires d’enseignement, aux manuels, au groupe étudiant qui va vouloir étudier avec toi, une communauté qui comprend la souffrance d’apprendre des statistiques et les différentes ressources qui t’aideront à réussir dans l‘objectif partagé d’apprendre les statistiques.</p>
                  }
           
                  {
                    language === 'English' ?
                    <p>These are but a few examples of the<b>resources that university groups can provide you </b>to help you succeed at your student goals and live your student values. Here are some additional examples of various groups and the resources they provide.</p>
                    :
                    <p>Ceux-ci ne sont que quelques exemples des <b>ressources que les groupes universitaires peuvent te fournir</b> pour t'aider à réussir dans tes objectifs étudiants et vivre tes valeurs étudiantes. Voici quelques exemples additionnels des différents groupes et des ressources qu’ils fournissent.</p>
                  }
                    <br />

                    {
                      language === 'English' ?
                      <img src={english_chart_team} className={styles.avoid_cycle_img} alt="Avoidance Cycle" />
                      :
                      <img src={french_chart_team} className={styles.avoid_cycle_img} alt="Avoidance Cycle" />
                    }
                    
                    <br />
                    <br />
                    
                    {
                        language === 'English' ?
                        <p>It is a good thing to be aware of the groups that you belong to, how they align with your goals and values, and the resources that they offer you! Knowing “who we are” and “what we stand for”  can help you figure out “who I am” and what “I stand for”. In addition, knowing about the group’s resources can help you reach out for them, use them and harness their power to achieve your own goals. </p>
                        :
                        <p>C’est une bonne chose d’être conscient.e des groupes auxquels tu appartiens, s'ils s’alignent avec tes objectifs et valeurs, et les ressources qu’ils t’offrent ! Savoir « qui nous sommes » et ce qui «  nous définit » peut t’aider à comprendre « qui je suis » et ce qui « me définit  ». De plus, connaître les ressources du groupe peut t’aider à y accéder, à les utiliser et à les déployer pour accomplir tes propres objectifs.</p>
                    }
                    {
                        language === 'English' ?
                        <p>The following exercises are designed to help you identify group resources and how you can use them to address the academic-related issue identified in worksheet 1.</p>
                        :
                        <p>Les exercices suivants sont conçus pour t’aider à identifier les ressources accessibles chez les groupes et comment les utiliser pour aborder le problème relié aux études identifié dans la fiche 1.</p>
                    }


            </BorderContent>

            <Button word={'Exercise B-3'} onClick={next} position={'center'} />

            </div>
            </div>

        </div>
    
  );
};

export default Session1worksheet2Q1;