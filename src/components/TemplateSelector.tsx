import React, { useState } from 'react';
import { Template } from '../types/card';
import { templates } from '../data/templates';
import styles from '../styles/CardEditor.module.css';

interface TemplateSelectorProps {
  selectedTemplate: string | null;
  onSelectTemplate: (templateId: string) => void;
}

const TEMPLATES_PER_PAGE = 4;

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  onSelectTemplate,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(templates.length / TEMPLATES_PER_PAGE);
  const startIndex = currentPage * TEMPLATES_PER_PAGE;
  const endIndex = startIndex + TEMPLATES_PER_PAGE;
  const visibleTemplates = templates.slice(startIndex, endIndex);

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
      <h2 className={styles.sectionTitle}>Choose a Template</h2>
      <div className={styles.templateGrid}>
        {currentPage > 0 && (
          <button className={styles.navButton} onClick={handlePrevious}>
            ←
          </button>
        )}
        {visibleTemplates.map((template) => (
          <TemplatePreview
            key={template.id}
            template={template}
            isSelected={selectedTemplate === template.id}
            onClick={() => onSelectTemplate(template.id)}
          />
        ))}
        {currentPage < totalPages - 1 && (
          <button className={styles.navButton} onClick={handleNext}>
            →
          </button>
        )}
      </div>
    </div>
  );
};

interface TemplatePreviewProps {
  template: Template;
  isSelected: boolean;
  onClick: () => void;
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({
  template,
  isSelected,
  onClick,
}) => {
  const templateStyle = template.style || 'double';
  
  const renderPreviewContent = () => {
    if (templateStyle === 'thick') {
      return (
        <div
          className={styles.templateInner}
          style={{
            borderColor: template.color,
            borderWidth: '6px',
          }}
        />
      );
    }
    
    if (templateStyle === 'polka-dots') {
      return (
        <>
          <div
            className={styles.templateInner}
            style={{
              borderColor: template.color,
            }}
          />
          <div className={styles.templateDots}>
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={styles.templateDot}
                style={{
                  background: template.color,
                  borderRadius: '50%',
                  width: '6px',
                  height: '6px',
                }}
              />
            ))}
          </div>
        </>
      );
    }
    
    if (templateStyle === 'stripes-triangles') {
      return (
        <>
          <div
            className={styles.templateInner}
            style={{
              borderColor: template.color,
            }}
          />
          <div style={{
            position: 'absolute',
            top: '2px',
            left: '2px',
            right: '2px',
            display: 'flex',
            gap: '2px',
          }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: '4px',
                  height: '4px',
                  background: template.color,
                }}
              />
            ))}
          </div>
        </>
      );
    }
    
    // Default double border
    return (
      <>
        <div
          className={styles.templateInner}
          style={{
            borderColor: template.color,
          }}
        />
        {template.hasDots && (
          <div className={styles.templateDots}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={styles.templateDot}
                style={{ background: template.color }}
              />
            ))}
          </div>
        )}
      </>
    );
  };
  
  return (
    <div
      className={`${styles.templatePreview} ${isSelected ? styles.selected : ''}`}
      style={{
        borderColor: template.color,
        color: template.color,
      }}
      onClick={onClick}
    >
      {renderPreviewContent()}
    </div>
  );
};