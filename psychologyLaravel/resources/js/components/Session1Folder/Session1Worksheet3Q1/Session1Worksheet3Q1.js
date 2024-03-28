import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './session1worksheet3q1.module.css';
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

const Session1worksheet3Q1 = () => {
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
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    window.scrollTo(0, 0);
    const screenHeight = window.innerHeight;
    document.getElementById('background_image').style.minHeight = `${screenHeight - 100}px`;

    axios.get(`/api/sessionresponse/1?userid=${userData.userid}&&questionno=session1worksheet3q1`)
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
        'questionno': 'session1worksheet3q1',
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
    navigate(`/session1worksheet3q2`);
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

            <ProgressBar percentageNo={70} language={language} />

            
            <BorderContent>
                {
                    language === 'English' ?
                    <p>Can you name <b>THREE</b> groups that you currently belong to as a university student?</p>
                    :
                    <p>Peux-tu nommer <b>TROIS</b> groupes auxquels tu appartiens en tant que personne étudiante à l’université ?</p>
                }
            </BorderContent>

            <TextField 
              rows="4"
              cols="50"
              title={
                language === 'English' ?
                <i>
                    <b>1st Group:</b>
                </i>
                :
                <i>
                    <b>1er groupe: </b>
                </i>
              }
              value={questionA}
              onChange={(e) => {
                setQuestionA(e.target.value)
                setQuestionAError(false)
              }}
              placeholder={
                language === 'English' ?
                "e.g. I belong to the group of CSIT student"
                :
                'p.ex. Ton groupe d’étude '
              }
              questionError={questionAError}
              errorWarningText={ language === 'English' ? 'Please input your answer' : 'Ajoute une réponse.'}
            />
            
            <TextField 
              rows="4"
              cols="50"
              title={
                language === 'English' ?
                <i>
                    <b>2nd Group:</b>
                </i>
                :
                <i>
                    <b>2e groupe: </b>
                </i>
              }
              value={questionB}
              onChange={(e) => {
                setQuestionB(e.target.value)
                setQuestionBError(false)
              }}
              placeholder={
                language === 'English' ?
                "e.g. I belong to the group of tennis team"
                :
                'p.ex. Ton groupe d’étude '
              }
              questionError={questionBError}
              errorWarningText={ language === 'English' ? 'Please input your answer' : 'Ajoute une réponse.'}
            />

            <TextField 
              rows="4"
              cols="50"
              title={
                language === 'English' ?
                <i>
                    <b>3rd Group:</b>
                </i>
                :
                <i>
                    <b>3e groupe: </b>
                </i>
              }
              value={questionC}
              onChange={(e) => {
                setQuestionC(e.target.value)
                setQuestionCError(false)
              }}
              placeholder={
                language === 'English' ?
                "e.g. I belong to the group of international student"
                :
                'p.ex. Ton groupe d’étude '
              }
              questionError={questionCError}
              errorWarningText={ language === 'English' ? 'Please input your answer' : 'Ajoute une réponse.'}
            />
            
            <Button word={language === 'English' ? 'NEXT' : 'Suivant'} onClick={next} position={'center'} />

            </div>
            </div>

        </div>
    
  );
};

export default Session1worksheet3Q1;