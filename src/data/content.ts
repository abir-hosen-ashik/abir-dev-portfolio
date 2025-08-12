import { PersonalInfo, Project, Experience } from "../types";
const en_nav = {
  home: "home",
  about: "about",
  projects: "projects",
  experience: "experience",
  techStack: "tech-stack",
  contact: "contact",
  resume: "resume",
};

const bn_nav = {
  home: "হোম",
  about: "সম্পর্কে",
  projects: "প্রকল্প",
  experience: "অভিজ্ঞতা",
  techStack: "প্রযুক্তি",
  contact: "যোগাযোগ",
  resume: "জীবনবৃত্তান্ত",
};

const en_personal_info = {
  name: "Abir Hosen",
  email: "abir71.hosen@gmail.com",
  phone: "+880 1310 685450",
  github: "abirdox",
  linkedin: "abirdox",
  medium: "abirdox",
  youtube: "abirdox",
  fb: "abirdox",
  gitlab: "abir-hosen",
  kaggle: "abirhosenashik",
  objective_p1:
    "I’m Abir Hosen, a full-stack software engineer from Bangladesh with over 5 years of experience building intelligent and scalable enterprise applications. I specialize in backend development using NestJS, Prisma, and Spring Boot, alongside frontend frameworks like React and AngularJS. Passionate about integrating AI technologies, I work with large language models and cutting-edge tools to create innovative solutions.",
  objective_p2:
    "I thrive on designing clean, maintainable code and crafting seamless user experiences, especially in ERP, Marketing Automation, Sound & Music, Recruiting Platform, Workflow Automation systems and complex business workflows. A dedicated learner and problem solver, I enjoy mentoring and continuously exploring new technologies to empower businesses worldwide.",
};

const bn_personal_info = {
  name: "আবির হোসেন",
  email: "abir71.hosen@gmail.com",
  phone: "+৮৮০ ১৩১০ ৬৮৫৪৫০",
  github: "abirdox",
  linkedin: "abirdox",
  medium: "abirdox",
  youtube: "abirdox",
  fb: "abirdox",
  gitlab: "abir-hosen",
  kaggle: "abirhosenashik",
  objective_p1:
    "আমি আবির হোসেন, বাংলাদেশ থেকে একজন ফুলস্ট্যাক সফটওয়্যার ইঞ্জিনিয়ার, যিনি পাঁচ বছরেরও বেশি সময় ধরে বুদ্ধিমান এবং স্কেলেবল এন্টারপ্রাইজ অ্যাপ্লিকেশন নির্মাণে অভিজ্ঞ। আমি প্রধানত ব্যাকএন্ড ডেভেলপমেন্টে দক্ষ, NestJS, Prisma, এবং Spring Boot ব্যবহার করে, পাশাপাশি React ও AngularJS এর মতো ফ্রন্টএন্ড ফ্রেমওয়ার্কেও কাজ করি। AI প্রযুক্তি একীভূত করতে আগ্রহী হয়ে, আমি বড় ভাষার মডেল এবং আধুনিক টুল ব্যবহার করে উদ্ভাবনী সমাধান তৈরি করি।",
  objective_p2:
    "আমি পরিষ্কার, রক্ষণাবেক্ষণযোগ্য কোড ডিজাইন এবং ব্যবহারকারী অভিজ্ঞতা গড়ে তোলায় মনোযোগী, বিশেষ করে ERP, মার্কেটিং অটোমেশন, সাউন্ড ও মিউজিক, রিক্রুটিং প্ল্যাটফর্ম, ওয়ার্কফ্লো অটোমেশন সিস্টেম এবং জটিল ব্যবসায়িক কাজের প্রবাহে। আমি একজন নিবেদিত শিক্ষার্থী এবং সমস্যা সমাধানকারী, যিনি মেন্টরিং পছন্দ করি এবং বিশ্বব্যাপী ব্যবসাকে ক্ষমতায়িত করার জন্য নতুন প্রযুক্তি আবিষ্কারে নিয়মিত থাকি।",
};

const en_home = {
  greeting: "Hello, I am",
  name: "Abir Hosen",
  title: "AI Engineer & Full-Stack Developer",
  subtitle: "Building Intelligence that Empowers the World",
  slogan: 'Turning ideas into intelligent, scalable solutions',
  prompt: "abir@terminal:~$",
  commands: [
    "whoami",
    "ls -la skills/",
    "cat experience.txt",
    "python ai_projects.py",
  ],
};

const bn_home = {
  greeting: "হ্যালো, আমি",
  name: "আবির হোসেন",
  title: "এআই ইঞ্জিনিয়ার ও ফুল-স্ট্যাক ডেভেলপার",
  subtitle:
    "নির্মাণ করছি - অগ্রগতির পথে বিশ্বকে নিয়ে যাওয়া স্মার্ট প্রযুক্তি",
  slogan: 'প্রযুক্তির শক্তিতে নতুন সম্ভাবনার দুয়ার উন্মোচন',
  prompt: "abir@terminal:~$",
  commands: [
    "whoami",
    "ls -la দক্ষতা/",
    "cat অভিজ্ঞতা.txt",
    "python ai_প্রকল্প.py",
  ],
};

