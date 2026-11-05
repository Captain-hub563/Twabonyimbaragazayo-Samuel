import React, { useState } from 'react';
import { SectionId, SupportedLanguage } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { useFarmerAuth } from '../context/FarmerAuthContext';
import { RWANDAN_DISTRICTS } from '../data/mockData';
import {
  User,
  ShieldCheck,
  CheckCircle2,
  Database,
  Phone,
  MapPin,
  Sprout,
  Layers,
  Activity,
  LogOut,
  LogIn,
  UserPlus,
  Calendar,
  AlertCircle
} from 'lucide-react';

interface AccountSectionProps {
  onNavigate: (section: SectionId, filter?: string) => void;
}

export const AccountSection: React.FC<AccountSectionProps> = ({ onNavigate }) => {
  const { t, language, setLanguage } = useLanguage();
  const {
    user,
    savedSoilTests,
    savedDiagnoses,
    registerFarmer,
    loginFarmer,
    logoutFarmer,
    cloudSyncStatus
  } = useFarmerAuth();

  const [isRegisterMode, setIsRegisterMode] = useState(!user);
  const [loginPhone, setLoginPhone] = useState('');
  
  // Registration form fields
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [nationalId, setNationalId] = useState(user?.nationalIdOrCard || '');
  const [province, setProvince] = useState(user?.province || 'Northern');
  const [district, setDistrict] = useState(user?.district || 'Musanze');
  const [sector, setSector] = useState(user?.sector || '');
  const [farmSizeAres, setFarmSizeAres] = useState<number>(user?.farmSizeAres || 25);
  const [primaryCrops, setPrimaryCrops] = useState<string[]>(user?.primaryCrops || ['Irish Potato (Kinigi)']);
  const [prefLang, setPrefLang] = useState<SupportedLanguage>(user?.preferredLanguage || language);
  
  const [message, setMessage] = useState<string | null>(null);

  const availableCrops = [
    'Irish Potato (Kinigi)',
    'Climbing Beans',
    'Hybrid Maize',
    'Arabica Coffee',
    'Highland Tea',
    'Cassava',
    'Vegetables & Tomatoes',
    'Rice'
  ];

  const filteredDistricts = RWANDAN_DISTRICTS.filter((d) => d.province === province);

  const handleToggleCrop = (cropName: string) => {
    if (primaryCrops.includes(cropName)) {
      setPrimaryCrops(primaryCrops.filter((c) => c !== cropName));
    } else {
      setPrimaryCrops([...primaryCrops, cropName]);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phoneNumber.trim()) {
      setMessage('Please enter your full name and phone number.');
      return;
    }

    await registerFarmer({
      fullName: fullName.trim(),
      phoneNumber: phoneNumber.trim(),
      nationalIdOrCard: nationalId.trim() || undefined,
      province,
      district,
      sector: sector.trim() || 'Sector Center',
      farmSizeAres: Number(farmSizeAres) || 20,
      primaryCrops: primaryCrops.length > 0 ? primaryCrops : ['Irish Potato (Kinigi)'],
      preferredLanguage: prefLang
    });

    setLanguage(prefLang);
    setMessage(t('registeredSuccess'));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginPhone.trim()) {
      setMessage('Please enter your phone number to sign in.');
      return;
    }
    const success = await loginFarmer(loginPhone.trim());
    if (success) {
      setMessage(t('loginSuccess'));
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Header Banner */}
      <div className="bg-emerald-900 text-white rounded-3xl p-6 sm:p-10 border border-emerald-800 shadow-md space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800 text-amber-300 text-xs font-semibold tracking-wide">
          <User className="w-4 h-4 text-amber-300" />
          <span>{t('accountTitle')}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          {t('accountTitle')}
        </h1>
        <p className="text-sm sm:text-base text-emerald-100 max-w-3xl leading-relaxed">
          {t('accountSubtitle')}
        </p>

        {/* Database & Security Architecture Disclosure */}
        <div className="bg-emerald-950/80 rounded-2xl p-4 border border-emerald-800/80 flex items-start gap-3 text-xs text-emerald-200">
          <Database className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-white">Database & Authentication Architecture:</span>
            <p>{t('databaseStatusNote')}</p>
          </div>
        </div>
      </div>

      {message && (
        <div className="p-4 bg-emerald-50 text-emerald-900 text-xs rounded-2xl border border-emerald-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>{message}</span>
          </div>
          <button onClick={() => setMessage(null)} className="text-slate-400 hover:text-slate-700 text-xs font-bold">
            ×
          </button>
        </div>
      )}

      {user && user.isAuthenticated ? (
        /* Authenticated Farmer Profile View */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Profile Summary Card */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-amber-300 flex items-center justify-center font-bold text-lg">
                  {user.fullName.charAt(0)}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">{user.fullName}</h2>
                  <div className="text-xs text-slate-500 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-emerald-700" />
                    <span>{user.phoneNumber}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={logoutFarmer}
                className="p-2 text-slate-400 hover:text-red-600 rounded-lg transition-colors flex items-center gap-1 text-xs font-medium"
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">{t('navLogout')}</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] text-emerald-800">
                {t('farmDetailsTitle')}
              </h3>

              <div className="space-y-2 text-slate-700">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Location:</span>
                  <span className="font-semibold">{user.district} District, {user.province}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Sector:</span>
                  <span className="font-semibold">{user.sector || 'District Central'}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Farm Area:</span>
                  <span className="font-semibold">{user.farmSizeAres} Ares ({(user.farmSizeAres / 100).toFixed(2)} Ha)</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Member Since:</span>
                  <span className="font-semibold">{user.registeredAt}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                {t('primaryCropsLabel')}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {user.primaryCrops.map((c) => (
                  <span
                    key={c}
                    className="px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-100"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => onNavigate('fertilizer-advisor')}
                className="w-full py-2.5 px-3 rounded-xl bg-emerald-800 text-white font-bold text-xs hover:bg-emerald-900 transition-colors"
              >
                {t('btnCalculateNutrients')}
              </button>
              <button
                onClick={() => onNavigate('plant-doctor')}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-100 text-slate-800 font-semibold text-xs hover:bg-slate-200 transition-colors"
              >
                {t('btnDiagnoseCrop')}
              </button>
            </div>
          </div>

          {/* Right: Saved Field History Records */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-700" />
                  <span>{t('savedReportsTitle')}</span>
                </h3>
                <span className="text-xs font-semibold text-slate-500">
                  {savedDiagnoses.length + savedSoilTests.length} Total Records
                </span>
              </div>

              {savedDiagnoses.length === 0 && savedSoilTests.length === 0 ? (
                <div className="text-center py-10 text-slate-500 text-xs space-y-3">
                  <p>{t('noSavedReports')}</p>
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => onNavigate('soil-doctor')}
                      className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold text-xs"
                    >
                      {t('btnTestSoil')}
                    </button>
                    <button
                      onClick={() => onNavigate('plant-doctor')}
                      className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold text-xs"
                    >
                      {t('btnDiagnoseCrop')}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {savedDiagnoses.map((diag) => (
                    <div
                      key={diag.id}
                      className="p-4 rounded-xl border border-slate-200 hover:border-emerald-500 transition-colors flex items-start justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="font-bold text-emerald-800">{diag.crop}</span>
                          <span className="text-slate-400">·</span>
                          <span className="text-slate-500">{diag.submittedAt}</span>
                        </div>
                        <p className="text-xs text-slate-600">
                          Symptoms: {diag.symptoms.join(', ')} ({diag.affectedPart})
                        </p>
                      </div>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 shrink-0">
                        Inspected
                      </span>
                    </div>
                  ))}

                  {savedSoilTests.map((soil) => (
                    <div
                      key={soil.id}
                      className="p-4 rounded-xl border border-slate-200 hover:border-emerald-500 transition-colors flex items-start justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="font-bold text-emerald-800">Soil: {soil.intendedCrop}</span>
                          <span className="text-slate-400">·</span>
                          <span className="text-slate-500">{soil.submittedAt}</span>
                        </div>
                        <p className="text-xs text-slate-600">
                          {soil.district} ({soil.landAreaAres} Ares) · {soil.soilColor}
                        </p>
                      </div>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                        {soil.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>
      ) : (
        /* Sign In / Register Tabs */
        <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="flex items-center justify-center p-1 bg-slate-100 rounded-xl max-w-xs mx-auto">
            <button
              onClick={() => setIsRegisterMode(true)}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${
                isRegisterMode ? 'bg-white text-emerald-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              {t('tabRegister')}
            </button>
            <button
              onClick={() => setIsRegisterMode(false)}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${
                !isRegisterMode ? 'bg-white text-emerald-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              {t('tabLogin')}
            </button>
          </div>

          {isRegisterMode ? (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {t('fullNameLabel')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Jean-Baptiste Niyitegeka"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {t('phoneLabel')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+250 788 000 000"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {t('provinceLabel')}
                  </label>
                  <select
                    value={province}
                    onChange={(e) => {
                      setProvince(e.target.value as any);
                      const dFirst = RWANDAN_DISTRICTS.find((d) => d.province === e.target.value);
                      if (dFirst) setDistrict(dFirst.name);
                    }}
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
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {t('districtLabel')}
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 bg-white"
                  >
                    {filteredDistricts.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {t('sectorLabel')}
                  </label>
                  <input
                    type="text"
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    placeholder="e.g. Kinigi or Maraba"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {t('plotSizeLabel')}
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={farmSizeAres}
                    onChange={(e) => setFarmSizeAres(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {t('primaryCropsLabel')}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {availableCrops.map((c) => {
                    const sel = primaryCrops.includes(c);
                    return (
                      <button
                        type="button"
                        key={c}
                        onClick={() => handleToggleCrop(c)}
                        className={`p-2 rounded-lg text-xs text-left border transition-colors ${
                          sel
                            ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-600'
                        }`}
                      >
                        {c}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-xs transition-colors"
              >
                {t('tabRegister')}
              </button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {t('phoneLabel')}
                </label>
                <input
                  type="tel"
                  required
                  value={loginPhone}
                  onChange={(e) => setLoginPhone(e.target.value)}
                  placeholder="+250 788 000 000"
                  className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-xs transition-colors"
              >
                {t('tabLogin')}
              </button>
            </form>
          )}
        </div>
      )}

    </div>
  );
};
