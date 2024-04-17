import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './session4worksheet3b.module.css';
import Navbar from '../../../Navbar/Navbar';
import { useSelector } from 'react-redux';
import lockericon from './../../../../assets/assessment/oclock.jpg';
import Button from '../../../ReusableComponents/Button/Button';


import Modal from 'react-modal';
import ProgressBar from '../../../ReusableComponents/ProgressBar/ProgressBar';
import Typography from '../../../ReusableComponents/Typography/Typography';
import BorderContent from '../../../ReusableComponents/BorderContent/BorderContent';
import TextField from '../../../ReusableComponents/TextField/TextField';
import AudioPlayer from '../../../ReusableComponents/AudioPlayer/AudioPlayer';


const Session4Worksheet3B = () => {
  const navigate = useNavigate();
  const userData = useSelector(state => state.auth.user);
  const language = userData.language

  const [sessionId, setSessionId] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const screenHeight = window.innerHeight;
    document.getElementById('background_image').style.minHeight = `${screenHeight - 100}px`;

  }, []);


  const next = () => {


      passData();
    
  };

  const passData = () => {
    jumptonextpage()
  };

  const jumptonextpage = () => {
    navigate(`/session4worksheet4b`);
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

                <ProgressBar percentageNo={80} language={language} />

                <Typography title={'content'} position={'center'} color={'primary'}>EXCERCISE D-3</Typography>
                <br />
                <Typography title={'content'} position={'center'}>
                    <b>
                    {
                        language === 'English' ?
                        'Script for Guided Thought Exercise'
                        :
                        'Scripte pour l’exercice de pensée guidée'
                    }
                    </b>
                </Typography>
                <br />
                <div className={styles.audioBtnBox}>
                    <AudioPlayer audioPath={'http://35.182.37.175/audios/guidedmeditation.mp3'} />
                </div>
                <BorderContent className={styles.greyBorderContent}>
                   
                    {
                        language === 'English' ?
                        <React.Fragment>
                            <p> This next exercise is a guided thought exercise. Please listen to the instructions carefully, and try to follow them as closely as you can. This exercise can be used any time of day or night, and will help you remember community connection, kindness to all, and mindfulness when you need it most. </p>
                            <p>Settle into a comfortable position, and turn your attention to your breathing. Try to breathe slowly and deeply. </p>
                            <p>Take a deep breath, and allow your breathing to relax you as you exhale fully. Feel free to close your eyes if you wish. </p>
                            <p>Now, think about the academic worry that you have written down in Worksheet 1. Allow any feelings of stress or discomfort to flow through your body. Try not to avoid or over-identify with these feelings; instead, just be mindful of them; recognising, and accepting them for what they are. </p>
                            <p>Now, silently say to yourself: </p>
                            <li><b>This is a moment of difficulty. </b></li>
                            <br />
                            <p>Take some time to consider how your current issue is connected to the larger human experience. Now, silently say to yourself:  </p>
                            <li><b>Suffering is a part of life as a member of the university community</b></li>
                            <li><b>I’m not alone. I am part of the university community</b></li>
                            <li><b>All members of my university community struggle in life, just like I do. </b></li>
                            <br />
                            <p>Now, silently say to yourself: </p>
                            <li><b><u>May I be kind to myself as I am kind to other members of my university community.</u></b></li>
                            <br />
                            <p>You can also ask yourself, “What do I need to hear right now to express kindness to myself?” Is there a phrase that speaks to you in your particular situation? </p>
                            <p>If you’re having trouble finding the right words, think back to the words of kindness that you wrote to yourself earlier, or imagine what you might say to another member of your university community who is struggling with a similar issue. Let those kind words roll gently through your mind. </p>
                            <p>Now it is time to return to your day. Continue to breathe smoothly and regularly, feeling your energy increasing with each breath. When you are ready, open your eyes and return to your day, feeling alert and calm. </p>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <p>Le prochain exercice est un exercice de pensée guidée. Écoute attentivement les instructions et essaie de les suivre le plus fidèlement possible. Cet exercice peut être utilisé à n’importe quel temps de la journée ou de la nuit et t’aidera à te rappeler de ton appartenance à ta communauté, la bienveillance envers tous et la pleine conscience lorsque tu en auras le plus besoin.</p>
                            <p>Installe-toi dans une position confortable et porte attention à ta respiration. Essaie de respirer lentement et profondément.</p>
                            <p>Prends une grande respiration et laisse ta respiration te relaxer en expirant complètement. Tu peux fermer tes yeux si tu le souhaites.</p>
                            <p>Maintenant, pense au problème lié aux études décrit dans la fiche 1. Permets tout sentiment de stress ou d’inconfort de circuler dans ton corps. Essaye de ne pas éviter ou de te suridentifier avec ces sentiments; plutôt, sois-en simplement conscient; reconnais-les et accepte-les pour ce qu’ils sont.</p>
                            <p>Maintenant, murmure à toi-même :</p>
                            <ii><b><i>C’est un moment de difficulté. </i></b></ii>
                            <br />
                            <br />
                            <p>Prends du temps pour réfléchir à comment ton problème actuel est relié à l’expérience humaine dans son ensemble. Maintenant, murmure à toi-même :</p>
                            <ii><b><i>Souffrir fait partie de la vie universitaire.</i></b></ii>
                            <ii><b><i>Je ne suis pas seul.e. Je fais partie de la communauté universitaire.</i></b></ii>
                            <ii><b><i>Tous les membres de ma communauté universitaire vivent des difficultés dans la vie, comme je le vis.</i></b></ii>
                            <br />
                            <br />
                            <p>Maintenant, murmure à toi-même :</p>
                            <ii><b><u><i>Je peux être bienveillant.e envers moi-même comme je suis bienveillant.e envers les autres membres de ma communauté universitaire.</i></u></b></ii>
                            <br />
                            <br />
                            <p>Tu peux aussi te demander « qu’ai-je besoin d’entendre maintenant pour exprimer de la bienveillance envers moi-même ? » Y a-t-il une phrase qui t‘interpelle dans ta situation particulière ?</p>
                            <p>Si tu as de la difficulté à trouver les bons mots, pense à des mots bienveillants que tu t’es écrits plus tôt, ou imagine ce que tu dirais à un autre membre de ta communauté universitaire qui est confronté à un problème similaire. Laisse ces mots bienveillants rouler doucement dans ton esprit.</p>
                            <p>C’est le moment de retourner à ta journée. Continue de respirer doucement et régulièrement, ressentant ton énergie augmentant avec chaque respiration. Quand tu es prêt.e, ouvre tes yeux et retourne à ta journée, te ressentant concentré.e et calme.</p>
                        </React.Fragment>
                    }
                </BorderContent>
                <Button word={language === 'English' ? 'NEXT' : 'Suivant'} onClick={next} position={'center'} />

                </div>
            </div>
        </div>
    );

}

export default Session4Worksheet3B;