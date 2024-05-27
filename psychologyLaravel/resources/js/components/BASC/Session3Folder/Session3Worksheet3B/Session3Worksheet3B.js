import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './session3worksheet3b.module.css';
import Navbar from '../../../Navbar/Navbar';
import { useSelector } from 'react-redux';
import Button from '../../../ReusableComponents/Button/Button';


import Modal from 'react-modal';
import ProgressBar from '../../../ReusableComponents/ProgressBar/ProgressBar';
import Typography from '../../../ReusableComponents/Typography/Typography';
import BorderContent from '../../../ReusableComponents/BorderContent/BorderContent';
import TextField from '../../../ReusableComponents/TextField/TextField';
import IconWordGrid from '../../../ReusableComponents/IconWordGrid/IconWordGrid';
import * as XLSX from 'xlsx';

const Session3Worksheet3B = () => {
  const navigate = useNavigate();
  const userData = useSelector(state => state.auth.user);
  const language = userData.language

  const [questionA, setQuestionA] = useState('');

  const [questionB, setQuestionB] = useState('');
  const [questionC, setQuestionC] = useState('');

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

  const [tableAnswers, setTableAnswers] = useState(default_value)


  useEffect(() => {
    window.scrollTo(0, 0);
    const screenHeight = window.innerHeight;
    document.getElementById('background_image').style.minHeight = `${screenHeight - 100}px`;

   

    axios.get(`/api/sessionresponse/3?userid=${userData.userid}&&questionno=session3worksheet3b`)
          .then(response => {
            if(response.data){
                if(response.data.sessionresponse.response){
                    const questionanswer = JSON.parse(response.data.sessionresponse.response)
                    setQuestionA(questionanswer.q1)
                    setQuestionB(questionanswer.q2)
                    setQuestionC(questionanswer.q3)
                    setTableAnswers(questionanswer.q4)
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
        'sessionid': 3,
        'questionno': 'session3worksheet3b',
        'response': {'q1': questionA, 'q2': questionB,'q3': questionC,  
         'q4': tableAnswers}
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
    // navigate(`/session2summary`);
        navigate(`/session3worksheet4b`);

  };

  const changeTableAnwser =(outerKey, innerKey, value) => {
    const tableanswers = tableAnswers
    tableanswers[outerKey][innerKey] = value
    setTableAnswers(tableanswers)
    setCount(count + 1)
    console.log('uncaught', tableAnswers)
  }

  const downloadCSV = () => {
    // Create a CSV content string (replace with your own data)
    // const csvContent = "Name,Email\nJohn Doe,johndoe@example.com\nJane Smith,janesmith@example.com";
    const csvHeader = ", Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Comments (How did you feel? What did you notice?)";
    
    
    const csvContent1 = `6h,${tableAnswers[6]['Sat'] || ''},${tableAnswers[6]['Sun'] || ''},${tableAnswers[6]['Mon'] || ''},${tableAnswers[6]['Tue'] || ''},${tableAnswers[6]['Wed'] || ''},${tableAnswers[6]['Thu'] || ''},${tableAnswers[6]['Fri'] || ''},${tableAnswers[6]['Comm'] || ''}`;
    const csvContent2 = `7h,${tableAnswers[7]['Sat'] || ''},${tableAnswers[7]['Sun'] || ''},${tableAnswers[7]['Mon'] || ''},${tableAnswers[7]['Tue'] || ''},${tableAnswers[7]['Wed'] || ''},${tableAnswers[7]['Thu'] || ''},${tableAnswers[7]['Fri'] || ''},${tableAnswers[7]['Comm'] || ''}`;
    const csvContent3 = `8h,${tableAnswers[8]['Sat'] || ''},${tableAnswers[8]['Sun'] || ''},${tableAnswers[8]['Mon'] || ''},${tableAnswers[8]['Tue'] || ''},${tableAnswers[8]['Wed'] || ''},${tableAnswers[8]['Thu'] || ''},${tableAnswers[8]['Fri'] || ''},${tableAnswers[8]['Comm'] || ''}`;
    const csvContent4 = `9h,${tableAnswers[9]['Sat'] || ''},${tableAnswers[9]['Sun'] || ''},${tableAnswers[9]['Mon'] || ''},${tableAnswers[9]['Tue'] || ''},${tableAnswers[9]['Wed'] || ''},${tableAnswers[9]['Thu'] || ''},${tableAnswers[9]['Fri'] || ''},${tableAnswers[9]['Comm'] || ''}`;
    const csvContent5 = `10h,${tableAnswers[10]['Sat'] || ''},${tableAnswers[10]['Sun'] || ''},${tableAnswers[10]['Mon'] || ''},${tableAnswers[10]['Tue'] || ''},${tableAnswers[10]['Wed'] || ''},${tableAnswers[10]['Thu'] || ''},${tableAnswers[10]['Fri'] || ''},${tableAnswers[10]['Comm'] || ''}`;
    const csvContent6 = `11h,${tableAnswers[11]['Sat'] || ''},${tableAnswers[11]['Sun'] || ''},${tableAnswers[11]['Mon'] || ''},${tableAnswers[11]['Tue'] || ''},${tableAnswers[11]['Wed'] || ''},${tableAnswers[11]['Thu'] || ''},${tableAnswers[11]['Fri'] || ''},${tableAnswers[11]['Comm'] || ''}`;
    const csvContent7 = `12h,${tableAnswers[12]['Sat'] || ''},${tableAnswers[12]['Sun'] || ''},${tableAnswers[12]['Mon'] || ''},${tableAnswers[12]['Tue'] || ''},${tableAnswers[12]['Wed'] || ''},${tableAnswers[12]['Thu'] || ''},${tableAnswers[12]['Fri'] || ''},${tableAnswers[12]['Comm'] || ''}`;
    const csvContent8 = `13h,${tableAnswers[13]['Sat'] || ''},${tableAnswers[13]['Sun'] || ''},${tableAnswers[13]['Mon'] || ''},${tableAnswers[13]['Tue'] || ''},${tableAnswers[13]['Wed'] || ''},${tableAnswers[13]['Thu'] || ''},${tableAnswers[13]['Fri'] || ''},${tableAnswers[13]['Comm'] || ''}`;
    const csvContent9 = `14h,${tableAnswers[14]['Sat'] || ''},${tableAnswers[14]['Sun'] || ''},${tableAnswers[14]['Mon'] || ''},${tableAnswers[14]['Tue'] || ''},${tableAnswers[14]['Wed'] || ''},${tableAnswers[14]['Thu'] || ''},${tableAnswers[14]['Fri'] || ''},${tableAnswers[14]['Comm'] || ''}`;
    const csvContent10 = `15h,${tableAnswers[15]['Sat'] || ''},${tableAnswers[15]['Sun'] || ''},${tableAnswers[15]['Mon'] || ''},${tableAnswers[15]['Tue'] || ''},${tableAnswers[15]['Wed'] || ''},${tableAnswers[15]['Thu'] || ''},${tableAnswers[15]['Fri'] || ''},${tableAnswers[15]['Comm'] || ''}`;
    const csvContent11 = `16h,${tableAnswers[16]['Sat'] || ''},${tableAnswers[16]['Sun'] || ''},${tableAnswers[16]['Mon'] || ''},${tableAnswers[16]['Tue'] || ''},${tableAnswers[16]['Wed'] || ''},${tableAnswers[16]['Thu'] || ''},${tableAnswers[16]['Fri'] || ''},${tableAnswers[16]['Comm'] || ''}`;
    const csvContent12 = `17h,${tableAnswers[17]['Sat'] || ''},${tableAnswers[17]['Sun'] || ''},${tableAnswers[17]['Mon'] || ''},${tableAnswers[17]['Tue'] || ''},${tableAnswers[17]['Wed'] || ''},${tableAnswers[17]['Thu'] || ''},${tableAnswers[17]['Fri'] || ''},${tableAnswers[17]['Comm'] || ''}`;
    const csvContent13 = `18h,${tableAnswers[18]['Sat'] || ''},${tableAnswers[18]['Sun'] || ''},${tableAnswers[18]['Mon'] || ''},${tableAnswers[18]['Tue'] || ''},${tableAnswers[18]['Wed'] || ''},${tableAnswers[18]['Thu'] || ''},${tableAnswers[18]['Fri'] || ''},${tableAnswers[18]['Comm'] || ''}`;
    const csvContent14 = `19h,${tableAnswers[19]['Sat'] || ''},${tableAnswers[19]['Sun'] || ''},${tableAnswers[19]['Mon'] || ''},${tableAnswers[19]['Tue'] || ''},${tableAnswers[19]['Wed'] || ''},${tableAnswers[19]['Thu'] || ''},${tableAnswers[19]['Fri'] || ''},${tableAnswers[19]['Comm'] || ''}`;
    const csvContent15 = `20h,${tableAnswers[20]['Sat'] || ''},${tableAnswers[20]['Sun'] || ''},${tableAnswers[20]['Mon'] || ''},${tableAnswers[20]['Tue'] || ''},${tableAnswers[20]['Wed'] || ''},${tableAnswers[20]['Thu'] || ''},${tableAnswers[20]['Fri'] || ''},${tableAnswers[20]['Comm'] || ''}`;
    const csvContent16 = `21h,${tableAnswers[21]['Sat'] || ''},${tableAnswers[21]['Sun'] || ''},${tableAnswers[21]['Mon'] || ''},${tableAnswers[21]['Tue'] || ''},${tableAnswers[21]['Wed'] || ''},${tableAnswers[21]['Thu'] || ''},${tableAnswers[21]['Fri'] || ''},${tableAnswers[21]['Comm'] || ''}`;
    const csvContent17 = `22h,${tableAnswers[22]['Sat'] || ''},${tableAnswers[22]['Sun'] || ''},${tableAnswers[22]['Mon'] || ''},${tableAnswers[22]['Tue'] || ''},${tableAnswers[22]['Wed'] || ''},${tableAnswers[22]['Thu'] || ''},${tableAnswers[22]['Fri'] || ''},${tableAnswers[22]['Comm'] || ''}`;
    const csvContent18 = `23h,${tableAnswers[23]['Sat'] || ''},${tableAnswers[23]['Sun'] || ''},${tableAnswers[23]['Mon'] || ''},${tableAnswers[23]['Tue'] || ''},${tableAnswers[23]['Wed'] || ''},${tableAnswers[23]['Thu'] || ''},${tableAnswers[23]['Fri'] || ''},${tableAnswers[23]['Comm'] || ''}`;

    const csvHeaderF = ",Samedi, Dimanche, Lundi, Mardi, Mercredi, Jeudi, Vendredi, Commentaires (Qu'as-tu ressenti? Qu’as-tu remarqué ?)";

    let csvContent = `${csvHeader}\n${csvContent1}\n${csvContent2}\n${csvContent3}\n${csvContent4}\n${csvContent5}\n${csvContent6}\n${csvContent7}\n${csvContent8}\n${csvContent9}\n${csvContent10}\n${csvContent11}\n${csvContent12}\n${csvContent13}\n${csvContent14}\n${csvContent15}\n${csvContent16}\n${csvContent17}\n${csvContent18}`;
    const csvContentFrench = `${csvHeaderF}\n${csvContent1}\n${csvContent2}\n${csvContent3}\n${csvContent4}\n${csvContent5}\n${csvContent6}\n${csvContent7}\n${csvContent8}\n${csvContent9}\n${csvContent10}\n${csvContent11}\n${csvContent12}\n${csvContent13}\n${csvContent14}\n${csvContent15}\n${csvContent16}\n${csvContent17}\n${csvContent18}`;
    csvContent = language === 'English' ? csvContent : csvContentFrench

    const worksheetData = [];

    // Push headers
    worksheetData.push(csvHeader.split(','));

    // Push content
    worksheetData.push(csvContent1.split(','));
    worksheetData.push(csvContent2.split(','));
    worksheetData.push(csvContent3.split(','));
    worksheetData.push(csvContent4.split(','));
    worksheetData.push(csvContent5.split(','));
    worksheetData.push(csvContent6.split(','));
    worksheetData.push(csvContent7.split(','));
    worksheetData.push(csvContent8.split(','));
    worksheetData.push(csvContent9.split(','));
    worksheetData.push(csvContent10.split(','));
    worksheetData.push(csvContent11.split(','));
    worksheetData.push(csvContent12.split(','));
    worksheetData.push(csvContent13.split(','));
    worksheetData.push(csvContent14.split(','));
    worksheetData.push(csvContent15.split(','));
    worksheetData.push(csvContent16.split(','));
    worksheetData.push(csvContent17.split(','));
    worksheetData.push(csvContent18.split(','));

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
    link.setAttribute('download', 'Session2Worksheet3Q2.xlsx');
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

  return (
    <div>
        {/* Assuming you have a navbar component */}
      <Navbar />
      <div className={styles.background_image} id="background_image">
        <div className={styles.whole_border}>
          <Typography title={'subtitle'} position={'left'}>
            {
              language === 'English' ?
              'Third Session'
              :
              'Deuxième session'
            }
            </Typography>

          <ProgressBar percentageNo={100} language={language} />

          <Typography title={'content'} position={'left'}  contentwidth={'100%'}>
              {
                language === 'English' ?
                'The activity planner provided below is your own personal timetable for the upcoming week. Consider your schedule for the week, and cross out the timeslots that are already occupied.'
                :
                'Le planificateur d’activités ci-dessous est ton calendrier personnel pour la prochaine semaine. Réfléchis à ton horaire pour la semaine, et raye les plages d’horaire qui sont déjà occupées.'
              }
          </Typography>
          <br />
          <Typography title={'content'} position={'left'}  contentwidth={'100%'}>
            <i>
              {
                language === 'English' ?
                'E.g. If you have class from 9am to 10am on Monday, cross out the Monday 9am slot on the timetable.'
                :
                'P. ex. Si tu as un cours de 8h30 à 11h30 le lundi, raye ces cases-là sur le calendrier.'
              }
            </i>
          </Typography>
          {
            language === 'English' ?
            <div>
                <div className={styles.row}>
                    <div className={`${styles.small_div} ${styles.borderTrans}`}></div>
                    <div className={`${styles.small_div_purple} ${styles.borderGTTG}`} >Sunday</div>
                    <div className={`${styles.small_div} ${styles.borderGTTG}`} >Monday</div>
                    <div className={`${styles.small_div_purple} ${styles.borderGTTG}`} >Tuesday</div>
                    <div className={`${styles.small_div} ${styles.borderGTTG}`} >Wednesday</div>
                    <div className={`${styles.small_div_purple} ${styles.borderGTTG}`} >Thursday</div>
                    <div className={`${styles.small_div} ${styles.borderGTTG}`} >Friday</div>
                    <div className={`${styles.small_div_purple} ${styles.borderGGTG}`}>Saturday</div>
                </div>
                <div className={styles.row}>
                    <div className={`${styles.small_div} ${styles.borderGTGG}`} >Example 9am</div>
                    <div className={`${styles.small_div_purple} ${styles.borderGTGG}`} ></div>
                    <div className={`${styles.small_div} ${styles.borderGTGG}`} ></div>
                    <div className={`${styles.small_div_purple} ${styles.borderGTGG}`} ></div>
                    <div className={`${styles.small_div} ${styles.borderGTGG}`} ></div>
                    <div className={`${styles.small_div_purple} ${styles.borderGTGG}`} ></div>
                    <div className={`${styles.small_div} ${styles.borderGTGG}`} ></div>
                    <div className={`${styles.small_div_purple}`}></div>
                </div>
            </div>
            :
            <div>
                <div className={styles.row}>
                    <div className={`${styles.small_div} ${styles.borderTrans}`}></div>
                    <div className={`${styles.small_div_purple} ${styles.borderGTTG}`} >Samedi</div>
                    <div className={`${styles.small_div} ${styles.borderGTTG}`} >Dimanche</div>
                    <div className={`${styles.small_div_purple} ${styles.borderGTTG}`} >Lundi</div>
                    <div className={`${styles.small_div} ${styles.borderGTTG}`} >Mardi</div>
                    <div className={`${styles.small_div_purple} ${styles.borderGTTG}`} >Mercredi</div>
                    <div className={`${styles.small_div} ${styles.borderGTTG}`} >Jeudi</div>
                    <div className={`${styles.small_div_purple} ${styles.borderGGTG}`}>Vendredi</div>
                </div>
                <div className={styles.row}>
                    <div className={`${styles.small_div} ${styles.borderGTGG}`} >Exemple 18h</div>
                    <div className={`${styles.small_div_purple} ${styles.borderGTGG}`} ></div>
                    <div className={`${styles.small_div} ${styles.borderGTGG}`} ></div>
                    <div className={`${styles.small_div_purple} ${styles.borderGTGG}`} ></div>
                    <div className={`${styles.small_div} ${styles.borderGTGG}`} ></div>
                    <div className={`${styles.small_div_purple} ${styles.borderGTGG}`} ></div>
                    <div className={`${styles.small_div} ${styles.borderGTGG}`} ></div>
                    <div className={`${styles.small_div_purple}`}></div>
                </div>
            </div>
          }
          
          <br />

          <Typography title={'content'} position={'left'} contentwidth={'100%'} >
              {
                language === 'English' ?
                <p>The remaining timeslots indicate your free time. Consider the activities that you planned in Exercise 3, and select <b>up to TWO</b> activities that you are most confident in accomplishing,
                 taking into account the group resources that you can use. You may select just one activity if you do not have two activities. Make sure you select activities that you are definitely able to accomplish with the help of your group resources.</p>
                :
                <p>Les cases vides indiquent ton temps libre. Observe les activités que tu avais planifiées dans l’exercice 3 et choisis <b>jusqu’à DEUX</b> activités que tu es le plus certain.e de pouvoir accomplir tout en prenant compte des ressources du groupe que tu anticipes utiliser. Tu peux choisir juste une activité si tu n’as pas deux activités. Assure-toi de choisir des activités que tu es absolument capable d’accomplir avec l’aide des ressources du groupe choisi.</p>
                }
          </Typography>
          <br />
          <Typography title={'content'} position={'left'}  contentwidth={'100%'}>
              {
                language === 'English' ?
                'Write the selected activities in the space provided on the planner; do this for each selected activity '
                :
                'Écris les activités choisies dans l’espace fourni dans le planificateur.'
              }
          </Typography>
          <br />
          <Typography title={'content'} position={'left'}  contentwidth={'100%'}>
            <i>
              {
                language === 'English' ?
                'E.g., The example activity 1 was to: study lecture notes in the library for 1 hour everyday at 6pm. So every 6pm timeslot would be scheduled with “Activity 1”. '
                :
                'P. ex. L’exemple d’activité 1 était de: étudier les notes de cours dans la bibliothèque pendant 1 heure tous les jours à 18h. Donc, chaque case de 18h sera remplie avec « Activité 1 »'
              }
            </i>
          </Typography>

          {
            language === 'English' ?
            <div>
                <div className={styles.row}>
                    <div className={`${styles.small_div} ${styles.borderTrans}`}></div>
                    <div className={`${styles.small_div_purple} ${styles.borderGTTG}`} >Sunday</div>
                    <div className={`${styles.small_div} ${styles.borderGTTG}`} >Monday</div>
                    <div className={`${styles.small_div_purple} ${styles.borderGTTG}`} >Tuesday</div>
                    <div className={`${styles.small_div} ${styles.borderGTTG}`} >Wednesday</div>
                    <div className={`${styles.small_div_purple} ${styles.borderGTTG}`} >Thursday</div>
                    <div className={`${styles.small_div} ${styles.borderGTTG}`} >Friday</div>
                    <div className={`${styles.small_div_purple} ${styles.borderGGTG}`}>Saturday</div>
                </div>
                <div className={styles.row}>
                    <div className={`${styles.small_div} ${styles.borderGTGG}`} >Example 6pm</div>
                    <div className={`${styles.small_div_purple} ${styles.borderGTGG}`} >Activity 1</div>
                    <div className={`${styles.small_div} ${styles.borderGTGG}`} >Activity 1</div>
                    <div className={`${styles.small_div_purple} ${styles.borderGTGG}`} >Activity 1</div>
                    <div className={`${styles.small_div} ${styles.borderGTGG}`} >Activity 1</div>
                    <div className={`${styles.small_div_purple} ${styles.borderGTGG}`} >Activity 1</div>
                    <div className={`${styles.small_div} ${styles.borderGTGG}`} >Activity 1</div>
                    <div className={`${styles.small_div_purple}`}>Activity 1</div>
                </div>
            </div>
            :
            <div>
                <div className={styles.row}>
                    <div className={`${styles.small_div} ${styles.borderTrans}`}></div>
                    <div className={`${styles.small_div_purple} ${styles.borderGTTG}`} >Samedi</div>
                    <div className={`${styles.small_div} ${styles.borderGTTG}`} >Dimanche</div>
                    <div className={`${styles.small_div_purple} ${styles.borderGTTG}`} >Lundi</div>
                    <div className={`${styles.small_div} ${styles.borderGTTG}`} >Mardi</div>
                    <div className={`${styles.small_div_purple} ${styles.borderGTTG}`} >Mercredi</div>
                    <div className={`${styles.small_div} ${styles.borderGTTG}`} >Jeudi</div>
                    <div className={`${styles.small_div_purple} ${styles.borderGGTG}`}>Vendredi</div>
                </div>
                <div className={styles.row}>
                    <div className={`${styles.small_div} ${styles.borderGTGG}`} >Exemple 18h</div>
                    <div className={`${styles.small_div_purple} ${styles.borderGTGG}`} >Activité 1</div>
                    <div className={`${styles.small_div} ${styles.borderGTGG}`} >Activité 1</div>
                    <div className={`${styles.small_div_purple} ${styles.borderGTGG}`} >Activité 1</div>
                    <div className={`${styles.small_div} ${styles.borderGTGG}`} >Activité 1</div>
                    <div className={`${styles.small_div_purple} ${styles.borderGTGG}`} >Activité 1</div>
                    <div className={`${styles.small_div} ${styles.borderGTGG}`} >Activité 1</div>
                    <div className={`${styles.small_div_purple}`}>Activité 1</div>
                </div>
            </div>
          }


            <TextField 
              rows="1"
              cols="50"
              title={
                language === 'English' ?
                <b>MY GOAL</b>
                :
                <b>MON OBJECTIF</b>
              }
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
                <TextField 
                  rows="1"
                  cols="50"
                  titleClassName={styles.title_activitytextarea}
                  value={questionB}
                  onChange={(e) => {
                    setQuestionB(e.target.value)
                  }}
                  
                  placeholder={''}
                  questionError={''}
                  errorWarningText={''}
                />
            }
            {
                <TextField 
                rows="1"
                cols="50"
                titleClassName={styles.title_activitytextarea}
                value={questionC}
                onChange={(e) => {
                  setQuestionC(e.target.value)
                }}
                
                placeholder={''}
                questionError={''}
                errorWarningText={''}
              />
            }

          <br />
          <br />
          <Typography title={'content'} position={'left'}  contentwidth={'100%'}>
            <u>
              <b>
                {
                  language === 'English' ?
                  'ACTIVITY PLANNER'
                  :
                  'PLANIFICATEUR D’ACTIVITÉS'
                }
              </b>
            </u>
          </Typography>
          <br />
          <Typography title={'content'} position={'left'}  contentwidth={'100%'}>
              {
                language === 'English' ?
                <p>By planning your schedule, you have now completed the first step of conquering avoidance. Over the next week, please practice the activity(ties) as you have scheduled. You can download this <b>Activity Planner</b> and check your practice. <b>Please make sure you have Activity Planner filled out for the next session, as you will fill this information in the program.</b> '</p>
                :
                <p>En planifiant ton horaire, tu as maintenant complété la première étape vers ta conquête de l’évitement. Au cours de la prochaine semaine, pratique les activités que tu as planifiées. Tu peux télécharger le Planificateur d’activités et vérifier ton progrès. <b>Assure-toi que ton Planificateur d’activités est rempli pour la prochaine séance, puisque tu vas remplir cette information dans le programme.</b></p>
              }
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
                    <div className={`${styles.small_div} ${styles.borderGTTG}`} >Dimanche</div>
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
                            placeholder={``}
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
                            placeholder={``}
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
                            placeholder={``}
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
                            placeholder={``}
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
                            placeholder={``}
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
                            placeholder={``}
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
                            placeholder={``}
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
                            placeholder={``}
                            questionError={false}
                            errorWarningText={''}
                          />
                      </div>
                    </div>
                  ))
                }
                
            </div>


            {/* <Button word={'Exercise B-1'} onClick={next} position={'center'} outlook={'round'} /> */}
            <div className={styles.flex}>
                <div className={styles.twoBtns}><Button word={language === 'English' ? 'Download Template' : 'Télécharger gabarit'} onClick={downloadCSV} controverse position={'left'} /></div>
                <div className={styles.twoBtns}><Button word={'NEXT'} onClick={next} position={'right'} /></div>
            </div>
            </div>
            </div>

        </div>
    
  );
};

export default Session3Worksheet3B;