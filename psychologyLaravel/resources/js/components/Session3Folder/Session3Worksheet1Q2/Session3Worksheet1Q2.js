import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './session3worksheet1q2.module.css';
import Navbar from '../../Navbar/Navbar';
import { useSelector } from 'react-redux';
import lockericon from './../../../assets/assessment/oclock.jpg';
import Button from '../../ReusableComponents/Button/Button';


import Modal from 'react-modal';
import ProgressBar from '../../ReusableComponents/ProgressBar/ProgressBar';
import Typography from '../../ReusableComponents/Typography/Typography';
import BorderContent from '../../ReusableComponents/BorderContent/BorderContent';
import TextField from '../../ReusableComponents/TextField/TextField';

const Session3Worksheet1Q2 = () => {
  const navigate = useNavigate();
  const userData = useSelector(state => state.auth.user);
  const language = userData.language

  const [sessionId, setSessionId] = useState(0);

  const [questionA, setQuestionA] = useState('');
  const [questionAError, setQuestionAError] = useState(false);
  const [questionB, setQuestionB] = useState('');
  const [questionBError, setQuestionBError] = useState(false);

  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questionIssue, setQuestionIssue] = useState('');
  const [isThoughtModalOpen, setIsThoughtModalOpen] = useState(false);
  const [questionThought, setQuestionThought] = useState('');
  
  const [isFeelingModalOpen, setIsFeelingModalOpen] = useState(false);
  const [questionFeeling, setQuestionFeeling] = useState('');

  
  const [isbehaviourModalOpen, setIsBehaviourModalOpen] = useState(false);
  const [questionBehaviour, setQuestionBehaviour] = useState('');


  const [groupA, setQuestionGroupA] = useState(0);
  const [groupB, setQuestionGroupB] = useState(0);
  const [groupC, setQuestionGroupC] = useState(0);


  useEffect(() => {
    window.scrollTo(0, 0);
    const screenHeight = window.innerHeight;
    document.getElementById('background_image').style.minHeight = `${screenHeight - 100}px`;

    axios.get(`/api/sessionresponse/1?userid=${userData.userid}&&questionno=session1worksheet3q1`)
    .then(response => {
    if(response.data){
        if(response.data.sessionresponse.response){
            const questionanswer = JSON.parse(response.data.sessionresponse.response)
            setQuestionGroupA(questionanswer.q1)
            setQuestionGroupB(questionanswer.q2)
            setQuestionGroupC(questionanswer.q3)
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
          setQuestionIssue(questionanswer.q2)
        }
      }
    })
    .catch(error => {
      // Handle any errors
      console.error(error);
    });

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

    axios.get(`/api/sessionresponse/3?userid=${userData.userid}&&questionno=session3Worksheet1Q2`)
    .then(response => {
    if(response.data){
        if(response.data.sessionresponse.response){
            const questionanswer = JSON.parse(response.data.sessionresponse.response)
            setQuestionA(questionanswer.q1)
            setQuestionB(questionanswer.q2)
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


    if (questionA !== '' && questionB !== ''  ) {
      passData();
    }
  };

  const passData = () => {
    console.log('data uncaught')
    const data = {
        'userid': userData.userid,
        'sessionid': 3,
        'questionno': 'session3Worksheet1Q2',
        'response': {'q1': questionA, 'q2': questionB}
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
    navigate(`/session3worksheet1q3`);
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

  const closeModal = () => {
    setIsModalOpen(false);
    setIsThoughtModalOpen(false)
    setIsFeelingModalOpen(false)
    setIsBehaviourModalOpen(false)
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

                <ProgressBar percentageNo={60} language={language} />

                <BorderContent className={styles.greyBorderContent}>
                    {
                        language === 'English' ?
                        <React.Fragment>
                            <p> Isolation, Self-Judgment, Avoidance, and Over-Identification can be overcome. This exercise will introduce 3 concepts that oppose Isolation, Self-Judgment, Avoidance, and Over-Identification.</p>
                            <p>
                                Community connection&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;vs.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Isolation
                                <br />
                                Kindness to all&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;vs.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Self-Judgment
                                <br />
                                Mindfulness&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;vs.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Avoidance/ Over-Identification
                            </p>
                            <p>
                                You mentioned three groups as part of your university community: 
                                {
                                    groupA !== '' ? ' ' + groupA : ''
                                }
                                {
                                    groupB !== '' ? ', ' + groupB : ''
                                }
                                {
                                    groupC !== '' ? ', and ' + groupC : ''
                                }
                                . In this exercise, the groups that you belong to can help you overcome Isolation, Self-Judgment, Avoidance, and Over-Identification. 
                            </p>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <p> L’isolement, l’autocritique, l’évitement et la suridentification peuvent être surmontés. Cet exercice introduira trois concepts qui s’oppose à l’isolement, l’autocritique, l’évitement et la suridentification.</p>
                            <p>
                                Faire partie d’une communauté &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;vs.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;L’isolement
                                <br />
                                La bienveillance envers tous&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;vs.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;L’auto-jugement
                                <br />
                                La pleine conscience&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;vs.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;L’évitement/la suridentification
                            </p>
                            <p>
                            Tu as mentionné trois groupes faisant partie de votre communauté universitaire: 
                                {
                                    groupA !== '' ? ' ' + groupA : ''
                                }
                                {
                                    groupB !== '' ? ', ' + groupB : ''
                                }
                                {
                                    groupC !== '' ? ', and ' + groupC : ''
                                }
                                . Dans cet exercice, les groupes auxquels tu appartiens peuvent t’aider à surmonter l’isolement, l’autocritique, l’évitement et la suridentification.
                            </p>
                        </React.Fragment>
                    }
                </BorderContent>

                <BorderContent>
                    {
                        language === 'English' ?
                        <React.Fragment>
                            <Typography title={'content'}  position={'center'} color={'primary'}>
                                <b><u>Community connection </u></b>
                            </Typography>
                            <p>In contrast to isolation, community connection involves recognising our connection to others, particularly in our confusion, worries, sorrows, imperfections, and weaknesses. </p>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <Typography title={'content'}  position={'center'} color={'primary'}>
                                <b><u>Faire partie d’une communauté</u></b>
                            </Typography>
                            <p>Contrairement à l’isolement, faire partie d’une communauté implique de reconnaitre que nous sommes connectées aux autres, particulièrement dans notre confusion, nos inquiétudes, nos chagrins, nos imperfections et nos faiblesses.</p>
                        </React.Fragment>
                    }
                    {
                        language === 'English' ?
                        <React.Fragment>
                            <p>As members of the university community, we are connected to this community. We can recognize our commonalities with other members of the university community by relating our personal experiences to the experiences of others in our university community who are also suffering, thus putting our own situation into a larger group perspective. </p>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <p>En tant que membres de la communauté universitaire, nous faisons partie de cette communauté. Nous pouvons reconnaitre nos points communs avec les autres membres de la communauté universitaire en mettant en relation nos expériences personnelles avec les expériences d'autres membres de la communauté universitaire qui souffrent également, plaçant ainsi notre propre situation dans une perspective de groupe plus large.</p>
                        </React.Fragment>
                    }
                </BorderContent>
                <br />
                {
                        language === 'English' ?
                        <React.Fragment>
                            <Typography title={'content'} position={'left'} contentwidth={'100%'}><i>Consider the academic-related 
                            <b className={styles.colorPrimary} onClick={openDialogWithTemplateRef}>
                                <u>
                                    <i> issue </i>
                                </u>
                            </b>
                            written in Worksheet 1. In the space below, write about the various circumstances underlying the academic-related issue that would cause most members of the university community to react the way you did. Also, think about ways in which your experience was connected to the experience of most members of your university community. This might include acknowledging that being a member of your university community means being imperfect, and that all people have these sorts of distressing or upsetting experiences.</i></Typography>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <Typography title={'content'} position={'left'} contentwidth={'100%'}>Pense aux problèmes liés aux études décrits dans la fiche 1. Dans l’espace ci-dessous, écris à propos des diverses circonstances sous-jacentes qui pourraient amener les autres membres de la communauté universitaire à réagir de la même manière que toi. Aussi, pense aux façons dont ton expérience est reliée à l’expérience de la majorité des membres de ta communauté universitaire. Ceci pourrait inclure reconnaitre qu’être un membre de la communauté universitaire implique d'être imparfait, et que tout le monde vit ce genre d’expériences stressantes et perturbantes.</Typography>
                        </React.Fragment>
                    }
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
                        `e.g. “I think most members of my university community would feel overwhelmed if they had to deal with what I’m dealing with, it’s a normal feeling to have.”\n“It’s fine that I get distracted from studying every once in a while; no members of my university community can focus on studying forever.”\n“What matters is that I refocus after getting distracted. All of the members of my university community face struggles; if they can overcome, then so can I. “`
                        :
                        'P. ex. « Je pense que la majorité des membres de ma communauté universitaire se sentiraient dépassés s’ils devaient faire face à ce que je fais face, c’est un sentiment normal à avoir. »\n« C’est correct que je me sente distrait.e de mes études de temps en temps; aucun membre de ma communauté universitaire ne peut toujours se concentrer sur les études. »\n« Ce qui importe est que je me reconcentre après que je me suis distrait. Tous les membres de ma communauté universitaire font face à des difficultés; s’ils peuvent les surmonter, je peux aussi. »'
                    }
                    questionError={questionAError}
                    errorWarningText={ language === 'English' ? 'Please input your answer' : 'Ajoute une réponse.'}
                    />
                    <br />
                    


                <BorderContent>
                    {
                        language === 'English' ?
                        <React.Fragment>
                            <Typography title={'content'}  position={'center'} color={'primary'}>
                                <b><u>Kindness to all</u></b>
                            </Typography>
                            <p>In contrast to self-judgment, kindness to all involves extending forgiveness, sensitivity, and patience to all, including <b>yourself</b>. </p>
                            <p>Consider the kindness that you would extend to a fellow member of your university community. Kindness to all involves affirming that, you, as a member of your university community, deserve love, happiness, and affection, even after failure. As a member of the university community, you can extend forgiveness, sensitivity, and patience to <b>yourself</b>.</p>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <Typography title={'content'}  position={'center'} color={'primary'}>
                                <b><u>La bienveillance envers tous</u></b>
                            </Typography>
                            <p>Contrairement à l’autocritique, la bienveillance à l’égard de tous implique de faire preuve de pardon, de sensibilité et de patience envers tous, incluant <b>toi-même</b>.</p>
                            <p>Pensez à la bienveillance que tu offrirais à un.e camarade de ta communauté universitaire. La bienveillance envers tous implique d'affirmer que, toi, en tant que membre de ta communauté universitaire, mérite l’amour, le bonheur et l’affection, même après un échec. En tant que membre de la communauté universitaire, tu peux offrir le pardon, la sensibilité et la patience à <b>toi-même</b>.</p>
                        </React.Fragment>
                    }
                </BorderContent>
                <br />
                {
                    language === 'English' ?
                    <React.Fragment>
                        <Typography title={'content'} position={'left'} contentwidth={'100%'}>
                            <i>Think of yourself as a member of the university community. In the box below, write kind and understanding words towards yourself in relation to the academic-related 
                            <b className={styles.colorPrimary} onClick={openDialogWithTemplateRef}>
                                <u>
                                    <i> issue </i>
                                </u>
                            </b>
                             written in Worksheet 1. This can be difficult, so imagine what you might say to another member of the university community if they confided the same situation and feelings to you. Alternatively, imagine what a kind and compassionate member of the university community might say to you. <i>(Write <b>at least THREE</b> sentences)</i>. </i>
                        </Typography>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <Typography title={'content'} position={'left'} contentwidth={'100%'}>
                            Pense à toi-même en tant que membre de la communauté universitaire. Dans la case ci-dessous, écris des mots bienveillants et compréhensifs envers toi-même en lien avec les problèmes liés aux études décrits dans la fiche 1. Cela peut être difficile, donc imagine ce que tu dirais à un autre membre de la communauté universitaire s’il/elle te confie la même situation et les mêmes sentiments. Sinon, imagine ce qu’un membre bienveillant et compatissant de la communauté universitaire pourrait vous dire. (Écris <b>au moins TROIS</b> phrases).
                            </Typography>
                    </React.Fragment>
                }
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
                    "e.g. “I understand that you are stressed, it is a very heavy workload after all.”\n“Your concern about this exam shows that you still care about your studies, and that you are still trying. I’m glad that you’re not giving up.”\n“I know that you ended up using TikTok the last time you tried to study, but it is okay to take a break from studying every once in awhile. If you really cannot concentrate because of Facebook, perhaps you could switch off your Internet the next time you study.”\n“Keep at it, I believe in you.”"
                    :
                    'P. ex. « Je comprends que tu sois stressé.e, c’est une charge de travail très lourde. »\n« Ta préoccupation pour cet examen montre que tu es toujours investi.e dans tes études, et que tu essaies encore. Je suis content.e que tu n’abandonnes pas. »\n« Je sais que tu as fini par utiliser TikTok la dernière fois que tu as essayé d’étudier, mais c’est correct de prendre une pause de tes études de temps en temps. Si tu ne peux vraiment pas te concentrer à cause de TikTok, tu pourrais peut-être éteindre ton Internet. »\n« Continue, je crois en toi. »'
                }
                questionError={questionBError}
                errorWarningText={ language === 'English' ? 'Please input your answer' : 'Ajoute une réponse.'}
                />

                <BorderContent>
                    {
                        language === 'English' ?
                        <React.Fragment>
                            <Typography title={'content'}  position={'center'} color={'primary'}>
                                <b><u>Mindfulness </u></b>
                            </Typography>
                            <p>In contrast to over-identification or avoidance, mindfulness involves being aware, attentive, and accepting of the present moment. It involves compassionately observing thoughts and emotions as they are, without suppressing or exaggerating them.</p>
                            <p>Mindfulness is about being willing to observe our negative thoughts and emotions with openness and clarity. We cannot feel avoid our pain and feel compassion for it at the same time. At the same time, mindfulness requires that we do not "over-identify" with our thoughts and feelings.</p>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <Typography title={'content'}  position={'center'} color={'primary'}>
                                <b><u>La pleine conscience</u></b>
                            </Typography>
                            <p>Contrairement à la suridentification ou l’évitement, la pleine conscience implique d'être conscient, attentif et faire preuve d’acceptation du moment présent. Elle implique d'observer avec compassion ses pensées et ses émotions telles qu’elles sont, sans les réprimer ou les exagérer.</p>
                            <p>La pleine conscience implique d’avoir la volonté d’observer nos pensées et nos émotions négatives avec ouverture et clarté. Nous ne pouvons pas éviter notre douleur et éprouver de la compassion en même temps. En même temps, la pleine conscience requiert que nous ne nous « suridentifions » pas avec nos pensées et nos sentiments.</p>
                        </React.Fragment>
                    }
                </BorderContent>

                <Button word={language === 'English' ? 'NEXT' : 'Suivant'} onClick={next} position={'center'} />

            </div>
            </div>

            <Modal
              isOpen={isModalOpen}
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
            
        </div>
    );

}

export default Session3Worksheet1Q2;