const en_about_education = {
  title: "Education",
  items: [
    {
      degree: "MSc - Information & Communication Engineering",
      institution: "Noakhali Science & Technology University",
      year: "2023",
      location: "Noakhali, Chittagong",
    },
    {
      degree: "BSc - Information & Communication Engineering",
      institution: "Noakhali Science & Technology University",
      year: "2019",
      location: "Noakhali, Chittagong",
    },
  ],
};

const bn_about_education = {
  title: "শিক্ষাগত যোগ্যতা",
  items: [
    {
      degree: "এমএসসি - তথ্য ও যোগাযোগ প্রকৌশল",
      institution: "নোয়াখালী বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়",
      year: "২০২৩",
      location: "নোয়াখালী, চট্টগ্রাম",
    },
    {
      degree: "বিএসসি - তথ্য ও যোগাযোগ প্রকৌশল",
      institution: "নোয়াখালী বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়",
      year: "২০১৯",
      location: "নোয়াখালী, চট্টগ্রাম",
    },
  ],
};

const en_about_interests = [
  "Problem solving on HackerRank, LeetCode",
  "Writing content on Medium",
  "Kaggle contributor",
  "Theatre group member at Bangladesh Shilpakala Academy",
  // 'Film society organizer (Zero Definition)',
  // 'Video production & motion graphics'
];

const bn_about_interests = [
  "হ্যাকার র‍্যাঙ্কে ও লীট কোডে সমস্যা সমাধান",
  "মিডিয়ামে কন্টেন্ট লেখা",
  "ক্যাগলে সক্রিয় অংশগ্রহণকারী",
  "বাংলাদেশ শিল্পকলা একাডেমিতে নাট্য দলের সদস্য",
  // 'ফিল্ম সোসাইটি সংগঠক (জিরো ডেফিনিশন)',
  // 'ভিডিও প্রোডাকশন ও মোশন গ্রাফিক্স'
];

const en_about_core = [
  ["Cloud", 85],
  ["DevOps", 90],
  ["AI/ML", 95],
  ["Full-Stack", 100],
];

const bn_about_core = [
  ["Cloud", "৮৫"],
  ["DevOps", "৯০"],
  ["AI/ML", "৯৫"],
  ["Full-Stack", "১০০"],
];

