import React, { useState } from 'react';
import { SectionId, AgriculturalService } from '../types';
import { AGRICULTURAL_SERVICES, RWANDAN_DISTRICTS } from '../data/mockData';
import { useLanguage } from '../i18n/LanguageContext';
import { useFarmerAuth } from '../context/FarmerAuthContext';
import {
  Building2,
  Search,
  MapPin,
  Phone,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  Beaker,
  Users,
  Award,
  Send,
  X,
  Navigation
} from 'lucide-react';

interface ServicesSectionProps {
  onNavigate: (section: SectionId, filter?: string) => void;
  initialTypeFilter?: string;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onNavigate, initialTypeFilter }) => {
  const { t } = useLanguage();
  const { user } = useFarmerAuth();

  const [selectedType, setSelectedType] = useState<string>(initialTypeFilter || 'All');
  const [selectedProvince, setSelectedProvince] = useState<string>('All');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Appointment modal
  const [appointmentService, setAppointmentService] = useState<AgriculturalService | null>(null);
  const [farmerName, setFarmerName] = useState(user?.fullName || '');
  const [farmerPhone, setFarmerPhone] = useState(user?.phoneNumber || '');
  const [requestNotes, setRequestNotes] = useState('');
  const [appointmentSent, setAppointmentSent] = useState(false);

  const serviceTypes = [
    'All',
    'Soil Testing Laboratory',
    'Agricultural Extension Officer',
    'Farmer Cooperative'
  ];

  const provinces = ['All', 'Northern', 'Southern', 'Eastern', 'Western', 'Kigali City'];

  const filteredDistricts = selectedProvince === 'All'
    ? RWANDAN_DISTRICTS
    : RWANDAN_DISTRICTS.filter((d) => d.province === selectedProvince);

  const filteredServices = AGRICULTURAL_SERVICES.filter((svc) => {
    const matchesType =
      selectedType === 'All' || svc.type === selectedType;
    const matchesProvince =
      selectedProvince === 'All' || svc.province === selectedProvince;
    const matchesDistrict =
      selectedDistrict === 'All' || svc.district.toLowerCase() === selectedDistrict.toLowerCase();
    const matchesSearch =
      svc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      svc.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      svc.servicesOffered.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesProvince && matchesDistrict && matchesSearch;
  });

  const handleFilterByMyDistrict = () => {
    if (user && user.district) {
      setSelectedProvince(user.province || 'All');
      setSelectedDistrict(user.district);
    }
  };

  const handleOpenAppointment = (svc: AgriculturalService) => {
    setAppointmentService(svc);
    setAppointmentSent(false);
  };

  const handleSendAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!farmerPhone.trim()) return;
    setAppointmentSent(true);
    setTimeout(() => {
      setAppointmentService(null);
      setFarmerName('');
      setFarmerPhone('');
      setRequestNotes('');
    }, 2500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Header Banner */}
      <div className="bg-emerald-900 text-white rounded-3xl p-6 sm:p-10 border border-emerald-800 shadow-md space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800 text-amber-300 text-xs font-semibold tracking-wide">
          <Building2 className="w-4 h-4 text-amber-300" />
          <span>{t('navServices')}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          {t('servicesTitle')}
        </h1>
        <p className="text-sm sm:text-base text-emerald-100 max-w-3xl leading-relaxed">
          {t('servicesSubtitle')}
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col gap-4">
          
          {/* Top row: Type Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              {serviceTypes.map((type) => {
                const isActive = selectedType === type;
                return (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      isActive
                        ? 'bg-emerald-800 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>

            {user?.district && (
              <button
                onClick={handleFilterByMyDistrict}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-100 transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-amber-700" />
                <span>Near My District ({user.district})</span>
              </button>
            )}
          </div>

          {/* Bottom row: Province filter + District filter + Search box */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-100">
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">Location:</span>
              <select
                value={selectedProvince}
                onChange={(e) => {
                  setSelectedProvince(e.target.value);
                  setSelectedDistrict('All');
                }}
                className="px-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 bg-white"
              >
                {provinces.map((p) => (
                  <option key={p} value={p}>
                    {p === 'All' ? 'All Provinces' : `${p} Province`}
                  </option>
                ))}
              </select>

              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 bg-white"
              >
                <option value="All">All Districts</option>
                {filteredDistricts.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name} District
                  </option>
                ))}
              </select>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by district, lab or service..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Services List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((svc) => (
          <div
            key={svc.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-100">
                  {svc.type}
                </span>
                {svc.verified && (
                  <span className="text-[11px] text-amber-700 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                    RAB Verified
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {svc.name}
                </h3>
                <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>{svc.district} District ({svc.province} Province)</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 pl-5">
                  {svc.address}
                </div>
              </div>

              {/* Services Offered list */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                  Available Services:
                </span>
                <ul className="space-y-1 text-xs text-slate-600">
                  {svc.servicesOffered.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-emerald-700 mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-4 space-y-2">
              <div className="text-[11px] text-slate-500">
                Contact: <strong className="text-slate-800">{svc.contactPerson}</strong>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${svc.phone.replace(/\s+/g, '')}`}
                  className="flex-1 py-2 px-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-300" />
                  <span>{svc.phone}</span>
                </a>

                <button
                  onClick={() => handleOpenAppointment(svc)}
                  className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors"
                >
                  {t('btnBookVisit')}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Appointment / Field Visit Modal */}
      {appointmentService && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                  {t('appointmentModalTitle')}
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  {appointmentService.name}
                </h3>
              </div>
              <button
                onClick={() => setAppointmentService(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {appointmentSent ? (
              <div className="p-6 text-center space-y-2 bg-emerald-50 rounded-2xl border border-emerald-200">
                <CheckCircle2 className="w-8 h-8 text-emerald-700 mx-auto" />
                <h4 className="font-bold text-emerald-950 text-sm">
                  Consultation Request Scheduled
                </h4>
                <p className="text-xs text-emerald-800">
                  {appointmentService.contactPerson} has received your details. Expect a confirmation call or SMS on {farmerPhone}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendAppointment} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={farmerName}
                    onChange={(e) => setFarmerName(e.target.value)}
                    placeholder="e.g. Alphonse Habimana"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Phone Number (MTN / Airtel Rwanda) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={farmerPhone}
                    onChange={(e) => setFarmerPhone(e.target.value)}
                    placeholder="+250 788 000 000"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Reason for Consultation (Soil sample drop-off, pest inspection, etc.)
                  </label>
                  <textarea
                    rows={3}
                    value={requestNotes}
                    onChange={(e) => setRequestNotes(e.target.value)}
                    placeholder="Describe your plot, crop, or service needed..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5 text-amber-300" />
                    <span>Submit Request to Extension Office</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
