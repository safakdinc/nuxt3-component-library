/**
 * @fileoverview Card Texture Generation Utilities for OGL
 *
 * This module provides utilities for generating Canvas-based textures used
 * in the InfiniteGridClass system. Each card requires two textures:
 *
 * 1. Foreground Texture: Contains the main card content (title, image, tags, date)
 * 2. Background Texture: Contains a blurred, darkened version of the card image
 *
 * The textures are generated using HTML5 Canvas 2D API and converted to
 * OGL Textures with proper configuration.
 *
 * Key Features:
 * - Automatic text truncation with ellipsis
 * - Image loading with fallback handling
 * - Styled tag pills with rounded corners
 * - Responsive layout within fixed canvas dimensions
 * - Blur effects for background textures
 * - Proper error handling for failed image loads
 *
 * Usage:
 * ```typescript
 * import { generateForegroundTexture, generateBackgroundTexture } from './createTexture';
 *
 * const cardData = {
 *   title: "Project Title",
 *   image: "/path/to/image.jpg",
 *   tags: ["web", "ogl"],
 *   date: "2024"
 * };
 *
 * const foregroundTexture = await generateForegroundTexture(cardData, gl);
 * const backgroundTexture = await generateBackgroundTexture(cardData, gl);
 * ```
 */

// Card Texture Generation Utilities for OGL

import { Texture, Renderer } from "ogl"; // Required for OGL Texture

/**
 * Represents the data structure for a single card/tile
 * This interface must match the CardData interface in InfiniteGridClass.ts
 */
interface CardData {
  /** The main title text displayed prominently on the card */
  title: string;
  /** Badge text (currently not implemented in the rendering pipeline) */
  badge: string;
  /** Detailed description text for the card content (optional) */
  description?: string;
  /** Array of tag strings that will be displayed as styled pills */
  tags: string[];
  /** Date string displayed in the bottom-right corner */
  date: string;
  /** Optional image URL - falls back to '/photo.png' if not provided */
  image?: string;
  /** Optional video URL - when provided, video will be used instead of image */
  video?: string;
  /** Whether the video should loop (default: true) */
  videoLoop?: boolean;
  /** Whether the video should be muted (default: true for autoplay) */
  videoMuted?: boolean;
  /** Whether the video should autoplay (default: true) */
  videoAutoplay?: boolean;
}

/**
 * Canvas dimensions for all generated textures
 * These dimensions affect the resolution and memory usage of the textures
 */
const cardWidth = 512;
const cardHeight = 512;
const padding = 30;

/**
 * Creates a canvas element with 2D rendering context
 *
 * This helper function ensures consistent canvas setup across all texture
 * generation functions and provides proper error handling for context creation.
 *
 * @returns Object containing the canvas element and its 2D context
 * @throws {Error} If 2D context creation fails
 */
function createCanvasContext(): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } {
  const canvas = document.createElement("canvas");
  canvas.width = cardWidth;
  canvas.height = cardHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Failed to get 2D context for canvas");
  }
  return { canvas, ctx };
}

// Option 1: Pre-generate textures once, reuse them
const textureCache = new Map<string, Texture>();

// Video management system
const videoCache = new Map<string, HTMLVideoElement>();
const videoTextures = new Map<
  string,
  {
    texture: Texture;
    needsUpdate: boolean;
    canvas?: HTMLCanvasElement;
    ctx?: CanvasRenderingContext2D;
    video?: HTMLVideoElement;
    drawFrame?: () => void;
  }
>();

/**
 * Creates and loads a video element with the specified options
 *
 * @param src - Video source URL
 * @param options - Video configuration options
 * @returns Promise resolving to the loaded video element
 */
