import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './session3worksheet1q4.module.css';
import Navbar from '../../Navbar/Navbar';
import { useSelector } from 'react-redux';
import lockericon from './../../../assets/assessment/oclock.jpg';
import Button from '../../ReusableComponents/Button/Button';


import Modal from 'react-modal';
import ProgressBar from '../../ReusableComponents/ProgressBar/ProgressBar';
import Typography from '../../ReusableComponents/Typography/Typography';
import BorderContent from '../../ReusableComponents/BorderContent/BorderContent';
import TextField from '../../ReusableComponents/TextField/TextField';
import Session3worksheet1q4Wording from './session3worksheet1q4Wording';
import * as XLSX from 'xlsx';

const Session3Worksheet1Q4 = () => {
  const navigate = useNavigate();
  const userData = useSelector(state => state.auth.user);
  const language = userData.language

  const [sessionId, setSessionId] = useState(0);
  const [questionIssue, setQuestionIssue] = useState('');

  const default_value = {
    '1': {'A': '', 'B': '', 'C': '', 'D': '', 'Comm': ''},
    '2': {'A': '', 'B': '', 'C': '', 'D': '', 'Comm': ''},
    '3': {'A': '', 'B': '', 'C': '', 'D': '', 'Comm': ''},
    '4': {'A': '', 'B': '', 'C': '', 'D': '', 'Comm': ''},
    '5': {'A': '', 'B': '', 'C': '', 'D': '', 'Comm': ''},
    '6': {'A': '', 'B': '', 'C': '', 'D': '', 'Comm': ''},
    '7': {'A': '', 'B': '', 'C': '', 'D': '', 'Comm': ''},
  }

  const [tableAnswers, setTableAnswers] = useState(default_value)
  const [count, setCount] = useState(0)


  useEffect(() => {
    window.scrollTo(0, 0);
    const screenHeight = window.innerHeight;
    document.getElementById('background_image').style.minHeight = `${screenHeight - 100}px`;

    if(userData){
        axios.get(`/api/sessionresponse/1?userid=${userData.userid}&&questionno=session1WorksheetQ1`).then(response => {
          if(response.data){
            if(response.data.sessionresponse.response){
              const questionanswer = JSON.parse(response.data.sessionresponse.response)
              setQuestionIssue(questionanswer.q1)
            }
          }
        })
        .catch(error => {
          // Handle any errors
          console.error(error);
        });

        axios.get(`/api/sessionresponse/4?userid=${userData.userid}&&questionno=session3worksheet1q4`)
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


      passData();
    
  };

  const passData = () => {
    const data = {
        'userid': userData.userid,
        'sessionid': 4,
        'questionno': 'session3worksheet1q4',
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
    // navigate(`/session3worksheet1end`);
    navigate('/session4end')
  };

  const downloadCSV = () => {
    const csvHeader = "Date,Practice Self-compassion exercise,,,,Comments (How did you feel? What did you notice?)";
    const csvContenHeaderDescription = ",Focus on the academic-related issue written in Worksheet 1,,Focus on other negative thoughts,"
    const csvContentSubHeader = ",How many times,How long in total (min),How many times,How long in total (min),"
    const csvContent1 = `Day 1,${tableAnswers[1]['A'] || ''},${tableAnswers[1]['B'] || ''},${tableAnswers[1]['C'] || ''},${tableAnswers[1]['D'] || ''},${tableAnswers[1]['Comm'] || ''}`
    const csvContent2 = `Day 2,${tableAnswers[2]['A'] || ''},${tableAnswers[2]['B'] || ''},${tableAnswers[2]['C'] || ''},${tableAnswers[2]['D'] || ''},${tableAnswers[2]['Comm'] || ''}`
    const csvContent3 = `Day 3,${tableAnswers[3]['A'] || ''},${tableAnswers[3]['B'] || ''},${tableAnswers[3]['C'] || ''},${tableAnswers[3]['D'] || ''},${tableAnswers[3]['Comm'] || ''}`
    const csvContent4 = `Day 4,${tableAnswers[4]['A'] || ''},${tableAnswers[4]['B'] || ''},${tableAnswers[4]['C'] || ''},${tableAnswers[4]['D'] || ''},${tableAnswers[4]['Comm'] || ''}`
    const csvContent5 = `Day 5,${tableAnswers[5]['A'] || ''},${tableAnswers[5]['B'] || ''},${tableAnswers[5]['C'] || ''},${tableAnswers[5]['D'] || ''},${tableAnswers[5]['Comm'] || ''}`
    const csvContent6 = `Day 6,${tableAnswers[6]['A'] || ''},${tableAnswers[6]['B'] || ''},${tableAnswers[6]['C'] || ''},${tableAnswers[6]['D'] || ''},${tableAnswers[6]['Comm'] || ''}`
    const csvContent7 = `Day 7,${tableAnswers[7]['A'] || ''},${tableAnswers[7]['B'] || ''},${tableAnswers[7]['C'] || ''},${tableAnswers[7]['D'] || ''},${tableAnswers[7]['Comm'] || ''}`

    const csvHeaderF = "Date,Pratique de l’exercice d’autocompassion,,,,Commentaires (Qu'as-tu ressenti ? Qu’as-tu remarqué ?)";
    const csvContenHeaderDescriptionF = ",Le problème relié aux études écrit dans la fiche 1,,Une autre pensée négative,"
    const csvContentSubHeaderF = ",Combien de fois,Durée total (min),Combien de fois,Durée total (min),"
    const csvContent1F = `Jour 1,${tableAnswers[1]['A'] || ''},${tableAnswers[1]['B'] || ''},${tableAnswers[1]['C'] || ''},${tableAnswers[1]['D'] || ''},${tableAnswers[1]['Comm'] || ''}`
    const csvContent2F = `Jour 2,${tableAnswers[2]['A'] || ''},${tableAnswers[2]['B'] || ''},${tableAnswers[2]['C'] || ''},${tableAnswers[2]['D'] || ''},${tableAnswers[2]['Comm'] || ''}`
    const csvContent3F = `Jour 3,${tableAnswers[3]['A'] || ''},${tableAnswers[3]['B'] || ''},${tableAnswers[3]['C'] || ''},${tableAnswers[3]['D'] || ''},${tableAnswers[3]['Comm'] || ''}`
    const csvContent4F = `Jour 4,${tableAnswers[4]['A'] || ''},${tableAnswers[4]['B'] || ''},${tableAnswers[4]['C'] || ''},${tableAnswers[4]['D'] || ''},${tableAnswers[4]['Comm'] || ''}`
    const csvContent5F = `Jour 5,${tableAnswers[5]['A'] || ''},${tableAnswers[5]['B'] || ''},${tableAnswers[5]['C'] || ''},${tableAnswers[5]['D'] || ''},${tableAnswers[5]['Comm'] || ''}`
    const csvContent6F = `Jour 6,${tableAnswers[6]['A'] || ''},${tableAnswers[6]['B'] || ''},${tableAnswers[6]['C'] || ''},${tableAnswers[6]['D'] || ''},${tableAnswers[6]['Comm'] || ''}`
    const csvContent7F = `Jour 7,${tableAnswers[7]['A'] || ''},${tableAnswers[7]['B'] || ''},${tableAnswers[7]['C'] || ''},${tableAnswers[7]['D'] || ''},${tableAnswers[7]['Comm'] || ''}`


    const worksheetData = [];
    
    // Push headers
    worksheetData.push(csvHeader.split(','));
    worksheetData.push(csvContenHeaderDescription.split(','));
    worksheetData.push(csvContentSubHeader.split(','));
    worksheetData.push(csvContent1.split(','));
    worksheetData.push(csvContent2.split(','));
    worksheetData.push(csvContent3.split(','));
    worksheetData.push(csvContent4.split(','));
    worksheetData.push(csvContent5.split(','));
    worksheetData.push(csvContent6.split(','));
    worksheetData.push(csvContent7.split(','));

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Convert workbook to binary string
    const excelBinaryString = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });

    // Convert binary string to Blob
    const blob = new Blob([s2ab(excelBinaryString)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Create a download link and trigger the download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'Session3Worksheet1Q4.xlsx');
    document.body.appendChild(link); // Required for Firefox
    link.click();

    // Clean up the URL object to free up memory
    URL.revokeObjectURL(link.href);
    document.body.removeChild(link); // Required for Firefox
};

function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
}


  const changeTableAnwser =(outerKey, innerKey, value) => {
    const tableanswers = tableAnswers
    tableanswers[outerKey][innerKey] = value
    setTableAnswers(tableanswers)
    setCount(count + 1)
  }




  return (
    <div>
       <Navbar />
        <div className={styles.background_image} id="background_image">
            <div className={styles.whole_border}>
                <Typography title={'subtitle'} position={'left'}>
                    {
                        language === 'English' ? 
                        'Fourth Session' :
                        'Troisième session'
                    }
                </Typography>

                <ProgressBar percentageNo={100} language={language} />

                <Typography title={'content'} position={'center'} color={'primary'}>EXCERCISE D-4</Typography>
                <br />
                <Typography title={'content'} position={'center'}>
                    <b>
                    {
                        language === 'English' ?
                        'Self-Compassion Homework Tasks'
                        :
                        'Devoirs d’autocompassion'
                    }
                    </b>
                </Typography>

                <br />
                <Session3worksheet1q4Wording
                    language={language} 
                    questionIssue={questionIssue}
                 />

                <table id="question_table" className={styles.table}>
                    <tr className={styles.table_header}>
                        <th rowspan="2" className={styles.each_column}>
                            <b>
                            {
                                language === 'English' ?'Date':'Date'
                            }
                            </b>
                        </th>
                        <th colspan="4" className={styles.each_column}>
                            <b>
                            {
                                language === 'English' ?'Practice Self-compassion exercise':'Pratique de l’exercice d’autocompassion'
                            }
                            </b>
                        </th>
                        <th rowspan="2"  className={styles.each_column}>
                            <b>
                                <p>
                                {
                                    language === 'English' ?'Comments':'Commentaires'
                                }
                                </p>
                                <p>
                                {
                                    language === 'English' ?'(How did you feel? What did you notice?)':"(Qu'as-tu ressenti ? Qu’as-tu remarqué ?)"
                                }
                                </p>
                            </b>
                        </th>
                    </tr>
                    <tr className={styles.table_header}>
                        <th colspan="2" className={styles.each_column}>
                            {
                                language === 'English' ?
                                'Focus on the academic-related issue written in Worksheet 1' :
                                'Le problème relié aux études écrit dans la fiche 1'
                            }
                        </th>
                        <th colspan="2" className={styles.each_column}>
                            {
                                language === 'English' ?
                                'Focus on other negative thoughts' :
                                'Une autre pensée négative'
                            }
                        </th>
                    </tr>
                    <tr className={styles.table_header}>
                        <th className={styles.each_column}></th>
                        <th className={styles.each_column}>
                            <b>
                                {
                                    language === 'English' ?
                                    'How many times' :
                                    'Combien de fois'
                                }
                            </b>
                        </th>
                        <th className={styles.each_column}>
                            <b>
                                {
                                    language === 'English' ?
                                    'How long in total (min)' :
                                    'Durée total (min)'
                                }
                            </b>
                        </th>
                        <th className={styles.each_column}>
                            <b>
                                {
                                    language === 'English' ?
                                    'How many times' :
                                    'Combien de fois'
                                }
                            </b>
                        </th>
                        <th className={styles.each_column}>
                            <b>
                                {
                                    language === 'English' ?
                                    'How long in total (min)' :
                                    'Durée total (min)'
                                }
                            </b>
                        </th>
                        <th className={styles.each_column}></th>
                    </tr>
                    {
                        Object.keys(default_value).map(outerKey => (
                            <tr className={styles.table_header}>
                                <th className={styles.each_column}>
                                {
                                    language === 'English' ?
                                    `Day ${outerKey}` :
                                    `Jour ${outerKey}`
                                }
                                </th>
                                <th className={styles.each_column}>
                                    <TextField
                                        outerlassName={styles.textFieldOuterDiv}
                                        className={`${styles.answer_textarea}`}
                                        titleClassName={styles.title_textarea}
                                        rows="1"
                                        cols="10"
                                        title={''}
                                        value={tableAnswers[outerKey] ? tableAnswers[outerKey]['A'] : ''}
                                        onChange={(event)=>changeTableAnwser(outerKey, 'A', event.target.value)}
                                        placeholder={``}
                                        questionError={false}
                                        errorWarningText={''}
                                    />
                                </th>
                                <th className={styles.each_column}>
                                    <TextField
                                        outerlassName={styles.textFieldOuterDiv}
                                        className={`${styles.answer_textarea}`}
                                        titleClassName={styles.title_textarea}
                                        rows="1"
                                        cols="10"
                                        title={''}
                                        value={tableAnswers[outerKey] ? tableAnswers[outerKey]['B'] : ''}
                                        onChange={(event)=>changeTableAnwser(outerKey, 'B', event.target.value)}
                                        placeholder={``}
                                        questionError={false}
                                        errorWarningText={''}
                                    />
                                </th>
                                <th className={styles.each_column}>
                                    <TextField
                                        outerlassName={styles.textFieldOuterDiv}
                                        className={`${styles.answer_textarea}`}
                                        titleClassName={styles.title_textarea}
                                        rows="1"
                                        cols="10"
                                        title={''}
                                        value={tableAnswers[outerKey] ? tableAnswers[outerKey]['C'] : ''}
                                        onChange={(event)=>changeTableAnwser(outerKey, 'C', event.target.value)}
                                        placeholder={``}
                                        questionError={false}
                                        errorWarningText={''}
                                    />
                                </th>
                                <th className={styles.each_column}>
                                    <TextField
                                        outerlassName={styles.textFieldOuterDiv}
                                        className={`${styles.answer_textarea}`}
                                        titleClassName={styles.title_textarea}
                                        rows="1"
                                        cols="10"
                                        title={''}
                                        value={tableAnswers[outerKey] ? tableAnswers[outerKey]['D'] : ''}
                                        onChange={(event)=>changeTableAnwser(outerKey, 'D', event.target.value)}
                                        placeholder={``}
                                        questionError={false}
                                        errorWarningText={''}
                                    />
                                </th>
                                <th className={styles.each_column}>
                                    <TextField
                                        outerlassName={styles.textFieldOuterDiv}
                                        className={`${styles.answer_textarea}`}
                                        titleClassName={styles.title_textarea}
                                        rows="1"
                                        cols="10"
                                        title={''}
                                        value={tableAnswers[outerKey] ? tableAnswers[outerKey]['Comm'] : ''}
                                        onChange={(event)=>changeTableAnwser(outerKey, 'Comm', event.target.value)}
                                        placeholder={``}
                                        questionError={false}
                                        errorWarningText={''}
                                    />
                                </th>
                            </tr>
                        ))
                    }
                </table>


                
                <div className={styles.flex}>
                    <div className={styles.twoBtns}><Button word={language === 'English' ? 'Download Template' : 'Télécharger gabarit'} onClick={downloadCSV} controverse position={'left'} /></div>
                    <div className={styles.twoBtns}><Button word={language === 'English' ? 'NEXT' : 'Suivant'} onClick={next} position={'right'} /></div>
                </div>
                

                </div>
            </div>
        </div>
    );

}

export default Session3Worksheet1Q4;