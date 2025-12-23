import { useRef, useState, useEffect } from 'react';
import { CardCanvas } from './components/CardCanvas';
import { TemplateSelector } from './components/TemplateSelector';
import { StickerPalette } from './components/StickerPalette';
import { TextControls } from './components/TextControls';
import { SaveButton } from './components/SaveButton';
import { Sticker, TextElement, TextAlign, FontStyle } from './types/card';
import { stickers } from './data/stickers';
import { createUniqueId } from './utils/canvasHelpers';
import { exportCanvasToImage, shareCard } from './utils/canvasExport';
import styles from './styles/CardEditor.module.css';

function App() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<any>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>('green-border');
  const [stickersState, setStickersState] = useState<Sticker[]>([]);
  const [textElements, setTextElements] = useState<TextElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [toText, setToText] = useState('');
  const [fromText, setFromText] = useState('');
  const [messageText, setMessageText] = useState('');
  const [messageAlign, setMessageAlign] = useState<TextAlign>('left');
  const [messageFontStyle, setMessageFontStyle] = useState<FontStyle>('normal');
  const [messageFontSize, setMessageFontSize] = useState<number>(16);

  // Update text elements when input fields change
  useEffect(() => {
    const newTextElements: TextElement[] = [];

    if (toText.trim()) {
      const existing = textElements.find((el) => el.type === 'to');
      newTextElements.push({
        id: existing?.id || createUniqueId(),
        type: 'to',
        text: `To: ${toText}`,
        x: existing?.x || 50,
        y: existing?.y || 50,
        width: existing?.width || 200,
        height: existing?.height || 30,
      });
    }

    if (fromText.trim()) {
      const existing = textElements.find((el) => el.type === 'from');
      newTextElements.push({
        id: existing?.id || createUniqueId(),
        type: 'from',
        text: `From: ${fromText}`,
        x: existing?.x || 50,
        y: existing?.y || 400,
        width: existing?.width || 200,
        height: existing?.height || 30,
      });
    }

    if (messageText.trim()) {
      const existing = textElements.find((el) => el.type === 'message');
      newTextElements.push({
        id: existing?.id || createUniqueId(),
        type: 'message',
        text: messageText,
        x: existing?.x || 50,
        y: existing?.y || 200,
        width: existing?.width || 500,
        height: existing?.height || 100,
        align: messageAlign,
        fontStyle: messageFontStyle,
        fontSize: messageFontSize,
      });
    }

    // Preserve other text elements
    const otherElements = textElements.filter(
      (el) => !['to', 'from', 'message'].includes(el.type)
    );

    setTextElements([...otherElements, ...newTextElements]);
  }, [toText, fromText, messageText, messageAlign, messageFontStyle, messageFontSize]);

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handleSelectSticker = (stickerId: string) => {
    const stickerDef = stickers.find((s) => s.id === stickerId);
    if (!stickerDef) return;

    // Generate slightly random position to avoid overlap
    // Base position with random offset between -30 and +30 pixels
    const baseX = 200;
    const baseY = 150;
    const randomOffsetX = Math.floor(Math.random() * 60) - 30; // -30 to +30
    const randomOffsetY = Math.floor(Math.random() * 60) - 30; // -30 to +30

    const newSticker: Sticker = {
      id: createUniqueId(),
      type: stickerId,
      emoji: stickerDef.emoji,
      imagePath: stickerDef.imagePath,
      x: baseX + randomOffsetX,
      y: baseY + randomOffsetY,
      width: stickerDef.defaultSize,
      height: stickerDef.defaultSize,
    };

    setStickersState([...stickersState, newSticker]);
    setSelectedElement(newSticker.id);
  };

  const handleStickerUpdate = (id: string, updates: Partial<Sticker>) => {
    setStickersState((prev) =>
      prev.map((sticker) => (sticker.id === id ? { ...sticker, ...updates } : sticker))
    );
  };

  const handleTextUpdate = (id: string, updates: Partial<TextElement>) => {
    setTextElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, ...updates } : el))
    );
  };

  const handleSave = () => {
    if (stageRef.current) {
      exportCanvasToImage(stageRef.current);
    }
  };

  const handleShare = async () => {
    if (stageRef.current) {
      await shareCard(stageRef.current, 'https://penguin-card.onrender.com');
    }
  };

  // Handle keyboard delete
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedElement) {
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
          return;
        }
        
        setStickersState((prev) => prev.filter((s) => s.id !== selectedElement));
        setTextElements((prev) => prev.filter((el) => el.id !== selectedElement));
        setSelectedElement(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedElement]);


  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerBox}>
          <h1>Holiday Card Generator</h1>
          <p className={styles.subtitle}>Make a card using my favourite assets! Or check out  <a href="https://penguin-vibe.onrender.com" target="_blank" rel="noopener noreferrer"> Penguin Vibe</a></p>
       
        </div>
      </header>

      <div className={styles.mainContent}>
        <div className={styles.canvasContainer} ref={canvasRef}>
          <CardCanvas
            selectedTemplate={selectedTemplate}
            stickers={stickersState}
            textElements={textElements}
            selectedElement={selectedElement}
            onStickerUpdate={handleStickerUpdate}
            onTextUpdate={handleTextUpdate}
            onSelectElement={setSelectedElement}
            canvasRef={canvasRef}
            stageRef={stageRef}
          />
        </div>

        <div className={styles.controls}>
          <TemplateSelector
            selectedTemplate={selectedTemplate}
            onSelectTemplate={handleSelectTemplate}
          />

          <StickerPalette onSelectSticker={handleSelectSticker} />

          <TextControls
            to={toText}
            from={fromText}
            message={messageText}
            messageAlign={messageAlign}
            messageFontStyle={messageFontStyle}
            messageFontSize={messageFontSize}
            onToChange={setToText}
            onFromChange={setFromText}
            onMessageChange={setMessageText}
            onMessageAlignChange={setMessageAlign}
            onMessageFontStyleChange={setMessageFontStyle}
            onMessageFontSizeChange={setMessageFontSize}
          />

          <SaveButton onSave={handleSave} onShare={handleShare} />
        </div>
      </div>
    </div>
  );
}

export default App;