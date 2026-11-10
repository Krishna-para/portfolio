// ─────────────────────────────────────────────────────────────
// Edit everything about you here. The rest of the site reads from this file.
// Leave a link as "" to hide its button.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Krishna Para",
  pitch: "I break hard problems into small, clean ones, then ship them.",
  intro:
    "EE undergrad at NSUT Delhi who chose software on purpose. Right now I'm an AI & Dev Intern at MeitY, working on GenAI for India's digital public infrastructure. I build full-stack products with React and Node, and I practice DSA because I enjoy it.",
  status: "AI & Dev Intern at MeitY, open to SWE roles",
  email: "krishna_ug23@nsut.ac.in",
  github: "https://github.com/Krishna-para",
  linkedin: "https://www.linkedin.com/in/krishna-para/",
  resume: "", // optional: add a resume link later, or leave empty to hide the button
  location: "New Delhi, India",
  photo: "/krishna.webp", // replace public/krishna.webp to change it
};

export const about = [
  "I'm a final-year Electrical Engineering student at NSUT Delhi. Somewhere between circuits and code, I realised the part I loved most was the logic: breaking a messy problem down until the clean solution shows itself.",
  "EE taught me to think from first principles, and that's how I approach software too. I like designing systems, chasing edge cases, and writing code that still makes sense six months later.",
];

export const stats = [
  { value: "8.55", label: "CGPA at NSUT" },
  { value: "Top 10%", label: "of my EE class" },
  { value: "570+", label: "LeetCode problems solved" },
  { value: "2", label: "full-stack products shipped" },
];

export const experience = [
  {
    id: "D1",
    role: "AI & Dev Intern",
    org: "Ministry of Electronics & IT (MeitY), Government of India",
    place: "New Delhi, on-site",
    dates: "Sept 2026 – present",
    current: true,
    points: [
      "Contributing to MyScheme, the Government of India platform that helps citizens discover schemes, through R&D on a RAG-based chatbot that answers citizen queries.",
      "Researching retrieval architectures and benchmarking LLMs on cost, latency and token efficiency to guide which model goes to production.",
    ],
    tags: ["RAG", "LLM benchmarking", "GenAI"],
  },
  {
    id: "D2",
    role: "Drone GPS Antenna Design Intern",
    org: "NSUT Delhi",
    place: "New Delhi",
    dates: "May 2025 – July 2025",
    points: [
      "Designed and analysed a dielectric resonator antenna for GPS, targeting the L1 (1.575 GHz) and L5 (1.176 GHz) bands.",
      "Used high-permittivity dielectrics and defected ground structures to get multi-band resonance, then simulated and validated it in CST Studio Suite.",
    ],
    tags: ["RF design", "CST Studio Suite"],
  },
  {
    id: "D3",
    role: "Community Intern, mentor and team lead",
    org: "Social Education & Liberty Foundation (SELF)",
    place: "Delhi",
    dates: "June 2024 – July 2024",
    points: [
      "Led career counselling and personality development sessions for 35+ students, from planning the sessions to presenting them.",
    ],
    tags: ["Leadership", "Public speaking"],
  },
];

// These numbers are the fallback. The site also tries to fetch live
// numbers from LeetCode when it loads, and uses them if that works.
export const leetcode = {
  username: "Krishna_para",
  profile: "https://leetcode.com/u/Krishna_para/",
  easy: 203,
  medium: 337,
  hard: 33,
  contestRating: 1559,
  topPercent: 31.15,
  maxStreak: 83,
  activeDays: 171,
  latestBadge: "100 Days Badge 2026",
};

export const projects = [
  {
    id: "U3",
    name: "InterviewIQ",
    tagline: "AI mock interviews that start from your own resume.",
    // Screenshots live in public/projects. Add or remove entries freely.
    images: [
      { src: "/projects/interviewiq-home.webp", label: "Home" },
      { src: "/projects/interviewiq-interview.webp", label: "Live interview" },
    ],
    status: "Live in production",
    problem:
      "Generic interview prep doesn't match what you've actually built. Upload your resume, and InterviewIQ runs technical and HR rounds with the questions an interviewer would really ask you, then scores every answer.",
    built: [
      "Resume (PDF) parsing and AI-generated questions through the OpenRouter API",
      "Timed technical and HR rounds with adaptive follow-ups and instant feedback",
      "Google OAuth via Firebase plus a JWT layer for secure APIs across domains",
      "Credit-based access with Razorpay payments",
      "Performance dashboard that tracks your progress over time",
    ],
    stack: ["React", "Redux", "Express", "MongoDB", "Firebase", "OpenRouter", "Razorpay"],
    live: "https://three-interviewiq-client-1lxi.onrender.com/",
    code: "https://github.com/Krishna-para/3.interviewIQ",
  },
  {
    id: "U4",
    name: "Vingo",
    tagline: "Food delivery with three apps in one: customer, restaurant and rider.",
    images: [
      { src: "/projects/vingo-home.webp", label: "Home" },
      { src: "/projects/vingo-menu.webp", label: "Restaurant menu" },
    ],
    status: "Full-stack MERN",
    problem:
      "A delivery platform has to keep three different people in sync at once. Vingo gives customers, restaurant owners and delivery partners their own dashboards, and tracks every order live on a map.",
    built: [
      "Real-time order status and live delivery tracking on a map with Socket.io and Leaflet",
      "Orders auto-assigned to nearby delivery partners, with OTP verification at handover",
      "Location-based shop discovery with Geoapify",
      "JWT and Google sign-in, plus password reset by email OTP",
      "Razorpay checkout and Cloudinary image uploads for menus",
    ],
    stack: ["React", "Redux", "Express", "MongoDB", "Socket.io", "Leaflet", "Razorpay"],
    live: "https://vingo-frontend-k9tr.onrender.com/",
    code: "https://github.com/Krishna-para/vingo-food-delivery",
  },
];

export const skills = [
  { group: "Languages", items: ["C++", "JavaScript", "TypeScript"] },
  { group: "Frontend", items: ["React", "Redux", "Next.js", "HTML", "CSS", "Tailwind CSS"] },
  { group: "Backend", items: ["Node.js", "Express", "REST APIs", "JWT & OAuth", "Socket.io"] },
  { group: "Databases", items: ["MongoDB", "SQL", "Firebase"] },
  { group: "AI", items: ["RAG", "LLM benchmarking", "OpenRouter API"] },
  { group: "Fundamentals", items: ["DSA", "OOP", "DBMS", "Operating Systems", "Computer Networks"] },
  { group: "Tools", items: ["Git", "GitHub", "Linux", "Cloudinary", "CST Studio Suite"] },
];
