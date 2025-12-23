import Konva from 'konva';

export function exportCanvasToImage(
  stage: Konva.Stage | null,
  filename: string = 'holiday-card'
): void {
  if (!stage) {
    console.error('Stage not found');
    return;
  }

  try {
    // Hide transformer before export
    const transformer = stage.findOne('Transformer');
    const transformerVisible = transformer?.visible();
    if (transformer) {
      transformer.hide();
      stage.batchDraw();
    }

    const dataURL = stage.toDataURL({ 
      pixelRatio: 2,
      mimeType: 'image/png',
    });

    // Restore transformer visibility
    if (transformer && transformerVisible !== undefined) {
      transformer.visible(transformerVisible);
      stage.batchDraw();
    }

    const link = document.createElement('a');
    link.href = dataURL;
    link.download = `${filename}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error exporting canvas:', error);
  }
}
