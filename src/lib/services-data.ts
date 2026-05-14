// Shared mock data aligned with backend service schema
export interface Service {
  name: string;
  slug: string;
  description: string;
  category: string;
  price: string;
  priceType: string;
  duration: string;
  image: string;
  features: string[];
  location: string[];
  rating: number;
  totalReviews: number;
  isFeatured: boolean;
  status: 'active' | 'inactive';
}

export const CATEGORIES = [
  'All',
  'Electrician',
  'Plumbing',
  'AC Repair',
  'Painting',
  'Carpenter',
  'Cleaning',
];

export const CITIES = ['All Cities', 'Bengaluru', 'Mumbai', 'Delhi NCR', 'Chennai', 'Hyderabad', 'Pune'];

export const CATEGORY_META: Record<string, { icon: string; color: string; bg: string; text: string }> = {
  Electrician:  { icon: '⚡', color: 'bg-yellow-100 text-yellow-700',  bg: 'bg-yellow-50',  text: 'text-yellow-700' },
  Plumbing:     { icon: '🔧', color: 'bg-blue-100 text-blue-700',      bg: 'bg-blue-50',    text: 'text-blue-700' },
  'AC Repair':  { icon: '❄️', color: 'bg-cyan-100 text-cyan-700',      bg: 'bg-cyan-50',    text: 'text-cyan-700' },
  Painting:     { icon: '🎨', color: 'bg-purple-100 text-purple-700',  bg: 'bg-purple-50',  text: 'text-purple-700' },
  Carpenter:    { icon: '🪚', color: 'bg-amber-100 text-amber-700',    bg: 'bg-amber-50',   text: 'text-amber-700' },
  Cleaning:     { icon: '🧹', color: 'bg-green-100 text-green-700',    bg: 'bg-green-50',   text: 'text-green-700' },
};

