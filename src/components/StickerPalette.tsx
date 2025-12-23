import React, { useState } from 'react';
import { stickers } from '../data/stickers';
import styles from '../styles/CardEditor.module.css';

interface StickerPaletteProps {
  onSelectSticker: (stickerId: string) => void;
}

const STICKERS_PER_PAGE = 8;

export const StickerPalette: React.FC<StickerPaletteProps> = ({ onSelectSticker }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(stickers.length / STICKERS_PER_PAGE);
  const startIndex = currentPage * STICKERS_PER_PAGE;
  const endIndex = startIndex + STICKERS_PER_PAGE;
  const visibleStickers = stickers.slice(startIndex, endIndex);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Pick a Sticker</h2>
      <div className={styles.stickerCarousel}>
        {currentPage > 0 && (
          <button className={styles.navButton} onClick={handlePrevious}>
            ←
          </button>
        )}
        <div className={styles.stickerGrid}>
          {visibleStickers.map((sticker) => (
            <button
              key={sticker.id}
              className={styles.stickerButton}
              onClick={() => onSelectSticker(sticker.id)}
              title={sticker.name}
            >
              {sticker.imagePath ? (
                <img
                  src={sticker.imagePath}
                  alt={sticker.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    imageRendering: 'pixelated',
                  }}
                />
              ) : (
                sticker.emoji
              )}
            </button>
          ))}
        </div>
        {currentPage < totalPages - 1 && (
          <button className={styles.navButton} onClick={handleNext}>
            →
          </button>
        )}
      </div>
    </div>
  );
};