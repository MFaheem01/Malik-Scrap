import fs from 'fs';
import path from 'path';
import { getMongoDb } from './mongodb';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

/** Seed data — centered around purchasing all types of industrial & commercial scrap */
export const initialData = {
  contact: {
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
    hoursSaturday: '24/7 Weighbridge Open',
    hoursSunday: '24/7 On-Call Dispatch',
    googleMapsUrl: 'https://maps.app.goo.gl/4jdRcf7gbDx4L1Z59',
    emergencyHotline: '24/7 Scrap Collection & Container Placement Hotline',
    social: {
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      youtube: 'https://youtube.com',
    },
  },
  services: [
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
  ],
  blogs: [
    {
      id: 'blog-1',
      title: 'How Machine Shops Can Maximize Revenue Selling Scrap Metal',
      slug: 'maximize-revenue-selling-scrap-metal',
      excerpt: 'Learn practical segregation protocols for copper, aluminum, and stainless steel chips to avoid scrap buyer discounts.',
      content: 'For fabrication workshops and CNC machine plants, scrap metal is a significant revenue stream. Segregating high-grade solids from turnings and avoiding oil contamination can boost your scrap payouts by up to 35%. Learn our certified grading tips, dry chip storage solutions, and proper scrap container placement.',
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
      content: 'Bare Bright copper wire—clean, unalloyed, uncoated 12-gauge or thicker wire—fetches the highest price per kilogram at scrap yards. Stripping insulation before selling converts low-yield insulated cables into premium metal. We cover rotary wire strippers, stripping safety, and knowing when insulated wire is better sold unstripped.',
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
      content: 'Industrial facilities in UAE must maintain strict hazardous waste manifests when disposing of scrap metals, electronic waste, and industrial batteries. Partnering with a licensed scrap buyer like Malik Scrap ensures full traceability, certified weighbridge receipts, and environmentally sound closed-loop metal recycling.',
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
      content: 'Demolition projects yield hundreds of metric tons of structural steel, rebar, copper pipes, and heavy plant equipment. Implementing on-site scrap sorting and mobile shearing right on the job site eliminates double-handling costs and accelerates scrap container turnarounds.',
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
      content: 'The simple magnet test is every scrap seller’s best friend. Ferrous metals like carbon steel and cast iron stick to magnets and are sold by the metric ton, whereas non-ferrous metals like copper, brass, bronze, and aluminum do not stick and are priced by the kilogram. Learn how proper sorting prevents downgrades.',
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
      content: 'Scrap catalytic converters contain microscopic coatings of precious PGMs (Platinum Group Metals). Serial number identification and ceramic monolith integrity determine converter value. Discover how our digital catalog grading ensures fair and honest valuations for fleet managers and workshops.',
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
      content: 'In aluminum scrap trading, 6063 architectural extrusion is the gold standard for remelt efficiency due to low magnesium and silicon alloying. 6061 structural aluminum contains higher silicon and chromium. Keeping these profiles segregated ensures you receive premium extrusion rates without smelting penalties.',
      author: 'David Chen, Yard Operations Director',
      date: 'August 20, 2024',
      commentsCount: 19,
      image: '/assets/images/blog-aluminum-extrusion-scrap.jpg',
      category: 'Alloy Specs',
    },
    {
      id: 'blog-8',
      title: 'Safe Recycling & Depollution Protocols for Industrial Lead-Acid Batteries',
      slug: 'safe-recycling-depollution-lead-acid-batteries',
      excerpt: 'Proper storage, spill prevention, and certified recycling protocols for forklift, telecom, and automotive scrap batteries.',
      content: 'Lead-acid batteries contain hazardous sulfuric acid electrolyte and heavy lead plates. Proper palletizing with acid-resistant wrapping, storing in ventilated bunded areas, and selling only to licensed depollution recycling centers protects your company from hefty environmental fines and ensures 99% closed-loop lead recovery.',
      author: 'Tariq Al-Hashemi, Compliance Officer',
      date: 'August 08, 2024',
      commentsCount: 16,
      image: '/assets/images/blog-battery-depollution.jpg',
      category: 'Hazardous Waste',
    },
  ],
  prices: [
    { metal: 'Bare Bright Copper Wire', price: '34.50 AED', unit: 'per kg', trend: 'up', change: '+1.20' },
    { metal: '#1 Clean Copper Tubing', price: '32.00 AED', unit: 'per kg', trend: 'up', change: '+0.80' },
    { metal: 'Clean Yellow Brass Solids', price: '21.50 AED', unit: 'per kg', trend: 'up', change: '+0.50' },
    { metal: '6063 Clean Aluminum Extrusion', price: '8.20 AED', unit: 'per kg', trend: 'stable', change: '0.00' },
    { metal: '304 Stainless Steel Solids', price: '5.60 AED', unit: 'per kg', trend: 'up', change: '+0.30' },
    { metal: 'HMS 1 & 2 Heavy Melting Steel', price: '1,450 AED', unit: 'per ton', trend: 'up', change: '+45.00' },
    { metal: 'Industrial Lead Batteries', price: '4.90 AED', unit: 'per kg', trend: 'stable', change: '0.00' },
    { metal: 'Scrap Electric Motors', price: '6.50 AED', unit: 'per kg', trend: 'up', change: '+0.25' },
  ],
  consultations: [
    {
      id: 'lead-1',
      name: 'Ahmed Al-Mansoor',
      email: 'a.mansoor@emiratesfabrication.ae',
      phone: '+971 52 984 1120',
      subject: 'Selling 15 Tons of Structural Steel & Plate Offcuts',
      message: 'We have finished a warehouse project in Dubai Industrial City and have approx 15 metric tons of HMS steel and beam cutoffs for immediate sale. Need roll-off bin.',
      date: '2021-11-09 11:30',
      status: 'New',
    },
    {
      id: 'lead-2',
      name: 'Rajesh Sharma',
      email: 'r.sharma@alquozmachining.com',
      phone: '+971 55 319 8840',
      subject: 'Weekly Pickup for Brass & Aluminum Machine Turnings',
      message: 'CNC workshop generating around 2 tons of 6061 aluminum turnings and 800 kg of yellow brass chips per month. Looking for steady scrap buying contract.',
      date: '2024-11-08 16:15',
      status: 'In Progress',
    },
  ],
  admin: {
    username: 'admin',
    password: '$2a$10$K7L1RK549l2g60fK8u5i9u88KzC6h/i8Zp6V4C0eR4q3q4w3e2r1t',
    isHashed: true,
    lastLogin: '',
  },
};

