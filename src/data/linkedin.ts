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

export const PROFILE_PHOTO =
  "https://media.licdn.com/dms/image/v2/D5603AQHzJgsCNW4vKw/profile-displayphoto-crop_800_800/B56ZtBnbBTHAAI-/0/1766332415183?e=1778112000&v=beta&t=eRIPwfa5UfTCWHcmCqKSGMqJW0Z8wF1NMQln-maFotI";

// Latest role per company only
export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "K1000 KIIT",
    logo: "https://media.licdn.com/dms/image/v2/D560BAQHrvsgepZV2yA/company-logo_200_200/B56ZeDF3qRGQAI-/0/1750251044000/k1000_kiit_logo?e=1778112000&v=beta&t=hxdi-OWKldjjQvqaLB8voJJPz2YqOF18gJp74vBmQxY",
    role: "Strategy Analyst · Office of Strategy & Growth",
    type: "Full-time",
    duration: "Feb 2026 — Present",
    location: "Bhubaneswar, Odisha, India",
    mode: "On-site",
    skills: ["Project Management", "Management"],
  },
  {
    company: "Donum",
    logo: "https://media.licdn.com/dms/image/v2/D560BAQGgJ9QaHgPWLg/company-logo_200_200/B56Zc8ESNwH8AU-/0/1749059447312?e=1778112000&v=beta&t=GZtyW84b9gUxlUHBWDzbchTh9huQC-1pIzq1QwcpxAM",
    role: "Junior Software Engineer",
    type: "Full-time",
    duration: "Nov 2025 — Present",
    location: "Bhubaneswar, Odisha, India",
    mode: "Hybrid",
    skills: ["Advertising", "Sales Management"],
  },
  {
    company: "GeeksforGeeks KIIT",
    logo: "https://media.licdn.com/dms/image/v2/C560BAQEJSyegMnJCJA/company-logo_100_100/company-logo_100_100/0/1630638010719/geeksforgeeks_kiit_logo?e=1778112000&v=beta&t=OunnmJAecnlKlPjzqf14guWQ6nbEKT0xPfmzOBunosc",
    role: "Android App Developer",
    type: "Part-time",
    duration: "Jan 2026 — Present",
    location: "Bhubaneswar, Odisha, India",
    mode: "Remote",
    skills: ["Android", "Kotlin"],
  },
  {
    company: "E Labs KIIT",
    logo: "https://media.licdn.com/dms/image/v2/C510BAQHAv5812jEytw/company-logo_100_100/company-logo_100_100/0/1631440135376/kiit_elabs_logo?e=1778112000&v=beta&t=7v-7hItwqMA5ngxETkUNrLBJeUsE3A7UEaC_ibGsjyQ",
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
    logo: "https://media.licdn.com/dms/image/v2/C4E0BAQEJ6yAnaG3CtQ/company-logo_100_100/company-logo_100_100/0/1631346049980?e=1778112000&v=beta&t=miGdKVtR3HFCJuWPMNIOxLn-dAiJ3IwMIw7vXO8qbpQ",
    role: "General Volunteer · Dhara",
    type: "Part-time",
    duration: "Sep 2025 — Present",
    location: "Bhubaneswar, Odisha, India",
    mode: "On-site",
  },
  {
    company: "CyberVault KIIT",
    logo: "https://media.licdn.com/dms/image/v2/D4E0BAQGhUF6t1oLFPA/company-logo_100_100/company-logo_100_100/0/1714757575050/kaews_logo?e=1778112000&v=beta&t=yRwwY4wPtowQJPBD0OYe96sPX3OZTv-QpZKRn_2BOls",
    role: "Marketing Team · Advertising",
    type: "Part-time",
    duration: "Aug 2025 — Present",
    location: "Bhubaneswar, Odisha, India",
    mode: "Hybrid",
  },
  {
    company: "KIIT Animal & Environment Welfare Society",
    logo: "https://media.licdn.com/dms/image/v2/D4E0BAQGhUF6t1oLFPA/company-logo_100_100/company-logo_100_100/0/1714757575050/kaews_logo?e=1778112000&v=beta&t=yRwwY4wPtowQJPBD0OYe96sPX3OZTv-QpZKRn_2BOls",
    role: "Marketing Team · Advertising & Offline Marketing",
    type: "Part-time",
    duration: "Dec 2025 — Present",
    location: "Bhubaneswar, Odisha, India",
    mode: "On-site",
  },
];
