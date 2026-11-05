import React from 'react';
import { SectionId } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { Sprout, Phone, MapPin, Mail, ShieldCheck, HeartHandshake, School } from 'lucide-react';

interface FooterProps {
  onNavigate: (section: SectionId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-emerald-950 text-emerald-100/80 border-t border-emerald-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Column 1: Brand & Slogan */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-700 text-amber-300 flex items-center justify-center">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                {t('appName')}
              </span>
            </div>
            <p className="text-sm text-emerald-200/90 font-medium">
              {t('slogan')}
            </p>
            <p className="text-xs text-emerald-300/70 leading-relaxed">
              {t('footerCol1Desc')}
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-300 font-medium pt-1">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{t('rabApproved')}</span>
            </div>
          </div>

          {/* Column 2: Digital Farming Tools */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">
              {t('navGuide')} & Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('soil-doctor')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  {t('navSoilDoctor')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('plant-doctor')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  {t('navPlantDoctor')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('fertilizer-advisor')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  {t('navFertilizer')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('smart-irrigation')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  {t('navIrrigation')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('farming-guide')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  {t('navGuide')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('market')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  {t('navMarket')}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Regional Hubs in Rwanda */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">
              Rwandan Agro Hubs
            </h4>
            <ul className="space-y-2 text-xs text-emerald-200/80">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                <span>Northern: Musanze & Burera (Volcanic Soils, Potatoes & Maize)</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                <span>Southern: Huye & Nyamagabe (Rubona Agronomy Lab & Coffee)</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                <span>Eastern: Nyagatare & Bugesera (Solar Irrigation & Grain Belts)</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                <span>Western: Nyamasheke, Rubavu & Rusizi (Terraced Slopes, Tea, Rice)</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Farmer Support & Helpline */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">
              {t('footerHelplineTitle')}
            </h4>
            <p className="text-xs text-emerald-200/80">
              {t('footerHelplineText')}
            </p>
            <div className="bg-emerald-900/60 p-3 rounded-xl border border-emerald-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-semibold text-sm">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>{t('footerTollFree')}</span>
              </div>
              <div className="text-[11px] text-emerald-300">
                {t('footerRABNote')}
              </div>
            </div>
            <div className="text-xs flex items-center gap-2 text-emerald-300">
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>info@smartfarming.rw</span>
            </div>
          </div>

        </div>

        {/* Dedicated Institutional Initiative Credit (Mandatory requirement 2) */}
        <div className="mt-12 pt-6 border-t border-emerald-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-amber-300 bg-emerald-900/80 px-4 py-2 rounded-xl border border-amber-400/30">
            <School className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{t('footerCredit')}</span>
          </div>

          <div className="flex items-center gap-3 text-xs text-emerald-300">
            <span className="flex items-center gap-1">
              <HeartHandshake className="w-3.5 h-3.5 text-amber-400" />
              Empowering Rwandan Cooperatives
            </span>
            <span>·</span>
            <button onClick={() => onNavigate('services')} className="hover:text-white underline">
              {t('navServices')}
            </button>
          </div>
        </div>

        {/* Bottom copyright notice */}
        <div className="mt-4 pt-4 border-t border-emerald-950 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-emerald-400/80">
          <p>© {new Date().getFullYear()} {t('appName')}. {t('footerCopyright')}</p>
          <p>Kinyarwanda · English · Français</p>
        </div>
      </div>
    </footer>
  );
};