const en_project_1 = {
  id: "1",
  title: "Jamahook – AI Music Generator",
  duration: "May 2025 - Present",
  description:
    "AI-powered music production enhancement feature enabling solo instrumental generation using Stable Audio open models.",
  responsibilities: [
    "Designed & developed Stable Audio-based solo music generation feature service",
    "Analyzed platform requirements and constraints to choose optimal deployment architecture",
    "Integrated into Jamahook's real-time DAW assistant system",
  ],
  techStack: ["AI/ML", "Stable Audio", "Python", "FastAPI", "Docker"],
  featured: true,
};
const bn_project_1 = {
  id: "1",
  title: "জামাহুক – এআই মিউজিক জেনারেটর",
  duration: "মে ২০২৫ - বর্তমান",
  description:
    "স্টেবল অডিও ওপেন মডেল ব্যবহার করে একক যন্ত্রসংগীত তৈরির এআই-চালিত মিউজিক প্রোডাকশন উন্নতিকরণ ফিচার।",
  responsibilities: [
    "স্টেবল অডিও-ভিত্তিক একক সংগীত তৈরির ফিচার সার্ভিস ডিজাইন ও ডেভেলপ করেছি",
    "সর্বোত্তম ডিপ্লয়মেন্ট আর্কিটেকচার নির্বাচনের জন্য প্ল্যাটফর্ম প্রয়োজনীয়তা বিশ্লেষণ করেছি",
    "জামাহুকের রিয়েল-টাইম DAW সহায়ক সিস্টেমে একীভূত করেছি",
  ],
  techStack: ["AI/ML", "Stable Audio", "Python", "FastAPI", "Docker"],
  featured: true,
};
const en_project_2 = {
  id: "2",
  title: "Chat Brokers",
  duration: "March 2025 - May 2025",
  description:
    "AI and LLM-powered broker info chat system using RAG and MCP enabled dynamic context-aware conversations.",
  responsibilities: [
    "Data ingestion and structuring pipeline for diverse broker profiles",
    "RAG and MCP toolset enabling intelligent comparison and recommendations",
    "End-to-end system architecture and data modeling",
  ],
  techStack: ["LangChain", "RAG", "MCP", "Python", "FastAPI", "PostgreSQL"],
  featured: true,
};
const bn_project_2 = {
  id: "2",
  title: "চ্যাট ব্রোকার্স",
  duration: "মার্চ ২০২৫ - মে ২০২৫",
  description:
    "RAG এবং MCP ব্যবহার করে গতিশীল প্রসঙ্গ-সচেতন কথোপকথন সক্ষম এআই এবং LLM-চালিত ব্রোকার তথ্য চ্যাট সিস্টেম।",
  responsibilities: [
    "বিভিন্ন ব্রোকার প্রোফাইলের জন্য ডেটা ইনজেশন এবং স্ট্রাকচারিং পাইপলাইন",
    "বুদ্ধিমান তুলনা এবং সুপারিশ সক্ষম RAG এবং MCP টুলসেট",
    "এন্ড-টু-এন্ড সিস্টেম আর্কিটেকচার এবং ডেটা মডেলিং",
  ],
  techStack: ["LangChain", "RAG", "MCP", "Python", "FastAPI", "PostgreSQL"],
  featured: true,
};
const en_project_3 = {
  id: "3",
  title: "Cannella Recruitment Service (AI)",
  duration: "Feb 2025 - April 2025",
  description:
    "AI-powered job platform that streamlines hiring by intelligently matching job requirements with applicant CVs.",
  responsibilities: [
    "Developed AI models to analyze and match job requirements with CVs",
    "Implemented machine learning algorithms for candidate-job ranking",
    "Optimized system for accurate and efficient job matching",
  ],
  techStack: [
    "Machine Learning",
    "NLP",
    "Python",
    "Scikit-learn",
    "PostgreSQL",
  ],
  featured: true,
};
const bn_project_3 = {
  id: "3",
  title: "কানেলা রিক্রুটমেন্ট সার্ভিস (এআই)",
  duration: "ফেব্রুয়ারি ২০২৫ - এপ্রিল ২০২৫",
  description:
    "এআই-চালিত জব প্ল্যাটফর্ম যা চাকরির চাহিদা এবং আবেদনকারীর সিভি বুদ্ধিমত্তার সাথে মিলিয়ে নিয়োগ প্রক্রিয়াকে সহজ করে।",
  responsibilities: [
    "চাকরির চাহিদা ও সিভি বিশ্লেষণ ও মিলানোর জন্য এআই মডেল তৈরি",
    "প্রার্থী-চাকরি র‍্যাংকিংয়ের জন্য মেশিন লার্নিং অ্যালগরিদম প্রয়োগ",
    "নির্ভুল ও কার্যকরী জব ম্যাচিংয়ের জন্য সিস্টেম অপ্টিমাইজেশন",
  ],
  techStack: [
    "Machine Learning",
    "NLP",
    "Python",
    "Scikit-learn",
    "PostgreSQL",
  ],
  featured: true,
};

const en_project_4 = {
  id: "4",
  title: "Query AI",
  duration: "Oct 2024 - Jan 2025",
  description:
    "NLP-based solution that generates and executes SQL queries from user prompts, bridging user intent and data insights.",
  responsibilities: [
    "Developed FastAPI backend for the project",
    "Designed and optimized PostgreSQL and pgVector for storage",
    "Responsible for complete database design",
  ],
  techStack: ["NLP", "FastAPI", "PostgreSQL", "pgVector", "Python"],
  featured: true,
};
const bn_project_4 = {
  id: "4",
  title: "কোয়েরি এআই",
  duration: "অক্টোবর ২০২৪ - জানুয়ারি ২০২৫",
  description:
    "এনএলপি-ভিত্তিক সমাধান যা ব্যবহারকারীর প্রম্পট থেকে এসকিউএল কোয়েরি তৈরি ও কার্যকর করে, ব্যবহারকারীর উদ্দেশ্য এবং ডেটা ইনসাইটের মধ্যে সেতুবন্ধন করে।",
  responsibilities: [
    "প্রকল্পের জন্য FastAPI ব্যাকএন্ড তৈরি",
    "সংরক্ষণের জন্য PostgreSQL ও pgVector ডিজাইন ও অপ্টিমাইজ করা",
    "সম্পূর্ণ ডাটাবেস ডিজাইনের দায়িত্ব পালন",
  ],
  techStack: ["NLP", "FastAPI", "PostgreSQL", "pgVector", "Python"],
  featured: true,
};

