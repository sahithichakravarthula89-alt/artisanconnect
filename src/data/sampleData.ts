import { Artisan, Product } from '../types';

export const INITIAL_ARTISANS: Artisan[] = [
  {
    id: 'artisan-a',
    name: 'Rameshwar Lal Chhipa',
    craftType: 'Handloom & Block Print Textiles',
    state: 'Rajasthan',
    city: 'Jaipur (Sanganer)',
    location: 'Sanganer, Jaipur, Rajasthan',
    preferredLanguage: 'Hindi',
    languageCode: 'hi',
    preparationDays: 7,
    phone: '+91 98290 14210',
    whatsapp: '+91 98290 14210',
    email: 'rameshwar.sanganer@artisans.in',
    bio: 'Fourth-generation master craftsman specializing in natural dye hand block printed pure cotton textiles, tote bags, and heritage botanical motifs.',
    yearsOfExperience: 28,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    verifiedArtisan: true,
    specialties: ['Handmade cotton bags', 'Dabu Print', 'Indigo Block Printing', 'Bulk Handloom Tote Production'],
    benchmarkRole: 'Artisan A'
  },
  {
    id: 'artisan-b',
    name: 'Bhaskarachari V.',
    craftType: 'Wooden Toys & Lacquerware',
    state: 'Karnataka',
    city: 'Channapatna',
    location: 'Channapatna Toy Cluster, Ramanagara, Karnataka',
    preferredLanguage: 'Kannada',
    languageCode: 'kn',
    preparationDays: 10,
    phone: '+91 94481 77309',
    whatsapp: '+91 94481 77309',
    email: 'bhaskarachari.toys@artisans.in',
    bio: 'Award-winning artisan crafting GI-tagged Channapatna wooden toys using seasoned Wrightia tinctoria (ivory wood) and non-toxic vegetable dyes.',
    yearsOfExperience: 32,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    verifiedArtisan: true,
    specialties: ['Handmade Wooden Toys', 'Lacquerware Stacking Games', 'Traditional Figurines'],
    benchmarkRole: 'Artisan B'
  },
  {
    id: 'artisan-c',
    name: 'Sunita Devi Meena',
    craftType: 'Handloom & Cotton Crafts',
    state: 'Rajasthan',
    city: 'Jaipur (Bagru)',
    location: 'Bagru Artisans Colony, Jaipur, Rajasthan',
    preferredLanguage: 'Hindi',
    languageCode: 'hi',
    preparationDays: 14,
    phone: '+91 97845 22104',
    whatsapp: '+91 97845 22104',
    email: 'sunita.meena.crafts@artisans.in',
    bio: 'Women artisan self-help group leader producing authentic handmade cotton bags and accessory pouches using handspun cotton.',
    yearsOfExperience: 14,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    verifiedArtisan: true,
    specialties: ['Handmade cotton bags', 'Cotton Pouches', 'Vegetable Dye Accessories'],
    benchmarkRole: 'Artisan C'
  },
  {
    id: 'artisan-4',
    name: 'Bhanwar Singh Prajapat',
    craftType: 'Blue Pottery & Ceramics',
    state: 'Rajasthan',
    city: 'Jaipur',
    location: 'Kot Jewar, Jaipur, Rajasthan',
    preferredLanguage: 'Hindi',
    phone: '+91 98282 39110',
    whatsapp: '+91 98282 39110',
    email: 'bhanwar.bluepottery@artisans.in',
    bio: 'Traditional Jaipur blue pottery artisan crafting quartz-powder based ceramics with cobalt oxide and Persian floral patterns.',
    yearsOfExperience: 22,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    verifiedArtisan: true,
    specialties: ['Blue Pottery Vases', 'Ceramic Plates', 'Tiles & Knobs']
  },
  {
    id: 'artisan-5',
    name: 'Sukhlal Baghel',
    craftType: 'Dhokra Brass Metalcraft',
    state: 'Chhattisgarh',
    city: 'Bastar (Kondagaon)',
    location: 'Kondagaon Shilpgram, Bastar, Chhattisgarh',
    preferredLanguage: 'Chhattisgarhi / Hindi',
    phone: '+91 94060 11982',
    whatsapp: '+91 94060 11982',
    email: 'sukhlal.dhokra@artisans.in',
    bio: 'National merit certified master of 4,000-year-old lost-wax bell metal casting, representing indigenous tribal folklore.',
    yearsOfExperience: 35,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    verifiedArtisan: true,
    specialties: ['Dhokra Brass Figurines', 'Tribal Diyas', 'Lost-wax Metal Bell Craft']
  },
  {
    id: 'artisan-6',
    name: 'Mohammad Aslam Ansari',
    craftType: 'Banarasi Handloom Silk',
    state: 'Uttar Pradesh',
    city: 'Varanasi',
    location: 'Madanpura, Varanasi, Uttar Pradesh',
    preferredLanguage: 'Urdu / Hindi',
    phone: '+91 94152 44321',
    whatsapp: '+91 94152 44321',
    email: 'aslam.banarasi@artisans.in',
    bio: 'Master weaver specializing in pure Katan silk warp and genuine metallic zari weft Banarasi brocade sarees and shawls.',
    yearsOfExperience: 40,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    verifiedArtisan: true,
    specialties: ['Banarasi Silk Brocade', 'Zari Table Runners', 'Handloom Dupattas']
  },
  {
    id: 'artisan-7',
    name: 'K. Lakshmi Narayana',
    craftType: 'Pochampally Ikat Handloom',
    state: 'Telangana',
    city: 'Bhoodan Pochampally',
    location: 'Pochampally Weavers Colony, Yadadri, Telangana',
    preferredLanguage: 'Telugu / English',
    phone: '+91 98491 55210',
    whatsapp: '+91 98491 55210',
    email: 'lakshmi.ikat@artisans.in',
    bio: 'Expert in the tie-and-dye double Ikat technique where geometric patterns are precision aligned on traditional pit-looms.',
    yearsOfExperience: 25,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    verifiedArtisan: true,
    specialties: ['Double Ikat Cotton Fabrics', 'Handwoven Cushion Covers', 'Ikat Yardage']
  },
  {
    id: 'artisan-8',
    name: 'Amrita Jha',
    craftType: 'Madhubani / Mithila Folk Art',
    state: 'Bihar',
    city: 'Madhubani (Ranti)',
    location: 'Ranti Village, Madhubani, Bihar',
    preferredLanguage: 'Maithili / Hindi',
    phone: '+91 99312 88470',
    whatsapp: '+91 99312 88470',
    email: 'amrita.mithila@artisans.in',
    bio: 'Preserving ancient Mithila painting styles including Kachni (line work) and Bharni (colored filling) using natural mineral colors.',
    yearsOfExperience: 19,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    verifiedArtisan: true,
    specialties: ['Madhubani Silk Hangings', 'Mithila Coasters & Stationery', 'Hand-painted Stoles']
  },
  {
    id: 'artisan-9',
    name: 'Khatri Abdul Gafur',
    craftType: 'Rogan Art & Ajrakh',
    state: 'Gujarat',
    city: 'Kutch (Nirona)',
    location: 'Nirona Village, Bhuj, Kutch, Gujarat',
    preferredLanguage: 'Kutchi / Gujarati / Hindi',
    phone: '+91 94269 77801',
    whatsapp: '+91 94269 77801',
    email: 'gafur.rogan@artisans.in',
    bio: 'Padma Shri recipient family artisan of 300-year-old Rogan craft made by boiling castor oil and natural pigments drawn with a metal stylus.',
    yearsOfExperience: 30,
    avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=400&q=80',
    verifiedArtisan: true,
    specialties: ['Rogan Art Wall Canvas', 'Ajrakh Modal Silk Stoles', 'Castor Oil Art']
  },
  {
    id: 'artisan-10',
    name: 'Haradhan Kumbhakar',
    craftType: 'Terracotta Pottery & Sculptures',
    state: 'West Bengal',
    city: 'Bishnupur (Bankura)',
    location: 'Panchmura, Bankura, West Bengal',
    preferredLanguage: 'Bengali / Hindi',
    phone: '+91 94344 67210',
    whatsapp: '+91 94344 67210',
    email: 'haradhan.terracotta@artisans.in',
    bio: 'Crafting the iconic Bankura Terracotta Horse and unglazed earthenware pottery from locally gathered alluvial river clay.',
    yearsOfExperience: 27,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    verifiedArtisan: true,
    specialties: ['Bankura Terracotta Horses', 'Unglazed Clay Water Vessels', 'Terracotta Garden Planters']
  },
  {
    id: 'artisan-11',
    name: 'Ganesh Shinde',
    craftType: 'Handcrafted Kolhapuri Leather',
    state: 'Maharashtra',
    city: 'Kolhapur',
    location: 'Shivaji Market, Kolhapur, Maharashtra',
    preferredLanguage: 'Marathi / Hindi',
    phone: '+91 98224 88192',
    whatsapp: '+91 98224 88192',
    email: 'ganesh.kolhapuri@artisans.in',
    bio: 'Specialist in 100% vegetable tanned buffalo and ox-hide authentic hand-stitched Kolhapuri chappals and leather accessories.',
    yearsOfExperience: 21,
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
    verifiedArtisan: true,
    specialties: ['Kolhapuri Footwear', 'Vegetable Tanned Leather Wallets', 'Braided Belts']
  },
  {
    id: 'artisan-12',
    name: 'Ghulam Hassan Dar',
    craftType: 'Kashmiri Pashmina & Walnut Wood',
    state: 'Jammu & Kashmir',
    city: 'Srinagar',
    location: 'Downtown Craft Quarter, Srinagar, Kashmir',
    preferredLanguage: 'Kashmiri / Urdu / English',
    phone: '+91 94190 33819',
    whatsapp: '+91 94190 33819',
    email: 'ghulam.pashmina@artisans.in',
    bio: 'GI-certified weaver and carver working with handspun Changthangi goat pashmina fiber and seasoned root walnut timber.',
    yearsOfExperience: 34,
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    verifiedArtisan: true,
    specialties: ['Pure Hand-Spun Pashmina', 'Sozni Embroidered Shawls', 'Carved Walnut Wood Boxes']
  },
  {
    id: 'artisan-13',
    name: 'Pranab Bora',
    craftType: 'Assam Bamboo & Cane Weaving',
    state: 'Assam',
    city: 'Majuli Island',
    location: 'Kamalabari, Majuli, Assam',
    preferredLanguage: 'Assamese / Hindi / English',
    phone: '+91 98540 66291',
    whatsapp: '+91 98540 66291',
    email: 'pranab.bamboo@artisans.in',
    bio: 'Eco-artisan crafting contemporary lifestyle products from renewable muli-bamboo and Assam riverbed cane.',
    yearsOfExperience: 18,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    verifiedArtisan: true,
    specialties: ['Bamboo Storage Baskets', 'Handwoven Bamboo Lamps', 'Cane Table Placemats']
  },
  {
    id: 'artisan-14',
    name: 'R. Soundararajan',
    craftType: 'Tanjore Gold Foil Painting',
    state: 'Tamil Nadu',
    city: 'Thanjavur',
    location: 'West Main Street, Thanjavur, Tamil Nadu',
    preferredLanguage: 'Tamil / English',
    phone: '+91 94431 82103',
    whatsapp: '+91 94431 82103',
    email: 'soundar.tanjore@artisans.in',
    bio: 'Classical artist crafting Tanjore sacred art on teak wood boards using chalk gesso paste, Jaipur semi-precious stones and 22-karat gold leaf.',
    yearsOfExperience: 31,
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80',
    verifiedArtisan: true,
    specialties: ['22K Gold Foil Tanjore Art', 'Miniature Teak Keepsakes', 'Traditional Devotional Paintings']
  },
  {
    id: 'artisan-15',
    name: 'Syed Altaf Hussain',
    craftType: 'Bidriware Silver Inlay',
    state: 'Karnataka',
    city: 'Bidar',
    location: 'Old City, Bidar, Karnataka',
    preferredLanguage: 'Urdu / Kannada / Hindi',
    phone: '+91 98450 71092',
    whatsapp: '+91 98450 71092',
    email: 'altaf.bidriware@artisans.in',
    bio: 'Heritage metalsmith creating zinc-copper alloy pieces blackened with Bidar Fort soil and inlaid with pure 99.9% fine silver wire.',
    yearsOfExperience: 29,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
    verifiedArtisan: true,
    specialties: ['Bidriware Silver Pen Stands', 'Floral Trinket Boxes', 'Bidri Vases']
  },
  {
    id: 'artisan-16',
    name: 'Iqbal Ahmed',
    craftType: 'Saharanpur Wood Carving',
    state: 'Uttar Pradesh',
    city: 'Saharanpur',
    location: 'Khata Kheri, Saharanpur, Uttar Pradesh',
    preferredLanguage: 'Hindi / Urdu',
    phone: '+91 98371 44021',
    whatsapp: '+91 98371 44021',
    email: 'iqbal.carvings@artisans.in',
    bio: 'Master of intricate Sheesham and mango wood lattice carving (Jali work) and polished brass inlay furniture accents.',
    yearsOfExperience: 26,
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=400&q=80',
    verifiedArtisan: true,
    specialties: ['Carved Sheesham Jali Screens', 'Brass Inlaid Coaster Sets', 'Carved Wooden Trays']
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  // --- Benchmark 1: Artisan A (150 available, bulk accepted) ---
  {
    id: 'prod-a1',
    artisanId: 'artisan-a',
    name: 'Handmade Cotton Bags (Organic Tote Bag)',
    category: 'Bags & Accessories',
    craftType: 'Handloom & Block Print Textiles',
    description: 'Eco-friendly handmade cotton bags crafted from heavy 280 GSM unbleached organic cotton with reinforced stitching, traditional Sanganeri botanical floral print, and sturdy woven web handles. Ideal for sustainable corporate gifting, retail, and daily grocery shopping.',
    price: 240,
    availableQuantity: 150,
    bulkOrderAvailable: true,
    bulkMinQuantity: 25,
    bulkLeadTimeDays: 7,
    location: 'Sanganer, Jaipur, Rajasthan',
    images: [
      'https://images.unsplash.com/photo-1597484662317-9bd7bdda2907?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80'
    ],
    materials: ['100% Unbleached Cotton', 'Natural Dyes', 'Cotton Canvas Handles'],
    dimensions: '38 cm x 42 cm x 10 cm gusset',
    createdAt: '2026-02-10T10:00:00Z',
    isBenchmarkProduct: true
  },
  {
    id: 'prod-a2',
    artisanId: 'artisan-a',
    name: 'Natural Indigo Hand Block Cotton Bedcover',
    category: 'Home Decor',
    craftType: 'Handloom & Block Print Textiles',
    description: 'Double bedcover hand-printed using traditional Dabu mud-resist and fermented natural indigo vat dyeing on soft handspun cotton fabric.',
    price: 1850,
    availableQuantity: 45,
    bulkOrderAvailable: true,
    bulkMinQuantity: 10,
    bulkLeadTimeDays: 12,
    location: 'Sanganer, Jaipur, Rajasthan',
    images: [
      'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=800&q=80'
    ],
    materials: ['Pure Cambric Cotton', 'Natural Fermented Indigo'],
    dimensions: '228 cm x 274 cm (King Size)',
    createdAt: '2026-02-12T14:30:00Z'
  },

  // --- Benchmark 2: Artisan B (Wooden toys, 50 available) ---
  {
    id: 'prod-b1',
    artisanId: 'artisan-b',
    name: 'Channapatna Wooden Toys (Handcrafted Rocker & Animal Cart)',
    category: 'Toys & Games',
    craftType: 'Wooden Toys & Lacquerware',
    description: 'Safe, smooth-sanded handmade wooden toys coated with non-toxic natural lacquer colored with turmeric, indigo, and katha bark. Safe for toddlers and beloved worldwide as classic Indian craft.',
    price: 450,
    availableQuantity: 50,
    bulkOrderAvailable: true,
    bulkMinQuantity: 20,
    bulkLeadTimeDays: 10,
    location: 'Channapatna Toy Cluster, Ramanagara, Karnataka',
    images: [
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80'
    ],
    materials: ['Ivory Wood (Aale Mara)', 'Natural Lacquer', 'Vegetable Pigments'],
    dimensions: '18 cm x 10 cm x 12 cm',
    createdAt: '2026-02-15T09:00:00Z',
    isBenchmarkProduct: true
  },
  {
    id: 'prod-b2',
    artisanId: 'artisan-b',
    name: 'Ivory-Wood Educational Bead Abacus',
    category: 'Toys & Games',
    craftType: 'Wooden Toys & Lacquerware',
    description: 'Lacquered counting beads turned on manual lathe machines by traditional Karnataka artisans for early childhood sensory play.',
    price: 620,
    availableQuantity: 35,
    bulkOrderAvailable: true,
    bulkMinQuantity: 15,
    bulkLeadTimeDays: 8,
    location: 'Channapatna Toy Cluster, Ramanagara, Karnataka',
    images: [
      'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80'
    ],
    materials: ['Wrightia Tinctoria Wood', 'Vegetable Lac Resin'],
    dimensions: '25 cm x 20 cm x 6 cm',
    createdAt: '2026-02-18T11:00:00Z'
  },

  // --- Benchmark 3: Artisan C (Handmade cotton bags, 20 available) ---
  {
    id: 'prod-c1',
    artisanId: 'artisan-c',
    name: 'Handmade Cotton Bags (Hand-dyed Shopper)',
    category: 'Bags & Accessories',
    craftType: 'Handloom & Cotton Crafts',
    description: 'Artisanal handmade cotton bags crafted with village self-help women artisans in Bagru. Made with soft handloom cotton, wooden toggle buttons, and vegetable print borders. Limited current stock batch of 20 pieces.',
    price: 220,
    availableQuantity: 20, // INSUFFICIENT for 100 benchmark request
    bulkOrderAvailable: true,
    bulkMinQuantity: 10,
    bulkLeadTimeDays: 20,
    location: 'Bagru Artisans Colony, Jaipur, Rajasthan',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1597484662317-9bd7bdda2907?auto=format&fit=crop&w=800&q=80'
    ],
    materials: ['Handloom Raw Cotton', 'Bagru Block Dyes', 'Wooden Buttons'],
    dimensions: '35 cm x 38 cm',
    createdAt: '2026-02-20T16:00:00Z',
    isBenchmarkProduct: true
  },
  {
    id: 'prod-c2',
    artisanId: 'artisan-c',
    name: 'Block Printed Cotton Zipper Pouches (Set of 3)',
    category: 'Bags & Accessories',
    craftType: 'Handloom & Cotton Crafts',
    description: 'Assorted trio of handmade cotton utility pouches with brass zippers, waterproof inner lining, and Bagru floral geometric hand block motifs.',
    price: 310,
    availableQuantity: 30,
    bulkOrderAvailable: true,
    bulkMinQuantity: 15,
    bulkLeadTimeDays: 14,
    location: 'Bagru Artisans Colony, Jaipur, Rajasthan',
    images: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80'
    ],
    materials: ['Cotton Canvas', 'Brass YKK Zipper'],
    dimensions: 'Small: 15x10cm, Medium: 20x15cm, Large: 24x18cm',
    createdAt: '2026-02-22T10:00:00Z'
  },

  // --- Artisan 4: Bhanwar Singh Prajapat (Blue Pottery) ---
  {
    id: 'prod-4a',
    artisanId: 'artisan-4',
    name: 'Hand-painted Jaipur Blue Pottery Floral Vase',
    category: 'Home Decor',
    craftType: 'Blue Pottery & Ceramics',
    description: 'Distinctive turquoise-blue and cobalt glazed vase fired at low temperatures without clay, using Egyptian paste technique native to Jaipur artisans.',
    price: 1200,
    availableQuantity: 28,
    bulkOrderAvailable: true,
    bulkMinQuantity: 10,
    bulkLeadTimeDays: 15,
    location: 'Kot Jewar, Jaipur, Rajasthan',
    images: [
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80'
    ],
    materials: ['Quartz Powder', 'Glass Powder', 'Fuller Earth', 'Natural Gum'],
    dimensions: 'Height 26 cm, Diameter 14 cm',
    createdAt: '2026-02-23T11:00:00Z'
  },
  {
    id: 'prod-4b',
    artisanId: 'artisan-4',
    name: 'Blue Pottery Ceramic Serving Plates (Set of 4)',
    category: 'Kitchen & Dining',
    craftType: 'Blue Pottery & Ceramics',
    description: 'Artisan quarter plates with raised floral filigree painting in cobalt blue and saffron yellow, lead-free glazed for safe dry appetizer serving.',
    price: 1600,
    availableQuantity: 40,
    bulkOrderAvailable: true,
    bulkMinQuantity: 12,
    bulkLeadTimeDays: 14,
    location: 'Kot Jewar, Jaipur, Rajasthan',
    images: [
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80'
    ],
    materials: ['Quartz Composite', 'Cobalt Glaze'],
    dimensions: 'Diameter 21 cm each',
    createdAt: '2026-02-24T12:00:00Z'
  },

  // --- Artisan 5: Sukhlal Baghel (Bastar Dhokra) ---
  {
    id: 'prod-5a',
    artisanId: 'artisan-5',
    name: 'Bastar Dhokra Brass Tribal Musician Figurine',
    category: 'Home Decor',
    craftType: 'Dhokra Brass Metalcraft',
    description: 'Individually cast lost-wax brass sculpture portraying a Bastar Maria tribe flautist with rustic wax-thread filigree texture. Each piece is unique and cannot be duplicated.',
    price: 1450,
    availableQuantity: 30,
    bulkOrderAvailable: true,
    bulkMinQuantity: 10,
    bulkLeadTimeDays: 21,
    location: 'Kondagaon Shilpgram, Bastar, Chhattisgarh',
    images: [
      'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=800&q=80'
    ],
    materials: ['Recycled Brass Alloy', 'Beeswax Thread Mold', 'River Clay'],
    dimensions: 'Height 20 cm x Width 8 cm',
    createdAt: '2026-02-25T14:00:00Z'
  },
  {
    id: 'prod-5b',
    artisanId: 'artisan-5',
    name: 'Dhokra Cast Brass Traditional Peacock Diya Oil Lamp',
    category: 'Home Decor',
    craftType: 'Dhokra Brass Metalcraft',
    description: 'Ancient hollow-cast brass oil lamp adorned with peacock and elephant iconography, traditionally used in temple festivals and auspicious gifting.',
    price: 850,
    availableQuantity: 75,
    bulkOrderAvailable: true,
    bulkMinQuantity: 25,
    bulkLeadTimeDays: 15,
    location: 'Kondagaon Shilpgram, Bastar, Chhattisgarh',
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80'
    ],
    materials: ['Bell Metal Brass', 'Natural Patina'],
    dimensions: 'Height 16 cm, Oil Bowl 9 cm',
    createdAt: '2026-02-26T09:30:00Z'
  },

  // --- Artisan 6: Mohammad Aslam Ansari (Banarasi Silk) ---
  {
    id: 'prod-6a',
    artisanId: 'artisan-6',
    name: 'Pure Katan Silk Banarasi Brocade Dupatta',
    category: 'Apparel & Textiles',
    craftType: 'Banarasi Handloom Silk',
    description: 'Handwoven in Varanasi using fine mulberry katan silk with authentic floral Kadwa jaal zari work woven by hand on traditional drawboy jacquard looms.',
    price: 3800,
    availableQuantity: 25,
    bulkOrderAvailable: true,
    bulkMinQuantity: 10,
    bulkLeadTimeDays: 25,
    location: 'Madanpura, Varanasi, Uttar Pradesh',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
    ],
    materials: ['100% Pure Mulberry Silk', 'Fine Gold Metallic Zari'],
    dimensions: '2.5 meters x 0.95 meters',
    createdAt: '2026-02-27T10:00:00Z'
  },
  {
    id: 'prod-6b',
    artisanId: 'artisan-6',
    name: 'Handwoven Banarasi Zari Table Runner',
    category: 'Home Decor',
    craftType: 'Banarasi Handloom Silk',
    description: 'Rich royal brocade table accent with paisley buta motifs on emerald green raw silk base with lined cotton backing and tasseled ends.',
    price: 1550,
    availableQuantity: 50,
    bulkOrderAvailable: true,
    bulkMinQuantity: 20,
    bulkLeadTimeDays: 14,
    location: 'Madanpura, Varanasi, Uttar Pradesh',
    images: [
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80'
    ],
    materials: ['Banarasi Silk', 'Zari Thread', 'Cotton Lining'],
    dimensions: '180 cm x 35 cm',
    createdAt: '2026-02-28T11:00:00Z'
  },

  // --- Artisan 7: K. Lakshmi Narayana (Pochampally Ikat) ---
  {
    id: 'prod-7a',
    artisanId: 'artisan-7',
    name: 'Pochampally Double Ikat Cotton Fabric (Running Meter)',
    category: 'Apparel & Textiles',
    craftType: 'Pochampally Ikat Handloom',
    description: 'GI-tagged Telia Rumal inspired double Ikat handloom cotton yardage. Precision resist-dyed warp and weft for tailored shirts, kurtas, and apparel brands.',
    price: 380,
    availableQuantity: 300,
    bulkOrderAvailable: true,
    bulkMinQuantity: 50,
    bulkLeadTimeDays: 10,
    location: 'Pochampally Weavers Colony, Yadadri, Telangana',
    images: [
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=80'
    ],
    materials: ['100% Combed Cotton', 'Azo-free Reactive Dyes'],
    dimensions: 'Sold per meter (44 inch width)',
    createdAt: '2026-03-01T08:00:00Z'
  },
  {
    id: 'prod-7b',
    artisanId: 'artisan-7',
    name: 'Ikat Handwoven Cushion Covers (Pair of 2)',
    category: 'Home Decor',
    craftType: 'Pochampally Ikat Handloom',
    description: 'Handloom geometric diamond pattern cushion covers in terracotta and cream tones with concealed side zipper and heavy duck cotton back.',
    price: 720,
    availableQuantity: 60,
    bulkOrderAvailable: true,
    bulkMinQuantity: 20,
    bulkLeadTimeDays: 12,
    location: 'Pochampally Weavers Colony, Yadadri, Telangana',
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80'
    ],
    materials: ['Handloom Ikat Cotton', 'Brass Zipper'],
    dimensions: '40 cm x 40 cm (16 x 16 inches)',
    createdAt: '2026-03-02T10:00:00Z'
  },

  // --- Artisan 8: Amrita Jha (Madhubani Painting) ---
  {
    id: 'prod-8a',
    artisanId: 'artisan-8',
    name: 'Handmade Madhubani Tree of Life Painting on Tussar Silk',
    category: 'Paintings & Folk Art',
    craftType: 'Madhubani / Mithila Folk Art',
    description: 'Intricate fine nib line work depicting the sacred Kalpavriksha (Tree of Life) with peacocks, fishes, and sun motifs. Painted using vegetable pigments on handspun wild Tussar silk.',
    price: 2400,
    availableQuantity: 18,
    bulkOrderAvailable: true,
    bulkMinQuantity: 5,
    bulkLeadTimeDays: 20,
    location: 'Ranti Village, Madhubani, Bihar',
    images: [
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80'
    ],
    materials: ['Raw Tussar Silk', 'Natural Pigments', 'Bamboo Nib Pen'],
    dimensions: '55 cm x 40 cm (Unframed)',
    createdAt: '2026-03-03T11:00:00Z'
  },
  {
    id: 'prod-8b',
    artisanId: 'artisan-8',
    name: 'Madhubani Hand-painted Bookmark & Coaster Gift Set',
    category: 'Home Decor',
    craftType: 'Madhubani / Mithila Folk Art',
    description: 'Set of 6 handcrafted MDF wooden coasters and 2 handmade paper bookmarks with protective varnish, painted by women artists of Mithila.',
    price: 490,
    availableQuantity: 120,
    bulkOrderAvailable: true,
    bulkMinQuantity: 30,
    bulkLeadTimeDays: 8,
    location: 'Ranti Village, Madhubani, Bihar',
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80'
    ],
    materials: ['MDF Wood', 'Handmade Paper', 'Waterproof Acrylics'],
    dimensions: 'Coasters 9 cm x 9 cm',
    createdAt: '2026-03-04T09:00:00Z'
  },

  // --- Artisan 9: Khatri Abdul Gafur (Rogan & Ajrakh) ---
  {
    id: 'prod-9a',
    artisanId: 'artisan-9',
    name: 'Kutch Rogan Art Floral Wall Hanging Canvas',
    category: 'Paintings & Folk Art',
    craftType: 'Rogan Art & Ajrakh',
    description: 'Rare craft where castor oil is boiled for 2 days to form a thick gel, blended with bright mineral dyes and guided with a blunt brass rod to create mirrored floral symmetry.',
    price: 4500,
    availableQuantity: 12,
    bulkOrderAvailable: false,
    location: 'Nirona Village, Bhuj, Kutch, Gujarat',
    images: [
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80'
    ],
    materials: ['Khadi Silk', 'Boiled Castor Oil Resin', 'Earth Pigments'],
    dimensions: '45 cm x 60 cm',
    createdAt: '2026-03-05T13:00:00Z'
  },
  {
    id: 'prod-9b',
    artisanId: 'artisan-9',
    name: 'Ajrakh Hand Block Printed Modal Silk Stole',
    category: 'Apparel & Textiles',
    craftType: 'Rogan Art & Ajrakh',
    description: 'Sixteen-stage resist-printed modal silk stole featuring classic blue, madder red, and black astronomical star geometries printed by master Kutch craftsmen.',
    price: 1350,
    availableQuantity: 80,
    bulkOrderAvailable: true,
    bulkMinQuantity: 20,
    bulkLeadTimeDays: 14,
    location: 'Nirona Village, Bhuj, Kutch, Gujarat',
    images: [
      'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=800&q=80'
    ],
    materials: ['Soft Modal Silk', 'Natural Indigo & Madder Root'],
    dimensions: '200 cm x 55 cm',
    createdAt: '2026-03-06T15:00:00Z'
  },

  // --- Artisan 10: Haradhan Kumbhakar (Bishnupur Terracotta) ---
  {
    id: 'prod-10a',
    artisanId: 'artisan-10',
    name: 'Bankura Long-Neck Terracotta Horse (Traditional Pair)',
    category: 'Home Decor',
    craftType: 'Terracotta Pottery & Sculptures',
    description: 'World-renowned Bankura horse sculptures with pointed ears and long erect necks, hand-thrown in segments on the potter wheel and fired in wood kilns.',
    price: 1100,
    availableQuantity: 35,
    bulkOrderAvailable: true,
    bulkMinQuantity: 10,
    bulkLeadTimeDays: 18,
    location: 'Panchmura, Bankura, West Bengal',
    images: [
      'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80'
    ],
    materials: ['Alluvial River Clay', 'Natural Wood Firing'],
    dimensions: 'Height 30 cm, Pair of 2',
    createdAt: '2026-03-07T11:00:00Z'
  },
  {
    id: 'prod-10b',
    artisanId: 'artisan-10',
    name: 'Terracotta Unglazed Clay Water Jug (Self-Cooling)',
    category: 'Kitchen & Dining',
    craftType: 'Terracotta Pottery & Sculptures',
    description: 'Porous terracotta water carafe with matching lid and drinking cup. Naturally chills drinking water through micro-evaporation while enriching with natural earth minerals.',
    price: 420,
    availableQuantity: 90,
    bulkOrderAvailable: true,
    bulkMinQuantity: 25,
    bulkLeadTimeDays: 10,
    location: 'Panchmura, Bankura, West Bengal',
    images: [
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80'
    ],
    materials: ['100% Natural Red Clay'],
    dimensions: 'Capacity: 1.5 Litres',
    createdAt: '2026-03-08T10:00:00Z'
  },

  // --- Artisan 11: Ganesh Shinde (Kolhapuri Leather) ---
  {
    id: 'prod-11a',
    artisanId: 'artisan-11',
    name: 'Original Hand-braided Leather Kolhapuri Chappals',
    category: 'Apparel & Textiles',
    craftType: 'Handcrafted Kolhapuri Leather',
    description: 'Authentic Kolhapuri sandals hand-stitched with buffalo gut cord without any iron nails. Tanned with babool bark and myrobalan nuts for legendary durability.',
    price: 1650,
    availableQuantity: 65,
    bulkOrderAvailable: true,
    bulkMinQuantity: 20,
    bulkLeadTimeDays: 14,
    location: 'Shivaji Market, Kolhapur, Maharashtra',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80'
    ],
    materials: ['Vegetable Tanned Leather', 'Natural Gut Stitching'],
    dimensions: 'Sizes 6 to 11 UK available',
    createdAt: '2026-03-09T08:30:00Z'
  },
  {
    id: 'prod-11b',
    artisanId: 'artisan-11',
    name: 'Handmade Vegetable-Tanned Leather Coin Wallet',
    category: 'Bags & Accessories',
    craftType: 'Handcrafted Kolhapuri Leather',
    description: 'Minimalist pocket bifold wallet hand-cut and burnished by Kolhapur leather artisans with vegetable oils, developing a rich caramel patina over time.',
    price: 550,
    availableQuantity: 110,
    bulkOrderAvailable: true,
    bulkMinQuantity: 30,
    bulkLeadTimeDays: 7,
    location: 'Shivaji Market, Kolhapur, Maharashtra',
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80'
    ],
    materials: ['Full-Grain Cowhide', 'Waxed Thread'],
    dimensions: '11 cm x 9 cm',
    createdAt: '2026-03-10T12:00:00Z'
  },

  // --- Artisan 12: Ghulam Hassan Dar (Pashmina & Walnut Wood) ---
  {
    id: 'prod-12a',
    artisanId: 'artisan-12',
    name: 'Hand-Spun Kashmiri Pashmina Sozni Shawl',
    category: 'Apparel & Textiles',
    craftType: 'Kashmiri Pashmina & Walnut Wood',
    description: 'Masterpiece 100% fine Pashmina shawl hand-spun on traditional Kashmiri yender charkha and adorned with intricate needlepoint Sozni embroidery.',
    price: 12500,
    availableQuantity: 10,
    bulkOrderAvailable: false,
    location: 'Downtown Craft Quarter, Srinagar, Kashmir',
    images: [
      'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=800&q=80'
    ],
    materials: ['Pure Changthangi Cashmere Wool', 'Silk Thread'],
    dimensions: '200 cm x 100 cm',
    createdAt: '2026-03-11T14:00:00Z'
  },
  {
    id: 'prod-12b',
    artisanId: 'artisan-12',
    name: 'Hand-carved Kashmiri Walnut Wood Dry Fruit Box',
    category: 'Home Decor',
    craftType: 'Kashmiri Pashmina & Walnut Wood',
    description: 'Carved from single block aged Kashmiri walnut wood with deep chinar leaf relief work and secret sliding lock mechanism.',
    price: 2100,
    availableQuantity: 40,
    bulkOrderAvailable: true,
    bulkMinQuantity: 15,
    bulkLeadTimeDays: 16,
    location: 'Downtown Craft Quarter, Srinagar, Kashmir',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80'
    ],
    materials: ['Seasoned Kashmir Walnut Wood', 'Natural Wax Polish'],
    dimensions: '25 cm x 18 cm x 9 cm (4 Compartments)',
    createdAt: '2026-03-12T16:00:00Z'
  },

  // --- Artisan 13: Pranab Bora (Assam Bamboo) ---
  {
    id: 'prod-13a',
    artisanId: 'artisan-13',
    name: 'Majuli Eco-friendly Handwoven Bamboo Storage Basket Set',
    category: 'Home Decor',
    craftType: 'Assam Bamboo & Cane Weaving',
    description: 'Set of 3 stackable cylindrical storage baskets woven from seasoned Assam golden bamboo. Smoked over rice husks for natural insect resistance and earthy warmth.',
    price: 980,
    availableQuantity: 85,
    bulkOrderAvailable: true,
    bulkMinQuantity: 25,
    bulkLeadTimeDays: 10,
    location: 'Kamalabari, Majuli, Assam',
    images: [
      'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80'
    ],
    materials: ['Treated Assam Muli Bamboo', 'Cane Rattan Binding'],
    dimensions: 'Large 32x28cm, Med 26x24cm, Small 20x18cm',
    createdAt: '2026-03-13T09:00:00Z'
  },
  {
    id: 'prod-13b',
    artisanId: 'artisan-13',
    name: 'Handcrafted Bamboo Pendant Lamp Shade',
    category: 'Home Decor',
    craftType: 'Assam Bamboo & Cane Weaving',
    description: 'Contemporary Scandinavian-inspired lattice woven hanging pendant light shade creating soft geometric shadow patterns in dining rooms and cafes.',
    price: 1250,
    availableQuantity: 45,
    bulkOrderAvailable: true,
    bulkMinQuantity: 15,
    bulkLeadTimeDays: 12,
    location: 'Kamalabari, Majuli, Assam',
    images: [
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80'
    ],
    materials: ['Hand-split Bamboo Ribs', 'Brass Fitting Holder'],
    dimensions: 'Diameter 35 cm, Height 40 cm',
    createdAt: '2026-03-14T10:00:00Z'
  },

  // --- Artisan 14: R. Soundararajan (Thanjavur Paintings) ---
  {
    id: 'prod-14a',
    artisanId: 'artisan-14',
    name: 'Traditional Tanjore Painting with 22K Gold Foil Frame',
    category: 'Paintings & Folk Art',
    craftType: 'Tanjore Gold Foil Painting',
    description: 'Iconic classical South Indian sacred artwork on seasoned teakwood panel with raised gesso relief work, Jaipur uncut crystals, and pure 22K gold leaves.',
    price: 8900,
    availableQuantity: 15,
    bulkOrderAvailable: false,
    location: 'West Main Street, Thanjavur, Tamil Nadu',
    images: [
      'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&q=80'
    ],
    materials: ['Teak Wood Base', '22K Gold Foil', 'Semi-precious Jaipur Stones'],
    dimensions: '30 cm x 38 cm in Teak Frame',
    createdAt: '2026-03-15T11:00:00Z'
  },
  {
    id: 'prod-14b',
    artisanId: 'artisan-14',
    name: 'Miniature Tanjore Keepsake Art Plate',
    category: 'Home Decor',
    craftType: 'Tanjore Gold Foil Painting',
    description: 'Circular brass display plate featuring traditional miniature Tanjore painting with gold leaf work, suitable for shelf and desk decor.',
    price: 2200,
    availableQuantity: 40,
    bulkOrderAvailable: true,
    bulkMinQuantity: 15,
    bulkLeadTimeDays: 14,
    location: 'West Main Street, Thanjavur, Tamil Nadu',
    images: [
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80'
    ],
    materials: ['Brass Plate', 'Gold Foil', 'Natural Resin'],
    dimensions: 'Diameter 18 cm with Wooden Stand',
    createdAt: '2026-03-16T12:00:00Z'
  },

  // --- Artisan 15: Syed Altaf Hussain (Bidriware) ---
  {
    id: 'prod-15a',
    artisanId: 'artisan-15',
    name: 'Bidriware Silver Inlaid Zinc-Copper Pen Stand',
    category: 'Home Decor',
    craftType: 'Bidriware Silver Inlay',
    description: 'Blackened alloy desk accessory inlaid with genuine silver wire in delicate Persian poppy vine patterns. The deep black color is created with special fort soil.',
    price: 1800,
    availableQuantity: 30,
    bulkOrderAvailable: true,
    bulkMinQuantity: 15,
    bulkLeadTimeDays: 15,
    location: 'Old City, Bidar, Karnataka',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80'
    ],
    materials: ['Zinc-Copper Alloy', '99.9% Pure Silver Inlay'],
    dimensions: 'Height 11 cm, Diameter 7 cm',
    createdAt: '2026-03-17T13:00:00Z'
  },
  {
    id: 'prod-15b',
    artisanId: 'artisan-15',
    name: 'Bidri Floral Pattern Decorative Trinket Box',
    category: 'Home Decor',
    craftType: 'Bidriware Silver Inlay',
    description: 'Hexagonal keepsake box with tight fitting lid and intricate silver sheet inlay (Teh-nishan technique) depicting courtly Mughal motifs.',
    price: 2150,
    availableQuantity: 55,
    bulkOrderAvailable: true,
    bulkMinQuantity: 20,
    bulkLeadTimeDays: 12,
    location: 'Old City, Bidar, Karnataka',
    images: [
      'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=800&q=80'
    ],
    materials: ['Bidri Metal Alloy', 'Pure Silver Sheet'],
    dimensions: '12 cm x 12 cm x 6 cm',
    createdAt: '2026-03-18T14:00:00Z'
  },

  // --- Artisan 16: Iqbal Ahmed (Saharanpur Woodcraft) ---
  {
    id: 'prod-16a',
    artisanId: 'artisan-16',
    name: 'Hand-carved Sheesham Wood Jali Folding Screen (Tabletop)',
    category: 'Home Decor',
    craftType: 'Saharanpur Wood Carving',
    description: 'Three-panel tabletop folding partition divider hand-carved with open fretwork floral jali lattice in seasoned Indian Rosewood (Sheesham).',
    price: 3400,
    availableQuantity: 20,
    bulkOrderAvailable: true,
    bulkMinQuantity: 8,
    bulkLeadTimeDays: 18,
    location: 'Khata Kheri, Saharanpur, Uttar Pradesh',
    images: [
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80'
    ],
    materials: ['Seasoned Sheesham Wood', 'Brass Hinges'],
    dimensions: 'Height 45 cm, Total Width 60 cm',
    createdAt: '2026-03-19T15:00:00Z'
  },
  {
    id: 'prod-16b',
    artisanId: 'artisan-16',
    name: 'Brass-Inlaid Teak Wood Coaster Set of 6 with Holder',
    category: 'Kitchen & Dining',
    craftType: 'Saharanpur Wood Carving',
    description: 'Set of six hexagonal tea coasters inlaid with solid brass geometric line stars, housed in a matching handcrafted grooved wooden storage caddy.',
    price: 680,
    availableQuantity: 130,
    bulkOrderAvailable: true,
    bulkMinQuantity: 30,
    bulkLeadTimeDays: 7,
    location: 'Khata Kheri, Saharanpur, Uttar Pradesh',
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80'
    ],
    materials: ['Teak Wood', 'Solid Brass Wire & Sheet'],
    dimensions: 'Coasters 9.5 cm, Caddy 12x12x6cm',
    createdAt: '2026-03-20T16:00:00Z'
  }
];

