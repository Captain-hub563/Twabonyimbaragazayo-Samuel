import React, { useState } from 'react';
import { SectionId, IrrigationZone } from '../types';
import { INITIAL_IRRIGATION_ZONES } from '../data/mockData';
import { APP_IMAGES } from '../data/assets';
import { useLanguage } from '../i18n/LanguageContext';
import {
  Droplets,
  Sun,
  Cpu,
  WifiOff,
  AlertTriangle,
  Play,
  RotateCcw,
  CheckCircle2,
  Info,
  Clock,
  Gauge,
  ShieldCheck,
  Zap,
  ArrowRight,
  ExternalLink,
  Lock
} from 'lucide-react';

interface SmartIrrigationSectionProps {
  onNavigate: (section: SectionId, filter?: string) => void;
}

export const SmartIrrigationSection: React.FC<SmartIrrigationSectionProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [zones, setZones] = useState<IrrigationZone[]>(INITIAL_IRRIGATION_ZONES);
  const [selectedZoneId, setSelectedZoneId] = useState<string>('zone-1');
  const [gatewaySimulated, setGatewaySimulated] = useState<boolean>(false);
  const [gatewayPhone, setGatewayPhone] = useState<string>('');
  const [hardwareMachineId, setHardwareMachineId] = useState<string>('');
  const [pairingNotice, setPairingNotice] = useState<string | null>(null);

  // Irrigation water need calculator
  const [calcAreaAres, setCalcAreaAres] = useState<number>(20);
  const [calcSoilType, setCalcSoilType] = useState<string>('loam');
  const [pumpFlowRateLph, setPumpFlowRateLph] = useState<number>(1500); // 1,500 L/hr solar pump

  const activeZone = zones.find((z) => z.id === selectedZoneId) || zones[0];

  const dailyWaterLiters = Math.round(calcAreaAres * (calcSoilType === 'sand' ? 55 : calcSoilType === 'clay' ? 35 : 45));
  const estimatedPumpingMinutes = Math.round((dailyWaterLiters / pumpFlowRateLph) * 60);

  const handleSimulatePairing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gatewayPhone.trim()) {
      setPairingNotice('Please enter a valid Rwandan SIM phone number (e.g. +250 788 123 456).');
      return;
    }
    setGatewaySimulated(true);
    setPairingNotice(
      `Hardware Staging Profile Registered: Controller SIM ${gatewayPhone} and Machine ID "${hardwareMachineId || 'AUTO-PUMP-01'}" are staged for secure handshake. The system remains in safe manual operation mode until the physical relay responds to authentication ping.`
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Header Banner */}
      <div className="bg-emerald-900 text-white rounded-3xl p-6 sm:p-10 border border-emerald-800 shadow-md space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800 text-amber-300 text-xs font-semibold tracking-wide">
          <Droplets className="w-4 h-4 text-amber-300" />
          <span>{t('navIrrigation')}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          {t('irrigationTitle')}
        </h1>
        <p className="text-sm sm:text-base text-emerald-100 max-w-3xl leading-relaxed">
          {t('irrigationSubtitle')}
        </p>

        {/* Clear Hardware Disclaimer */}
        <div className="bg-emerald-950/80 rounded-2xl p-4 border border-emerald-800/80 flex items-start gap-3 text-xs text-emerald-200">
          <WifiOff className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-white">{t('hardwareStatusTitle')}:</span>
            <p className="leading-relaxed">{t('hardwareStatusNote')}</p>
          </div>
        </div>
      </div>

      {/* Visual Showcase: Terraced Solar Drip in Rwanda */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="lg:col-span-5 space-y-4">
          <div className="text-xs font-bold text-amber-700 uppercase tracking-widest">
            Sustainable Technology
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
            {t('solarDripHeading')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {t('solarDripDesc')}
          </p>

          <div className="space-y-2 text-xs text-slate-700">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{t('ssitSubsidyHighlight')}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Zero fuel costs with 24V solar submersible pumps</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Gravity-fed hillside header tanks from valley wells</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onNavigate('market', 'Equipment')}
              className="px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-xs transition-colors inline-flex items-center gap-1.5"
            >
              <span>View Solar Pump Kits & Prices</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200">
            <img
              src={APP_IMAGES.smartIrrigation}
              alt="Solar powered drip irrigation in Rwandan terraced landscape"
              referrerPolicy="no-referrer"
              className="w-full h-72 sm:h-80 object-cover"
            />
            <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
              <span>Terraced drip line layout with photovoltaic solar array</span>
              <span className="font-semibold text-emerald-800">Eastern / Northern Hills</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Soil Moisture & Irrigation Schedule Simulator */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">
              {t('farmZonesDashboard')}
            </h3>
            <p className="text-xs text-slate-500">
              Simulated telemetry demonstrates how IoT soil probes will monitor field blocks.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium text-slate-500">System Mode:</span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-stone-100 text-stone-800 border border-stone-200">
              Local Valve Guidance
            </span>
          </div>
        </div>

        {/* Zones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {zones.map((zone) => {
            const isSelected = zone.id === selectedZoneId;
            return (
              <div
                key={zone.id}
                onClick={() => setSelectedZoneId(zone.id)}
                className={`cursor-pointer rounded-2xl border p-5 transition-all duration-200 bg-white space-y-4 ${
                  isSelected
                    ? 'border-emerald-600 ring-2 ring-emerald-600/20 shadow-md'
                    : 'border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 truncate">
                    {zone.name}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    zone.status === 'Requires Water'
                      ? 'bg-amber-100 text-amber-900 border border-amber-200'
                      : zone.status === 'Wet'
                      ? 'bg-blue-100 text-blue-900 border border-blue-200'
                      : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                  }`}>
                    {zone.status}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Soil Moisture Level</span>
                    <span className="font-bold text-slate-900">{zone.soilMoisturePercent}%</span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        zone.soilMoisturePercent < 45
                          ? 'bg-amber-500'
                          : zone.soilMoisturePercent > 70
                          ? 'bg-blue-600'
                          : 'bg-emerald-600'
                      }`}
                      style={{ width: `${Math.min(100, zone.soilMoisturePercent)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>Target: {zone.targetMoisturePercent}%</span>
                    <span>Area: {zone.areaAres} Ares</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-700">
                  <span className="text-slate-500">Crop:</span>
                  <span className="font-semibold text-slate-900">{zone.crop}</span>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl text-xs flex items-center justify-between">
                  <span className="text-slate-500">Rec. Run Time:</span>
                  <span className="font-bold text-emerald-800">
                    {zone.recommendedRuntimeMin > 0 ? `${zone.recommendedRuntimeMin} min` : 'None Needed'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Water Requirements Calculator & Hardware Machine Gateway Setup */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Quick Calculator */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Gauge className="w-4 h-4 text-emerald-700" />
              <span>{t('waterNeedCalculator')}</span>
            </h3>
            <p className="text-xs text-slate-500">
              Calculate exact pumping duration based on plot size and solar pump output.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Plot Area to Irrigate</span>
                <span className="text-emerald-700 font-extrabold">{calcAreaAres} Ares</span>
              </div>
              <input
                type="range"
                min="2"
                max="100"
                value={calcAreaAres}
                onChange={(e) => setCalcAreaAres(Number(e.target.value))}
                className="w-full accent-emerald-700 cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Soil Infiltration
                </label>
                <select
                  value={calcSoilType}
                  onChange={(e) => setCalcSoilType(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 bg-white"
                >
                  <option value="loam">Volcanic / Loam (Medium)</option>
                  <option value="sand">Sandy Savanna (High)</option>
                  <option value="clay">Heavy Clay (Slow)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Pump Capacity (L/hr)
                </label>
                <select
                  value={pumpFlowRateLph}
                  onChange={(e) => setPumpFlowRateLph(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 bg-white"
                >
                  <option value="800">800 Liters/hr (Small 12V Solar)</option>
                  <option value="1500">1,500 Liters/hr (Standard 24V Kit)</option>
                  <option value="3000">3,000 Liters/hr (High Head 48V)</option>
                  <option value="5000">5,000 Liters/hr (Cooperative Main)</option>
                </select>
              </div>
            </div>

            {/* Calculated Output Display */}
            <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200 grid grid-cols-2 gap-4 text-center">
              <div>
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                  {t('calcDailyWater')}
                </span>
                <div className="text-xl font-black text-emerald-950 mt-0.5">
                  {dailyWaterLiters.toLocaleString()} L
                </div>
                <div className="text-[10px] text-emerald-700">~{(dailyWaterLiters / 1000).toFixed(1)} m³</div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                  {t('calcRuntime')}
                </span>
                <div className="text-xl font-black text-emerald-950 mt-0.5">
                  {estimatedPumpingMinutes} min
                </div>
                <div className="text-[10px] text-emerald-700">Run in Morning 7-9 AM</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Future Remote GSM Gateway & Physical Machine Pairing Interface */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-emerald-700" />
                <span>{t('iotGatewayHeading')}</span>
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                Machine Ready
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Architecture prepared for physical automatic watering machine controller and GSM relay module.
            </p>
          </div>

          <form onSubmit={handleSimulatePairing} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Machine Hardware ID
                </label>
                <input
                  type="text"
                  value={hardwareMachineId}
                  onChange={(e) => setHardwareMachineId(e.target.value)}
                  placeholder="e.g. RW-PUMP-NYAMASHEKE-01"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Controller SIM Phone Number
                </label>
                <input
                  type="tel"
                  value={gatewayPhone}
                  onChange={(e) => setGatewayPhone(e.target.value)}
                  placeholder="+250 788 000 000"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Hardware Machine Safety Mechanism
              </label>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-slate-900">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Dry-Run Protection Sensor Handshake</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  The physical controller automatically cuts power if the water source drops below minimum intake depth, preventing motor burnout.
                </p>
              </div>
            </div>

            {pairingNotice && (
              <div className="p-3 bg-amber-50 text-amber-900 text-xs rounded-xl border border-amber-200">
                {pairingNotice}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <Lock className="w-3.5 h-3.5 text-amber-300" />
              <span>{t('btnRegisterGsm')}</span>
            </button>
          </form>

          {/* Technical Disclosure */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 leading-relaxed">
            * Note: For field safety, remote pump actuation requires physical installation of a certified relay box with thermal breaker and water level probe. Remote control remains staged until physical handshake is established.
          </div>
        </div>

      </div>

    </div>
  );
};