const en_project_5 = {
  id: "5",
  title: "MashAllah Ecommerce",
  duration: "Feb 2024 - Nov 2024",
  description:
    "A scalable e-commerce platform built with microservices and microfrontend architecture. Features modules for e-commerce, inventory management, order processing and admin controls.",
  responsibilities: [
    "Developed Spring Boot microservices and Next.js microfrontend architecture",
    "Designed and implemented PostgreSQL database schema",
    "Utilized Docker for project virtualization",
  ],
  techStack: [
    "Spring Boot",
    "Next.js",
    "PostgreSQL",
    "Docker",
    "Microservices",
  ],
  featured: false,
};
const bn_project_5 = {
  id: "5",
  title: "মাশআল্লাহ ই-কমার্স",
  duration: "ফেব্রুয়ারি ২০২৪ - নভেম্বর ২০২৪",
  description:
    "মাইক্রোসার্ভিস ও মাইক্রোফ্রন্টএন্ড আর্কিটেকচারে তৈরি একটি স্কেলযোগ্য ই-কমার্স প্ল্যাটফর্ম। ই-কমার্স, ইনভেন্টরি ম্যানেজমেন্ট, অর্ডার প্রসেসিং এবং অ্যাডমিন কন্ট্রোলের মডিউলগুলো অন্তর্ভুক্ত।",
  responsibilities: [
    "Spring Boot মাইক্রোসার্ভিস ও Next.js মাইক্রোফ্রন্টএন্ড আর্কিটেকচার ডেভেলপ করা",
    "PostgreSQL ডাটাবেস স্কিমা ডিজাইন ও ইমপ্লিমেন্ট করা",
    "প্রকল্প ভার্চুয়ালাইজেশনের জন্য Docker ব্যবহার করা",
  ],
  techStack: [
    "Spring Boot",
    "Next.js",
    "PostgreSQL",
    "Docker",
    "Microservices",
  ],
  featured: false,
};

const en_project_6 = {
  id: "6",
  title: "Singistic",
  duration: "March 2023 - Aug 2023",
  description:
    "An online karaoke app for Web, Android and iOS users with a wide range of songs in multiple languages.",
  responsibilities: [
    "Developed backend with NestJS and DynamoDB",
    "Implemented audio processing using ffmpeg, Spleeter and ImageMagick",
    "Managed file storage with AWS S3",
  ],
  techStack: ["NestJS", "DynamoDB", "AWS S3", "FFmpeg", "Spleeter"],
  featured: false,
};
const bn_project_6 = {
  id: "6",
  title: "সিংগিস্টিক",
  duration: "মার্চ ২০২৩ - আগস্ট ২০২৩",
  description:
    "ওয়েব, অ্যান্ড্রয়েড এবং iOS ব্যবহারকারীদের জন্য অনলাইন কারাওকে অ্যাপ, যা একাধিক ভাষায় বিস্তৃত গান সমর্থন করে।",
  responsibilities: [
    "NestJS এবং DynamoDB দিয়ে ব্যাকএন্ড ডেভেলপ করা",
    "ffmpeg, Spleeter এবং ImageMagick ব্যবহার করে অডিও প্রসেসিং বাস্তবায়ন",
    "AWS S3 দিয়ে ফাইল সংরক্ষণ ব্যবস্থাপনা করা",
  ],
  techStack: ["NestJS", "DynamoDB", "AWS S3", "FFmpeg", "Spleeter"],
  featured: false,
};

const en_project_7 = {
  id: "7",
  title: "Probashkormi",
  duration: "Aug 2023 - Ongoing",
  description:
    "Recruitment management system for individuals seeking jobs abroad, eliminating middlemen.",
  responsibilities: [
    "Developed backend with NestJS, Prisma, GraphQL and MongoDB",
    "Integrated AWS S3 for file storage",
    "Responsible for complete DB design and API pipeline",
  ],
  techStack: ["NestJS", "GraphQL", "MongoDB", "AWS S3", "Prisma"],
  featured: false,
};
const bn_project_7 = {
  id: "7",
  title: "প্রবাসকর্মী",
  duration: "আগস্ট ২০২৩ - চলমান",
  description:
    "বিদেশে চাকরি খোঁজার জন্য ব্যক্তিদের জন্য রিক্রুটমেন্ট ম্যানেজমেন্ট সিস্টেম, মধ্যস্বত্বভোগীদের সরিয়ে।",
  responsibilities: [
    "NestJS, Prisma, GraphQL এবং MongoDB দিয়ে ব্যাকএন্ড ডেভেলপ করা",
    "ফাইল সংরক্ষণের জন্য AWS S3 ইন্টিগ্রেট করা",
    "সম্পূর্ণ ডাটাবেস ডিজাইন এবং API পাইপলাইন এর দায়িত্বে ছিলাম",
  ],
  techStack: ["NestJS", "GraphQL", "MongoDB", "AWS S3", "Prisma"],
  featured: false,
};

