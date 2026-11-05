export type SectionId =
  | 'home'
  | 'soil-doctor'
  | 'plant-doctor'
  | 'fertilizer-advisor'
  | 'smart-irrigation'
  | 'farming-guide'
  | 'market'
  | 'services'
  | 'account';

export type SupportedLanguage = 'en' | 'rw' | 'fr';

export interface RwandanDistrict {
  id: string;
  name: string;
  province: 'Northern' | 'Southern' | 'Eastern' | 'Western' | 'Kigali City';
  keyCrops: string[];
  soilCharacteristics: string;
}

export interface SoilAnalysisRequest {
  id: string;
  farmerName: string;
  phone: string;
  province: string;
  district: string;
  sector: string;
  intendedCrop: string;
  landAreaAres: number;
  soilColor: string;
  soilTexture: string;
  topography: string;
  drainageSpeed: string;
  photoUrl: string | null;
  submittedAt: string;
  status: 'Sample Staged' | 'Ready for Lab / Vision Model';
  aiObservationResult?: AISoilAnalysisResult | null;
}

export interface AISoilAnalysisResult {
  isAIConnected: boolean;
  observations: string[];
  colorAndTextureNotes: string;
  potentialOrganicMatter: string;
  labTestingAdvisory: string;
  recommendations: string[];
  rawText?: string;
}

export interface PlantDiagnosisRequest {
  id: string;
  crop: string;
  variety?: string;
  affectedPart: 'Leaves' | 'Stem' | 'Fruit/Cob' | 'Roots' | 'Entire Plant';
  symptoms: string[];
  durationDays: number;
  recentWeather: string;
  photoUrl: string | null;
  district: string;
  submittedAt: string;
  aiDiagnosisResult?: AIPlantDiagnosisResult | null;
}

export interface AIPlantDiagnosisResult {
  isAIConnected: boolean;
  probableCondition: string;
  confidenceScore?: string;
  symptomConfirmation: string[];
  safePreventionSteps: string[];
  approvedTreatments: string[];
  rabHelplineReferral: string;
  rawText?: string;
}

export interface CropDisease {
  id: string;
  commonName: string;
  localKinyarwandaName: string;
  cropAffected: string;
  pathogenType: 'Fungus' | 'Bacterium' | 'Virus' | 'Insect / Pest';
  symptoms: string[];
  preventiveMeasures: string[];
  treatment: string[];
  urgency: 'High' | 'Medium' | 'Low';
}

export interface FertilizerRecommendation {
  crop: string;
  soilType: string;
  areaAres: number;
  npkKg: number;
  npkBags: number;
  dapKg: number;
  dapBags: number;
  ureaKg: number;
  ureaBags: number;
  limeKg: number;
  limeBags: number;
  organicManureTonnes: number;
  schedule: {
    stage: string;
    action: string;
    timing: string;
  }[];
}

export interface IrrigationZone {
  id: string;
  name: string;
  crop: string;
  areaAres: number;
  soilMoisturePercent: number;
  targetMoisturePercent: number;
  status: 'Optimal' | 'Requires Water' | 'Wet';
  recommendedRuntimeMin: number;
  hardwareStatus: 'Awaiting GSM/LoRa Gateway' | 'Manual Operation';
}

export interface FarmingGuideItem {
  id: string;
  title: string;
  category: 'Seasons & Calendar' | 'Soil Conservation' | 'Pest & Disease' | 'Post-Harvest' | 'High-Value Crops';
  summary: string;
  content: string[];
  keyTips: string[];
  season?: 'Season A (Umuhindo)' | 'Season B (Itumba)' | 'Season C (Impeshyi)' | 'All Seasons';
  featuredImage?: string;
}

export interface MarketCommodity {
  id: string;
  name: string;
  variety: string;
  category: 'Certified Seeds' | 'Fertilizers' | 'Equipment' | 'Market Produce';
  priceRwf: number;
  unit: string;
  marketLocation: string;
  supplierOrBuyer: string;
  phone: string;
  certificationStatus?: string;
  inStock: boolean;
  isVerifiedSupplier: boolean;
  isSampleListing?: boolean;
}

export interface AgriculturalService {
  id: string;
  name: string;
  type: 'Agricultural Extension Officer' | 'Soil Testing Laboratory' | 'Farmer Cooperative' | 'Veterinary & Inputs';
  province: string;
  district: string;
  address: string;
  phone: string;
  servicesOffered: string[];
  verified: boolean;
  contactPerson: string;
}

export interface FarmerUser {
  id: string;
  fullName: string;
  phoneNumber: string;
  nationalIdOrCard?: string;
  province: string;
  district: string;
  sector: string;
  farmSizeAres: number;
  primaryCrops: string[];
  preferredLanguage: SupportedLanguage;
  registeredAt: string;
  isAuthenticated: boolean;
}
