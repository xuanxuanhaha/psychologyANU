import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './session3worksheet2b.module.css';
import Navbar from '../../../Navbar/Navbar';
import { useSelector } from 'react-redux';
import Button from '../../../ReusableComponents/Button/Button';
import ProgressBar from '../../../ReusableComponents/ProgressBar/ProgressBar';
import Typography from '../../../ReusableComponents/Typography/Typography';
import BorderContent from '../../../ReusableComponents/BorderContent/BorderContent';
import Modal from 'react-modal';
import Wordings from './Wordings';
import Helppop from '../../../ReusableComponents/Helppop/Helppop';
import Scale from '../../../ReusableComponents/Scale/Scale';
import TextField from '../../../ReusableComponents/TextField/TextField';
import * as XLSX from 'xlsx';

const Session3Worksheet2B = () => {
  const navigate = useNavigate();
  const userData = useSelector(state => state.auth.user);
  const language = userData.language
  const defalut_value = {q0: '', q1: '', q2: '', q3: '', q4: '', q5: 0}


  const [sessionId, setSessionId] = useState(0);
  const [questionGoal, setQuestionGoal] = useState('');
  const [groupA, setQuestionGroupA] = useState(0);
  const [groupB, setQuestionGroupB] = useState(0);
  const [groupC, setQuestionGroupC] = useState(0);
  const [tableAnswers, setTableAnswers] = useState([defalut_value]);
  const [count, setCount] = useState(1)
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const screenHeight = window.innerHeight;
    document.getElementById('background_image').style.minHeight = `${screenHeight - 100}px`;

    if(userData){
        axios.get(`/api/sessionresponse/3?userid=${userData.userid}&&questionno=session3worksheet1b`).then(response => {
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

        axios.get(`/api/sessionresponse/3?userid=${userData.userid}&&questionno=session3worksheet1b`)
          .then(response => {
            if(response.data){
                if(response.data.sessionresponse.response){
                    const questionanswer = JSON.parse(response.data.sessionresponse.response)
                    setQuestionGroupA(questionanswer.q1)
                    setQuestionGroupB(questionanswer.q2)
                    setQuestionGroupC(questionanswer.q3)
                }
            }
          })
          .catch(error => {
            // Handle any errors
            console.error(error);
          });
        
          axios.get(`/api/sessionresponse/3?userid=${userData.userid}&&questionno=session3worksheet2b`)
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
    }
  }, []);


  const next = () => {
    const allValuesNotEmpty = tableAnswers.every(obj => {
      return Object.values(obj).every(value => value !== '' || value === 0);
    });

    if (allValuesNotEmpty) {
      setShowError(false);
      passData();

    } else {
      setShowError(true);
    }

  };

  const passData = () => {
    const data = {
        'userid': userData.userid,
        'sessionid': 3,
        'questionno': 'session3worksheet2b',
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
    navigate(`/session3worksheet3b`);
  };



  const downloadCSV = () => {

    // Create a CSV content string (replace with your own data)
    // const csvContent = "Name,Email\nJohn Doe,johndoe@example.com\nJane Smith,janesmith@example.com";
    const csvHeader = ",What exactly do you want to do?, What is the duration of the activity?, Where will you perform the activity?, When will you perform the activity?, Indicate your confidence";
    const csvContent1 = ",Consider what group resources you plan to use to achieve this goal,Consider making use of any group resources,Consider making use of any group resources.,,1 - 10";
    const csvContent2 = "Exmaple 1 My goal is to finish studying for my upcoming exam, I want to study my Biology lecture notes with my fellow students of the biology tutor group (my connection with fellow biology students is the resource).,1 hour per day.,In the library at a booked group room (The library is a resource we can use).,Every Tuesday from 6pm to 7pm,10";
    
    const sentence = 'Dans la bibliothèque, dans une salle de groupe réservée (la bibliothèque est la ressource que nous pouvons utiliser)'
    const csvHeaderF = ",Que vas-tu faire exactement ?, Quelle est la durée de l’activité ?, Où vas-tu faire l’activité ?, Quand vas-tu faire l’activité ?, Indique ton niveau de confiance.";
    const csvContent1F = ",Réfléchis aux ressources des groupes que tu comptes utiliser pour atteindre cet objectif.,Réfléchis à quelles ressources des groupes que tu comptes utiliser quand tu penses à la durée de l’activité.,Envisage d’utiliser les ressources des groupes.,,1 - 10";
    const csvContent2F = `Exemple 1 Mon objectif : Finir d’étudier pour mon prochain examen., Je veux étudier mes notes de cours avec mon groupe de biologie (faire partie de la même classe que mes camarades du cours de biologie est une ressource),1 heure par jour,"${sentence}",Chaque mardi de 18h à 19h.,8`;

    const allValuesNotEmpty = tableAnswers.every(obj => {
      return Object.values(obj).every(value => value !== '' || value === 0);
    });

    if (!allValuesNotEmpty) {
      setShowError(true);
    } else {
      let worksheetData = [];
      // Push headers
      worksheetData.push(csvHeader.split(','));
      worksheetData.push(csvContent1.split(','));
      worksheetData.push(csvContent2.split(','));

      // Push user answers
      tableAnswers.forEach(answer => {
          worksheetData.push([
              answer.q0,
              answer.q1,
              answer.q2,
              answer.q3,
              answer.q4,
              answer.q5
          ]);
      });

      const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

      // Convert workbook to binary string
      const excelBinaryString = XLSX.write(workbook, {
          bookType: 'xlsx',
          type: 'binary'
      });

      // Convert binary string to Blob
      const blob = new Blob([s2ab(excelBinaryString)], {
          type: 'application/octet-stream'
      });

      // Create a download link and trigger the download
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', 'Session2Worksheet3Q1.xlsx');
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

  const changeTableAnwser =(rowIndex, columnIndex, value) => {
    if (!tableAnswers[rowIndex]) {
      tableAnswers[rowIndex] = {};
    }
    tableAnswers[rowIndex]['q' + columnIndex] = value;
    const tableanswers = tableAnswers
    setTableAnswers(tableanswers)
    setCount(count + 1)
  }

  const addMoreRow = () => {
    const tableanswers = tableAnswers
    tableanswers.push(defalut_value)
    setTableAnswers(tableAnswers)
    setCount(count + 1)
    setShowError(false)
    console.log('uncaught add more row', tableAnswers)
  }

  const removeRow = (index) => {
    const tableanswers = tableAnswers

    if (index >= 0 && index < tableanswers.length) {
      tableanswers.splice(index, 1); // Remove one element at the specified index
    }
    setTableAnswers(tableanswers)
    setCount(count - 1)
    setShowError(false)

  }

  // useEffect(() => {console.log('uncaught haah')}, [count]);


  return (
    <div>
       <Navbar />
        <div className={styles.background_image} id="background_image">
            
          <div className={styles.whole_border}>

          <Typography title={'subtitle'} position={'left'}>
            {
              language === 'English' ?
              'Session 3'
              :
              'Deuxième session'
            }  
          </Typography>

          <ProgressBar percentageNo={66} language={language} />
          <Wordings 
            language={language} 
            groupA={groupA}
            groupB={groupB}
            groupC={groupC}
            questionGoal={questionGoal}
          />

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
              <p>
                {
                  language === 'English' ?
                  'Consider what group resources you plan to use to achieve this goal.'
                  :
                  'Réfléchis aux ressources des groupes que tu comptes utiliser pour atteindre cet objectif.'
                }
                </p>
            </th>
            <th className={styles.each_column}><u><b>
              {
                language === 'English' ?
                ' What is the duration of the activity?'
                :
                'Quelle est la durée de l’activité ?'
              }
              </b></u>
              <p>
                {
                language === 'English' ?
                'Consider what group resources you plan to use when thinking of the duration of the activity'
                :
                'Réfléchis à quelles ressources des groupes que tu comptes utiliser quand tu penses à la durée de l’activité.'
                }
              </p>
            </th>
            <th className={styles.each_column}><u><b>
                {
                  language === 'English' ?
                  'Where will you perform the activity?'
                  :
                  'Où vas-tu faire l’activité ?'
                }
              </b></u>
              <p>
                {
                  language === 'English' ?
                  'Consider making use of any group resources.'
                  :
                  'Envisage d’utiliser les ressources des groupes.'
                }
                </p>
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
                            title={''}
                            value={row.q0 || ''}
                            onChange={(event)=>changeTableAnwser(index, 0, event.target.value)}
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
                          value={row.q1 || ''}
                          onChange={(event)=>changeTableAnwser(index, 1, event.target.value)}
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
                          cols="10"
                          title={''}
                          value={row.q2 || ''}
                          onChange={(event)=>changeTableAnwser(index, 2, event.target.value)}
                          placeholder={''}
                          questionError={(!row.q2 || row.q2 === '') && showError}
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
                          value={row.q3 || ''}
                          onChange={(event)=>changeTableAnwser(index, 3, event.target.value)}
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
                          title={''}
                          value={row.q4 || ''}
                          onChange={(event)=>changeTableAnwser(index, 4, event.target.value)}
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
                            onChange={(value) => changeTableAnwser(index, 5, value)}
                          />
                        </div>
                      </td>
                      <td>
                        {
                          tableAnswers.length > 1 &&
                          <Button className={styles.btn} word={language === 'English' ? 'Delete' : 'Effacer'}  onClick={() => removeRow(index)} position={'center'} />
                        }
                      </td>
                    </tr>
            })
          }
          <tr className={styles.table_header }>
            <Button className={styles.addBtn} word={
              language === 'English' ?
              'Add' :
              'Ajouter une activité'
              }  onClick={() => addMoreRow()} position={'left'} />
          </tr>
    </table>
        






          <div className={styles.flex}>
              <div className={styles.twoBtns}><Button word={language === 'English' ? 'Download Template' : 'Télécharger gabarit'} onClick={downloadCSV} controverse position={'left'} /></div>
              <div className={styles.twoBtns}><Button word={'NEXT'} onClick={next} position={'right'} /></div>
          </div>

        </div>
      </div>

      

    </div>
  );
};

export default Session3Worksheet2B;