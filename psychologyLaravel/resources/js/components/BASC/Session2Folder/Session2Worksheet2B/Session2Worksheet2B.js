import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './session2worksheet2b.module.css';
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

const Session2Worksheet2B = () => {
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

  
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questionIssue, setQuestionIssue] = useState('');

  const [goal, setGoal] = useState('')

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

    axios.get(`/api/sessionresponse/2?userid=${userData.userid}&&questionno=session2worksheet1b`).then(response => {
        if(response.data){
          if(response.data.sessionresponse.response){
            const questionanswer = JSON.parse(response.data.sessionresponse.response)
            setGoal(questionanswer.q1)
          }
        }
      })
      .catch(error => {
        // Handle any errors
        console.error(error);
      });

    axios.get(`/api/sessionresponse/2?userid=${userData.userid}&&questionno=session2worksheet2b`)
    .then(response => {
    if(response.data){
        if(response.data.sessionresponse.response){
            const questionanswer = JSON.parse(response.data.sessionresponse.response)
            setQuestionA(questionanswer.q1)
            setQuestionB(questionanswer.q2)
            setQuestionC(questionanswer.q3)
            setQuestionD(questionanswer.q4)
            setQuestionE(questionanswer.q5)
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
    if (questionA !== '' && questionB !== '' && questionC !== '' && questionD !== '' && questionE !== '' ) {
      passData();
    }
  };

  const passData = () => {
    console.log('data uncaught')
    const data = {
        'userid': userData.userid,
        'sessionid': 2,
        'questionno': 'session2worksheet2b',
        'response': {'q1': questionA, 'q2': questionB, 'q3': questionC, 'q4': questionD, 'q5': questionE,}
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
    navigate(`/session2worksheet3b`);
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
                Session 2
            </Typography>

            <ProgressBar percentageNo={66} language={language} />
            <br />
            
            <BorderContent>
                {
                    language === 'English' ?
                    <p> Let’s try another
                      <b onClick={openDialogWithTemplateRef}>
                          <u>
                          <i> Goal </i>
                          </u>
                      </b> and consider how the goal relates to the questions below, and write down your responses in the spaces provided below. </p>
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
              title={
                language === 'English' ?
                <i>What exactly do you want to accomplish? (Write one sentence to describe your goal.)</i>
                :
                <i>Que veux-tu accomplir exactement ? (Écris une phrase pour décrire ton objectif.)</i>
              }
              value={questionA}
              onChange={(e) => {
                setQuestionA(e.target.value)
                setQuestionAError(false)
              }}
              placeholder={
                language === 'English' ?
                "e.g. My goal is to finish studying for my upcoming exam."
                :
                'p. ex. Mon objectif est de finir d’étudier pour mon prochain examen de biologie.'
              }
              questionError={questionAError}
              errorWarningText={ language === 'English' ? 'Please input your answer' : 'Ajoute une réponse.'}
            />

            <TextField 
              rows="4"
              cols="50"
              title={
                language === 'English' ?
                <i>What actions do you plan to take to accomplish your goal?</i>
                :
                <i>En quoi se relie ton objectif aux objectifs et aux valeurs de tes groupes ?</i>
              }
              value={questionB}
              onChange={(e) => {
                setQuestionB(e.target.value)
                setQuestionBError(false)
              }}
              placeholder={
                language === 'English' ?
                "e.g. I want to study all the topics that will be tested, starting chapter 1 on Monday."
                :
                'p.ex. L’objectif de mon groupe de biologie est de m’aider à comprendre les concepts biologiques.'
              }
              questionError={questionBError}
              errorWarningText={ language === 'English' ? 'Please input your answer' : 'Ajoute une réponse.'}
            />
            
            <TextField 
              rows="4"
              cols="50"
              title={
                language === 'English' ?
                <i>How will you know when you have accomplished your goal?</i>
                :
                <i>Quelles ressources de groupes prévois-tu utiliser pour atteindre ton objectif ?</i>
              }
              value={questionC}
              onChange={(e) => {
                setQuestionC(e.target.value)
                setQuestionCError(false)
              }}
              placeholder={
                language === 'English' ?
                "e.g. I will know that I have accomplished my goal when I am able to summarise the topics without looking at my lecture notes of study material. "
                :
                'p. ex. Je pourrais créer un groupe d’étude avec deux autres membres de mon groupe de biologie. Nous pourrions nous rencontrer chaque semaine pour nous tester sur le contenu du cours.'
              }
              questionError={questionCError}
              errorWarningText={ language === 'English' ? 'Please input your answer' : 'Ajoute une réponse.'}
            />
            
            <TextField 
              rows="4"
              cols="50"
              title={
                language === 'English' ?
                <i>When do you want to accomplish your goal? </i>
                :
                <i>Comment vas-tu savoir quand tu auras atteint ton objectif ?</i>
              }
              value={questionD}
              onChange={(e) => {
                setQuestionD(e.target.value)
                setQuestionDError(false)
              }}
              placeholder={
                language === 'English' ?
                "e.g. I want to finish studying for my exam at least 1 day before the actual paper."
                :
                'p.ex. Je saurai que j’ai atteint mon objectif quand je vais être capable de résumer les sujets sans avoir à regarder mes notes de cours.'
              }
              questionError={questionDError}
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
              value={questionE}
              onChange={(e) => {
                setQuestionE(e.target.value)
                setQuestionEError(false)
              }}
              placeholder={
                language === 'English' ?
                "e.g. I want to finish studying for my exam at least 1 day before the actual exam. "
                :
                'p.ex. Je veux finir d’étudier pour mon examen au moins 1 jour avant l’examen.'
              }
              questionError={questionEError}
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
              {goal}
            </Modal>
        </div>
    
  );
};

export default Session2Worksheet2B;