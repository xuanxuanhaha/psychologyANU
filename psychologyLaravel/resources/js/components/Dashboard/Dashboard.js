import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './dashboard.module.css';
import Navbar from '../Navbar/Navbar';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const navigate = useNavigate();
  const userData = useSelector(state => state.auth.user);
  const [sessionId, setSessionId] = useState(null);
  const [disableNextSessionBtn, setDisableNextSessionBtn] = useState(1);
  // const language = userData.language
  const [language, setLanguage] = useState('French')

  const [userGroup, setUserGroup] = useState(0)


  useEffect(() => {
    window.scrollTo(0, 0);
    const screenHeight = window.innerHeight;
    document.getElementById('background_image').style.minHeight = `${screenHeight - 100}px`;

    if(userData){
      getUserSessionInfo
      setUserGroup(userData.group)
    }
  }, []);

  useEffect(() => {
    if(userData && sessionId === null){
      getUserSessionInfo()
      setLanguage(userData.language)
      setUserGroup(userData.group)
    }
  }, [userData]);

  const getUserSessionInfo = () => {
    axios.get(`/api/sessions/user/${userData.userid}`)
    .then(response => {
      const data = response.data;
      if(data){
        setSessionId(data.nextsessionId || 0)
        setDisableNextSessionBtn(data.disableNextSessionBtn === false ? 0 : 1)
      }
    })
    .catch(error => {
      // Handle any errors
      console.error(error);
    });

  const userInfo = { session_completed: 0 }; // Sample user info for testing

  if (userInfo.hasOwnProperty('session_completed')) {
    const nextSession = Number(userInfo['session_completed']) + 1;
    const button = document.querySelector(`#session${nextSession}`);
    if (button) {
      button.classList.remove('question_wording_disabled');
      button.disabled = false;
    }
  }
  }

  const goToSession = (sessionNumber) => {
    console.log('1 uncaught')
    if(userGroup === 1) { // BASCSI
      navigate(`/session${sessionNumber}`);
    } else if(userGroup === 2) { // BASC
      navigate(`/session${sessionNumber}B`);
    }
    else{
      navigate(`/session${sessionNumber}C`);
    }

  };

  console.log('uncaught sessionid', sessionId)

  return (
    <div>
       <Navbar />
      <div className={styles.background_image} id="background_image">
        <div className={styles.whole_border}>
          <div className={styles.question_content}>
            <br />
            <br />
            <button disabled={sessionId !== 1} id="session1" className={`${styles.question_wording} ${sessionId !== 1 && styles.question_wording_disabled}`} onClick={() => goToSession(1)}>
              {
                language === 'English' ? "Session 1" : 'Séance 1'
              }
            </button>

            <button disabled={sessionId !== 2} id="session2" className={`${styles.question_wording} ${sessionId !== 2 && styles.question_wording_disabled}`} onClick={() => goToSession(2)}>
              {
                language === 'English' ? "Session 2" : 'Séance 2'
              }
            </button>

            <button disabled={sessionId !== 3 || disableNextSessionBtn} id="session3" className={`${styles.question_wording} ${(sessionId !== 3 || disableNextSessionBtn) && styles.question_wording_disabled}`} onClick={() => goToSession(3)}>
              {
                language === 'English' ? "Session 3" : 'Séance 3'
              }
            </button>

            <button disabled={sessionId !== 4 || disableNextSessionBtn} id="session4" className={`${styles.question_wording} ${(sessionId !== 4 || disableNextSessionBtn) && styles.question_wording_disabled}`} onClick={() => goToSession(4)}>
              {
                language === 'English' ? "Session 4" : 'Séance 4'
              }
            </button>

            <button disabled={sessionId !== 5 || disableNextSessionBtn} id="session4" className={`${styles.question_wording} ${(sessionId !== 5 || disableNextSessionBtn) && styles.question_wording_disabled}`} onClick={() => goToSession(5)}>
              {
                language === 'English' ? "Session 5" : 'Séance 5'
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;