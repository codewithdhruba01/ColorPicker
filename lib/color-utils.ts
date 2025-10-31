export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface HSL {
  h: number;
  s: number;
  l: number;
}

export interface HSV {
  h: number;
  s: number;
  v: number;
}

export interface CMYK {
  c: number;
  m: number;
  y: number;
  k: number;
}

export function hexToRgb(hex: string): RGB | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = Math.round(x).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

export function rgbToHsl(r: number, g: number, b: number): HSL {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h = h / 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function hslToRgb(h: number, s: number, l: number): RGB {
  h /= 360;
  s /= 100;
  l /= 100;

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

export function rgbToHsv(r: number, g: number, b: number): HSV {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;

  if (max !== min) {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h = h / 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    v: Math.round(v * 100),
  };
}

export function rgbToCmyk(r: number, g: number, b: number): CMYK {
  r /= 255;
  g /= 255;
  b /= 255;

  const k = 1 - Math.max(r, g, b);
  const c = k === 1 ? 0 : (1 - r - k) / (1 - k);
  const m = k === 1 ? 0 : (1 - g - k) / (1 - k);
  const y = k === 1 ? 0 : (1 - b - k) / (1 - k);

  return {
    c: Math.round(c * 100),
    m: Math.round(m * 100),
    y: Math.round(y * 100),
    k: Math.round(k * 100),
  };
}

export function getContrastRatio(rgb1: RGB, rgb2: RGB): number {
  const l1 = getRelativeLuminance(rgb1);
  const l2 = getRelativeLuminance(rgb2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function getRelativeLuminance(rgb: RGB): number {
  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((val) => {
    val /= 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function generateShades(hex: string, count: number = 10): string[] {
  const rgb = hexToRgb(hex);
  if (!rgb) return [];

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const shades: string[] = [];

  for (let i = 0; i < count; i++) {
    const lightness = 10 + (i * 80) / (count - 1);
    const newRgb = hslToRgb(hsl.h, hsl.s, lightness);
    shades.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
  }

  return shades;
}

export function generateTints(hex: string, count: number = 5): string[] {
  const rgb = hexToRgb(hex);
  if (!rgb) return [];

  const tints: string[] = [hex];

  for (let i = 1; i < count; i++) {
    const ratio = i / count;
    const r = Math.round(rgb.r + (255 - rgb.r) * ratio);
    const g = Math.round(rgb.g + (255 - rgb.g) * ratio);
    const b = Math.round(rgb.b + (255 - rgb.b) * ratio);
    tints.push(rgbToHex(r, g, b));
  }

  return tints;
}

export function generateTones(hex: string, count: number = 5): string[] {
  const rgb = hexToRgb(hex);
  if (!rgb) return [];

  const tones: string[] = [hex];

  for (let i = 1; i < count; i++) {
    const ratio = i / count;
    const r = Math.round(rgb.r + (128 - rgb.r) * ratio);
    const g = Math.round(rgb.g + (128 - rgb.g) * ratio);
    const b = Math.round(rgb.b + (128 - rgb.b) * ratio);
    tones.push(rgbToHex(r, g, b));
  }

  return tones;
}

export function generateComplementary(hex: string): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const newHue = (hsl.h + 180) % 360;
  const newRgb = hslToRgb(newHue, hsl.s, hsl.l);
  return rgbToHex(newRgb.r, newRgb.g, newRgb.b);
}

export function generateAnalogous(hex: string): string[] {
  const rgb = hexToRgb(hex);
  if (!rgb) return [hex];

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const colors = [hex];

  for (const offset of [-30, 30]) {
    const newHue = (hsl.h + offset + 360) % 360;
    const newRgb = hslToRgb(newHue, hsl.s, hsl.l);
    colors.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
  }

  return colors;
}

export function generateTriadic(hex: string): string[] {
  const rgb = hexToRgb(hex);
  if (!rgb) return [hex];

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const colors = [hex];

  for (const offset of [120, 240]) {
    const newHue = (hsl.h + offset) % 360;
    const newRgb = hslToRgb(newHue, hsl.s, hsl.l);
    colors.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
  }

  return colors;
}

export function generateTetradic(hex: string): string[] {
  const rgb = hexToRgb(hex);
  if (!rgb) return [hex];

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const colors = [hex];

  for (const offset of [90, 180, 270]) {
    const newHue = (hsl.h + offset) % 360;
    const newRgb = hslToRgb(newHue, hsl.s, hsl.l);
    colors.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
  }

  return colors;
}

export function simulateColorBlindness(hex: string, type: string): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  let r = rgb.r / 255;
  let g = rgb.g / 255;
  let b = rgb.b / 255;

  let newR = 0,
    newG = 0,
    newB = 0;

  switch (type) {
    case "protanopia":
      newR = 0.567 * r + 0.433 * g;
      newG = 0.558 * r + 0.442 * g;
      newB = 0.242 * g + 0.758 * b;
      break;
    case "deuteranopia":
      newR = 0.625 * r + 0.375 * g;
      newG = 0.7 * r + 0.3 * g;
      newB = 0.3 * g + 0.7 * b;
      break;
    case "tritanopia":
      newR = 0.95 * r + 0.05 * g;
      newG = 0.433 * g + 0.567 * b;
      newB = 0.475 * g + 0.525 * b;
      break;
    default:
      return hex;
  }

  return rgbToHex(
    Math.round(newR * 255),
    Math.round(newG * 255),
    Math.round(newB * 255)
  );
}

/**
 * FAST, robust color extraction:
 * - samples pixels for performance
 * - ignores transparent / near-white / near-black pixels
 * - runs a median-cut quantization to return up to maxColors
 */
export function extractColorsFromImage(
  imageData: ImageData,
  maxColors: number = 8
): string[] {
  const { data, width, height } = imageData;
  const pixels: RGB[] = [];
  const totalPixels = width * height;
  const targetSampleCount = 5000;
  const step = Math.max(1, Math.floor(totalPixels / targetSampleCount));

  for (let i = 0; i < totalPixels; i += step) {
    const offset = i * 4;
    const r = data[offset];
    const g = data[offset + 1];
    const b = data[offset + 2];
    const a = data[offset + 3];

    if (a < 125) continue;

    const brightness = (r + g + b) / 3;
    if (brightness < 20 || brightness > 235) continue;

    pixels.push({ r, g, b });
  }

  if (pixels.length === 0) {
    return ["#CCCCCC"];
  }

  const clusters = medianCutQuantization(pixels, maxColors);

  clusters.sort((a, b) => {
    const aBright = (a.r * 299 + a.g * 587 + a.b * 114) / 1000;
    const bBright = (b.r * 299 + b.g * 587 + b.b * 114) / 1000;
    return bBright - aBright;
  });

  return clusters.map((c) => rgbToHex(c.r, c.g, c.b));
}

function medianCutQuantization(pixels: RGB[], maxColors: number): RGB[] {
  if (pixels.length === 0) return [];

  let boxes: RGB[][] = [pixels];

  while (boxes.length < maxColors) {
    let largestBoxIndex = 0;
    let largestRange = -1;

    for (let i = 0; i < boxes.length; i++) {
      const range = getColorRange(boxes[i]);
      if (range > largestRange) {
        largestRange = range;
        largestBoxIndex = i;
      }
    }

    const boxToSplit = boxes.splice(largestBoxIndex, 1)[0];
    if (!boxToSplit || boxToSplit.length <= 1) {
      break;
    }

    const [box1, box2] = splitBox(boxToSplit);
    if (box1.length === 0 || box2.length === 0) {
      boxes.push(boxToSplit);
      break;
    }
    boxes.push(box1, box2);
  }

  return boxes.map((box) => {
    const sum = box.reduce(
      (acc, p) => {
        acc.r += p.r;
        acc.g += p.g;
        acc.b += p.b;
        return acc;
      },
      { r: 0, g: 0, b: 0 }
    );
    const len = box.length || 1;
    return {
      r: Math.round(sum.r / len),
      g: Math.round(sum.g / len),
      b: Math.round(sum.b / len),
    };
  });
}

function getColorRange(box: RGB[]): number {
  const rVals = box.map((p) => p.r);
  const gVals = box.map((p) => p.g);
  const bVals = box.map((p) => p.b);
  const rRange = Math.max(...rVals) - Math.min(...rVals);
  const gRange = Math.max(...gVals) - Math.min(...gVals);
  const bRange = Math.max(...bVals) - Math.min(...bVals);
  return Math.max(rRange, gRange, bRange);
}

function splitBox(box: RGB[]): [RGB[], RGB[]] {
  const rRange =
    Math.max(...box.map((p) => p.r)) - Math.min(...box.map((p) => p.r));
  const gRange =
    Math.max(...box.map((p) => p.g)) - Math.min(...box.map((p) => p.g));
  const bRange =
    Math.max(...box.map((p) => p.b)) - Math.min(...box.map((p) => p.b));

  const channel: "r" | "g" | "b" =
    rRange >= gRange && rRange >= bRange ? "r" : gRange >= bRange ? "g" : "b";

  const sorted = [...box].sort((a, b) => a[channel] - b[channel]);
  const mid = Math.floor(sorted.length / 2);
  return [sorted.slice(0, mid), sorted.slice(mid)];
}

export function getColorName(hex: string): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return "Unknown";

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  if (hsl.s < 10) {
    if (hsl.l < 20) return "Black";
    if (hsl.l < 40) return "Dark Gray";
    if (hsl.l < 60) return "Gray";
    if (hsl.l < 80) return "Light Gray";
    return "White";
  }

  const hue = hsl.h;
  if (hue < 15 || hue >= 345) return "Red";
  if (hue < 45) return "Orange";
  if (hue < 75) return "Yellow";
  if (hue < 165) return "Green";
  if (hue < 255) return "Blue";
  if (hue < 285) return "Purple";
  if (hue < 345) return "Pink";

  return "Unknown";
}
