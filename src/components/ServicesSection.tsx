import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Layers, Cpu, Compass, Sliders, CheckCircle2, X } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [activeModal, setActiveModal] = useState<ServiceItem | null>(null);

  const services: ServiceItem[] = [
    {
      id: 'srv-1',
      number: '01',
      title: 'Identidade & Sistemas de Design',
      tagline: 'A linguagem visual que ancora sua autoridade',
      description:
        'Desenvolvemos ecossistemas visuais completos para marcas globais. Não apenas logotipos, mas manuais de design sistêmicos com tokens de tipografia, cores calculadas opticamente e componentes reutilizáveis.',
      capabilities: [
        'Arquitetura de Marca & Tom de Voz',
        'Design Systems em Figma & Storybook',
        'Diretrizes de Tipografia Matemática',
        'Iconografia Exclusiva e Assets Vetoriais',
      ],
      deliverables: 'Design System completo com tokens para React/Web e guia de implementação.',
      iconName: 'Compass',
    },
    {
      id: 'srv-2',
      number: '02',
      title: 'Engenharia Web & Animação 3D',
      tagline: 'Desempenho de 120 FPS e interatividade de vanguarda',
      description:
        'Construímos experiências digitais imersivas combinando React, Tailwind CSS, WebGL e animações orquestradas por Framer Motion. Cada transição é matematicamente calibrada para não travar a CPU.',
      capabilities: [
        'Scrubbing interativo estilo Apple Product Pages',
        'Smooth Scrolling integrado com Lenis',
        'Animações em GPU com Framer Motion',
        'Arquiteturas Headless de Alta Performance',
      ],
      deliverables: 'Código-fonte limpo em TypeScript, documentado e pronto para produção.',
      iconName: 'Cpu',
    },
    {
      id: 'srv-3',
      number: '03',
      title: 'Direção de Arte & Narrativa',
      tagline: 'Narrativas silenciosas que capturam o intelecto',
      description:
        'Concebemos a direção criativa de websites institucionais e produtos tecnológicos. Tratamos a tela como uma galeria onde cada proporção de espaço negativo conduz a atenção do tomador de decisão.',
      capabilities: [
        'Curadoria Tipográfica Internacional',
        'Produção de Vídeos de Fundo e Loops',
        'Composição Fotográfica Minimalista',
        'Storyboarding de Interação e Microcópias',
      ],
      deliverables: 'Direção de arte completa com roteiros visuais e assets pré-otimizados.',
      iconName: 'Layers',
    },
    {
      id: 'srv-4',
      number: '04',
      title: 'Auditoria de Desempenho & Acessibilidade',
      tagline: 'Carregamento instantâneo e conformidade WCAG AA',
      description:
        'Garantimos que sua presença digital alcance nota máxima no Google PageSpeed e Lighthouse. Otimizamos assets, scripts e layouts para navegação mobile sem atrito.',
      capabilities: [
        'Auditoria Completa de Core Web Vitals (LCP, CLS, INP)',
        'Acessibilidade e Compatibilidade Reduced-Motion',
        'Otimização Extrema de Fontes e Canvas',
        'Estratégias de Cache e Edge CDN',
      ],
      deliverables: 'Relatório comparativo de métricas e código refatorado para pontuação 98+.',
      iconName: 'Sliders',
    },
  ];

  return (
    <section
      id="servicos"
      className="relative py-28 sm:py-36 px-6 sm:px-8 max-w-7xl mx-auto bg-[#09090b] text-white"
    >
      {/* Section Header with Reveal */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 gap-8">
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
              Capacidades // Serviços
            </span>
          </motion.div>

          <motion.h2
            id="services-section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-white leading-tight"
          >
            DISCIPLINA TÉCNICA. VISÃO ESCULTURAL.
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm sm:text-base text-zinc-400 max-w-md font-normal leading-relaxed"
        >
          Nossa atuação transcende o design tradicional. Integramos arte visual, tipografia e engenharia de software em um único ciclo ininterrupto.
        </motion.p>
      </div>

      {/* Services Grid with Smooth Hover Animation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, idx) => (
          <motion.article
            key={service.id}
            id={`service-card-${service.id}`}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6 }}
            className="group relative p-8 sm:p-12 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between cursor-pointer"
            onClick={() => setActiveModal(service)}
          >
            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono text-sm text-amber-400 tracking-widest">
                  // {service.number}
                </span>
                <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-amber-400 group-hover:border-amber-500/40 transition-colors">
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2 tracking-tight group-hover:text-amber-400 transition-colors">
                {service.title}
              </h3>

              <div className="text-xs uppercase font-mono tracking-wider text-zinc-500 mb-4">
                {service.tagline}
              </div>

              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed line-clamp-3">
                {service.description}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-wrap items-center gap-2">
              {service.capabilities.slice(0, 2).map((cap, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-white/[0.04] text-[11px] font-mono text-zinc-300 border border-white/5"
                >
                  {cap}
                </span>
              ))}
              <span className="text-xs text-amber-400 font-mono ml-auto">
                Ver escopo completo &rarr;
              </span>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-2xl bg-[#111114] border border-white/15 rounded-3xl p-8 sm:p-10 shadow-2xl text-white overflow-hidden"
            >
              {/* Close Button */}
              <button
                id="close-service-modal-button"
                onClick={() => setActiveModal(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Fechar detalhes do serviço"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-amber-400 uppercase tracking-widest">
                  Serviço {activeModal.number}
                </span>
                <span className="text-zinc-600">•</span>
                <span className="text-xs text-zinc-400 font-mono">Entrega em ciclos de 3 a 6 semanas</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-3">
                {activeModal.title}
              </h3>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-8">
                {activeModal.description}
              </p>

              <div className="space-y-4 mb-8">
                <h4 className="text-xs uppercase font-mono tracking-widest text-amber-400">
                  O que está incluso no escopo:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeModal.capabilities.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-zinc-400 mb-8">
                <strong className="text-white font-semibold block mb-1">Entregável Principal:</strong>
                {activeModal.deliverables}
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  id="modal-solicitar-briefing-button"
                  onClick={() => {
                    const selected = activeModal;
                    setActiveModal(null);
                    onSelectService(selected);
                  }}
                  className="px-6 py-3 rounded-full bg-amber-500 text-black font-bold text-xs uppercase tracking-wider hover:bg-amber-400 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>Solicitar Briefing Deste Serviço</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