function createVideoElement(
  src: string,
  options: {
    loop?: boolean;
    muted?: boolean;
    autoplay?: boolean;
  } = {},
): Promise<HTMLVideoElement> {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.crossOrigin = "anonymous";
    video.loop = options.loop ?? true;
    video.muted = options.muted ?? true;
    video.autoplay = options.autoplay ?? true;
    video.playsInline = true; // Important for mobile devices

    // Set video to cover the canvas area
    video.style.objectFit = "cover";
    video.style.position = "absolute";
    video.style.left = "-9999px"; // Hide video element off-screen
    video.style.top = "-9999px";
    video.style.width = "1px";
    video.style.height = "1px";

    // Add to DOM to ensure it stays alive and can play
    document.body.appendChild(video);

    video.addEventListener("loadeddata", async () => {
      try {
        // Force play the video to ensure it starts
        if (options.autoplay !== false) {
          await video.play();
          console.log("Video started playing:", src);
        }
        resolve(video);
      } catch (error) {
        console.warn("Video autoplay failed, but continuing:", error);
        // Still resolve even if autoplay fails - user might interact later
        resolve(video);
      }
    });

    video.addEventListener("error", (e) => {
      console.error("Video loading error:", e, "Source:", src);
      reject(new Error(`Failed to load video: ${src}`));
    });

    video.addEventListener("canplay", () => {
      console.log("Video can play:", src);
    });

    video.addEventListener("playing", () => {
      console.log("Video is playing:", src);
    });

    video.addEventListener("pause", () => {
      console.log("Video paused:", src);
    });

    video.addEventListener("ended", () => {
      console.log("Video ended:", src);
    });

    // Start loading the video
    video.src = src;
    video.load();
  });
}

/**
 * Generates the foreground texture for a card using Canvas 2D API
 *
 * This function creates the main visible content of each card including:
 * - Title text with automatic truncation and ellipsis
 * - Main image with aspect ratio preservation and centering
 * - Styled tag pills at the bottom
 * - Date text in the bottom-right corner
 * - Border outline around the entire card
 *
 * The generated texture is used for the front-facing mesh that users
 * can interact with (hover and click).
 *
 * @param data - Card data containing title, image, tags, date, etc.
 * @param renderer - OGL Renderer for texture creation
 * @returns Promise resolving to an OGL Texture
 *
 * @example
 * ```typescript
 * const cardData = {
 *   title: "Amazing Project",
 *   image: "/images/project.jpg",
 *   tags: ["web", "ogl"],
 *   date: "2024",
 *   badge: "NEW",
 *   description: "A cool project"
 * };
 * const texture = await generateForegroundTexture(cardData, renderer);
 * ```
 */
