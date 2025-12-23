import Konva from 'konva';

export function createUniqueId(): string {
  return `element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function getPixelRatio(): number {
  return window.devicePixelRatio || 1;
}

export function setupCanvasForExport(stage: Konva.Stage): HTMLCanvasElement | null {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return null;

  const width = stage.width();
  const height = stage.height();

  canvas.width = width;
  canvas.height = height;

  const stageData = stage.toDataURL({ pixelRatio: 1 });
  const img = new Image();
  img.src = stageData;
  
  return canvas;
}
