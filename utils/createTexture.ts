// src/utils/createTexture.ts

import Konva from 'konva';
import { CanvasTexture } from 'three';
import * as THREE from 'three';

interface CardData {
  title: string;
  badge: string;
  description: string;
  tags: string[];
  date: string;
  image?: string;
}

// Dummy container for Konva Stage (required by Konva, but not attached to DOM)
const konvaContainer = document.createElement('div');
konvaContainer.style.display = 'none';
if (!document.body.contains(konvaContainer)) {
  document.body.appendChild(konvaContainer);
}

const cardWidth = 512;
const cardHeight = 512;
const padding = 30;

// Helper to create a Konva stage and layer for a new texture
const createKonvaLayer = () => {
  const stage = new Konva.Stage({
    container: konvaContainer,
    width: cardWidth,
    height: cardHeight
  });
  const layer = new Konva.Layer();
  stage.add(layer);

  return { stage, layer };
};

//Generate Foreground Texture

//This function is responsible for drawing all the visible elements of your card, like the title, badge, image, tags, and date.

export async function generateForegroundTexture(data: CardData): Promise<CanvasTexture> {
  const { layer } = createKonvaLayer();

  // Card background and border (transparent for foreground to show background)
  const foregroundRect = new Konva.Rect({
    x: 0,
    y: 0,
    width: cardWidth,
    height: cardHeight,
    fill: 'rgba(0,0,0,0)', // Transparent background
    stroke: 'rgba(60, 60, 60, 1)', // Subtle white stroke
    strokeWidth: 1
  });
  layer.add(foregroundRect);

  let currentY = padding;

  // Title Text
  const titleText = new Konva.Text({
    text: data.title,
    x: padding,
    y: currentY,
    fontSize: 24,
    fontFamily: 'Arial, sans-serif',
    fill: 'white',
    wrap: 'none',
    ellipsis: true
  });

  let titleMaxWidth = cardWidth - padding * 2;
  let headerHeight = titleText.height();

  // Badge (if present)
  /*   if (data.badge) {
    const badgeTextNode = new Konva.Text({
      text: data.badge.toUpperCase(),
      fontSize: 24,
      fontFamily: 'Arial, sans-serif',
      fill: 'black',
      padding: 10,
      align: 'center',
      verticalAlign: 'middle'
    });
    const badgeWidth = badgeTextNode.width() + 20; // Add padding to badge width
    const badgeHeight = badgeTextNode.height();
    headerHeight = Math.max(headerHeight, badgeHeight); // Ensure header height accommodates badge

    titleMaxWidth = cardWidth - padding * 2 - badgeWidth - 20; // Adjust title max width
    titleText.width(titleMaxWidth); // Apply adjusted width to title

    const badgeRect = new Konva.Rect({
      x: cardWidth - padding - badgeTextNode.width(),
      y: currentY,
      width: badgeTextNode.width(),
      height: badgeTextNode.height(),
      cornerRadius: 10,
      fill: 'rgba(255, 255, 255, 1)' // White background for badge
    });

    badgeTextNode.x(cardWidth - padding - badgeTextNode.width());
    badgeTextNode.y(currentY);

    layer.add(badgeRect);
    layer.add(badgeTextNode);
  } else {
    titleText.width(titleMaxWidth); 
  } */

  layer.add(titleText);

  currentY += headerHeight + 30; // Move Y cursor down

  const topElementsMaxY = currentY;
  const bottomReservedSpace = 100;
  const availableImageHeight = cardHeight - topElementsMaxY - bottomReservedSpace;
  const availableImageWidth = cardWidth - padding * 2;

  // Image Loading and Placement
  const imageObj = new Image();
  imageObj.crossOrigin = 'Anonymous';
  imageObj.src = data.image || '/photo.png'; // Fallback image

  const loadImagePromise = new Promise<void>(imgResolve => {
    imageObj.onload = () => {
      let imgWidth = imageObj.naturalWidth;
      let imgHeight = imageObj.naturalHeight;
      const naturalAspectRatio = imgWidth / imgHeight;

      // Scale image to fit within available space, maintaining aspect ratio
      if (imgWidth > availableImageWidth || imgHeight > availableImageHeight) {
        if (availableImageWidth / naturalAspectRatio <= availableImageHeight) {
          imgWidth = availableImageWidth;
          imgHeight = availableImageWidth / naturalAspectRatio;
        } else {
          imgHeight = availableImageHeight;
          imgWidth = availableImageHeight * naturalAspectRatio;
        }
      }

      const imageX = padding + (availableImageWidth - imgWidth) / 2;
      const imageY = topElementsMaxY + (availableImageHeight - imgHeight) / 2;

      const imageNode = new Konva.Image({
        x: imageX,
        y: imageY,
        width: imgWidth,
        height: imgHeight,
        image: imageObj,
        cornerRadius: 10 // Rounded corners for the image
      });
      layer.add(imageNode);
      imgResolve();
    };

    imageObj.onerror = () => {
      console.error('Failed to load foreground image:', imageObj.src);
      // Placeholder text on image load error
      const placeholderText = new Konva.Text({
        text: 'Image Error',
        x: cardWidth / 2,
        y: cardHeight / 2 - 50,
        fontSize: 30,
        fontFamily: 'Arial',
        fill: 'gray',
        align: 'center',
        verticalAlign: 'middle',
        width: cardWidth
      });
      layer.add(placeholderText);
      imgResolve(); // Resolve to allow card generation to continue
    };
  });

  await loadImagePromise; // Wait for the image to load or fail

  // Tags
  let currentXForTags = padding;
  const tagFontSize = 16;
  const tagPaddingX = 15;
  const tagPaddingY = 8;
  const tagGap = 10;

  const tagsY = cardHeight - padding - tagFontSize - tagPaddingY;
  data.tags.forEach(tagText => {
    const tagLabel = new Konva.Text({
      text: `#${tagText.toUpperCase()}`,
      fontSize: tagFontSize,
      fontFamily: 'Helvetica, Arial, sans-serif',
      fill: 'white',
      padding: tagPaddingY / 2
    });
    const tagShape = new Konva.Rect({
      x: currentXForTags,
      y: tagsY,
      width: tagLabel.width() + tagPaddingX,
      height: tagLabel.height() + tagPaddingY,

      fill: 'rgba(248,250, 252, 0.15)', // White background for tags
      cornerRadius: 999
    });
    layer.add(tagShape);
    tagLabel.x(tagShape.x() + (tagShape.width() - tagLabel.width()) / 2);
    tagLabel.y(tagShape.y() + (tagShape.height() - tagLabel.height()) / 2);
    layer.add(tagLabel);
    currentXForTags += tagShape.width() + tagGap;
  });

  // Date
  const dateText = new Konva.Text({
    text: data.date,
    fontSize: 20,
    fontFamily: 'Arial, sans-serif',
    fill: 'rgba(255, 255, 255, 1)' // White date text
  });
  dateText.x(cardWidth - padding - dateText.width());
  dateText.y(cardHeight - padding - dateText.height());
  layer.add(dateText);

  layer.draw();
  const foregroundCanvasElement = layer.canvas._canvas;
  const foregroundTexture = new CanvasTexture(foregroundCanvasElement);
  foregroundTexture.needsUpdate = true;
  foregroundTexture.colorSpace = THREE.SRGBColorSpace;

  return foregroundTexture;
}

