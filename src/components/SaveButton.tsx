import React from 'react';
import styles from '../styles/CardEditor.module.css';

interface SaveButtonProps {
  onSave: () => void;
}

export const SaveButton: React.FC<SaveButtonProps> = ({ onSave }) => {
  return (
    <button className={styles.saveButton} onClick={onSave}>
      SAVE CARD
    </button>
  );
};
