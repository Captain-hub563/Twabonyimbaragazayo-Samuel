import {
  RwandanDistrict,
  CropDisease,
  FarmingGuideItem,
  MarketCommodity,
  AgriculturalService,
  IrrigationZone
} from '../types';

export const RWANDAN_DISTRICTS: RwandanDistrict[] = [
  // Northern Province (Amajyaruguru)
  { id: 'musanze', name: 'Musanze', province: 'Northern', keyCrops: ['Irish Potato (Kinigi)', 'Maize', 'Vegetables', 'Pyrethrum'], soilCharacteristics: 'Rich volcanic soil (Andosols), high fertility, slightly acidic to neutral.' },
  { id: 'burera', name: 'Burera', province: 'Northern', keyCrops: ['Irish Potato', 'Wheat', 'Beans', 'Maize'], soilCharacteristics: 'Volcanic and humic soils, hilly terrain requiring terracing.' },
  { id: 'gicumbi', name: 'Gicumbi', province: 'Northern', keyCrops: ['Tea', 'Climbing Beans', 'Wheat', 'Irish Potato'], soilCharacteristics: 'Highland acidic soils (Ferralsols/Acrisols), responds well to agricultural lime.' },
  { id: 'rulindo', name: 'Rulindo', province: 'Northern', keyCrops: ['Arabica Coffee', 'Maize', 'Beans', 'Vegetables'], soilCharacteristics: 'Moderately acidic clay loam on steep slopes.' },
  { id: 'gakenke', name: 'Gakenke', province: 'Northern', keyCrops: ['Arabica Coffee', 'Cassava', 'Beans', 'Pineapple'], soilCharacteristics: 'Steep hill slopes, fertile valleys, needs erosion prevention.' },

  // Southern Province (Amajyepfo)
  { id: 'huye', name: 'Huye', province: 'Southern', keyCrops: ['Coffee (Maraba)', 'Cassava', 'Beans', 'Sorghum'], soilCharacteristics: 'Weathered granitic soils (Ferralsols), acidic pH 4.8 - 5.4, benefits from travertine lime.' },
  { id: 'nyanza', name: 'Nyanza', province: 'Southern', keyCrops: ['Maize', 'Cassava', 'Beans', 'Dairy Pastures'], soilCharacteristics: 'Clayey soils on rolling hills with fertile marshlands.' },
  { id: 'gisagara', name: 'Gisagara', province: 'Southern', keyCrops: ['Rice (Marshlands)', 'Cassava', 'Banana', 'Soybean'], soilCharacteristics: 'Deep alluvial wetland soils alongside acidic hillside loams.' },
  { id: 'muhanga', name: 'Muhanga', province: 'Southern', keyCrops: ['Coffee', 'Beans', 'Sweet Potato', 'Vegetables'], soilCharacteristics: 'Variable slope soils, prone to runoff without contour bunds.' },
  { id: 'nyamagabe', name: 'Nyamagabe', province: 'Southern', keyCrops: ['Tea', 'Wheat', 'Irish Potato', 'Highland Beans'], soilCharacteristics: 'Strongly acidic high-altitude soils near Nyungwe forest.' },

  // Eastern Province (Iburasirazuba)
  { id: 'nyagatare', name: 'Nyagatare', province: 'Eastern', keyCrops: ['Maize', 'Beans', 'Dairy Fodder', 'Sorghum', 'Watermelon'], soilCharacteristics: 'Savanna plains, sandy clay loam, semi-arid, ideal for drip irrigation.' },
  { id: 'gatsibo', name: 'Gatsibo', province: 'Eastern', keyCrops: ['Maize', 'Beans', 'Banana', 'Vegetables'], soilCharacteristics: 'Undulating gentle slopes, fertile when irrigated.' },
  { id: 'bugesera', name: 'Bugesera', province: 'Eastern', keyCrops: ['Cassava', 'Maize', 'Beans', 'Horticulture (Lake zones)'], soilCharacteristics: 'Sandy loams, lower rainfall zone, responds strongly to rainwater harvesting.' },
  { id: 'rwamagana', name: 'Rwamagana', province: 'Eastern', keyCrops: ['Bananas', 'Maize', 'Coffee', 'Rice'], soilCharacteristics: 'Fertile red clay loam, extensive lake basin marshlands.' },
  { id: 'ngoma', name: 'Ngoma', province: 'Eastern', keyCrops: ['Banana', 'Pineapple', 'Rice', 'Maize'], soilCharacteristics: 'Deep fertile volcanic ash deposits mixed with alluvial soils.' },
  { id: 'kirehe', name: 'Kirehe', province: 'Eastern', keyCrops: ['Maize', 'Soybean', 'Horticulture', 'Banana'], soilCharacteristics: 'Fertile border plains, suitable for commercial solar irrigation.' },

  // Western Province (Iburengerazuba)
  { id: 'rubavu', name: 'Rubavu', province: 'Western', keyCrops: ['Vegetables (Carrots, Cabbage)', 'Irish Potato', 'Coffee', 'Banana'], soilCharacteristics: 'Volcanic and alluvial lake shore soils, very high natural fertility.' },
  { id: 'nyabihu', name: 'Nyabihu', province: 'Western', keyCrops: ['Irish Potato', 'Pyrethrum', 'Tea', 'Highland Vegetables'], soilCharacteristics: 'Deep rich volcanic soils, cold highland climate.' },
  { id: 'karongi', name: 'Karongi', province: 'Western', keyCrops: ['Coffee', 'Tea', 'Beans', 'Banana'], soilCharacteristics: 'Steep lakeside slopes with high erosion potential, terraced.' },
  { id: 'rusizi', name: 'Rusizi', province: 'Western', keyCrops: ['Rice (Bugarama valley)', 'Coffee', 'Tea', 'Oil Palm'], soilCharacteristics: 'Tropical lowland fertile valley soils with high heat units.' },

  // Kigali City
  { id: 'gasabo', name: 'Gasabo', province: 'Kigali City', keyCrops: ['Urban Horticulture', 'Vegetables', 'Poultry Fodder'], soilCharacteristics: 'Mixed peri-urban hillside soils with valley marshland plots.' },
  { id: 'kicukiro', name: 'Kicukiro', province: 'Kigali City', keyCrops: ['Greenhouse Vegetables', 'Mushrooms', 'Herbs'], soilCharacteristics: 'Commercial nursery soils and controlled agriculture.' }
];

