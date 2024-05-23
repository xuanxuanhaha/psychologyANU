import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './session5c.module.css';
import Navbar from '../../../Navbar/Navbar';
import { useSelector } from 'react-redux';
import Button from '../../../ReusableComponents/Button/Button';
import ProgressBar from '../../../ReusableComponents/ProgressBar/ProgressBar';
import Typography from '../../../ReusableComponents/Typography/Typography';
import CountdownTimer from '../../../ReusableComponents/CountdownTimer/CountdownTimer';

const Session5C = () => {
  const navigate = useNavigate();
  const userData = useSelector(state => state.auth.user);
  const language = userData.language;

  const [sessionId, setSessionId] = useState(0);
  const [seconds, setSeconds] = useState(80);
  const [sessionStarted, setSessionStarted] = useState(false);
  const audioUrl = 'http://3.25.76.79/audios/BASC_guided_thought_script.wav';
  const audioRef = useRef(null);

  const [linkClicked, setLinkClicked] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0);
    const screenHeight = window.innerHeight;
    document.getElementById('background_image').style.minHeight = `${screenHeight - 100}px`;
    if(userData){
        const data = {
            'userid': userData.userid,
            'sessionid': 5,
            'start': true
        }
        axios.post(`/api/sessions`, data)
          .then(response => {
            console.log('uncaught response', response)
            
          })
          .catch(error => {
            // Handle any errors
            console.error(error);
          });
    }
    audioRef.current = new Audio(audioUrl); // Create audio object on mount
  }, []);

  useEffect(() => {
    let interval = null;
    if (seconds > 0) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
    }

    if (seconds === 60) {
      audioRef.current.play().catch(error => console.log('Error playing the audio:', error));
    }

    return () => clearInterval(interval);
  }, [seconds, sessionStarted]);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleStartSession = () => {
    setLinkClicked(true)

    audioRef.current.play().then(() => {
      audioRef.current.pause(); // Play and pause to unlock further playback
      setSessionStarted(true);
    }).catch(err => console.error('Error unlocking audio:', err));
  };

  const jump = () => {
    navigate(`/session5end`);
  };

  return (
    <div>
      <Navbar />
      <div className={styles.background_image} id="background_image">
        <div className={styles.whole_border}>
          <Typography title={'subtitle'} position={'left'}>
            {language === 'English' ? 'Fifth Session' : 'Première session'}
          </Typography>
          <ProgressBar percentageNo={100} language={language} />
   
            {/* <Button word="Start Session" onClick={handleStartSession} position={'center'} /> */}

            {
            <Typography title={'content'} position={'left'} color={'primary'}>
              <CountdownTimer initialCount={80} /> {/* Start countdown from 60 seconds */}
            </Typography>
          }
          <br />

            <div>
            <Typography title={'content'} position={'left'} >
            {
                  language === 'English' ?
                  'In this session you will learn about ways to look after your health and wellbeing. Knowledge is power! Being informed is an important way to manage your wellbeing. Please explore the information and resources on the below website, please spend the next 20 minutes learning by reading through the information provided on the website. You will hear a timer when 20 minutes has past at which point you may finish what you are reading or click ‘Next’ to finish the session.'
                  :
                  'Pense à des problèmes reliés aux études dont tu t’es inquiété pendant la semaine dernière. Il peut s’agir d’un travail, un examen, un projet de groupe, arriver aux cours à temps, ou même rester éveillé lors des cours.'
                }
            </Typography>
          </div>
          <br />
          <div>
            <Typography title={'content'} position={'left'} color={'primary'}>
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
            <Typography title={'content'} position={'left'}  color={'primary'}>
            {
                  language === 'English' ?
                  <u><li><a href="https://www.health.gov.au/topics/physical-activity-and-exercise/physical-activity-and-exercise-guidelines-for-all-australians?utm_source=health.gov.au&utm_medium=callout-auto-custom&utm_campaign=digital_transformation" target="_blank" className={styles.urlLink} onClick={handleStartSession}><u>Australian Government Physical Activity and Exercise Guidelines</u></a></li></u>
                  :
                  'Pense à des problèmes reliés aux études dont tu t’es inquiété pendant la semaine dernière. Il peut s’agir d’un travail, un examen, un projet de groupe, arriver aux cours à temps, ou même rester éveillé lors des cours.'
                }
            </Typography>
          </div>
  
          {
            linkClicked ? 
            <Button word={language === 'English' ? 'NEXT' : 'Commencer Fiche 1'} onClick={jump} position={'center'} />
            :
            <Button word={language === 'English' ? 'NEXT' : 'Commencer Fiche 1'} className={styles.disabled_button} position={'center'} />
          }
          
        </div>
      </div>
    </div>
  );
};

export default Session5C;
