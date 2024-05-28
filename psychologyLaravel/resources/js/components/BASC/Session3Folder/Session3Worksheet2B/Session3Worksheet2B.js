import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './session3worksheet2b.module.css';
import Navbar from '../../../Navbar/Navbar';
import { useSelector } from 'react-redux';
import Button from '../../../ReusableComponents/Button/Button';
import IconWordGrid from '../../../ReusableComponents/IconWordGrid/IconWordGrid';
import ProgressBar from '../../../ReusableComponents/ProgressBar/ProgressBar';

import Typography from '../../../ReusableComponents/Typography/Typography';
import lockericon from './../../../../assets/assessment/oclock.jpg';
import HeadphoneSvg from '../../../ReusableComponents/HeadphoneSvg/HeadphoneSvg';
import Modal from 'react-modal';

const Session3Worksheet2B = () => {
  const navigate = useNavigate();
  const userData = useSelector(state => state.auth.user);
  const language = userData.language
  const [questionGoal, setQuestionGoal] = useState('');
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);

  const openDialogWithTemplateRef = () => {
    setIsGoalModalOpen(true);
};

const closeModal = () => {
    setIsGoalModalOpen(false);
};


  useEffect(() => {
    window.scrollTo(0, 0);
    const screenHeight = window.innerHeight;
    document.getElementById('background_image').style.minHeight = `${screenHeight - 100}px`;
    if(userData){
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
    }
  }, []);

  const next = () => {
      passData();
  };

  const passData = () => {
    jumptonextpage()
  };

  const jumptonextpage = () => {
    navigate(`/session3worksheet3b`);
  };

  return (
    <div>
       <Navbar />
      <div className={styles.background_image} id="background_image">
        <div className={styles.whole_border}>
        <Typography title={'subtitle'} position={'left'}>
            {language === 'English' ? 'Third Session' : 'Première session'}
          </Typography>
          <ProgressBar percentageNo={50} language={language} />

            <br />
            
            <Typography title={'content'} position={'left'} color={'primary'} >
              {
                language === 'English' ?
                <p>In Session 3, you will continue to learn how to create an <b>Activity Planner</b> to achieve your goals.  
                From Exercise B-1 and B-2, select ONE 
                <b onClick={openDialogWithTemplateRef}>
                        <u>
                        <i> GOAL </i> 
                        </u>
                    </b>
                 that you are keen to achieve through practicing the activities in Exercise B-2 in the next couple of weeks. Plan your practice schedule through Exercise C. 
                </p>
                :
                <p>Lors de cette séance, nous allons revoir les concepts et les exercices que nous avons appris lors des dernières séances.</p>
              }
            </Typography>
           
            <br />
            
            </div>

            {/* <HeadphoneSvg /> */}

          <Button word={language === 'English' ? 'NEXT' : 'Suivant'} onClick={next} position={'center'} />
          </div>

          <Modal
            isOpen={isGoalModalOpen}
            onRequestClose={closeModal}
            contentLabel="Issue Dialog"
            ariaHideApp={false}
            style={{
            overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Background color of the overlay
            },
            content: {
                width: '300px', // Width of the modal content
                height: '300px',
                margin: 'auto', // Center the modal horizontally
                padding: '20px', // Padding inside the modal content
                borderRadius: '8px', // Rounded corners
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // Box shadow
                backgroundColor: 'white', // Background color of the modal content
            },
            }}
        >
            {questionGoal}
        </Modal>
        </div>
    
  );
};

export default Session3Worksheet2B;