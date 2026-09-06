import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { Cpu, Layers, Sparkles, Sliders, Play, RotateCcw } from 'lucide-react';
import { ScrubMilestone } from '../types';

const TOTAL_FRAMES = 120;
const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 800;

export const ScrollScrubbingSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Cache of pre-rendered frame canvases or ImageBitmaps
  const framesCacheRef = useRef<OffscreenCanvas[] | HTMLCanvasElement[]>([]);
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [preloadProgress, setPreloadProgress] = useState(0);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [manualScrubValue, setManualScrubValue] = useState<number | null>(null);

  // Framer Motion scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Map scroll progress (0 to 1) to frame index (0 to TOTAL_FRAMES - 1)
  const frameTransform = useTransform(scrollYProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

  // Stage transforms for overlay texts
  // Stage 1: 0.05 to 0.24
  const stage1Opacity = useTransform(scrollYProgress, [0.03, 0.08, 0.20, 0.25], [0, 1, 1, 0]);
  const stage1Y = useTransform(scrollYProgress, [0.03, 0.08, 0.20, 0.25], [30, 0, 0, -30]);

  // Stage 2: 0.28 to 0.48
  const stage2Opacity = useTransform(scrollYProgress, [0.27, 0.33, 0.45, 0.50], [0, 1, 1, 0]);
  const stage2Y = useTransform(scrollYProgress, [0.27, 0.33, 0.45, 0.50], [30, 0, 0, -30]);

  // Stage 3: 0.53 to 0.73
  const stage3Opacity = useTransform(scrollYProgress, [0.52, 0.58, 0.70, 0.75], [0, 1, 1, 0]);
  const stage3Y = useTransform(scrollYProgress, [0.52, 0.58, 0.70, 0.75], [30, 0, 0, -30]);

  // Stage 4: 0.78 to 0.96
  const stage4Opacity = useTransform(scrollYProgress, [0.77, 0.83, 0.94, 0.98], [0, 1, 1, 0]);
  const stage4Y = useTransform(scrollYProgress, [0.77, 0.83, 0.94, 0.98], [30, 0, 0, -30]);

  // Draw a frame onto the main visible canvas
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const boundedIdx = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(frameIdx)));
    const frameSource = framesCacheRef.current[boundedIdx];

    if (frameSource) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(frameSource, 0, 0, canvas.width, canvas.height);
    }
  }, []);

  // Update canvas on scroll progress change
  useMotionValueEvent(frameTransform, 'change', (latest) => {
    if (manualScrubValue === null) {
      const idx = Math.round(latest);
      setCurrentFrameIndex(idx);
      drawFrame(idx);
    }
  });

  // Pre-render the 120-frame sequence mathematically into high-DPI offscreen canvases
  useEffect(() => {
    let isMounted = true;
    const frames: (HTMLCanvasElement | OffscreenCanvas)[] = [];

    const generateAllFrames = async () => {
      const BATCH_SIZE = 12;
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        if (!isMounted) return;

        // Create frame canvas
        let offscreen: HTMLCanvasElement;
        offscreen = document.createElement('canvas');
        offscreen.width = CANVAS_WIDTH;
        offscreen.height = CANVAS_HEIGHT;
        const ctx = offscreen.getContext('2d');

        if (ctx) {
          renderMonolithFrame(ctx, i, TOTAL_FRAMES, CANVAS_WIDTH, CANVAS_HEIGHT);
        }

        frames.push(offscreen);

        // Update progress asynchronously to keep UI responsive
        if (i % BATCH_SIZE === 0 || i === TOTAL_FRAMES - 1) {
          const progress = Math.round(((i + 1) / TOTAL_FRAMES) * 100);
          setPreloadProgress(progress);
          // Yield briefly to event loop
          await new Promise((res) => setTimeout(res, 8));
        }
      }

      if (isMounted) {
        framesCacheRef.current = frames;
        setIsPreloaded(true);
        // Draw the initial frame
        drawFrame(0);
      }
    };

    generateAllFrames();

    return () => {
      isMounted = false;
    };
  }, [drawFrame]);

  // Handle manual scrub override (for inspection)
  const handleManualScrub = (val: number) => {
    setManualScrubValue(val);
    setCurrentFrameIndex(val);
    drawFrame(val);
  };

  const handleReleaseManualScrub = () => {
    setManualScrubValue(null);
  };

  return (
    <section
      id="monolito-experience"
      ref={containerRef}
      className="relative w-full bg-[#070709] border-t border-b border-white/[0.06] text-white"
      style={{ height: '400vh' }} // High 400vh container for scrubbing as requested
    >
      {/* Sticky Fullscreen Stage */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        {/* Background Ambient Radial Glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(217,119,6,0.07)_0%,transparent_65%)]"
        />

        {/* Top Floating Telemetry Header */}
        <div className="absolute top-20 left-0 right-0 z-30 px-6 sm:px-12 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
              AURA CORE 01 // INTERACTIVE SCRUBBER
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
            <div className="hidden sm:flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
              <span className="text-zinc-500">TAXA:</span>
              <span className="text-white font-bold">120 QUADROS</span>
            </div>
            <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
              <span className="text-zinc-500">FRAME:</span>
              <span className="text-amber-400 font-bold">
                {String(currentFrameIndex + 1).padStart(3, '0')} / {TOTAL_FRAMES}
              </span>
            </div>
          </div>
        </div>

        {/* Preload Overlay if frames are computing */}
        {!isPreloaded && (
          <div className="absolute inset-0 z-40 bg-[#070709] flex flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="w-12 h-12 rounded-full border-2 border-white/10 border-t-amber-500 animate-spin mb-2" />
            <span className="font-display font-bold text-lg tracking-wider text-white">
              PRÉ-CARREGANDO SEQUÊNCIA CINEMATOGRÁFICA
            </span>
            <p className="text-sm text-zinc-400 max-w-md font-mono">
              Renderizando 120 quadros de ultra-alta fidelidade para rolagem a 60fps instantânea.
            </p>
            <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden mt-2">
              <div
                className="h-full bg-amber-500 transition-all duration-150 ease-out"
                style={{ width: `${preloadProgress}%` }}
              />
            </div>
            <span className="text-xs font-mono text-amber-400">{preloadProgress}%</span>
          </div>
        )}

        {/* Main Canvas Element for Scroll-Scrubbing */}
        <div className="relative w-full max-w-6xl aspect-[16/10] max-h-[75vh] flex items-center justify-center p-2 sm:p-6 z-10">
          <canvas
            id="apple-scrub-canvas"
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            className="w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
          />

          {/* Overlaid Texts that appear and disappear at specific scroll points */}
          
          {/* Milestone 1 (Progress ~0.05 - 0.22) */}
          <motion.div
            style={{ opacity: stage1Opacity, y: stage1Y }}
            className="absolute left-6 sm:left-16 bottom-24 sm:bottom-28 max-w-md pointer-events-none"
          >
            <div className="inline-block px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-mono tracking-widest uppercase mb-3">
              Fase 01 // Estrutura Externa
            </div>
            <h3 className="text-2xl sm:text-4xl font-display font-extrabold tracking-tight text-white leading-tight">
              PRECISÃO EM CADA MICRÔMETRO.
            </h3>
            <p className="text-sm sm:text-base text-zinc-300 mt-2 leading-relaxed">
              Monólito forjado em titânio aeroespacial e cristal de safira, desenhado para resistir ao tempo sem ornamentos supérfluos.
            </p>
          </motion.div>

          {/* Milestone 2 (Progress ~0.28 - 0.48) */}
          <motion.div
            style={{ opacity: stage2Opacity, y: stage2Y }}
            className="absolute right-6 sm:right-16 top-28 sm:top-36 max-w-md pointer-events-none text-right"
          >
            <div className="inline-block px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-mono tracking-widest uppercase mb-3">
              Fase 02 // Núcleo Generativo
            </div>
            <h3 className="text-2xl sm:text-4xl font-display font-extrabold tracking-tight text-white leading-tight">
              CÂMARA DE RESSONÂNCIA.
            </h3>
            <p className="text-sm sm:text-base text-zinc-300 mt-2 leading-relaxed">
              Geometria parabólica interna que dissipa calor passivamente enquanto canaliza luz através de prismas ópticos reflexivos.
            </p>
          </motion.div>

          {/* Milestone 3 (Progress ~0.54 - 0.74) */}
          <motion.div
            style={{ opacity: stage3Opacity, y: stage3Y }}
            className="absolute left-6 sm:left-16 top-28 sm:top-36 max-w-md pointer-events-none"
          >
            <div className="inline-block px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-mono tracking-widest uppercase mb-3">
              Fase 03 // Desconstrução Modular
            </div>
            <h3 className="text-2xl sm:text-4xl font-display font-extrabold tracking-tight text-white leading-tight">
              HARMONIA EM CAMADAS.
            </h3>
            <p className="text-sm sm:text-base text-zinc-300 mt-2 leading-relaxed">
              Sete camadas independentes articuladas por campos magnéticos, permitindo desmontagem e manutenção com desperdício zero.
            </p>
          </motion.div>

          {/* Milestone 4 (Progress ~0.80 - 0.98) */}
          <motion.div
            style={{ opacity: stage4Opacity, y: stage4Y }}
            className="absolute right-6 sm:right-16 bottom-24 sm:bottom-28 max-w-md pointer-events-none text-right"
          >
            <div className="inline-block px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-mono tracking-widest uppercase mb-3">
              Fase 04 // Síntese Arquitetural
            </div>
            <h3 className="text-2xl sm:text-4xl font-display font-extrabold tracking-tight text-white leading-tight">
              O PADRÃO DEFINITIVO.
            </h3>
            <p className="text-sm sm:text-base text-zinc-300 mt-2 leading-relaxed">
              Não é apenas um produto ou uma tela: é a transposição física da nossa obsessão por clareza, silêncio e autoridade visual.
            </p>
          </motion.div>
        </div>

        {/* Bottom Interactive Scrubber Bar (Manual Drag & Scroll Feedback) */}
        <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 z-30 px-6 max-w-xl mx-auto flex flex-col items-center gap-2">
          <div className="w-full flex items-center justify-between text-[11px] font-mono text-zinc-400">
            <span className="flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              Role a página para scrub ou deslize a barra
            </span>
            <span className="text-zinc-400 font-bold">
              {Math.round((currentFrameIndex / (TOTAL_FRAMES - 1)) * 100)}%
            </span>
          </div>

          <div className="w-full relative flex items-center">
            <input
              id="manual-frame-scrubber-slider"
              type="range"
              min={0}
              max={TOTAL_FRAMES - 1}
              value={currentFrameIndex}
              onChange={(e) => handleManualScrub(Number(e.target.value))}
              onMouseUp={handleReleaseManualScrub}
              onTouchEnd={handleReleaseManualScrub}
              aria-label="Controle deslizante de quadros de animação"
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-500 hover:bg-white/20 transition-all"
            />
          </div>

          {/* Scrub Milestones Dots */}
          <div className="w-full flex justify-between px-1 text-[10px] text-zinc-400 font-mono">
            <span>01. Estrutura</span>
            <span>02. Núcleo</span>
            <span>03. Camadas</span>
            <span>04. Síntese</span>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * Procedural 3D Frame Renderer for Aura Monolith Product Page
 * Renders realistic rotating isometric faceted geometry, internal glowing optic cores,
 * dynamic exploded layers, specular highlights, and ambient reflections.
 */
function renderMonolithFrame(
  ctx: CanvasRenderingContext2D,
  frameIndex: number,
  totalFrames: number,
  width: number,
  height: number
) {
  // Clear canvas
  ctx.clearRect(0, 0, width, height);

  const cx = width / 2;
  const cy = height / 2;
  const progress = frameIndex / (totalFrames - 1);

  // Rotation angles
  const angleY = progress * Math.PI * 2; // 360 degree rotation
  const angleX = Math.sin(progress * Math.PI * 2) * 0.28 + 0.25; // gentle tilt

  // Exploded expansion factor (expands in the middle stages around 0.5 - 0.75, then reassembles)
  let explosion = 0;
  if (progress > 0.45 && progress < 0.8) {
    // Smooth bell curve expansion
    const expProgress = (progress - 0.45) / 0.35;
    explosion = Math.sin(expProgress * Math.PI) * 75; // explode by 75px
  }

  // 1. Draw subtle background radial grid
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
  ctx.lineWidth = 1;

  // Grid rings
  for (let r = 80; r <= 380; r += 75) {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Cross lines
  ctx.beginPath();
  ctx.moveTo(cx - 400, cy);
  ctx.lineTo(cx + 400, cy);
  ctx.moveTo(cx, cy - 300);
  ctx.lineTo(cx, cy + 300);
  ctx.stroke();

  // Floating degree ticks
  ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.font = '10px monospace';
  ctx.fillText(`ROT_Y: ${(progress * 360).toFixed(1)}°`, cx - 380, cy - 260);
  ctx.fillText(`AXIS_ELEV: ${(angleX * 57.3).toFixed(1)}°`, cx - 380, cy - 240);
  ctx.fillText(`EXP_FACTOR: ${explosion.toFixed(1)}mm`, cx - 380, cy - 220);
  ctx.restore();

  // 3D icosahedron/faceted monolith vertices & faces
  // We'll project multiple layers:
  // Layer A: Base pedestal plate (dark titanium)
  // Layer B: Core optic emitter (amber glowing sphere & rings)
  // Layer C: Monolith faceted prisms & floating armor shells (brushed gunmetal)
  // Layer D: Top lens cap

  // 3D projection helper
  const project3D = (x: number, y: number, z: number, yOffset = 0) => {
    const cosY = Math.cos(angleY);
    const sinY = Math.sin(angleY);
    const cosX = Math.cos(angleX);
    const sinX = Math.sin(angleX);

    // Rotate Y
    const x1 = x * cosY + z * sinY;
    const z1 = -x * sinY + z * cosY;

    // Rotate X
    const y1 = (y + yOffset) * cosX - z1 * sinX;
    const z2 = (y + yOffset) * sinX + z1 * cosX;

    // Perspective projection
    const fov = 650;
    const scale = fov / (fov + z2 + 250);
    return {
      x: cx + x1 * scale,
      y: cy + y1 * scale,
      z: z2,
      scale,
    };
  };

  // 2. Draw Glow behind Core
  const corePos = project3D(0, 0, 0);
  const glowGrad = ctx.createRadialGradient(corePos.x, corePos.y, 5, corePos.x, corePos.y, 140);
  glowGrad.addColorStop(0, 'rgba(245, 158, 11, 0.45)');
  glowGrad.addColorStop(0.5, 'rgba(217, 119, 6, 0.15)');
  glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = glowGrad;
  ctx.beginPath();
  ctx.arc(corePos.x, corePos.y, 140, 0, Math.PI * 2);
  ctx.fill();

  // 3. Draw Exploded Rings (3 concentric titanium rings with tick marks)
  const ringCount = 3;
  for (let r = 0; r < ringCount; r++) {
    const ringRadius = 130 + r * 35;
    const ringY = (r - 1) * explosion * 0.8;
    const points: { x: number; y: number; z: number }[] = [];
    const segments = 36;

    for (let s = 0; s <= segments; s++) {
      const theta = (s / segments) * Math.PI * 2;
      const px = Math.cos(theta) * ringRadius;
      const pz = Math.sin(theta) * ringRadius;
      points.push(project3D(px, ringY, pz));
    }

    ctx.save();
    ctx.beginPath();
    points.forEach((pt, idx) => {
      if (idx === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    });
    ctx.closePath();

    // Ring styling
    ctx.strokeStyle = r === 1 ? 'rgba(245, 158, 11, 0.7)' : 'rgba(220, 220, 230, 0.35)';
    ctx.lineWidth = r === 1 ? 2.5 : 1.5;
    ctx.stroke();

    // Draw notch markers on the ring
    for (let m = 0; m < 8; m++) {
      const notchTheta = (m / 8) * Math.PI * 2 + angleY * 0.5;
      const p1 = project3D(Math.cos(notchTheta) * (ringRadius - 8), ringY, Math.sin(notchTheta) * (ringRadius - 8));
      const p2 = project3D(Math.cos(notchTheta) * (ringRadius + 8), ringY, Math.sin(notchTheta) * (ringRadius + 8));
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    ctx.restore();
  }

  // 4. Central Monolithic Core: High-tech Faceted Prism
  const prismHeight = 160;
  const prismRadius = 85;
  const sides = 6;

  // Generate top and bottom polygon vertices with exploded offsets
  const topY = -prismHeight / 2 - explosion;
  const bottomY = prismHeight / 2 + explosion;

  const topVertices: { x: number; y: number; z: number; scale: number }[] = [];
  const bottomVertices: { x: number; y: number; z: number; scale: number }[] = [];

  for (let i = 0; i < sides; i++) {
    const theta = (i / sides) * Math.PI * 2;
    const px = Math.cos(theta) * prismRadius;
    const pz = Math.sin(theta) * prismRadius;
    topVertices.push(project3D(px, topY, pz));
    bottomVertices.push(project3D(px, bottomY, pz));
  }

  // Draw side faces sorted by Z depth for proper occlusion
  interface Face {
    v1: { x: number; y: number; z: number; scale: number };
    v2: { x: number; y: number; z: number; scale: number };
    v3: { x: number; y: number; z: number; scale: number };
    v4: { x: number; y: number; z: number; scale: number };
    avgZ: number;
    normalDot: number;
  }

  const faces: Face[] = [];
  for (let i = 0; i < sides; i++) {
    const next = (i + 1) % sides;
    const v1 = topVertices[i];
    const v2 = topVertices[next];
    const v3 = bottomVertices[next];
    const v4 = bottomVertices[i];
    const avgZ = (v1.z + v2.z + v3.z + v4.z) / 4;

    // Rough normal calculation for specular lighting
    const midAngle = ((i + 0.5) / sides) * Math.PI * 2 + angleY;
    const lightDot = Math.cos(midAngle - 0.7); // Light coming from top-right

    faces.push({ v1, v2, v3, v4, avgZ, normalDot: lightDot });
  }

  // Sort faces from back to front
  faces.sort((a, b) => b.avgZ - a.avgZ);

  faces.forEach((face) => {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(face.v1.x, face.v1.y);
    ctx.lineTo(face.v2.x, face.v2.y);
    ctx.lineTo(face.v3.x, face.v3.y);
    ctx.lineTo(face.v4.x, face.v4.y);
    ctx.closePath();

    // Metallic titanium gradient calculation
    const light = Math.max(0.1, (face.normalDot + 1) / 2);
    const grad = ctx.createLinearGradient(face.v1.x, face.v1.y, face.v3.x, face.v3.y);
    
    // Titanium shade with subtle amber reflection
    const baseVal = Math.floor(30 + light * 130);
    const highlightVal = Math.floor(60 + light * 180);
    
    grad.addColorStop(0, `rgb(${highlightVal}, ${highlightVal}, ${highlightVal + 8})`);
    grad.addColorStop(0.5, `rgb(${baseVal}, ${baseVal}, ${baseVal + 5})`);
    grad.addColorStop(1, `rgb(${baseVal - 15}, ${baseVal - 15}, ${baseVal - 10})`);

    ctx.fillStyle = grad;
    ctx.fill();

    // Edge wireframe highlight
    ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 + light * 0.4})`;
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // Micro laser-etched lines on facet
    if (face.normalDot > 0.2) {
      ctx.beginPath();
      const mid1X = (face.v1.x + face.v4.x) / 2;
      const mid1Y = (face.v1.y + face.v4.y) / 2;
      const mid2X = (face.v2.x + face.v3.x) / 2;
      const mid2Y = (face.v2.y + face.v3.y) / 2;
      ctx.moveTo(mid1X, mid1Y);
      ctx.lineTo(mid2X, mid2Y);
      ctx.strokeStyle = 'rgba(217, 119, 6, 0.4)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    ctx.restore();
  });

  // 5. Draw Top Cap with glowing Aperture
  ctx.save();
  ctx.beginPath();
  topVertices.forEach((v, idx) => {
    if (idx === 0) ctx.moveTo(v.x, v.y);
    else ctx.lineTo(v.x, v.y);
  });
  ctx.closePath();
  const topGrad = ctx.createRadialGradient(corePos.x, topY, 10, corePos.x, topY, prismRadius);
  topGrad.addColorStop(0, 'rgba(245, 158, 11, 0.9)');
  topGrad.addColorStop(0.3, 'rgba(40, 40, 45, 0.9)');
  topGrad.addColorStop(1, 'rgba(20, 20, 24, 0.95)');
  ctx.fillStyle = topGrad;
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Floating top lens optic
  const lensPos = project3D(0, topY - 25, 0);
  ctx.beginPath();
  ctx.arc(lensPos.x, lensPos.y, 22 * lensPos.scale, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(217, 119, 6, 0.85)';
  ctx.fill();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();

  // 6. Suspended Floating Micro-Particles around the object
  ctx.save();
  for (let p = 0; p < 24; p++) {
    const pAngle = (p / 24) * Math.PI * 2 + angleY * 0.4;
    const pDist = 180 + ((p * 47) % 110);
    const pHeight = Math.sin(p * 3.7 + angleY) * 140;
    const p3d = project3D(Math.cos(pAngle) * pDist, pHeight, Math.sin(pAngle) * pDist);

    const pAlpha = Math.max(0.15, Math.min(0.9, (p3d.z + 200) / 400));
    ctx.fillStyle = p % 3 === 0 ? `rgba(245, 158, 11, ${pAlpha})` : `rgba(255, 255, 255, ${pAlpha * 0.6})`;
    ctx.beginPath();
    ctx.arc(p3d.x, p3d.y, (p % 2 === 0 ? 2 : 1.2) * p3d.scale, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}
