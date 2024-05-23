import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './session5worksheet1b.module.css';
import Navbar from '../../../Navbar/Navbar';
import { useSelector } from 'react-redux';
import Button from '../../../ReusableComponents/Button/Button';


import Modal from 'react-modal';
import ProgressBar from '../../../ReusableComponents/ProgressBar/ProgressBar';
import Typography from '../../../ReusableComponents/Typography/Typography';
import TextField from '../../../ReusableComponents/TextField/TextField';

const Session5Worksheet1B = () => {
  const navigate = useNavigate();
  const userData = useSelector(state => state.auth.user);
  const language = userData.language

  const [questionA, setQuestionA] = useState('');
  const [questionActivities, setQuestionActivities] = useState('');


  const [count, setCount] = useState(0)


  const default_value = {
    '6': {'Sat': '', 'Sun': '', 'Mon': '', 'Tue': '', 'Wed': '', 'Thu': '', 'Fri': '', 'Comm': ''},
    '7': {'Sat': '', 'Sun': '', 'Mon': '', 'Tue': '', 'Wed': '', 'Thu': '', 'Fri': '', 'Comm': ''},
    '8': {'Sat': '', 'Sun': '', 'Mon': '', 'Tue': '', 'Wed': '', 'Thu': '', 'Fri': '', 'Comm': ''},
    '9': {'Sat': '', 'Sun': '', 'Mon': '', 'Tue': '', 'Wed': '', 'Thu': '', 'Fri': '', 'Comm': ''},
    '10': {'Sat': '', 'Sun': '', 'Mon': '', 'Tue': '', 'Wed': '', 'Thu': '', 'Fri': '', 'Comm': ''},
    '11': {'Sat': '', 'Sun': '', 'Mon': '', 'Tue': '', 'Wed': '', 'Thu': '', 'Fri': '', 'Comm': ''},
    '12': {'Sat': '', 'Sun': '', 'Mon': '', 'Tue': '', 'Wed': '', 'Thu': '', 'Fri': '', 'Comm': ''},
    '13': {'Sat': '', 'Sun': '', 'Mon': '', 'Tue': '', 'Wed': '', 'Thu': '', 'Fri': '', 'Comm': ''},
    '14': {'Sat': '', 'Sun': '', 'Mon': '', 'Tue': '', 'Wed': '', 'Thu': '', 'Fri': '', 'Comm': ''},
    '15': {'Sat': '', 'Sun': '', 'Mon': '', 'Tue': '', 'Wed': '', 'Thu': '', 'Fri': '', 'Comm': ''},
    '16': {'Sat': '', 'Sun': '', 'Mon': '', 'Tue': '', 'Wed': '', 'Thu': '', 'Fri': '', 'Comm': ''},
    '17': {'Sat': '', 'Sun': '', 'Mon': '', 'Tue': '', 'Wed': '', 'Thu': '', 'Fri': '', 'Comm': ''},
    '18': {'Sat': '', 'Sun': '', 'Mon': '', 'Tue': '', 'Wed': '', 'Thu': '', 'Fri': '', 'Comm': ''},
    '19': {'Sat': '', 'Sun': '', 'Mon': '', 'Tue': '', 'Wed': '', 'Thu': '', 'Fri': '', 'Comm': ''},
    '20': {'Sat': '', 'Sun': '', 'Mon': '', 'Tue': '', 'Wed': '', 'Thu': '', 'Fri': '', 'Comm': ''},
    '21': {'Sat': '', 'Sun': '', 'Mon': '', 'Tue': '', 'Wed': '', 'Thu': '', 'Fri': '', 'Comm': ''},
    '22': {'Sat': '', 'Sun': '', 'Mon': '', 'Tue': '', 'Wed': '', 'Thu': '', 'Fri': '', 'Comm': ''},
    '23': {'Sat': '', 'Sun': '', 'Mon': '', 'Tue': '', 'Wed': '', 'Thu': '', 'Fri': '', 'Comm': ''},
  }

  const [previousTableAnswers, setPreviousTableAnswers] = useState(default_value)
  const [tableAnswers, setTableAnswers] = useState(default_value)


  useEffect(() => {
    window.scrollTo(0, 0);
    const screenHeight = window.innerHeight;
    document.getElementById('background_image').style.minHeight = `${screenHeight - 100}px`;

    axios.get(`/api/sessionresponse/3?userid=${userData.userid}&&questionno=session3worksheet2b`)
    .then(response => {
      if(response.data){
          if(response.data.sessionresponse.response){
              const questionanswer = JSON.parse(response.data.sessionresponse.response)
              setQuestionActivities(questionanswer.q1.map(item => item.q0))
              setCount(0)
          }
      }
    })
    .catch(error => {
      // Handle any errors
      console.error(error);
    });

    axios.get(`/api/sessionresponse/3?userid=${userData.userid}&&questionno=session3worksheet3b`)
          .then(response => {
            if(response.data){
                if(response.data.sessionresponse.response){
                    const questionanswer = JSON.parse(response.data.sessionresponse.response)
                    setQuestionA(questionanswer.q1)
                    setPreviousTableAnswers(questionanswer.q2)
                    setCount(0)
                }
            }
          })
          .catch(error => {
            // Handle any errors
            console.error(error);
          });
    
    axios.get(`/api/sessionresponse/5?userid=${userData.userid}&&questionno=session5worksheet1b`)
    .then(response => {
      if(response.data){
          if(response.data.sessionresponse.response){
              const questionanswer = JSON.parse(response.data.sessionresponse.response)
              setTableAnswers(questionanswer.q1)
              setCount(0)
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
        'sessionid': 5,
        'questionno': 'session5worksheet1b',
        'response': {'q1': tableAnswers}
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
    navigate(`/session5worksheet2b`);
  };

  const changeTableAnwser =(outerKey, innerKey, value) => {
    const tableanswers = tableAnswers
    tableanswers[outerKey][innerKey] = value
    setTableAnswers(tableanswers)
    setCount(count + 1)
  }

  const downloadCSV = () => {
    // Create a CSV content string (replace with your own data)
    // const csvContent = "Name,Email\nJohn Doe,johndoe@example.com\nJane Smith,janesmith@example.com";
    const csvHeader = ", Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Comments (How did you feel? What did you notice?)";
    const tableanswers = tableAnswers
    
    const csvContent1 = `6h,${tableanswers[6]['Sat'] || ''},${tableanswers[6]['Sun'] || ''},${tableanswers[6]['Mon'] || ''},${tableanswers[6]['Tue'] || ''},${tableanswers[6]['Wed'] || ''},${tableanswers[6]['Thu'] || ''},${tableanswers[6]['Fri'] || ''},${tableanswers[6]['Comm'] || ''}`;
    const csvContent2 = `7h,${tableanswers[7]['Sat'] || ''},${tableanswers[7]['Sun'] || ''},${tableanswers[7]['Mon'] || ''},${tableanswers[7]['Tue'] || ''},${tableanswers[7]['Wed'] || ''},${tableanswers[7]['Thu'] || ''},${tableanswers[7]['Fri'] || ''},${tableanswers[7]['Comm'] || ''}`;
    const csvContent3 = `8h,${tableanswers[8]['Sat'] || ''},${tableanswers[8]['Sun'] || ''},${tableanswers[8]['Mon'] || ''},${tableanswers[8]['Tue'] || ''},${tableanswers[8]['Wed'] || ''},${tableanswers[8]['Thu'] || ''},${tableanswers[8]['Fri'] || ''},${tableanswers[8]['Comm'] || ''}`;
    const csvContent4 = `9h,${tableanswers[9]['Sat'] || ''},${tableanswers[9]['Sun'] || ''},${tableanswers[9]['Mon'] || ''},${tableanswers[9]['Tue'] || ''},${tableanswers[9]['Wed'] || ''},${tableanswers[9]['Thu'] || ''},${tableanswers[9]['Fri'] || ''},${tableanswers[9]['Comm'] || ''}`;
    const csvContent5 = `10h,${tableanswers[10]['Sat'] || ''},${tableanswers[10]['Sun'] || ''},${tableanswers[10]['Mon'] || ''},${tableanswers[10]['Tue'] || ''},${tableanswers[10]['Wed'] || ''},${tableanswers[10]['Thu'] || ''},${tableanswers[10]['Fri'] || ''},${tableanswers[10]['Comm'] || ''}`;
    const csvContent6 = `11h,${tableanswers[11]['Sat'] || ''},${tableanswers[11]['Sun'] || ''},${tableanswers[11]['Mon'] || ''},${tableanswers[11]['Tue'] || ''},${tableanswers[11]['Wed'] || ''},${tableanswers[11]['Thu'] || ''},${tableanswers[11]['Fri'] || ''},${tableanswers[11]['Comm'] || ''}`;
    const csvContent7 = `12h,${tableanswers[12]['Sat'] || ''},${tableanswers[12]['Sun'] || ''},${tableanswers[12]['Mon'] || ''},${tableanswers[12]['Tue'] || ''},${tableanswers[12]['Wed'] || ''},${tableanswers[12]['Thu'] || ''},${tableanswers[12]['Fri'] || ''},${tableanswers[12]['Comm'] || ''}`;
    const csvContent8 = `13h,${tableanswers[13]['Sat'] || ''},${tableanswers[13]['Sun'] || ''},${tableanswers[13]['Mon'] || ''},${tableanswers[13]['Tue'] || ''},${tableanswers[13]['Wed'] || ''},${tableanswers[13]['Thu'] || ''},${tableanswers[13]['Fri'] || ''},${tableanswers[13]['Comm'] || ''}`;
    const csvContent9 = `14h,${tableanswers[14]['Sat'] || ''},${tableanswers[14]['Sun'] || ''},${tableanswers[14]['Mon'] || ''},${tableanswers[14]['Tue'] || ''},${tableanswers[14]['Wed'] || ''},${tableanswers[14]['Thu'] || ''},${tableanswers[14]['Fri'] || ''},${tableanswers[14]['Comm'] || ''}`;
    const csvContent10 = `15h,${tableanswers[15]['Sat'] || ''},${tableanswers[15]['Sun'] || ''},${tableanswers[15]['Mon'] || ''},${tableanswers[15]['Tue'] || ''},${tableanswers[15]['Wed'] || ''},${tableanswers[15]['Thu'] || ''},${tableanswers[15]['Fri'] || ''},${tableanswers[15]['Comm'] || ''}`;
    const csvContent11 = `16h,${tableanswers[16]['Sat'] || ''},${tableanswers[16]['Sun'] || ''},${tableanswers[16]['Mon'] || ''},${tableanswers[16]['Tue'] || ''},${tableanswers[16]['Wed'] || ''},${tableanswers[16]['Thu'] || ''},${tableanswers[16]['Fri'] || ''},${tableanswers[16]['Comm'] || ''}`;
    const csvContent12 = `17h,${tableanswers[17]['Sat'] || ''},${tableanswers[17]['Sun'] || ''},${tableanswers[17]['Mon'] || ''},${tableanswers[17]['Tue'] || ''},${tableanswers[17]['Wed'] || ''},${tableanswers[17]['Thu'] || ''},${tableanswers[17]['Fri'] || ''},${tableanswers[17]['Comm'] || ''}`;
    const csvContent13 = `18h,${tableanswers[18]['Sat'] || ''},${tableanswers[18]['Sun'] || ''},${tableanswers[18]['Mon'] || ''},${tableanswers[18]['Tue'] || ''},${tableanswers[18]['Wed'] || ''},${tableanswers[18]['Thu'] || ''},${tableanswers[18]['Fri'] || ''},${tableanswers[18]['Comm'] || ''}`;
    const csvContent14 = `19h,${tableanswers[19]['Sat'] || ''},${tableanswers[19]['Sun'] || ''},${tableanswers[19]['Mon'] || ''},${tableanswers[19]['Tue'] || ''},${tableanswers[19]['Wed'] || ''},${tableanswers[19]['Thu'] || ''},${tableanswers[19]['Fri'] || ''},${tableanswers[19]['Comm'] || ''}`;
    const csvContent15 = `20h,${tableanswers[20]['Sat'] || ''},${tableanswers[20]['Sun'] || ''},${tableanswers[20]['Mon'] || ''},${tableanswers[20]['Tue'] || ''},${tableanswers[20]['Wed'] || ''},${tableanswers[20]['Thu'] || ''},${tableanswers[20]['Fri'] || ''},${tableanswers[20]['Comm'] || ''}`;
    const csvContent16 = `21h,${tableanswers[21]['Sat'] || ''},${tableanswers[21]['Sun'] || ''},${tableanswers[21]['Mon'] || ''},${tableanswers[21]['Tue'] || ''},${tableanswers[21]['Wed'] || ''},${tableanswers[21]['Thu'] || ''},${tableanswers[21]['Fri'] || ''},${tableanswers[21]['Comm'] || ''}`;
    const csvContent17 = `22h,${tableanswers[22]['Sat'] || ''},${tableanswers[22]['Sun'] || ''},${tableanswers[22]['Mon'] || ''},${tableanswers[22]['Tue'] || ''},${tableanswers[22]['Wed'] || ''},${tableanswers[22]['Thu'] || ''},${tableanswers[22]['Fri'] || ''},${tableanswers[22]['Comm'] || ''}`;
    const csvContent18 = `23h,${tableanswers[23]['Sat'] || ''},${tableanswers[23]['Sun'] || ''},${tableanswers[23]['Mon'] || ''},${tableanswers[23]['Tue'] || ''},${tableanswers[23]['Wed'] || ''},${tableanswers[23]['Thu'] || ''},${tableanswers[23]['Fri'] || ''},${tableanswers[23]['Comm'] || ''}`;

    const csvHeaderF = ",Samedi, Dimanche, Lundi, Mardi, Mercredi, Jeudi, Vendredi, Commentaires (Qu'as-tu ressenti? Qu’as-tu remarqué ?)";

    let csvContent = `${csvHeader}\n${csvContent1}\n${csvContent2}\n${csvContent3}\n${csvContent4}\n${csvContent5}\n${csvContent6}\n${csvContent7}\n${csvContent8}\n${csvContent9}\n${csvContent10}\n${csvContent11}\n${csvContent12}\n${csvContent13}\n${csvContent14}\n${csvContent15}\n${csvContent16}\n${csvContent17}\n${csvContent18}`;
    const csvContentFrench = `${csvHeaderF}\n${csvContent1}\n${csvContent2}\n${csvContent3}\n${csvContent4}\n${csvContent5}\n${csvContent6}\n${csvContent7}\n${csvContent8}\n${csvContent9}\n${csvContent10}\n${csvContent11}\n${csvContent12}\n${csvContent13}\n${csvContent14}\n${csvContent15}\n${csvContent16}\n${csvContent17}\n${csvContent18}`;
    csvContent = language === 'English' ? csvContent : csvContentFrench

    // Create a Blob object containing the CSV data
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });

    // Create a download link and trigger the download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'Session4Review.csv');
    document.body.appendChild(link); // Required for Firefox
    link.click();

    // Clean up the URL object to free up memory
    URL.revokeObjectURL(link.href);
    document.body.removeChild(link); // Required for Firefox
  };

  return (
    <div>
        {/* Assuming you have a navbar component */}
      <Navbar />
      <div className={styles.background_image} id="background_image">
        <div className={styles.whole_border}>
          <Typography title={'subtitle'} position={'left'}>
            {
              language === 'English' ? 
              'Fifth Session' :
              'Quatrième session'
            }
          </Typography>

          <ProgressBar percentageNo={20} language={language} />

          <Typography title={'content'} position={'left'}  contentwidth={'100%'}>
              {
                language === 'English' ?
                'Let’s review your goal and check how you practiced the scheduled activity(ties) prior to Session 3.'
                :
                'Révisons ton objectif et regardons comment tu as pratiqué les activité(s) planifiée(s) préalablement à la séance 3.'
              }
          </Typography>

            <TextField 
              rows="1"
              cols="50"
              title={
                language === 'English' ?
                <b>YOUR GOAL</b>
                :
                <b>Ton OBJECTIF</b>
              }
              disabled
              value={questionA}
              onChange={(e) => {
                setQuestionA(e.target.value)
              }}
              placeholder={''}
              questionError={''}
              errorWarningText={''}
            />

          <br />
          <br />

          <Typography title={'content'} position={'left'}  contentwidth={'100%'}>
            <u>
              <b>
                {
                  language === 'English' ?
                  <i>Activities to help achieve my goal:</i>
                  :
                  <i>Activités pour m’aider à accomplir mon objectif :</i>
                }
              </b>
            </u>
          </Typography>
            {
              questionActivities && questionActivities.map((q)=>{
                return <TextField 
                  rows="1"
                  cols="50"
                  titleClassName={styles.title_activitytextarea}
                  value={q}
                  onChange={(e) => {}}
                  disabled
                  placeholder={''}
                  questionError={''}
                  errorWarningText={''}
                />
              })
            }


            {/* <TextField 
              rows="1"
              cols="50"
              title={
                language === 'English' ?
                <i>Activities to help achieve your goal:</i>
                :
                <i>Activités pour aider à accomplir ton objectif :</i>
              }
              disabled
              value={questionB}
              onChange={(e) => {
                setQuestionB(e.target.value)
              }}
              placeholder={''}
              questionError={''}
              errorWarningText={''}
            />

            <TextField 
              rows="1"
              cols="50"
              title={''}
              value={questionC}
              onChange={(e) => {
                setQuestionC(e.target.value)
              }}
              disabled
              placeholder={''}
              questionError={''}
              errorWarningText={''}
            /> */}

          <br />
          <br />
          <Typography title={'content'} position={'left'}  contentwidth={'100%'}>
            <u>
              <b>
                {
                  language === 'English' ?
                  'ACTIVITY (TIES) YOU PRACTICED PRIOR TO SESSION 4'
                  :
                  'ACTIVITÉ(S) QUE TU AS PRATIQUÉE(S) AVANT LA SÉANCE 4'
                }
              </b>
            </u>
          </Typography>
          <br />
          <Typography title={'content'} position={'left'}  contentwidth={'100%'}>
            <u>
              <b>
                {
                  language === 'English' ?
                  'Please fill out the sheet below by putting a X if you did practice the planned activity.'
                  :
                  'Remplis la fiche suivante en mettant un X si tu as pratiqué l’activité planifiée'
                }
              </b>
            </u>
          </Typography>



          <div>
            {
              language === 'English' ?
                <div className={styles.row}>
                    <div className={`${styles.small_div} ${styles.borderTrans}`}></div>
                    <div className={`${styles.small_div_purple} ${styles.borderGTTG}`} >Sunday</div>
                    <div className={`${styles.small_div} ${styles.borderGTTG}`} >Monday</div>
                    <div className={`${styles.small_div_purple} ${styles.borderGTTG}`} >Tuesday</div>
                    <div className={`${styles.small_div} ${styles.borderGTTG}`} >Wednesday</div>
                    <div className={`${styles.small_div_purple} ${styles.borderGTTG}`} >Thursday</div>
                    <div className={`${styles.small_div} ${styles.borderGTTG}`} >Friday</div>
                    <div className={`${styles.small_div_purple} ${styles.borderGGTG}`}>Saturday</div>
                    <div className={`${styles.small_div} ${styles.borderGGTG}`} >Comments (How did you feel? What did you notice?)</div>
                </div>
                :
                <div className={styles.row}>
                    <div className={`${styles.small_div} ${styles.borderTrans}`}></div>
                    <div className={`${styles.small_div_purple} ${styles.borderGTTG}`} >Samedi</div>
                    <div className={`${styles.small_div} ${styles.borderGTTG}`} >Dimanche </div>
                    <div className={`${styles.small_div_purple} ${styles.borderGTTG}`} >Lundi</div>
                    <div className={`${styles.small_div} ${styles.borderGTTG}`} >Mardi</div>
                    <div className={`${styles.small_div_purple} ${styles.borderGTTG}`} >Mercredi</div>
                    <div className={`${styles.small_div} ${styles.borderGTTG}`} >Jeudi</div>
                    <div className={`${styles.small_div_purple} ${styles.borderGGTG}`}>Vendredi</div>
                    <div className={`${styles.small_div} ${styles.borderGGTG}`} >Commentaires (Qu'as-tu ressenti? Qu’as-tu remarqué ?)</div>
                </div>
            }
                
                {
                  Object.keys(default_value).map(outerKey => (
                    <div className={styles.row}>
                      <div className={`${styles.small_div} ${styles.borderGTGG}`} >{outerKey}</div>
                      <div className={`${styles.small_div_purple} ${styles.borderGTGG}`}>
                          <TextField 
                            className={`${styles.purple} ${styles.answer_textarea}`}
                            titleClassName={styles.title_textarea}
                            rows="1"
                            cols="10"
                            title={''}
                            value={tableAnswers[outerKey] ? tableAnswers[outerKey]['Sat'] : ''}
                            onChange={(event)=>changeTableAnwser(outerKey, 'Sat', event.target.value)}
                            placeholder={previousTableAnswers[outerKey] ? previousTableAnswers[outerKey]['Sat'] : ''}
                            questionError={false}
                            errorWarningText={''}
                          />
                        </div>
                      <div className={`${styles.small_div} ${styles.borderGTGG}`} >
                        <TextField 
                            className={`${styles.white} ${styles.answer_textarea}`}
                            titleClassName={styles.title_textarea}
                            rows="1"
                            cols="10"
                            title={''}
                            value={tableAnswers[outerKey] ? tableAnswers[outerKey]['Sun'] : ''}
                            onChange={(event)=>changeTableAnwser(outerKey, 'Sun', event.target.value)}
                            placeholder={previousTableAnswers[outerKey] ? previousTableAnswers[outerKey]['Sun'] : ''}
                            questionError={false}
                            errorWarningText={''}
                          />
                      </div>
                      <div className={`${styles.small_div_purple} ${styles.borderGTGG}`} >
                        <TextField 
                            className={`${styles.purple} ${styles.answer_textarea}`}
                            titleClassName={styles.title_textarea}
                            rows="1"
                            cols="10"
                            title={''}
                            value={tableAnswers[outerKey] ? tableAnswers[outerKey]['Mon'] : ''}
                            onChange={(event)=>changeTableAnwser(outerKey, 'Mon', event.target.value)}
                            placeholder={previousTableAnswers[outerKey] ? previousTableAnswers[outerKey]['Mon'] : ''}
                            questionError={false}
                            errorWarningText={''}
                          />
                      </div>
                      <div className={`${styles.small_div} ${styles.borderGTGG}`} >
                        <TextField 
                            className={`${styles.white} ${styles.answer_textarea}`}
                            titleClassName={styles.title_textarea}
                            rows="1"
                            cols="10"
                            title={''}
                            value={tableAnswers[outerKey] ? tableAnswers[outerKey]['Tue'] : ''}
                            onChange={(event)=>changeTableAnwser(outerKey, 'Tue', event.target.value)}
                            placeholder={previousTableAnswers[outerKey] ? previousTableAnswers[outerKey]['Tue'] : ''}
                            questionError={false}
                            errorWarningText={''}
                          />
                      </div>
                      <div className={`${styles.small_div_purple} ${styles.borderGTGG}`} >
                        <TextField 
                            className={`${styles.purple} ${styles.answer_textarea}`}
                            titleClassName={styles.title_textarea}
                            rows="1"
                            cols="10"
                            title={''}
                            value={tableAnswers[outerKey] ? tableAnswers[outerKey]['Wed'] : ''}
                            onChange={(event)=>changeTableAnwser(outerKey, 'Wed', event.target.value)}
                            placeholder={previousTableAnswers[outerKey] ? previousTableAnswers[outerKey]['Wed'] : ''}
                            questionError={false}
                            errorWarningText={''}
                          />
                      </div>
                      <div className={`${styles.small_div} ${styles.borderGTGG}`} >
                        <TextField 
                            className={`${styles.white} ${styles.answer_textarea}`}
                            titleClassName={styles.title_textarea}
                            rows="1"
                            cols="10"
                            title={''}
                            value={tableAnswers[outerKey] ? tableAnswers[outerKey]['Thu'] : ''}
                            onChange={(event)=>changeTableAnwser(outerKey, 'Thu', event.target.value)}
                            placeholder={previousTableAnswers[outerKey] ? previousTableAnswers[outerKey]['Thu'] : ''}
                            questionError={false}
                            errorWarningText={''}
                          />
                      </div>
                      <div className={`${styles.small_div_purple}`}>
                        <TextField 
                            className={`${styles.purple} ${styles.answer_textarea}`}
                            titleClassName={styles.title_textarea}
                            rows="1"
                            cols="10"
                            title={''}
                            value={tableAnswers[outerKey] ? tableAnswers[outerKey]['Fri'] : ''}
                            onChange={(event)=>changeTableAnwser(outerKey, 'Fri', event.target.value)}
                            placeholder={previousTableAnswers[outerKey] ? previousTableAnswers[outerKey]['Fri'] : ''}
                            questionError={false}
                            errorWarningText={''}
                          />
                      </div>
                      <div className={`${styles.small_div} ${styles.borderGTGG}`} >
                        <TextField 
                            className={`${styles.white} ${styles.answer_textarea}`}
                            titleClassName={styles.title_textarea}
                            rows="1"
                            cols="10"
                            title={''}
                            value={tableAnswers[outerKey] ? tableAnswers[outerKey]['Comm'] : ''}
                            onChange={(event)=>changeTableAnwser(outerKey, 'Comm', event.target.value)}
                            placeholder={previousTableAnswers[outerKey] ? previousTableAnswers[outerKey]['Comm'] : ''}
                            questionError={false}
                            errorWarningText={''}
                          />
                      </div>
                    </div>
                  ))
                }
                
            </div>
            <br />

            <Typography title={'content'} position={'left'} color={'primary'} contentwidth={'100%'}>
            {
                  language === 'English' ?
                  'You did a great job in practising Self-compassion skills, well done! '
                  :
                  "Tu as fait du bon travail dans ta pratique des compétences d’autocompassion, bravo !"
                }
            </Typography>


            {/* <Button word={'Exercise B-1'} onClick={next} position={'center'} outlook={'round'} /> */}
            <div className={styles.flex}>
                <div className={styles.twoBtns}><Button word={language === 'English' ? 'Download Template' : 'Télécharger gabarit'} onClick={downloadCSV} controverse position={'left'} /></div>
                <div className={styles.twoBtns}><Button word={language === 'English' ? 'NEXT' : 'Suivant'} onClick={next} position={'right'} /></div>
            </div>
            </div>
            </div>

        </div>
    
  );
};

export default Session5Worksheet1B;