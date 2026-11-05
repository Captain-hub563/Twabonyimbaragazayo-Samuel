import React, { useState } from 'react';
import { SectionId, FarmingGuideItem } from '../types';
import { FARMING_GUIDES } from '../data/mockData';
import { useLanguage } from '../i18n/LanguageContext';
import {
  BookOpen,
  Search,
  Calendar,
  Layers,
  Bug,
  Archive,
  Award,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Info,
  ArrowRight
} from 'lucide-react';

interface FarmingGuideSectionProps {
  onNavigate: (section: SectionId, filter?: string) => void;
}

export const FarmingGuideSection: React.FC<FarmingGuideSectionProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string>(FARMING_GUIDES[0].id);

  const categories = [
    'All',
    'Seasons & Calendar',
    'Soil Conservation',
    'Pest & Disease',
    'Post-Harvest',
    'High-Value Crops'
  ];

  const filteredGuides = FARMING_GUIDES.filter((guide) => {
    const matchesCategory =
      selectedCategory === 'All' || guide.category === selectedCategory;
    const matchesSearch =
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.content.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? '' : id);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Header Banner */}
      <div className="bg-emerald-900 text-white rounded-3xl p-6 sm:p-10 border border-emerald-800 shadow-md space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800 text-amber-300 text-xs font-semibold tracking-wide">
          <BookOpen className="w-4 h-4 text-amber-300" />
          <span>{t('navGuide')}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          {t('guideTitle')}
        </h1>
        <p className="text-sm sm:text-base text-emerald-100 max-w-3xl leading-relaxed">
          {t('guideSubtitle')}
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
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

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides by keyword..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
            />
          </div>

        </div>
      </div>

      {/* Guides List */}
      <div className="space-y-4">
        {filteredGuides.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
            No farming guides match your search. Try another category or keyword.
          </div>
        ) : (
          filteredGuides.map((guide) => {
            const isExpanded = expandedId === guide.id;
            return (
              <div
                key={guide.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all duration-200"
              >
                {/* Header Row */}
                <div
                  onClick={() => toggleExpand(guide.id)}
                  className="p-5 sm:p-6 cursor-pointer flex items-start justify-between gap-4 hover:bg-slate-50/70 transition-colors"
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-100">
                        {guide.category}
                      </span>
                      {guide.season && (
                        <span className="text-slate-500 text-[11px] font-medium">
                          {guide.season}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      {guide.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                      {guide.summary}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 shrink-0 mt-1"
                    aria-label="Toggle guide details"
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Expanded Detailed Content */}
                {isExpanded && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 space-y-5 animate-in fade-in duration-200">
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                        Core Principles & Methods
                      </h4>
                      <div className="space-y-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                        {guide.content.map((paragraph, idx) => (
                          <p key={idx} className="bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>

                    {/* Key Recommendations / Field Rules */}
                    <div className="bg-emerald-50/70 rounded-2xl p-4 sm:p-5 border border-emerald-100 space-y-2.5">
                      <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                        <span>Actionable Field Checklist</span>
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {guide.keyTips.map((tip, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-1.5 shrink-0" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Relevant Tool Referral */}
                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      {guide.category === 'Soil Conservation' && (
                        <button
                          onClick={() => onNavigate('fertilizer-advisor')}
                          className="px-3.5 py-2 rounded-xl bg-emerald-800 text-white font-semibold text-xs shadow-xs hover:bg-emerald-900 transition-colors"
                        >
                          {t('btnCalculateNutrients')}
                        </button>
                      )}
                      {guide.category === 'Pest & Disease' && (
                        <button
                          onClick={() => onNavigate('plant-doctor')}
                          className="px-3.5 py-2 rounded-xl bg-emerald-800 text-white font-semibold text-xs shadow-xs hover:bg-emerald-900 transition-colors"
                        >
                          {t('btnDiagnoseCrop')}
                        </button>
                      )}
                      {guide.category === 'High-Value Crops' && (
                        <button
                          onClick={() => onNavigate('services', 'Farmer Cooperative')}
                          className="px-3.5 py-2 rounded-xl bg-emerald-800 text-white font-semibold text-xs shadow-xs hover:bg-emerald-900 transition-colors"
                        >
                          {t('btnFindExperts')}
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Callout: Farmer Field Schools in Rwanda */}
      <div className="bg-gradient-to-r from-emerald-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 border border-emerald-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
            {t('ffsCalloutTitle')}
          </span>
          <h3 className="text-xl font-extrabold">
            {t('ffsCalloutTitle')}
          </h3>
          <p className="text-xs sm:text-sm text-emerald-200 max-w-2xl leading-relaxed">
            {t('ffsCalloutDesc')}
          </p>
        </div>

        <button
          onClick={() => onNavigate('services', 'Agricultural Extension Officer')}
          className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md transition-colors shrink-0"
        >
          {t('btnFindExperts')}
        </button>
      </div>

    </div>
  );
};
