import React, { useState } from 'react';
import { SectionId, SupportedLanguage } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { useFarmerAuth } from '../context/FarmerAuthContext';
import {
  Sprout,
  Menu,
  X,
  PhoneCall,
  Layers,
  Activity,
  Droplets,
  BookOpen,
  ShoppingBag,
  Building2,
  Home,
  Globe,
  User
} from 'lucide-react';

interface HeaderProps {
  activeSection: SectionId;
  onNavigate: (section: SectionId) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeSection, onNavigate }) => {
  const { t, language, setLanguage } = useLanguage();
  const { user } = useFarmerAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: SectionId; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: t('navHome'), icon: <Home className="w-4 h-4" /> },
    { id: 'soil-doctor', label: t('navSoilDoctor'), icon: <Layers className="w-4 h-4" /> },
    { id: 'plant-doctor', label: t('navPlantDoctor'), icon: <Activity className="w-4 h-4" /> },
    { id: 'fertilizer-advisor', label: t('navFertilizer'), icon: <Sprout className="w-4 h-4" /> },
    { id: 'smart-irrigation', label: t('navIrrigation'), icon: <Droplets className="w-4 h-4" /> },
    { id: 'farming-guide', label: t('navGuide'), icon: <BookOpen className="w-4 h-4" /> },
    { id: 'market', label: t('navMarket'), icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 'services', label: t('navServices'), icon: <Building2 className="w-4 h-4" /> },
  ];

  const handleNavClick = (id: SectionId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-900/10 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">
          
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-600 rounded-md py-1"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-700 text-amber-300 flex items-center justify-center shadow-xs group-hover:bg-emerald-800 transition-colors">
              <Sprout className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <span className="text-base sm:text-lg font-bold tracking-tight text-emerald-950 flex items-center gap-1.5 whitespace-nowrap">
                {t('appName')}
              </span>
              <span className="hidden sm:block text-[11px] font-medium text-amber-700 tracking-wide uppercase">
                {t('subSlogan')}
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden xl:flex items-center gap-1 text-sm font-medium text-slate-700">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-all duration-150 text-xs 2xl:text-sm ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 font-semibold shadow-xs'
                      : 'hover:text-emerald-800 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Language Selector & Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Language Selector Switcher */}
            <div className="flex items-center bg-slate-100/90 rounded-lg p-0.5 border border-slate-200 text-xs">
              <span className="pl-1.5 pr-1 text-slate-400">
                <Globe className="w-3.5 h-3.5 text-emerald-800" />
              </span>
              <button
                onClick={() => setLanguage('en')}
                className={`px-1.5 py-1 rounded-md text-[11px] font-bold transition-colors ${
                  language === 'en' ? 'bg-white text-emerald-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="English"
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('rw')}
                className={`px-1.5 py-1 rounded-md text-[11px] font-bold transition-colors ${
                  language === 'rw' ? 'bg-white text-emerald-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Kinyarwanda"
              >
                RW
              </button>
              <button
                onClick={() => setLanguage('fr')}
                className={`px-1.5 py-1 rounded-md text-[11px] font-bold transition-colors ${
                  language === 'fr' ? 'bg-white text-emerald-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Français"
              >
                FR
              </button>
            </div>

            {/* Farmer Account Button */}
            <button
              onClick={() => handleNavClick('account')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                activeSection === 'account'
                  ? 'bg-amber-100 border-amber-300 text-amber-900'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <User className="w-3.5 h-3.5 text-emerald-700" />
              <span className="hidden sm:inline">
                {user?.isAuthenticated ? user.fullName.split(' ')[0] : t('navAccount')}
              </span>
            </button>

            {/* RAB Hotline 4675 */}
            <button
              onClick={() => handleNavClick('services')}
              className="hidden lg:inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-xs transition-colors whitespace-nowrap focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:outline-hidden"
            >
              <PhoneCall className="w-3 h-3 text-amber-300" />
              <span>{t('hotlineButton')}</span>
            </button>

            {/* Mobile menu toggle button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-700 hover:text-emerald-900 hover:bg-slate-100 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-600"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-emerald-900/10 px-4 pt-2 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top-2 duration-200">
          
          {/* Mobile Language Selector */}
          <div className="flex items-center justify-between p-2 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <span className="font-semibold text-slate-700 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-emerald-700" />
              <span>{t('selectLanguage')}:</span>
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                  language === 'en' ? 'bg-emerald-800 text-white shadow-xs' : 'bg-white text-slate-700 border border-slate-200'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('rw')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                  language === 'rw' ? 'bg-emerald-800 text-white shadow-xs' : 'bg-white text-slate-700 border border-slate-200'
                }`}
              >
                Kinyarwanda
              </button>
              <button
                onClick={() => setLanguage('fr')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                  language === 'fr' ? 'bg-emerald-800 text-white shadow-xs' : 'bg-white text-slate-700 border border-slate-200'
                }`}
              >
                Français
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                    isActive
                      ? 'bg-emerald-700 text-white font-semibold shadow-xs'
                      : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-900'
                  }`}
                >
                  <span className={isActive ? 'text-amber-300' : 'text-emerald-700'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}

            <button
              onClick={() => handleNavClick('account')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                activeSection === 'account'
                  ? 'bg-amber-600 text-white font-semibold shadow-xs'
                  : 'text-slate-700 hover:bg-amber-50 hover:text-amber-900'
              }`}
            >
              <User className="w-4 h-4 text-amber-500" />
              <span>{user?.isAuthenticated ? user.fullName : t('navAccount')}</span>
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('services')}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-xs"
            >
              <PhoneCall className="w-4 h-4 text-amber-300" />
              <span>{t('hotlineButton')}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
