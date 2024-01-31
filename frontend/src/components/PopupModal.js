import React from 'react';
import styles from './navbar.css'; // Import CSS file for styling

const PopupModal = ({ email, onClose }) => {
    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <span className={styles.close} onClick={onClose}>&times;</span>
                <h2>Email Details</h2>
                <p>{email.body}...</p>
            </div>
        </div>
    );
};

export default PopupModal;
