export const categories = [
  { id: 1, name: 'Yoga Gear', slug: 'yoga-gear' },
  { id: 2, name: 'Eco Balls', slug: 'eco-balls' },
  { id: 3, name: 'Sustainable Fitness', slug: 'sustainable-fitness' },
  { id: 4, name: 'Outdoor Equipment', slug: 'outdoor-equipment' },
  { id: 5, name: 'Water Sports', slug: 'water-sports' }
];

export const products = [
  {
    id: 1,
    name: 'Eco Bamboo Yoga Mat',
    category: 'Yoga Gear',
    categoryId: 1,
    price: 89.99,
    originalPrice: 119.99,
    description: 'Premium bamboo yoga mat made from sustainable materials. Non-slip surface with natural antimicrobial properties.',
    fullDescription: 'Our Eco Bamboo Yoga Mat is crafted from 100% sustainable bamboo fibers, providing excellent grip and comfort for your practice. The natural antimicrobial properties keep your mat fresh, while the biodegradable materials ensure minimal environmental impact. Perfect for all yoga styles, from gentle Hatha to intense Vinyasa flows.',
    image: 'eco-bamboo-yoga-mat-in-use',
    ecoTag: 'Biodegradable',
    inStock: true,
    rating: 4.8,
    reviews: 124,
    features: ['100% Bamboo Fiber', 'Non-slip Surface', 'Antimicrobial', 'Biodegradable', '6mm Thickness'],
    gallery: [
      'eco-bamboo-yoga-mat-rolled-up',
      'close-up-texture-of-bamboo-yoga-mat',
      'person-doing-yoga-on-bamboo-mat-outdoors',
      'lifestyle-shot-bamboo-yoga-mat-with-accessories'
    ]
  },
  {
    id: 2,
    name: 'Recycled Soccer Ball',
    category: 'Eco Balls',
    categoryId: 2,
    price: 34.99,
    originalPrice: 49.99,
    description: 'Professional-grade soccer ball made from 100% recycled ocean plastic. FIFA approved quality.',
    fullDescription: 'Made from recycled ocean plastic bottles, this soccer ball meets FIFA quality standards while helping clean our oceans. Each ball removes approximately 12 plastic bottles from marine environments. Features traditional 32-panel design with excellent flight characteristics and durability.',
    image: 'recycled-soccer-ball-on-grass-field',
    ecoTag: 'Ocean Plastic',
    inStock: true,
    rating: 4.6,
    reviews: 89,
    features: ['100% Ocean Plastic', 'FIFA Approved', 'Professional Grade', 'Traditional Design', 'Durable Construction'],
    gallery: [
      'close-up-recycled-soccer-ball-texture',
      'kids-playing-with-recycled-soccer-ball',
      'recycled-soccer-ball-in-action-shot',
      'recycled-soccer-ball-with-ocean-background'
    ]
  },
  {
    id: 3,
    name: 'Cork Yoga Blocks Set',
    category: 'Yoga Gear',
    categoryId: 1,
    price: 24.99,
    originalPrice: 34.99,
    description: 'Set of 2 natural cork yoga blocks. Lightweight, antimicrobial, and sustainably harvested.',
    fullDescription: 'These premium cork yoga blocks are harvested from sustainable cork oak forests without harming the trees. Cork naturally provides excellent grip, even when wet, and has antimicrobial properties. The lightweight yet sturdy construction makes them perfect for deepening poses and providing support during practice.',
    image: 'set-of-two-cork-yoga-blocks',
    ecoTag: 'Sustainable Cork',
    inStock: true,
    rating: 4.7,
    reviews: 67,
    features: ['Natural Cork', 'Set of 2', 'Antimicrobial', 'Lightweight', 'Sustainable Harvest'],
    gallery: [
      'cork-yoga-blocks-used-in-yoga-pose',
      'close-up-texture-of-cork-yoga-block',
      'lifestyle-shot-cork-yoga-blocks-with-mat',
      'stack-of-cork-yoga-blocks'
    ]
  },
  {
    id: 4,
    name: 'Organic Cotton Resistance Bands',
    category: 'Sustainable Fitness',
    categoryId: 3,
    price: 19.99,
    originalPrice: 29.99,
    description: 'Set of 3 resistance bands made from organic cotton and natural latex. Multiple resistance levels.',
    fullDescription: 'Our resistance bands combine organic cotton fabric with natural latex for a comfortable, effective workout. The set includes light, medium, and heavy resistance levels, perfect for strength training, rehabilitation, and stretching. The organic materials are gentle on skin and environmentally friendly.',
    image: 'set-of-organic-cotton-resistance-bands',
    ecoTag: 'Organic Cotton',
    inStock: true,
    rating: 4.5,
    reviews: 156,
    features: ['Organic Cotton', 'Natural Latex', '3 Resistance Levels', 'Skin-Friendly', 'Durable Design'],
    gallery: [
      'person-using-organic-cotton-resistance-band',
      'close-up-texture-of-organic-cotton-band',
      'different-strengths-of-resistance-bands-laid-out',
      'lifestyle-shot-resistance-bands-in-gym-setting'
    ]
  },
  {
    id: 5,
    name: 'Bamboo Water Bottle',
    category: 'Outdoor Equipment',
    categoryId: 4,
    price: 29.99,
    originalPrice: 39.99,
    description: 'Insulated bamboo water bottle with stainless steel interior. Keeps drinks cold for 24h, hot for 12h.',
    fullDescription: 'This beautiful bamboo water bottle features a food-grade stainless steel interior with double-wall vacuum insulation. The exterior bamboo sleeve provides a natural, comfortable grip while the leak-proof design ensures worry-free transport. Perfect for hiking, gym sessions, or daily hydration.',
    image: 'bamboo-water-bottle-with-nature-background',
    ecoTag: 'Bamboo Fiber',
    inStock: true,
    rating: 4.9,
    reviews: 203,
    features: ['Bamboo Exterior', 'Stainless Steel Interior', 'Double-Wall Insulation', 'Leak-Proof', '500ml Capacity'],
    gallery: [
      'close-up-bamboo-water-bottle-cap',
      'person-drinking-from-bamboo-water-bottle-outdoors',
      'bamboo-water-bottle-on-desk',
      'insulated-interior-of-bamboo-water-bottle'
    ]
  },
  {
    id: 6,
    name: 'Recycled Foam Roller',
    category: 'Sustainable Fitness',
    categoryId: 3,
    price: 39.99,
    originalPrice: 54.99,
    description: 'High-density foam roller made from recycled materials. Perfect for muscle recovery and massage.',
    fullDescription: 'Crafted from 100% recycled foam materials, this high-density roller provides effective muscle recovery and myofascial release. The textured surface promotes blood flow and helps reduce muscle tension. Lightweight yet durable construction makes it perfect for home use or travel.',
    image: 'recycled-foam-roller-in-use-for-back-massage',
    ecoTag: 'Recycled Materials',
    inStock: true,
    rating: 4.4,
    reviews: 78,
    features: ['100% Recycled Foam', 'High Density', 'Textured Surface', 'Lightweight', 'Travel-Friendly'],
    gallery: [
      'close-up-texture-of-recycled-foam-roller',
      'person-using-foam-roller-for-leg-recovery',
      'recycled-foam-roller-in-gym-bag',
      'different-colors-of-recycled-foam-rollers'
    ]
  },
  {
    id: 7,
    name: 'Hemp Jump Rope',
    category: 'Sustainable Fitness',
    categoryId: 3,
    price: 16.99,
    originalPrice: 24.99,
    description: 'Natural hemp fiber jump rope with wooden handles. Adjustable length for all heights.',
    fullDescription: 'This traditional-style jump rope features natural hemp fiber rope with smooth wooden handles. Hemp is naturally durable and becomes softer with use. The adjustable length accommodates users of all heights, while the lightweight design makes it perfect for cardio workouts anywhere.',
    image: 'hemp-jump-rope-with-wooden-handles',
    ecoTag: 'Hemp Fiber',
    inStock: true,
    rating: 4.3,
    reviews: 45,
    features: ['Natural Hemp Rope', 'Wooden Handles', 'Adjustable Length', 'Lightweight', 'Traditional Design'],
    gallery: [
      'person-jumping-with-hemp-rope',
      'close-up-of-hemp-rope-texture-and-wooden-handle',
      'hemp-jump-rope-coiled-neatly',
      'lifestyle-shot-hemp-jump-rope-at-outdoor-gym'
    ]
  },
  {
    id: 8,
    name: 'Eco Tennis Ball Set',
    category: 'Eco Balls',
    categoryId: 2,
    price: 12.99,
    originalPrice: 18.99,
    description: 'Set of 3 tennis balls made from natural rubber and recycled felt. ITF approved.',
    fullDescription: 'These professional tennis balls combine natural rubber cores with recycled felt covers. ITF approved for tournament play, they offer consistent bounce and durability while reducing environmental impact. Each set of 3 balls comes in recyclable packaging.',
    image: 'set-of-eco-tennis-balls-on-court',
    ecoTag: 'Natural Rubber',
    inStock: true,
    rating: 4.6,
    reviews: 92,
    features: ['Natural Rubber Core', 'Recycled Felt', 'ITF Approved', 'Set of 3', 'Consistent Bounce'],
    gallery: [
      'close-up-of-eco-tennis-ball-texture',
      'tennis-player-hitting-eco-tennis-ball',
      'eco-tennis-balls-in-recyclable-packaging',
      'eco-tennis-balls-next-to-racquet'
    ]
  }
];

export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};

export const getProductsByCategory = (categoryId) => {
  return products.filter(product => product.categoryId === categoryId);
};

export const getFeaturedProducts = () => {
  return products.slice(0, 4);
};