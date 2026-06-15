const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

// Product-wise data specification matrix
const baseProductblueprints = [
  {
    name: 'Paracetamol Tablets 500mg',
    category: 'Medicines',
    brand: 'Dolo',
    variant: 'Tablets',
    size: '500mg',
    base: 40,
    scent: 'Fragrance-Free',
    desc: 'Fast-acting formula for temporary fever reduction and mild ache management.',
    discount:4,
    benefits: 'Reduces temperature quickly, alleviates headaches, easy to swallow.',
    ing: 'Paracetamol IP 500mg',
    use: '1 tablet every 4-6 hours as required. Do not exceed 4 tablets in 24 hours.',
    warn: 'Do not take with other paracetamol-containing products. Liver damage hazard.',
    images: [
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80',
      'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=800&q=80'
    ],
    faqs: [
      { question: 'Can I take this on an empty stomach?', answer: 'Yes, paracetamol can generally be taken with or without food, but taking it with food reduces any chance of mild stomach upset.' },
      { question: 'How quickly does it start to show effects?', answer: 'It typically begins working within 30 to 60 minutes after oral consumption.' }
    ],
    wellnessEssential: false,
    spotlightItem: false
  },
  {
    name: 'Amoxicillin Capsules 250mg',
    category: 'Medicines',
    brand: 'Cipla',
    variant: 'Capsules',
    size: '250mg',
    base: 65,
    scent: 'Fragrance-Free',
    desc: 'Broad-spectrum antibiotic prescription capsule targeting bacterial strain development.',
    discount:5,
    benefits: 'Combats systemic bacterial growth, highly stable assimilation absorption.',
    ing: 'Amoxicillin Trihydrate IP 250mg',
    use: 'Take exactly as directed by your physician. Complete the full prescribed course.',
    warn: 'Requires a valid medical prescription. Discontinue if allergic reactions develop.',
    images: [
      'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=800&q=80',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80'
    ],
    faqs: [
      { question: 'Is this effective against a viral cold or common flu?', answer: 'No, antibiotics only treat bacterial infections and will not work against viral conditions.' },
      { question: 'What should I do if I miss a scheduled dose?', answer: 'Take it as soon as you remember. If it is nearly time for your next dose, skip the missed one.' }
    ],
    wellnessEssential: true,
    spotlightItem: false
  },
  {
    name: 'Gentle Baby Wipes 72ct',
    category: 'Baby Care',
    brand: 'SGN Baby',
    variant: 'Wipes',
    size: '72ct',
    base: 120,
    scent: 'Mild Aloe Calm',
    desc: 'Ultra-soft, alcohol-free moisturized sheets engineered for cleansing fragile infant skin surfaces.',
    discount:10,
    benefits: 'Cleanses gently without stripping moisture, pH balanced, prevents friction rashes.',
    ing: 'Purified Water, Aloe Barbadensis Leaf Juice, Glycerin, Vitamin E Extract.',
    use: 'Open the resealable label, pull out a sheet, and gently wipe skin clean during diaper adjustments.',
    warn: 'For external skin touch only. Close pack securely immediately after use to prevent drying.',
    images: [
      'https://images.unsplash.com/photo-1555212697-194d092e3b8f?w=800&q=80',
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&q=80'
    ],
    faqs: [
      { question: 'Are these wipes safe to use on a newborn baby?', answer: 'Yes, these wipes are alcohol-free, paraben-free, and specifically formulated for highly sensitive newborn skin.' },
      { question: 'Can these wipes be safely flushed down the toilet?', answer: 'No, these wipes are non-flushable. Please dispose of them properly in a standard waste bin.' }
    ],
    wellnessEssential: true,
    spotlightItem: false
  },
  {
    name: 'Nurture Baby Cream 100ml',
    category: 'Baby Care',
    brand: "Johnson's",
    variant: 'Cream',
    size: '100ml',
    base: 180,
    scent: 'Classic Baby Talc',
    desc: 'Rich, non-greasy emollient barrier cream providing complete 24-hour hydration layers.',
    discount:30,
    benefits: 'Locks in skin surface hydration, protects from environmental dryness, intensely soothing.',
    ing: 'Mineral Oil, Cetyl Alcohol, Organic Calendula Oil Extract, Glycerin.',
    use: 'Smooth gently over your baby\'s entire clean body surface post-bath or whenever skin feels dry.',
    warn: 'Keep away from direct reach of toddlers. Avoid any contact around immediate eye sockets.',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80'
    ],
    faqs: [
      { question: 'Can this cream be used to treat active diaper rash?', answer: 'While it protects dry skin, for severe or weeping diaper rashes, a specific zinc-oxide based rash cream is highly recommended.' }
    ],
    wellnessEssential: true,
    spotlightItem: false
  },
  {
    name: 'Glow Face Wash 100ml',
    category: 'Personal Care',
    brand: 'SGN Glow',
    variant: 'Face Wash',
    size: '100ml',
    base: 150,
    scent: 'Fresh Citrus Aqua',
    desc: 'Deeply purifying facial cleanser that safely clears skin pores and dissolves excess skin sebum.',
    discount:20,
    benefits: 'Brightens skin texture, eliminates trapped environmental micro-dirt, leaves skin supple.',
    ing: 'Niacinamide 2%, Salicylic Acid 0.5%, Aloe Vera Extract Jelly Base.',
    use: 'Squeeze a coin-sized portion onto wet palms, massage upward in small circles, rinse with water.',
    warn: 'Avoid getting into eyes. If contact occurs, rinse immediately with cold clear water.',
    images: [
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80',
      'https://images.unsplash.com/photo-1608248597481-496100c80836?w=800&q=80'
    ],
    faqs: [
      { question: 'Is this face wash suitable for highly acne-prone skin?', answer: 'Yes, the inclusion of 0.5% Salicylic Acid helps gently exfoliate pores and keep acne breakouts under control.' }
    ],
    wellnessEssential: true,
    spotlightItem: false
  },
  {
    name: 'Derma Hydra Serum 75ml',
    category: 'Personal Care',
    brand: "L'Oreal",
    variant: 'Serum',
    size: '75ml',
    base: 320,
    scent: 'Fragrance-Free',
    desc: 'Highly concentrated moisture-binding serum targeting dry, unevenly textured facial profiles.',
    discount:10,
    benefits: 'Plumps skin cells from within, fills fine expression lines, delivers velvet-smooth skin.',
    ing: 'Pure Hyaluronic Acid 1.5%, Vitamin B5 Panthenol, Isotonic Water.',
    use: 'Apply 3-4 drops directly to clean, slightly damp face and neck. Press gently into skin.',
    warn: 'Perform a small isolated patch test before full use. Keep bottle closed tightly.',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80',
      'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=800&q=80'
    ],
    faqs: [
      { question: 'Should I apply this before or after my daily moisturizer?', answer: 'Always apply this serum first onto damp skin, let it absorb for 1 minute, then layer your moisturizer over it.' }
    ],
    wellnessEssential: true,
    spotlightItem: true
  },
  {
    name: 'Intima Hygiene Wash 120ml',
    category: 'Women Care',
    brand: 'VWash',
    variant: 'Wash',
    size: '120ml',
    base: 210,
    scent: 'Soothing Petal Extract',
    desc: 'Expertly calibrated delicate wash designed to safeguard optimal local acidic physiological ecosystems.',
    discount:50,
    benefits: 'Maintains ideal 3.5 pH thresholds, effectively thwarts odor development, halts itchiness.',
    ing: 'Lactic Acid, Sea Buckthorn Fruit Oil, Tea Tree Oil Extract.',
    use: 'Pour a few drops onto hand, apply gently to external areas during bathing, rinse completely.',
    warn: 'For external applications only. Do not use inside internal vaginal channels.',
    images: [
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80',
      'https://images.unsplash.com/photo-1617897903246-719242758050?w=800&q=80'
    ],
    faqs: [
      { question: 'Can this intimate wash be used safely during menstrual periods?', answer: 'Yes, it is highly recommended during periods to maintain hygiene, prevent odor, and avoid discomfort.' }
    ],
    wellnessEssential: false,
    spotlightItem: false
  },
  {
    name: 'Authentic Ashwagandha 60s',
    category: 'Ayurvedic',
    brand: 'SGN Veda',
    variant: 'Capsule',
    size: '60s',
    base: 240,
    scent: 'Earthy Herbal Essence',
    desc: 'Premium traditional revitalizing herbal adaptation supplement sourced from clean ground roots.',
    discount:40,
    benefits: 'Naturally calms racing stress responses, boosts baseline physical stamina patterns.',
    ing: 'Withania Somnifera (Ashwagandha) Root Extract 500mg',
    use: 'Take 1 capsule twice daily with warm milk or plain water, preferably after heavy meals.',
    warn: 'Consult your personal physician if you are pregnant, nursing, or taking sedative medications.',
    images: [
      'https://images.unsplash.com/photo-1611070973770-b1a672610041?w=800&q=80',
      'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=800&q=80'
    ],
    faqs: [
      { question: 'How long do I need to take this to see noticeable benefits?', answer: 'Consistent usage over 3 to 4 weeks typically shows excellent results in energy levels and stress management.' }
    ],
    wellnessEssential: false,
    spotlightItem: false
  },
  {
    name: 'Smart Digital Thermometer 1pc',
    category: 'Health Devices',
    brand: 'Omron',
    variant: 'Thermometer',
    size: '1pc',
    base: 290,
    scent: 'Fragrance-Free',
    desc: 'High-precision micro-sensor electronic tracking thermometer delivering ultra-rapid temperature logs.',
    discount:10,
    benefits: 'Gives accurate readouts within 60 seconds, dual Fahrenheit/Celsius mapping, audio beep indicator.',
    ing: 'Medical Grade ABS Outer Shell, Semiconductor Temperature Micro-Sensors.',
    use: 'Place sensor tip firmly under tongue or inside armpit zone. Wait for clear signal beep.',
    warn: 'Clean the metal tip only with isopropyl alcohol before and after readings. Do not drop.',
    images: [
      'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=800&q=80',
      'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=800&q=80'
    ],
    faqs: [
      { question: 'How do I toggle between Celsius and Fahrenheit readings?', answer: 'With the device turned off, press and hold the power button down for 3-5 seconds until the unit symbol changes on screen.' }
    ],
    wellnessEssential: true,
    spotlightItem: false
  },
  {
    name: 'Disinfecting Home Spray 300ml',
    category: 'Home Essentials',
    brand: 'Dettol',
    variant: 'Spray',
    size: '300ml',
    base: 160,
    scent: 'Crisp Breeze Pine',
    desc: 'Hard surface disinfectant aerosol that instantly sanitizes contact points around living environments.',
    discount:22,
    benefits: 'Eliminates 99.9% of bacteria and viral strains, neutralizes harsh airborne odor zones.',
    ing: 'Ethanol 60% w/w, Alkyl Dimethyl Benzyl Ammonium Saccharinate 0.1% w/w.',
    use: 'Shake can well. Hold upright 15-20cm from pre-cleaned surface and spray until wet. Let air dry.',
    warn: 'Highly flammable aerosol. Do not puncture or spray near naked flames or electrical hubs.',
    images: [
      'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=800&q=80',
      'https://images.unsplash.com/photo-1624555130581-1d9cca783bc0?w=800&q=80'
    ],
    faqs: [
      { question: 'Do I need to wipe the surface down after spraying?', answer: 'No, for ideal germ elimination, allow the spray to sit and air dry completely on the surface.' }
    ],
    wellnessEssential: false,
    spotlightItem: false
  },
  {
    name: 'Vision Clear Eye Drops 10ml',
    category: 'Eye Care',
    brand: 'SGN Opti',
    variant: 'Drops',
    size: '10ml',
    base: 135,
    scent: 'Fragrance-Free',
    desc: 'Sterile soothing lubricant drop formulated to instantly refresh eyes dried by screen exposure.',
    discount:13,
    benefits: 'Flushes burning screen strain discomfort, matches biological salinity, provides cool relief.',
    ing: 'Carboxymethylcellulose Sodium 0.5% w/v, Isotonic Aqueous Diluent.',
    use: 'Instill 1 or 2 drops inside affected eye as needed. Blink several times to distribute.',
    warn: 'Do not allow nozzle tip to touch eye or fingers. Use within one month of opening.',
    images: [
      'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=800&q=80',
      'https://images.unsplash.com/photo-1550572017-edd951b55104?w=800&q=80'
    ],
    faqs: [
      { question: 'Can I use these drops while wearing contact lenses?', answer: 'Remove contact lenses before use, apply the drops, and wait at least 15 minutes before reinserting your lenses.' }
    ],
    wellnessEssential: false,
    spotlightItem: false
  },
  {
    name: 'Nutri Daily Powder 200g',
    category: 'General Care Products',
    brand: 'Ensure',
    variant: 'Powder',
    size: '200g',
    base: 380,
    scent: 'Sweet Vanilla Bean',
    desc: 'Balanced macronutrient dietary replenishment powder rich in micronutrients for daily vitality support.',
    discount:20,
    benefits: 'Supplies sustained release fuel molecules, reinforces core bone matrices, fills meal gaps.',
    ing: 'Whey Protein Concentrate, Maltodextrin, Vitamin Mix A-Z, Zinc, Iron, Calcium.',
    use: 'Stir 3 leveled scoops of powder into 200ml of lukewarm water or milk until completely dissolved.',
    warn: 'Store in an airtight container in a cool, dry spot. Not intended for infant feeding uses.',
    images: [
      'https://images.unsplash.com/photo-1579722820308-d74e571900a9?w=800&q=80',
      'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&q=80'
    ],
    faqs: [
      { question: 'Can this nutritional powder completely replace a standard meal?', answer: 'It is designed as a dietary supplement to fill nutritional gaps, not as a total replacement for whole foods.' }
    ],
    wellnessEssential: false,
    spotlightItem: false
  },
  {
    name: 'Gluco Testing Strips 50s',
    category: 'Diabetic Care',
    brand: 'Accu-Chek',
    variant: 'Strip',
    size: '50s',
    base: 850,
    scent: 'Fragrance-Free',
    desc: 'Chemical enzyme capillary sensor test strips explicitly calibrated for instant glucose analysis.',
    discount:51,
    benefits: 'Requires a tiny blood sample size, triggers rapid blood sample fill, delivers reliable tracking.',
    ing: 'Glucose Dehydrogenase Enzyme Reactive Strips, Electrochemical Tracers.',
    use: 'Insert strip into meter, lance finger to express micro-drop, touch drop edge to yellow strip target.',
    warn: 'Close vial cap immediately after removing a strip. Store safely below 30°C; do not freeze.',
    images: [
      'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=800&q=80',
      'https://images.unsplash.com/photo-1505575967455-40e256f73376?w=800&q=80'
    ],
    faqs: [
      { question: 'Are these strips compatible with any blood glucose meter?', answer: 'No, these strips are precisely calibrated and must only be used with their corresponding branded meter model.' }
    ],
    wellnessEssential: true,
    spotlightItem: false
  }
];

