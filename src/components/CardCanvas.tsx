import React, { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Group, Rect, Text, Image as KonvaImage, Transformer } from 'react-konva';
import { Sticker, TextElement } from '../types/card';
import { templates } from '../data/templates';
import { stickers as stickerDefinitions } from '../data/stickers';

interface CardCanvasProps {
  selectedTemplate: string | null;
  stickers: Sticker[];
  textElements: TextElement[];
  selectedElement: string | null;
  onStickerUpdate: (id: string, updates: Partial<Sticker>) => void;
  onTextUpdate: (id: string, updates: Partial<TextElement>) => void;
  onSelectElement: (id: string | null) => void;
  canvasRef: React.RefObject<HTMLDivElement>;
  stageRef: React.RefObject<any>;
}

export const CardCanvas: React.FC<CardCanvasProps> = ({
  selectedTemplate,
  stickers,
  textElements,
  selectedElement,
  onStickerUpdate,
  onTextUpdate,
  onSelectElement,
  canvasRef,
  stageRef,
}) => {
  const transformerRef = useRef<any>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const updateSize = () => {
      if (canvasRef.current) {
        const container = canvasRef.current;
        const padding = window.innerWidth <= 768 ? 20 : window.innerWidth <= 480 ? 16 : 40;
        const maxWidth = Math.min(800, container.offsetWidth - padding);
        const aspectRatio = 4 / 3;
        setCanvasSize({
          width: Math.max(280, maxWidth), // Minimum width for mobile
          height: Math.max(210, maxWidth / aspectRatio), // Minimum height for mobile
        });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [canvasRef]);

  useEffect(() => {
    if (!stageRef.current) return;
    
    if (transformerRef.current && selectedElement) {
      const stage = stageRef.current;
      const selectedNode = stage.findOne(`#${selectedElement}`);
      
      if (selectedNode) {
        transformerRef.current.nodes([selectedNode]);
        transformerRef.current.getLayer().batchDraw();
      }
    } else if (transformerRef.current) {
      transformerRef.current.nodes([]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [selectedElement, stageRef]);

  const template = templates.find((t) => t.id === selectedTemplate) || templates[0];

  const StickerImageComponent: React.FC<{
    sticker: Sticker;
    imagePath: string;
    onSelectElement: (id: string | null) => void;
    onStickerDragEnd: (e: any, id: string) => void;
    onStickerTransformEnd: (e: any, id: string) => void;
  }> = ({ sticker, imagePath, onSelectElement, onStickerDragEnd, onStickerTransformEnd }) => {
    const [image, setImage] = useState<HTMLImageElement | null>(null);

    useEffect(() => {
      const img = new window.Image();
      img.crossOrigin = 'anonymous';
      img.src = imagePath;
      img.onload = () => {
        setImage(img);
      };
    }, [imagePath]);

    if (!image) {
      return null;
    }

    return (
      <KonvaImage
        id={sticker.id}
        image={image}
        x={sticker.x}
        y={sticker.y}
        width={sticker.width}
        height={sticker.height}
        draggable
        onClick={() => onSelectElement(sticker.id)}
        onTap={() => onSelectElement(sticker.id)}
        onDragEnd={(e) => onStickerDragEnd(e, sticker.id)}
        onTransformEnd={(e) => onStickerTransformEnd(e, sticker.id)}
      />
    );
  };

  const handleStickerDragEnd = (e: any, id: string) => {
    onStickerUpdate(id, {
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  const handleStickerTransformEnd = (e: any, id: string) => {
    const node = e.target;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    node.scaleX(1);
    node.scaleY(1);

    onStickerUpdate(id, {
      x: node.x(),
      y: node.y(),
      width: Math.max(20, node.width() * scaleX),
      height: Math.max(20, node.height() * scaleY),
    });
  };

  const handleTextDragEnd = (e: any, id: string) => {
    onTextUpdate(id, {
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  const handleTextTransformEnd = (e: any, id: string) => {
    const node = e.target;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    node.scaleX(1);
    node.scaleY(1);

    onTextUpdate(id, {
      x: node.x(),
      y: node.y(),
      width: Math.max(50, node.width() * scaleX),
      height: Math.max(20, node.height() * scaleY),
    });
  };

  const handleStageClick = (e: any) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      onSelectElement(null);
    }
  };

  return (
    <Stage
      ref={stageRef}
      width={canvasSize.width}
      height={canvasSize.height}
      style={{ 
        border: '1px solid #ddd',
        touchAction: 'none',
        maxWidth: '100%',
        height: 'auto',
      }}
      onClick={handleStageClick}
      onTap={handleStageClick}
    >
      <Layer>
        {/* Template Background */}
        <Group>
          {(() => {
            const templateStyle = template.style || 'double';
            
            // Super thick border
            if (templateStyle === 'thick') {
              return (
                <Rect
                  x={10}
                  y={10}
                  width={canvasSize.width - 20}
                  height={canvasSize.height - 20}
                  fill="#ffffff"
                  stroke={template.color}
                  strokeWidth={12}
                />
              );
            }
            
            // Polka dots border
            if (templateStyle === 'polka-dots') {
              const borderPadding = 25;
              const dotSize = 8;
              const spacing = 25;
              const dots: JSX.Element[] = [];
              let dotIndex = 0;

              // Top border dots
              for (let x = borderPadding; x < canvasSize.width - borderPadding; x += spacing) {
                dots.push(
                  <Group key={`top-${dotIndex++}`} x={x} y={borderPadding}>
                    <Rect
                      x={-dotSize / 2}
                      y={-dotSize / 2}
                      width={dotSize}
                      height={dotSize}
                      fill={template.color}
                      cornerRadius={dotSize / 2}
                    />
                  </Group>
                );
              }

              // Right border dots
              for (let y = borderPadding + spacing; y < canvasSize.height - borderPadding - spacing; y += spacing) {
                dots.push(
                  <Group key={`right-${dotIndex++}`} x={canvasSize.width - borderPadding} y={y}>
                    <Rect
                      x={-dotSize / 2}
                      y={-dotSize / 2}
                      width={dotSize} 
                      height={dotSize}
                      fill={template.color}
                      cornerRadius={dotSize / 2}
                    />
                  </Group>
                );
              }

              // Bottom border dots
              for (let x = canvasSize.width - borderPadding - spacing; x > borderPadding; x -= spacing) {
                dots.push(
                  <Group key={`bottom-${dotIndex++}`} x={x} y={canvasSize.height - borderPadding}>
                    <Rect
                      x={-dotSize / 2}
                      y={-dotSize / 2}
                      width={dotSize}
                      height={dotSize}
                      fill={template.color}
                      cornerRadius={dotSize / 2}
                    />
                  </Group>
                );
              }

              // Left border dots
              for (let y = canvasSize.height - borderPadding - spacing; y > borderPadding + spacing; y -= spacing) {
                dots.push(
                  <Group key={`left-${dotIndex++}`} x={borderPadding} y={y}>
                    <Rect
                      x={-dotSize / 2}
                      y={-dotSize / 2}
                      width={dotSize}
                      height={dotSize}
                      fill={template.color}
                      cornerRadius={dotSize / 2}
                    />
                  </Group>
                );
              }

              return (
                <>
                  <Rect
                    x={10}
                    y={10}
                    width={canvasSize.width - 20}
                    height={canvasSize.height - 20}
                    fill="#ffffff"
                    stroke={template.color}
                    strokeWidth={2}
                  />
                  {dots}
                </>
              );
            }
            
            // Stripes and triangles border
            if (templateStyle === 'stripes-triangles') {
              const borderPadding = 20;
              const stripeWidth = 16;
              const triangleSize = 16;
              const elements: JSX.Element[] = [];
              let elementIndex = 0;

              // Top border: triangles pointing up
              for (let x = borderPadding; x < canvasSize.width - borderPadding; x += triangleSize * 2) {
                elements.push(
                  <Group key={`top-tri-${elementIndex++}`} x={x} y={borderPadding}>
                    <Rect
                      x={-triangleSize / 2}
                      y={-triangleSize / 2}
                      width={triangleSize}
                      height={triangleSize}
                      fill={template.color}
                    />
                  </Group>
                );
              }

              // Right border: vertical stripes
              for (let y = borderPadding; y < canvasSize.height - borderPadding; y += stripeWidth * 2) {
                elements.push(
                  <Rect
                    key={`right-stripe-${elementIndex++}`}
                    x={canvasSize.width - borderPadding-5}
                    y={y}
                    width={stripeWidth}
                    height={stripeWidth}
                    fill={template.color}
                  />
                );
              }

              // Bottom border: triangles pointing down
              for (let x = borderPadding; x < canvasSize.width - borderPadding; x += triangleSize * 2) {
                elements.push(
                  <Group key={`bottom-tri-${elementIndex++}`} x={x} y={canvasSize.height - borderPadding}>
                    <Rect
                      x={-triangleSize / 2}
                      y={-triangleSize / 2}
                      width={triangleSize}
                      height={triangleSize}
                      fill={template.color}
                    />
                  </Group>
                );
              }

              // Left border: vertical stripes
              for (let y = borderPadding; y < canvasSize.height - borderPadding; y += stripeWidth * 2) {
                elements.push(
                  <Rect
                    key={`left-stripe-${elementIndex++}`}
                    x={borderPadding-10}
                    y={y}
                    width={stripeWidth}
                    height={stripeWidth}
                    fill={template.color}
                  />
                );
              }

              return (
                <>
                  <Rect
                    x={10}
                    y={10}
                    width={canvasSize.width - 20}
                    height={canvasSize.height - 20}
                    fill="#ffffff"
                    stroke={template.color}
                    strokeWidth={2}
                  />
                  {elements}
                </>
              );
            }
            
            // Default double border (or teal with dots)
            return (
              <>
                {/* Outer border */}
                <Rect
                  x={10}
                  y={10}
                  width={canvasSize.width - 20}
                  height={canvasSize.height - 20}
                  fill="#ffffff"
                  stroke={template.color}
                  strokeWidth={4}
                />
                {/* Inner border */}
                <Rect
                  x={20}
                  y={20}
                  width={canvasSize.width - 40}
                  height={canvasSize.height - 40}
                  fill="#ffffff"
                  stroke={template.color}
                  strokeWidth={2}
                />
                {/* Decorative dots for teal template */}
                {template.hasDots && (
                  <Group>
                    {(() => {
                      const dotSize = 6;
                      const spacing = 20;
                      const borderPadding = 25;
                      const dots: JSX.Element[] = [];
                      let dotIndex = 0;

                      // Top border dots
                      for (let x = borderPadding; x < canvasSize.width - borderPadding; x += spacing) {
                        dots.push(
                          <Rect
                            key={`top-${dotIndex++}`}
                            x={x}
                            y={borderPadding}
                            width={dotSize}
                            height={dotSize}
                            fill={template.color}
                          />
                        );
                      }

                      // Right border dots
                      for (let y = borderPadding + spacing; y < canvasSize.height - borderPadding - spacing; y += spacing) {
                        dots.push(
                          <Rect
                            key={`right-${dotIndex++}`}
                            x={canvasSize.width - borderPadding}
                            y={y}
                            width={dotSize}
                            height={dotSize}
                            fill={template.color}
                          />
                        );
                      }

                      // Bottom border dots
                      for (let x = canvasSize.width - borderPadding - spacing; x > borderPadding; x -= spacing) {
                        dots.push(
                          <Rect
                            key={`bottom-${dotIndex++}`}
                            x={x}
                            y={canvasSize.height - borderPadding}
                            width={dotSize}
                            height={dotSize}
                            fill={template.color}
                          />
                        );
                      }

                      // Left border dots
                      for (let y = canvasSize.height - borderPadding - spacing; y > borderPadding + spacing; y -= spacing) {
                        dots.push(
                          <Rect
                            key={`left-${dotIndex++}`}
                            x={borderPadding}
                            y={y}
                            width={dotSize}
                            height={dotSize}
                            fill={template.color}
                          />
                        );
                      }

                      return dots;
                    })()}
                  </Group>
                )}
              </>
            );
          })()}
        </Group>

        {/* Stickers */}
        {stickers.map((sticker) => {
          const stickerDef = stickerDefinitions.find(
            (s) => s.id === sticker.type
          );
          const imagePath = sticker.imagePath || stickerDef?.imagePath;
          
          if (imagePath) {
            return (
              <StickerImageComponent
                key={sticker.id}
                sticker={sticker}
                imagePath={imagePath}
                onSelectElement={onSelectElement}
                onStickerDragEnd={handleStickerDragEnd}
                onStickerTransformEnd={handleStickerTransformEnd}
              />
            );
          }
          
          return (
            <Text
              key={sticker.id}
              id={sticker.id}
              x={sticker.x}
              y={sticker.y}
              text={stickerDef?.emoji || sticker.emoji || '🎄'}
              fontSize={sticker.width}
              draggable
              onClick={() => onSelectElement(sticker.id)}
              onTap={() => onSelectElement(sticker.id)}
              onDragEnd={(e) => handleStickerDragEnd(e, sticker.id)}
              onTransformEnd={(e) => handleStickerTransformEnd(e, sticker.id)}
            />
          );
        })}

        {/* Text Elements */}
        {textElements.map((textEl) => {
          const getFontStyle = (fontStyle?: string, textType?: string) => {
            // Make "To:" and "From:" text bold
            if (textType === 'to' || textType === 'from') {
              const currentStyle = fontStyle || 'normal';
              if (currentStyle === 'normal' || currentStyle === '') return 'bold';
              if (currentStyle === 'italic') return 'bold italic';
              return currentStyle; // Already bold or bold italic
            }
            
            if (!fontStyle || fontStyle === 'normal') return 'normal';
            if (fontStyle === 'bold') return 'bold';
            if (fontStyle === 'italic') return 'italic';
            if (fontStyle === 'bold italic') return 'bold italic';
            return 'normal';
          };

          const getAlign = (align?: string) => {
            if (!align) return 'left';
            return align as 'left' | 'center' | 'right';
          };

          const getFontSize = () => {
            // Use fontSize from textEl if available (for message text), otherwise default
            if (textEl.fontSize) return textEl.fontSize;
            // Default sizes for "To:" and "From:" vs message
            return textEl.type === 'message' ? 16 : 16;
          };

          return (
            <Text
              key={textEl.id}
              id={textEl.id}
              x={textEl.x}
              y={textEl.y}
              text={textEl.text}
              fontSize={getFontSize()}
              fontFamily="Roboto Mono"
              fontStyle={getFontStyle(textEl.fontStyle, textEl.type)}
              fill="#212126"
              draggable
              width={textEl.width}
              align={getAlign(textEl.align)}
              wrap="word"
              onClick={() => onSelectElement(textEl.id)}
              onTap={() => onSelectElement(textEl.id)}
              onDragEnd={(e) => handleTextDragEnd(e, textEl.id)}
              onTransformEnd={(e) => handleTextTransformEnd(e, textEl.id)}
            />
          );
        })}

        {/* Transformer for selected element */}
        <Transformer
          ref={transformerRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (Math.abs(newBox.width) < 20 || Math.abs(newBox.height) < 20) {
              return oldBox;
            }
            return newBox;
          }}
        />
      </Layer>
    </Stage>
  );
};