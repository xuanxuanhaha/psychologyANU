import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';
// import ANUlogo from './../../assets/ANUlogo.jpg';
import montreallogo from './../../assets/montreallogo.jpg'

import emailicon from './../../assets/login/email_icon.png';
import lockericon from './../../assets/login/locker_icon.png';
import { loginSuccess, logout } from './../actions/authActions';
import { useSelector, useDispatch, connect } from 'react-redux';

const ProtectedPage = () => {
    return <h1>Protected Page</h1>;
  };

const Login = (props) => {

    const dispatch = useDispatch();

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [inputHasError, setInputHasError] = useState(false);
    const [timeTooEarly, setTimeTooEarly] = useState(false);
  
    const goToSignUp = () => {
        navigate('/signup');
    };
  
    const goToLogIn = () => {
        navigate('/login');
    };
  
    const ValidJudge = () => {
      if (username && password) {
        setInputHasError(false);
      } else {
        setInputHasError(true);
      }
    };
  
    const submitLogIn = async () => {
      await ValidJudge();
      if(!inputHasError) {
        try {      
            const response = await axios.get(`/api/users?email=${username}&password=${password}`);
            if (response.data.error) {
                setInputHasError(true);

            } else {
                dispatch(loginSuccess());
                localStorage.setItem('isAuthenticated', 'true');
                navigate('/dashboard');
                const userData = { username: username, userid: response.data.user.id, language: response.data.user.language };

                props.loginSuccess(userData);

            }

          } catch (error) {
            console.error(error);
            setInputHasError(true);

          }
      }      
    };
  
    const goToForgetPassword = () => {
      console.log('goToForgetPassword');
      navigate('/forgetpassword');
      
    };
  
    return (
      <div className={styles.backgroundimage}>
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
  
          {/* sign up box */}
          <div className={styles.sign_log_box}>
            {/* button box */}
            <div className={styles.grid_container_sign_log_btn}>
              <div className={styles.not_choosed_btn_div} onClick={goToSignUp}>
                {/* Sign up */}
                créer un compte
              </div>
              <div className={styles.choosed_btn_div} onClick={goToLogIn}>
                {/* Log in */}
                se connecter
              </div>
            </div>
  
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
                    // placeholder="Email"
                    placeholder="courriel"
                    className={styles.input_class}
                  />
                </div>
              </div>
  
              <div className={`${styles.grid_container_icon_input} ${styles.input_boxes_row}`}>
                <div className={styles.icons_left}>
                  <img src={lockericon} className={styles.icon_class} alt="icon" />
                </div>
                <div className={styles.inputs_right}>
                  <input
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                        setInputHasError(false)
                    }}
                    type="password"
                    placeholder="Password"
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
  
              {timeTooEarly && (
                <div>
                  <br />
                  <div className={styles.inputError}>It's too early to start your new session, please come back later</div>
                </div>
              )}
  

            <div className={`${styles.input_boxes_row} ${styles.desktop_tablet_only}`}>
                <div>
                  <div className={styles.grid_container_checkbox_remember}>
                  </div>
                </div>
                <div className={styles.forgot_text}>
                  <i>
                    <a onClick={goToForgetPassword} className={styles.forgot_link} style={{ color: '#0054b4' }}>
                      {/* Forgot your password? */}
                      Mot de passe oublié
                    </a>
                  </i>
                </div>
              </div>
  
              <div className={`${styles.input_boxes_row} ${styles.mobile_only}`}>
                <div>
                  <div className={styles.grid_container_checkbox_remember}>
                    <div className={styles.checkbox_part}>
                      <input
                        id="color-input-red"
                        className={styles.chat_button_location_radio_input}
                        type="checkbox"
                        name="color-input-red"
                        value="#f0544d"
                      />
                      <label htmlFor="color-input-red"></label>
                    </div>
                    <div className={styles.checkbox_word_part}>
                      <p className={styles.remember_me}>Remember me</p>
                    </div>
                  </div>
                </div>
                <div className={styles.forgot_text}>
                  <i>
                    <a onClick={goToForgetPassword} className={styles.forgot_link}>
                      Forgot your password?
                    </a>
                  </i>
                </div>
              </div>
  
              <div className={styles.input_boxes_row}>
                <button className={`${styles.btn} ${styles.sign_up_btn}`} onClick={submitLogIn}>
                  {/* Log in */}
                  Se connecter
                </button>
              </div>



            </div>
  
            {/* Already have an account */}
            <div className={styles.already_word}>
              <p>
                {/* Don't have an account?  */}
                Vous n’avez pas de compte ?
                <button className={styles.login} onClick={goToSignUp}>
                <b>
                  {/* Sign Up */}
                  S’inscrire
                  </b>
              </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default connect(null, {loginSuccess})(Login);