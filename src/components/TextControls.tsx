import React from 'react';
import { getRandomJoke } from '../data/jokes';
import { TextAlign, FontStyle } from '../types/card';
import styles from '../styles/CardEditor.module.css';

interface TextControlsProps {
  to: string;
  from: string;
  message: string;
  messageAlign: TextAlign;
  messageFontStyle: FontStyle;
  messageFontSize: number;
  onToChange: (value: string) => void;
  onFromChange: (value: string) => void;
  onMessageChange: (value: string) => void;
  onMessageAlignChange: (align: TextAlign) => void;
  onMessageFontStyleChange: (style: FontStyle) => void;
  onMessageFontSizeChange: (size: number) => void;
}

export const TextControls: React.FC<TextControlsProps> = ({
  to,
  from,
  message,
  messageAlign,
  messageFontStyle,
  messageFontSize,
  onToChange,
  onFromChange,
  onMessageChange,
  onMessageAlignChange,
  onMessageFontStyleChange,
  onMessageFontSizeChange,
}) => {
  const handleGenerateMessage = () => {
    const randomJoke = getRandomJoke();
    onMessageChange(randomJoke);
  };

  const toggleBold = () => {
    if (messageFontStyle === 'bold' || messageFontStyle === 'bold italic') {
      onMessageFontStyleChange(messageFontStyle === 'bold' ? 'normal' : 'italic');
    } else {
      onMessageFontStyleChange(messageFontStyle === 'normal' ? 'bold' : 'bold italic');
    }
  };

  const toggleItalic = () => {
    if (messageFontStyle === 'italic' || messageFontStyle === 'bold italic') {
      onMessageFontStyleChange(messageFontStyle === 'italic' ? 'normal' : 'bold');
    } else {
      onMessageFontStyleChange(messageFontStyle === 'normal' ? 'italic' : 'bold italic');
    }
  };

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Card Text</h2>
      
      <div className={styles.textInputGroup}>
        <label className={styles.textLabel}>To:</label>
        <input
          type="text"
          className={styles.textInput}
          placeholder="Recipient name"
          value={to}
          onChange={(e) => onToChange(e.target.value)}
        />
      </div>

      <div className={styles.textInputGroup}>
        <label className={styles.textLabel}>From:</label>
        <input
          type="text"
          className={styles.textInput}
          placeholder="Your name"
          value={from}
          onChange={(e) => onFromChange(e.target.value)}
        />
      </div>

      <div className={styles.textInputGroup}>
        <label className={styles.textLabel}>Message:</label>
        <textarea
          className={styles.textInput}
          placeholder="Your holiday message"
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          rows={4}
        />
        
        <div className={styles.messageControls}>
          <div className={styles.alignButtons}>
            <label className={styles.controlLabel}>Align:</label>
            <button
              className={`${styles.alignButton} ${messageAlign === 'left' ? styles.active : ''}`}
              onClick={() => onMessageAlignChange('left')}
              title="Left align"
            >
              L
            </button>
            <button
              className={`${styles.alignButton} ${messageAlign === 'center' ? styles.active : ''}`}
              onClick={() => onMessageAlignChange('center')}
              title="Center align"
            >
              C
            </button>
            <button
              className={`${styles.alignButton} ${messageAlign === 'right' ? styles.active : ''}`}
              onClick={() => onMessageAlignChange('right')}
              title="Right align"
            >
              R
            </button>
          </div>
          
          <div className={styles.styleButtons}>
            <label className={styles.controlLabel}>Style:</label>
            <button
              className={`${styles.styleButton} ${messageFontStyle.includes('bold') ? styles.active : ''}`}
              onClick={toggleBold}
              title="Bold"
            >
              <strong>B</strong>
            </button>
            <button
              className={`${styles.styleButton} ${messageFontStyle.includes('italic') ? styles.active : ''}`}
              onClick={toggleItalic}
              title="Italic"
            >
              <em>I</em>
            </button>
          </div>
          
          <div className={styles.sizeButtons}>
            <label className={styles.controlLabel}>Size:</label>
            <button
              className={styles.sizeButton}
              onClick={() => onMessageFontSizeChange(Math.max(8, messageFontSize - 2))}
              title="Decrease size"
            >
              −
            </button>
            <span className={styles.sizeDisplay}>{messageFontSize}px</span>
            <button
              className={styles.sizeButton}
              onClick={() => onMessageFontSizeChange(Math.min(48, messageFontSize + 2))}
              title="Increase size"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <button className={styles.generateButton} onClick={handleGenerateMessage}>
        GENERATE HOLIDAY MESSAGE
      </button>
    </div>
  );
};