import React, { useEffect, useState } from 'react';
import styles from './navbar.module.css';
import anulogo from './../../assets/ANUlogo.jpg';
// import montreallogo from './../../assets/montreallogo.jpg'

import peopleicon from './../../assets/assessment/person.png';
// import peopleicon from './../../assets/assessment/personicon.png';

import { useSelector } from 'react-redux';

const Navbar = () => {
  const [username, setUsername] = useState('');
  const userData = useSelector(state => state.auth.user);

  useEffect(() => {
    // Simulating the behavior of getUserInfo() from your Angular code
    const userInfo = { username: '' }; // Sample user info for testing
    setUsername(userInfo.username);
  }, []);

  return (
    <div className={styles.navbarSection}>
      <div className={styles.background}>
        <div className={styles.assessment_row_1_background}>
          <div className={styles.assessment_row_1_container} id="assessment_row_1_container_id" style={{ height: '100px' }}>
            <div className={styles.logo_container}>
              <img src={anulogo} className={styles.anu_logo} alt="ANU Logo" />
            </div>
            <div className={styles.container_icon_word}>
              <div className={styles.Tina_left}>
                Hello
                {/* Bonjour */}
                , {userData ? userData.username : username}!
              </div>
              <div className={styles.icons_right}>
                <img src={peopleicon} className={styles.icon_logo} alt="Person Icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