const en_project_8 = {
  id: "8",
  title: "SoftCollab",
  duration: "April 2023 - Ongoing",
  description:
    "A platform for sharing and collaborating on music files between producers and musicians.",
  responsibilities: [
    "Upgraded backend using ExpressJS, SocketIO and MySQL",
    "Utilized ffmpeg and ImageMagick for audio processing",
    "Integrated AWS S3 for file management",
  ],
  techStack: ["ExpressJS", "SocketIO", "MySQL", "AWS S3", "FFmpeg"],
  featured: false,
};
const bn_project_8 = {
  id: "8",
  title: "সফটকোল্যাব",
  duration: "এপ্রিল ২০২৩ - চলমান",
  description:
    "প্রযোজক ও সঙ্গীতশিল্পীদের মধ্যে মিউজিক ফাইল শেয়ারিং ও সহযোগিতার জন্য একটি প্ল্যাটফর্ম।",
  responsibilities: [
    "ExpressJS, SocketIO এবং MySQL ব্যবহার করে ব্যাকএন্ড উন্নত করা",
    "অডিও প্রসেসিংয়ের জন্য ffmpeg ও ImageMagick ব্যবহার করা",
    "ফাইল ব্যবস্থাপনার জন্য AWS S3 ইন্টিগ্রেট করা",
  ],
  techStack: ["ExpressJS", "SocketIO", "MySQL", "AWS S3", "FFmpeg"],
  featured: false,
};

const en_project_9 = {
  id: "9",
  title: "Cloud Infra",
  duration: "May 2021 - July 2022",
  description:
    "Cloud server management platform designed to streamline the management of web servers for business owners. Offers automated backups, server monitoring and deployment tools.",
  responsibilities: [
    "Developed frontend using ReactJS, Redux and Axios",
    "Worked with Docker for project virtualization",
    "Integrated Keycloak for SSO",
  ],
  techStack: ["ReactJS", "Redux", "Docker", "Keycloak", "Axios"],
  featured: false,
};
const bn_project_9 = {
  id: "9",
  title: "ক্লাউড ইনফ্রা",
  duration: "মে ২০২১ - জুলাই ২০২২",
  description:
    "ব্যবসার মালিকদের জন্য ওয়েব সার্ভার ব্যবস্থাপনাকে সহজতর করার জন্য ডিজাইনকৃত ক্লাউড সার্ভার ম্যানেজমেন্ট প্ল্যাটফর্ম। স্বয়ংক্রিয় ব্যাকআপ, সার্ভার মনিটরিং এবং ডিপ্লয়মেন্ট টুল সরবরাহ করে।",
  responsibilities: [
    "ReactJS, Redux এবং Axios দিয়ে ফ্রন্টএন্ড ডেভেলপ করা",
    "প্রকল্প ভার্চুয়ালাইজেশনের জন্য Docker ব্যবহার করা",
    "SSO এর জন্য Keycloak ইন্টিগ্রেট করা",
  ],
  techStack: ["ReactJS", "Redux", "Docker", "Keycloak", "Axios"],
  featured: false,
};

const en_project_10 = {
  id: "10",
  title: "Roboket - Marketing Automation System",
  duration: "Feb 2021 - March 2023",
  description:
    "Marketing automation software that integrates lead-generation tools with social media and communication platforms.",
  responsibilities: [
    "Upgraded backend in microservice architecture using FastAPI",
    "Worked with Keycloak for SSO and Docker for project virtualization",
    "Managed frontend components using ReactJS and Redux",
  ],
  techStack: ["FastAPI", "ReactJS", "Redux", "Keycloak", "Docker"],
  featured: false,
};
const bn_project_10 = {
  id: "10",
  title: "রোবোকেট - মার্কেটিং অটোমেশন সিস্টেম",
  duration: "ফেব্রুয়ারি ২০২১ - মার্চ ২০২৩",
  description:
    "মার্কেটিং অটোমেশন সফটওয়্যার যা লিড-জেনারেশন টুলগুলোকে সোশ্যাল মিডিয়া এবং যোগাযোগ প্ল্যাটফর্মের সাথে একত্রিত করে।",
  responsibilities: [
    "FastAPI ব্যবহার করে মাইক্রোসার্ভিস আর্কিটেকচারে ব্যাকএন্ড আপগ্রেড করা",
    "SSO এর জন্য Keycloak এবং প্রকল্প ভার্চুয়ালাইজেশনের জন্য Docker ব্যবহার করা",
    "ReactJS ও Redux দিয়ে ফ্রন্টএন্ড কম্পোনেন্টস পরিচালনা করা",
  ],
  techStack: ["FastAPI", "ReactJS", "Redux", "Keycloak", "Docker"],
  featured: false,
};

