import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle2, Sparkles, ArrowUpRight } from 'lucide-react';
import { ServiceItem } from '../types';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: ServiceItem | null;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  preselectedService,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [serviceCategory, setServiceCategory] = useState(
    preselectedService ? preselectedService.title : 'Engenharia Web & Animação 3D'
  );
  const [budget, setBudget] = useState('R$ 25k - R$ 50k');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setName('');
    setEmail('');
    setCompany('');
    setMessage('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-xl bg-[#111114] border border-white/15 rounded-3xl p-8 sm:p-10 shadow-2xl text-white overflow-hidden"
      >
        {/* Close Button */}
        <button
          id="close-contact-modal"
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Fechar formulário de contato"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-12 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
              Briefing Recebido com Sucesso
            </h3>
            <p className="text-sm text-zinc-400 max-w-md mb-8">
              Nossa equipe de direção criativa e engenharia analisará as especificações de {company || name} em até 24 horas úteis.
            </p>
            <button
              id="concluir-briefing-button"
              onClick={handleReset}
              className="px-8 py-3 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-amber-400 transition-colors cursor-pointer"
            >
              Concluir & Retornar ao Site
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
                Iniciar Alinhamento // 2026
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
              Vamos construir o extraordinário.
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mb-6">
              Preencha os dados básicos do seu projeto. Retornamos com uma análise preliminar de arquitetura e cronograma.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                    Nome Completo *
                  </label>
                  <input
                    id="contact-name"
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Amanda Fontes"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                    E-mail Corporativo *
                  </label>
                  <input
                    id="contact-email"
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="amanda@empresa.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-company" className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                    Empresa / Marca
                  </label>
                  <input
                    id="contact-company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Ex: Monolith Labs"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-budget" className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                    Faixa de Investimento
                  </label>
                  <select
                    id="contact-budget"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1a1a1f] border border-white/10 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors"
                  >
                    <option value="R$ 15k - R$ 30k">R$ 15.000 — R$ 30.000</option>
                    <option value="R$ 30k - R$ 60k">R$ 30.000 — R$ 60.000</option>
                    <option value="R$ 60k - R$ 120k+">R$ 60.000 — R$ 120.000+</option>
                    <option value="Série A / Enterprise">Enterprise / Projeto Global</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                  Resumo do Desafio ou Escopo
                </label>
                <textarea
                  id="contact-message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Conte-nos sobre o produto, objetivos de negócio e prazo almejado..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-zinc-500 font-mono">
                  Resposta garantida em &lt; 24h
                </span>

                <button
                  id="submit-contact-form"
                  type="submit"
                  className="px-7 py-3 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-amber-400 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>Enviar Briefing</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
};
