/**
 * Image resizing and compression utilities.
 * Ported from cc-haha (Claude Code) with simplifications.
 */

import sharp from "sharp";
import {
  API_IMAGE_MAX_BASE64_SIZE,
  IMAGE_MAX_HEIGHT,
  IMAGE_MAX_WIDTH,
  IMAGE_TARGET_RAW_SIZE,
  type ImageMediaType,
} from "../constants/apiLimits.js";

/**
 * Error thrown when image resizing fails and the image exceeds the API limit.
 */
export class ImageResizeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ImageResizeError";
  }
}

export interface ResizeResult {
  buffer: Buffer;
  mediaType: string;
}

/**
 * Detect image format from buffer using magic bytes.
 */
export function detectImageFormatFromBuffer(buffer: Buffer): ImageMediaType {
  if (buffer.length < 4) return "image/png"; // default

  // Check PNG signature
  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) {
    return "image/png";
  }

  // Check JPEG signature (FFD8FF)
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return "image/jpeg";
  }

  // Check GIF signature (GIF87a or GIF89a)
  if (buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46) {
    return "image/gif";
  }

  // Check WebP signature (RIFF....WEBP)
  if (buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46) {
    if (
      buffer.length >= 12 &&
      buffer[8] === 0x57 &&
      buffer[9] === 0x45 &&
      buffer[10] === 0x42 &&
      buffer[11] === 0x50
    ) {
      return "image/webp";
    }
  }

  // Default to PNG if unknown
  return "image/png";
}

/**
 * Resize and compress image buffer to meet API size and dimension constraints.
 */