export const CROP_DISEASES: CropDisease[] = [
  {
    id: 'potato-late-blight',
    cropAffected: 'Irish Potato (Ibirayi)',
    commonName: 'Potato Late Blight',
    localKinyarwandaName: 'Imvura / Kubora kw’ibirayi',
    pathogenType: 'Fungus',
    urgency: 'High',
    symptoms: [
      'Water-soaked dark lesions on leaf tips and margins',
      'White fluffy mildew growth on the underside of infected leaves in humid weather',
      'Brown, dry rot spreading rapidly across the stems',
      'Tuber skin develops purplish or dark discoloration with brown dry rot inside'
    ],
    preventiveMeasures: [
      'Plant certified disease-free seed tubers (e.g., Kinigi, Victoria or Cruza varieties)',
      'Hilling up properly to cover developing tubers with at least 10–15 cm of soil',
      'Avoid overhead watering during cool cloudy evenings',
      'Ensure wide row spacing (75 cm x 30 cm) for air circulation'
    ],
    treatment: [
      'Apply preventive copper-based fungicides (Mancozeb or Copper Oxychloride) before rainy peaks',
      'Destroy and burn infected crop residue away from fields',
      'Consult the Sector Agronome immediately if infection covers >5% of foliage'
    ]
  },
  {
    id: 'fall-armyworm',
    cropAffected: 'Maize (Ibigori)',
    commonName: 'Fall Armyworm',
    localKinyarwandaName: 'Nkongwa idasanzwe',
    pathogenType: 'Insect / Pest',
    urgency: 'High',
    symptoms: [
      'Pin-hole and window-pane feeding damage on young maize whorl leaves',
      'Large ragged holes in leaves as caterpillars grow',
      'Accumulation of moist sawdust-like larval droppings (frass) inside the central whorl',
      'Damaged tassel and ear silk, burrowing into the developing cobs'
    ],
    preventiveMeasures: [
      'Early planting at the start of Season A or Season B rains to escape peak moth flights',
      'Intercropping maize with climbing beans or Desmodium (Push-Pull method)',
      'Regular scouting of fields twice a week during early vegetative growth'
    ],
    treatment: [
      'Apply bio-pesticides or approved insecticides (e.g., Spinetoram or Emamectin Benzoate) directly into the whorl in early morning or late afternoon',
      'Handpick egg masses and larvae in smaller plots',
      'Report large outbreaks to the RAB emergency plant health line'
    ]
  },
  {
    id: 'banana-bacterial-wilt',
    cropAffected: 'Banana (Igitoki)',
    commonName: 'Banana Bacterial Wilt (BXW)',
    localKinyarwandaName: 'Kirabiranya y’insina',
    pathogenType: 'Bacterium',
    urgency: 'High',
    symptoms: [
      'Yellowing and gradual wilting of leaves starting from the central heart leaf',
      'Premature uneven ripening and rotting of fruit fingers with brown stains',
      'Yellow or brown bacterial ooze emerging when pseudostem is cut',
      'Male bud shrivels, turns black, and dies back prematurely'
    ],
    preventiveMeasures: [
      'Debudding: remove the male bud (umutwe w’igitoki) using a forked stick right after the last hand forms',
      'Sterilize all cutting tools (machetes and pangas) using bleach solution or fire after pruning each plant',
      'Do not move suckers from wilt-affected areas'
    ],
    treatment: [
      'Single Diseased Stem Removal (SDSR): cut down affected stems at ground level immediately',
      'Bury or chop and let infected material dry; never transport infected stalks',
      'Strict quarantine of the planting block'
    ]
  },
  {
    id: 'cassava-mosaic-disease',
    cropAffected: 'Cassava (Imyumbati)',
    commonName: 'Cassava Mosaic Disease (CMD)',
    localKinyarwandaName: 'Ububembe bw’imyumbati',
    pathogenType: 'Virus',
    urgency: 'Medium',
    symptoms: [
      'Mottled chlorotic pattern of green and bright yellow patches on leaves',
      'Leaf distortion, twisting, crinkling, and severe reduction in leaflet size',
      'Stunted stem growth and severely reduced root tuber development'
    ],
    preventiveMeasures: [
      'Plant clean certified cuttings of CMD-resistant varieties released by RAB (e.g., Gahene, Mavuno, Ndamirabana)',
      'Rogue (uproot and burn) symptomatic plants during the first 2 to 3 months of growth',
      'Control whitefly vectors that transmit the virus'
    ],
    treatment: [
      'No chemical cure exists for viral plant infections; immediate roguing is essential',
      'Ensure next season planting material comes from disease-free mother gardens'
    ]
  },
  {
    id: 'coffee-berry-disease',
    cropAffected: 'Arabica Coffee (Ikawa)',
    commonName: 'Coffee Berry Disease (CBD)',
    localKinyarwandaName: 'Kubora kw’ibitumbwe by’ikawa',
    pathogenType: 'Fungus',
    urgency: 'Medium',
    symptoms: [
      'Dark sunken necrotic spots on green expanding coffee cherries',
      'Berries turn black, dry up, and drop prematurely before maturity',
      'Only empty mummified husks remain on branches'
    ],
    preventiveMeasures: [
      'Regular pruning to open up the coffee bush canopy and improve sunlight penetration and air movement',
      'Maintain shade trees (Grevillea / Albizia) at optimal density',
      'Mulch soil to reduce soil-splash of fungal spores onto lower branches'
    ],
    treatment: [
      'Apply preventive copper-based spray regime during the cherry expansion period (usually Nov–Feb)',
      'Gather and destroy fallen infected berries from the ground under trees'
    ]
  },
  {
    id: 'bean-anthracnose',
    cropAffected: 'Climbing Beans (Ibihyimbo)',
    commonName: 'Bean Anthracnose',
    localKinyarwandaName: 'Uburwayi bw’ibizinga ku bihyimbo',
    pathogenType: 'Fungus',
    urgency: 'Medium',
    symptoms: [
      'Dark reddish-brown to black lesions along leaf veins on the underside of leaves',
      'Sunken circular spots with dark borders and pinkish gelatinous centers on bean pods',
      'Infected seeds show brownish to black discolored spots'
    ],
    preventiveMeasures: [
      'Use certified clean bean seed (e.g., RWR 2245, RWV 1129 varieties)',
      'Use tall bamboo or pennisetum stakes for climbing beans to prevent foliage touching wet soil',
      'Rotate crops for at least 2 seasons away from legumes'
    ],
    treatment: [
      'Avoid working in bean fields when plants are wet from rain or dew to prevent spreading spores',
      'Spray certified fungicide if pod infection starts early during pod-filling'
    ]
  }
];

