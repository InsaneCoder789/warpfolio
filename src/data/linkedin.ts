// Edit this file anytime to update Experience / Volunteering shown on the site.
// Logos are LinkedIn-hosted CDN URLs (may expire long-term — re-grab from your LinkedIn if a logo breaks).

export interface ExperienceItem {
  company: string;
  logo: string;
  role: string;
  type: string; // Full-time / Part-time / Internship
  duration: string;
  location: string;
  mode: string; // On-site / Remote / Hybrid
  skills?: string[];
}

export const PROFILE_PHOTO = "/profile.png";

// Latest role per company only
export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "K1000 KIIT",
    logo: "/logos/companies/k1000.jpg",
    role: "Strategy Analyst · Office of Strategy & Growth",
    type: "Full-time",
    duration: "Feb 2026 — Present",
    location: "Bhubaneswar, Odisha, India",
    mode: "On-site",
    skills: ["Project Management", "Management"],
  },
  {
    company: "Donum",
    logo: "/logos/companies/donum.jpg",
    role: "Junior Software Engineer",
    type: "Full-time",
    duration: "Nov 2025 — Present",
    location: "Bhubaneswar, Odisha, India",
    mode: "Hybrid",
    skills: ["Advertising", "Sales Management"],
  },
  {
    company: "GeeksforGeeks KIIT",
    logo: "/logos/companies/gfg-kiit.jpg",
    role: "Android App Developer",
    type: "Part-time",
    duration: "Jan 2026 — Present",
    location: "Bhubaneswar, Odisha, India",
    mode: "Remote",
    skills: ["Android", "Kotlin"],
  },
  {
    company: "E Labs KIIT",
    logo: "/logos/companies/elabs-kiit.jpg",
    role: "App Developer · Android & Member Development",
    type: "Part-time",
    duration: "Jan 2025 — May 2025",
    location: "Bhubaneswar, Odisha, India",
    mode: "Hybrid",
    skills: ["Android", "Mentoring"],
  },
];

export const VOLUNTEERING: ExperienceItem[] = [
  {
    company: "National Service Scheme",
    logo: "/logos/companies/nss.jpg",
    role: "General Volunteer · Dhara",
    type: "Part-time",
    duration: "Sep 2025 — Present",
    location: "Bhubaneswar, Odisha, India",
    mode: "On-site",
  },
  {
    company: "CyberVault KIIT",
    logo: "/logos/companies/cybervault.jpg",
    role: "Marketing Team · Advertising",
    type: "Part-time",
    duration: "Aug 2025 — Present",
    location: "Bhubaneswar, Odisha, India",
    mode: "Hybrid",
  },
  {
    company: "KIIT Animal & Environment Welfare Society",
    logo: "/logos/companies/kaews.jpg",
    role: "Marketing Team · Advertising & Offline Marketing",
    type: "Part-time",
    duration: "Dec 2025 — Present",
    location: "Bhubaneswar, Odisha, India",
    mode: "On-site",
  },
];
