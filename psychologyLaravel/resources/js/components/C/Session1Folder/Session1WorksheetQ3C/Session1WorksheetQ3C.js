import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './session1worksheetq3c.module.css';
import Navbar from '../../../Navbar/Navbar';
import { useSelector } from 'react-redux';
import Button from '../../../ReusableComponents/Button/Button';
import ProgressBar from '../../../ReusableComponents/ProgressBar/ProgressBar';
import Typography from '../../../ReusableComponents/Typography/Typography';
import CountdownTimer from '../../../ReusableComponents/CountdownTimer/CountdownTimer';

const Session1WorksheetQ3C = () => {
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
    navigate(`/session1end`);
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
            <Typography title={'content'} position={'left'} color={'primary'}>
              <CountdownTimer initialCount={80} /> {/* Start countdown from 60 seconds */}
            </Typography>
          }
          <br />

            <div>
            <Typography title={'content'} position={'left'} >
            {
                  language === 'English' ?
                  'Please choose any of the tasks and play them till you are told the session is over.'
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
                  <u><li><a href="https://www.eatforhealth.gov.au/" target="_blank" className={styles.urlLink} onClick={handleStartSession}><u>Eat for Health</u></a></li></u>
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

export default Session1WorksheetQ3C;
