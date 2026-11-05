import React, { useState } from 'react';
import { SectionId, MarketCommodity } from '../types';
import { MARKET_COMMODITIES } from '../data/mockData';
import { APP_IMAGES } from '../data/assets';
import { useLanguage } from '../i18n/LanguageContext';
import {
  ShoppingBag,
  Search,
  CheckCircle2,
  Phone,
  MapPin,
  TrendingUp,
  Tag,
  ShieldCheck,
  Send,
  X,
  AlertCircle,
  Info,
  Filter
} from 'lucide-react';

interface MarketSectionProps {
  onNavigate: (section: SectionId, filter?: string) => void;
  initialFilter?: string;
}

export const MarketSection: React.FC<MarketSectionProps> = ({ onNavigate, initialFilter }) => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>(initialFilter || 'All');
  const [supplierTypeFilter, setSupplierTypeFilter] = useState<'all' | 'verified' | 'sample'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inquiryModalItem, setInquiryModalItem] = useState<MarketCommodity | null>(null);
  
  // Inquiry form fields
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [quantityNeeded, setQuantityNeeded] = useState('');
  const [inquirySent, setInquirySent] = useState(false);

  const categories = ['All', 'Certified Seeds', 'Fertilizers', 'Equipment', 'Market Produce'];

  const filteredItems = MARKET_COMMODITIES.filter((item) => {
    const matchesCat =
      selectedCategory === 'All' || item.category === selectedCategory;
    
    const matchesSupplierType =
      supplierTypeFilter === 'all' ||
      (supplierTypeFilter === 'verified' && item.isVerifiedSupplier) ||
      (supplierTypeFilter === 'sample' && item.isSampleListing);

    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.variety.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.marketLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.supplierOrBuyer.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCat && matchesSupplierType && matchesSearch;
  });

  const handleOpenInquiry = (item: MarketCommodity) => {
    setInquiryModalItem(item);
    setInquirySent(false);
  };

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerPhone.trim()) return;
    setInquirySent(true);
    setTimeout(() => {
      setInquiryModalItem(null);
      setBuyerName('');
      setBuyerPhone('');
      setQuantityNeeded('');
    }, 2500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Header Banner */}
      <div className="bg-emerald-900 text-white rounded-3xl p-6 sm:p-10 border border-emerald-800 shadow-md space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800 text-amber-300 text-xs font-semibold tracking-wide">
          <ShoppingBag className="w-4 h-4 text-amber-300" />
          <span>{t('navMarket')}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          {t('marketTitle')}
        </h1>
        <p className="text-sm sm:text-base text-emerald-100 max-w-3xl leading-relaxed">
          {t('marketSubtitle')}
        </p>

        {/* Verification Architecture Notice */}
        <div className="bg-emerald-950/80 rounded-2xl p-4 border border-emerald-800/80 flex items-start gap-3 text-xs text-emerald-200">
          <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-white">Listing Verification Transparency:</span>
            <p>
              To protect farmers from uncertified counterfeits, listings are clearly demarcated: official accredited agro-dealers and seed federations bear the <strong>Verified RAB Supplier</strong> badge, while demonstration offers carry the <strong>Sample Community Listing</strong> badge.
            </p>
          </div>
        </div>
      </div>

      {/* Visual Feature: Certified Harvest Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="lg:col-span-7">
          <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200">
            <img
              src={APP_IMAGES.cropMarket}
              alt="Fresh harvest of certified maize, climbing beans, and coffee in Rwanda"
              referrerPolicy="no-referrer"
              className="w-full h-64 sm:h-80 object-cover"
            />
            <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
              <span>RAB-Certified Seeds and Export-Grade Produce</span>
              <span className="font-semibold text-emerald-800">Kimironko & Regional Depots</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-4">
          <div className="text-xs font-bold text-amber-700 uppercase tracking-widest">
            {t('fairPricesHeading')}
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
            {t('fairPricesHeading')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            By checking current weekly wholesale commodity prices across Kigali, Musanze, Huye, and Nyagatare, farmers know the real market value of their crops before selling at farm-gate.
          </p>

          <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs space-y-1.5 text-amber-950">
            <div className="font-bold flex items-center gap-1.5 text-amber-900">
              <TrendingUp className="w-4 h-4 text-amber-700" />
              <span>Indicative Wholesale Prices:</span>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1 font-medium">
              <div>Kinigi Potato: <span className="font-bold text-slate-900">450 RWF/kg</span></div>
              <div>Red Climbing Beans: <span className="font-bold text-slate-900">900 RWF/kg</span></div>
              <div>Dry Grain Maize: <span className="font-bold text-slate-900">520 RWF/kg</span></div>
              <div>Coffee Cherry: <span className="font-bold text-slate-900">410 RWF/kg</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar with Supplier Verification Filter */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col gap-4">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Sub-Filter: Verified vs Sample Listings + Search */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-1.5 w-full sm:w-auto">
              <span className="text-xs text-slate-500 font-medium">Filter by Supplier:</span>
              <button
                onClick={() => setSupplierTypeFilter('all')}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  supplierTypeFilter === 'all'
                    ? 'bg-emerald-100 text-emerald-900 font-bold'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {t('filterAllListings')}
              </button>
              <button
                onClick={() => setSupplierTypeFilter('verified')}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  supplierTypeFilter === 'verified'
                    ? 'bg-emerald-700 text-white font-bold'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {t('filterVerifiedOnly')}
              </button>
              <button
                onClick={() => setSupplierTypeFilter('sample')}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  supplierTypeFilter === 'sample'
                    ? 'bg-amber-600 text-white font-bold'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                Sample Listings
              </button>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search seed, fertilizer, or market hub..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Commodities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-2xl border p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4 ${
              item.isVerifiedSupplier
                ? 'border-emerald-200/80'
                : 'border-amber-200/80 bg-amber-50/20'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                  {item.category}
                </span>

                {item.isVerifiedSupplier ? (
                  <span className="text-[11px] text-emerald-800 font-bold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    {t('badgeVerifiedSupplier')}
                  </span>
                ) : (
                  <span className="text-[11px] text-amber-900 font-bold flex items-center gap-1 bg-amber-100/80 px-2 py-0.5 rounded-md border border-amber-300">
                    <Info className="w-3.5 h-3.5 text-amber-700" />
                    {t('badgeSampleListing')}
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {item.variety}
                </p>
              </div>

              {item.certificationStatus && (
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>{item.certificationStatus}</span>
                </div>
              )}

              <div className="space-y-1 text-xs text-slate-600 pt-1">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{item.marketLocation}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <Tag className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{item.supplierOrBuyer}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-3 space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-slate-500">Official Price:</span>
                <div className="text-right">
                  <span className="text-lg font-extrabold text-slate-900">
                    {item.priceRwf.toLocaleString()} RWF
                  </span>
                  <span className="text-[11px] text-slate-500 block">
                    {item.unit}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${item.phone.replace(/\s+/g, '')}`}
                  className="flex-1 py-2 px-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5 text-center"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-300" />
                  <span>{t('btnCallSupplier')}</span>
                </a>

                <button
                  onClick={() => handleOpenInquiry(item)}
                  className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors"
                >
                  {t('btnInquire')}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Inquiry Modal */}
      {inquiryModalItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                  {t('inquiryModalTitle')}
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  {inquiryModalItem.name}
                </h3>
              </div>
              <button
                onClick={() => setInquiryModalItem(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {inquirySent ? (
              <div className="p-6 text-center space-y-2 bg-emerald-50 rounded-2xl border border-emerald-200">
                <CheckCircle2 className="w-8 h-8 text-emerald-700 mx-auto" />
                <h4 className="font-bold text-emerald-950 text-sm">
                  Inquiry Dispatched!
                </h4>
                <p className="text-xs text-emerald-800">
                  {inquiryModalItem.supplierOrBuyer} has received your request. An agronomist or dispatch manager will contact you at {buyerPhone}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendInquiry} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Your Name or Cooperative Name
                  </label>
                  <input
                    type="text"
                    required
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder="e.g. Jean Mugisha (Huye Farmers)"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Your Phone Number (MTN / Airtel Rwanda) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    placeholder="+250 788 000 000"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Estimated Quantity Required
                  </label>
                  <input
                    type="text"
                    value={quantityNeeded}
                    onChange={(e) => setQuantityNeeded(e.target.value)}
                    placeholder="e.g. 5 bags of seed / 200 kg produce"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5 text-amber-300" />
                    <span>{t('btnSendInquiry')}</span>
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
