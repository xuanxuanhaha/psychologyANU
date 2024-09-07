import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './datagenerate.module.css';
import Navbar from '../Navbar/Navbar';
import { useSelector } from 'react-redux';
import Typography from '../ReusableComponents/Typography/Typography';

const DataGenerate = () => {
  const navigate = useNavigate();
  const userData = useSelector(state => state.auth.user);
  const language = userData.language
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const [data, setData] = useState(null)

  const [filterUserEmail, setFilterUserEmail] = useState('')
  const [filterSessionId, setFilterSessionId] = useState('')
  const [filterQuestionNo, setFilterQuestionNo] = useState('')
  const [filterQuestionAnswer, setFilterQuestionAnswer] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0);
    const screenHeight = window.innerHeight;
    document.getElementById('background_image').style.minHeight = `${screenHeight - 100}px`;

    startDataGenerate()
  }, []);

  const gotodashboard = () => {
    navigate(`/dashboard`);
  };
  
  const startDataGenerate = () => {
    if(userData){
        console.log('data generate uncaught')

        axios.get(`/api/datagenerate?password=${password}&&username=${userData.username}&&filterUserEmail=${filterUserEmail}&&filterSessionId=${filterSessionId}&&filterQuestionNo=${filterQuestionNo}&filterQuestionAnswer=${filterQuestionAnswer}`).then(response => {
            if(response.data){
              if(response.data.success){
                console.log('uncaught', response.data.existResponse)
                setData(response.data.existResponse)
              }else{
                setError(response.data.error)
              }
            }
          })
          .catch(error => {
            // Handle any errors
            console.error(error);
            setError('Please contact admin')
          });
    }
  }

  const downloadCSV = () => {
    // Create a CSV content string (replace with your own data)
    // const csvContent = "Name,Email\nJohn Doe,johndoe@example.com\nJane Smith,janesmith@example.com";
    const csvHeader = "email, sessionid, question, response";
    let csvContent = csvHeader

    data.map((answer) => {
        const answerToString = `"${answer.useremail.replace(/"/g, '""')}","${answer.sessionid}","${answer.questionno.replace(/"/g, '""')}","${answer.response.replace(/"/g, '""')}"`;
        csvContent = `${csvContent}\n${answerToString}`;
      });


    // Create a Blob object containing the CSV data
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });

    // Create a download link and trigger the download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'Session4Review.csv');
    document.body.appendChild(link); // Required for Firefox
    link.click();

    // Clean up the URL object to free up memory
    URL.revokeObjectURL(link.href);
    document.body.removeChild(link); // Required for Firefox
  };

  function TimestampToDateTime( timestamp ) {
    // Convert the timestamp from seconds to milliseconds
    const date = new Date(timestamp * 1000);
    
    // Format the date and time
    const formattedDate = date.toLocaleString(); // This will give you a localized string, e.g., "9/7/2024, 4:30:00 PM"
    
    return <div>{formattedDate}</div>;
  }

  return (
      <div>
       <Navbar />
        <div className={styles.background_image} id="background_image">
          <div className={styles.whole_border}>
            </div>
            {
            <div>
                <input
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                            setError('')
                        }}
                        type="password"
                        placeholder="password"
                        className={styles.input_class}
                    />
                    
                <input
                        value={filterUserEmail}
                        onChange={(e) => {
                            setFilterUserEmail(e.target.value)
                        }}
                        placeholder="User Email"
                        className={styles.input_class}
                    />
                    <input
                        value={filterSessionId}
                        onChange={(e) => {
                            setFilterSessionId(e.target.value)
                        }}
                        placeholder="Session Id"
                        className={styles.input_class}
                    />
                    <input
                        value={filterQuestionNo}
                        onChange={(e) => {
                            setFilterQuestionNo(e.target.value)
                        }}
                        placeholder="Question No"
                        className={styles.input_class}
                    />
                    <input
                        value={filterQuestionAnswer}
                        onChange={(e) => {
                            setFilterQuestionAnswer(e.target.value)
                        }}
                        placeholder="Question Answer"
                        className={styles.input_class}
                    />

                    <button className={styles.generate} onClick={() => startDataGenerate()}>
                        Generate
                    </button>

                    <div className={styles.flex}>
                        <div className={styles.twoBtns}><button word={'Download'} onClick={downloadCSV} controverse position={'left'}>download</button></div>
                    </div>
                <table>
                    <thead>
                        <tr>
                        <th>User Id</th>
                        <th>User Email</th>
                        <th>Session ID</th>
                        <th>Question No</th>
                        <th>Response</th>
                        <th>first open at</th>
                        <th>last open at</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.userid}</td>
                            <td className={styles.maxwidth}>{item.useremail}</td>
                            <td>{item.sessionid}</td>
                            <td>{item.questionno}</td>
                            <td className={styles.maxwidth}>{item.response}</td>
                            <td className={styles.smallmaxwidth}>{item.firstopenat ? TimestampToDateTime(item.firstopenat) : '-'}</td>
                            <td className={styles.smallmaxwidth}>{item.endat ? TimestampToDateTime(item.endat) : '-'}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>



            </div>
            }

        </div>
      </div>
  );
};

export default DataGenerate;