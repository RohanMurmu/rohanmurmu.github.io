/**
 * Single source of truth for the whole site, mirroring main.tex.
 * Update this file when the CV changes; every section reads from here.
 */

export const profile = {
  name: "Youngmin Kim",
  nameKo: "김영민",
  role: "M.S. Student in Artificial Intelligence",
  affiliation: "Kim Jaechul Graduate School of AI, KAIST",
  lab: "BioImaging, Signal Processing & machine Learning Lab (BISPL)",
  advisor: "Jong Chul Ye",
  location: "Seoul, Korea",
  email: "zeromin03@kaist.ac.kr",
  github: "https://github.com/ggred0123",
  // Fill these in when you have them, or delete the line to hide the link.
  scholar: "",
  linkedin: "",
  twitter: "",
  cv: "/cv_YoungminKim.pdf",
  photo: "/face.jpg",
  bio: [
    "I am an M.S. student at the Kim Jaechul Graduate School of AI, KAIST, advised by Prof. Jong Chul Ye at BISPL. I received my B.S. in Computer Science and Engineering from Korea University in August 2026, graduating early in 3.5 years.",
    "My research centers on 3D vision and robotics — in particular, how generative models can serve as controllable world models for embodied agents. I am currently working on camera-controlled video generation, self-distilled 3D reconstruction, and action representations for Vision-Language-Action models. I also work on diffusion-based medical image enhancement.",
  ],
  interests: [
    "3D Vision",
    "Robotics",
    "Vision-Language-Action (VLA)",
    "World Action Models (WAM)",
    "Diffusion Models",
    "Generative Modeling",
    "Medical Imaging",
  ],
};

export type NewsItem = { date: string; body: string };

export const news: NewsItem[] = [
  {
    date: "Sep. 2026",
    body: "Starting my M.S. at the Kim Jaechul Graduate School of AI, KAIST, joining BISPL under Prof. Jong Chul Ye.",
  },
  {
    date: "Aug. 2026",
    body: "Received my B.S. in Computer Science and Engineering from Korea University — early graduation in 3.5 years.",
  },
  {
    date: "2026",
    body: "CRePE: Curved Ray Expectation Positional Encoding for unified-camera-controlled video generation is on arXiv.",
  },
  {
    date: "2026",
    body: "Preprint on DMD-augmented unpaired neural Schrödinger bridges for ultra-low-field MRI enhancement is on arXiv.",
  },
  {
    date: "2026",
    body: "Our ultra-low-field brain MRI enhancement method was presented at the MICCAI ULF-EnC Challenge Workshop.",
  },
  {
    date: "Jan. 2025",
    body: "Received the Academic Excellence Award from Korea University.",
  },
];

export type Publication = {
  title: string;
  authors: string[];
  equalContribution?: string[];
  venue: string;
  year: string;
  links?: { label: string; href: string }[];
};

/** Author name that gets bolded in the list. */
export const ME = "Youngmin Kim";

export const publications: Publication[] = [
  {
    title:
      "CRePE: Curved Ray Expectation Positional Encoding for Unified-Camera-Controlled Video Generation",
    authors: ["Seonghyun Jin", "Youngmin Kim", "Sunwoo Park", "Jong Chul Ye"],
    equalContribution: ["Seonghyun Jin", "Youngmin Kim", "Sunwoo Park"],
    venue: "arXiv preprint",
    year: "2026",
    links: [{ label: "arXiv:2605.12938", href: "https://arxiv.org/abs/2605.12938" }],
  },
  {
    title:
      "DMD-augmented Unpaired Neural Schrödinger Bridge for Ultra-Low Field MRI Enhancement",
    authors: [
      "Youngmin Kim",
      "Jaeyun Shin",
      "Jeongchan Kim",
      "Taehoon Lee",
      "Jaemin Kim",
      "Peter Hsu",
      "Jelle Veraart",
      "Jong Chul Ye",
    ],
    equalContribution: ["Youngmin Kim", "Jaeyun Shin", "Jeongchan Kim"],
    venue: "arXiv preprint",
    year: "2026",
    links: [{ label: "arXiv:2603.03769", href: "https://arxiv.org/abs/2603.03769" }],
  },
  {
    title:
      "Ultra-Low-Field Brain MRI Enhancement using Resfusion and Residual Artifact Suppression Network",
    authors: [
      "Youngmin Kim",
      "Jeongchan Kim",
      "Taehoon Lee",
      "Jaeyun Shin",
      "Suhyeon Lee",
      "Jong Chul Ye",
    ],
    equalContribution: ["Youngmin Kim", "Jeongchan Kim", "Taehoon Lee", "Jaeyun Shin"],
    venue: "MICCAI ULF-EnC Challenge Workshop",
    year: "2026",
  },
  {
    title:
      "Performance Analysis of Kubernetes Traffic Scheduling Algorithms in Homogeneous and Heterogeneous Environments",
    authors: ["Youngmin Kim", "Hogeon Park", "Heonchang Yu"],
    venue: "Korea Computer Congress (KCC)",
    year: "2025",
  },
  {
    title:
      "Improving Visual Question Answering via Prompt-Level Adaptation and Knowledge-Driven Fine-Tuning: Solution of Meta CRAG-MM Challenge 2025",
    authors: ["Youngmin Kim", "Wonyeong Jang", "Taehee Jeong"],
    venue: "Proceedings of the KDD Cup Workshop on CRAG-MM",
    year: "2025",
  },
];

