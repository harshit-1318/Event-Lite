export interface PassPreset {
  id: string;
  category: string;
  title: string;
  tagline: string;
  code: string;
  date: string;
  venue: string;
  fee: string;
  slug: string;
  badge: string;
  color: string;
}

export const PASS_PRESETS: PassPreset[] = [
  {
    id: "hackathon",
    category: "36hr AI & Web3 Hackathon",
    title: "TechVishwa 2026 Hackathon",
    tagline: "Build Next-Gen AI Solutions",
    code: "#TECH-2026-9482",
    date: "Aug 17–19, 2026",
    venue: "Science Block Aud.",
    fee: "₹250",
    slug: "techvishwa-2026-ai-web3-hackathon",
    badge: "● PASSES OPEN",
    color: "from-blue-600 to-indigo-600",
  },
  {
    id: "cultural",
    category: "Annual Cultural Mega-Fest",
    title: "DAV Virasat Youth Fest 2026",
    tagline: "Bhangra, Music & Drama",
    code: "#VIRT-2026-3011",
    date: "Sep 22–24, 2026",
    venue: "Open Air Theatre",
    fee: "₹100",
    slug: "dav-virasat-2026-youth-cultural-fest",
    badge: "● POPULAR",
    color: "from-amber-500 to-rose-600",
  },
  {
    id: "sports",
    category: "Inter-College Tournament",
    title: "All-Punjab Collegiate Sports Meet",
    tagline: "Cricket, Football & Athletics",
    code: "#SPRT-2026-5820",
    date: "Oct 10–12, 2026",
    venue: "Main Sports Stadium",
    fee: "Free",
    slug: "all-punjab-inter-college-sports-meet-2026",
    badge: "● FREE ENTRY",
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: "bootcamp",
    category: "Hands-on Tech Workshop",
    title: "Agentic AI & LLM Systems",
    tagline: "Deep Learning with PyTorch",
    code: "#AIWK-2026-1194",
    date: "Aug 28–29, 2026",
    venue: "MCA Lab 3",
    fee: "₹150",
    slug: "agentic-ai-llm-systems-workshop",
    badge: "● SEATS LIMITED",
    color: "from-purple-600 to-pink-600",
  },
];