export async function generateForegroundTexture(
  data: CardData,
  renderer: Renderer,
): Promise<Texture> {
  // If there's a video, use video texture generation
  if (data.video) {
    return await generateVideoForegroundTexture(data, renderer);
  }

  // Original image-based texture generation (keep existing logic)
  const cacheKey = `${data.title}-${data.tags?.join("-")}-image`;

  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey)!;
  }

  const { canvas, ctx } = createCanvasContext();

  // Set default styles
  ctx.fillStyle = "white";
  ctx.strokeStyle = "rgba(60, 60, 60, 1)";
  ctx.lineWidth = 1;

  // Card background and border (transparent for foreground to show background)
  ctx.beginPath();
  ctx.rect(0, 0, cardWidth, cardHeight);
  ctx.stroke(); // Draw border

  let currentY = padding;

  // Title Text
  ctx.font = "24px Arial, sans-serif";
  ctx.fillStyle = "white";
  ctx.textBaseline = "top";
  ctx.textAlign = "left"; // Explicit left alignment

  // Measure text to determine actual width
  const titleText = data.title;
  const titleMaxWidth = cardWidth - padding * 2;

  // Simple truncation if text exceeds maxWidth
  let truncatedTitle = titleText;
  let textMetrics = ctx.measureText(truncatedTitle);

  while (textMetrics.width > titleMaxWidth && truncatedTitle.length > 3) {
    truncatedTitle = truncatedTitle.substring(0, truncatedTitle.length - 4) + "...";
    textMetrics = ctx.measureText(truncatedTitle);
  }
  ctx.fillText(truncatedTitle, padding, currentY);

  const headerHeight = 24;
  currentY += headerHeight + 30;

  const topElementsMaxY = currentY;
  const bottomReservedSpace = 100;
  const availableImageHeight = cardHeight - topElementsMaxY - bottomReservedSpace;
  const availableImageWidth = cardWidth - padding * 2;

  // Image Loading and Placement
  const mediaSource = data.image || "/photo.png";
  const imageObj = new Image();
  imageObj.crossOrigin = "anonymous";
  imageObj.src = mediaSource;

  const loadImagePromise = new Promise<void>((resolve) => {
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

      ctx.drawImage(imageObj, imageX, imageY, imgWidth, imgHeight);
      resolve();
    };

    imageObj.onerror = () => {
      console.error("Failed to load foreground image:", imageObj.src);
      ctx.fillStyle = "gray";
      ctx.font = "30px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Image Error", cardWidth / 2, cardHeight / 2 - 50);
      resolve();
    };
  });

  await loadImagePromise;

  // Tags
  let currentXForTags = padding;
  const tagFontSize = 16;
  const tagPaddingX = 15;
  const tagPaddingY = 8;
  const tagGap = 10;
  const tagsY = cardHeight - padding - tagFontSize - tagPaddingY;

  data.tags.forEach((tagText) => {
    ctx.font = `${tagFontSize}px Helvetica, Arial, sans-serif`;
    ctx.textBaseline = "middle";

    const textToDraw = `#${tagText.toUpperCase()}`;
    const tagMetrics = ctx.measureText(textToDraw);
    const tagLabelWidth = tagMetrics.width;
    const tagShapeWidth = tagLabelWidth + tagPaddingX;
    const tagShapeHeight = tagFontSize + tagPaddingY;

    ctx.fillStyle = "rgba(248,250, 252, 0.15)";
    drawRoundedRect(ctx, currentXForTags, tagsY, tagShapeWidth, tagShapeHeight, tagShapeHeight / 2);
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(textToDraw, currentXForTags + tagShapeWidth / 2, tagsY + tagShapeHeight / 2);

    currentXForTags += tagShapeWidth + tagGap;
  });

  // Date
  ctx.font = "20px Arial, sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 1)";
  ctx.textAlign = "right";
  ctx.textBaseline = "bottom";
  ctx.fillText(data.date, cardWidth - padding, cardHeight - padding);

  const texture = new Texture(renderer.gl, {
    image: canvas,
    generateMipmaps: false,
    flipY: false,
  });

  textureCache.set(cacheKey, texture);
  return texture;
}

/**
 * Generates the foreground texture for a card using video content
 *
 * This function creates a video-based foreground texture that maintains
 * the same layout and styling as image-based cards:
 * - Title text with automatic truncation and ellipsis
 * - Video content with aspect ratio preservation and centering
 * - Styled tag pills at the bottom
 * - Date text in the bottom-right corner
 * - Border outline around the entire card
 *
 * The video plays in the designated image area while text elements
 * remain static overlays with semi-transparent backgrounds for readability.
 *
 * @param data - Card data containing video URL, title, tags, date, etc.
 * @param renderer - OGL Renderer for texture creation
 * @returns Promise resolving to an OGL Texture that updates with video frames
 */