export type DbData = typeof initialData;

/** Read fallback from disk or in-memory */
function readLocalDb(): DbData {
  try {
    if (!fs.existsSync(DB_FILE)) {
      try {
        if (!fs.existsSync(DATA_DIR)) {
          fs.mkdirSync(DATA_DIR, { recursive: true });
        }
        fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
      } catch {
        return JSON.parse(JSON.stringify(initialData));
      }
      return JSON.parse(JSON.stringify(initialData));
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return {
      ...initialData,
      ...parsed,
      contact: { ...initialData.contact, ...parsed.contact },
      admin: { ...initialData.admin, ...parsed.admin },
    };
  } catch (err) {
    console.warn('[DB] Using default initialData due to read error:', (err as Error).message);
    return JSON.parse(JSON.stringify(initialData));
  }
}

/** Write fallback to local file */
function writeLocalDb(data: DbData): boolean {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const tmp = DB_FILE + '.tmp';
    fs.writeFileSync(tmp, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tmp, DB_FILE);
    return true;
  } catch {
    return false;
  }
}

/**
 * Async read that queries MongoDB collections with auto-seeding.
 * Falls back to local JSON file if MongoDB is unavailable.
 */
export async function readDb(): Promise<DbData> {
  try {
    const mongo = await getMongoDb();
    if (!mongo) {
      return readLocalDb();
    }

    // Check if seeded
    const contactDoc = await mongo.collection('contact').findOne({ _id: 'main' as any });
    if (!contactDoc) {
      // Seed MongoDB with initialData
      console.log('[MongoDB] Empty database detected. Seeding collections...');
      await mongo.collection('contact').updateOne(
        { _id: 'main' as any },
        { $set: { ...initialData.contact, _id: 'main' as any } },
        { upsert: true }
      );
      await mongo.collection('admin').updateOne(
        { _id: 'main' as any },
        { $set: { ...initialData.admin, _id: 'main' as any } },
        { upsert: true }
      );
      if (initialData.services.length > 0) {
        await mongo.collection('services').deleteMany({});
        await mongo.collection('services').insertMany(initialData.services.map((s) => ({ ...s })));
      }
      if (initialData.blogs.length > 0) {
        await mongo.collection('blogs').deleteMany({});
        await mongo.collection('blogs').insertMany(initialData.blogs.map((b) => ({ ...b })));
      }
      if (initialData.prices.length > 0) {
        await mongo.collection('prices').deleteMany({});
        await mongo.collection('prices').insertMany(initialData.prices.map((p) => ({ ...p })));
      }
      if (initialData.consultations.length > 0) {
        await mongo.collection('consultations').deleteMany({});
        await mongo.collection('consultations').insertMany(initialData.consultations.map((c) => ({ ...c })));
      }
      console.log('[MongoDB] Seeding completed.');
    }

    // Retrieve from collections in parallel
    const [contact, adminDoc, services, blogs, prices, consultations] = await Promise.all([
      mongo.collection('contact').findOne({ _id: 'main' as any }),
      mongo.collection('admin').findOne({ _id: 'main' as any }),
      mongo.collection('services').find({}).toArray(),
      mongo.collection('blogs').find({}).toArray(),
      mongo.collection('prices').find({}).toArray(),
      mongo.collection('consultations').find({}).toArray(),
    ]);

    const result: DbData = {
      contact: contact ? { ...initialData.contact, ...(contact as any) } : initialData.contact,
      admin: adminDoc ? { ...initialData.admin, ...(adminDoc as any) } : initialData.admin,
      services: services.length > 0 ? (services.map(({ _id, ...rest }) => rest) as any) : initialData.services,
      blogs: blogs.length > 0 ? (blogs.map(({ _id, ...rest }) => rest) as any) : initialData.blogs,
      prices: prices.length > 0 ? (prices.map(({ _id, ...rest }) => rest) as any) : initialData.prices,
      consultations: consultations.length > 0 ? (consultations.map(({ _id, ...rest }) => rest) as any) : initialData.consultations,
    };

    // Keep local cache synced
    writeLocalDb(result);
    return result;
  } catch (err) {
    console.warn('[MongoDB] readDb query error, falling back to local file:', (err as Error).message);
    return readLocalDb();
  }
}

