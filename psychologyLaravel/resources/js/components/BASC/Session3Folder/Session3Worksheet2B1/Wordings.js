import React, { useEffect, useState } from 'react';
import styles from './session3worksheet2b.module.css';

import Typography from '../../../ReusableComponents/Typography/Typography';
import BorderContent from '../../../ReusableComponents/BorderContent/BorderContent';
import Modal from 'react-modal';

const Wordings = (props) => {

    const { language, groupA, groupB, groupC, questionGoal } = props

    const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);


    const openDialogWithTemplateRef = () => {
        setIsGoalModalOpen(true);
    };

    const closeModal = () => {
        setIsGoalModalOpen(false);
    };

  return (
    <React.Fragment>
        <BorderContent>
            {
                language === 'English' ?
                <div>
                    Consider the 
                    <b onClick={openDialogWithTemplateRef}>
                        <u>
                        <i> GOALS </i> 
                        </u>
                    </b>
                    written in Exercise B-1 in Session 2. What are some activities you can do to help you achieve each of those goals? You mentioned three groups
                    {groupA ? <b> {groupA}, </b> : ''} {groupB ? <b>{groupB}</b> : ''}{groupC ? ', and' : ''} {groupC ? <b>{groupC}</b> : null}
                    , which may have resources to help you achieve your goals. As such, when thinking about the activities below, consider what group resources
                    you could use to help you achieve your goal. The following questions should help you think about this: 
                </div>
                :
                <div>
                    Considère les 
                    <b onClick={openDialogWithTemplateRef}>
                        <u>
                        <i> objectifs </i> 
                        </u>
                    </b>
                      écrits dans l’exercice B-4 dans la séance 2. Quelles sont des activités que tu pourrais faire pour t’aider à accomplir chacun de ces objectifs ? Tu as mentionné trois groupes
                    {groupA ? <b> {groupA}, </b> : ''} {groupB ? <b>{groupB}</b> : ''}{groupC ? ', and' : ''} {groupC ? <b>{groupC}</b> : null}
                    , qui peuvent avoir des ressources pour t’aider à accomplir tes objectifs. Ainsi, quand tu penses par rapport aux activités ci-dessous, considère quelles ressources sont accessibles chez ces groupes
                    que tu pourrais utiliser pour t’aider à accomplir tes objectifs. Les questions suivantes devraient t’aider à y réfléchir.
                </div>
            }
            <br />
            <ul>
            {
                language === 'English' ?
                <li>What exactly do you want to do? This is the activity plan to achieve your goal. Please consider what group resources you plan to use to achieve this goal. </li> :
                <li>Que veux-tu faire exactement ? Voici le planificateur d’activités pour accomplir ton objectif. Considère quelles ressources de groupes tu planifies utiliser pour accomplir cet objectif.</li>
            }
            {
                language === 'English' ?
                <li>What is the duration of the activity (when and for how long)? Please consider what group resources you plan to use when thinking of the duration of the activity. </li> :
                <li>Quelle est la durée de l’activité (quand et pour combien de temps) ? Considère quelles ressources de groupes tu planifies utiliser lorsque tu réfléchis à la durée de l’activité.</li>
            }
            {
                language === 'English' ?
                <li>How confident are you in accomplishing the activity? </li> :
                <li>À quel point es-tu confiant.e dans la réalisation de l'activité ?</li>
            }
            {
                language === 'English' ?
                <li>Where will you carry out the activity and is it using groups resources? </li> :
                <li>Où vas-tu réaliser l’activité et implique-t-elle des ressources des groupes ?</li>
            }
            </ul>
        </BorderContent>
        <br />
        <Typography title={'content'} position={'left'} contentwidth={'100%'}>
            {
                language === 'English' ?
                <div>Use the chart provided below to plan your <b>activities</b>. For each <b>activity</b>, indicate your confidence in accomplishing the activity by marking <b>“x” </b>on the scale provided (0 = not at all confident, 10 = extremely confident).</div>
                :
                <div>Utilise le tableau ci-dessous pour planifier tes activités. Pour chaque activité, indique ton niveau de confiance dans l’accomplissement de l’activité en utilisant l’échelle fournie (0 = pas confiant du tout, 10 = extrêmement confiant).</div>
            }
        </Typography>
        <br />

        <Typography title={'content'} position={'left'} contentwidth={'100%'} color={'primary'}>
            {
                language === 'English' ?
                <div>Please download the template by using DOWNLOAD TEMPLATE button below to finish working on the table.
                </div>
                :
                <div></div>
            }
        </Typography>


        <Modal
            isOpen={isGoalModalOpen}
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
            {questionGoal}
        </Modal>
    </React.Fragment>
  );
};

export default Wordings;