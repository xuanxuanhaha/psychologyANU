import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './session1worksheetq2b.module.css';
import Navbar from '../../../Navbar/Navbar';
import { useSelector } from 'react-redux';
import lockericon from './../../../../assets/assessment/oclock.jpg';
import Modal from 'react-modal';
import Button from '../../../ReusableComponents/Button/Button';
import ProgressBar from '../../../ReusableComponents/ProgressBar/ProgressBar';
import BorderContent from '../../../ReusableComponents/BorderContent/BorderContent';
import TextField from '../../../ReusableComponents/TextField/TextField';
import Typography from '../../../ReusableComponents/Typography/Typography';

const Session1WorksheetQ2B = () => {
  const navigate = useNavigate();
  const userData = useSelector(state => state.auth.user);
  const language = userData.language
  const [sessionId, setSessionId] = useState(0);
  const [questionIssue, setQuestionIssue] = useState('');

  const [questionA, setQuestionA] = useState('');
  const [questionB, setQuestionB] = useState('');
  const [questionC, setQuestionC] = useState('');
  const [questionAError, setQuestionAError] = useState(false);
  const [questionBError, setQuestionBError] = useState(false);
  const [questionCError, setQuestionCError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const screenHeight = window.innerHeight;
    document.getElementById('background_image').style.minHeight = `${screenHeight - 100}px`;

    if(userData){
        axios.get(`/api/sessionresponse/1?userid=${userData.userid}&&questionno=session1WorksheetQ1B`).then(response => {
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

        axios.get(`/api/sessionresponse/1?userid=${userData.userid}&&questionno=session1WorksheetQ2B`)
          .then(response => {
            if(response.data){
              if(response.data.sessionresponse.response){
                const questionanswer = JSON.parse(response.data.sessionresponse.response)
                setQuestionA(questionanswer.q1)
                setQuestionB(questionanswer.q2)
                setQuestionC(questionanswer.q3)
              }
            }
          })
          .catch(error => {
            // Handle any errors
            console.error(error);
          });
    }
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
    if (questionA !== '' && questionB !== '' && questionC !== '') {
      passData();
    }
  };

  const passData = () => {
    console.log('data uncaught')
    const data = {
        'userid': userData.userid,
        'sessionid': 1,
        'questionno': 'session1WorksheetQ2B',
        'response': {'q1': questionA, 'q2': questionB, 'q3': questionC}
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
    navigate(`/session1worksheet2startb`);
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
          {
              language === 'English' ?
              'First Session'
              :
              'Première session'
            }
          </Typography>


          <ProgressBar percentageNo={80} language={language} />


          <div className={styles.question_content}>

            <BorderContent>
              {
                language === 'English' ?
                  <div>
                      What are your <b>FEELINGS</b>, <b>THOUGHTS</b>, and <b>BEHAVIOURS</b> in response to the &nbsp;
                      <b onClick={openDialogWithTemplateRef}>
                          <u>
                          <i>ISSUE</i>
                          </u>
                      </b>
                  </div>
                  :
                  <div>
                      Quels sont tes <b>SENTIMENTS</b>, tes <b>PENSÉES </b> et tes <b>COMPORTEMENTS </b> en réponse au &nbsp;
                      <b onClick={openDialogWithTemplateRef}>
                          <u>
                          <i>problème</i>
                          </u>
                      </b>
                  </div>
              }
            </BorderContent>
            </div>

            <TextField 
              rows="4"
              cols="50"
              title={
                language === 'English' ?
                <i><b>FEELINGS</b> (Write <b>no more than THREE</b> sentences)</i>
                :
                <i><b>SENTIMENTS</b> (Ne <b>pas</b> écrire <b>plus que TROIS</b> phrases)</i>
              }
              value={questionA}
              onChange={(e) => {
                setQuestionA(e.target.value)
                setQuestionAError(false)
              }}
              placeholder={
                language === 'English' ?
                "e.g. I feel stressed and unmotivated. I feel incompetent, like I'm the only one who struggles this much."
                :
                "p. ex. Je me sens stressé et démotivé. Je me sens incompétent, comme si j’étais la seule personne à avoir autant de difficultés."
              }
              questionError={questionAError}
              errorWarningText={ language === 'English' ? 'Please input your answer' : 'Ajoute une réponse.'}
            />

            <TextField 
              rows="4"
              cols="50"
              title={
                language === 'English' ?
                <i><b>THOUGHTS</b> (Write <b>no more than THREE</b> sentences)</i>
                :
                <i><b>PENSEÉS</b> (Ne <b>pas</b> écrire <b>plus que TROIS</b> phrases)</i>
              }
              value={questionB}
              onChange={(e) => {
                setQuestionB(e.target.value)
                setQuestionBError(false)
              }}
              placeholder={
                language === 'English' ?
                "e.g. I keep thinking that I won't do well on this exam because I messed up the last exam. I must be terrible at exams. Maybe I'm just not smart enough for this."
                :
                "p. ex. Je ne cesse de penser que je vais rater mon prochain examen parce que j’ai mal fait le dernier examen. Je dois être terrible à faire des examens. Je ne suis peut-être pas assez intelligent pour cela."
              }
              questionError={questionBError}
              errorWarningText={ language === 'English' ? 'Please input your answer' : 'Ajoute une réponse.'}
            />

            <TextField 
              rows="4"
              cols="50"
              title={
                language === 'English' ?
                <i><b>BEHAVIOURS</b> (Write <b>no more than THREE</b> sentences)</i>
                :
                <i><b>COMPORTEMENTS</b> (Ne <b>pas</b> écrire <b>plus que TROIS</b> phrases)</i>
              }
              value={questionC}
              onChange={(e) => {
                setQuestionC(e.target.value)
                setQuestionCError(false)
              }}
              placeholder={
                language === 'English' ?
                "e.g. I can't focus on studying and always end up surfing Facebook when I try to study."
                :
                "p. ex. Je n’arrive pas à me concentrer et je finis toujours par naviguer sur TikTok quand j’essaie d’étudier."
              }
              questionError={questionCError}
              errorWarningText={ language === 'English' ? 'Please input your answer' : 'Ajoute une réponse.'}
            />
          <Button word={language === 'English' ? 'NEXT' : 'Suivant'} onClick={next} position={'right'} />
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

export default Session1WorksheetQ2B;