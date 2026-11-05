/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SectionId } from './types';
import { LanguageProvider } from './i18n/LanguageContext';
import { FarmerAuthProvider } from './context/FarmerAuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeSection } from './components/HomeSection';
import { SoilDoctorSection } from './components/SoilDoctorSection';
import { PlantDoctorSection } from './components/PlantDoctorSection';
import { FertilizerAdvisorSection } from './components/FertilizerAdvisorSection';
import { SmartIrrigationSection } from './components/SmartIrrigationSection';
import { FarmingGuideSection } from './components/FarmingGuideSection';
import { MarketSection } from './components/MarketSection';
import { ServicesSection } from './components/ServicesSection';
import { AccountSection } from './components/AccountSection';

function AppContent() {
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [marketFilter, setMarketFilter] = useState<string | undefined>(undefined);
  const [servicesFilter, setServicesFilter] = useState<string | undefined>(undefined);

  const handleNavigate = (section: SectionId, filter?: string) => {
    if (section === 'market' && filter) {
      setMarketFilter(filter);
    } else if (section !== 'market') {
      setMarketFilter(undefined);
    }

    if (section === 'services' && filter) {
      setServicesFilter(filter);
    } else if (section !== 'services') {
      setServicesFilter(undefined);
    }

    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Top Navigation */}
      <Header activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeSection === 'home' && (
          <HomeSection onNavigate={handleNavigate} />
        )}

        {activeSection === 'soil-doctor' && (
          <SoilDoctorSection onNavigate={handleNavigate} />
        )}

        {activeSection === 'plant-doctor' && (
          <PlantDoctorSection onNavigate={handleNavigate} />
        )}

        {activeSection === 'fertilizer-advisor' && (
          <FertilizerAdvisorSection onNavigate={handleNavigate} />
        )}

        {activeSection === 'smart-irrigation' && (
          <SmartIrrigationSection onNavigate={handleNavigate} />
        )}

        {activeSection === 'farming-guide' && (
          <FarmingGuideSection onNavigate={handleNavigate} />
        )}

        {activeSection === 'market' && (
          <MarketSection onNavigate={handleNavigate} initialFilter={marketFilter} />
        )}

        {activeSection === 'services' && (
          <ServicesSection onNavigate={handleNavigate} initialTypeFilter={servicesFilter} />
        )}

        {activeSection === 'account' && (
          <AccountSection onNavigate={handleNavigate} />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <FarmerAuthProvider>
        <AppContent />
      </FarmerAuthProvider>
    </LanguageProvider>
  );
}