export async function generateVideoForegroundTexture(
  data: CardData,
  renderer: Renderer,
): Promise<Texture> {
  if (!data.video) {
    throw new Error("Video URL is required for video foreground texture");
  }

  const cacheKey = `video-fg-${data.video}-${data.title}-${data.tags?.join("-")}`;

  // Check if we already have this texture cached
  if (videoTextures.has(cacheKey)) {
    return videoTextures.get(cacheKey)!.texture;
  }

  const { canvas, ctx } = createCanvasContext();

  // Load the video
  const video = await createVideoElement(data.video, {
    loop: data.videoLoop ?? true,
    muted: data.videoMuted ?? true,
    autoplay: data.videoAutoplay ?? true,
  });

  // Cache the video for reuse
  videoCache.set(`video-${data.video}`, video);

  // Calculate layout dimensions (same as image version)
  let currentY = padding;
  const headerHeight = 24; // Title font size
  currentY += headerHeight + 30; // Move Y cursor down after title

  const topElementsMaxY = currentY;
  const bottomReservedSpace = 100; // Space for tags and date
  const availableVideoHeight = cardHeight - topElementsMaxY - bottomReservedSpace;
  const availableVideoWidth = cardWidth - padding * 2;

  // Function to draw the complete frame
  const drawFrame = () => {
    // Clear canvas
    ctx.clearRect(0, 0, cardWidth, cardHeight);

    // Set default styles
    ctx.fillStyle = "white";
    ctx.strokeStyle = "rgba(60, 60, 60, 1)";
    ctx.lineWidth = 1;

    // Card border (same as image version)
    ctx.beginPath();
    ctx.rect(0, 0, cardWidth, cardHeight);
    ctx.stroke();

    // Draw video in the designated area (where image would be)
    if (video.readyState >= video.HAVE_CURRENT_DATA) {
      const videoAspectRatio = video.videoWidth / video.videoHeight;

      let videoWidth = video.videoWidth;
      let videoHeight = video.videoHeight;

      // Scale video to fit within available space, maintaining aspect ratio
      if (videoWidth > availableVideoWidth || videoHeight > availableVideoHeight) {
        if (availableVideoWidth / videoAspectRatio <= availableVideoHeight) {
          videoWidth = availableVideoWidth;
          videoHeight = availableVideoWidth / videoAspectRatio;
        } else {
          videoHeight = availableVideoHeight;
          videoWidth = availableVideoHeight * videoAspectRatio;
        }
      }

      const videoX = padding + (availableVideoWidth - videoWidth) / 2;
      const videoY = topElementsMaxY + (availableVideoHeight - videoHeight) / 2;

      // Draw video frame
      ctx.drawImage(video, videoX, videoY, videoWidth, videoHeight);
    }

    // Title Text (same position as image texture)
    ctx.font = "24px Arial, sans-serif";
    ctx.fillStyle = "white";
    ctx.textBaseline = "top";
    ctx.textAlign = "left"; // Ensure left alignment like image version

    const titleText = data.title;
    const titleMaxWidth = cardWidth - padding * 2;

    let truncatedTitle = titleText;
    let textMetrics = ctx.measureText(truncatedTitle);

    while (textMetrics.width > titleMaxWidth && truncatedTitle.length > 3) {
      truncatedTitle = truncatedTitle.substring(0, truncatedTitle.length - 4) + "...";
      textMetrics = ctx.measureText(truncatedTitle);
    }

    // Draw title text at the same position as image texture
    ctx.fillText(truncatedTitle, padding, padding);
    // Tags (exactly same as image version)
    let currentXForTags = padding;
    const tagFontSize = 16;
    const tagPaddingX = 15;
    const tagPaddingY = 8;
    const tagGap = 10;
    const tagsY = cardHeight - padding - tagFontSize - tagPaddingY;

    data.tags.forEach((tagText) => {
      ctx.font = `${tagFontSize}px Helvetica, Arial, sans-serif`;
      ctx.textBaseline = "middle";

      const textToDraw = `#${tagText.toUpperCase()}`;
      const tagMetrics = ctx.measureText(textToDraw);
      const tagLabelWidth = tagMetrics.width;
      const tagShapeWidth = tagLabelWidth + tagPaddingX;
      const tagShapeHeight = tagFontSize + tagPaddingY;

      // Draw rounded rectangle for tag shape (same as image version)
      ctx.fillStyle = "rgba(248,250, 252, 0.15)";
      drawRoundedRect(
        ctx,
        currentXForTags,
        tagsY,
        tagShapeWidth,
        tagShapeHeight,
        tagShapeHeight / 2,
      );
      ctx.fill();

      // Draw tag text (same as image version)
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(textToDraw, currentXForTags + tagShapeWidth / 2, tagsY + tagShapeHeight / 2);

      currentXForTags += tagShapeWidth + tagGap;
    });

    // Date (exactly same as image version)
    ctx.font = "20px Arial, sans-serif";
    ctx.fillStyle = "rgba(255, 255, 255, 1)";
    ctx.textAlign = "right";
    ctx.textBaseline = "bottom";
    ctx.fillText(data.date, cardWidth - padding, cardHeight - padding);
  };

  // Draw initial frame
  drawFrame();

  const texture = new Texture(renderer.gl, {
    image: canvas,
    generateMipmaps: false,
    flipY: false,
  });

  // Store for continuous updates
  videoTextures.set(cacheKey, {
    texture,
    needsUpdate: true,
    canvas,
    ctx,
    video,
    drawFrame,
  });

  return texture;
}