const buildFlatProductCatalog = () => {
  const finalCatalog = [];
  let indexTracker = 1;

  baseProductblueprints.forEach((blueprint) => {
    
    const basePrice = Number(blueprint.base || 0);

    for (let variantIndex = 1; variantIndex <= 8; variantIndex += 1) {

      const specificPackSize = `${blueprint.size} (Batch V${variantIndex})`;
      const uniqueProductLabel = `${blueprint.name} - Unit #${String(variantIndex).padStart(2, '0')}`;

      // ✅ dynamic MRP
      const mrp = basePrice + (variantIndex * 15);

      // ✅ proper discount (dynamic per variant)

      // ✅ final price calculation
      const finalPrice = Math.round(
        mrp - (mrp * blueprint.discount) / 100
      );

      finalCatalog.push({
        id: String(indexTracker),

        label: uniqueProductLabel,
        product_name: uniqueProductLabel,

        product_image: blueprint.images,
        product_description: blueprint.desc,

        mrp: mrp,
        product_discount: blueprint.discount,   // numeric (IMPORTANT FIX)

        product_price: finalPrice,           // numeric (IMPORTANT FIX)

        
        product_category: blueprint.category,
        key_benifits: blueprint.benefits,
        key_ingredient: blueprint.ing,
        how_to_use: blueprint.use,
        precautions: blueprint.warn,

        brand: blueprint.brand,
        variant: blueprint.variant,
        pack_size: specificPackSize,
        fragnance: blueprint.scent,
        wellnessEssential:blueprint.wellnessEssential,
        spotlightItem: blueprint.spotlightItem,
        expire_date: '2029-08',
        expected_delivery: 'Delivered in 2 to 3 working days',
        disclaimer: 'Disclaimer: Review package labels, warnings, and usage instructions carefully before use.',

        faq: blueprint.faqs
      });

      indexTracker += 1;
    }
  });

  return finalCatalog;
};

