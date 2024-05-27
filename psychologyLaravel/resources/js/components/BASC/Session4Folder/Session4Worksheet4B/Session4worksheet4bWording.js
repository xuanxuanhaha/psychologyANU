import React, { useEffect, useState } from 'react';
import styles from './session4worksheet4b.module.css';

import Typography from '../../../ReusableComponents/Typography/Typography';
import BorderContent from '../../../ReusableComponents/BorderContent/BorderContent';
import Modal from 'react-modal';
import { jsPDF } from 'jspdf';

const Session3worksheet1q4Wording = (props) => {

    const { language, questionIssue } = props

    const [isModalOpen, setIsModalOpen] = useState(false);


    const openDialogWithTemplateRef = () => {
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      };



const generatePDF = () => {
    const doc = new jsPDF();
    let yPosition = 10; // Initial y position
    const lineHeight = 5; // Line height for spacing
    const pageHeight = doc.internal.pageSize.height; // Get page height

    // Function to check if new content exceeds page height
    const isNewPageNeeded = (heightToAdd) => {
        return yPosition + heightToAdd > pageHeight - 10; // Leave some margin at the bottom
    };
    doc.setFontSize(14); // Set default font size
    doc.setFont('helvetica', 'normal'); // Set default font weight

    // Add first text
    doc.text('Self-Compassion Homework Tasks', 10, yPosition);
    yPosition += lineHeight + 5; // Increase y position

    const pageWidth = doc.internal.pageSize.width; // Get page width
  const textWidth = pageWidth - 30; // Adjust width to leave 15px padding on each side

     // Reset font size and weight for subsequent text
    doc.setFontSize(12); // Set default font size
    doc.setFont('helvetica', 'normal'); // Set default font weight

    // Add second text
    const text2 = '1. Please practice the following self-compassion exercise over the next week before the final session:' +
    '\n\nThis exercise can be used any time of day or night, and will help you remember common humanity, self-kindness, and mindfulness when you need it most.' + 
    '\n\n1. Think about the academic-related issue written in Worksheet 1. Call the situation to mind, and see if you can actually feel the stress and emotional discomfort in your body.' +
    '\n\n2. Now, silently say to yourself:'+
    '\n\n• This is a moment of difficulty.' +
    '\n\n• Ouch.' +
    '\n\n3. Now, silently say to yourself:' +
    '\n\n• Suffering is a part of life' +
    '\n\n• I’m not alone. '+
    '\n\n• We all struggle in our lives.'+
    '\n\n4. Now, silently say to yourself:'+
    '\n\n• May I be kind to myself.' +
    '\n\nYou can also ask yourself, “What do I need to hear right now to express kindness to myself?” Is there a phrase that speaks to you in your particular situation?'+
    '\n\nFor example:'+
    '\n\n• May I give myself the compassion that I need.'+
    '\n\n• My I learn to accept myself as I am.'+
    '\n\n• May I forgive myself.'+
    '\n\n• May I be strong.'+
    '\n\n• May I be patient.'  
    ;

  // Split text2 into lines to fit within page width
  const text2Lines = doc.splitTextToSize(text2, doc.internal.pageSize.width - 20); // Adjust width based on page layout and font size

  text2Lines.forEach(line => {
    // Check if adding this line will exceed page height
    if (isNewPageNeeded(lineHeight)) {
      doc.addPage(); // Add new page
      yPosition = 10; // Reset y position
    }
    doc.text(line, 10, yPosition);
    yPosition += lineHeight;
  });

  
//   const text2Lines = doc.splitTextToSize(text2, 180); // Split text into lines to fit in the page width
//   doc.text(text2Lines, 10, yPosition);
//   yPosition += text2Lines.length * lineHeight; // Increase y position based on the number of lines

  return doc;
  };

  const handleDownload = () => {
    const doc = generatePDF();
    doc.save('document.pdf');
  };

    
  return (
    <React.Fragment>
         <br />
        <BorderContent className={styles.greyBorderContent}>
        <button className={styles.downloadbtn} onClick={handleDownload}>Download Script</button>

            {
                language === 'English' ?
                <React.Fragment>
                    <p><u><i>1.	Please practice the following self-compassion exercise over the next week before the final session:</i></u> </p>
                    <p>This exercise can be used any time of day or night, and will help you remember common humanity, self-kindness, and mindfulness when you need it most.</p>
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
                                <li>Suffering is a part of life</li>
                                <li>I’m not alone.</li>
                                <li>We all struggle in our lives.</li>
                            </ul>
                        </li>
                        <br />
                        <li>Now, silently say to yourself:
                            <ul>
                                <li>May I be kind to myself.</li>
                            </ul>
                        </li>
                    </ol>
                    <br />
                    <p>You can also ask yourself, “What do I need to hear right now to express kindness to myself?” Is there a phrase that speaks to you in your particular situation? </p>
                    <p>For example:
                        <ul>
                            <li>May I give myself the compassion that I need.</li>
                            <li>My I learn to accept myself as I am.</li>
                            <li>May I forgive myself.</li>
                            <li>May I be strong.</li>
                            <li>May I be patient.</li>
                        </ul>
                    </p>
                    <br />
                    <p><u><i>2.	Please complete this record sheet at the end of each day</i></u> </p>
                    <p>We would like you to note how often you practice self-compassion. You can set a time each day to practice the thought exercise for the academic-related issue written in Worksheet 1 or you can practice it when negative thoughts come to mind.  At the end of the day, please record <u>how many times</u>, <u>for how long</u> in total you practice self-compassion in the correspondent columns to indicate whether you focus on the academic-related issue written in Worksheet 1 or other negative thoughts, and write down any comments you may have related to you practice. You can download this record sheet and record your practice.&nbsp;
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