export const INITIAL_ENQUIRIES = [
  {
    id: 'enquiry-demo-1',
    buyerName: 'Aarav Mehta',
    buyerEmail: 'aarav@greenventures.org',
    buyerPhone: '+91 98200 44199',
    buyerOrganization: 'Green Ventures Sustainability Forum',
    artisanId: 'artisan-a',
    productId: 'prod-a1',
    productName: 'Handmade Cotton Bags (Organic Tote Bag)',
    requestedQuantity: 120,
    message: 'Hello Rameshwar-ji, we need 120 handmade cotton tote bags for our annual sustainability conference in Mumbai. Could you confirm delivery timeline and packaging?',
    specialRequirements: 'Custom screen printing with conference logo in natural water-based ink. Individual rolled packaging in paper bands.',
    status: 'Discussion in progress' as const,
    timeline: [
      {
        status: 'New enquiry' as const,
        timestamp: '2026-03-22T09:30:00Z',
        note: 'Buyer submitted enquiry for 120 bags.'
      },
      {
        status: 'Accepted' as const,
        timestamp: '2026-03-22T11:00:00Z',
        note: 'Artisan accepted enquiry. Confirmed stock availability (150 available).'
      },
      {
        status: 'Discussion in progress' as const,
        timestamp: '2026-03-23T14:15:00Z',
        note: 'Discussing screen printing logo file and delivery date.'
      }
    ],
    createdAt: '2026-03-22T09:30:00Z',
    updatedAt: '2026-03-23T14:15:00Z',
    agreedPricePerUnit: 235,
    artisanNotes: 'Client shared logo artwork. Block printing border + single-screen center logo agreed.'
  },
  {
    id: 'enquiry-demo-2',
    buyerName: 'Priya Sundaram',
    buyerEmail: 'priya@heritagecrafts.in',
    buyerPhone: '+91 98450 12890',
    buyerOrganization: 'Heritage Crafts Boutique',
    artisanId: 'artisan-b',
    productId: 'prod-b1',
    productName: 'Channapatna Wooden Toys (Handcrafted Rocker & Animal Cart)',
    requestedQuantity: 25,
    message: 'Namaste Bhaskarachari-ji, we run an educational boutique in Bengaluru and would like to order 25 animal cart sets.',
    specialRequirements: 'Retail display tags explaining natural turmeric/lacquer dyes.',
    status: 'Accepted' as const,
    timeline: [
      {
        status: 'New enquiry' as const,
        timestamp: '2026-03-24T10:00:00Z',
        note: 'Enquiry received for 25 sets.'
      },
      {
        status: 'Accepted' as const,
        timestamp: '2026-03-24T12:30:00Z',
        note: 'Artisan accepted. Stock readily available.'
      }
    ],
    createdAt: '2026-03-24T10:00:00Z',
    updatedAt: '2026-03-24T12:30:00Z',
    agreedPricePerUnit: 440
  }
];