/**
 * Generates the background texture for a card using Canvas 2D API
 *
 * This function creates a blurred, darkened version of the card's image
 * that serves as the background layer visible during hover effects.
 * The background provides visual depth and context while maintaining
 * readability of the foreground content.
 *
 * Processing steps:
 * 1. Loads the same image used in the foreground
 * 2. Scales it up for better blur coverage
 * 3. Applies canvas blur filter
 * 4. Adds a semi-transparent dark overlay
 * 5. Falls back to solid color if image loading fails
 *
 * @param data - Card data containing the image URL
 * @param renderer - OGL Renderer for texture creation
 * @returns Promise resolving to an OGL Texture for background layer
 *
 * @example
 * ```typescript
 * const backgroundTexture = await generateBackgroundTexture(cardData, renderer);
 * // Use this texture for the background mesh with shader material
 * ```
 */
export async function generateBackgroundTexture(
  data: CardData,
  renderer: Renderer,
): Promise<Texture> {
  // If there's a video, use video background texture generation
  if (data.video) {
    return await generateVideoBackgroundTexture(data, renderer);
  }

  // Original image-based background generation (keep existing logic)
  const { canvas, ctx } = createCanvasContext();

  const mediaSource = data.image || "/photo.png";
  const backgroundImageObj = new Image();
  backgroundImageObj.crossOrigin = "Anonymous";
  backgroundImageObj.src = mediaSource;

  const loadBackgroundImagePromise = new Promise<void>((resolve) => {
    backgroundImageObj.onload = () => {
      const backgroundScale = 2.0;
      const bgImgWidth = backgroundImageObj.naturalWidth * backgroundScale;
      const bgImgHeight = backgroundImageObj.naturalHeight * backgroundScale;

      ctx.drawImage(
        backgroundImageObj,
        (cardWidth - bgImgWidth) / 2,
        (cardHeight - bgImgHeight) / 2,
        bgImgWidth,
        bgImgHeight,
      );

      ctx.filter = "blur(10px)";
      ctx.drawImage(canvas, 0, 0);
      ctx.filter = "none";

      ctx.fillStyle = "rgba(0,0,0,0.4)";
      ctx.fillRect(0, 0, cardWidth, cardHeight);

      resolve();
    };

    backgroundImageObj.onerror = () => {
      console.warn("Failed to load background image:", backgroundImageObj.src);
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fillRect(0, 0, cardWidth, cardHeight);
      resolve();
    };
  });

  await loadBackgroundImagePromise;

  const backgroundTexture = new Texture(renderer.gl, {
    image: canvas,
    generateMipmaps: false,
    flipY: false,
  });

  return backgroundTexture;
}