export const SERVICES: Service[] = [
  {
    name: 'AC Deep Clean & Service',
    slug: 'ac-deep-clean-service',
    description: 'Complete AC deep cleaning, filter wash, gas check & performance optimization by certified technicians. Extends AC life and improves cooling efficiency by up to 30%.',
    category: 'AC Repair',
    price: '₹799',
    priceType: 'per unit',
    duration: '2–3 hrs',
    image: '/assets/ac.jpg',
    features: ['Filter deep wash', 'Coil cleaning', 'Gas pressure check', 'Drainage pipe flush', 'Performance test', 'Service report provided'],
    location: ['Bengaluru', 'Mumbai', 'Delhi NCR', 'Chennai', 'Hyderabad', 'Pune'],
    rating: 4.9,
    totalReviews: 1240,
    isFeatured: true,
    status: 'active',
  },
  {
    name: 'Electrical Wiring & Repair',
    slug: 'electrical-wiring-repair',
    description: 'Safe wiring, switchboard repair, MCB fitting, fan installation by licensed electricians. All work done as per IS standards with safety certification.',
    category: 'Electrician',
    price: '₹499',
    priceType: 'starting',
    duration: '1–2 hrs',
    image: '/assets/electrical.jpg',
    features: ['Switchboard repair', 'MCB/RCCB fitting', 'Fan & light installation', 'Earthing check', 'Wiring inspection', 'Safety certificate'],
    location: ['Bengaluru', 'Mumbai', 'Delhi NCR', 'Chennai', 'Hyderabad', 'Pune'],
    rating: 4.8,
    totalReviews: 876,
    isFeatured: true,
    status: 'active',
  },
  {
    name: 'Bathroom Plumbing Fix',
    slug: 'bathroom-plumbing-fix',
    description: 'Tap repair, pipe leakage fix, toilet installation, drainage cleaning by expert plumbers. Emergency slots available within 2–4 hours.',
    category: 'Plumbing',
    price: '₹399',
    priceType: 'starting',
    duration: '1–3 hrs',
    image: '/assets/plumbing.jpg',
    features: ['Tap & faucet repair', 'Pipe leakage fix', 'Toilet installation', 'Drainage cleaning', 'Water pressure check', 'Emergency slots available'],
    location: ['Bengaluru', 'Mumbai', 'Delhi NCR', 'Chennai', 'Hyderabad', 'Pune'],
    rating: 4.7,
    totalReviews: 654,
    isFeatured: false,
    status: 'active',
  },
  {
    name: 'Interior Wall Painting',
    slug: 'interior-wall-painting',
    description: 'Premium quality interior painting with Asian Paints / Berger. Includes wall prep, putty, primer & 2 coats of emulsion. Clean, odour-free finish guaranteed.',
    category: 'Painting',
    price: '₹12',
    priceType: 'per sq ft',
    duration: '1–3 days',
    image: '/assets/panting.jpg',
    features: ['Wall preparation & putty', 'Primer coat', '2 coats emulsion', 'Asian Paints / Berger', 'Furniture covered', 'Clean-up included'],
    location: ['Bengaluru', 'Mumbai', 'Delhi NCR', 'Chennai', 'Hyderabad', 'Pune'],
    rating: 4.8,
    totalReviews: 432,
    isFeatured: true,
    status: 'active',
  },
  {
    name: 'Furniture Assembly',
    slug: 'furniture-assembly',
    description: 'Wardrobe, bed, sofa, shelf assembly. Bring your own flat-pack or we source the material. Expert carpenters handle all brands including IKEA, Pepperfry & Urban Ladder.',
    category: 'Carpenter',
    price: '₹599',
    priceType: 'starting',
    duration: '2–4 hrs',
    image: '/assets/carpenter.jpg',
    features: ['All brands supported', 'IKEA & Pepperfry', 'Wall mounting', 'Hardware included', 'Damage protection', 'Post-assembly check'],
    location: ['Bengaluru', 'Mumbai', 'Delhi NCR', 'Chennai', 'Hyderabad', 'Pune'],
    rating: 4.6,
    totalReviews: 318,
    isFeatured: false,
    status: 'active',
  },
  {
    name: 'Home Deep Cleaning',
    slug: 'home-deep-cleaning',
    description: 'Full home deep clean — kitchen, bathrooms, bedrooms, balcony. Eco-friendly products used. Trained professionals with uniform and equipment.',
    category: 'Cleaning',
    price: '₹1,499',
    priceType: 'per visit',
    duration: '4–6 hrs',
    image: '/assets/cleaner.jpg',
    features: ['Kitchen deep clean', 'Bathroom scrubbing', 'Bedroom dusting', 'Balcony sweep', 'Eco-friendly products', 'Trained uniformed staff'],
    location: ['Bengaluru', 'Mumbai', 'Delhi NCR', 'Chennai', 'Hyderabad', 'Pune'],
    rating: 4.9,
    totalReviews: 2100,
    isFeatured: true,
    status: 'active',
  },
  {
    name: 'AC Installation',
    slug: 'ac-installation',
    description: 'Professional split AC installation with copper piping, bracket mounting, and electrical connection. Supports all brands — Daikin, Voltas, LG, Samsung, Hitachi.',
    category: 'AC Repair',
    price: '₹1,299',
    priceType: 'per unit',
    duration: '3–4 hrs',
    image: '/assets/ac.jpg',
    features: ['All brands supported', 'Copper piping', 'Bracket mounting', 'Electrical connection', 'Demo & handover', '1-year service warranty'],
    location: ['Bengaluru', 'Mumbai', 'Delhi NCR', 'Chennai'],
    rating: 4.7,
    totalReviews: 560,
    isFeatured: false,
    status: 'active',
  },
  {
    name: 'Kitchen Deep Cleaning',
    slug: 'kitchen-deep-cleaning',
    description: 'Intensive kitchen cleaning — chimney, hob, tiles, cabinets, sink, and appliances. Removes grease, grime, and odours completely.',
    category: 'Cleaning',
    price: '₹799',
    priceType: 'per visit',
    duration: '2–3 hrs',
    image: '/assets/kitchen.jpg',
    features: ['Chimney degreasing', 'Hob & burner clean', 'Tile scrubbing', 'Cabinet wipe-down', 'Sink descaling', 'Appliance exterior clean'],
    location: ['Bengaluru', 'Mumbai', 'Delhi NCR', 'Chennai', 'Hyderabad', 'Pune'],
    rating: 4.8,
    totalReviews: 890,
    isFeatured: false,
    status: 'active',
  },
];
