import { ServiceItem, BlogPost, ContactInfo } from '@/client/types';

export const defaultContact: ContactInfo = {
  companyName: 'Malik Scrap Metal Buyers',
  tagline: 'We Buy Industrial & Commercial Scrap Metal at Top Market Rates',
  phone: '+971 50 436 3615',
  dispatchPhone: '+971 50 436 3615',
  email: 'malikscrapdealer11@gmail.com',
  secondaryEmail: 'purchase@malikscrap.com',
  address: 'Dubai Industrial City, Phase 2, Dubai, UAE',
  city: 'Dubai',
  state: 'Dubai',
  zip: '500001',
  country: 'United Arab Emirates',
  hoursWeekday: '24/7 Scrap Receiving & Site Pickup',
  hoursSaturday: 'Saturday: 24/7 Weighbridge Open',
  hoursSunday: 'Sunday: 24/7 On-Call Dispatch',
  googleMapsUrl: 'https://maps.app.goo.gl/4jdRcf7gbDx4L1Z59',
  emergencyHotline: '24/7 Scrap Collection & Container Placement Available',
  social: {
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
    youtube: 'https://youtube.com',
  },
};

export const fallbackServices: ServiceItem[] = [
  {
    id: 'srv-1',
    title: 'We Buy Copper Wire, Cables & Millberry',
    category: 'Non-Ferrous Scrap',
    shortDesc: 'Top-market rates paid for Bare Bright copper wire, Millberry copper, #1 & #2 copper tubing, armored cables, and transformer windings.',
    description: 'Sell your copper scrap to certified buyers with handheld XRF elemental spectrometer assay testing. We purchase Bare Bright, Millberry, insulated power cables, copper coils, radiators, and busbars. Guaranteed honest tare deductions and immediate cash or bank transfer.',
    icon: 'Zap',
    image: '/assets/images/service-copper-wire.jpg',
    badge: 'Highest Payout',
    highlight: 'Instant XRF assay test with immediate payment.',
  },
  {
    id: 'srv-2',
    title: 'We Buy Ferrous Metal & Structural Steel Scrap',
    category: 'Ferrous Scrap',
    shortDesc: 'Immediate purchase of heavy melting steel (HMS 1 & 2), structural I-beams, factory rebar offcuts, plate cuttings, cast iron, and machinery frames.',
    description: 'We purchase all volumes of ferrous metal scrap directly from fabrication workshops, machine shops, construction contractors, and demolition sites. Full certified weighbridge receipts with direct mill pricing and zero middleman deductions.',
    icon: 'Hammer',
    image: '/assets/images/service-ferrous-steel.jpg',
    badge: 'High Tonnage',
    highlight: 'Top cash & wire payout per metric ton with free collection.',
  },
  {
    id: 'srv-3',
    title: 'We Buy Commercial Chillers & HVAC Systems',
    category: 'HVAC & Machinery',
    shortDesc: 'Full buyout for commercial rooftop chillers, package units, compressor units, condenser coils, industrial air handlers, and ductwork.',
    description: 'Certified recovery and purchase of decommissioned HVAC equipment, cooling towers, and commercial compressors. Our dismantling crews handle crane rigging, Freon evacuation, and prompt removal with certified weighing and instant settlement.',
    icon: 'Wrench',
    image: '/assets/images/service-scrap-chillers.jpg',
    badge: 'HVAC Buyout',
    highlight: 'Safe gas recovery and certified scrap weighing on-site.',
  },
  {
    id: 'srv-4',
    title: 'We Buy Industrial Electrical Cables & Transformers',
    category: 'Electrical Scrap',
    shortDesc: 'Purchasing high-voltage armored cables, submarine cables, electrical switchgear cabinets, copper busbars, and distribution transformers.',
    description: 'We buy all gauges of industrial copper and aluminum cables. Whether on wooden reels, spools, or loose coils, we test metal recovery percentages and pay maximum scrap value per kilogram with prompt on-site loading.',
    icon: 'Cpu',
    image: '/assets/images/service-industrial-cables.jpg',
    badge: 'Certified Payout',
    highlight: 'Accurate cable recovery assay test with certified payout.',
  },
  {
    id: 'srv-5',
    title: 'We Buy Aluminum Extrusions, Sheets & Alloys',
    category: 'Alloy Scrap',
    shortDesc: 'Purchasing 6063 clean aluminum extrusion, alloy wheels, sheet offcuts, CNC turnings, and grades 304, 316, and 310 stainless steel.',
    description: 'Turn your production offcuts and manufacturing scrap into steady cash flow. We accept both clean solids and unsegregated machine turnings, offering customized pickup schedules for CNC machine shops and extrusion plants.',
    icon: 'Layers',
    image: '/assets/images/service-aluminum-recycling.jpg',
    badge: 'Daily Buying',
    highlight: 'Consistent high rates for industrial manufacturers.',
  },
  {
    id: 'srv-6',
    title: 'We Buy Brass Valves, Bronze & Plumbing Scrap',
    category: 'Brass & Bronze',
    shortDesc: 'Top prices for clean yellow brass, red brass valves, marine bronze propellers, plumbing fittings, radiator cores, and water meters.',
    description: 'We purchase commercial batches of brass solids, cuttings, and mixed plumbing scrap. Using advanced XRF analyzers, we accurately evaluate copper-zinc ratios to offer sellers the highest market return with zero hidden fees.',
    icon: 'Layers',
    image: '/assets/images/service-brass-valves.jpg',
    badge: 'Instant Cash',
    highlight: 'Accurate elemental grading for maximum brass value.',
  },
  {
    id: 'srv-7',
    title: 'We Buy Electric Motors, Alternators & Dynamos',
    category: 'Motors & Generators',
    shortDesc: 'Purchasing electric motors of all horsepowers, high-voltage alternators, starters, pump motors, and elevator hoist machinery.',
    description: 'Sell electric motors in any quantity or condition. Whether working, burnt out, or disassembled, we calculate generous copper recovery yields to guarantee maximum payout per ton or per unit.',
    icon: 'Cpu',
    image: '/assets/images/service-electric-motors.jpg',
    badge: 'Motor Buyout',
    highlight: 'Generous copper core valuation on all industrial motors.',
  },
  {
    id: 'srv-8',
    title: 'We Buy Industrial Lead-Acid & Telecom Batteries',
    category: 'Battery Recycling',
    shortDesc: 'Purchasing forklift traction batteries, telecom backup batteries, UPS gel cells, automotive lead batteries, and submarine cells.',
    description: 'Fully licensed and compliant industrial lead-acid battery recycling. We provide spill-proof collection bins, hazardous waste transport manifests, and top market payouts per kilogram with complete environmental documentation.',
    icon: 'Car',
    image: '/assets/images/service-lead-batteries.jpg',
    badge: 'EPA Licensed',
    highlight: 'Certified hazmat transport and instant battery payout.',
  },
  {
    id: 'srv-9',
    title: 'Plant Decommissioning & Demolition Scrap Purchase',
    category: 'Industrial Buyout',
    shortDesc: 'Complete scrap buyouts for retired manufacturing facilities, chillers, electrical switchgears, structural steel buildings, and boilers.',
    description: 'Our certified dismantling crews manage turnkey salvage and removal. We purchase all recovered scrap metal on-site, providing crane mobilization, torch cutting, and full site clearance with environmental documentation.',
    icon: 'Wrench',
    image: '/assets/images/service-machinery-demolition.jpg',
    badge: 'Turnkey Buyout',
    highlight: 'Complete plant clearance with advance scrap deposit.',
  },
  {
    id: 'srv-10',
    title: 'Free Roll-Off Scrap Bin Placement & Logistics',
    category: 'Logistics & Collection',
    shortDesc: 'We drop off 10, 20, 30, and 40-yard heavy-duty steel scrap containers at your workshop or job site free of charge. Fill the bin, and we buy the metal.',
    description: 'Streamline your facility scrap management. When your scrap bin is full, call our dispatch hotline—we swap the container within 24 hours, weigh your scrap on certified scales, and settle your payment immediately.',
    icon: 'Truck',
    image: '/assets/images/service-scrap-containers.jpg',
    badge: 'Free Delivery',
    highlight: 'Zero bin rental fees with scheduled or on-call collection.',
  },
  {
    id: 'srv-11',
    title: 'Certified Digital Weighbridge & Instant Payout',
    category: 'Weighbridge Service',
    shortDesc: '100-ton NTEP calibrated digital weighbridge with automated printed weight tickets and same-day payment via wire transfer or cash.',
    description: 'Drive directly to our centrally located Dubai weighbridge facility. Our certified electronic scales provide transparent tare and gross weights with zero wait times and immediate digital receipt issuance.',
    icon: 'Truck',
    image: '/assets/images/service-weighbridge-scale.jpg',
    badge: 'Certified Scale',
    highlight: 'Transparent certified tickets with immediate settlement.',
  },
];

