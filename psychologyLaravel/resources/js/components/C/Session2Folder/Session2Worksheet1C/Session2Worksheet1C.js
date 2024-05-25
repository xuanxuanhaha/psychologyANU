import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './session2worksheet1c.module.css';
import Navbar from '../../../Navbar/Navbar';
import { useSelector } from 'react-redux';
import Button from '../../../ReusableComponents/Button/Button';
import ProgressBar from '../../../ReusableComponents/ProgressBar/ProgressBar';
import Typography from '../../../ReusableComponents/Typography/Typography';
import CountdownTimer from '../../../ReusableComponents/CountdownTimer/CountdownTimer';
import BorderContent from '../../../ReusableComponents/BorderContent/BorderContent';
import TextField from '../../../ReusableComponents/TextField/TextField';

const Session2Worksheet1C = () => {
  const navigate = useNavigate();
  const userData = useSelector(state => state.auth.user);
  const language = userData.language;

  const [sessionId, setSessionId] = useState(0);
  const [questionA, setQuestionA] = useState('');
  const [questionAError, setQuestionAError] = useState(false);
  // const [seconds, setSeconds] = useState(80);
  // const [sessionStarted, setSessionStarted] = useState(false);
  // const audioUrl = 'http://3.25.76.79/audios/BASC_guided_thought_script.wav';
  // const audioRef = useRef(null);

  const [linkClicked, setLinkClicked] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0);
    const screenHeight = window.innerHeight;
    document.getElementById('background_image').style.minHeight = `${screenHeight - 100}px`;

    if(userData){
      axios.get(`/api/sessionresponse/2?userid=${userData.userid}&&questionno=session2worksheet1c`)
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

    // audioRef.current = new Audio(audioUrl); // Create audio object on mount
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
        'sessionid': 2,
        'questionno': 'session2worksheet1c',
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


  // useEffect(() => {
  //   let interval = null;
  //   if (seconds > 0) {
  //     interval = setInterval(() => {
  //       setSeconds(prevSeconds => prevSeconds - 1);
  //     }, 1000);
  //   }

  //   if (seconds === 60) {
  //     audioRef.current.play().catch(error => console.log('Error playing the audio:', error));
  //   }

  //   return () => clearInterval(interval);
  // }, [seconds, sessionStarted]);

  // const formatTime = (totalSeconds) => {
  //   const minutes = Math.floor(totalSeconds / 60);
  //   const seconds = totalSeconds % 60;
  //   return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  // };

  const handleStartSession = () => {
    setLinkClicked(true)

    // audioRef.current.play().then(() => {
    //   audioRef.current.pause(); // Play and pause to unlock further playback
    //   setSessionStarted(true);
    // }).catch(err => console.error('Error unlocking audio:', err));
  };

  const jumptonextpage = () => {
    navigate(`/session2end`);
  };

  return (
    <div>
      <Navbar />
      <div className={styles.background_image} id="background_image">
        <div className={styles.whole_border}>
          <Typography title={'subtitle'} position={'left'}>
            {language === 'English' ? 'Second Session' : 'Première session'}
          </Typography>
          <ProgressBar percentageNo={100} language={language} />
   
            {/* <Button word="Start Session" onClick={handleStartSession} position={'center'} /> */}

            {
            // <Typography title={'content'} position={'left'} color={'primary'}>
            //   <CountdownTimer initialCount={80} /> {/* Start countdown from 60 seconds */}
            // </Typography>
          }
          <br />

            <div>
            <Typography title={'content'} position={'left'} >
            {
                  language === 'English' ?
                  'Please select any of the tasks and work on it for 20 minutes.'
                  :
                  'Pense à des problèmes reliés aux études dont tu t’es inquiété pendant la semaine dernière. Il peut s’agir d’un travail, un examen, un projet de groupe, arriver aux cours à temps, ou même rester éveillé lors des cours.'
                }
            </Typography>
          </div>
          <br />
          <div>
            <Typography title={'content'} position={'left'}>
            {
                  language === 'English' ?
                  'Here is the link for the website.'
                  :
                  'Pense à des problèmes reliés aux études dont tu t’es inquiété pendant la semaine dernière. Il peut s’agir d’un travail, un examen, un projet de groupe, arriver aux cours à temps, ou même rester éveillé lors des cours.'
                }
            </Typography>
          </div>
          <br />

          <div>
            <Typography title={'content'} position={'left'}>
            {
                  language === 'English' ?
                  <u><li><a href="https://www.health.gov.au/topics/alcohol" target="_blank" className={styles.urlLink} onClick={handleStartSession}><u>Australian Government Alcohol Guidelines</u></a></li></u>
                  :
                  'Pense à des problèmes reliés aux études dont tu t’es inquiété pendant la semaine dernière. Il peut s’agir d’un travail, un examen, un projet de groupe, arriver aux cours à temps, ou même rester éveillé lors des cours.'
                }
            </Typography>
          </div>

          {
            linkClicked ?
            <div>
              <BorderContent>
                    {
                      language === 'English' ?
                      'Take home exam'
                      :
                      "L’inquiétude peut être décrite comme des pensées et des émotions négatives quant à une tâche ou un événement futur. Pour « fuir » ces pensées et ces émotions négatives, les gens ont tendance à répondre en évitant la tâche ou l’événement qui est leur cause d’inquiétude."
                    }
              </BorderContent>

              <TextField 
                rows="4"
                cols="50"
                title={
                  language === 'English' ?
                  <i>
                      What you learned
                  </i>
                  :
                  <i>
                      take home exam
                  </i>
                }
                value={questionA}
                onChange={(e) => {
                  setQuestionA(e.target.value)
                  setQuestionAError(false)
                }}
                placeholder={
                  language === 'English' ?
                  "e.g. I learned that"
                  :
                  'p.ex. Je finis toujours par naviguer TikTok quand j’essaie d’étudier.'
                }
                questionError={questionAError}
                errorWarningText={ language === 'English' ? 'Please input your answer' : 'Ajoute une réponse.'}
              />
            </div>
            :
            <div></div>

          }
  
          {
            linkClicked ? 
            <Button word={language === 'English' ? 'NEXT' : 'Commencer Fiche 1'} onClick={next} position={'center'} />
            :
            <Button word={language === 'English' ? 'NEXT' : 'Commencer Fiche 1'} className={styles.disabled_button} position={'center'} />
          }
          
        </div>
      </div>
    </div>
  );
};

export default Session2Worksheet1C;