export async function maybeResizeImageBuffer(
  imageBuffer: Buffer,
  originalSize: number,
  ext: string,
): Promise<ResizeResult> {
  if (imageBuffer.length === 0) {
    throw new ImageResizeError("Image file is empty (0 bytes)");
  }

  try {
    const image = sharp(imageBuffer);
    const metadata = await image.metadata();

    const mediaType = metadata.format ?? ext;
    // Normalize "jpg" to "jpeg" for media type compatibility
    const normalizedMediaType = mediaType === "jpg" ? "jpeg" : mediaType;

    // If dimensions aren't available from metadata
    if (!metadata.width || !metadata.height) {
      if (originalSize > IMAGE_TARGET_RAW_SIZE) {
        // Create fresh sharp instance for compression
        const compressedBuffer = await sharp(imageBuffer).jpeg({ quality: 80 }).toBuffer();
        return { buffer: compressedBuffer, mediaType: "jpeg" };
      }
      // Return without dimensions if we can't determine them
      return { buffer: imageBuffer, mediaType: normalizedMediaType };
    }

    // Store original dimensions (guaranteed to be defined here)
    const originalWidth = metadata.width;
    const originalHeight = metadata.height;

    // Calculate dimensions while maintaining aspect ratio
    let width = originalWidth;
    let height = originalHeight;

    // Check if the original file just works
    if (
      originalSize <= IMAGE_TARGET_RAW_SIZE &&
      width <= IMAGE_MAX_WIDTH &&
      height <= IMAGE_MAX_HEIGHT
    ) {
      return {
        buffer: imageBuffer,
        mediaType: normalizedMediaType,
      };
    }

    const needsDimensionResize = width > IMAGE_MAX_WIDTH || height > IMAGE_MAX_HEIGHT;
    const isPng = normalizedMediaType === "png";

    // If dimensions are within limits but file is too large, try compression first
    // This preserves full resolution when possible
    if (!needsDimensionResize && originalSize > IMAGE_TARGET_RAW_SIZE) {
      // For PNGs, try PNG compression first to preserve transparency
      if (isPng) {
        const pngCompressed = await sharp(imageBuffer)
          .png({ compressionLevel: 9, palette: true })
          .toBuffer();
        if (pngCompressed.length <= IMAGE_TARGET_RAW_SIZE) {
          return {
            buffer: pngCompressed,
            mediaType: "png",
          };
        }
      }
      // Try JPEG compression (lossy but much smaller)
      for (const quality of [80, 60, 40, 20]) {
        const compressedBuffer = await sharp(imageBuffer).jpeg({ quality }).toBuffer();
        if (compressedBuffer.length <= IMAGE_TARGET_RAW_SIZE) {
          return {
            buffer: compressedBuffer,
            mediaType: "jpeg",
          };
        }
      }
      // Quality reduction alone wasn't enough, fall through to resize
    }

    // Constrain dimensions if needed
    if (width > IMAGE_MAX_WIDTH) {
      height = Math.round((height * IMAGE_MAX_WIDTH) / width);
      width = IMAGE_MAX_WIDTH;
    }

    if (height > IMAGE_MAX_HEIGHT) {
      width = Math.round((width * IMAGE_MAX_HEIGHT) / height);
      height = IMAGE_MAX_HEIGHT;
    }

    // IMPORTANT: Always create fresh sharp(imageBuffer) instances for each operation.
    const resizedImageBuffer = await sharp(imageBuffer)
      .resize(width, height, {
        fit: "inside",
        withoutEnlargement: true,
      })
      .toBuffer();

    // If still too large after resize, try compression
    if (resizedImageBuffer.length > IMAGE_TARGET_RAW_SIZE) {
      // For PNGs, try PNG compression first to preserve transparency
      if (isPng) {
        const pngCompressed = await sharp(imageBuffer)
          .resize(width, height, {
            fit: "inside",
            withoutEnlargement: true,
          })
          .png({ compressionLevel: 9, palette: true })
          .toBuffer();
        if (pngCompressed.length <= IMAGE_TARGET_RAW_SIZE) {
          return {
            buffer: pngCompressed,
            mediaType: "png",
          };
        }
      }

      // Try JPEG with progressively lower quality
      for (const quality of [80, 60, 40, 20]) {
        const compressedBuffer = await sharp(imageBuffer)
          .resize(width, height, {
            fit: "inside",
            withoutEnlargement: true,
          })
          .jpeg({ quality })
          .toBuffer();
        if (compressedBuffer.length <= IMAGE_TARGET_RAW_SIZE) {
          return {
            buffer: compressedBuffer,
            mediaType: "jpeg",
          };
        }
      }
      // If still too large, resize smaller and compress aggressively
      const smallerWidth = Math.min(width, 1000);
      const smallerHeight = Math.round((height * smallerWidth) / Math.max(width, 1));
      const compressedBuffer = await sharp(imageBuffer)
        .resize(smallerWidth, smallerHeight, {
          fit: "inside",
          withoutEnlargement: true,
        })
        .jpeg({ quality: 20 })
        .toBuffer();
      return {
        buffer: compressedBuffer,
        mediaType: "jpeg",
      };
    }

    return {
      buffer: resizedImageBuffer,
      mediaType: normalizedMediaType,
    };
  } catch (error) {
    // Detect actual format from magic bytes instead of trusting extension
    const detected = detectImageFormatFromBuffer(imageBuffer);
    const normalizedExt = detected.slice(6); // Remove 'image/' prefix

    // Calculate the base64 size (API limit is on base64-encoded length)
    const base64Size = Math.ceil((originalSize * 4) / 3);

    // Size-under-5MB does not imply dimensions-under-cap. Don't return the
    // raw buffer if the PNG header says it's oversized — fall through to
    // ImageResizeError instead.
    const overDim =
      imageBuffer.length >= 24 &&
      imageBuffer[0] === 0x89 &&
      imageBuffer[1] === 0x50 &&
      imageBuffer[2] === 0x4e &&
      imageBuffer[3] === 0x47 &&
      (imageBuffer.readUInt32BE(16) > IMAGE_MAX_WIDTH ||
        imageBuffer.readUInt32BE(20) > IMAGE_MAX_HEIGHT);

    // If original image's base64 encoding is within API limit, allow it through uncompressed
    if (base64Size <= API_IMAGE_MAX_BASE64_SIZE && !overDim) {
      return { buffer: imageBuffer, mediaType: normalizedExt };
    }

    // Image is too large and we failed to compress it - fail with user-friendly error
    throw new ImageResizeError(
      overDim
        ? `Unable to resize image — dimensions exceed the ${IMAGE_MAX_WIDTH}x${IMAGE_MAX_HEIGHT}px limit and image processing failed. Please resize the image to reduce its pixel dimensions.`
        : `Unable to resize image (${formatFileSize(originalSize)} raw, ${formatFileSize(base64Size)} base64). The image exceeds the 5MB API limit and compression failed. Please resize the image manually or use a smaller image.`,
    );
  }
}

/**
 * Resize an image from base64 string.
 */
export async function resizeImageFromBase64(
  base64Data: string,
  mimeType: string,
): Promise<{ data: string; mimeType: string }> {
  // Decode base64 to buffer
  const imageBuffer = Buffer.from(base64Data, "base64");
  const originalSize = imageBuffer.length;

  // Extract extension from media type
  const ext = mimeType?.split("/")[1] || "png";

  // Resize if needed
  const resized = await maybeResizeImageBuffer(imageBuffer, originalSize, ext);

  // Return resized image as base64
  return {
    data: resized.buffer.toString("base64"),
    mimeType: `image/${resized.mediaType}`,
  };
}

/**
 * Resize an image from data URL.
 */
export async function resizeImageFromDataUrl(dataUrl: string): Promise<string> {
  // Parse data URL: data:image/jpeg;base64,/9j/4AAQ...
  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) {
    // Not a valid data URL, return as-is
    return dataUrl;
  }

  const mimeType = match[1];
  const base64Data = match[2];

  // Resize if needed
  const resized = await resizeImageFromBase64(base64Data, mimeType);

  // Return as data URL
  return `data:${resized.mimeType};base64,${resized.data}`;
}

/**
 * Format file size for display.
 */
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
