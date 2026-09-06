import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Menu, X, Sparkles } from 'lucide-react';
import { useSmoothScroll } from './SmoothScrollProvider';

interface NavbarProps {
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Sobre', href: '#sobre' },
    { label: 'Monólito 3D', href: '#monolito-experience' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Cases & Métricas', href: '#cases' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    scrollTo(href, { offset: -70 });
  };

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#09090b]/80 backdrop-blur-xl border-b border-white/[0.08] py-4'
            : 'bg-gradient-to-b from-black/70 via-black/20 to-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            id="brand-logo-link"
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="group flex items-center gap-3 cursor-pointer"
          >
            <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 border border-white/10 group-hover:border-amber-500/50 transition-colors">
              <span className="font-display font-extrabold text-lg tracking-tighter text-white">A</span>
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold tracking-widest text-sm text-white group-hover:text-amber-400 transition-colors">
                AURA
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 font-medium">
                Studio & Craft
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav" aria-label="Navegação principal" className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                id={`nav-link-${link.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-zinc-300 hover:text-white transition-colors relative py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-amber-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-5">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-mono text-[11px] tracking-wide text-zinc-400">Briefings 2026</span>
            </div>

            <motion.button
              id="header-cta-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenContact}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-amber-400 transition-colors shadow-lg cursor-pointer"
            >
              <span>Iniciar Projeto</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </motion.button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-toggle"
            type="button"
            aria-label="Abrir menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white focus:outline-none cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-[72px] z-40 bg-[#09090b]/95 backdrop-blur-2xl border-b border-white/10 p-6 md:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-lg font-display font-medium text-zinc-200 hover:text-amber-400 py-2 border-b border-white/5"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <button
                  id="mobile-cta-button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenContact();
                  }}
                  className="w-full py-3.5 rounded-xl bg-amber-500 text-black font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2"
                >
                  <span>Iniciar Projeto</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