const en_project_11 = {
  id: "11",
  title: "Tiger ERP",
  duration: "Jan 2020 - Jan 2021",
  description:
    "Enterprise resource planning (ERP) solution designed to manage various business operations like inventory, sales, procurement and accounting.",
  responsibilities: [
    "Developed both backend and frontend with Spring Boot and AngularJS",
    "Designed database schema and created custom queries",
    "Developed secure authentication and API pipeline using JWT",
  ],
  techStack: ["Spring Boot", "AngularJS", "JWT", "MySQL", "Maven"],
  featured: false,
};
const bn_project_11 = {
  id: "11",
  title: "টাইগার ইআরপি",
  duration: "জানুয়ারি ২০২০ - জানুয়ারি ২০২১",
  description:
    "এন্টারপ্রাইজ রিসোর্স প্ল্যানিং (ERP) সমাধান যা বিভিন্ন ব্যবসায়িক অপারেশন যেমন ইনভেন্টরি, বিক্রয়, ক্রয় এবং হিসাব পরিচালনা করার জন্য ডিজাইন করা হয়েছে।",
  responsibilities: [
    "Spring Boot ও AngularJS ব্যবহার করে ব্যাকএন্ড ও ফ্রন্টএন্ড ডেভেলপ করা",
    "ডাটাবেস স্কিমা ডিজাইন এবং কাস্টম কুয়েরি তৈরি করা",
    "JWT ব্যবহার করে নিরাপদ অথেনটিকেশন এবং API পাইপলাইন ডেভেলপ করা",
  ],
  techStack: ["Spring Boot", "AngularJS", "JWT", "MySQL", "Maven"],
  featured: false,
};

const en_projects = {
  title: "Featured Projects",
  subTitle:
    "Showcasing innovative solutions in AI, full-stack development, and cloud architecture",
  allTitle: "All Projects",
  viewAll: "View All Projects",
  filters: {
    all: "All Projects",
    featured: "Featured",
    main: "Main Projects",
  },
  items: [
    en_project_1,
    en_project_2,
    en_project_3,
    en_project_4,
    en_project_5,
    en_project_6,
    en_project_7,
    en_project_8,
    en_project_9,
    en_project_10,
    en_project_11,
  ] as Project[],
};

const bn_projects = {
  title: "বিশেষ প্রকল্পসমূহ",
  subTitle: "এআই, ফুলস্ট্যাক, এবং ক্লাউড আর্কিটেকচারে উদ্ভাবনী কাজের প্রদর্শনী",
  allTitle: "সকল প্রকল্প",
  viewAll: "সকল প্রকল্প দেখুন",
  filters: {
    all: "সকল প্রকল্প",
    featured: "বিশেষ",
    main: "মূল প্রকল্প",
  },
  items: [
    bn_project_1,
    bn_project_2,
    bn_project_3,
    bn_project_4,
    bn_project_5,
    bn_project_6,
    bn_project_7,
    bn_project_8,
    bn_project_9,
    bn_project_10,
    bn_project_11,
  ] as Project[],
};
const en_experience_1 = {
  id: "1",
  company: "Embedded Logic Operation (ELO)",
  position: "Software Engineer (Full Stack Developer)",
  location: "Dhaka, BD",
  duration: "March 2023 – Present",
  responsibilities: [
    "Developing, optimizing and extending existing and new software",
    "Producing clean, efficient code based on specifications",
    "Verifying and deploying programs and systems",
    "Ensuring fast render and bug-free code",
    "Maintaining Agile Scrum in development life cycle",
  ],
};
const bn_experience_1 = {
  id: "1",
  company: "এমবেডেড লজিক অপারেশন (ELO)",
  position: "সফটওয়্যার ইঞ্জিনিয়ার (ফুল স্ট্যাক ডেভেলপার)",
  location: "ঢাকা, বাংলাদেশ",
  duration: "মার্চ ২০২৩ – বর্তমান",
  responsibilities: [
    "বিদ্যমান এবং নতুন সফটওয়্যার ডেভেলপ, অপটিমাইজ এবং সম্প্রসারণ করা",
    "স্পেসিফিকেশন অনুযায়ী পরিষ্কার, দক্ষ কোড তৈরি করা",
    "প্রোগ্রাম এবং সিস্টেম যাচাই এবং ডিপ্লয় করা",
    "দ্রুত রেন্ডার এবং বাগ-মুক্ত কোড নিশ্চিত করা",
  ],
};
const en_experience_2 = {
  id: "2",
  company: "ADN Diginet",
  position: "Software Engineer (Full Stack Developer)",
  location: "Dhaka, BD",
  duration: "February 2021 – March 2023",
  responsibilities: [
    "Responsible for optimizing and extending existing software",
    "Ensuring fast render and fresh bug-free code",
    "Maintaining Agile Scrum in development life cycle",
    "Actively participating in database design and project planning",
  ],
};
const bn_experience_2 = {
  id: "2",
  company: "ADN ডিজিনেট",
  position: "সফটওয়্যার ইঞ্জিনিয়ার (ফুল স্ট্যাক ডেভেলপার)",
  location: "ঢাকা, বাংলাদেশ",
  duration: "ফেব্রুয়ারি ২০২১ – মার্চ ২০২৩",
  responsibilities: [
    "বিদ্যমান সফটওয়্যার অপ্টিমাইজ ও সম্প্রসারণের দায়িত্বে ছিলেন",
    "দ্রুত রেন্ডার এবং বাগ-মুক্ত কোড নিশ্চিত করা",
    "ডেভেলপমেন্ট লাইফ সাইকেলে Agile Scrum বজায় রাখা",
    "ডাটাবেস ডিজাইন এবং প্রকল্প পরিকল্পনায় সক্রিয় অংশগ্রহণ",
  ],
};

