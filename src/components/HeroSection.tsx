import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown, ArrowUpRight, Play, ShieldCheck, Sparkles } from 'lucide-react';
import { useSmoothScroll } from './SmoothScrollProvider';

interface HeroSectionProps {
  onOpenContact: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact }) => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollTo } = useSmoothScroll();

  // Scroll-linked light parallax effect on hero
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 800], [0, 140]);
  const opacityParallax = useTransform(scrollY, [0, 600], [1, 0.15]);
  const scaleVideo = useTransform(scrollY, [0, 800], [1, 1.08]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#09090b] pt-24 pb-16 px-6 sm:px-8"
    >
      {/* Background Video with light parallax scaling */}
      <motion.div
        style={{ scale: scaleVideo }}
        className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
      >
        <video
          id="hero-background-video"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1920&auto=format&fit=crop"
          className="w-full h-full object-cover object-center"
        >
          {/* High reliability ambient loops */}
          <source
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
            type="video/mp4"
          />
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-dark-background-42999-large.mp4"
            type="video/mp4"
          />
        </video>
      </motion.div>

      {/* Dark semi-transparent overlay (rgba 40-50% black) for optimal legibility */}
      <div
        id="hero-video-overlay"
        aria-hidden="true"
        className="absolute inset-0 z-10 bg-black/45 backdrop-brightness-[0.8] transition-opacity"
      />

      {/* Subtle radial gradient for photographic depth */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(9,9,11,0.75)_90%)]"
      />

      {/* Foreground Hero Content */}
      <motion.div
        style={{ y: yParallax, opacity: opacityParallax }}
        className="relative z-20 max-w-5xl mx-auto flex flex-col items-center text-center mt-6"
      >
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.08] border border-white/[0.15] backdrop-blur-md mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs font-medium tracking-wider uppercase text-zinc-200">
            Design Institucional & Tecnológico
          </span>
        </motion.div>

        {/* Big Centralized Title with requested animation (opacity 0->1, y: 20->0) */}
        <motion.h1
          id="hero-main-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold text-white tracking-tight leading-[1.04] max-w-4xl"
        >
          SIMPLICIDADE RADICAL. IMPACTO MENSURÁVEL.
        </motion.h1>

        {/* Subtitle with 0.2s delay relative to title */}
        <motion.p
          id="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 text-lg sm:text-xl md:text-2xl text-zinc-300 max-w-2xl font-normal leading-relaxed"
        >
          Projetamos interfaces, arquiteturas digitais e experiências esculturais para marcas que definem seu tempo.
        </motion.p>

        {/* CTA Button with whileHover (scale 1.05) and whileTap (scale 0.95) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-5"
        >
          <motion.button
            id="hero-primary-cta"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenContact}
            className="w-full sm:w-auto px-9 py-4 rounded-full bg-white text-black font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-3 shadow-2xl hover:bg-amber-400 hover:text-black transition-colors cursor-pointer group"
          >
            <span>Iniciar Parceria</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.button>

          <motion.button
            id="hero-secondary-cta"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollTo('#monolito-experience')}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white font-medium text-sm tracking-wider border border-white/15 backdrop-blur-md flex items-center justify-center gap-2.5 transition-colors cursor-pointer"
          >
            <span>Ver Experiência Monólito</span>
            <ArrowDown className="w-3.5 h-3.5 text-amber-400" />
          </motion.button>
        </motion.div>

        {/* Bottom Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 pt-8 border-t border-white/[0.08] w-full max-w-3xl flex flex-wrap items-center justify-around gap-6 text-zinc-400 text-xs tracking-wider uppercase font-mono"
        >
          <div className="flex items-center gap-2">
            <span className="text-white font-bold">14+</span>
            <span>Anos em Produção</span>
          </div>
          <span className="hidden sm:inline text-zinc-700">•</span>
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-bold">120 FPS</span>
            <span>Experiência Fluida</span>
          </div>
          <span className="hidden sm:inline text-zinc-700">•</span>
          <div className="flex items-center gap-2">
            <span className="text-white font-bold">A+</span>
            <span>Métricas Core Web Vitals</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Down Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2 cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
        onClick={() => scrollTo('#sobre')}
      >
        <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-400">Scroll</span>
        <ArrowDown className="w-4 h-4 text-amber-400" />
      </motion.div>
    </section>
  );
};
