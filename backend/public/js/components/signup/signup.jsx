import React from 'react';
import styles from './signup.module.css';
import peopleicon from './../../assets/login/people_icon.png';
import emailicon from './../../assets/login/email_icon.png';
import lockericon from './../../assets/login/locker_icon.png';
import ANUlogo from './../../assets/ANUlogo.jpg';
import axios from 'axios';

class SignUpComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isStudent: false,
      userEmail: '',
      userPassword: '',
      userConfirmPassword: '',
      isStudentError: false,
      emailUsedError: false,
      userEmailError: false,
      userPasswordError: false,
      userConfirmPasswordError: false,
      confirmPasswordErrorWording: 'Invalid password'
    };

    this.signUpClick = this.signUpClick.bind(this)
    this.signUpCheck = this.signUpCheck.bind(this)
    this.submitSignUp = this.submitSignUp.bind(this)
    this.isStudentValidJudge = this.isStudentValidJudge.bind(this)
    this.userEmailValidJudge = this.userEmailValidJudge.bind(this)
    this.userPasswordValidJudge = this.userPasswordValidJudge.bind(this)
    this.userConfirmPasswordJudge = this.userConfirmPasswordJudge.bind(this)

  }

  goToLogIn () {
    this.props.history.push('/login');
  };

  goToSignUp () {
    this.props.history.push('/signup');
  };

  async signUpClick () {
    await this.signUpCheck()
    if (this.state.isStudentError || this.state.emailUsedError || this.state.userEmailError || this.state.userPasswordError || this.state.userConfirmPasswordError) {
      console.log('go bacl to feel')
      return
    } else {
      console.log('ready to sign up', this.state);
      this.submitSignUp()
    }
  };

  signUpCheck () {
    this.isStudentValidJudge();
    this.userEmailValidJudge();
    this.userPasswordValidJudge();
    this.userConfirmPasswordJudge();
  };

  submitSignUp = async () => {
    const data = {
      isstudent: this.state.isStudent,
      password: this.state.userPassword,
      email: this.state.userEmail,
      confirmpassword: this.state.userConfirmPassword
    }
    try {
      const response = await axios.post('/api/users', data);
      console.log('uncaugt hi ', response)
      if(response.data.error){
        this.setState({emailUsedError: true})
      }else{
        console.log('uncaugt hi finish register')

      }
    } catch (error) {
      console.error(error);
    }
  };


  isStudentValidJudge () {
    if (this.state.isStudent) {
        this.setState({ isStudentError: false });
    }else {
        this.setState({ isStudentError: true });
    }
  }

  userEmailValidJudge () {
    const emailRegex = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRegex.test(this.state.userEmail)) {
      this.setState({ userEmailError: false });
    } else {
      this.setState({ userEmailError: true });
    }
  };

  userPasswordValidJudge () {
    if (this.state.userPassword && this.state.userPassword.length > 3) {
      if (!/[a-z]/.test(this.state.userPassword) && /[A-Z]/.test(this.state.userPassword)) {
        this.setState({ userPasswordError: false });
      } else {
        this.setState({ userPasswordError: true });
      }
    } else {
      this.setState({ userPasswordError: true });
    }
  };

  userConfirmPasswordJudge () {
    if (!this.state.userConfirmPassword) {
      this.setState({ confirmPasswordErrorWording: 'Invalid password', userConfirmPasswordError: true });
    } else if (this.state.userConfirmPassword !== this.state.userPassword) {
      this.setState({ userConfirmPasswordError: true, confirmPasswordErrorWording: 'Please input the same password' });
    } else {
      this.setState({ userConfirmPasswordError: false });
    }
  };

  render() {
    return (
      <div className={styles.background_image}>
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
            </div>
          </div>

          <div className={styles.sign_log_box}>
            <div className={styles.grid_container_sign_log_btn}>
              <div className={styles.choosed_btn_div} onClick={this.goToSignUp}>
                Sign up
              </div>
              <div className={styles.not_choosed_btn_div} onClick={this.goToLogIn}>
                Log in
              </div>
            </div>

            <div className={styles.input_boxes}>
              <div className={`${styles.grid_container_icon_input} ${styles.input_boxes_row}`}>
                <div className={styles.icons_left}>
                    <img src={emailicon}  className={styles.icon_class} alt="icon" />
                </div>
                <div className={styles.inputs_right}>
                  <input
                    type="email"
                    placeholder="Email"
                    className={styles.input_class}
                    value={this.state.userEmail}
                    onChange={(e) => this.setState({ userEmail: e.target.value, userEmailError: false, emailUsedError: false })}
                  />
                </div>
              </div>
              <div className={styles.inputError} hidden={!this.state.userEmailError}>
                Invalid User Email
              </div>
              <div className={styles.inputError} hidden={!this.state.emailUsedError}>
                Email Used
              </div>

              <div className={`${styles.grid_container_icon_input} ${styles.input_boxes_row}`}>
                <div className={styles.icons_left}>
                    <img src={lockericon}  className={styles.icon_class} alt="icon" />
                </div>
                <div className={styles.inputs_right}>
                  <input
                    type="password"
                    placeholder="Password"
                    className={styles.input_class}
                    value={this.state.userPassword}
                    onChange={(e) => this.setState({ userPassword: e.target.value, userPasswordError: false })}
                  />
                </div>
              </div>
              <div className={styles.inputError} hidden={!this.state.userPasswordError}>
                Invalid password
                <br />
                <br />
                <p>Password must contain minimum 4 characters with at least one uppercase letter</p>
              </div>

              <div className={`${styles.grid_container_icon_input} ${styles.input_boxes_row}`}>
                <div className={styles.icons_left}>
                    <img src={lockericon}  className={styles.icon_class} alt="icon" />
                </div>
                <div className={styles.inputs_right}>
                  <input
                    type="password"
                    placeholder="Confirm password"
                    className={styles.input_class}
                    value={this.state.userConfirmPassword}
                    onChange={(e) => this.setState({ userConfirmPassword: e.target.value, userConfirmPasswordError: false })}
                  />
                </div>
              </div>
              <div className={styles.inputError} hidden={!this.state.userConfirmPasswordError}>
                {this.state.confirmPasswordErrorWording}
              </div>


              <div className={`${styles.isstudent_box} ${styles.input_boxes_row}`}>
                <div >
                <label>
                  <input
                    type="checkbox"
                    
                    onChange={(e) => this.setState({ isStudent: !this.state.isStudent, isStudentError: false })}
                    checked={this.state.isStudent}
                  />
                  &nbsp;&nbsp;I am student
                  </label>
                  
                </div>
              </div>
              <div className={styles.inputError} hidden={!this.state.isStudentError}>
                Only students can involve in this survey
              </div>

              <div className={styles.input_boxes_row}>
                <button className={`${styles.btn} ${styles.sign_up_btn}`} onClick={this.signUpClick}>
                  Sign up
                </button>
              </div>
            </div>

            <div className={styles.already_word}>
              <p>
                Already have an account? 
                <button className={styles.login} onClick={this.goToLogIn}>
                    <b>Log in</b>
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUpComponent;