const en_experience_3 = {
  id: "3",
  company: "Tiger ERP",
  position: "Java Developer (Full Stack Developer)",
  location: "Dhaka, BD",
  duration: "January 2020 – January 2021",
  responsibilities: [
    "Requirement analysis and project development",
    "Active participation in database design and project planning",
    "Testing, analyzing, and debugging software",
    "Maintaining Agile Scrum in development life cycle",
  ],
};

const bn_experience_3 = {
  id: "3",
  company: "টাইগার ইআরপি",
  position: "জাভা ডেভেলপার (ফুল স্ট্যাক ডেভেলপার)",
  location: "ঢাকা, বাংলাদেশ",
  duration: "জানুয়ারি ২০২০ – জানুয়ারি ২০২১",
  responsibilities: [
    "রিকোয়ারমেন্ট বিশ্লেষণ এবং প্রকল্প উন্নয়ন",
    "ডাটাবেস ডিজাইন এবং প্রকল্প পরিকল্পনায় সক্রিয় অংশগ্রহণ",
    "সফটওয়্যার টেস্টিং, বিশ্লেষণ এবং ডিবাগিং",
    "ডেভেলপমেন্ট লাইফ সাইকেলে Agile Scrum বজায় রাখা",
  ],
};

const en_experience = {
  title: "Professional Experience",
  subTitle: "A journey through innovative companies",
  allTitle: "Complete Work Experience",
  viewAll: "View All Experience",
  items: [en_experience_1, en_experience_2, en_experience_3] as Experience[],
};
const bn_experience = {
  title: "পেশাগত অভিজ্ঞতা",
  subTitle: "উদ্ভাবনী কোম্পানি ও প্রতিষ্ঠানে অংশগ্রহণ",
  allTitle: "সম্পূর্ণ কর্ম অভিজ্ঞতা",
  viewAll: "সকল অভিজ্ঞতা দেখুন",
  items: [bn_experience_1, bn_experience_2, bn_experience_3] as Experience[],
};

const en_tech_stack_categories_ai = {
  title: "AI & Machine Learning",
  skills: [
    "Scikit-learn",
    "TensorFlow",
    "Hugging Face",
    "SpaCy",
    "LangChain",
    "RAG",
    "FAISS",
    "MCP",
    "OpenAI",
    "Gemini",
  ],
};

const bn_tech_stack_categories_ai = {
  title: "এআই ও মেশিন লার্নিং",
  skills: [
    "Scikit-learn",
    "TensorFlow",
    "Hugging Face",
    "SpaCy",
    "LangChain",
    "RAG",
    "FAISS",
    "MCP",
    "OpenAI",
    "Gemini",
  ],
};

const en_tech_stack_categories_backend = {
  title: "Backend Development",
  skills: [
    "NestJS",
    "ExpressJS",
    "FastAPI",
    "Spring Boot",
    "GraphQL",
    "RESTful APIs",
    "Microservices",
  ],
};

const bn_tech_stack_categories_backend = {
  title: "ব্যাকএন্ড ডেভেলপমেন্ট",
  skills: [
    "NestJS",
    "ExpressJS",
    "FastAPI",
    "Spring Boot",
    "GraphQL",
    "RESTful APIs",
    "Microservices",
  ],
};

const en_tech_stack_categories_frontend = {
  title: "Frontend Development",
  skills: [
    "ReactJS",
    "NextJS",
    "TypeScript",
    "Redux",
    "AngularJS",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
  ],
};

const bn_tech_stack_categories_frontend = {
  title: "ফ্রন্টএন্ড ডেভেলপমেন্ট",
  skills: [
    "ReactJS",
    "NextJS",
    "TypeScript",
    "Redux",
    "AngularJS",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
  ],
};

const en_tech_stack_categories_database = {
  title: "Databases",
  skills: ["PostgreSQL", "pgVector", "MongoDB", "MySQL", "DynamoDB", "Redis"],
};
const bn_tech_stack_categories_database = {
  title: "ডেটাবেস",
  skills: ["PostgreSQL", "pgVector", "MongoDB", "MySQL", "DynamoDB", "Redis"],
};

const en_tech_stack_categories_cloud = {
  title: "Cloud & DevOps",
  skills: [
    "AWS",
    "Docker",
    "Kubernetes",
    "CI/CD",
    "Microservices",
    "Serverless",
  ],
};

const bn_tech_stack_categories_cloud = {
  title: "ক্লাউড ও ডেভঅপস",
  skills: [
    "AWS",
    "Docker",
    "Kubernetes",
    "CI/CD",
    "Microservices",
    "Serverless",
  ],
};
const en_tech_stack_categories_tools = {
  title: "Tools & Others",
  skills: [
    "Git",
    "Keycloak",
    "Socket.IO",
    "FFmpeg",
    "ImageMagick",
    "Prisma",
    "Maven",
  ],
};
const bn_tech_stack_categories_tools = {
  title: "টুলস ও অন্যান্য",
  skills: [
    "Git",
    "Keycloak",
    "Socket.IO",
    "FFmpeg",
    "ImageMagick",
    "Prisma",
    "Maven",
  ],
};

