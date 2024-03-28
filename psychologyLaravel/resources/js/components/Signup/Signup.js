import React, { useState } from 'react';
import styles from './signup.module.css';
import peopleicon from './../../assets/login/people_icon.png';
import emailicon from './../../assets/login/email_icon.png';
import lockericon from './../../assets/login/locker_icon.png';
// import ANUlogo from './../../assets/ANUlogo.jpg';
import montreallogo from './../../assets/montreallogo.jpg'

import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const [isStudent, setIsStudent] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userConfirmPassword, setUserConfirmPassword] = useState('');
  const [isStudentError, setIsStudentError] = useState(false);
  const [emailUsedError, setEmailUsedError] = useState(false);
  const [userEmailError, setUserEmailError] = useState(false);
  const [userPasswordError, setUserPasswordError] = useState(false);
  const [userConfirmPasswordError, setUserConfirmPasswordError] = useState(false);
  const [confirmPasswordErrorWording, setConfirmPasswordErrorWording] = useState('Invalid password');
  const [confirmSend, setConfirmSend] = useState('');

  const goToLogIn = () => {
    navigate('/login');
  };

  const signUpClick = async () => {
    await signUpCheck();
    console.log('uncaught is student', isStudent)
    if (isStudentError || emailUsedError || userEmailError || userPasswordError || userConfirmPasswordError) {
      console.log('go back to feel');
      return;
    } else if (isStudent && userEmail!== '' && userPassword !== '' && userConfirmPassword === userPassword){
      console.log('ready to sign up', {
        isStudent,
        userEmail,
        userPassword,
        userConfirmPassword
      });
      submitSignUp();
    }else {
      return;
    }
  };

  const signUpCheck = () => {
    isStudentValidJudge();
    userEmailValidJudge();
    userPasswordValidJudge();
    userConfirmPasswordJudge();
  };

  const submitSignUp = async () => {
    const data = {
      isstudent: isStudent,
      password: userPassword,
      email: userEmail,
      confirmpassword: userConfirmPassword
    };
    setConfirmSend('');

    try {
      setConfirmSend('Sending email');

      const response = await axios.post('/api/users', data);
      console.log('uncaught hi ', response);
      if (response.data.error) {
        setEmailUsedError(true);
        setConfirmSend('');
      } else {
        setConfirmSend('Your email has been sent');
      }
    } catch (error) {
      console.error(error);
      setConfirmSend('Email send error');
    }
  };

  const isStudentValidJudge = () => {
    if (isStudent) {
      setIsStudentError(false);
    } else {
      setIsStudentError(true);
    }
  };

  const userEmailValidJudge = () => {
    const emailRegex = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRegex.test(userEmail)) {
      setUserEmailError(false);
    } else {
      setUserEmailError(true);
    }
  };

  const userPasswordValidJudge = () => {
    if (userPassword && userPassword.length > 3) {
      setUserPasswordError(false);
    } else {
      setUserPasswordError(true);
    }
  };

  const userConfirmPasswordJudge = () => {
    if (!userConfirmPassword) {
      setConfirmPasswordErrorWording('Invalid password');
      setUserConfirmPasswordError(true);
    } else if (userConfirmPassword !== userPassword) {
      setUserConfirmPasswordError(true);
      setConfirmPasswordErrorWording('Please input the same password');
    } else {
      setUserConfirmPasswordError(false);
    }
  };

  return (
    <div className={styles.background_image}>
      <div className={styles.whole_border}>
        <div className={styles.block}></div>
        <div className={styles.img_background}>
          <div className={styles.img_container}>
            <img src={montreallogo} style={{ width: '200px' }} alt="image here" />
          </div>
        </div>

        <div className={styles.p1_container}>
          <div className={styles.p1_word_style}>
            {/* Learning to Thrive: An Online Intervention Program for Mental Health and Well-being */}
            Apprendre à s'épanouir : un programme d’intervention en ligne pour la santé mentale et le bien-être.
          </div>
        </div>

        <div className={styles.sign_log_box}>
          <div className={styles.grid_container_sign_log_btn}>
            <div className={styles.choosed_btn_div} >
              {/* Sign up */}
              créer un compte
            </div>
            <button className={styles.not_choosed_btn_div} onClick={goToLogIn}>
              {/* Log in */}
              se connecter
            </button>
          </div>

          <div className={styles.input_boxes}>
            <div className={styles.eachBlock}>
              <Grid container>
                <Grid item className={styles.icons_left}>
                  <img src={emailicon} className={styles.icon_class} alt="icon" />
                </Grid>
                <Grid item className={styles.inputs_right}>
                  <input
                    type="email"
                    // placeholder="Email"
                    placeholder="courriel"
                    className={styles.input_class}
                    style={{ border: '2px solid lightgrey' }}
                    value={userEmail}
                    onChange={(e) => {
                      setUserEmail(e.target.value);
                      setUserEmailError(false);
                      setEmailUsedError(false);
                    }}
                  />
                </Grid>
              </Grid>

              <div className={styles.inputError} hidden={!userEmailError}>
                Invalid User Email
              </div>
              <div className={styles.inputError} hidden={!emailUsedError}>
                Email Used
              </div>
            </div>

            <div className={styles.eachBlock}>
              <Grid container>
                <Grid item className={styles.icons_left}>
                  <img src={lockericon} className={styles.icon_class} alt="icon" />
                </Grid>
                <Grid item className={styles.inputs_right}>
                  <input
                    type="password"
                    placeholder="Password"
                    className={styles.input_class}
                    value={userPassword}
                    style={{ border: '2px solid lightgrey' }}
                    onChange={(e) => {
                      setUserPassword(e.target.value);
                      setUserPasswordError(false);
                    }}
                  />
                </Grid>
              </Grid>
              <div className={styles.inputError} hidden={!userPasswordError}>
                Invalid password
                <br />
                <br />
                <p>Password must contain minimum 4 characters with at least one uppercase letter</p>
              </div>
            </div>

            <div className={styles.eachBlock}>
              <Grid container>
                <Grid item className={styles.icons_left}>
                  <img src={lockericon} className={styles.icon_class} alt="icon" />
                </Grid>
                <Grid item className={styles.inputs_right}>
                  <input
                    type="password"
                    placeholder="Confirm password"
                    className={styles.input_class}
                    value={userConfirmPassword}
                    style={{ border: '2px solid lightgrey' }}
                    onChange={(e) => {
                      setUserConfirmPassword(e.target.value);
                      setUserConfirmPasswordError(false);
                    }}
                  />
                </Grid>
              </Grid>
              <div className={styles.inputError} hidden={!userConfirmPasswordError}>
                {confirmPasswordErrorWording}
              </div>
            </div>

            <div className={`${styles.isstudent_box} ${styles.input_boxes_row}`}>
              <Grid container className={styles.onlyStudentBox}>
                <input
                  type="checkbox"
                  style={{ cursor: 'pointer' }}
                  onChange={() => {
                    setIsStudent(!isStudent);
                    setIsStudentError(false);
                  }}
                  checked={isStudent}
                />
                {/* <Typography className={styles.onlyStudentWording}>&nbsp;&nbsp;I am student</Typography> */}
                <Typography className={styles.onlyStudentWording}>&nbsp;&nbsp;Je suis un.e étudiant.e</Typography>

              </Grid>
            </div>
            <div className={styles.inputError} hidden={!isStudentError}>
              Only students can involve in this survey
            </div>

            <div className={styles.input_boxes_row}>
              <button className={`${styles.btn} ${styles.sign_up_btn}`} onClick={signUpClick}>
                {/* Sign up */}
                S’inscrire
              </button>
            </div>
            <div className={styles.confirmSend} hidden={confirmSend === ''}>
              {confirmSend}
            </div>
          </div>

          <div className={styles.already_word}>
            <p>
              {/* Already have an account? */}
              Tu es déjà inscrit?
              <button className={styles.login} onClick={goToLogIn}>
                <b>
                  {/* Log in */}
                  Se connecter
                  </b>
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
