export interface Sticker {
  id: string;
  type: string;
  emoji?: string;
  imagePath?: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export type TextAlign = 'left' | 'center' | 'right';
export type FontStyle = 'normal' | 'bold' | 'italic' | 'bold italic';

export interface TextElement {
  id: string;
  type: 'to' | 'from' | 'message';
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  align?: TextAlign;
  fontStyle?: FontStyle;
  fontSize?: number;
}

export type TemplateStyle = 'double' | 'thick' | 'polka-dots' | 'stripes-triangles';

export interface Template {
  id: string;
  name: string;
  color: string;
  style?: TemplateStyle;
  hasDots?: boolean; // Deprecated, use style instead
}

export interface CardState {
  selectedTemplate: string | null;
  stickers: Sticker[];
  textElements: TextElement[];
  selectedElement: string | null;
}
