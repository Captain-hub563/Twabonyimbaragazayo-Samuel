import React from 'react';
import { SectionId } from '../types';
import { APP_IMAGES } from '../data/assets';
import { useLanguage } from '../i18n/LanguageContext';
import {
  Layers,
  Activity,
  Sprout,
  Droplets,
  BookOpen,
  ShoppingBag,
  Building2,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface HomeSectionProps {
  onNavigate: (section: SectionId) => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  const tools = [
    {
      id: 'soil-doctor' as SectionId,
      title: t('navSoilDoctor'),
      description: t('soilDoctorSubtitle'),
      icon: <Layers className="w-6 h-6 text-emerald-700" />,
      badge: 'Soil Health & pH',
      action: t('btnTestSoil'),
    },
    {
      id: 'plant-doctor' as SectionId,
      title: t('navPlantDoctor'),
      description: t('plantDoctorSubtitle'),
      icon: <Activity className="w-6 h-6 text-emerald-700" />,
      badge: 'Pest & Disease Help',
      action: t('btnDiagnoseCrop'),
    },
    {
      id: 'fertilizer-advisor' as SectionId,
      title: t('navFertilizer'),
      description: t('fertilizerSubtitle'),
      icon: <Sprout className="w-6 h-6 text-emerald-700" />,
      badge: 'RAB Guidelines',
      action: t('btnCalculateNutrients'),
    },
    {
      id: 'smart-irrigation' as SectionId,
      title: t('navIrrigation'),
      description: t('irrigationSubtitle'),
      icon: <Droplets className="w-6 h-6 text-emerald-700" />,
      badge: 'Water Management',
      action: t('btnExploreIrrigation'),
    },
    {
      id: 'farming-guide' as SectionId,
      title: t('navGuide'),
      description: t('guideSubtitle'),
      icon: <BookOpen className="w-6 h-6 text-emerald-700" />,
      badge: 'Agronomic Education',
      action: t('btnReadGuides'),
    },
    {
      id: 'market' as SectionId,
      title: t('navMarket'),
      description: t('marketSubtitle'),
      icon: <ShoppingBag className="w-6 h-6 text-emerald-700" />,
      badge: 'Certified Inputs & Prices',
      action: t('btnBrowseMarket'),
    },
    {
      id: 'services' as SectionId,
      title: t('navServices'),
      description: t('servicesSubtitle'),
      icon: <Building2 className="w-6 h-6 text-emerald-700" />,
      badge: 'Local Agro Experts',
      action: t('btnFindExperts'),
    },
  ];

  const seasons = [
    {
      code: 'Season A',
      kinya: 'Umuhindo',
      months: 'September – January',
      focus: 'Maize, Climbing Beans, Soybeans, Cassava',
      tip: 'Prepare terraces early in August; apply organic compost before first rains.',
    },
    {
      code: 'Season B',
      kinya: 'Itumba',
      months: 'February – June',
      focus: 'Irish Potatoes, Beans, Sorghum, Vegetables',
      tip: 'Heavier rains in northern volcanic areas; guard against potato late blight.',
    },
    {
      code: 'Season C',
      kinya: 'Impeshyi',
      months: 'July – September',
      focus: 'Marshlands (Ibishanga), Tomatoes, Cabbage, Carrots',
      tip: 'Requires efficient water drainage and solar-powered irrigation pumps.',
    },
  ];

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-4 shadow-xl border border-emerald-800/30">
        <div className="absolute inset-0">
          <img
            src={APP_IMAGES.heroFarm}
            alt="Lush green terraced hills of Rwanda in golden morning light"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-35 filter brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-transparent opacity-80" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 py-16 sm:py-24 lg:py-28 text-white space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-300/30 text-xs font-semibold uppercase tracking-wider backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('slogan')}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight max-w-3xl">
            {t('heroTagline')}
          </h1>

          <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed max-w-2xl font-normal">
            {t('heroDescription')}
          </p>

          {/* Quick CTA Actions */}
          <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={() => onNavigate('plant-doctor')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm shadow-md transition-all duration-150 transform active:scale-95"
            >
              <Activity className="w-4 h-4 text-slate-950" />
              <span>{t('btnDiagnoseCrop')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('soil-doctor')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-800/90 hover:bg-emerald-700 text-white font-semibold text-sm border border-emerald-500/40 backdrop-blur-xs transition-colors"
            >
              <Layers className="w-4 h-4 text-amber-300" />
              <span>{t('btnTestSoil')}</span>
            </button>

            <button
              onClick={() => onNavigate('market')}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-emerald-100 hover:text-white hover:bg-white/10 text-sm font-medium transition-colors"
            >
              <span>{t('btnViewMarketPrices')}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Key Trust Signals */}
          <div className="pt-6 border-t border-emerald-800/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-emerald-200">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{t('rabApproved')}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{t('districtsSupported')}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{t('smallholderFriendly')}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{t('iotReady')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Feature Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold text-amber-700 uppercase tracking-widest">
            Farming Intelligence
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Digital Agricultural Services for Every Farm
          </h2>
          <p className="text-sm text-slate-600">
            Select a service below to diagnose crop challenges, calculate inputs, manage water, or locate trusted agricultural extension officers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <div
              key={tool.id}
              onClick={() => onNavigate(tool.id)}
              className="group cursor-pointer bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs hover:shadow-md hover:border-emerald-600/40 transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center group-hover:bg-emerald-700 group-hover:text-amber-300 transition-colors">
                    {tool.icon}
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-800/80 bg-emerald-50/80 px-2.5 py-1 rounded-md border border-emerald-100">
                    {tool.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-800 group-hover:text-amber-600">
                <span>{tool.action}</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rwandan Agricultural Seasons Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-900 text-white rounded-3xl p-6 sm:p-10 border border-emerald-800 shadow-md space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Calendar className="w-4 h-4" />
                <span>Rwanda Crop Calendar</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold mt-1">
                Seasonal Production Rhythm in Rwanda
              </h3>
            </div>
            <button
              onClick={() => onNavigate('farming-guide')}
              className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-lg bg-emerald-800 text-amber-300 hover:bg-emerald-700 transition-colors self-start md:self-auto"
            >
              <span>{t('btnReadGuides')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {seasons.map((s) => (
              <div
                key={s.code}
                className="bg-emerald-950/70 p-5 rounded-2xl border border-emerald-800/70 space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-300 text-sm">{s.code}</span>
                  <span className="text-xs text-emerald-300 italic">{s.kinya}</span>
                </div>
                <div className="text-xs text-emerald-100 font-semibold">{s.months}</div>
                <div className="text-xs text-emerald-200">
                  <span className="text-white font-medium">Major Crops: </span>
                  {s.focus}
                </div>
                <p className="text-[11px] text-emerald-300/80 leading-relaxed border-t border-emerald-800/60 pt-2">
                  {s.tip}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Storytelling: The Rwandan Farmer & Modern Practices */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          <div className="space-y-6">
            <div className="text-xs font-bold text-amber-700 uppercase tracking-widest">
              Smart Agriculture in Action
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
              Transforming Hillside Farming Across Rwanda
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Farming in Rwanda requires overcoming steep hillside erosion, managing soil acidity in Western and Southern provinces, and dealing with variable rainfall. With proper soil amendments, certified seeds, terracing, and drip irrigation, Rwandan smallholders are turning challenges into abundant harvests.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Soil Acidity Correction</h4>
                  <p className="text-xs text-slate-600">
                    Applying agricultural lime (Travertine) to acidic soils (pH &lt; 5.5) in Gicumbi, Nyamagabe, and Huye restores crop nutrient absorption.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Certified Seed Traceability</h4>
                  <p className="text-xs text-slate-600">
                    Using certified seeds like Kinigi potato and RWR 2245 climbing beans guarantees vigor, high germination, and disease resistance.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Solar-Powered Drip Irrigation</h4>
                  <p className="text-xs text-slate-600">
                    Precision water delivery delivers moisture directly to root zones on terraced slopes, saving up to 60% of water compared to furrow flooding.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => onNavigate('fertilizer-advisor')}
                className="px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs shadow-xs transition-colors"
              >
                {t('btnCalculateNutrients')}
              </button>
              <button
                onClick={() => onNavigate('smart-irrigation')}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors"
              >
                {t('btnExploreIrrigation')}
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200">
              <img
                src={APP_IMAGES.farmerPortrait}
                alt="Rwandan farmer proudly smiling in healthy maize and climbing bean field"
                referrerPolicy="no-referrer"
                className="w-full h-[400px] object-cover"
              />
              <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">Cooperative Farmer in Musanze</div>
                  <div className="text-[11px] text-slate-500">Volcanic soil cultivation using certified seeds and balanced NPK</div>
                </div>
                <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md">
                  Northern Province
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Community Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <div className="text-xs font-bold text-amber-700 uppercase tracking-widest">
            Farmer Testimonials
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
            Real Impact in Rwandan Districts
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
            <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
              "We applied Travertine lime after diagnosing our acidic soil in Huye. Our bean yields increased from 800 kg per hectare to over 1,700 kg per hectare in Season A."
            </p>
            <div className="border-t border-slate-100 pt-3">
              <div className="text-xs font-bold text-slate-900">Jean-Baptiste Mugabo</div>
              <div className="text-[11px] text-slate-500">Maraba Coffee & Legume Cooperative, Huye</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
            <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
              "The Plant Doctor checklist helped us detect Fall Armyworm larvae in our early maize before it reached the cob stage. We treated it in time and saved the entire harvest."
            </p>
            <div className="border-t border-slate-100 pt-3">
              <div className="text-xs font-bold text-slate-900">Chantal Mukamana</div>
              <div className="text-[11px] text-slate-500">Nyagatare Maize Producers Union</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
            <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
              "Using drip irrigation on our terraced plots in Rubavu allowed us to harvest cabbages and tomatoes throughout Season C when vegetable market prices in Kigali are highest."
            </p>
            <div className="border-t border-slate-100 pt-3">
              <div className="text-xs font-bold text-slate-900">Emmanuel Ndayisaba</div>
              <div className="text-[11px] text-slate-500">Horticulture Farmer, Rubavu District</div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
