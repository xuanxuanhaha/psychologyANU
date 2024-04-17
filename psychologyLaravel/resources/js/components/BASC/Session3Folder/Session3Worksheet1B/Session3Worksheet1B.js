import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './session3worksheet1b.module.css';
import Navbar from '../../../Navbar/Navbar';
import { useSelector } from 'react-redux';
import lockericon from './../../../../assets/assessment/oclock.jpg';
import avoid_cycle from './../../../../assets/surveys/avoid_cycle.png'
import avoid_cycle_france from './../../../../assets/surveys/avoid_cycle_france.png'
import Button from '../../../ReusableComponents/Button/Button';


import Modal from 'react-modal';
import ProgressBar from '../../../ReusableComponents/ProgressBar/ProgressBar';
import Typography from '../../../ReusableComponents/Typography/Typography';
import BorderContent from '../../../ReusableComponents/BorderContent/BorderContent';
import TextField from '../../../ReusableComponents/TextField/TextField';

const Session3Worksheet1B = () => {
  const navigate = useNavigate();
  const userData = useSelector(state => state.auth.user);
  const language = userData.language

  const [sessionId, setSessionId] = useState(0);

  const [questionA, setQuestionA] = useState('');
  const [questionAError, setQuestionAError] = useState(false);
  const [questionB, setQuestionB] = useState('');
  const [questionBError, setQuestionBError] = useState(false);
  const [questionC, setQuestionC] = useState('');
  const [questionCError, setQuestionCError] = useState(false);

  const [questionD, setQuestionD] = useState('');
  const [questionDError, setQuestionDError] = useState(false);
  const [questionE, setQuestionE] = useState('');
  const [questionEError, setQuestionEError] = useState(false);
  const [questionF, setQuestionF] = useState('');
  const [questionFError, setQuestionFError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questionIssue, setQuestionIssue] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    const screenHeight = window.innerHeight;
    document.getElementById('background_image').style.minHeight = `${screenHeight - 100}px`;

    axios.get(`/api/sessionresponse/1?userid=${userData.userid}&&questionno=session1worksheetq1b`).then(response => {
      if(response.data){
        if(response.data.sessionresponse.response){
          const questionanswer = JSON.parse(response.data.sessionresponse.response)
          setQuestionIssue(questionanswer.q1)
        }
      }
    })
    .catch(error => {
      // Handle any errors
      console.error(error);
    });

    axios.get(`/api/sessionresponse/3?userid=${userData.userid}&&questionno=session3worksheet1b`)
    .then(response => {
    if(response.data){
        if(response.data.sessionresponse.response){
            const questionanswer = JSON.parse(response.data.sessionresponse.response)
            setQuestionA(questionanswer.q1)
            setQuestionB(questionanswer.q2)
            setQuestionC(questionanswer.q3)
            setQuestionD(questionanswer.q4)
            setQuestionE(questionanswer.q5)
            setQuestionF(questionanswer.q6)
        }
    }
    })
    .catch(error => {
    // Handle any errors
    console.error(error);
    });
  }, []);

  const next = () => {
    if (questionA === '') {
      setQuestionAError(true);
    } else {
      setQuestionAError(false);
    }
    if (questionB === '') {
        setQuestionBError(true);
    } else {
        setQuestionBError(false);
    }
    if (questionC === '') {
        setQuestionCError(true);
    } else {
        setQuestionCError(false);
    }

    if (questionD === '') {
      setQuestionDError(true);
    } else {
      setQuestionDError(false);
    }
    if (questionE === '') {
        setQuestionEError(true);
    } else {
        setQuestionEError(false);
    }
    if (questionF === '') {
        setQuestionFError(true);
    } else {
        setQuestionFError(false);
    }

    if (questionA !== '' && questionB !== '' && questionC !== '' && questionD !== '' && questionE !== '' && questionF !== '') {
      passData();
    }
  };

  const passData = () => {
    console.log('data uncaught')
    const data = {
        'userid': userData.userid,
        'sessionid': 3,
        'questionno': 'session3worksheet1b',
        'response': {'q1': questionA, 'q2': questionB, 'q3': questionC, 'q4': questionD, 'q5': questionE, 'q6': questionF}
    }
    axios.post(`/api/sessionresponse`, data)
        .then(response => {
            jumptonextpage()
        })
        .catch(error => {
        // Handle any errors
        console.error(error);
    });
  };

  const jumptonextpage = () => {
    navigate(`/session3worksheet2b`);
  };

  const openDialogWithTemplateRef = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };



  return (
    <div>
       <Navbar />
      <div className={styles.background_image} id="background_image">
        <div className={styles.whole_border}>
            <Typography title={'subtitle'} position={'left'}>
                Third Session
            </Typography>

            <ProgressBar percentageNo={33} language={language} />
            <br />
            <Typography title={'content'} position={'left'} >
              {
                language === 'English' ?
                <p>One way of conquering avoidance is to have specific goals to work towards. By practising goal-oriented behaviours, you will be able to reduce avoidance related to academic worry. This is called <b>Behavioural Activation</b>.</p>
                :
                <p>Lors de cette séance, nous allons revoir les concepts et les exercices que nous avons appris lors des dernières séances.</p>
              }
            </Typography>
            <br />

          <div>
            <Typography title={'content'} position={'center'} color={'primary'}>
            {
                  language === 'English' ?
                  <b>EXERCISE B-1</b>
                  :
                  'Pense à des problèmes reliés aux études dont tu t’es inquiété pendant la semaine dernière. Il peut s’agir d’un travail, un examen, un projet de groupe, arriver aux cours à temps, ou même rester éveillé lors des cours.'
                }
            </Typography>
          </div>

            <BorderContent>
                {
                    language === 'English' ?
                    <p> Think about some goals you might have in relation to academic-related
                      <b onClick={openDialogWithTemplateRef}>
                          <u>
                          <i> ISSUE </i>
                          </u>
                      </b> written in Worksheet 1.  Write down <b>THREE </b>goals.</p>
                    :
                    <p> Maintenant, réfléchissons aux objectifs que tu peux avoir en relation avec la problématique universitaire écrite dans la 
                      <b onClick={openDialogWithTemplateRef}>
                          <u>
                          <i> Fiche 1 </i>
                          </u>
                      </b>
                      
                      . Écris <b>TROIS</b> objectifs.</p>
                }
            </BorderContent>

            <TextField 
              rows="4"
              cols="50"
              title={''}
              value={questionA}
              onChange={(e) => {
                setQuestionA(e.target.value)
                setQuestionAError(false)
              }}
              placeholder={
                language === 'English' ?
                "e.g.  My goal is to finish studying for my upcoming exam."
                :
                'p. ex. Mon objectif est de finir d’étudier pour mon prochain examen.'
              }
              questionError={questionAError}
              errorWarningText={ language === 'English' ? 'Please input your answer' : 'Ajoute une réponse.'}
            />

            <BorderContent>
                {
                    language === 'English' ?
                    <p> Select <b>one goal </b>and consider how the goal relates to the questions below, and write down your responses in the spaces provided below. </p>
                    :
                    <p> Choisis <b>un objectif </b>et pense à son rapport avec les questions ci-dessous, puis écris tes réponses dans les espaces fournis ci-dessous.</p>
                }
            </BorderContent>

            <TextField 
              rows="4"
              cols="50"
              title={
                language === 'English' ?
                <i>What exactly do you want to accomplish? (Write one sentence to describe your goal.)</i>
                :
                <i>Que veux-tu accomplir exactement ? (Écris une phrase pour décrire ton objectif.)</i>
              }
              value={questionB}
              onChange={(e) => {
                setQuestionB(e.target.value)
                setQuestionBError(false)
              }}
              placeholder={
                language === 'English' ?
                "e.g. My goal is to finish studying for my upcoming exam in biology."
                :
                'p. ex. Mon objectif est de finir d’étudier pour mon prochain examen de biologie.'
              }
              questionError={questionBError}
              errorWarningText={ language === 'English' ? 'Please input your answer' : 'Ajoute une réponse.'}
            />

            <TextField 
              rows="4"
              cols="50"
              title={
                language === 'English' ?
                <i>How is this goal related your groups goals and values?</i>
                :
                <i>En quoi se relie ton objectif aux objectifs et aux valeurs de tes groupes ?</i>
              }
              value={questionC}
              onChange={(e) => {
                setQuestionC(e.target.value)
                setQuestionCError(false)
              }}
              placeholder={
                language === 'English' ?
                "e.g. The goal of my biology tutor group is to help me understand biological concepts."
                :
                'p.ex. L’objectif de mon groupe de biologie est de m’aider à comprendre les concepts biologiques.'
              }
              questionError={questionCError}
              errorWarningText={ language === 'English' ? 'Please input your answer' : 'Ajoute une réponse.'}
            />
            
            <TextField 
              rows="4"
              cols="50"
              title={
                language === 'English' ?
                <i>What group resources do you plan to use to accomplish your goal?</i>
                :
                <i>Quelles ressources de groupes prévois-tu utiliser pour atteindre ton objectif ?</i>
              }
              value={questionD}
              onChange={(e) => {
                setQuestionD(e.target.value)
                setQuestionDError(false)
              }}
              placeholder={
                language === 'English' ?
                "e.g. I could create a study group with two other members of my tutor group. We could meet every week to quiz each other on the content of the course."
                :
                'p. ex. Je pourrais créer un groupe d’étude avec deux autres membres de mon groupe de biologie. Nous pourrions nous rencontrer chaque semaine pour nous tester sur le contenu du cours.'
              }
              questionError={questionDError}
              errorWarningText={ language === 'English' ? 'Please input your answer' : 'Ajoute une réponse.'}
            />
            
            <TextField 
              rows="4"
              cols="50"
              title={
                language === 'English' ?
                <i>How will you know when you have accomplished your goal? </i>
                :
                <i>Comment vas-tu savoir quand tu auras atteint ton objectif ?</i>
              }
              value={questionE}
              onChange={(e) => {
                setQuestionE(e.target.value)
                setQuestionEError(false)
              }}
              placeholder={
                language === 'English' ?
                "e.g., I will know that I have accomplished my goal when I am able to summarise the topics without looking at my lecture notes of study material. "
                :
                'p.ex. Je saurai que j’ai atteint mon objectif quand je vais être capable de résumer les sujets sans avoir à regarder mes notes de cours.'
              }
              questionError={questionEError}
              errorWarningText={ language === 'English' ? 'Please input your answer' : 'Ajoute une réponse.'}
            />
            
            <TextField 
              rows="4"
              cols="50"
              title={
                language === 'English' ?
                <i>When do you want to accomplish your goal? </i>
                :
                <i>Quand veux-tu atteindre ton objectif ?</i>
              }
              value={questionF}
              onChange={(e) => {
                setQuestionF(e.target.value)
                setQuestionFError(false)
              }}
              placeholder={
                language === 'English' ?
                "e.g. I want to finish studying for my exam at least 1 day before the actual exam. "
                :
                'p.ex. Je veux finir d’étudier pour mon examen au moins 1 jour avant l’examen.'
              }
              questionError={questionFError}
              errorWarningText={ language === 'English' ? 'Please input your answer' : 'Ajoute une réponse.'}
            />

            <Button word={language === 'English' ? 'NEXT' : 'Suivant'} onClick={next} position={'center'} />

            </div>
            </div>

            <Modal
              isOpen={isModalOpen}
              onRequestClose={closeModal}
              contentLabel="Issue Dialog"
              ariaHideApp={false}
              style={{
                overlay: {
                  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Background color of the overlay
                },
                content: {
                  width: '300px', // Width of the modal content
                  height: '300px',
                  margin: 'auto', // Center the modal horizontally
                  padding: '20px', // Padding inside the modal content
                  borderRadius: '8px', // Rounded corners
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // Box shadow
                  backgroundColor: 'white', // Background color of the modal content
                },
              }}
            >
              {questionIssue}
            </Modal>
        </div>
    
  );
};

export default Session3Worksheet1B;