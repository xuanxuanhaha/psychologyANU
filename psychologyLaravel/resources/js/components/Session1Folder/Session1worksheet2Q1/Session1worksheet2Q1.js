import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './session1worksheet2q1.module.css';
import Navbar from '../../Navbar/Navbar';
import { useSelector } from 'react-redux';
import lockericon from './../../../assets/assessment/oclock.jpg';
import avoid_cycle_clear from './../../../assets/surveys/avoid_cycle_clear.jpg'
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

  const [sessionId, setSessionId] = useState(0);

  const [isThoughtModalOpen, setIsThoughtModalOpen] = useState(false);
  const [isBehaviourModalOpen, setIsBehaviourModalOpen] = useState(false);
  const [questionA, setQuestionA] = useState('');
  const [questionAError, setQuestionAError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [thought, setThought] = useState('');
  const [behaviour, setBehaviour] = useState('');



  const openThoughtModal = () => {
    setIsThoughtModalOpen(true);
  };

  const openBehaviourModal = () => {
    setIsBehaviourModalOpen(true);
  };

  const closeModal = () => {
    setIsThoughtModalOpen(false);
    setIsBehaviourModalOpen(false);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    const screenHeight = window.innerHeight;
    document.getElementById('background_image').style.minHeight = `${screenHeight - 100}px`;

    if(userData){
        axios.get(`/api/sessionresponse/1?userid=${userData.userid}&&questionno=session1WorksheetQ2`).then(response => {
            if(response.data){
              if(response.data.sessionresponse.response){
                const questionanswer = JSON.parse(response.data.sessionresponse.response)
                setThought(questionanswer.q2)
                setBehaviour(questionanswer.q3)
              }
            }
          })
          .catch(error => {
            // Handle any errors
            console.error(error);
          });
        
        axios.get(`/api/sessionresponse/1?userid=${userData.userid}&&questionno=session1worksheet2q1`)
        .then(response => {
        if(response.data){
            if(response.data.sessionresponse.response){
            const questionanswer = JSON.parse(response.data.sessionresponse.response)
            setQuestionA(questionanswer.q1)
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

    if (questionA !== '') {
      passData();
    }
  };

  const passData = () => {
    console.log('data uncaught')
    const data = {
        'userid': userData.userid,
        'sessionid': 1,
        'questionno': 'session1worksheet2q1',
        'response': {'q1': questionA}
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
    navigate(`/session1End`);

    // navigate(`/session1worksheet2q2`);
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

          <ProgressBar percentageNo={100} language={language} />

            <Typography title={'content'} position={'center'} color={'primary'}>
              <b>EXERCISE A</b>
            </Typography>
            <BorderContent>
                  {
                    language === 'English' ?
                    'Worry can be described as negative thoughts and emotions about a future task or event. In order to "escape" these negative thoughts and emotions, people often respond by trying to avoid the task or event that causes worry.'
                    :
                    "L’inquiétude peut être décrite comme des pensées et des émotions négatives quant à une tâche ou un événement futur. Pour « fuir » ces pensées et ces émotions négatives, les gens ont tendance à répondre en évitant la tâche ou l’événement qui est leur cause d’inquiétude."
                  }

                  <br />
                  <br />
                  {
                    language === 'English' ?
                    'People can engage in avoidance in many different ways. One student might procrastinate by surfing the internet, or hanging out with friends. Another student might work on less urgent assignments so as to avoid working on a difficult assignment. Even worrying could be considered avoidance - people sometimes worry in an attempt to "think their way out of a difficult situation" instead of actually confronting and resolving the situation.'
                    :
                    'Les gens peuvent adopter des comportements d’évitement de plusieurs différentes façons. Un étudiant peut procrastiner en navigant l’Internet ou en rencontrant des amis. Un autre peut travailler sur d’autres travaux moins urgents pour éviter de travailler sur devoir difficile. S’inquiéter peut même être considéré comme de l’évitement; certaines personnes s’inquiètent parfois pour tenter de « penser à une façon de s’en sortir d’une situation difficile » au lieu de l’affronter et la résoudre.'
                  }
                  
                  <br />
                  <br />

                  {
                      language === 'English' ?
                      ' Although avoidance can provide short-term relief, it often leads to negative long-term consequences, and contributes to worry in the future. The diagram below illustrates how avoidance can result in a continuous cycle of worry and avoidance.'
                      :
                      'Bien que l’évitement puisse fournir un soulagement à court terme, il mène souvent à des conséquences négatives à long terme et contribue à l’inquiétude dans le futur. Le diagramme suivant illustre comment l’évitement peut entraîner un cycle continu d’inquiétude et d’évitement.'
                    }
                     <span>
                    </span>
                    <br />
                    <br />
                    {
                      language === 'English' ?
                      <img src={avoid_cycle_clear} className={styles.avoid_cycle_img} alt="Avoidance Cycle" />
                      :
                      <img src={avoid_cycle_france} className={styles.avoid_cycle_img} alt="Avoidance Cycle" />
                    }

            </BorderContent>

            <TextField 
              rows="4"
              cols="50"
              title={
                language === 'English' ?
                <i>
                    Consider the{' '}
                    <u className={styles.title_bolod_purple} onClick={openThoughtModal}>
                        thoughts
                    </u>{' '}
                    and{' '}
                    <u className={styles.title_bolod_purple} onClick={openBehaviourModal}>
                        behaviours
                    </u>{' '}
                    you have previously had in response to the academic-related issue in Worksheet 1.{' '}
                    <b>Could any of those thoughts or behaviours be described as avoidant?</b> Write down those
                    avoidant thoughts / behaviours in the space below.
                </i>
                :
                <i>
                    Considère les pensées et les comportements que tu avais soulevés en réponse à ton problème dans la Fiche 1. Ces{' '}
                    <u className={styles.title_bolod_purple} onClick={openThoughtModal}>
                    pensées 
                    </u>{' '}
                    ou {' '}
                    <u className={styles.title_bolod_purple} onClick={openBehaviourModal}>
                    comportements 
                    </u>{' '}
                    
                    <b>peuvent-ils être décrits comme de l’évitement ?</b> Écris ces <b>pensées ou comportements </b>dans l’espace ci-dessous.
                </i>
              }
              value={questionA}
              onChange={(e) => {
                setQuestionA(e.target.value)
                setQuestionAError(false)
              }}
              placeholder={
                language === 'English' ?
                "e.g. I always end up surfing Facebook when I try to study."
                :
                'p.ex. Je finis toujours par naviguer TikTok quand j’essaie d’étudier.'
              }
              questionError={questionAError}
              errorWarningText={ language === 'English' ? 'Please input your answer' : 'Ajoute une réponse.'}
            />
            {/* Modals */}

            <Modal
                isOpen={isThoughtModalOpen}
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
                {thought}
            </Modal>

            <Modal
                isOpen={isBehaviourModalOpen}
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
                {behaviour}
            </Modal>
            
            <Button word={language === 'English' ? 'NEXT' : 'Suivant'} onClick={next} position={'center'} />

            </div>
            </div>

        </div>
    
  );
};

export default Session1worksheet2Q1;