const catalog = buildFlatProductCatalog();

// Extracts deals dynamically based strictly on the new flat product object structure
const deals = [...catalog]
  .sort((firstItem, secondItem) => parseFloat(secondItem.product_discount) - parseFloat(firstItem.product_discount))
  .slice(0, 20);
const category = [
  { id: 'Medicines', label: 'Medicines', icon: 'ti-pills', bg: '#ef4444' },
  { id: 'Baby Care', label: 'Baby Care', icon: 'ti-baby-carriage', bg: '#f472b6' },
  { id: 'Personal Care', label: 'Personal Care', icon: 'ti-sparkles', bg: '#8b5cf6' },
  { id: 'Women Care', label: 'Women Care', icon: 'ti-heart', bg: '#ec4899' },
  { id: 'Ayurvedic', label: 'Ayurvedic', icon: 'ti-leaf', bg: '#22c55e' },
  { id: 'Health Devices', label: 'Health Devices', icon: 'ti-device-watch', bg: '#0ea5e9' },
  { id: 'Eye Care', label: 'Eye Care', icon: 'ti-eye', bg: '#14b8a6' },
  { id: 'Diabetic Care', label: 'Diabetic Care', icon: 'ti-droplet', bg: '#f59e0b' },
  { id: 'Home Essentials', label: 'Home Essentials', icon: 'ti-home', bg: '#6366f1' },
  { id: 'General Care Products', label: 'General Care Products', icon: 'ti-package', bg: '#64748b' }
];
export const DATA = {
  catalog,
  deals,
  category
};
