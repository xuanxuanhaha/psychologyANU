import React, { useEffect, useState } from 'react';
import styles from './session5worksheet3b.module.css';

import Typography from '../../../ReusableComponents/Typography/Typography';
import BorderContent from '../../../ReusableComponents/BorderContent/BorderContent';
import Modal from 'react-modal';

const Session5Worksheet3BWording = (props) => {

    const { language } = props

  return (
    <React.Fragment>
         <br />
        <BorderContent className={styles.greyBorderContent}>
            {
                language === 'English' ?
                <React.Fragment>
                    <p><u>Next, do you have the Self-compassion exercise record sheet with you for this session? If not, please get it ready as you will need it for the exercise below. </u> </p>
                    <p>Please fill in the record sheet with the information you gathered about your self-compassion practice over the last week. </p>
                </React.Fragment>
                :
                <React.Fragment>
                    <p><u>Ensuite, as-tu la fiche d’enregistrement d’autocompassion avec toi pour cette séance ? Assure-toi de les avoir accessibles puisque tu en auras besoin pour l’exercice suivant.</u> </p>
                    <p>Remplis la fiche d’enregistrement avec les informations que tu as recueillies à propos de ta pratique d’autocompassion au courant de la dernière semaine.</p>
                </React.Fragment>
            }
        </BorderContent>
        <br />
        <br />
    </React.Fragment>
  );
};

export default Session5Worksheet3BWording;