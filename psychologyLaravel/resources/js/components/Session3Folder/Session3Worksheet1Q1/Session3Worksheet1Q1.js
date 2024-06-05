import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './session3worksheet1q1.module.css';
import Navbar from '../../Navbar/Navbar';
import { useSelector } from 'react-redux';
import lockericon from './../../../assets/assessment/oclock.jpg';
import english_worry_chart from './english_worry_chart.jpg'
import french_worry_chart from './french_worry_chart.jpg'
import Button from '../../ReusableComponents/Button/Button';


import Modal from 'react-modal';
import ProgressBar from '../../ReusableComponents/ProgressBar/ProgressBar';
import Typography from '../../ReusableComponents/Typography/Typography';
import BorderContent from '../../ReusableComponents/BorderContent/BorderContent';
import TextField from '../../ReusableComponents/TextField/TextField';

const Session3Worksheet1Q1 = () => {
  const navigate = useNavigate();
  const userData = useSelector(state => state.auth.user);
  const language = userData.language

  const [sessionId, setSessionId] = useState(0);

  const [questionA, setQuestionA] = useState('');
  const [questionAError, setQuestionAError] = useState(false);
  const [questionB, setQuestionB] = useState('');
  const [questionBError, setQuestionBError] = useState(false);
  const [questionC, setQuestionC] = useState('');
  const [questionCError, setQuestionCError] = useState(false);

  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isThoughtModalOpen, setIsThoughtModalOpen] = useState(false);
  const [questionThought, setQuestionThought] = useState('');
  
  const [isFeelingModalOpen, setIsFeelingModalOpen] = useState(false);
  const [questionFeeling, setQuestionFeeling] = useState('');

  
  const [isbehaviourModalOpen, setIsBehaviourModalOpen] = useState(false);
  const [questionBehaviour, setQuestionBehaviour] = useState('');

  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const [questionIssue, setQuestionIssue] = useState('');


  useEffect(() => {
    window.scrollTo(0, 0);
    const screenHeight = window.innerHeight;
    document.getElementById('background_image').style.minHeight = `${screenHeight - 100}px`;

    axios.get(`/api/sessionresponse/1?userid=${userData.userid}&&questionno=session1worksheetq2`).then(response => {
        if(response.data){
          if(response.data.sessionresponse.response){
            const questionanswer = JSON.parse(response.data.sessionresponse.response)
            setQuestionFeeling(questionanswer.q1)
            setQuestionThought(questionanswer.q2)
            setQuestionBehaviour(questionanswer.q3)
          }
        }
      })
      .catch(error => {
        // Handle any errors
        console.error(error);
      });

    axios.get(`/api/sessionresponse/1?userid=${userData.userid}&&questionno=session1WorksheetQ1`).then(response => {
      if(response.data){
        if(response.data.sessionresponse.response){
          const questionanswer = JSON.parse(response.data.sessionresponse.response)
          setQuestionIssue(questionanswer.q1)
        }
      }
    })
    .catch(error => {
      // Handle any errors
      console.error(error);
    });

    axios.get(`/api/sessionresponse/4?userid=${userData.userid}&&questionno=session3Worksheet1Q1`)
    .then(response => {
    if(response.data){
        if(response.data.sessionresponse.response){
            const questionanswer = JSON.parse(response.data.sessionresponse.response)
            setQuestionA(questionanswer.q1)
            setQuestionB(questionanswer.q2)
            setQuestionC(questionanswer.q3)
        }
    }
    })
    .catch(error => {
    // Handle any errors
    console.error(error);
    });
  }, []);

  const next = () => {
    if (questionA === '') {
      setQuestionAError(true);
    } else {
      setQuestionAError(false);
    }
    if (questionB === '') {
        setQuestionBError(true);
    } else {
        setQuestionBError(false);
    }
    if (questionC === '') {
        setQuestionCError(true);
    } else {
        setQuestionCError(false);
    }


    if (questionA !== '' && questionB !== '' && questionC !== '' ) {
      passData();
    }
  };

  const passData = () => {
    console.log('data uncaught')
    const data = {
        'userid': userData.userid,
        'sessionid': 4,
        'questionno': 'session3Worksheet1Q1',
        'response': {'q1': questionA, 'q2': questionB, 'q3': questionC}
    }
    axios.post(`/api/sessionresponse`, data)
        .then(response => {
            jumptonextpage()
        })
        .catch(error => {
        // Handle any errors
        console.error(error);
    });
  };

  const jumptonextpage = () => {
    navigate(`/session3worksheet1q2`);
  };

  const openDialogWithTemplateRef = () => {
    setIsModalOpen(true);
  };

  const openDialogThoughtWithTemplateRef = () => {
    setIsThoughtModalOpen(true);
  };

  const openDialogFeelingWithTemplateRef = () => {
    setIsFeelingModalOpen(true);
  };

  const openDialogBehaviourWithTemplateRef = () => {
    setIsBehaviourModalOpen(true);
  };

  const openDialogIssueWithTemplateRef = () => {
    setIsIssueModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setIsThoughtModalOpen(false)
    setIsFeelingModalOpen(false)
    setIsBehaviourModalOpen(false)
    setIsIssueModalOpen(false)
  };



  return (
    <div>
       <Navbar />
      <div className={styles.background_image} id="background_image">
        <div className={styles.whole_border}>
            <Typography title={'subtitle'} position={'left'}>
            {
              language === 'English' ? 
              'Fourth Session' :
              'Troisième session'
            }
            </Typography>

            <ProgressBar percentageNo={40} language={language} />

            <BorderContent className={styles.greyBorderContent}>
                {
                    language === 'English' ?
                    <React.Fragment>
                        <p> In this exercise, you will be introduced to three concepts:</p>
                        <p>
                            1. Isolation
                            <br />
                            2. Self-Judgment 
                            <br />
                            3. Over-Identification 
                        </p>
                        <p>
                        After understanding how each concept can contribute to worry, consider whether that concept is displayed in your&nbsp;
                        <b onClick={openDialogThoughtWithTemplateRef} className={styles.modalWording}>
                          <u>
                          <i>thoughts</i>
                          </u>
                        </b>
                        ,&nbsp;
                        <b onClick={openDialogFeelingWithTemplateRef} className={styles.modalWording}>
                          <u>
                          <i>feelings</i>
                          </u>
                        </b>
                        ,&nbsp;and&nbsp;
                        <b onClick={openDialogBehaviourWithTemplateRef} className={styles.modalWording}>
                          <u>
                          <i>behaviours</i>
                          </u>
                        </b>
                        &nbsp;in response to the academic-related issue written in Worksheet 1.
                        </p>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <p> Dans cet exercice, tu seras introduit.e à trois concepts :</p>
                        <p>
                            1. L’isolement
                            <br />
                            2. L'autocritique 
                            <br />
                            3. La suridentification
                        </p>
                        <p>
                        Après avoir compris comment chaque concept peut contribuer au souci, tu seras invité.e à considérer si ce concept est présent dans tes pensées, tes sentiments, et tes comportements en lien avec les soucis que tu as écrits dans la fiche 1.
                        </p>
                    </React.Fragment>
                }
            </BorderContent>

            <BorderContent>
                {
                    language === 'English' ?
                    <React.Fragment>
                        <Typography title={'content'}  position={'center'} color={'primary'}>
                            <b><u>Recap: Avoidance</u></b>
                        </Typography>
                        <p>As we saw in session 1, worry can be described as negative thoughts and emotions about a future task or event. In order to “escape” these negative thoughts and emotions, people often respond by trying to avoid the task or event that causes worry.</p>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <Typography title={'content'}  position={'center'} color={'primary'}>
                            <b><u>Récap : Évitement</u></b>
                        </Typography>
                        <p>Tel que présenté dans la première session, l’inquiétude peut être décrit comme des pensées et des émotions négatives par rapport à une tâche ou un événement futur. Afin de « fuir » ces pensées et ces émotions négatives, les gens répondent souvent en tentant d’éviter la tâche ou l’événement qui cause le souci.</p>
                    </React.Fragment>
                }
                {
                    language === 'English' ?
                    <img src={english_worry_chart} className={styles.avoid_cycle_img} alt="Avoidance Cycle" />
                    :
                    <img src={french_worry_chart} className={styles.avoid_cycle_img} alt="Avoidance Cycle" />
                }
                {
                    language === 'English' ?
                    <React.Fragment>
                        <p>As you have learned, although avoidance can provide short-term relief, it often leads to negative long-term consequences, and contributes to worry in the future.</p>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <p>Comme tu as appris, bien que l’évitement puisse fournir un soulagement à court terme, il mène souvent à des conséquences à long terme et contribue au souci dans l’avenir.</p>
                    </React.Fragment>
                }
            </BorderContent>

            <BorderContent>
                {
                    language === 'English' ?
                    <React.Fragment>
                        <Typography title={'content'}  position={'center'} color={'primary'}>
                            <b><u>Isolation</u></b>
                        </Typography>
                        <p>Many people feel cut off from others in times of worry, and feel that they are alone in their struggle with particular worries, inadequacies, or failures. Sometimes, people may intentionally withdraw from others and hide their “true selves” because they feel that others will not understand their worries, inadequacies, or failures. </p>
                        <p>Although isolation can sometimes feel “safe”, it often contributes to negative emotions such as anxiety and depression. This is because difficult situations often seem more difficult when you feel like you’re the only one who is struggling. </p>
                        <p>Consider the&nbsp;
                        <b onClick={openDialogThoughtWithTemplateRef} className={styles.modalWording}>
                          <u>
                          <i>thoughts</i>
                          </u>
                        </b>
                        ,&nbsp;
                        <b onClick={openDialogFeelingWithTemplateRef} className={styles.modalWording}>
                          <u>
                          <i>feelings</i>
                          </u>
                        </b>
                        ,&nbsp;and&nbsp;
                        <b onClick={openDialogBehaviourWithTemplateRef} className={styles.modalWording}>
                          <u>
                          <i>behaviours</i>
                          </u>
                        </b> you’ve had in response to the academic-related issue written in Worksheet 1. Do any of those thoughts, feelings, or behaviours make you feel isolated? Write down those thoughts/ feelings/ behaviours in the space below.</p>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <Typography title={'content'}  position={'center'} color={'primary'}>
                            <b><u>Isolement</u></b>
                        </Typography>
                        <p>Plusieurs personnes se sentent coupées des autres quand ils vivent des périodes d’inquiétude et ressentent qu’elles sont seules dans leurs difficultés, leurs inquiétudes, leurs inaptitudes, et leurs échecs. Parfois, certaines personnes peuvent intentionnellement s’éloigner des autres et cacher leur « vraie personne » parce qu’elles sentent que les autres ne vont pas comprendre leurs inquiétudes, leurs inaptitudes et leurs échecs. </p>
                        <p>Bien que l’isolement puisse parfois fournir un sentiment de sécurité, il contribue souvent aux émotions négatives comme l’anxiété et la dépression. En effet, les situations difficiles semblent souvent plus difficiles à affronter lorsque tu ressens que tu es la seule personne à vivre des difficultés.</p>
                        <p>Réfléchis aux&nbsp;
                          <b onClick={openDialogThoughtWithTemplateRef} className={styles.modalWording}>
                          <u>
                          <i>pensées</i>
                          </u>
                        </b>, aux&nbsp;
                        <b onClick={openDialogFeelingWithTemplateRef} className={styles.modalWording}>
                          <u>
                          <i>sentiments </i>
                          </u>
                        </b>
                         et aux&nbsp;
                         <b onClick={openDialogBehaviourWithTemplateRef} className={styles.modalWording}>
                          <u>
                          <i>comportements </i>
                          </u>
                        </b>
                          que tu as eus en réponse au problème relié aux études dans la fiche 1. Y en a-t-il parmi ceux-ci qui t’ont fait sentir isolé.e? Écris ces pensées/sentiments/comportements dans l’espace ci-dessous.</p>
                    </React.Fragment>
                }
            </BorderContent>

            <TextField 
              rows="4"
              cols="50"
              title={''}
              value={questionA}
              onChange={(e) => {
                setQuestionA(e.target.value)
                setQuestionAError(false)
              }}
              placeholder={
                language === 'English' ?
                "e.g., I feel incompetent, like I’m the only one who struggles this much. "
                :
                'P. ex. Je me sens incompétent.e, comme si j’étais la seule personne à avoir autant de difficulté.'
              }
              questionError={questionAError}
              errorWarningText={ language === 'English' ? 'Please input your answer' : 'Ajoute une réponse.'}
            />

            <BorderContent>
                {
                    language === 'English' ?
                    <React.Fragment>
                        <Typography title={'content'}  position={'center'} color={'primary'}>
                            <b><u>Self-Judgment</u></b>
                        </Typography>
                        <p>When people worry, they can often be judgmental towards themselves. Self-judgment involves being hostile, demeaning, and critical of one’s self. While some people may believe that self-judgment can be “motivation” for self-improvement, self-judgment often has a negative effect, contributing to fear, anxiety, and anger.</p>
                        <p>Consider the thoughts, feelings, and behaviours you’ve had in response to the academic-related
                         <b onClick={openDialogIssueWithTemplateRef}>&nbsp;
                              <u>
                              <i>ISSUE</i>
                              </u>
                              &nbsp;

                          </b>
                          
                           written in Worksheet 1. Could any of those thoughts, feelings or behaviours be described as self-judgmental? Write down those thoughts/ feelings/ behaviours in the space below. </p>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <Typography title={'content'}  position={'center'} color={'primary'}>
                            <b><u>L’autocritique</u></b>
                        </Typography>
                        <p>Quand les gens s’inquiètent, ils peuvent souvent être critiques et porter des jugements sur eux-mêmes. L’autocritique implique être hostile, rabaissant et critique envers soi-même. Alors que certaines personnes peuvent croire que l'autocritique puisse servir de « motivation » pour l’amélioration de soi, l’autocritique a souvent un effet négatif, contribuant à la peur, l’anxiété et la colère.</p>
                        <p>Réfléchis aux 
                        <b onClick={openDialogIssueWithTemplateRef}>&nbsp;
                              <u>
                              <i>pensées, aux sentiments et aux comportements</i>
                              </u>
                              &nbsp;

                          </b> que tu as eus en réponse au problème relié aux études dans la fiche 1. Y en a-t-il parmi ceux-ci qui peuvent être décrits comme étant autocritique ? Écris ces pensées/sentiments/comportements dans l’espace ci-dessous.</p>
                    </React.Fragment>
                }
            </BorderContent>

            <TextField 
              rows="4"
              cols="50"
              title={''}
              value={questionB}
              onChange={(e) => {
                setQuestionB(e.target.value)
                setQuestionBError(false)
              }}
              placeholder={
                language === 'English' ?
                "e.g., I must be terrible at exams. Maybe I’m just not smart enough for this. I can’t focus on studying. "
                :
                'P. ex. Je dois être terrible à faire des examens. Peut-être je ne suis pas assez intelligent.e pour ça. Je ne peux pas me concentrer sur mes études.'
              }
              questionError={questionBError}
              errorWarningText={ language === 'English' ? 'Please input your answer' : 'Ajoute une réponse.'}
            />

            <BorderContent>
                {
                    language === 'English' ?
                    <React.Fragment>
                        <Typography title={'content'}  position={'center'} color={'primary'}>
                            <b><u>Over-Identification</u></b>
                        </Typography>
                        <p>While some people avoid negative experiences, others may over-identify with their negative experiences. Over-identification involves excessively thinking about one’s shortcomings. People who over-identify often magnify the significance of their failures, and think that they are worse than they really are. This further contributes to negative emotion and worry. </p>
                        <p>Consider the thoughts, feelings, and behaviours you’ve had in response to the academic-related issue written in Worksheet 1. Could any of those thoughts, feelings, or behaviours be described as over-identification? Write down those thoughts/ feelings/ behaviours in the space below. </p>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <Typography title={'content'}  position={'center'} color={'primary'}>
                            <b><u>La suridentification</u></b>
                        </Typography>
                        <p>Alors que certaines personnes évitent les expériences négatives, d’autres peuvent se suridentifier avec leurs expériences négatives. La suridentification implique une pensée excessive à ses défauts. Les personnes qui se suridentifient amplifient souvent l’importance de leurs échecs et pensent qu’ils sont pires qu’ils le sont vraiment. Cela contribue davantage aux émotions négatives et à l'inquiétude.</p>
                        <p>
                        <b onClick={openDialogThoughtWithTemplateRef} className={styles.modalWording}>
                          <u>
                          <i>thoughts</i>
                          </u>
                        </b>
                        ,&nbsp;
                        <b onClick={openDialogFeelingWithTemplateRef} className={styles.modalWording}>
                          <u>
                          <i>feelings</i>
                          </u>
                        </b>
                        ,&nbsp;and&nbsp;
                        <b onClick={openDialogBehaviourWithTemplateRef} className={styles.modalWording}>
                          <u>
                          <i>behaviours</i>
                          </u>
                        </b>

                          <b>Réfléchis aux pensées, aux sentiments et aux comportements que tu as eus en réaction à tes problèmes liés aux études que tu as partagés dans la fiche 1</b>. Y a-t-il certaines de ces pensées, sentiments, ou comportements décrits qui pourraient être décrits comme de la suridentification ? Écris ces pensées/sentiments/comportements dans l’espace ci-dessous.</p>
                    </React.Fragment>
                }
            </BorderContent>

            <TextField 
              rows="4"
              cols="50"
              title={''}
              value={questionC}
              onChange={(e) => {
                setQuestionC(e.target.value)
                setQuestionCError(false)
              }}
              placeholder={
                language === 'English' ?
                "e.g. I messed up the last exam. I must be terrible at exams. "
                :
                'P. ex. J’ai raté mon dernier examen. Je dois être terrible à faire des examens.'
              }
              questionError={questionCError}
              errorWarningText={ language === 'English' ? 'Please input your answer' : 'Ajoute une réponse.'}
            />
            

            <Button word={language === 'English' ? 'Exercise D-2' : 'Suivant'} onClick={next} position={'center'} />

            </div>
            </div>

            <Modal
              isOpen={isThoughtModalOpen}
              onRequestClose={closeModal}
              contentLabel="Thought Dialog"
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
              {questionThought}
            </Modal>


            <Modal
              isOpen={isFeelingModalOpen}
              onRequestClose={closeModal}
              contentLabel="Thought Dialog"
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
              {questionFeeling}
            </Modal>

            <Modal
              isOpen={isbehaviourModalOpen}
              onRequestClose={closeModal}
              contentLabel="Thought Dialog"
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
              {questionBehaviour}
            </Modal>

            <Modal
              isOpen={isIssueModalOpen}
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
              {questionIssue}
            </Modal>
            
        </div>
    
  );
};

export default Session3Worksheet1Q1;