export const fallbackBlogs: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'How Machine Shops Can Maximize Revenue Selling Scrap Metal',
    slug: 'maximize-revenue-selling-scrap-metal',
    excerpt: 'Learn practical segregation protocols for copper, aluminum, and stainless steel chips to avoid scrap buyer discounts.',
    content: `For CNC machine shops, fabrication workshops, and metal processing facilities, scrap metal represents far more than industrial waste—it is a critical revenue driver that directly impacts net profit margins.

1. SEGREGATE METALS AT THE MACHINE
Never allow high-grade 6061 or 6063 aluminum turnings to mix with carbon steel shavings or brass chips. Contaminated chip bins receive the lowest commodity valuation rate at the weighbridge. Label chip collection carts with color-coded tags and place dedicated bins right by each machine basin.

2. CENTRIFUGE AND DRAIN CUTTING FLUIDS
Scrap metal buyers deduct tare weight for excessive coolant and oil contamination. Installing a high-efficiency chip wringer or centrifuge not only recovers valuable cutting oil for reuse, but also yields clean, dry metal shavings that command top dollar per kilogram without tare disputes.

3. STORE SOLID OFFCUTS SEPARATELY FROM TURNINGS
Solid drop-ends, bar remnants, and punch press skeletons consistently fetch 15% to 30% higher prices than fine shavings because remelt furnaces lose less metal to slag oxidation. Keeping solids separated from chips is an effortless way to increase your scrap payout.

4. REQUEST ROLL-OFF SCRAP BIN LOGISTICS
Eliminate manual double-handling of heavy metal waste. Malik Scrap provides 10 to 40-yard roll-off bins with scheduled or on-call container swaps, complete with certified weighbridge documentation issued directly to your finance department.`,
    author: 'Marcus Vance, Senior Scrap Appraiser',
    date: 'November 2, 2024',
    commentsCount: 18,
    image: '/assets/images/blog-scrap-pricing-guide.jpg',
    category: 'Selling Guide',
  },
  {
    id: 'blog-2',
    title: 'Complete Guide to Stripping Copper Wire for Bare Bright Cash Rates',
    slug: 'how-to-strip-copper-wire-bare-bright',
    excerpt: 'Discover why Bare Bright copper commands top pricing and learn how proper wire stripping increases your earnings.',
    content: `Bare Bright copper wire—clean, unalloyed, uncoated 12-gauge or thicker electrical wire—commands the single highest price per kilogram at scrap yards globally.

WHY BARE BRIGHT COMMANDS A PREMIUM
Secondary copper smelters require minimal flux and refining when melting clean Bare Bright copper. Wire that is burned, tinned, oxidized, or contaminated with plastic residues must undergo extensive electrolytic refining, which results in substantial price deductions.

WHEN IS STRIPPING WIRE WORTH YOUR LABOR?
- Heavy Industrial Cables (#1 AWG, 4/0, 500 MCM, and armored power feeders) feature high copper-to-insulation ratios (typically 75% to 85% copper by weight). Stripping these thick cables with a motorized rotary wire stripper will multiply your profit margin substantially.
- Thin Communication Wire (CAT5/6, telephone cords, automotive wiring harnesses) contains fine hair-like strands with only 30% to 45% copper recovery. Stripping these manually wastes hours of labor; sell them as insulated copper wire directly to Malik Scrap.

SAFETY FIRST
Never burn insulation off copper wire. Open burning is strictly illegal under UAE environmental regulations, causes severe toxic emissions, and ruins the metal surface, turning top-grade copper into heavily discounted #2 burnt copper.`,
    author: 'Elena Rostova, Chief Metal Buyer',
    date: 'October 25, 2024',
    commentsCount: 29,
    image: '/assets/images/blog-how-to-strip-copper.jpg',
    category: 'Copper Processing',
  },
  {
    id: 'blog-3',
    title: 'Industrial Scrap Waste Management: Compliance & Environmental Guidelines in UAE',
    slug: 'industrial-scrap-waste-compliance-uae',
    excerpt: 'Stay compliant with Dubai Municipality and federal EPA waste regulations while generating maximum scrap asset recovery.',
    content: `Operating an industrial facility in Dubai, Abu Dhabi, or Sharjah involves strict adherence to environmental regulations governing industrial waste, metal recycling, and hazardous materials.

REGULATORY REQUIREMENTS
- Commercial sellers must transact through licensed scrap metal merchants possessing legitimate economic licenses from the Department of Economy and Tourism (DET).
- Environmental Protection and Waste Management divisions mandate that electronic scrap, hazardous batteries, and chemical containers be transported using certified hazardous waste manifests.

TRANSPARENCY AND CHAIN OF CUSTODY
Malik Scrap provides certified electronic weight tickets, environmental disposal certificates, and closed-loop material recycling documentation. When audits occur, your facility has complete paper trails verifying zero landfill contamination and 100% municipal compliance.`,
    author: 'Tariq Al-Hashemi, Compliance Officer',
    date: 'October 14, 2024',
    commentsCount: 14,
    image: '/assets/images/blog-industrial-waste-management.jpg',
    category: 'Compliance & EPA',
  },
  {
    id: 'blog-4',
    title: 'Demolition Scrap Recovery: On-Site Safety, Sorting & High-Tonnage Buyouts',
    slug: 'demolition-scrap-recovery-safety-sorting',
    excerpt: 'From structural I-beams to rebar bundles: how general contractors prepare demolition steel for maximum project payout.',
    content: `Demolition and building deconstruction projects generate enormous quantities of heavy structural steel (HMS 1 & 2), reinforcing rebar, copper piping, chiller systems, and electrical switchgear.

ORGANIZING YOUR DEMOLITION SALVAGE
1. Pre-Demolition Strip-Out: Salvage high-value non-ferrous metals (copper pipes, brass fixtures, transformers, electric cabling) before heavy hydraulic excavators take down building walls.
2. Hydraulic Shearing & Magnetic Separation: Shearing structural steel into manageable 3 to 5-foot lengths on-site increases truck load density, drastically reducing haulage costs.
3. Mobile Crane Dispatch: Malik Scrap provides heavy cranes, flatbeds, and heavy-haul trailers to load multi-ton assemblies directly from demolition sites.`,
    author: 'David Chen, Yard Operations Director',
    date: 'September 28, 2024',
    commentsCount: 31,
    image: '/assets/images/blog-demolition-scrap-recovery.jpg',
    category: 'Demolition Salvage',
  },
  {
    id: 'blog-5',
    title: 'Ferrous vs. Non-Ferrous Scrap: Identification, Magnet Tests & Market Pricing',
    slug: 'ferrous-vs-non-ferrous-scrap-identification',
    excerpt: 'The fundamental guide to separating magnetic iron and steel from high-value non-ferrous metals like copper, brass, and aluminum.',
    content: `The single most important tool in the scrap metal industry costs less than five dollars: a strong handheld magnet.

THE MAGNET RULE
- FERROUS METALS (Iron, carbon steel, cast iron, galvanized sheet) are magnetic. They adhere firmly to your magnet. Because iron is abundant, ferrous scrap is purchased and quoted in metric tons.
- NON-FERROUS METALS (Copper, brass, aluminum, bronze, stainless steel, lead, zinc) do NOT attract magnets (except 400-series stainless). These metals possess higher corrosion resistance and electrical conductivity, commanding premium prices quoted per kilogram.

AVOID ACCIDENTAL DOWNGRADES
Even a single iron bolt left threaded into a 50 kg bronze impeller can cause an entire batch to be downgraded or subject to labor deductions. Always perform a magnet sweep before bringing materials to our certified scales.`,
    author: 'Marcus Vance, Senior Scrap Appraiser',
    date: 'September 15, 2024',
    commentsCount: 22,
    image: '/assets/images/blog-ferrous-vs-nonferrous.jpg',
    category: 'Grading Guide',
  },
  {
    id: 'blog-6',
    title: 'Catalytic Converter Scrap: Precious Metals, Platinum Recovery & Grading',
    slug: 'catalytic-converter-scrap-grading-precious-metals',
    excerpt: 'Understanding the value of automotive ceramic monoliths containing platinum, palladium, and rhodium.',
    content: `Automotive catalytic converters are among the highest-value scrap items per unit weight because their internal honeycomb monolith is wash-coated with rare precious metals: Platinum (Pt), Palladium (Pd), and Rhodium (Rh).

CATALOG SERIAL NUMBER IDENTIFICATION
Converter prices vary dramatically depending on vehicle engine size and manufacturer. A European diesel catalytic converter often contains substantial platinum loadings, whereas gasoline hybrid converters carry high palladium concentrations.

NEVER EMPTY THE HONEYCOMB
Never hollow out or crush the internal ceramic honeycomb before selling. Scrap buyers grade converters by shell integrity and original manufacturer stamp codes. Contact Malik Scrap for bulk fleet and automotive workshop buyout contracts.`,
    author: 'Elena Rostova, Chief Metal Buyer',
    date: 'September 02, 2024',
    commentsCount: 45,
    image: '/assets/images/blog-catalytic-converters.jpg',
    category: 'Precious Metals',
  },
  {
    id: 'blog-7',
    title: 'Aluminum Extrusion Scrap Grades: 6063 vs. 6061 Profiles Explained',
    slug: 'aluminum-extrusion-scrap-6063-vs-6061',
    excerpt: 'Why clean architectural extrusions command higher prices than structural aluminum alloys and how to segregate them.',
    content: `Aluminum is infinitely recyclable with zero loss of atomic properties. However, smelters categorize extrusion scrap into distinct grades based on alloy chemistry.

6063 ARCHITECTURAL EXTRUSION
Used primarily in architectural window profiles, curtain walls, and door frames. Clean, unpainted, anodized 6063 extrusion commands the highest scrap pricing because it contains minimal iron and manganese, allowing remelters to cast fresh billets with very low energy consumption.

6061 STRUCTURAL EXTRUSION
Contains higher amounts of magnesium and silicon for increased mechanical strength, commonly found in structural framing, bridge railings, and truck trailer chassis.

SEGREGATION TIPS FOR WORKSHOPS
Keep 6063 and 6061 extrusions segregated in separate bins. Mixing 6061 into a 6063 load results in the entire batch being purchased at the lower 6061 alloy rate.`,
    author: 'David Chen, Yard Operations Director',
    date: 'August 19, 2024',
    commentsCount: 16,
    image: '/assets/images/blog-aluminum-extrusion.jpg',
    category: 'Aluminum Guide',
  },
  {
    id: 'blog-8',
    title: 'Electric Motor Scrap Valuation: Calculating Copper Recovery Percentage',
    slug: 'electric-motor-scrap-copper-recovery-percentage',
    excerpt: 'A practical breakdown of copper windings versus iron casing weights to calculate true motor scrap value.',
    content: `Electric motors—from small fractional-horsepower pump motors to heavy 500 HP industrial compressor motors—contain high-value copper magnet wire surrounded by heavy cast iron or laminated electrical steel stators.

AVERAGE COPPER RECOVERY
- Small fractional HP motors (0.25 to 2 HP): 9% to 12% copper by weight.
- Medium industrial motors (5 to 50 HP): 10% to 15% copper by weight.
- Large industrial generators and slip-ring motors: 15% to 20%+ copper by weight.

PUMP AND GEARBOX CASINGS
Always detach cast iron pump volutes, gearbox housings, and aluminum fan covers if feasible. Excessive foreign steel attachments dilute the motor copper percentage and reduce the overall rate per kilogram.`,
    author: 'Marcus Vance, Senior Scrap Appraiser',
    date: 'August 04, 2024',
    commentsCount: 37,
    image: '/assets/images/blog-electric-motors-scrap.jpg',
    category: 'Motors & Copper',
  },
];

