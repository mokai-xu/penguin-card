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

    // Download the image directly
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

export async function shareCard(
  stage: Konva.Stage | null,
  shareUrl: string = 'http://penguin-card.onrender.com'
): Promise<void> {
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

    // Convert data URL to Blob
    const response = await fetch(dataURL);
    const blob = await response.blob();
    const file = new File([blob], 'holiday-card.png', { type: 'image/png' });

    // Use Web Share API if available
    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: 'Holiday Card',
          text: `Check out my holiday card! Create your own at ${shareUrl}`,
        });
        return;
      } catch (shareError: any) {
        // User cancelled or error occurred, fallback to text-only share
        if (shareError.name !== 'AbortError') {
          console.log('File sharing failed, trying text-only share');
        } else {
          return; // User cancelled
        }
      }
    }

    // Fallback: Try text-only share with link
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Holiday Card',
          text: `Check out my holiday card! Create your own at ${shareUrl}`,
        });
      } catch (shareError: any) {
        if (shareError.name !== 'AbortError') {
          // If share fails, copy link to clipboard
          try {
            await navigator.clipboard.writeText(shareUrl);
            alert(`Link copied to clipboard: ${shareUrl}`);
          } catch (clipboardError) {
            alert(`Please copy this link: ${shareUrl}`);
          }
        }
      }
    } else {
      // Fallback: Copy link to clipboard
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert(`Link copied to clipboard: ${shareUrl}`);
      } catch (clipboardError) {
        alert(`Please copy this link: ${shareUrl}`);
      }
    }
  } catch (error) {
    console.error('Error sharing card:', error);
    alert('Unable to share. Please try saving the card and sharing manually.');
  }
}