/**
 * Generates the background texture for a card using video content
 *
 * This function creates a blurred, darkened version of the card's video
 * that serves as the background layer visible during hover effects.
 * The background provides visual depth and context while maintaining
 * readability of the foreground content.
 *
 * Processing steps:
 * 1. Uses the same video as the foreground
 * 2. Scales it up for better blur coverage
 * 3. Applies canvas blur filter
 * 4. Adds a semi-transparent dark overlay
 * 5. Updates continuously with video frames
 *
 * @param data - Card data containing the video URL
 * @param renderer - OGL Renderer for texture creation
 * @returns Promise resolving to an OGL Texture for background layer
 */
export async function generateVideoBackgroundTexture(
  data: CardData,
  renderer: Renderer,
): Promise<Texture> {
  if (!data.video) {
    throw new Error("Video URL is required for video background texture");
  }

  const cacheKey = `video-bg-${data.video}`;

  // Check if we already have this texture cached
  if (videoTextures.has(cacheKey)) {
    return videoTextures.get(cacheKey)!.texture;
  }

  const { canvas, ctx } = createCanvasContext();

  // Load the video (reuse from cache if available)
  let video: HTMLVideoElement;
  if (videoCache.has(`video-${data.video}`)) {
    video = videoCache.get(`video-${data.video}`)!;
  } else {
    video = await createVideoElement(data.video, {
      loop: data.videoLoop ?? true,
      muted: data.videoMuted ?? true,
      autoplay: data.videoAutoplay ?? true,
    });
    videoCache.set(`video-${data.video}`, video);
  }

  // Function to draw and process video frame for background
  const drawBackgroundFrame = () => {
    if (video.readyState >= video.HAVE_CURRENT_DATA) {
      // Clear canvas
      ctx.clearRect(0, 0, cardWidth, cardHeight);

      // Scale video larger for blur effect (same as image background)
      const backgroundScale = 2.0;
      const scaledWidth = cardWidth * backgroundScale;
      const scaledHeight = cardHeight * backgroundScale;
      const offsetX = (cardWidth - scaledWidth) / 2;
      const offsetY = (cardHeight - scaledHeight) / 2;

      // Draw scaled video frame
      ctx.drawImage(video, offsetX, offsetY, scaledWidth, scaledHeight);

      // Apply blur filter (same as image background)
      ctx.filter = "blur(10px)";
      ctx.drawImage(canvas, 0, 0);
      ctx.filter = "none";

      // Add semi-transparent overlay to darken/blend the background (same as image)
      ctx.fillStyle = "rgba(0,0,0,0.4)";
      ctx.fillRect(0, 0, cardWidth, cardHeight);
    }
  };

  // Draw initial frame
  drawBackgroundFrame();

  const backgroundTexture = new Texture(renderer.gl, {
    image: canvas,
    generateMipmaps: false,
    flipY: false,
  });

  // Store for continuous updates
  videoTextures.set(cacheKey, {
    texture: backgroundTexture,
    needsUpdate: true,
    canvas,
    ctx,
    video,
    drawFrame: drawBackgroundFrame,
  });

  return backgroundTexture;
}

/**
 * Helper function to draw a rounded rectangle using Canvas 2D API
 *
 * Canvas doesn't have a built-in rounded rectangle method, so this
 * function uses quadratic curves to create smooth corners. This is
 * used for drawing the tag pill backgrounds.
 *
 * @param ctx - The 2D rendering context to draw on
 * @param x - X coordinate of the top-left corner
 * @param y - Y coordinate of the top-left corner
 * @param width - Width of the rectangle
 * @param height - Height of the rectangle
 * @param radius - Corner radius in pixels
 */
