import React, { useEffect, useState } from 'react';
import styles from './session4worksheet4b.module.css';

import Typography from '../../../ReusableComponents/Typography/Typography';
import BorderContent from '../../../ReusableComponents/BorderContent/BorderContent';
import Modal from 'react-modal';

const Session3worksheet1q4Wording = (props) => {

    const { language, questionIssue } = props

    const [isModalOpen, setIsModalOpen] = useState(false);


    const openDialogWithTemplateRef = () => {
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      };
    
  return (
    <React.Fragment>
         <br />
        <BorderContent className={styles.greyBorderContent}>
            {
                language === 'English' ?
                <React.Fragment>
                    <p><u><i>1.	Please practice the following self-compassion exercise over the next week before the final session:</i></u> </p>
                    <p>This exercise can be used any time of day or night, and will help you remember community connection, kindness to all, and mindfulness when you need it most.</p>
                    <ol>
                        <br />
                        <li>Think about the academic-related&nbsp;
                            <b className={styles.colorPrimary} onClick={openDialogWithTemplateRef}>
                                <u>
                                    <i>issue</i>
                                </u>
                            </b>&nbsp;written in Worksheet 1. Call the situation to mind, and see if you can actually feel the stress and emotional discomfort in your body.
                        </li>
                        <br />
                        <li>Now, silently say to yourself:
                            <ul>
                                <li>This is a moment of difficulty.</li>
                                <li>Ouch.</li>
                            </ul>
                        </li>
                        <br />
                        <li>Now, silently say to yourself:
                            <ul>
                                <li>Suffering is a part of  life as a member of the university community.</li>
                                <li>I’m not alone. I am part of the university community</li>
                                <li>All members of my university community struggle in life, just like I do.</li>
                            </ul>
                        </li>
                        <br />
                        <li>Now, silently say to yourself:
                            <ul>
                                <li>May I be kind to myself as I am kind to other members of my university community.</li>
                            </ul>
                        </li>
                    </ol>
                    <br />
                    <p>You can also ask yourself, “What do I need to hear right now to express kindness to myself?” Is there a phrase that speaks to you in your particular situation? </p>
                    <p>For example:
                        <ul>
                            <li>Just as my university community, may I give myself the compassion that I need.</li>
                            <li>Just as my university community, may I learn to accept myself as I am.</li>
                            <li>Just as my university community, may I forgive myself.</li>
                            <li>Just as my university community, may I be strong.</li>
                            <li>Just as my university community, may I be patient.</li>
                        </ul>
                    </p>
                    <br />
                    <p><u><i>2.	Please complete this record sheet at the end of each day</i></u> </p>
                    <p>We would like you to note how often you practice self-compassion. You can set a time each day to practice the thought exercise for the academic-related issue written in Worksheet 1 or you can practice it when negative thoughts come to mind.  At the end of the day, please record how <u>many times</u>, <u>for how long</u> in total you practice self-compassion in the correspondent columns to indicate whether you focus on the academic-related issue written in Worksheet 1 or other negative thoughts, and write down any comments you may have related to your practice. You can download this record sheet and record your practice.&nbsp;
                        <b><u>Please make sure you have this sheet filled out and with you for the next session, as you will fill this information in the program.</u></b>
                    </p>
                </React.Fragment>
                :
                <React.Fragment>
                    <p><u><i>1.	Pratique l’exercice d’autocompassion suivant au cours de la prochaine semaine avant la dernière séance</i></u> </p>
                    <p>Cet exercice peut être utilisé à n’importe quel temps de la journée ou de la nuit, et t’aidera à te rappeler de ton appartenance à ta communauté, la bienveillance envers tous et la pleine conscience lorsque tu en auras le plus besoin.</p>
                    <ol>
                        <br />
                        <li>
                        Pense au&nbsp;
                            <b className={styles.colorPrimary} onClick={openDialogWithTemplateRef}>
                                <u>
                                    <i>problème</i>
                                </u>
                            </b>&nbsp;relié aux études écrit dans la fiche 1. Amène la situation à ton esprit, et observe si tu peux ressentir le stress et le malaise émotionnel dans ton corps.
                        </li>
                        <br />
                        <li>Maintenant, murmure à toi-même :
                            <ul>
                                <li>C’est un moment difficile.</li>
                                <li>Aïe, ça fait mal.</li>
                            </ul>
                        </li>
                        <br />
                        <li>Maintenant, murmure à toi-même :
                            <ul>
                                <li>Souffrir fait partie de la vie universitaire.</li>
                                <li>Je ne suis pas seul.e. Je fais partie de la communauté universitaire.</li>
                                <li>Tous les membres de ma communauté universitaire vivent des difficultés dans la vie, comme je le vis.</li>
                            </ul>
                        </li>
                        <br />
                        <li>Maintenant, murmure à toi-même :
                            <ul>
                                <li>Je peux être bienveillant.e envers moi-même comme je suis bienveillant.e envers les autres membres de ma communauté universitaire.</li>
                            </ul>
                        </li>
                    </ol>
                    <br />
                    <p>Tu peux aussi te demander « qu’ai-je besoin d’entendre maintenant pour exprimer de la bienveillance envers moi-même ? » Y a-t-il une phrase qui t’interpelle dans ton situation particulière ?</p>
                    <p>Par exemple:
                        <ul>
                            <li>Tout comme ma communauté universitaire, je peux m’accorder la compassion dont j’ai besoin.</li>
                            <li>Tout comme ma communauté universitaire, je peux m’accepter tel que je suis.</li>
                            <li>Tout comme ma communauté universitaire, je peux me pardonner.</li>
                            <li>Tout comme ma communauté universitaire, je peux être fort.e.</li>
                            <li>Tout comme ma communauté universitaire, je peux être patient.e.</li>
                        </ul>
                    </p>
                    <br />
                    <p><u><i>2.	Remplis la fiche d’enregistrement à la fin de chaque jour.</i></u> </p>
                    <p>Nous souhaitons que tu prennes note de la fréquence à laquelle tu pratiques l’autocompassion cette semaine. Tu peux te fixer du temps à chaque jour pour pratiquer l’exercice de pensée pour le problème relié aux études dans la fiche 1 ou tu peux le pratiquer quand tu as des pensées négatives qui te viennent à l’esprit. À la fin de la journée, note la fréquence et la durée de la pratique d’autocompassion. Tu peux indiquer si tu t’es concentré.e sur le problème relié aux études ou à d’autres pensées négatives.  Écris tout commentaire que tu aurais eu relié à l’exercice d’autocompassion. Tu peux télécharger cette fiche d’enregistrement et enregistrer ta pratique.&nbsp;
                        <b><u>Assure-toi d’avoir cette fiche remplie et avec toi pour la prochaine séance, puisque tu vas remplir cette information dans le programme.</u></b>
                    </p>
                </React.Fragment>
            }
        </BorderContent>
        <br />
        <Typography title={'content'} position={'left'} contentwidth={'100%'} color={'primary'}>
            {
                language === 'English' ?
                <div>Please download the template by using DOWNLOAD TEMPLATE button below to finish working on the table.
                </div>
                :
                <div>
                    {/* Need translate!. */}
                </div>
            }
        </Typography>


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
    </React.Fragment>
  );
};

export default Session3worksheet1q4Wording;