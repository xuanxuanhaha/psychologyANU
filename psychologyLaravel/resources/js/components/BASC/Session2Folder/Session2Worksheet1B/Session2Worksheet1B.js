import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './session2worksheet1b.module.css';
import Navbar from '../../../Navbar/Navbar';
import { useSelector } from 'react-redux';
import Button from '../../../ReusableComponents/Button/Button';
import ProgressBar from '../../../ReusableComponents/ProgressBar/ProgressBar';
import Typography from '../../../ReusableComponents/Typography/Typography';
import CountdownTimer from './CountdownTimer';

const Session2Worksheet1B = () => {
  const navigate = useNavigate();
  const userData = useSelector(state => state.auth.user);
  const language = userData.language;

  const [sessionId, setSessionId] = useState(0);
  const [seconds, setSeconds] = useState(80);
  const [sessionStarted, setSessionStarted] = useState(false);
  const audioUrl = 'http://35.182.37.175/audios/guidedmeditation.mp3';
  const audioRef = useRef(null);

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
    audioRef.current.play().then(() => {
      audioRef.current.pause(); // Play and pause to unlock further playback
      setSessionStarted(true);
    }).catch(err => console.error('Error unlocking audio:', err));
  };

  const jump = () => {
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

            <Typography title={'content'} position={'left'} color={'primary'}>
              {/* Time Left: {formatTime(seconds)} */}
              <CountdownTimer initialCount={63} /> {/* Start countdown from 60 seconds */}

            </Typography>

            <div>
            <Typography title={'content'} position={'left'} color={'primary'}>
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
            <Typography title={'content'} position={'left'} color={'primary'}>
            {
                  language === 'English' ?
                  <u><li><a href="https://www.eatforhealth.gov.au/" target="_blank" onClick={handleStartSession}><u>Eat for Health</u></a></li></u>
                  :
                  'Pense à des problèmes reliés aux études dont tu t’es inquiété pendant la semaine dernière. Il peut s’agir d’un travail, un examen, un projet de groupe, arriver aux cours à temps, ou même rester éveillé lors des cours.'
                }
            </Typography>
          </div>
  
          <Button word={language === 'English' ? 'Start Worksheet1' : 'Commencer Fiche 1'} onClick={jump} position={'center'} />
        </div>
      </div>
    </div>
  );
};

export default Session2Worksheet1B;