export type Project = {
  name: string;
  org: string;
  period: string;
  note?: string;
};

export const projects: Project[] = [
  {
    name: "Self-Distilled 3D Reconstruction",
    org: "BISPL, KAIST",
    period: "Jun. 2026 – Present",
  },
  {
    name: "WAM & VLA Action RoPE",
    org: "BISPL, KAIST",
    period: "Jun. 2026 – Present",
  },
  {
    name: "Medical Foundational Model",
    org: "BISPL, KAIST",
    period: "Aug. 2025 – Mar. 2026",
  },
  {
    name: "ULF to High-field MRI Image Enhancement",
    org: "BISPL, KAIST",
    period: "Jun. 2025 – Present",
  },
  {
    name: "Short Movie Using 3D Gaussian Splatting",
    org: "Korea University",
    period: "Nov. 2025 – Dec. 2025",
  },
  {
    name: "Kaist Map",
    org: "KAIST Madcamp",
    period: "Dec. 2024 – Present",
    note: "Backend developer of the Kaist Map app.",
  },
  {
    name: "Execution Time Analysis of Kubernetes Scheduler Algorithms in Homogeneous and Heterogeneous Environments",
    org: "Distributed and Cloud Computing Lab, Korea University",
    period: "Jul. 2024 – Mar. 2025",
  },
];

export type Entry = {
  period: string;
  title: string;
  org: string;
  location: string;
  note?: string;
};

export const education: Entry[] = [
  {
    period: "Sep. 2026 – Present",
    title: "M.S. in Artificial Intelligence",
    org: "KAIST, Kim Jaechul Graduate School of AI",
    location: "Seoul, Korea",
    note: "Advisor: Jong Chul Ye · Concentration: 3D Vision and Robotics",
  },
  {
    period: "Feb. 2023 – Aug. 2026",
    title: "B.S. in Computer Science and Engineering",
    org: "Korea University",
    location: "Seoul, Korea",
    note: "GPA: 4.3 / 4.5 · Advisor: Jaehoon Lee · Early graduation (3.5 years)",
  },
];

export const experience: Entry[] = [
  {
    period: "Sep. 2026 – Present",
    title: "Graduate Researcher",
    org: "BISPL, KAIST",
    location: "Daejeon, Korea",
    note: "Advisor: Jong Chul Ye",
  },
  {
    period: "Jun. 2025 – Aug. 2026",
    title: "Research Intern",
    org: "BISPL, KAIST",
    location: "Daejeon, Korea",
    note: "Advisor: Jong Chul Ye",
  },
  {
    period: "Jun. 2024 – Jun. 2025",
    title: "Research Intern",
    org: "Distributed and Cloud Computing Lab, Korea University",
    location: "Seoul, Korea",
    note: "Network latency in Kubernetes.",
  },
];

export type Award = { date: string; title: string; org: string; note?: string };

export const awards: Award[] = [
  {
    date: "Jan. 2025",
    title: "Academic Excellence Award",
    org: "Korea University",
  },
  {
    date: "2024 – 2025",
    title: "Semester Highest Honors (×3)",
    org: "Korea University",
    note: "Feb. 2025, Aug. 2024, Feb. 2024",
  },
  {
    date: "Aug. 2023",
    title: "Semester Honors",
    org: "Korea University",
  },
];

export const skills: { label: string; items: string }[] = [
  { label: "Languages", items: "Python, C++" },
  { label: "Frameworks", items: "PyTorch" },
  { label: "Simulation", items: "MuJoCo, Isaac Sim, LIBERO" },
  {
    label: "Models",
    items: "Vision-Language-Action (VLA), diffusion models, video generation models",
  },
];