const en_contacts = {
  title: "Get In Touch",
  subtitle: "Let's build something amazing together",
  form: {
    name: "Name",
    email: "Email",
    subject: "Subject",
    message: "Message",
    send: "Send Message",
  },
  social: {
    title: "Connect with me",
  },
};
const bn_contacts = {
  title: "যোগাযোগ করুন",
  subtitle: "চলুন একসাথে দুর্দান্ত কিছু তৈরি করি",
  form: {
    name: "নাম",
    email: "ইমেইল",
    subject: "বিষয়",
    message: "বার্তা",
    send: "বার্তা পাঠান",
  },
  social: {
    title: "আমার সাথে যুক্ত হন",
  },
};

const en_ui = {
  downloadResume: "Download Resume",
  viewProject: "View Project",
  learnMore: "Learn More",
  backToTop: "Back to Top",
  theme: "Theme",
  language: "Language",
  loading: "Loading...",
  copied: "Copied!",
  core_expertise: "Core Expertise",
  beyond_coding: "Beyond Coding",
  key_responsibilities: "Key Responsibilities",
  proficiency_overview: "Proficiency Overview",
  get_in_touch: "Get In Touch",
  send_message: "Send Message",
  expert_level: "Expert Level",
  advance: "Advanced",
  intermediate: "Intermediate",
  phone: "Phone",
  terminal: {
    prompt: "abir@portfolio:~$",
    welcome: "Welcome to Abir's Terminal Portfolio",
    type: 'Type "help" to see available commands',
  },
};

const bn_ui = {
  downloadResume: "ক্যারিয়ার সারসংক্ষেপ ডাউনলোড",
  viewProject: "প্রকল্প দেখুন",
  learnMore: "আরো জানুন",
  backToTop: "উপরে ফিরুন",
  theme: "থিম",
  language: "ভাষা",
  loading: "লোড হচ্ছে...",
  copied: "কপি হয়েছে!",
  core_expertise: "প্রধান দক্ষতা",
  beyond_coding: "কোডিং এর বাইরে যা করি",
  key_responsibilities: "প্রধান দায়িত্বসমূহ",
  proficiency_overview: "দক্ষতার সাধারণ চিত্র",
  get_in_touch: "যোগাযোগ করুন",
  send_message: "বার্তা পাঠান",
  expert_level: "বিশেষজ্ঞ স্তর",
  advance: "উন্নত",
  intermediate: "মধ্যম",
  phone: "ফোন",
  terminal: {
    prompt: "abir@portfolio:~$",
    welcome: "আবিরের টার্মিনাল পোর্টফোলিওতে স্বাগতম",
    type: 'উপলব্ধ কমান্ড দেখতে "help" টাইপ করুন',
  },
};

export const content = {
  en: {
    nav: en_nav,
    personalInfo: en_personal_info as PersonalInfo,
    home: en_home,
    about: {
      title: "About Me",
      education: en_about_education,
      interests: en_about_interests,
      core: en_about_core,
    },
    projects: en_projects,
    experience: en_experience,
    techStack: {
      title: "Technical Arsenal",
      subTitle:
        "Cutting-edge technologies and tools that power modern solutions",
      categories: {
        ai: en_tech_stack_categories_ai,
        backend: en_tech_stack_categories_backend,
        frontend: en_tech_stack_categories_frontend,
        database: en_tech_stack_categories_database,
        cloud: en_tech_stack_categories_cloud,
        tools: en_tech_stack_categories_tools,
      },
    },
    contact: en_contacts,
    ui: en_ui,
  },

  bn: {
    nav: bn_nav,
    personalInfo: bn_personal_info as PersonalInfo,
    home: bn_home,
    about: {
      title: "আমার সম্পর্কে",
      education: bn_about_education,
      interests: bn_about_interests,
      core: bn_about_core,
    },
    projects: bn_projects,
    experience: bn_experience,
    techStack: {
      title: "প্রযুক্তিগত দক্ষতা",
      subTitle:
        "আমি যেসব সর্বাধুনিক প্রযুক্তি ও সরঞ্জাম ব্যবহার করি, যা আধুনিক সমাধানগুলিকে চালনা করে",
      categories: {
        ai: bn_tech_stack_categories_ai,
        backend: bn_tech_stack_categories_backend,
        frontend: bn_tech_stack_categories_frontend,
        database: bn_tech_stack_categories_database,
        cloud: bn_tech_stack_categories_cloud,
        tools: bn_tech_stack_categories_tools,
      },
    },
    contact: bn_contacts,
    ui: bn_ui,
  },
};
