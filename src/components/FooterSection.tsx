import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, ArrowUp, Mail, MapPin, Globe, Sparkles } from 'lucide-react';
import { useSmoothScroll } from './SmoothScrollProvider';

interface FooterSectionProps {
  onOpenContact: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onOpenContact }) => {
  const { scrollTo } = useSmoothScroll();
  const [times, setTimes] = useState({ sp: '', lisbon: '', ny: '' });

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setTimes({
        sp: now.toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit' }),
        lisbon: now.toLocaleTimeString('pt-BR', { timeZone: 'Europe/Lisbon', hour: '2-digit', minute: '2-digit' }),
        ny: now.toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit' }),
      });
    };
    updateClocks();
    const interval = setInterval(updateClocks, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer
      id="contato"
      className="relative bg-[#060608] border-t border-white/[0.08] text-white pt-24 sm:pt-32 pb-16 px-6 sm:px-8 overflow-hidden"
    >
      {/* Subtle Background Glow */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-amber-500/[0.04] blur-[150px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto">
        {/* Grand CTA Section */}
        <div className="pb-20 sm:pb-28 border-b border-white/[0.08] flex flex-col items-start lg:flex-row lg:items-end lg:justify-between gap-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs uppercase font-mono tracking-widest text-zinc-400">
                Disponível para novos projetos em 2026
              </span>
            </motion.div>

            <motion.h2
              id="footer-cta-headline"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-white leading-[1.06]"
            >
              VAMOS CONSTRUIR O EXTRAORDINÁRIO JUNTOS.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg text-zinc-400 max-w-xl font-normal leading-relaxed"
            >
              Seja o lançamento de uma nova categoria de hardware ou a redefinição de uma presença institucional de bilhões: nosso estúdio entrega a clareza definitiva.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.25 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto"
          >
            <motion.button
              id="footer-iniciar-projeto-cta"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={onOpenContact}
              className="px-10 py-5 rounded-full bg-white text-black font-bold text-sm uppercase tracking-wider hover:bg-amber-400 transition-colors flex items-center justify-center gap-3 cursor-pointer shadow-2xl"
            >
              <span>Iniciar Alinhamento</span>
              <ArrowUpRight className="w-4 h-4" />
            </motion.button>

            <a
              id="footer-email-link"
              href="mailto:contato@aurastudio.design"
              className="px-8 py-5 rounded-full bg-white/[0.04] border border-white/10 text-white font-mono text-xs uppercase tracking-wider hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
            >
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>contato@aurastudio.design</span>
            </a>
          </motion.div>
        </div>

        {/* Studio Locations & World Clocks */}
        <div className="py-12 border-b border-white/[0.06] grid grid-cols-1 sm:grid-cols-3 gap-8 text-xs font-mono text-zinc-400">
          <div className="flex flex-col gap-1">
            <span className="text-zinc-500 uppercase tracking-widest">SÃO PAULO (BR)</span>
            <div className="flex items-center gap-2 text-white text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="font-semibold">{times.sp || '17:20'} BRT</span>
            </div>
            <span className="text-[11px] text-zinc-500">Av. Brigadeiro Faria Lima, 3477</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-zinc-500 uppercase tracking-widest">LISBOA (PT)</span>
            <div className="flex items-center gap-2 text-white text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="font-semibold">{times.lisbon || '21:20'} WET</span>
            </div>
            <span className="text-[11px] text-zinc-500">Avenida da Liberdade, 110</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-zinc-500 uppercase tracking-widest">NOVA YORK (EUA)</span>
            <div className="flex items-center gap-2 text-white text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="font-semibold">{times.ny || '16:20'} EST</span>
            </div>
            <span className="text-[11px] text-zinc-500">540 Madison Ave, New York</span>
          </div>
        </div>

        {/* Navigation & Copyright Bottom Bar */}
        <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-zinc-500 font-mono">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-white tracking-widest text-sm">
              AURA
            </span>
            <span>© {new Date().getFullYear()} Aura Studio Ltd. Todos os direitos reservados.</span>
          </div>

          {/* Quick Nav Anchors */}
          <div className="flex flex-wrap items-center gap-6">
            <button
              onClick={() => scrollTo('#sobre')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Sobre
            </button>
            <button
              onClick={() => scrollTo('#monolito-experience')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Monólito 3D
            </button>
            <button
              onClick={() => scrollTo('#servicos')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Serviços
            </button>
            <button
              onClick={() => scrollTo('#cases')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Cases
            </button>
          </div>

          {/* Back to top with smooth scroll */}
          <button
            id="back-to-top-button"
            onClick={() => scrollTo(0)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 text-zinc-300 hover:text-white hover:border-amber-500/50 transition-colors cursor-pointer"
            aria-label="Voltar ao topo da página"
          >
            <span>Topo</span>
            <ArrowUp className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>
      </div>
    </footer>
  );
};
