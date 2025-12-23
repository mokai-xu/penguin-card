import React from 'react';
import styles from '../styles/CardEditor.module.css';

interface SaveButtonProps {
  onDownload: () => void;
  onShare: () => void;
}

export const SaveButton: React.FC<SaveButtonProps> = ({ onDownload, onShare }) => {
  return (
    <div className={styles.actionButtons}>
      <button className={styles.downloadButton} onClick={onDownload}>
        DOWNLOAD
      </button>
      <button className={styles.shareButton} onClick={onShare}>
        SHARE
      </button>
    </div>
  );
};
