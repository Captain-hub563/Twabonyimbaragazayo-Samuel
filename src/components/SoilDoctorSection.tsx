import React, { useState } from 'react';
import { SectionId, SoilAnalysisRequest, AISoilAnalysisResult } from '../types';
import { RWANDAN_DISTRICTS } from '../data/mockData';
import { useLanguage } from '../i18n/LanguageContext';
import { useFarmerAuth } from '../context/FarmerAuthContext';
import {
  Layers,
  Upload,
  Camera,
  Trash2,
  CheckCircle2,
  MapPin,
  Sprout,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Info,
  Beaker,
  ShieldAlert,
  Sparkles,
  Loader2,
  Check
} from 'lucide-react';

interface SoilDoctorSectionProps {
  onNavigate: (section: SectionId, filter?: string) => void;
}

export const SoilDoctorSection: React.FC<SoilDoctorSectionProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const { user, saveSoilRecord } = useFarmerAuth();

  const [farmerName, setFarmerName] = useState(user?.fullName || '');
  const [phone, setPhone] = useState(user?.phoneNumber || '');
  const [selectedProvince, setSelectedProvince] = useState<string>(user?.province || 'Northern');
  const [selectedDistrict, setSelectedDistrict] = useState<string>(user?.district || 'musanze');
  const [sector, setSector] = useState(user?.sector || '');
  const [intendedCrop, setIntendedCrop] = useState('Irish Potato (Kinigi)');
  const [landAreaAres, setLandAreaAres] = useState<number>(user?.farmSizeAres || 20);
  const [soilColor, setSoilColor] = useState('Dark Volcanic (Umukara)');
  const [soilTexture, setSoilTexture] = useState('Loamy / Crumbly (Ifumbire)');
  const [topography, setTopography] = useState('Steep Hillside Terrace (Amaterasi)');
  const [drainageSpeed, setDrainageSpeed] = useState('Moderate Drainage');
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [aiResult, setAiResult] = useState<AISoilAnalysisResult | null>(null);
  const [submittedAnalysis, setSubmittedAnalysis] = useState<SoilAnalysisRequest | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Filter districts based on selected province
  const filteredDistricts = RWANDAN_DISTRICTS.filter(
    (d) => d.province === selectedProvince
  );

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const prov = e.target.value;
    setSelectedProvince(prov);
    const firstDistrict = RWANDAN_DISTRICTS.find((d) => d.province === prov);
    if (firstDistrict) {
      setSelectedDistrict(firstDistrict.id);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        setErrorMsg('Please select an image smaller than 8MB.');
        return;
      }
      setErrorMsg(null);
      setImageName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setAiResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  // Quick sample photo helper for testing
  const handleLoadSamplePhoto = (sampleType: 'volcanic' | 'red-clay' | 'marshland') => {
    setErrorMsg(null);
    setAiResult(null);
    if (sampleType === 'volcanic') {
      setImagePreview('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%232c2523"/><circle cx="150" cy="180" r="100" fill="%233d322d"/><circle cx="450" cy="220" r="130" fill="%231f1a18"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23d1d5db" font-family="sans-serif" font-size="20" font-weight="bold">Sample: Volcanic Soil Sample (Musanze)</text></svg>');
      setImageName('musanze_volcanic_soil.jpg');
      setSoilColor('Dark Volcanic (Umukara)');
      setSoilTexture('Loamy / Crumbly (Ifumbire)');
    } else if (sampleType === 'red-clay') {
      setImagePreview('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%238c3826"/><circle cx="200" cy="140" r="90" fill="%23a84630"/><circle cx="420" cy="260" r="120" fill="%23722a1b"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23fee2e2" font-family="sans-serif" font-size="20" font-weight="bold">Sample: Acidic Red Clay Soil (Huye)</text></svg>');
      setImageName('huye_red_clay_soil.jpg');
      setSoilColor('Reddish / Acidic Laterite (Igitaka Gitukura)');
      setSoilTexture('Heavy Clay / Sticky (Ibumba)');
    } else {
      setImagePreview('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%2327372b"/><circle cx="180" cy="200" r="110" fill="%231e2d22"/><circle cx="400" cy="180" r="100" fill="%23344638"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23dcfce7" font-family="sans-serif" font-size="20" font-weight="bold">Sample: Marshland Peat Soil (Valley)</text></svg>');
      setImageName('marshland_alluvial_soil.jpg');
      setSoilColor('Brownish Alluvial / Marshland (Icyondo cyo mu gishanga)');
      setSoilTexture('Silty / High Organic (Icyondo cy’uburumbuke)');
    }
  };

  const handleRemovePhoto = () => {
    setImagePreview(null);
    setImageName('');
    setAiResult(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imagePreview) {
      setErrorMsg('Please upload a soil photograph or select a sample image before submitting.');
      return;
    }

    const currentDistrictObj = RWANDAN_DISTRICTS.find((d) => d.id === selectedDistrict);
    const districtName = currentDistrictObj ? currentDistrictObj.name : selectedDistrict;

    setIsAnalyzing(true);
    setErrorMsg(null);

    let serverAiAnalysis: AISoilAnalysisResult | null = null;

    // Call server API for genuine AI vision analysis if backend is running
    try {
      const response = await fetch('/api/analyze-soil', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: imagePreview,
          district: districtName,
          province: selectedProvince,
          crop: intendedCrop,
          soilColor,
          topography,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.isAIConnected) {
          serverAiAnalysis = {
            isAIConnected: true,
            observations: data.observations || [
              `Soil shows consistent ${soilColor.toLowerCase()} coloration across surface.`,
              'Visible granular aggregates suggest crumb structure suitable for tillage.',
            ],
            colorAndTextureNotes: data.colorAndTextureNotes || `Apparent ${soilTexture} consistency with good physical aeration.`,
            potentialOrganicMatter: data.potentialOrganicMatter || 'Moderate to High based on surface darkness',
            labTestingAdvisory:
              data.labTestingAdvisory ||
              'Photographs capture visual morphology but cannot measure pH or N-P-K chemical levels. Send 500g of composite soil to your nearest RAB testing lab for accurate analysis.',
            recommendations: data.recommendations || [
              'Incorporate 15–20 tonnes/ha of well-rotted farmyard manure before planting.',
              selectedProvince === 'Southern' || selectedProvince === 'Western'
                ? 'Apply Travertine agricultural lime (2 t/ha) to counteract highland soil acidity.'
                : 'Construct radical or progressive contour bunds to safeguard topsoil from storm runoff.',
            ],
          };
        } else {
          // Server is up but GEMINI_API_KEY is not configured
          serverAiAnalysis = {
            isAIConnected: false,
            observations: [
              `Field soil photographed for ${intendedCrop} in ${districtName}.`,
              `Observed surface characteristics: ${soilColor}, ${soilTexture}.`,
            ],
            colorAndTextureNotes: 'Visual appearance indicates local topsoil typical of the agro-ecological zone.',
            potentialOrganicMatter: 'Requires laboratory titration for exact percentage',
            labTestingAdvisory:
              'Official RAB Standard: Visual inspection cannot quantify chemical pH, Nitrogen, Phosphorus or Potassium. Physical laboratory testing is mandatory for precise chemical diagnostics.',
            recommendations: [
              'Follow official RAB fertilizer recommendations for your crop and land size.',
              'Sample 20 cm depth across 8-10 spots and submit to a certified RAB laboratory.',
            ],
          };
        }
      }
    } catch {
      // Fallback if network or server unavailable
      serverAiAnalysis = {
        isAIConnected: false,
        observations: [
          `Soil sample staged for ${intendedCrop} in ${districtName} (${selectedProvince} Province).`,
          `Recorded visual characteristics: ${soilColor}, ${soilTexture}.`,
        ],
        colorAndTextureNotes: 'Visual characteristics recorded in local farm profile.',
        potentialOrganicMatter: 'Standard regional baseline applied',
        labTestingAdvisory:
          'Crucial: Photographs can inspect visible texture and color, but CANNOT measure pH, Nitrogen, Phosphorus, Potassium, or micronutrients. Physical laboratory testing at an accredited RAB station is required.',
        recommendations: [
          'Incorporate composted farmyard manure before planting.',
          selectedProvince === 'Southern' || selectedProvince === 'Western'
            ? 'Apply Travertine agricultural lime for acidic soils.'
            : 'Ensure proper terracing and drainage.',
        ],
      };
    } finally {
      setIsAnalyzing(false);
    }

    setAiResult(serverAiAnalysis);

    const newRequest: SoilAnalysisRequest = {
      id: `SOIL-${Date.now().toString().slice(-6)}`,
      farmerName: farmerName.trim() || user?.fullName || 'Farmer in Rwanda',
      phone: phone.trim() || user?.phoneNumber || '+250 788 000 000',
      province: selectedProvince,
      district: districtName,
      sector: sector.trim() || 'Local Sector',
      intendedCrop,
      landAreaAres: Number(landAreaAres) || 20,
      soilColor,
      soilTexture,
      topography,
      drainageSpeed,
      photoUrl: imagePreview,
      submittedAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'Ready for Lab / Vision Model',
      aiObservationResult: serverAiAnalysis,
    };

    setSubmittedAnalysis(newRequest);
    saveSoilRecord(newRequest);
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const activeDistrictInfo = RWANDAN_DISTRICTS.find((d) => d.id === selectedDistrict);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Header Banner */}
      <div className="bg-emerald-900 text-white rounded-3xl p-6 sm:p-10 border border-emerald-800 shadow-md space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800 text-amber-300 text-xs font-semibold tracking-wide">
          <Layers className="w-4 h-4 text-amber-300" />
          <span>{t('navSoilDoctor')}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          {t('soilDoctorTitle')}
        </h1>
        <p className="text-sm sm:text-base text-emerald-100 max-w-3xl leading-relaxed">
          {t('soilDoctorSubtitle')}
        </p>

        {/* Mandatory pH & Chemical Nutrient Caveat Banner */}
        <div className="bg-amber-500/20 rounded-2xl p-4 border border-amber-400/40 flex items-start gap-3 text-xs text-amber-200">
          <AlertCircle className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
          <div className="space-y-1 text-white">
            <span className="font-bold text-amber-300 uppercase tracking-wide">
              Critical Scientific Advisory:
            </span>
            <p className="leading-relaxed">
              {t('aiDisclaimerSoil')}
            </p>
          </div>
        </div>
      </div>

      {/* Main Intake Form & Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900">
              1. Soil Photograph & Location Details
            </h2>
            <p className="text-xs text-slate-500">
              {t('soilPhotoHint')}
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Photo Upload Zone */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              {t('soilPhotoLabel')} <span className="text-red-500">*</span>
            </label>

            {!imagePreview ? (
              <div className="border-2 border-dashed border-emerald-300 hover:border-emerald-500 bg-emerald-50/40 rounded-2xl p-6 text-center transition-colors">
                <input
                  type="file"
                  id="soil-file-upload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label
                  htmlFor="soil-file-upload"
                  className="cursor-pointer flex flex-col items-center justify-center space-y-2"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shadow-xs">
                    <Camera className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-semibold text-slate-800">
                    Click to capture with phone camera or upload file
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Supports JPG, PNG, WebP (Max 8MB)
                  </div>
                </label>

                {/* Sample Buttons for quick testing */}
                <div className="mt-4 pt-3 border-t border-emerald-200/60 flex flex-wrap items-center justify-center gap-2 text-xs">
                  <span className="text-slate-500 text-[11px]">{t('btnUseSample')}:</span>
                  <button
                    type="button"
                    onClick={() => handleLoadSamplePhoto('volcanic')}
                    className="px-2.5 py-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium text-[11px]"
                  >
                    Volcanic (Musanze)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLoadSamplePhoto('red-clay')}
                    className="px-2.5 py-1 rounded-md bg-amber-100 hover:bg-amber-200 text-amber-900 font-medium text-[11px]"
                  >
                    Red Acidic (Huye)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLoadSamplePhoto('marshland')}
                    className="px-2.5 py-1 rounded-md bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-medium text-[11px]"
                  >
                    Marshland Peat
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900">
                <img
                  src={imagePreview}
                  alt="Uploaded soil sample"
                  referrerPolicy="no-referrer"
                  className="w-full h-56 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-between p-4">
                  <div className="text-white text-xs font-medium truncate max-w-[240px]">
                    {imageName || 'Soil Sample Photo'}
                  </div>
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="p-1.5 rounded-lg bg-red-600/90 text-white hover:bg-red-700 transition-colors flex items-center gap-1 text-xs font-medium"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{t('btnRemove')}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Location Details in Rwanda */}
          <div className="space-y-4 pt-2">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              <span>Location in Rwanda</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  {t('provinceLabel')}
                </label>
                <select
                  value={selectedProvince}
                  onChange={handleProvinceChange}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 bg-white"
                >
                  <option value="Northern">Northern (Amajyaruguru)</option>
                  <option value="Southern">Southern (Amajyepfo)</option>
                  <option value="Eastern">Eastern (Iburasirazuba)</option>
                  <option value="Western">Western (Iburengerazuba)</option>
                  <option value="Kigali City">Kigali City (Umujyi wa Kigali)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  {t('districtLabel')}
                </label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 bg-white"
                >
                  {filteredDistricts.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} District
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  {t('sectorLabel')}
                </label>
                <input
                  type="text"
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  placeholder="e.g. Muhoza, Kinigi, or Maraba"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  {t('phoneLabel')}
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+250 78... or 078..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>
          </div>

          {/* Intended Crops & Soil Visual Properties */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Sprout className="w-3.5 h-3.5 text-emerald-700" />
              <span>Crop Plan & Field Characteristics</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  {t('intendedCropLabel')}
                </label>
                <select
                  value={intendedCrop}
                  onChange={(e) => setIntendedCrop(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 bg-white"
                >
                  <option value="Irish Potato (Kinigi)">Irish Potato (Ibirayi - Kinigi)</option>
                  <option value="Climbing Beans (Ibihyimbo)">Climbing Beans (Ibihyimbo bifite ibiti)</option>
                  <option value="Hybrid Maize (Ibigori)">Hybrid Maize (Ibigori - SC403/PAN)</option>
                  <option value="Arabica Coffee (Ikawa)">Arabica Coffee (Ikawa ya Bourbon)</option>
                  <option value="Highland Tea (Icyayi)">Tea (Icyayi cyo mu misozi)</option>
                  <option value="Cassava (Imyumbati)">Cassava (Imyumbati irwanya ububembe)</option>
                  <option value="Vegetables / Tomatoes (Inyanya)">Vegetables & Tomatoes (Inyanya / Amashu)</option>
                  <option value="Marshland Rice (Umuceri)">Marshland Rice (Umuceri)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  {t('plotSizeLabel')}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    value={landAreaAres}
                    onChange={(e) => setLandAreaAres(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                  />
                  <span className="text-xs text-slate-500 whitespace-nowrap">
                    Ares (1 ha = 100 ares)
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  {t('soilColorLabel')}
                </label>
                <select
                  value={soilColor}
                  onChange={(e) => setSoilColor(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 bg-white"
                >
                  <option value="Dark Volcanic (Umukara)">Dark Volcanic (Umukara w’ibirunga)</option>
                  <option value="Reddish / Acidic Laterite (Igitaka Gitukura)">Reddish Laterite (Igitaka gitukura)</option>
                  <option value="Light Sandy Loam (Umusenyi)">Light Sandy Loam (Umusenyi mwinshi)</option>
                  <option value="Brownish Alluvial / Marshland (Icyondo cyo mu gishanga)">Marshland Alluvial (Icyondo cyo mu gishanga)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  {t('topographyLabel')}
                </label>
                <select
                  value={topography}
                  onChange={(e) => setTopography(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 bg-white"
                >
                  <option value="Steep Hillside Terrace (Amaterasi)">Steep Hillside Terrace (Amaterasi y’indinganire)</option>
                  <option value="Gentle Hill Contour">Gentle Hill Contour (Imisozi itari ihanamye)</option>
                  <option value="Valley Bottom / Marshland">Valley Bottom / Marshland (Mu gishanga)</option>
                  <option value="Flat Savanna Plain">Flat Savanna Plain (Ibibaya by’Iburasirazuba)</option>
                </select>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isAnalyzing}
            className="w-full py-3 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 disabled:bg-slate-400 text-white font-bold text-sm shadow-xs transition-colors flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                <span>Processing Soil Visual Observation...</span>
              </>
            ) : (
              <>
                <Layers className="w-4 h-4 text-amber-300" />
                <span>{t('btnProcessSoil')}</span>
              </>
            )}
          </button>
        </form>

        {/* Right Column: District Profile & Laboratory Protocols */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Active District Regional Profile */}
          {activeDistrictInfo && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  District Agronomic Profile
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                  {activeDistrictInfo.province} Province
                </span>
              </div>
              
              <h3 className="text-base font-bold text-slate-900">
                {activeDistrictInfo.name} District Soils
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                {activeDistrictInfo.soilCharacteristics}
              </p>

              <div className="pt-2 border-t border-slate-100">
                <span className="text-xs font-semibold text-slate-700">Dominant Crops: </span>
                <span className="text-xs text-slate-600">
                  {activeDistrictInfo.keyCrops.join(', ')}
                </span>
              </div>
            </div>
          )}

          {/* Practical Soil Sampling Protocol */}
          <div className="bg-emerald-50/60 rounded-2xl border border-emerald-100 p-6 space-y-4">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
              <Beaker className="w-4 h-4 text-emerald-700" />
              <span>{t('howToSampleTitle')}</span>
            </div>

            <ol className="space-y-2.5 text-xs text-slate-700 list-decimal list-inside leading-relaxed">
              <li>
                <strong className="text-slate-900">{t('step1Sample')}</strong>
              </li>
              <li>
                <strong className="text-slate-900">{t('step2Sample')}</strong>
              </li>
              <li>
                <strong className="text-slate-900">{t('step3Sample')}</strong>
              </li>
              <li>
                <strong className="text-slate-900">{t('step4Sample')}</strong>
              </li>
            </ol>

            <button
              onClick={() => onNavigate('services', 'Soil Testing Laboratory')}
              className="w-full mt-2 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white border border-emerald-300 hover:bg-emerald-100/60 text-emerald-900 font-bold text-xs transition-colors"
            >
              <span>{t('findLabNearby')}</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-700" />
            </button>
          </div>

        </div>

      </div>

      {/* Submitted Intake Card / Visual Observations */}
      {submittedAnalysis && (
        <div className="bg-white rounded-3xl border-2 border-emerald-600/60 p-6 sm:p-8 shadow-md space-y-6 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Soil Intake Record #{submittedAnalysis.id}</span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">
                Soil Profile for {submittedAnalysis.district} ({submittedAnalysis.province})
              </h3>
            </div>
            
            <div className="flex items-center gap-2">
              {aiResult?.isAIConnected ? (
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  {t('aiConnectedTitle')}
                </span>
              ) : (
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-300 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-slate-500" />
                  RAB Standard Baseline
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Visual Sample Preview */}
            <div className="rounded-2xl overflow-hidden border border-slate-200">
              {submittedAnalysis.photoUrl ? (
                <img
                  src={submittedAnalysis.photoUrl}
                  alt="Farmer soil sample"
                  referrerPolicy="no-referrer"
                  className="w-full h-44 object-cover"
                />
              ) : (
                <div className="w-full h-44 bg-slate-100 flex items-center justify-center text-xs text-slate-400">
                  No Photo Attached
                </div>
              )}
              <div className="p-3 bg-slate-50 text-xs text-slate-600 space-y-1">
                <div><strong>Farmer:</strong> {submittedAnalysis.farmerName}</div>
                <div><strong>Crop:</strong> {submittedAnalysis.intendedCrop}</div>
                <div><strong>Area:</strong> {submittedAnalysis.landAreaAres} Ares</div>
              </div>
            </div>

            {/* AI Visual Observations & Organic Matter */}
            <div className="space-y-3 text-xs">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Visual Observations</span>
              </h4>

              {aiResult?.observations && (
                <ul className="space-y-1 text-slate-700">
                  {aiResult.observations.map((obs, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{obs}</span>
                    </li>
                  ))}
                </ul>
              )}

              {aiResult?.colorAndTextureNotes && (
                <p className="text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <strong>Texture notes:</strong> {aiResult.colorAndTextureNotes}
                </p>
              )}
            </div>

            {/* Mandatory Lab Testing Notice & Recommendations */}
            <div className="bg-amber-50/70 rounded-2xl p-4 border border-amber-200/80 space-y-3 text-xs">
              <div className="space-y-1 text-amber-950">
                <h4 className="font-bold text-amber-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
                  <span>Lab Testing Advisory</span>
                </h4>
                <p className="leading-relaxed">
                  {aiResult?.labTestingAdvisory || t('aiDisclaimerSoil')}
                </p>
              </div>

              <div className="pt-2 border-t border-amber-200/80 space-y-1 text-slate-800">
                <span className="font-bold text-[11px] block">Field Conditioning Steps:</span>
                <ul className="space-y-1">
                  {(aiResult?.recommendations || []).map((rec, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-1.5 shrink-0" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-1 flex flex-col gap-1.5">
                <button
                  onClick={() => onNavigate('services', 'Soil Testing Laboratory')}
                  className="w-full py-2 px-3 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Beaker className="w-3.5 h-3.5 text-amber-300" />
                  <span>Find Nearest Testing Lab in Rwanda</span>
                </button>
                <button
                  onClick={() => onNavigate('fertilizer-advisor')}
                  className="w-full py-2 px-3 rounded-lg bg-white border border-amber-300 text-amber-950 hover:bg-amber-100/50 font-semibold text-xs transition-colors"
                >
                  Calculate Fertilizer Bags for {submittedAnalysis.landAreaAres} Ares
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
