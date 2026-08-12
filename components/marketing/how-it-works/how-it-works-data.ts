import { Search, QrCode, Award } from "lucide-react";

export const HOW_IT_WORKS_STEPS = [
  {
    step: "01",
    title: "Discover & RSVP",
    description: "Browse 20+ active departmental events, hackathons, and guest symposiums. Filter by interest and claim your spot in seconds.",
    icon: Search,
    color: "from-blue-500 to-cyan-500",
    badge: "1-Click RSVP",
  },
  {
    step: "02",
    title: "Instant Smart QR Pass",
    description: "Your digital pass generates immediately with dynamic security QR codes. Save it offline or access it straight from your student portal.",
    icon: QrCode,
    color: "from-indigo-500 to-purple-600",
    badge: "Paperless Entry",
  },
  {
    step: "03",
    title: "Verified E-Certificate",
    description: "Faculty check you in at the gate. Tamper-proof, verifiable digital certificates are issued directly to your profile upon completion.",
    icon: Award,
    color: "from-amber-500 to-rose-600",
    badge: "Instant Credential",
  },
];
