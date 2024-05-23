import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './session2worksheet1q1.module.css';
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
import Helppop from '../../ReusableComponents/Helppop/Helppop';
import Scale from '../../ReusableComponents/Scale/Scale';

const Session2worksheet1Q1 = () => {
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

  const [value1_1, setValue1_1] = useState(0);
  const [value1_2, setValue1_2] = useState(0);
  const [value1_3, setValue1_3] = useState(0);

  const [value2_1, setValue2_1] = useState(0);
  const [value2_2, setValue2_2] = useState(0);
  const [value2_3, setValue2_3] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const screenHeight = window.innerHeight;
    document.getElementById('background_image').style.minHeight = `${screenHeight - 100}px`;

    axios.get(`/api/sessionresponse/2?userid=${userData.userid}&&questionno=session1worksheet3q1`)
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

    axios.get(`/api/sessionresponse/2?userid=${userData.userid}&&questionno=session2worksheet1q1`)
    .then(response => {
    if(response.data){
        if(response.data.sessionresponse.response){
            const questionanswer = JSON.parse(response.data.sessionresponse.response)
            setValue1_1(questionanswer.q1_1)
            setValue2_1(questionanswer.q2_1)

            setValue1_2(questionanswer.q1_2)
            setValue2_2(questionanswer.q2_2)

            setValue1_3(questionanswer.q1_3)
            setValue2_3(questionanswer.q2_3)
        }
    }
    })
    .catch(error => {
    // Handle any errors
    console.error(error);
    });
  }, []);

  const next = () => {
      passData();
  };

  const passData = () => {
    const data = {
        'userid': userData.userid,
        'sessionid': 2,
        'questionno': 'session2worksheet1q1',
        'response': {
          'q1_1': value1_1, 'q1_2': value1_2, 'q1_3': value1_3,
          'q2_1': value2_1, 'q2_2': value2_2, 'q2_3': value2_3,
        }
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
    navigate(`/session2worksheet2start`);
  };

  const firstQuestion = () => {
    return <div className={styles.scaleDiv}>
              <div className={styles.left}>
                <Helppop
                  label={
                    language === 'English' ?
                    'How similar are the values and goals of each GROUP and your own values and goals?'
                    :
                    'À quel niveau les valeurs et les objectifs de GROUPE 1 sont-ils similaires à tes valeurs et tes objectifs ?'
                  }
                  helptext={
                    language === 'English' ?
                    <p>
                      1: Extremely dissimilar
                      <br />
                      7: Extremely similar
                    </p>
                    :
                    <p>
                      1: Extrêmement dissemblables;
                      <br />
                      7: Extrêmement similaires
                    </p>
                  } />
              </div>
              <div className={styles.right}>
                <div className={styles.right1}>
                  <Scale
                    slidervalue={value1_1}
                    step={1}
                    marks={[{value: 1, label: 1}, {value: 7, label: 7}]}
                    min={1}
                    max={7}
                    onChange={(value) => setValue1_1(value)} 
                  />
                </div>
                <div className={styles.right2}>
                  <Scale
                    slidervalue={value1_2}
                    step={1}
                    marks={[{value: 1, label: 1}, {value: 7, label: 7}]}
                    min={1}
                    max={7}
                    onChange={(value) => setValue1_2(value)} 
                  />
                </div>
                <div className={styles.right3}>
                  <Scale
                    slidervalue={value1_3}
                    step={1}
                    marks={[{value: 1, label: 1}, {value: 7, label: 7}]}
                    min={1}
                    max={7}
                    onChange={(value) => setValue1_3(value)} 
                  />
                </div>
              </div>
            </div>
  }

  const secondQuestion = () => {
    return <div className={styles.scaleDiv}>
              <div className={styles.left}>
                <Helppop
                  label={
                    language === 'English' ?
                    'How compatible are the values and goals of GROUP 1 with your own values and goals?'
                    :
                    'À quel niveau les valeurs et les objectifs de GROUPE 1 sont-ils compatibles avec tes valeurs et tes objectifs ?'
                  }
                  helptext={
                    language === 'English' ?
                    <p>
                      1: Extremely incompatible
                      <br />
                      7: Extremely compatible
                    </p>
                    :
                    <p>
                      1: Extrêmement incompatibles;
                      <br />
                      7: Extrêmement compatibles. 
                    </p>
                  } />
              </div>
              <div className={styles.right}>
                <div className={styles.right1}>
                  <Scale
                    slidervalue={value2_1}
                    step={1}
                    marks={[{value: 1, label: 1}, {value: 7, label: 7}]}
                    min={1}
                    max={7}
                    onChange={(value) => setValue2_1(value)} 
                  />
                </div>
                <div className={styles.right2}>
                  <Scale
                    slidervalue={value2_2}
                    step={1}
                    marks={[{value: 1, label: 1}, {value: 7, label: 7}]}
                    min={1}
                    max={7}
                    onChange={(value) => setValue2_2(value)} 
                  />
                </div>
                <div className={styles.right3}>
                  <Scale
                    slidervalue={value2_3}
                    step={1}
                    marks={[{value: 1, label: 1}, {value: 7, label: 7}]}
                    min={1}
                    max={7}
                    onChange={(value) => setValue2_3(value)} 
                  />
                </div>
              </div>
            </div>
  }

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
              'Première session'
            }
            </Typography>

            <ProgressBar percentageNo={60} language={language} />

            
            <BorderContent>
                {
                    language === 'English' ?
                    <p>Please do the scale for the <b>THREE</b> groups</p>
                    :
                    <p>Peux-tu nommer <b>TROIS</b> groupes auxquels tu appartiens en tant que personne étudiante à l’université ?</p>
                }
                {
                  questionA !== '' ? (language === 'English' ? '1st group: ' : '1er groupe:: ' ) + questionA : ''
                }
                <br />
                {
                  questionB !== '' ? (language === 'English' ? '2nd group: ' : '2e groupe: ' ) + questionB : ''
                }
                <br />
                {
                  questionC !== '' ? (language === 'English' ? '3rd group: ' : '3e groupe: ' ) + questionC : ''
                }
            </BorderContent>

            <br />
            <br />
            <div>
              <div className={styles.scaleDiv}>
                <div className={styles.left}>
                </div>
                <div className={styles.right}>
                  <div className={styles.right1}><b>{language === 'English' ? '1st group' : '1er groupe'}</b></div>
                  <div className={styles.right2}><b>{language === 'English' ? '2nd group' : '2e groupe'}</b></div>
                  <div className={styles.right3}><b>{language === 'English' ? '3rd group' : '3e groupe'}</b></div>

                </div>
              </div>
              {
                firstQuestion()
              }
              {
                secondQuestion()
              }
            </div>
            <Button word={language === 'English' ? 'NEXT' : 'Suivant'} onClick={next} position={'center'} />
            </div>
            </div>

        </div>
    
  );
};

export default Session2worksheet1Q1;