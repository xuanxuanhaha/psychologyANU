import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './home.module.css'; // Assuming the CSS file is named home.module.css
import ANUlogo from './../../assets/ANUlogo.jpg';
import ReactDOM from "react-dom";
const Home = () => {
  const navigate = useNavigate();

  const goToSignUp = () => {
    navigate('/signup');
  };

  const goToLogIn = () => {
    navigate('/login');
  };

  return (
    <div className={styles.background}>
      <div className={styles.whole_border}>
        <div className={styles.block}></div>

        <div className={styles.img_background}>
          <div className={styles.img_container}>
            <img src={ANUlogo} style={{ width: '300px' }} alt="image here" />
          </div>
        </div>

        <div className={styles.p1_container}>
          <div className={styles.p1_word_style}>COPING WITH ACADEMIC WORRY</div>
        </div>

        <div className={styles.p2_container}>
          <div className={styles.p2_word_style}>Welcome!</div>
        </div>

        <div className={styles.button_container}>
          <div className={styles.login_btn_div}>
            <button className={`${styles.btn} ${styles.login_button}`} onClick={goToLogIn}>
              Log in
            </button>
          </div>

          <span className={`${styles.or_word} ${styles.p1_word_style}`}>or</span>

          <div>
            <button className={`${styles.btn} ${styles.sign_button}`} onClick={goToSignUp}>
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

if (document.getElementById('root')) {
  ReactDOM.render(<Home/>, document.getElementById('root'));
}