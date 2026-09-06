import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Quote, Sparkles, Building2, TrendingUp, Check } from 'lucide-react';
import { CaseStudy } from '../types';

export const CasesSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  const categories = ['Todos', 'Luxury Tech', 'Fintech', 'Arquitetura'];

  const cases: CaseStudy[] = [
    {
      id: 'case-monolith',
      client: 'Monolith Acoustic',
      category: 'Luxury Tech',
      year: '2025',
      title: 'Lançamento Global do Dispositivo de Áudio Analógico Monolith X',
      metric: '+340%',
      metricLabel: 'Aumento em Vendas Antecipadas',
      description:
        'Desenvolvimento completo do site de produto com scroll-scrubbing tridimensional, direção de arte minimalista e arquitetura zero-latency.',
      quote:
        'A Aura transformou um produto industrial complexo em uma experiência cinematográfica que esgotou nosso primeiro lote em 48 horas.',
      author: 'Marcus Vance',
      authorRole: 'Vice-Presidente de Design & Hardware',
      tags: ['Hardware 3D', 'Next.js', 'Framer Motion'],
    },
    {
      id: 'case-kinetix',
      client: 'Kinetix Quantum',
      category: 'Fintech',
      year: '2025',
      title: 'Reposicionamento Institucional para Rodada de Série B',
      metric: '0.38s',
      metricLabel: 'LCP Global & 100/100 Lighthouse',
      description:
        'Novo portal institucional e design system tipográfico para uma das plataformas de computação de alta frequência mais respeitadas do mercado.',
      quote:
        'O rigor arquitetural e a ausência de floreios redundantes nos permitiram transmitir seriedade imediata aos investidores de Nova York.',
      author: 'Dra. Elena Rostova',
      authorRole: 'Co-Fundadora & CTO',
      tags: ['Fintech', 'Design System', 'Zero-Latency'],
    },
    {
      id: 'case-vanguarda',
      client: 'Vanguarda Arquitetura',
      category: 'Arquitetura',
      year: '2024',
      title: 'Portfólio Monolítico para Estúdio de Urbanismo Contemporâneo',
      metric: '+210%',
      metricLabel: 'Geração de Briefings Qualificados',
      description:
        'Plataforma interativa com transições fluidas por scroll e catálogo imersivo de projetos residenciais e corporativos de alto padrão.',
      quote:
        'Pela primeira vez, nosso ambiente digital reflete o mesmo cuidado milimétrico que aplicamos às nossas obras em concreto aparente e vidro.',
      author: 'Roberto Silveira',
      authorRole: 'Sócio-Diretor Criativo',
      tags: ['Arquitetura', 'Editorial', 'Interação por Scroll'],
    },
    {
      id: 'case-aerolux',
      client: 'Aerolux Mobility',
      category: 'Luxury Tech',
      year: '2024',
      title: 'Experiência Digital da Primeira Linha de Aeronaves Urbanas eVTOL',
      metric: '$18M',
      metricLabel: 'Capital Captado pós-lançamento do portal',
      description:
        'Apresentação interativa com modelo exploded view da cabine aeroespacial, permitindo aos passageiros explorar a aerodinâmica em tempo real.',
      quote:
        'A experiência fluida a 120 FPS e o design limpo elevaram nossa percepção de valor a um patamar que impressionou fundos globais.',
      author: 'Sophia Chen',
      authorRole: 'Head de Experiência de Marca',
      tags: ['Aeroespacial', 'WebGL', 'Narrativa Interativa'],
    },
  ];

  const filteredCases =
    selectedCategory === 'Todos'
      ? cases
      : cases.filter((c) => c.category === selectedCategory);

  return (
    <section
      id="cases"
      className="relative py-28 sm:py-36 px-6 sm:px-8 max-w-7xl mx-auto bg-[#09090b] text-white border-t border-white/[0.06]"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="w-8 h-[1px] bg-amber-500" />
            <span className="text-xs uppercase font-mono tracking-widest text-amber-400">
              Evidências // Cases & Depoimentos
            </span>
          </motion.div>

          <motion.h2
            id="cases-section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-white leading-tight"
          >
            RESULTADOS TANGÍVEIS. PARCERIAS DEFINITIVAS.
          </motion.h2>
        </div>

        {/* Filter Categories */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 p-1.5 rounded-full bg-white/[0.03] border border-white/[0.08]"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-black font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Cases Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredCases.map((item, idx) => (
            <motion.div
              key={item.id}
              id={`case-card-${item.id}`}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="p-8 sm:p-12 rounded-3xl bg-white/[0.02] border border-white/[0.08] hover:border-amber-500/40 transition-colors flex flex-col justify-between"
            >
              <div>
                {/* Meta Top Line */}
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <span className="text-xs uppercase font-mono tracking-widest text-amber-400">
                      {item.client}
                    </span>
                    <span className="text-zinc-600">•</span>
                    <span className="text-xs font-mono text-zinc-500">{item.year}</span>
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-white/5 text-zinc-400">
                    {item.category}
                  </span>
                </div>

                {/* Big Metric Display */}
                <div className="mb-6">
                  <div className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
                    {item.metric}
                  </div>
                  <div className="text-xs uppercase font-mono tracking-wider text-amber-400 mt-1">
                    {item.metricLabel}
                  </div>
                </div>

                {/* Title and Scope */}
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-3 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed mb-8">
                  {item.description}
                </p>

                {/* Client Testimonial Quote */}
                <div className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/5 mb-8">
                  <Quote className="w-5 h-5 text-amber-500/60 mb-2" />
                  <p className="text-sm text-zinc-200 italic leading-relaxed">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/5 text-xs">
                    <div>
                      <div className="font-semibold text-white">{item.author}</div>
                      <div className="text-zinc-500 font-mono text-[11px]">{item.authorRole}</div>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <Check className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags and Case Link */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/[0.06]">
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-md bg-white/[0.04] text-[10px] font-mono text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="text-xs font-mono text-amber-400 flex items-center gap-1 hover:underline cursor-pointer">
                  <span>Estudo detalhado</span>
                  <ArrowUpRight className="w-3 h-3" />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};
