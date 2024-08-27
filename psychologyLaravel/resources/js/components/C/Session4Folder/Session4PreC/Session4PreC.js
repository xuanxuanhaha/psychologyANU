import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './session4prec.module.css';
import Navbar from '../../../Navbar/Navbar';
import { useSelector } from 'react-redux';
import lockericon from './../../../../assets/assessment/oclock.jpg';
import Slider from '@mui/material/Slider';
import Button from '../../../ReusableComponents/Button/Button';
import ProgressBar from '../../../ReusableComponents/ProgressBar/ProgressBar';
import Typography from '../../../ReusableComponents/Typography/Typography';
import BorderContent from '../../../ReusableComponents/BorderContent/BorderContent';
import Scale from '../../../ReusableComponents/Scale/Scale';
import Helppop from '../../../ReusableComponents/Helppop/Helppop';

const Session4PreC = () => {
  const navigate = useNavigate();
  const userData = useSelector(state => state.auth.user);
  const language = userData.language
  const [sessionId, setSessionId] = useState(0);
  const [value1_1, setValue1_1] = useState(0);
  const [value2_1, setValue2_1] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const screenHeight = window.innerHeight;
    document.getElementById('background_image').style.minHeight = `${screenHeight - 100}px`;

    if(userData){
        axios.get(`/api/sessionresponse/4?userid=${userData.userid}&&questionno=session4prec`)
          .then(response => {
            if(response.data){
              if(response.data.sessionresponse.response){
                const questionanswer = JSON.parse(response.data.sessionresponse.response)
                setValue1_1(questionanswer.q1)
                setValue2_1(questionanswer.q2)
              }
            }
          })
          .catch(error => {
            // Handle any errors
            console.error(error);
          });
    }
  }, []);

  const jumptonextpage = () => {
    navigate(`/session4worksheet1c`);
  };

  const next = () => {
    passData();
  };

  const passData = () => {
    console.log('uncaught pass data sessionresponse', value1_1,value2_1)
    const data = {
      'userid': userData.userid,
      'sessionid': 4,
      'questionno': 'session4prec',
      'response': {'q1': value1_1, 'q2': value2_1}
    }
    axios.post(`/api/sessionresponse`, data)
    .then(response => {
      jumptonextpage()
    })
    .catch(error => {
      // Handle any errors
      console.error(error);
    });
    // Todo: pass data to a service or state management system
    // const passDataDic = {
    //   questionNo: 'V3Worksheet1',
    //   sliderValue1_1: value1_1,
    //   sliderValue2_1: value2_1,
    // };
    // Implement your logic to update state or send data to a service
  };


  return (
    <div>
       <Navbar />
      <div className={styles.background_image} id="background_image">
        
        <div className={styles.whole_border}>
          <Typography title={'subtitle'} position={'left'}>
               
            {
              language === 'English' ?
              'Fourth Session'
              :
              'Première session'
            }
          </Typography>

          <ProgressBar percentageNo={50} language={language} />
          <BorderContent>
            {
              language === 'English' ?
                  "The following questions will check whether you worry about academic performance. Pleaserate the degree to which you have experienced each of the following in the PAST WEEK:"
                :
                  'Des études démontrent que 25 à 40% des personnes étudiantes vivent de l’inquiétude par rapport à leur performance et leur compétence académique. Nous appelons ce souci l’inquiétude scolaire. Les questions suivantes vérifieront ton inquiétude par rapport à la performance académique. Évalue le degré auquel tu as vécu les aspects suivants au courant de la SEMAINE DERNIÉRE:'
            }
          </BorderContent>

          <br />
          <br />

          <div className={styles.scaleDiv}>
            <div className={styles.left}>
              <Helppop
                label={
                  language === 'English' ?
                  'Distress about academic worry.'
                  :
                  'Détresse liée à l’inquiétude scolaire.'
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
                    0: aucun
                    <br />
                    1: léger
                    <br />
                    2: modéré
                    <br />
                    3: sévère
                    <br />
                    4: extrême
                  </p>
                } />
            </div>
            <div className={styles.right}>
              <Scale
                slidervalue={value1_1}
                step={1}
                marks={[{value: 0, label: 0}, {value: 4, label: 4}]}
                min={0}
                max={4}
                onChange={(value) => setValue1_1(value)} 
              />
            </div>
          </div>

          <div className={styles.scaleDiv}>
            <div className={styles.left}>
              <Helppop
                label={
                  language === 'English' ?
                  'Life disruption/interference caused by worrying about school.'
                  :
                  'Perturbation/interférence dans la vie quotidienne à cause de l’inquiétude scolaire.'
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
                    0: aucun
                    <br />
                    1: léger
                    <br />
                    2: modéré
                    <br />
                    3: sévère
                    <br />
                    4: extrême
                  </p>
                }
                />
            </div>
            <div className={styles.right}>
              <Scale
                slidervalue={value2_1}
                step={1}
                marks={[{value: 0, label: 0}, {value: 4, label: 4}]}
                min={0}
                max={4}
                onChange={(value) => setValue2_1(value)} 
              />
            </div>
          </div>
          
          <Button word={language === 'English' ? 'NEXT' : 'Suivant'} onClick={next} position={'right'} />
        </div>
      </div>
    </div>
  );
};

export default Session4PreC;