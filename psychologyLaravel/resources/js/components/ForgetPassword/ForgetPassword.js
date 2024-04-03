import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './forgetpassword.module.css';
import ANUlogo from './../../assets/ANUlogo.jpg';
// import montreallogo from './../../assets/montreallogo.jpg'

import emailicon from './../../assets/login/email_icon.png';
import lockericon from './../../assets/login/locker_icon.png';
import { loginSuccess, logout } from './../actions/authActions';
import { useSelector, useDispatch, connect } from 'react-redux';

const ProtectedPage = () => {
    return <h1>Protected Page</h1>;
  };

const ForgetPassword = (props) => {

    const dispatch = useDispatch();

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [inputHasError, setInputHasError] = useState(false);
    const [emailSendMessage, setEmailSendMessage] = useState('');


    const ValidJudge = () => {
      if (username) {
        setInputHasError(false);
      } else {
        setInputHasError(true);
      }
    };
  
    const send = async () => {
      await ValidJudge();
      if(!inputHasError) {
        try {      
            axios.get(`/api/forgetpassword?email=${username}`).then(response => {
                if (response.data.success) {
                    setInputHasError(false);
                    setEmailSendMessage(response.data.message)
                } else {
                    setInputHasError(true);
                }
            });
          } catch (error) {
            console.error(error);
            setInputHasError(true);
          }
      }
    };
  
    const goToForgetPassword = () => {
      console.log('goToForgetPassword');
      navigate('/forgetpassword');
      // axios.get(`/api/forgetpassword`);
      
    };
  
    return (
      <div className={styles.backgroundimage}>
        <div className={styles.whole_border}>
          <div className={styles.block}></div>
          <div className={styles.img_background}>
            <div className={styles.img_container}>
              <img src={ANUlogo} style={{ width: '200px' }} alt="image here" />
            </div>
          </div>
  
          <div className={styles.p1_container}>
            <div className={styles.p1_word_style}>
              Learning to Thrive: An Online Intervention Program for Mental Health and Well-being
              {/* Apprendre à s'épanouir : un programme d’intervention en ligne pour la santé mentale et le bien-être. */}
            </div>
          </div>

          <br />
          <br />
  
          {/* sign up box */}
          <div className={styles.sign_log_box}>
            {/* input boxes */}
            <div className={styles.input_boxes}>
              <br />
              <br />
              <div className={`${styles.grid_container_icon_input} ${styles.input_boxes_row}`}>
                <div className={styles.icons_left}>
                  <img src={emailicon} className={styles.icon_class} alt="icon" />
                </div>
                <div className={styles.inputs_right}>
                  <input
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value)
                        setInputHasError(false)
                    }}
                    type="text"
                    placeholder="Email"
                    // placeholder="courriel"
                    className={styles.input_class}
                  />
                </div>
              </div>
  
  
              {inputHasError && (
                <div>
                  <br />
                  <div className={styles.inputError}>Invalid User ID, Email, or Password</div>
                </div>
              )}

            {emailSendMessage!=='' && (
                <div>
                  <br />
                  <div className={styles.inputError}>{emailSendMessage}</div>
                </div>
              )}
  


  
              <div className={styles.input_boxes_row}>
                <button className={`${styles.btn} ${styles.sign_up_btn}`} onClick={send}>
                  {/* Send */}
                  Envoyer
                </button>
              </div>



            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default connect(null, {loginSuccess})(ForgetPassword);