//Generate Background Texture

//This function creates the blurred background effect for your card, typically using a larger, blurred version of the main image or a solid color fallback.

export async function generateBackgroundTexture(data: CardData): Promise<CanvasTexture> {
  console.log('Background texture generated!'); // Log to confirm when it's called
  const { layer } = createKonvaLayer();

  // Background rectangle (will be covered by blurred image or fallback)
  const backgroundRect = new Konva.Rect({
    x: 0,
    y: 0,
    width: cardWidth,
    height: cardHeight,
    fill: 'rgba(0,0,0,0)' // Start with transparent, image/fallback will fill
  });
  layer.add(backgroundRect);

  const backgroundImageObj = new Image();
  backgroundImageObj.crossOrigin = 'Anonymous';
  backgroundImageObj.src = data.image || '/photo.png'; // Use same image for background

  const loadBackgroundImagePromise = new Promise<void>(imgResolve => {
    backgroundImageObj.onload = () => {
      const backgroundScale = 2.0; // Make background image larger for blur effect
      const bgImgWidth = backgroundImageObj.naturalWidth * backgroundScale;
      const bgImgHeight = backgroundImageObj.naturalHeight * backgroundScale;

      const bgImageNode = new Konva.Image({
        x: (cardWidth - bgImgWidth) / 2,
        y: (cardHeight - bgImgHeight) / 2,
        width: bgImgWidth,
        height: bgImgHeight,
        image: backgroundImageObj,
        opacity: 0.8 // Slight opacity for a faded look
      });

      // Apply Konva filters for blur. `cache()` is needed before applying filters.

      layer.add(bgImageNode);
      imgResolve();
    };

    backgroundImageObj.onerror = () => {
      console.warn('Failed to load background image:', backgroundImageObj.src);
      // Fallback to a solid color background if image fails to load
      const fallbackRect = new Konva.Rect({
        x: 0,
        y: 0,
        width: cardWidth,
        height: cardHeight,
        fill: 'rgba(0,0,0,0)', // Use data.color1 as a fallback background
        opacity: 0.5
      });
      layer.add(fallbackRect);
      imgResolve();
    };
  });

  await loadBackgroundImagePromise; // Wait for background image to load or fail
  layer.draw();
  const backgroundCanvasElement = layer.canvas._canvas;
  const backgroundTexture = new CanvasTexture(backgroundCanvasElement);
  backgroundTexture.needsUpdate = true;
  backgroundTexture.colorSpace = THREE.SRGBColorSpace;

  return backgroundTexture;
}

//Main Card Texture Generation Function (Simplified)

//This function is now primarily used internally by the texture utility file. The conditional logic for background generation has moved to the Vue component for more dynamic control.

// This function is kept for completeness if you still need a single entry point
// that returns both, but its direct use in the component has been altered.
export async function generateCardTextures(data: CardData): Promise<{
  foreground: CanvasTexture;
  background: CanvasTexture;
}> {
  // This will always generate both.
  // The conditional logic is now in the component that calls this utility.
  const [foreground, background] = await Promise.all([generateForegroundTexture(data), generateBackgroundTexture(data)]);

  return { foreground, background };
}
