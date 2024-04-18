import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './session1worksheetq1c.module.css';
import Navbar from '../../../Navbar/Navbar';
import { useSelector } from 'react-redux';
import lockericon from './../../../../assets/assessment/oclock.jpg';
import Button from '../../../ReusableComponents/Button/Button';
import ProgressBar from '../../../ReusableComponents/ProgressBar/ProgressBar';
import BorderContent from '../../../ReusableComponents/BorderContent/BorderContent';
import TextField from '../../../ReusableComponents/TextField/TextField';
import Typography from '../../../ReusableComponents/Typography/Typography';

const Session1WorksheetQ1C = () => {
  const navigate = useNavigate();
  const userData = useSelector(state => state.auth.user);
  const language = userData.language
  const [sessionId, setSessionId] = useState(0);
  const [questionA, setQuestionA] = useState('');
  const [questionB, setQuestionB] = useState('');
  const [questionAError, setQuestionAError] = useState(false);
  const [questionBError, setQuestionBError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const screenHeight = window.innerHeight;
    document.getElementById('background_image').style.minHeight = `${screenHeight - 100}px`;

    if(userData){
        axios.get(`/api/sessionresponse/1?userid=${userData.userid}&&questionno=session1WorksheetQ1C`)
          .then(response => {
            if(response.data){
              if(response.data.sessionresponse.response){
                const questionanswer = JSON.parse(response.data.sessionresponse.response)
                setQuestionA(questionanswer.q1)
                setQuestionB(questionanswer.q2)
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
    console.log(questionA, questionB);
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
    if (questionA !== '' && questionB !== '') {
      passData();
    }
  };

  const passData = () => {
    console.log('data uncaught')
    const data = {
        'userid': userData.userid,
        'sessionid': 1,
        'questionno': 'session1WorksheetQ1C',
        'response': {'q1': questionA, 'q2': questionB}
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
    navigate(`/session1worksheetq2c`);
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

          <ProgressBar percentageNo={60} language={language} />


          <div className={styles.question_content}>
          <BorderContent>
            {
              language === 'English' ?
                  <div>
                    Choose <b>ONE</b> issue and write about it by answering the questions below.
                    <br />
                    Try to provide details regarding the issue.
                    Please be assured that your responses will be stored anonymously and securely.
                  </div>
                :
                <div >
                    Choisis <b>UN</b> problème et écris à propos de ce problème en répondant aux questions ci-dessous. 
                    <br />
                    Fournis des détails par rapport à ce problème. Tu peux être rassuré que tes réponses soient gardées de façon anonyme et en toute sécurité.
                </div>
            }
          </BorderContent>
            </div>

            <TextField 
              rows="4"
              cols="50"
              title={
                language === 'English' ?
                <i>What exactly is the issue? (Write <b>ONE</b> sentence)</i>
                :
                <i>Quel est le problème ? (Réponds en <b>UNE</b> phrase)</i>
              }
              value={questionA}
              onChange={(e) => {
                setQuestionA(e.target.value)
                setQuestionAError(false)
              }}
              placeholder={
                language === 'English' ?
                "e.g. I worry about my upcoming exam."
                :
                "p.ex. Je m’inquiète par rapport à mon prochain examen."
              }
              questionError={questionAError}
              errorWarningText={ language === 'English' ? 'Please input your answer' : 'Ajoute une réponse.'}
            />
            
            <TextField 
              rows="4"
              cols="50"
              title=              {
                language === 'English' ?
                <i>Why is the issue something that you worry about? (Write <b>no more than THREE</b> sentences)</i>
                :
                <i>Pourquoi ce problème t’inquiète t-il? (Ne <b>pas</b> écrire <b>plus que TROIS</b> phrases)</i>
              }
              value={questionB}
              onChange={(e) => {
                setQuestionB(e.target.value)
                setQuestionBError(false)
              }}
              placeholder={
                language === 'English' ?
                "e.g. I'm worried because I didn't do well on my previous exam."
                :
                "p.ex. Je m’inquiète parce que j’ai moins bien réussi mon examen précédent."
              }
              questionError={questionBError}
              errorWarningText={ language === 'English' ? 'Please input your answer' : 'Ajoute une réponse.'}
            />

          <Button word={language === 'English' ? 'NEXT' : 'Suivant'} onClick={next} position={'right'} />

        </div>
      </div>
    </div>
  );
};

export default Session1WorksheetQ1C;