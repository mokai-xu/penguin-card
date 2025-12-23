import React from 'react';
import styles from '../styles/CardEditor.module.css';

interface SaveButtonProps {
  onSave: () => void;
  onShare: () => void;
}

export const SaveButton: React.FC<SaveButtonProps> = ({ onSave, onShare }) => {
  return (
    <div className={styles.actionButtons}>
      <button className={styles.saveButton} onClick={onSave}>
        SAVE CARD
      </button>
      <button className={styles.shareButton} onClick={onShare}>
        SHARE CARD
      </button>
    </div>
  );
};
