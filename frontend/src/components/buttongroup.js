// ButtonGroup.jsx

import React, { useState } from 'react';
import styles from '../pages/Home/styles.module.css'; // Import CSS Module

const ButtonGroup = ({ invoice,handleCustomizeClick,handleScheduleClick, handleRemindClick }) => {
  const [showButtons, setShowButtons] = useState(false);

  const handleHover = () => {
    setShowButtons(true);
  };

  const handleLeave = () => {
    setShowButtons(false);
  };

  return (
    <div className={styles.buttonContainer}>
        {
            invoice.status!='paid' ?
            <div className={styles.buttonGroup}>
        <div
          className={`${styles.hiddenButtons} ${showButtons ? styles.visible : ''}`}
          onMouseLeave={handleLeave}
          >
          <button onClick={() => handleRemindClick(invoice)} >
            Remind
          </button>
          <button onClick={() => handleCustomizeClick(invoice)} >
            Customize
          </button>
          <button onClick={() => handleScheduleClick(invoice)} >
            Schedule
          </button>
        </div>
        <button
          className={`${styles.showOnHover} ${showButtons ? styles.hide : ''}`}
          onMouseOver={handleHover}
          >
          send Reminder
        </button>
      </div>
      :
      <div className={styles.showOnHover}>
          Successful
        </div>
        }
    </div>
  );
};

export default ButtonGroup;