export const FARMING_GUIDES: FarmingGuideItem[] = [
  {
    id: 'rwanda-seasons-guide',
    title: 'Understanding Agricultural Seasons in Rwanda (A, B, and C)',
    category: 'Seasons & Calendar',
    season: 'All Seasons',
    summary: 'Rwanda has three distinct planting seasons dictated by rainfall and agro-ecological zones. Knowing when to prepare, plant, weed, and harvest is key to maximizing yields.',
    content: [
      'Season A (Umuhindo): Starts in September and ends in January/February. It is the primary rainy season ideal for planting maize, climbing beans, soybeans, groundnuts, and cassava across the plateau and eastern plains.',
      'Season B (Itumba): Runs from February through June/July. The heavier rainfall makes this season ideal for Irish potatoes in the North/West, beans, sorghum, sweet potatoes, and horticultural crops.',
      'Season C (Impeshyi / Marshlands): Runs during the dry season from July to September. Farming is concentrated in developed marshlands (ibishanga) and irrigated river valleys, focusing on vegetables (cabbage, carrots, tomatoes, onions) and sweet potato vines.'
    ],
    keyTips: [
      'Always prepare land 3–4 weeks before expected rains so soil can aerate and incorporate organic manure.',
      'Use certified seeds rather than grain saved from consumption to ensure high germination rates.',
      'Consult the Rwanda Meteorology Agency (Meteo Rwanda) seasonal advisories before purchasing inputs.'
    ]
  },
  {
    id: 'terracing-erosion-guide',
    title: 'Radical & Progressive Terracing (Amaterasi) for Soil Conservation',
    category: 'Soil Conservation',
    season: 'Season A (Umuhindo)',
    summary: 'With Rwanda’s hilly terrain ("Land of a Thousand Hills"), soil erosion strips topsoil and vital nutrients. Proper terracing preserves land value and moisture.',
    content: [
      'Radical Terraces (Amaterasi y’indinganire): Essential on steep slopes (>16% slope). Involves cutting steps into hillsides and building flat benches with embankment risers planted with fodder grass (Pennisetum purpureum / elephant grass).',
      'Progressive Terraces (Amaterasi y’urugero): Established along contours on gentler slopes using grass strips, anti-erosion ditches (imikoki), and hedge rows that gradually form natural terraces over seasons.',
      'Soil amendments on new terraces: When subsoil is exposed during terrace cutting, generous application of agricultural lime (Travertine) and composted farmyard manure (20–30 tonnes/ha) is necessary to restore fertility.'
    ],
    keyTips: [
      'Plant deep-rooted grasses like Vetiver or Napier on terrace edges to firmly hold soil walls.',
      'Dig silt traps at ditch outlets to collect washed nutrient silt and return it to fields.',
      'Never leave bare soil uncovered; apply mulch or cover crops between main crop rows.'
    ]
  },
  {
    id: 'post-harvest-aflatoxin',
    title: 'Post-Harvest Handling & Preventing Aflatoxins in Maize and Beans',
    category: 'Post-Harvest',
    season: 'All Seasons',
    summary: 'Up to 30% of grain harvests can be lost or ruined by mold and weevils. Safe harvesting and hermetic storage safeguard your income and family health.',
    content: [
      'Field Drying: Allow maize cobs to mature and dry naturally on stalks before picking, but harvest promptly before heavy rains cause cob rot.',
      'Tarpaulin and Solar Drying: Never dry harvested grains directly on bare dirt or asphalt. Always spread grains on clean waterproof tarpaulins or elevated drying racks until moisture content drops below 13.5%.',
      'Moisture Testing: Test by biting a maize kernel or shaking in a clean jar with dry salt; well-dried grain makes a crisp cracking sound.',
      'Hermetic Storage: Use multi-layer hermetic bags (such as Purdue Improved Crop Storage - PICS bags). These seal out oxygen, suffocating weevils and stopping fungal aflatoxin growth without synthetic chemical powders.'
    ],
    keyTips: [
      'Sort out broken, discolored, or insect-damaged grains before bagging.',
      'Store sealed bags on wooden pallets at least 15 cm above concrete floors and 30 cm away from walls.',
      'Do not puncture hermetic bags with hooks or sharp objects.'
    ]
  },
  {
    id: 'arabica-coffee-excellence',
    title: 'Arabica Coffee Husbandry & Cherry Quality for Premium Prices',
    category: 'High-Value Crops',
    season: 'Season B (Itumba)',
    summary: 'Rwanda is renowned globally for specialty single-origin Arabica coffee (Bourbon variety). High cherry quality directly increases payments from washing stations.',
    content: [
      'Selective Hand-Picking: Pick only fully ripe, bright red cherries. Green, under-ripe, or over-ripe black cherries ruin the cup score of the entire batch.',
      'Same-Day Delivery: Transport harvested cherries to your local Coffee Washing Station (CWS) within 6 to 8 hours of picking to prevent spontaneous fermentation in transport bags.',
      'Canopy Pruning: Prune older stems (cyclical pruning) to maintain 3 to 4 bearing stems per bush. Remove suckers (ibisambo) monthly to direct nutrients to cherry clusters.'
    ],
    keyTips: [
      'Mulch coffee tree basins with dry grass or coffee pulp to retain moisture during dry spells.',
      'Apply NPK 17-17-17 or specialized coffee fertilizer formula as advised by your local washing station agronomist.',
      'Place shade trees (e.g., Ficus or Grevillea) to moderate canopy temperatures on hot afternoons.'
    ]
  }
];

