import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './session1worksheet3q2.module.css';
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

const Session1worksheet3Q2 = () => {
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

  const [value3_1, setValue3_1] = useState(0);
  const [value3_2, setValue3_2] = useState(0);
  const [value3_3, setValue3_3] = useState(0);

  const [value4_1, setValue4_1] = useState(0);
  const [value4_2, setValue4_2] = useState(0);
  const [value4_3, setValue4_3] = useState(0);

  const [value5_1, setValue5_1] = useState(0);
  const [value5_2, setValue5_2] = useState(0);
  const [value5_3, setValue5_3] = useState(0);

  const [value6_1, setValue6_1] = useState(0);
  const [value6_2, setValue6_2] = useState(0);
  const [value6_3, setValue6_3] = useState(0);

  const [value7_1, setValue7_1] = useState(0);
  const [value7_2, setValue7_2] = useState(0);
  const [value7_3, setValue7_3] = useState(0);


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

    axios.get(`/api/sessionresponse/2?userid=${userData.userid}&&questionno=session1worksheet3q2`)
    .then(response => {
    if(response.data){
        if(response.data.sessionresponse.response){
            const questionanswer = JSON.parse(response.data.sessionresponse.response)
            setValue1_1(questionanswer.q1_1)
            setValue2_1(questionanswer.q2_1)
            setValue3_1(questionanswer.q3_1)
            setValue4_1(questionanswer.q4_1)
            setValue5_1(questionanswer.q5_1)
            setValue6_1(questionanswer.q6_1)
            setValue7_1(questionanswer.q7_1)

            setValue1_2(questionanswer.q1_2)
            setValue2_2(questionanswer.q2_2)
            setValue3_2(questionanswer.q3_2)
            setValue4_2(questionanswer.q4_2)
            setValue5_2(questionanswer.q5_2)
            setValue6_2(questionanswer.q6_2)
            setValue7_2(questionanswer.q7_2)

            setValue1_3(questionanswer.q1_3)
            setValue2_3(questionanswer.q2_3)
            setValue3_3(questionanswer.q3_3)
            setValue4_3(questionanswer.q4_3)
            setValue5_3(questionanswer.q5_3)
            setValue6_3(questionanswer.q6_3)
            setValue7_3(questionanswer.q7_3)
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
        'questionno': 'session1worksheet3q2',
        'response': {
          'q1_1': value1_1, 'q1_2': value1_2, 'q1_3': value1_3,
          'q2_1': value2_1, 'q2_2': value2_2, 'q2_3': value2_3,
          'q3_1': value3_1, 'q3_2': value3_2, 'q3_3': value3_3,
          'q4_1': value4_1, 'q4_2': value4_2, 'q4_3': value4_3,
          'q5_1': value5_1, 'q5_2': value5_2, 'q5_3': value5_3,
          'q6_1': value6_1, 'q6_2': value6_2, 'q6_3': value6_3,
          'q7_1': value7_1, 'q7_2': value7_2, 'q7_3': value7_3,
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
    navigate(`/session1worksheet4start`);
  };

  const firstQuestion = () => {
    return <div className={styles.scaleDiv}>
              <div className={styles.left}>
                <Helppop
                  label={
                    language === 'English' ?
                    'How positive do your feel about this group?'
                    :
                    'À quel point est ce groupe positif pour toi?'
                  }
                  helptext={
                    language === 'English' ?
                    <p>
                      0: none
                      <br />
                      1: mild
                      <br />
                      2: moderate
                      <br />
                      3: severe
                      <br />
                      4: extreme
                    </p>
                    :
                    <p>
                      1 Pas positif du tout
                      <br />
                      7 Extrêmement positif
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
                    'How representative or typical are you of this group?'
                    :
                    'À quel point ce groupe te représente-t-il?'
                  }
                  helptext={
                    language === 'English' ?
                    <p>
                      0: none
                      <br />
                      1: mild
                      <br />
                      2: moderate
                      <br />
                      3: severe
                      <br />
                      4: extreme
                    </p>
                    :
                    <p>
                      1 Pas représentatif du tout
                      <br />
                      7 Extrêmement représentatif
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

  const thirdQuestion = () => {
    return <div className={styles.scaleDiv}>
              <div className={styles.left}>
                <Helppop
                  label={
                    language === 'English' ?
                    'How much support do you receive from this group?'
                    :
                    'Quel est le niveau de soutien que tu reçois de ce groupe?'
                  }
                  helptext={
                    language === 'English' ?
                    <p>
                      0: none
                      <br />
                      1: mild
                      <br />
                      2: moderate
                      <br />
                      3: severe
                      <br />
                      4: extreme
                    </p>
                    :
                    <p>
                      1 Soutien extrêmement faible
                      <br />
                      7 Soutien extrêmement fort
                    </p>
                  } />
              </div>
              <div className={styles.right}>
                <div className={styles.right1}>
                  <Scale
                    slidervalue={value3_1}
                    step={1}
                    marks={[{value: 1, label: 1}, {value: 7, label: 7}]}
                    min={1}
                    max={7}
                    onChange={(value) => setValue3_1(value)} 
                  />
                </div>
                <div className={styles.right2}>
                  <Scale
                    slidervalue={value3_2}
                    step={1}
                    marks={[{value: 1, label: 1}, {value: 7, label: 7}]}
                    min={1}
                    max={7}
                    onChange={(value) => setValue3_2(value)} 
                  />
                </div>
                <div className={styles.right3}>
                  <Scale
                    slidervalue={value3_3}
                    step={1}
                    marks={[{value: 1, label: 1}, {value: 7, label: 7}]}
                    min={1}
                    max={7}
                    onChange={(value) => setValue3_3(value)} 
                  />
                </div>
              </div>
            </div>
  }

  const fourthQuestion = () => {
    return <div className={styles.scaleDiv}>
              <div className={styles.left}>
                <Helppop
                  label={
                    language === 'English' ?
                    'How many days per month do you spend on activities relating to this group?'
                    :
                    'Combien de jours par mois consacres-tu à des activités liées à ce groupe ?'
                  }
                  helptext={
                    language === 'English' ?
                    <p>
                      0: none
                      <br />
                      1: mild
                      <br />
                      2: moderate
                      <br />
                      3: severe
                      <br />
                      4: extreme
                    </p>
                    :
                    <p>
                      nombre de jours
                    </p>
                  } />
              </div>
              <div className={styles.right}>
                <div className={styles.right1}>
                  <Scale
                    slidervalue={value4_1}
                    step={1}
                    marks={[{value: 1, label: 1}, {value: 31, label: 31}]}
                    min={1}
                    max={31}
                    onChange={(value) => setValue4_1(value)} 
                  />
                </div>
                <div className={styles.right2}>
                  <Scale
                    slidervalue={value4_2}
                    step={1}
                    marks={[{value: 1, label: 1}, {value: 31, label: 31}]}
                    min={1}
                    max={31}
                    onChange={(value) => setValue4_2(value)} 
                  />
                </div>
                <div className={styles.right3}>
                  <Scale
                    slidervalue={value4_3}
                    step={1}
                    marks={[{value: 1, label: 1}, {value: 31, label: 31}]}
                    min={1}
                    max={31}
                    onChange={(value) => setValue4_3(value)} 
                  />
                </div>
              </div>
            </div>
  }

  const fifthQuestion = () => {
    return <div className={styles.scaleDiv}>
              <div className={styles.left}>
                <Helppop
                  label={
                    language === 'English' ?
                    'How much is this group aligned with your educational goals?'
                    :
                    'À quel point ce groupe est-il aligné avec tes objectifs éducatifs?'
                  }
                  helptext={
                    language === 'English' ?
                    <p>
                      0: none
                      <br />
                      1: mild
                      <br />
                      2: moderate
                      <br />
                      3: severe
                      <br />
                      4: extreme
                    </p>
                    :
                    <p>
                      1 Pas du tout en aligné
                      <br />
                      7 Parfaitement aligné
                    </p>
                  } />
              </div>
              <div className={styles.right}>
                <div className={styles.right1}>
                  <Scale
                    slidervalue={value5_1}
                    step={1}
                    marks={[{value: 1, label: 1}, {value: 7, label: 7}]}
                    min={1}
                    max={7}
                    onChange={(value) => setValue5_1(value)} 
                  />
                </div>
                <div className={styles.right2}>
                  <Scale
                    slidervalue={value5_2}
                    step={1}
                    marks={[{value: 1, label: 1}, {value: 7, label: 7}]}
                    min={1}
                    max={7}
                    onChange={(value) => setValue5_2(value)} 
                  />
                </div>
                <div className={styles.right3}>
                  <Scale
                    slidervalue={value5_3}
                    step={1}
                    marks={[{value: 1, label: 1}, {value: 7, label: 7}]}
                    min={1}
                    max={7}
                    onChange={(value) => setValue5_3(value)} 
                  />
                </div>
              </div>
            </div>
  }

  const sixthQuestion = () => {
    return <div className={styles.scaleDiv}>
              <div className={styles.left}>
                <Helppop
                  label={
                    language === 'English' ?
                    'How much do you identify with this group?'
                    :
                    'À quel point t’identifies-tu à ce groupe?'
                  }
                  helptext={
                    language === 'English' ?
                    <p>
                      0: none
                      <br />
                      1: mild
                      <br />
                      2: moderate
                      <br />
                      3: severe
                      <br />
                      4: extreme
                    </p>
                    :
                    <p>
                      1 Je ne m’y identifie pas du tout
                      <br />
                      7 Je m’y identifie fortement
                    </p>
                  } />
              </div>
              <div className={styles.right}>
                <div className={styles.right1}>
                  <Scale
                    slidervalue={value6_1}
                    step={1}
                    marks={[{value: 1, label: 1}, {value: 7, label: 7}]}
                    min={1}
                    max={7}
                    onChange={(value) => setValue6_1(value)} 
                  />
                </div>
                <div className={styles.right2}>
                  <Scale
                    slidervalue={value6_2}
                    step={1}
                    marks={[{value: 1, label: 1}, {value: 7, label: 7}]}
                    min={1}
                    max={7}
                    onChange={(value) => setValue6_2(value)} 
                  />
                </div>
                <div className={styles.right3}>
                  <Scale
                    slidervalue={value6_3}
                    step={1}
                    marks={[{value: 1, label: 1}, {value: 7, label: 7}]}
                    min={1}
                    max={7}
                    onChange={(value) => setValue6_3(value)} 
                  />
                </div>
              </div>
            </div>
  }

  const seventhQuestion = () => {
    return <div className={styles.scaleDiv}>
              <div className={styles.left}>
                <Helppop
                  label={
                    language === 'English' ?
                    'How important is this group to you?'
                    :
                    'À quel point ce groupe est-il important pour toi?'
                  }
                  helptext={
                    language === 'English' ?
                    <p>
                      0: none
                      <br />
                      1: mild
                      <br />
                      2: moderate
                      <br />
                      3: severe
                      <br />
                      4: extreme
                    </p>
                    :
                    <p>
                      1 Pas important du tout
                      <br />
                      7 Extrêmement importan
                    </p>
                  } />
              </div>
              <div className={styles.right}>
                <div className={styles.right1}>
                  <Scale
                    slidervalue={value7_1}
                    step={1}
                    marks={[{value: 1, label: 1}, {value: 7, label: 7}]}
                    min={1}
                    max={7}
                    onChange={(value) => setValue7_1(value)} 
                  />
                </div>
                <div className={styles.right2}>
                  <Scale
                    slidervalue={value7_2}
                    step={1}
                    marks={[{value: 1, label: 1}, {value: 7, label: 7}]}
                    min={1}
                    max={7}
                    onChange={(value) => setValue7_2(value)} 
                  />
                </div>
                <div className={styles.right3}>
                  <Scale
                    slidervalue={value7_3}
                    step={1}
                    marks={[{value: 1, label: 1}, {value: 7, label: 7}]}
                    min={1}
                    max={7}
                    onChange={(value) => setValue7_3(value)} 
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

            <ProgressBar percentageNo={36} language={language} />

            
            <BorderContent>
                {
                    language === 'English' ?
                    <p>Please do the scale for the <b>THREE</b> groups</p>
                    :
                    <p>Peux-tu nommer <b>TROIS</b> groupes auxquels tu appartiens en tant que personne étudiante à l’université ?</p>
                }
                {
                  questionA !== '' ? (language === 'English' ? '1st group: ' : '1er groupe: ' ) + questionA : ''
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
              {
                thirdQuestion()
              }
              {
                fourthQuestion()
              }
              {
                fifthQuestion()
              }
              {
                sixthQuestion()
              }
              {
                seventhQuestion()
              }
            </div>
            <Button word={language === 'English' ? 'NEXT' : 'Suivant'} onClick={next} position={'center'} />
            </div>
            </div>

        </div>
    
  );
};

export default Session1worksheet3Q2;