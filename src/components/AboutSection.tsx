import React from 'react';
import { motion } from 'motion/react';
import { Compass, ShieldCheck, Zap, Sparkles, ArrowUpRight } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      icon: Compass,
      number: '01',
      title: 'Redução Radical',
      description:
        'Eliminamos qualquer ruído decorativo até que reste apenas a mensagem pura. O espaço em branco não é ausência: é autoridade e foco.',
    },
    {
      icon: Zap,
      number: '02',
      title: 'Engenharia Cirúrgica',
      description:
        'Interfaces calibradas para atingir 120 FPS constantes, tempos de carregamento submilisegundo e acessibilidade universal de padrão internacional.',
    },
    {
      icon: ShieldCheck,
      number: '03',
      title: 'Design Atemporal',
      description:
        'Não perseguimos tendências efêmeras. Construímos sistemas de identidade institucional formulados para permanecer relevantes pela próxima década.',
    },
  ];

  const stats = [
    { value: '14+', label: 'Anos de Trajetória', detail: 'Consistência inabalável' },
    { value: '180+', label: 'Sistemas Entregues', detail: 'América Latina, Europa e EUA' },
    { value: '99.4%', label: 'Índice de Retenção', detail: 'Parcerias de longo prazo' },
    { value: '28', label: 'Prêmios Internacionais', detail: 'Awwwards, Red Dot e FWA' },
  ];

  return (
    <section
      id="sobre"
      className="relative py-28 sm:py-36 lg:py-44 px-6 sm:px-8 max-w-7xl mx-auto bg-[#09090b] text-white"
    >
      {/* Background Subtle Accent Glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-amber-500/5 blur-[120px] pointer-events-none"
      />

      {/* Header Tag with Scroll Reveal */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-3 mb-6"
      >
        <span className="w-8 h-[1px] bg-amber-500" />
        <span className="text-xs uppercase font-mono tracking-widest text-amber-400">
          Sobre o Estúdio // Filosofia
        </span>
      </motion.div>

      {/* Hero Manifesto Statement */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-8"
        >
          <h2
            id="about-manifesto-title"
            className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-white leading-[1.12]"
          >
            CRIAMOS ESPAÇOS DIGITAIS ONDE CADA LINHA E CADA ESPAÇO TÊM GRAVIDADE.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-4 flex flex-col justify-between h-full pt-2"
        >
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Em um mundo saturado de ruído visual e modelos genéricos, a Aura posiciona marcas globais através da clareza arquitetônica. Acreditamos que a sofisticação máxima é o resultado da disciplina implacável.
          </p>

          <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full border border-amber-500/30 bg-amber-500/10 flex items-center justify-center text-amber-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs uppercase font-mono text-zinc-500">Fundação</div>
              <div className="text-sm font-semibold text-white">São Paulo & Lisboa</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Three Design Pillars */}
      <div className="mt-24 sm:mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
        {pillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <motion.div
              key={pillar.number}
              id={`about-pillar-${pillar.number}`}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-8 sm:p-10 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-amber-500/40 transition-colors duration-500 group flex flex-col justify-between min-h-[300px]"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-xs text-amber-400 tracking-widest">
                    {pillar.number}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-amber-400 transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-3 tracking-tight">
                  {pillar.title}
                </h3>

                <p className="text-sm text-zinc-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-zinc-500 font-mono">
                <span>PADRÃO AURA</span>
                <span className="text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  Saiba mais <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Metrics / Track Record Grid */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="mt-20 pt-16 border-t border-white/[0.08] grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12"
      >
        {stats.map((stat, idx) => (
          <div key={idx} className="flex flex-col">
            <span className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight">
              {stat.value}
            </span>
            <span className="mt-2 text-sm font-semibold text-zinc-200">
              {stat.label}
            </span>
            <span className="mt-1 text-xs text-zinc-500 font-mono">
              {stat.detail}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  );
};