function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
): void {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

/**
 * Updates all video textures that need updating
 * Should be called in the main render loop to keep video textures current
 */
export function updateAllVideoTextures(): void {
  videoTextures.forEach((textureData, key) => {
    const { texture, video, drawFrame } = textureData;

    // Check if video is available and playing
    if (video) {
      if (video.readyState >= video.HAVE_CURRENT_DATA && !video.paused && !video.ended) {
        if (drawFrame) {
          // For canvas-based textures (hybrid foreground and background)
          try {
            drawFrame();
            texture.needsUpdate = true;
          } catch (error) {
            console.error("Error drawing video frame for", key, ":", error);
          }
        } else {
          // For direct video textures (simple video-only textures)
          texture.image = video;
          texture.needsUpdate = true;
        }
      } else if (video.paused) {
        // Try to restart paused videos
        video.play().catch(() => {
          // Ignore play errors - user interaction might be required
        });
      }
    } else {
      console.warn("No video found for texture:", key);
    }
  });
}

/**
 * Gets all currently loaded video elements
 * Useful for pausing/playing videos based on visibility
 */
export function getAllVideos(): HTMLVideoElement[] {
  return Array.from(videoCache.values());
}

/**
 * Pauses all videos (useful when the grid is not visible)
 */
export function pauseAllVideos(): void {
  videoCache.forEach((video) => {
    if (!video.paused) {
      video.pause();
    }
  });
}

/**
 * Resumes all videos (useful when the grid becomes visible again)
 */
export function resumeAllVideos(): void {
  videoCache.forEach((video) => {
    if (video.paused) {
      video.play().catch(console.error);
    }
  });
}

/**
 * Attempts to start all videos (useful for user interaction handlers)
 * Call this function in response to user interaction to enable autoplay
 */
export function startAllVideos(): void {
  videoCache.forEach(async (video) => {
    try {
      if (video.paused) {
        await video.play();
        console.log("Started video:", video.src);
      }
    } catch (error) {
      console.warn("Could not start video:", video.src, error);
    }
  });
}

/**
 * Disposes of video resources and cleans up caches
 * Should be called when the grid is destroyed to prevent memory leaks
 */
export function disposeVideoResources(): void {
  // Pause and clean up videos
  videoCache.forEach((video) => {
    video.pause();
    video.src = "";
    video.load(); // Reset the video element

    // Remove from DOM if it was added
    if (video.parentNode) {
      video.parentNode.removeChild(video);
    }
  });

  // Clear caches
  videoCache.clear();
  videoTextures.clear();
  textureCache.clear();
}

/**
 * Checks if a card data contains video content
 */
export function hasVideoContent(data: CardData): boolean {
  return !!data.video;
}

/**
 * Debug function to check video status
 * Call this in console to see the current state of all videos
 */
export function debugVideoStatus(): void {
  console.log("=== Video Cache Status ===");
  videoCache.forEach((video, key) => {
    console.log(`${key}:`, {
      src: video.src,
      readyState: video.readyState,
      paused: video.paused,
      ended: video.ended,
      currentTime: video.currentTime,
      duration: video.duration,
      muted: video.muted,
      autoplay: video.autoplay,
      loop: video.loop,
    });
  });

  console.log("=== Video Textures Status ===");
  videoTextures.forEach((textureData, key) => {
    console.log(`${key}:`, {
      hasTexture: !!textureData.texture,
      hasVideo: !!textureData.video,
      hasDrawFrame: !!textureData.drawFrame,
      needsUpdate: textureData.needsUpdate,
    });
  });
}

/**
 * Convenience function to generate both foreground and background textures
 *
 * This function generates both texture types in parallel for efficiency.
 * While the individual generation functions are typically used separately
 * in the main grid system, this function can be useful for testing or
 * simpler use cases.
 *
 * @param data - Card data for texture generation
 * @param renderer - OGL Renderer for texture creation
 * @returns Promise resolving to an object with both texture types
 *
 * @example
 * ```typescript
 * const { foreground, background } = await generateCardTextures(cardData, renderer);
 * // Use foreground for main mesh, background for hover effect
 * ```
 */
export async function generateCardTextures(
  data: CardData,
  renderer: Renderer,
): Promise<{
  foreground: Texture;
  background: Texture;
}> {
  const [foreground, background] = await Promise.all([
    generateForegroundTexture(data, renderer),
    generateBackgroundTexture(data, renderer),
  ]);
  return { foreground, background };
}
