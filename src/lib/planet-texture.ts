import * as THREE from "three";

/**
 * Builds a lightweight procedural banded texture for a planet.
 * Cheap (512x256 canvas), generated once per planet and cached.
 */
const cache = new Map<string, THREE.CanvasTexture>();

export function planetTexture(
  key: string,
  colors: [string, string, string],
  bands: number,
): THREE.CanvasTexture {
  const cached = cache.get(key);
  if (cached) return cached;

  const w = 512;
  const h = 256;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;

  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, colors[1]);
  grad.addColorStop(0.5, colors[0]);
  grad.addColorStop(1, colors[1]);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // soft horizontal banding
  for (let i = 0; i < bands; i++) {
    const y = (i / bands) * h + Math.random() * 6;
    const bh = h / bands / (1.2 + Math.random());
    ctx.globalAlpha = 0.12 + Math.random() * 0.16;
    ctx.fillStyle = i % 2 === 0 ? colors[2] : colors[1];
    ctx.beginPath();
    ctx.ellipse(w / 2, y + bh / 2, w, bh / 2, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // mottling
  ctx.globalAlpha = 0.06;
  for (let i = 0; i < 700; i++) {
    ctx.fillStyle = i % 3 === 0 ? colors[2] : colors[1];
    const r = 2 + Math.random() * 12;
    ctx.beginPath();
    ctx.arc(Math.random() * w, Math.random() * h, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  cache.set(key, tex);
  return tex;
}