/**
 * Async write that updates MongoDB Atlas collections.
 * Also syncs local JSON file as backup.
 */
export async function writeDb(data: DbData): Promise<boolean> {
  // Sync locally first
  writeLocalDb(data);

  try {
    const mongo = await getMongoDb();
    if (!mongo) return true;

    await Promise.all([
      mongo.collection('contact').updateOne(
        { _id: 'main' as any },
        { $set: { ...data.contact, _id: 'main' as any } },
        { upsert: true }
      ),
      mongo.collection('admin').updateOne(
        { _id: 'main' as any },
        { $set: { ...data.admin, _id: 'main' as any } },
        { upsert: true }
      ),
      (async () => {
        await mongo.collection('services').deleteMany({});
        if (data.services.length > 0) {
          await mongo.collection('services').insertMany(data.services.map((s) => ({ ...s })));
        }
      })(),
      (async () => {
        await mongo.collection('blogs').deleteMany({});
        if (data.blogs.length > 0) {
          await mongo.collection('blogs').insertMany(data.blogs.map((b) => ({ ...b })));
        }
      })(),
      (async () => {
        await mongo.collection('prices').deleteMany({});
        if (data.prices.length > 0) {
          await mongo.collection('prices').insertMany(data.prices.map((p) => ({ ...p })));
        }
      })(),
      (async () => {
        await mongo.collection('consultations').deleteMany({});
        if (data.consultations.length > 0) {
          await mongo.collection('consultations').insertMany(data.consultations.map((c) => ({ ...c })));
        }
      })(),
    ]);

    return true;
  } catch (err) {
    console.warn('[MongoDB] writeDb sync error:', (err as Error).message);
    return false;
  }
}
