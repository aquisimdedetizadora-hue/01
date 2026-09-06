/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SmoothScrollProvider } from './components/SmoothScrollProvider';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ScrollScrubbingSection } from './components/ScrollScrubbingSection';
import { ServicesSection } from './components/ServicesSection';
import { CasesSection } from './components/CasesSection';
import { FooterSection } from './components/FooterSection';
import { ContactModal } from './components/ContactModal';
import { ServiceItem } from './types';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const handleOpenContactWithService = (service: ServiceItem) => {
    setSelectedService(service);
    setIsContactOpen(true);
  };

  const handleOpenContactGeneral = () => {
    setSelectedService(null);
    setIsContactOpen(true);
  };

  return (
    <SmoothScrollProvider>
      <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] selection:bg-[#d97706] selection:text-black">
        {/* Main Sticky/Fixed Navigation */}
        <Navbar onOpenContact={handleOpenContactGeneral} />

        <main id="main-content">
          {/* 1. Hero Section with background video loop, dark overlay, Framer Motion entrance */}
          <HeroSection onOpenContact={handleOpenContactGeneral} />

          {/* 2. Seção "Sobre" com animação de fade-in ao scroll (whileInView) */}
          <AboutSection />

          {/* Apple product page style "Scroll-Scrubbing Animation" (120 frames on canvas in 400vh) */}
          <ScrollScrubbingSection />

          {/* 3. Seção de serviços/posts em grid com hover suave */}
          <ServicesSection onSelectService={handleOpenContactWithService} />

          {/* 4. Seção de depoimentos/cases */}
          <CasesSection />
        </main>

        {/* 5. Footer minimalista com CTA */}
        <FooterSection onOpenContact={handleOpenContactGeneral} />

        {/* Interactive Briefing & Contact Modal */}
        <ContactModal
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
          preselectedService={selectedService}
        />
      </div>
    </SmoothScrollProvider>
  );
}
