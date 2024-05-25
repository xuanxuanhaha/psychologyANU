import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './session5c.module.css';
import Navbar from '../../../Navbar/Navbar';
import { useSelector } from 'react-redux';
import Button from '../../../ReusableComponents/Button/Button';
import ProgressBar from '../../../ReusableComponents/ProgressBar/ProgressBar';
import Typography from '../../../ReusableComponents/Typography/Typography';
import CountdownTimer from '../../../ReusableComponents/CountdownTimer/CountdownTimer';
import BorderContent from '../../../ReusableComponents/BorderContent/BorderContent';
import TextField from '../../../ReusableComponents/TextField/TextField';

const Session5C = () => {
  const navigate = useNavigate();
  const userData = useSelector(state => state.auth.user);
  const language = userData.language;

  const [sessionId, setSessionId] = useState(0);
  const [questionA, setQuestionA] = useState('');
  const [questionAError, setQuestionAError] = useState(false);

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
        
        axios.get(`/api/sessionresponse/5?userid=${userData.userid}&&questionno=session5c`)
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
        'sessionid': 5,
        'questionno': 'session5c',
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
  const handleStartSession = () => {
    setLinkClicked(true)

  };

  const jumptonextpage = () => {
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

export default Session5C;