export const MARKET_COMMODITIES: MarketCommodity[] = [
  // Certified Seeds (Verified Suppliers)
  {
    id: 'seed-kinigi-potato',
    name: 'Certified Seed Potato - Kinigi Variety',
    variety: 'Kinigi (RAB Certified Generation 2)',
    category: 'Certified Seeds',
    priceRwf: 850,
    unit: 'per kg',
    marketLocation: 'Musanze Seed Depot & Northern Agri-hubs',
    supplierOrBuyer: 'Musanze Seed Growers Cooperative (SPF-Ikigega)',
    phone: '+250 788 412 901',
    certificationStatus: 'RAB Quality Declared Seed (QDS)',
    inStock: true,
    isVerifiedSupplier: true,
    isSampleListing: false
  },
  {
    id: 'seed-climbing-beans',
    name: 'Certified Climbing Bean Seed - RWR 2245',
    variety: 'RWR 2245 (Iron & Zinc Bio-fortified)',
    category: 'Certified Seeds',
    priceRwf: 1400,
    unit: 'per kg',
    marketLocation: 'Huye, Gicumbi & nationwide agro-dealers',
    supplierOrBuyer: 'Rwanda Seed Company (Seed Co Rwanda)',
    phone: '+250 788 335 110',
    certificationStatus: 'RAB Certified Seed Lot #2026-A',
    inStock: true,
    isVerifiedSupplier: true,
    isSampleListing: false
  },
  {
    id: 'seed-hybrid-maize',
    name: 'Hybrid Maize Seed - SC 403',
    variety: 'Early maturing, drought tolerant',
    category: 'Certified Seeds',
    priceRwf: 2200,
    unit: 'per 2kg pack',
    marketLocation: 'Nyagatare, Bugesera & Eastern Hubs',
    supplierOrBuyer: 'Agri-Inputs Distribution Network Rwanda',
    phone: '+250 788 560 221',
    certificationStatus: 'Certified Hybrid F1',
    inStock: true,
    isVerifiedSupplier: true,
    isSampleListing: false
  },

  // Fertilizers & Soil amendments (Verified CIP Distributers)
  {
    id: 'fert-npk',
    name: 'NPK 17-17-17 Granular Fertilizer',
    variety: 'Balanced Basal Fertilizer',
    category: 'Fertilizers',
    priceRwf: 42000,
    unit: 'per 50kg bag (Subsidized CIP Price)',
    marketLocation: 'All District Subsidized Agro-Dealers',
    supplierOrBuyer: 'National Crop Intensification Programme (CIP)',
    phone: '+250 788 120 440',
    certificationStatus: 'MINAGRI / RAB Approved Input',
    inStock: true,
    isVerifiedSupplier: true,
    isSampleListing: false
  },
  {
    id: 'fert-urea',
    name: 'Urea Fertilizer (46% Nitrogen)',
    variety: 'Vegetative Top-Dressing',
    category: 'Fertilizers',
    priceRwf: 38500,
    unit: 'per 50kg bag',
    marketLocation: 'All Registered District Agro-Dealers',
    supplierOrBuyer: 'One Acre Fund (Tubura) & CIP Partners',
    phone: '+250 788 789 002',
    certificationStatus: 'RAB Approved',
    inStock: true,
    isVerifiedSupplier: true,
    isSampleListing: false
  },
  {
    id: 'fert-lime',
    name: 'Agricultural Lime (Travertine Powder)',
    variety: 'Soil Acidity Corrector (Calcium Carbonate)',
    category: 'Fertilizers',
    priceRwf: 9500,
    unit: 'per 50kg bag',
    marketLocation: 'Ruhengeri Travertine Mine & Southern Depots (Huye/Nyamagabe)',
    supplierOrBuyer: 'Rwanda Mining & Agricultural Lime Enterprise',
    phone: '+250 788 644 190',
    certificationStatus: 'Certified Soil Conditioner',
    inStock: true,
    isVerifiedSupplier: true,
    isSampleListing: false
  },

  // Equipment (Verified Dealers)
  {
    id: 'equip-solar-pump',
    name: 'Smallholder Solar Submersible Water Pump Kit',
    variety: 'DC 24V, 300W Solar Panel + 50m Drip Tape',
    category: 'Equipment',
    priceRwf: 285000,
    unit: 'Complete Kit with warranty',
    marketLocation: 'Kigali Showroom & delivery to all districts',
    supplierOrBuyer: 'Rwanda Green Solar Irrigation Systems',
    phone: '+250 788 234 567',
    certificationStatus: 'Eligible for SSIT Subsidy (50% grant)',
    inStock: true,
    isVerifiedSupplier: true,
    isSampleListing: false
  },
  {
    id: 'equip-pics-bags',
    name: 'PICS Hermetic Storage Bags (50kg)',
    variety: 'Chemical-free weevil-proof storage',
    category: 'Equipment',
    priceRwf: 1800,
    unit: 'per bag',
    marketLocation: 'All agro-dealer shops in Rwanda',
    supplierOrBuyer: 'PICS Rwanda Distribution Hub',
    phone: '+250 788 911 345',
    certificationStatus: 'Standard Certified',
    inStock: true,
    isVerifiedSupplier: true,
    isSampleListing: false
  },

  // Market Wholesale Produce (Cooperative Verified Aggregators)
  {
    id: 'market-irish-potato',
    name: 'Irish Potatoes (Kinigi Grade 1)',
    variety: 'Red skin, firm cooking',
    category: 'Market Produce',
    priceRwf: 450,
    unit: 'per kg (Wholesale)',
    marketLocation: 'Kimironko Market & Nyabugogo Hub, Kigali',
    supplierOrBuyer: 'Musanze Potato Farmers Federation',
    phone: '+250 788 650 330',
    certificationStatus: 'Grade 1 Sorting',
    inStock: true,
    isVerifiedSupplier: true,
    isSampleListing: false
  },
  {
    id: 'market-dry-beans',
    name: 'Red Climbing Beans (Ibihyimbo Bitukura)',
    variety: 'Clean sorted dry beans',
    category: 'Market Produce',
    priceRwf: 900,
    unit: 'per kg (Wholesale)',
    marketLocation: 'Huye Central Market',
    supplierOrBuyer: 'Amajyepfo Grain Wholesalers',
    phone: '+250 788 777 221',
    certificationStatus: 'Moisture < 13%',
    inStock: true,
    isVerifiedSupplier: true,
    isSampleListing: false
  },
  {
    id: 'market-yellow-maize',
    name: 'Dry Grain Maize (Ibigori Byumye)',
    variety: 'Machine sorted, aflatoxin-tested',
    category: 'Market Produce',
    priceRwf: 520,
    unit: 'per kg',
    marketLocation: 'Nyagatare Grain Aggregation Center',
    supplierOrBuyer: 'Eastern Maize Growers Union',
    phone: '+250 788 440 999',
    certificationStatus: 'Moisture 12.8%',
    inStock: true,
    isVerifiedSupplier: true,
    isSampleListing: false
  },

  // Sample Community Farmer Listings (Clearly flagged as Sample Community Listings)
  {
    id: 'sample-community-tomatoes',
    name: 'Organic Greenhouse Tomatoes (Sample Listing)',
    variety: 'Anna F1 Hybrid',
    category: 'Market Produce',
    priceRwf: 700,
    unit: 'per kg (Retail batch)',
    marketLocation: 'Rwamagana Local Market / Farmer Direct',
    supplierOrBuyer: 'Community Farmer Association (Sample)',
    phone: '+250 788 000 111',
    certificationStatus: 'Community Peer-Inspected',
    inStock: true,
    isVerifiedSupplier: false,
    isSampleListing: true
  },
  {
    id: 'sample-community-cassava-cuttings',
    name: 'Cassava Stem Cuttings (Sample Listing)',
    variety: 'Ndamirabana Tolerant Variety',
    category: 'Certified Seeds',
    priceRwf: 3500,
    unit: 'bundle of 50 stems',
    marketLocation: 'Bugesera Sector Agro-Group (Sample)',
    supplierOrBuyer: 'Bugesera Youth Agri-Club (Sample)',
    phone: '+250 788 000 222',
    certificationStatus: 'Local Clean Nursery',
    inStock: true,
    isVerifiedSupplier: false,
    isSampleListing: true
  }
];

