import React, { useState } from 'react';
import { SectionId } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { useFarmerAuth } from '../context/FarmerAuthContext';
import {
  Sprout,
  Calculator,
  Calendar,
  Layers,
  CheckCircle2,
  AlertCircle,
  ShoppingBag,
  Info,
  Beaker,
  TrendingUp,
  FileText,
  PhoneCall,
  ShieldCheck
} from 'lucide-react';

interface FertilizerAdvisorSectionProps {
  onNavigate: (section: SectionId, filter?: string) => void;
}

export const FertilizerAdvisorSection: React.FC<FertilizerAdvisorSectionProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const { user } = useFarmerAuth();

  const [selectedCrop, setSelectedCrop] = useState<string>('potato');
  const [landAreaAres, setLandAreaAres] = useState<number>(user?.farmSizeAres || 20); // 20 ares = 0.2 ha
  const [region, setRegion] = useState<string>(user?.province ? user.province.toLowerCase() : 'northern');
  const [soilAcidityLevel, setSoilAcidityLevel] = useState<string>('moderately-acidic');
  const [hasSoilTest, setHasSoilTest] = useState<boolean>(false);
  const [knownPh, setKnownPh] = useState<number>(5.2);

  // Agronomic crop standards per 1 hectare (100 ares) in Rwanda based on RAB guidelines
  const CROP_RATES: Record<string, {
    name: string;
    npkPerHa: number; // kg
    dapPerHa: number; // kg
    ureaPerHa: number; // kg
    manureTonnesPerHa: number;
    recommendedPh: string;
    notes: string;
  }> = {
    potato: {
      name: 'Irish Potato (Ibirayi)',
      npkPerHa: 300,
      dapPerHa: 100,
      ureaPerHa: 100,
      manureTonnesPerHa: 20,
      recommendedPh: '5.5 – 6.5',
      notes: 'Irish potatoes require balanced potassium for heavy tuber filling. Basal NPK at planting is crucial.'
    },
    maize: {
      name: 'Hybrid Maize (Ibigori)',
      npkPerHa: 200,
      dapPerHa: 100,
      ureaPerHa: 150,
      manureTonnesPerHa: 10,
      recommendedPh: '5.8 – 7.0',
      notes: 'Maize requires high nitrogen. Split urea application: half at knee-high (4 weeks) and half just before tasseling.'
    },
    beans: {
      name: 'Climbing Beans (Ibihyimbo)',
      npkPerHa: 150,
      dapPerHa: 100,
      ureaPerHa: 0, // Legumes fix nitrogen
      manureTonnesPerHa: 10,
      recommendedPh: '6.0 – 6.8',
      notes: 'Beans fix atmospheric nitrogen. Do not over-apply urea. DAP stimulates early root nodulation.'
    },
    coffee: {
      name: 'Arabica Coffee (Ikawa)',
      npkPerHa: 250,
      dapPerHa: 50,
      ureaPerHa: 120,
      manureTonnesPerHa: 15,
      recommendedPh: '5.3 – 6.0',
      notes: 'Apply fertilizer in a circular band along the tree drip line. Heavy mulch retains moisture and reduces fertilizer wash.'
    },
    cassava: {
      name: 'Cassava (Imyumbati)',
      npkPerHa: 150,
      dapPerHa: 50,
      ureaPerHa: 80,
      manureTonnesPerHa: 8,
      recommendedPh: '5.0 – 6.5',
      notes: 'Cassava tolerates lower fertility but yields double when provided basal NPK in red soils.'
    },
    vegetables: {
      name: 'Vegetables & Tomatoes (Inyanya)',
      npkPerHa: 250,
      dapPerHa: 100,
      ureaPerHa: 120,
      manureTonnesPerHa: 25,
      recommendedPh: '6.0 – 6.8',
      notes: 'Requires high organic matter and calcium to prevent tomato blossom end rot. Drip fertigation is ideal.'
    }
  };

  const currentCropData = CROP_RATES[selectedCrop] || CROP_RATES.potato;
  const areaHectares = Math.max(0.01, landAreaAres / 100);

  // Compute fertilizer amounts
  const npkKg = Math.round(currentCropData.npkPerHa * areaHectares);
  const npkBags = Math.ceil(npkKg / 50);

  const dapKg = Math.round(currentCropData.dapPerHa * areaHectares);
  const dapBags = Math.ceil(dapKg / 50);

  const ureaKg = Math.round(currentCropData.ureaPerHa * areaHectares);
  const ureaBags = Math.ceil(ureaKg / 50);

  // Compute lime (Travertine) based on soil acidity
  let limePerHaKg = 0;
  if (soilAcidityLevel === 'strongly-acidic' || (hasSoilTest && knownPh < 5.0)) {
    limePerHaKg = 2500; // 2.5 tonnes/ha
  } else if (soilAcidityLevel === 'moderately-acidic' || (hasSoilTest && knownPh < 5.8)) {
    limePerHaKg = 1500; // 1.5 tonnes/ha
  } else {
    limePerHaKg = 0;
  }

  const limeKg = Math.round(limePerHaKg * areaHectares);
  const limeBags = Math.ceil(limeKg / 50);

  const manureTonnes = Number((currentCropData.manureTonnesPerHa * areaHectares).toFixed(1));

  // Approximate cost at subsidized CIP rates
  const estimatedCostRwf =
    npkBags * 42000 +
    (currentCropData.ureaPerHa > 0 ? ureaBags * 38500 : 0) +
    (limeBags * 9500);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Header Banner */}
      <div className="bg-emerald-900 text-white rounded-3xl p-6 sm:p-10 border border-emerald-800 shadow-md space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800 text-amber-300 text-xs font-semibold tracking-wide">
          <Calculator className="w-4 h-4 text-amber-300" />
          <span>{t('rabApproved')}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          {t('fertilizerTitle')}
        </h1>
        <p className="text-sm sm:text-base text-emerald-100 max-w-3xl leading-relaxed">
          {t('fertilizerSubtitle')}
        </p>

        {/* Technical Guidance & Encouraging Professional Advice */}
        <div className="bg-emerald-950/80 rounded-2xl p-4 border border-emerald-800/80 flex items-start gap-3 text-xs text-emerald-200">
          <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-white">Professional Agronomic Extension Advice:</span>
            <p>
              These calculations follow the Crop Intensification Programme (CIP) technical recommendations. Because micro-climates and soil conditions differ across slopes, we strongly encourage reviewing these quantities with your Sector Agronome or visiting an accredited RAB station.
            </p>
          </div>
        </div>
      </div>

      {/* Main Interactive Tool Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Input Controls */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">
              1. Farm & Soil Parameters
            </h2>
            <p className="text-xs text-slate-500">
              Enter your crop and field size to customize nutrient calculations.
            </p>
          </div>

          {/* Crop Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              {t('intendedCropLabel')}
            </label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 bg-white"
            >
              <option value="potato">Irish Potato (Ibirayi)</option>
              <option value="maize">Hybrid Maize (Ibigori)</option>
              <option value="beans">Climbing Beans (Ibihyimbo)</option>
              <option value="coffee">Arabica Coffee (Ikawa)</option>
              <option value="cassava">Cassava (Imyumbati)</option>
              <option value="vegetables">Vegetables / Tomatoes (Inyanya)</option>
            </select>
          </div>

          {/* Land Area */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                {t('fieldSizeAres')}
              </label>
              <span className="text-xs font-semibold text-emerald-700">
                {(landAreaAres / 100).toFixed(2)} {t('hectaresEquivalent')}
              </span>
            </div>
            <div className="space-y-2">
              <input
                type="range"
                min="2"
                max="200"
                step="2"
                value={landAreaAres}
                onChange={(e) => setLandAreaAres(Number(e.target.value))}
                className="w-full accent-emerald-700 cursor-pointer"
              />
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  max="5000"
                  value={landAreaAres}
                  onChange={(e) => setLandAreaAres(Math.max(1, Number(e.target.value)))}
                  className="w-24 px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden font-bold"
                />
                <span className="text-xs text-slate-500">
                  Ares (100 ares = 1 full hectare)
                </span>
              </div>
            </div>
          </div>

          {/* Agro-ecological Region */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              {t('agroEcologicalRegion')}
            </label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 bg-white"
            >
              <option value="northern">Northern Volcanic (Musanze, Burera, Nyabihu)</option>
              <option value="southern">Southern High Acidity (Huye, Nyamagabe, Gisagara)</option>
              <option value="western">Western Mountain Ridge (Rubavu, Karongi, Rusizi)</option>
              <option value="eastern">Eastern Savanna & Plains (Nyagatare, Bugesera, Kayonza)</option>
              <option value="kigali">Central Plateau & Kigali</option>
            </select>
          </div>

          {/* Soil Acidity & Lime Need */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                {t('soilAcidityPh')}
              </label>
              <button
                type="button"
                onClick={() => setHasSoilTest(!hasSoilTest)}
                className="text-[11px] font-semibold text-emerald-800 hover:text-emerald-950 underline"
              >
                {hasSoilTest ? t('useEstimateToggle') : t('hasSoilTestToggle')}
              </button>
            </div>

            {hasSoilTest ? (
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600">Measured pH:</span>
                  <span className="font-bold text-slate-900">{knownPh}</span>
                </div>
                <input
                  type="range"
                  min="4.0"
                  max="7.5"
                  step="0.1"
                  value={knownPh}
                  onChange={(e) => setKnownPh(Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
                <div className="text-[11px] text-slate-500 flex justify-between">
                  <span>4.0 (Very Acidic)</span>
                  <span>5.5 (Acidic)</span>
                  <span>7.0 (Neutral)</span>
                </div>
              </div>
            ) : (
              <select
                value={soilAcidityLevel}
                onChange={(e) => setSoilAcidityLevel(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 bg-white"
              >
                <option value="strongly-acidic">Strongly Acidic (Common in Southern/Western Highlands)</option>
                <option value="moderately-acidic">Moderately Acidic (Typical Rwandan Hillside)</option>
                <option value="neutral">Neutral / Volcanic (Musanze / Rubavu plains)</option>
              </select>
            )}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => onNavigate('market', 'Fertilizers')}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-emerald-700" />
              <span>Locate Subsidized Fertilizer Agro-Dealer</span>
            </button>

            <button
              onClick={() => onNavigate('services', 'Agricultural Extension Officer')}
              className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white border border-emerald-300 hover:bg-emerald-50 text-emerald-900 font-semibold text-xs transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-700" />
              <span>Consult Your Sector Agronome</span>
            </button>
          </div>
        </div>

        {/* Right: Calculated Bag Requirements & Practical Application Plan */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Calculation Summary Card */}
          <div className="bg-white rounded-2xl border-2 border-emerald-600/60 p-6 sm:p-7 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  Nutrients for {landAreaAres} Ares ({areaHectares.toFixed(2)} Ha)
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">
                  {currentCropData.name} Fertilizer Plan
                </h3>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-[11px] text-slate-500">{t('estimatedSubsidizedCost')}:</span>
                <div className="text-base font-extrabold text-emerald-900">
                  ~{estimatedCostRwf.toLocaleString()} RWF
                </div>
              </div>
            </div>

            {/* Bags Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              
              {/* NPK */}
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-1">
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                  {t('npkLabel')}
                </span>
                <div className="text-2xl font-black text-emerald-950">
                  {npkBags}
                </div>
                <div className="text-[11px] text-emerald-800 font-medium">
                  Bag(s) ({npkKg} kg)
                </div>
                <div className="text-[10px] text-emerald-700/80">At Planting</div>
              </div>

              {/* Urea */}
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-center space-y-1">
                <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
                  {t('ureaLabel')}
                </span>
                <div className="text-2xl font-black text-amber-950">
                  {ureaBags}
                </div>
                <div className="text-[11px] text-amber-800 font-medium">
                  Bag(s) ({ureaKg} kg)
                </div>
                <div className="text-[10px] text-amber-700/80">Top Dressing</div>
              </div>

              {/* Agricultural Lime */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-center space-y-1">
                <span className="text-[10px] font-bold text-stone-800 uppercase tracking-wider">
                  {t('limeLabel')}
                </span>
                <div className="text-2xl font-black text-stone-950">
                  {limeBags}
                </div>
                <div className="text-[11px] text-stone-800 font-medium">
                  Bag(s) ({limeKg} kg)
                </div>
                <div className="text-[10px] text-stone-600">3 Wks Before</div>
              </div>

              {/* Compost / Farmyard Manure */}
              <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 text-center space-y-1">
                <span className="text-[10px] font-bold text-teal-800 uppercase tracking-wider">
                  {t('compostLabel')}
                </span>
                <div className="text-2xl font-black text-teal-950">
                  {manureTonnes}
                </div>
                <div className="text-[11px] text-teal-800 font-medium">
                  Tonnes
                </div>
                <div className="text-[10px] text-teal-700/80">Organic Base</div>
              </div>

            </div>

            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
              <strong className="text-slate-900">Agronomic Note: </strong>
              {currentCropData.notes}
            </p>
          </div>

          {/* Application Timeline & Practical Stages */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-700" />
              <span>{t('applicationScheduleTitle')}</span>
            </h4>

            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-6 h-6 rounded-full bg-emerald-800 text-white text-xs font-bold flex items-center justify-center shrink-0">
                  1
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    3 Weeks Before Planting: Lime & Compost Incorporation
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    Spread <strong>{limeKg} kg</strong> of Travertine Lime and <strong>{manureTonnes} tonnes</strong> of well-rotted compost over plowed soil. Mix into the top 15 cm so the lime neutralizes acidity before delicate seedlings emerge.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-6 h-6 rounded-full bg-emerald-800 text-white text-xs font-bold flex items-center justify-center shrink-0">
                  2
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    Planting Day: Basal NPK 17-17-17 Placement
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    Place <strong>{npkKg} kg</strong> of NPK in planting furrows or holes. Crucial: Cover fertilizer with 2–3 cm of soil before placing potato seeds or maize grains so direct salt contact does not burn sprouts.
                  </div>
                </div>
              </div>

              {currentCropData.ureaPerHa > 0 && (
                <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                  3
                </div>
              )}
            </div>
          </div>

          {/* Lime Significance for Rwanda's Western & Southern Highlands */}
          <div className="bg-amber-50/70 rounded-2xl p-5 border border-amber-200 space-y-2 text-xs text-amber-950">
            <div className="flex items-center gap-2 font-bold text-amber-900 uppercase tracking-wider text-[11px]">
              <Layers className="w-4 h-4 text-amber-700" />
              <span>{t('whyLimeTitle')}</span>
            </div>
            <p className="leading-relaxed">
              {t('whyLimeText')}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
