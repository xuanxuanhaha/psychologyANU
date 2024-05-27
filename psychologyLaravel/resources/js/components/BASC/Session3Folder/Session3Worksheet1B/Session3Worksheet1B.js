import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './session3worksheet1b.module.css';
import Navbar from '../../../Navbar/Navbar';
import { useSelector } from 'react-redux';
import lockericon from './../../../../assets/assessment/oclock.jpg';
import avoid_cycle from './../../../../assets/surveys/avoid_cycle.png'
import avoid_cycle_france from './../../../../assets/surveys/avoid_cycle_france.png'
import Button from '../../../ReusableComponents/Button/Button';
import Helppop from '../../../ReusableComponents/Helppop/Helppop';


import Modal from 'react-modal';
import ProgressBar from '../../../ReusableComponents/ProgressBar/ProgressBar';
import Typography from '../../../ReusableComponents/Typography/Typography';
import BorderContent from '../../../ReusableComponents/BorderContent/BorderContent';
import TextField from '../../../ReusableComponents/TextField/TextField';
import Scale from '../../../ReusableComponents/Scale/Scale';
import * as XLSX from 'xlsx';

const Session3Worksheet1B = () => {
  const navigate = useNavigate();
  const userData = useSelector(state => state.auth.user);
  const language = userData.language

  const [sessionId, setSessionId] = useState(0);
  const defalut_value = {q0: '', q1: '', q2: '', q3: '', q4: '', q5: 0}

  const [questionGoal, setQuestionGoal] = useState('');
  const [tableAnswers, setTableAnswers] = useState([defalut_value]);
  const [count, setCount] = useState(1)
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const screenHeight = window.innerHeight;
    document.getElementById('background_image').style.minHeight = `${screenHeight - 100}px`;

    axios.get(`/api/sessionresponse/2?userid=${userData.userid}&&questionno=session2worksheet1b`).then(response => {
      if(response.data){
        if(response.data.sessionresponse.response){
          const questionanswer = JSON.parse(response.data.sessionresponse.response)
          setQuestionGoal(questionanswer.q1)
        }
      }
    })
    .catch(error => {
      // Handle any errors
      console.error(error);
    });

    axios.get(`/api/sessionresponse/3?userid=${userData.userid}&&questionno=session2worksheet3b`)
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
    jumptonextpage();

  };

  const jumptonextpage = () => {
    navigate(`/session3worksheet2b`);
  };

  const downloadCSV = () => {

    // Create a CSV content string (replace with your own data)
    // const csvContent = "Name,Email\nJohn Doe,johndoe@example.com\nJane Smith,janesmith@example.com";
    const csvHeader = ",What exactly do you want to do?, What is the duration of the activity?, Where will you perform the activity?, When will you perform the activity?, Indicate your confidence";
    const csvContent2 = "Exmaple 1 My goal is to finish studying for my upcoming exam, I want to study my Biology lecture notes with my fellow students of the biology tutor group (my connection with fellow biology students is the resource).,1 hour per day.,In the library at a booked group room (The library is a resource we can use).,Every Tuesday from 6pm to 7pm,10";
    
    const sentence = 'Dans la bibliothèque, dans une salle de groupe réservée (la bibliothèque est la ressource que nous pouvons utiliser)'
    const csvHeaderF = ",Que vas-tu faire exactement ?, Quelle est la durée de l’activité ?, Où vas-tu faire l’activité ?, Quand vas-tu faire l’activité ?, Indique ton niveau de confiance.";
    const csvContent2F = `Exemple 1 Mon objectif : Finir d’étudier pour mon prochain examen., Je veux étudier mes notes de cours avec mon groupe de biologie (faire partie de la même classe que mes camarades du cours de biologie est une ressource),1 heure par jour,"${sentence}",Chaque mardi de 18h à 19h.,8`;

    const allValuesNotEmpty = tableAnswers.every(obj => {
      return Object.values(obj).every(value => value !== '' || value === 0);
    });

    if (!allValuesNotEmpty) {
      setShowError(true);
    }else{
      let csvContent = `${csvHeader}\n${csvContent2}`;
      const csvContentFrench = `${csvHeaderF}\n${csvContent2F}`;
      csvContent = language === 'English' ? csvContent : csvContentFrench


      const worksheetData = [];

      // Push headers
      worksheetData.push(csvHeader.split(','));
      worksheetData.push(csvContent2.split(','));
      tableAnswers.map((answer) => {
        const answerToString = `${answer.q0},${answer.q1},${answer.q2},${answer.q3},${answer.q4},${answer.q5}`;
        worksheetData.push(answerToString.split(','));
      });


      const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

      // Convert workbook to binary string
      const excelBinaryString = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });

      // Convert binary string to Blob
      const blob = new Blob([s2ab(excelBinaryString)], { type: 'application/octet-stream' });

      // Create a download link and trigger the download
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', 'session2worksheet3b.xlsx');
      document.body.appendChild(link); // Required for Firefox
      link.click();

      // Clean up the URL object to free up memory
      URL.revokeObjectURL(link.href);
      document.body.removeChild(link); // Required for Firefox
      }

  };

  function s2ab(s) {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
  }



  return (
    <div>
       <Navbar />
      <div className={styles.background_image} id="background_image">
        <div className={styles.whole_border}>
            <Typography title={'subtitle'} position={'left'}>
                Session 3
            </Typography>

            <ProgressBar percentageNo={33} language={language} />
            
            <br />


            <BorderContent>
                {
                    language === 'English' ?
                    <p> Let’s look at the THREE goals you set in Session 2 Exercise B-1.</p>
                    :
                    <p> Maintenant, réfléchissons aux objectifs que tu peux avoir en relation avec la problématique universitaire écrite dans la 
                      
                      . Écris <b>TROIS</b> objectifs.</p>
                }
            </BorderContent>

            <TextField 
              rows="4"
              cols="50"
              title={''}
              value={questionGoal}
              onChange={(e) => {
              }}
              disabled
              placeholder={
                language === 'English' ?
                "e.g.  My goal is to finish studying for my upcoming exam."
                :
                'p. ex. Mon objectif est de finir d’étudier pour mon prochain examen.'
              }
              questionError={''}
              errorWarningText={ language === 'English' ? 'Please input your answer' : 'Ajoute une réponse.'}
            />

            <BorderContent>
                {
                    language === 'English' ?
                    <p> You also learned to plan your activities in Exercise B-2.</p>
                    :
                    <p> Choisis <b>un objectif </b>et pense à son rapport avec les questions ci-dessous, puis écris tes réponses dans les espaces fournis ci-dessous.</p>
                }
            </BorderContent>


            <table id="question_table" className={styles.table}>
          <tr className={styles.table_header}>
            <th className={styles.each_column}></th>
            <th className={styles.each_column}><u><b>
              {
                language === 'English' ?
                'What exactly do you want to do?'
                :
                'Que vas-tu faire exactement ?'
              }
              </b></u>
              
            </th>
            <th className={styles.each_column}><u><b>
              {
                language === 'English' ?
                ' What is the duration of the activity?'
                :
                'Quelle est la durée de l’activité ?'
              }
              </b></u>
              
            </th>
            <th className={styles.each_column}><u><b>
                {
                  language === 'English' ?
                  'Where will you perform the activity?'
                  :
                  'Où vas-tu faire l’activité ?'
                }
              </b></u>
              
            </th>
            <th className={styles.each_column}><u><b>
              {
                language === 'English' ?
                'When will you perform the activity?'
                :
                'Quand vas-tu faire l’activité ?'
              }
              </b></u>
            </th>
            <th className={styles.scale_column}>
              <Helppop
                  label={
                    language === 'English' ?
                    <u><b>Indicate your confidence</b></u>
                    :
                    'Indique ton niveau de confiance.'
                  }
                  helptext={
                    language === 'English' ?
                    <p>
                      0: not at all confident
                      <br />
                      10: extremely confident
                    </p>
                    :
                    <p>
                      0: aucun
                      <br />
                      10: extrême
                    </p>
                  } />
            </th>
            <th className={styles.delete_column}></th>
          </tr>
          <tr className={styles.table_row}>
            <td> 
              <textarea disabled className={`${styles.answer_textarea} ${styles.disabled}`}>
              {
                language === 'English' ?
                'Example 1 My goal: To finish studying for my upcoming exam'
                :
                'Exemple 1 Mon objectif : Finir d’étudier pour mon prochain examen.'
              }
              </textarea>
            </td>
            <td> <textarea disabled className={`${styles.answer_textarea} ${styles.disabled}`}>
              {
                language === 'English' ?
                'I want to study my Biology lecture notes with my fellow students of the biology tutor group (My connection with fellow biology students is the resource).'
                :
                'Je veux étudier mes notes de cours avec mon groupe de biologie (faire partie de la même classe que mes camarades du cours de biologie est uneressource).'
              }
              
              </textarea>
            </td>
            <td> <textarea disabled className={`${styles.answer_textarea} ${styles.disabled}`}>
              {
                language === 'English' ?
                '1 hour per day.'
                :
                '1 heure par jour.'
              }
              </textarea>
            </td>
            <td> <textarea disabled className={`${styles.answer_textarea} ${styles.disabled}`}>
              {
                language === 'English' ?
                'In the library at a booked group room (The library is a resource we can use).'
                :
                'Dans la bibliothèque, dans une salle de groupe réservée (la bibliothèque est la ressource que nous pouvons utiliser).'
              }
              </textarea>
            </td>
            <td> <textarea disabled className={`${styles.answer_textarea} ${styles.disabled}`}>
              {
                language === 'English' ?
                'Every Tuesday from 6pm to 7pm.'
                :
                'Chaque mardi de 18h à 19h.'
              }
            </textarea>
            </td>
            <td className={styles.scale}>
              <div className={styles.scaleTop} />
              <div className={styles.scaleWidth} >
              <Scale
                  slidervalue={8}
                  step={1}
                  marks={[{value: 0, label: 0}, {value: 10, label: 10}]}
                  min={0}
                  max={10}
                  onChange={(value) => null} 
                />
                </div>
            </td>
            <td>
            </td>
          </tr>

          {
            tableAnswers.map((row, index) => {
              return <tr className={styles.table_row}>
                      <td>
                        <TextField 
                            className={styles.answer_textarea}
                            rows="1"
                            cols="10"
                            disabled
                            title={''}
                            value={row.q0 || ''}
                            onChange={(event)=>console.log('not able to change')}
                            placeholder={language === 'English' ? `Activity ${index + 1}:` : `Activité ${index + 1}:`}
                            questionError={(!row.q0 || row.q0 === '') && showError}
                            errorWarningText={ language === 'English' ? 'Please input your answer' : 'Ajoute une réponse.'}
                            errorClassName={styles.answer_textarea_error}
                          />
                      </td>
                      <td>
                        <TextField 
                          className={styles.answer_textarea}
                          rows="1"
                          cols="10"
                          title={''}
                          disabled
                          value={row.q1 || ''}
                          onChange={(event)=>console.log('not able to change')}
                          placeholder={''}
                          questionError={(!row.q1 || row.q1 === '') && showError}
                          errorWarningText={ language === 'English' ? 'Please input your answer' : 'Ajoute une réponse.'}
                          errorClassName={styles.answer_textarea_error}
                        />
                      </td>
                      <td>
                        <TextField 
                          className={styles.answer_textarea}
                          rows="1"
                          disabled
                          cols="10"
                          title={''}
                          value={row.q2 || ''}
                          onChange={(event)=>console.log('not able to change')}
                          placeholder={''}
                          questionError={(!row.q2 || row.q2 === '') && showError}
                          errorWarningText={ language === 'English' ? 'Please input your answer' : 'Ajoute une réponse.'}
                          errorClassName={styles.answer_textarea_error}
                        />
                      </td>
                      <td>
                        <TextField 
                          className={styles.answer_textarea}
                          disabled
                          rows="1"
                          cols="10"
                          title={''}
                          value={row.q3 || ''}
                          onChange={(event)=>console.log('not able to change')}
                          placeholder={''}
                          questionError={(!row.q3 || row.q3 === '') && showError}
                          errorWarningText={ language === 'English' ? 'Please input your answer' : 'Ajoute une réponse.'}
                          errorClassName={styles.answer_textarea_error}
                        />
                      </td>
                      <td>
                        <TextField 
                          className={styles.answer_textarea}
                          rows="1"
                          cols="10"
                          disabled
                          title={''}
                          value={row.q4 || ''}
                          onChange={(event)=>console.log('not able to change')}
                          placeholder={''}
                          questionError={(!row.q4 || row.q4 === '') && showError}
                          errorWarningText={ language === 'English' ? 'Please input your answer' : 'Ajoute une réponse.'}
                          errorClassName={styles.answer_textarea_error}
                        />
                      </td>
                      <td>
                        <div className={styles.scaleTop}/>
                        <div className={styles.scaleWidth} >
                          <Scale
                            className={styles.scale}
                            slidervalue={row.q5}
                            step={1}
                            marks={[{value: 0, label: 0}, {value: 10, label: 10}]}
                            min={0}
                            max={10}
                            onChange={(value) => console.log('not able to change')}
                          />
                        </div>
                      </td>
                      <td>
                        {
                          tableAnswers.length > 1 &&
                          <Button className={styles.btn} disabled word={language === 'English' ? 'Delete' : 'Effacer'}  onClick={() => console.log('not able to change')} position={'center'} />
                        }
                      </td>
                    </tr>
            })
          }
          {/* <tr className={styles.table_header }>
            <Button className={styles.addBtn} word={
              language === 'English' ?
              'Add' :
              'Ajouter une activité'
              }  onClick={() => addMoreRow()} position={'left'} />
          </tr> */}
    </table>

            <Button word={language === 'English' ? 'NEXT' : 'Suivant'} onClick={next} position={'center'} />

            </div>
            </div>

        </div>
    
  );
};

export default Session3Worksheet1B;