export const AGRICULTURAL_SERVICES: AgriculturalService[] = [
  {
    id: 'srv-rab-musanze',
    name: 'RAB Northern Regional Station & Soil Testing Lab',
    type: 'Soil Testing Laboratory',
    province: 'Northern',
    district: 'Musanze',
    address: 'Musanze Sector, near Busogo Campus',
    phone: '+250 252 546 160',
    servicesOffered: [
      'Comprehensive Soil Chemical Analysis (pH, N, P, K, Organic Matter)',
      'Soil Acidity & Travertine Lime Recommendation',
      'Seed Pathology Testing & Certification',
      'Irish Potato Tissue Culture Seedlings'
    ],
    verified: true,
    contactPerson: 'Station Director / Senior Agronomist'
  },
  {
    id: 'srv-rab-rubona',
    name: 'RAB Southern Station & National Agronomy Laboratory (Rubona)',
    type: 'Soil Testing Laboratory',
    province: 'Southern',
    district: 'Huye',
    address: 'Rubona Research Center, Huye District',
    phone: '+250 252 530 200',
    servicesOffered: [
      'Standard Soil Nutrient Profiling',
      'Plant Tissue & Foliar Nutrient Diagnostic',
      'Coffee Bean Cup Quality & Soil Correlation',
      'Irrigation Water Quality Testing'
    ],
    verified: true,
    contactPerson: 'Lead Soil Scientist - Southern Zone'
  },
  {
    id: 'srv-rab-nyagatare',
    name: 'RAB Eastern Agro-Ecological Center',
    type: 'Agricultural Extension Officer',
    province: 'Eastern',
    district: 'Nyagatare',
    address: 'Nyagatare Town, Eastern Hub',
    phone: '+250 788 411 902',
    servicesOffered: [
      'Small-Scale Irrigation Technology (SSIT) Subsidy Guidance',
      'Pasture Management & Drought Resilience',
      'Fall Armyworm Emergency Field Inspection',
      'Certified Seed Distributor Accreditation'
    ],
    verified: true,
    contactPerson: 'District Agronomist Office'
  },
  {
    id: 'srv-coop-maraba',
    name: 'Abahuzamugambi Ba Kawa Ba Maraba (Maraba Coffee Cooperative)',
    type: 'Farmer Cooperative',
    province: 'Southern',
    district: 'Huye',
    address: 'Maraba Sector, Huye',
    phone: '+250 788 504 112',
    servicesOffered: [
      'Bulk Cherry Collection & Direct Export Price Payouts',
      'Subsidized Organic Fertilizer Distribution',
      'Farmer Training on Pruning and Cherry Harvesting',
      'Micro-credit and Input Loans for Members'
    ],
    verified: true,
    contactPerson: 'Cooperative President'
  },
  {
    id: 'srv-coop-ikigega',
    name: 'SPF-Ikigega (Irish Potato Seed Growers Federation)',
    type: 'Farmer Cooperative',
    province: 'Northern',
    district: 'Musanze',
    address: 'Musanze Commercial Avenue',
    phone: '+250 788 340 771',
    servicesOffered: [
      'Certified Pre-Basic and Basic Seed Potatoes',
      'Cold Storage Facilities for Seed Tubers',
      'Contract Farming and Guaranteed Bulk Buying',
      'Mechanized Planting Guidance'
    ],
    verified: true,
    contactPerson: 'Operations Manager'
  },
  {
    id: 'srv-ext-rubavu',
    name: 'Rubavu District Agricultural Extension Services',
    type: 'Agricultural Extension Officer',
    province: 'Western',
    district: 'Rubavu',
    address: 'Rubavu District Office, Gisenyi',
    phone: '+250 788 902 331',
    servicesOffered: [
      'Horticultural Export Sanitary Inspections',
      'Volcanic Terrace Erosion Control Technical Assistance',
      'Plant Health Clinic (Plantwise Certified Clinics)',
      'Farmer Field School (FFS) Facilitation'
    ],
    verified: true,
    contactPerson: 'District Agricultural Officer (DAO)'
  }
];

export const INITIAL_IRRIGATION_ZONES: IrrigationZone[] = [
  {
    id: 'zone-1',
    name: 'Terrace Block A (Vegetables & Tomatoes)',
    crop: 'Tomatoes & Cabbage',
    areaAres: 25,
    soilMoisturePercent: 34,
    targetMoisturePercent: 65,
    status: 'Requires Water',
    recommendedRuntimeMin: 45,
    hardwareStatus: 'Awaiting GSM/LoRa Gateway'
  },
  {
    id: 'zone-2',
    name: 'Hillside Block B (Irish Potatoes)',
    crop: 'Irish Potatoes (Kinigi)',
    areaAres: 40,
    soilMoisturePercent: 58,
    targetMoisturePercent: 60,
    status: 'Optimal',
    recommendedRuntimeMin: 0,
    hardwareStatus: 'Awaiting GSM/LoRa Gateway'
  },
  {
    id: 'zone-3',
    name: 'Marshland Plot C (Green Maize)',
    crop: 'Hybrid Maize',
    areaAres: 50,
    soilMoisturePercent: 72,
    targetMoisturePercent: 65,
    status: 'Wet',
    recommendedRuntimeMin: 0,
    hardwareStatus: 'Awaiting GSM/LoRa Gateway'
  }
];
