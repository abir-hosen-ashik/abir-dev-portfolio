import { PersonalInfo, Project, Experience } from "../types";

export const resume_url =
  "https://tlapmuaszjrzkzccrxkg.supabase.co/storage/v1/object/public/public-bucket/Resume%20-%20Abir%20Hosen.pdf";

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

const en_about_me = {
  filters: {
    general: "General",
    client: "Client",
  },
  who_am_i: "Who Am I?",
  what_i_want: "What I want?",
  what_i_offer: "What I Offer?",
  what_i_can_do: "What I can do?",
  why_i_am_important: "Why I am important for you?",
  objective:
    "With over 5 years of experience in backend infrastructure advancement, complemented by 3 years in responsive, pixelperfect frontend engineering and a deep theoretical understanding of AI, paired with 1 year of LLM-focused industry work, I characterize myself as a Full-Spectrum Software Engineer specializing in end-to-end development, deployment and maintenance. I aim to drive the development of secure, maintainable, high-performing systems while contributing to technical decisions, aligning engineering with business goals, and innovating with modern technologies. My expertise in ERP, recruiting platforms, lead generation, sales and marketing automation, dynamic multimedia handling, and Agentic AI development using LLM, RAG, and MCP, combined with skills in database design, clean modular architecture, CI/CD, secure REST/GraphQL APIs, real-time socket systems, event-driven microservices, and translating complex business requirements, enables the delivery of high-impact applications that advance organizational goals.",
  general: {
    who_am_i: [
      "With over 5 years of hands-on experience in backend infrastructure advancement, I have consistently contributed to the design, development, and optimization of scalable enterprise systems. This journey is complemented by 3 years of expertise in building responsive, pixel-perfect frontend applications that deliver seamless user experiences. Beyond software engineering fundamentals, I hold a deep theoretical foundation in Artificial Intelligence, further strengthened by 1 year of practical, industry-level work focused on large language models (LLMs).",
      "I characterize myself as a Full-Spectrum Software Engineer, specializing in end-to-end development, deployment, and long-term maintenance. My work spans backend services, frontend interfaces, and AI-powered solutions, allowing me to bridge the gap between technical execution and business value. I thrive in environments where innovation, scalability, and reliability are critical, and I bring a problem-solving mindset that balances immediate needs with long-term architectural vision.",
    ],
    what_i_want: [
      "I aspire to contribute not only as a developer but as a strategic partner in shaping technical direction and delivering impactful solutions. My goal is to drive the development of secure, maintainable, and high-performing systems while actively engaging in technical decision-making and architectural planning. I seek opportunities where I can align engineering efforts with broader business goals, ensuring that technology serves as a direct enabler of growth and innovation.",
      "I want to play a central role in mentoring developers, leading teams, and managing complex projects, fostering a culture of collaboration and knowledge-sharing. Beyond code, I aim to optimize enterprise-grade applications for scalability, reliability, and high availability, while continuously improving security practices and compliance awareness.",
      "Equally, I am driven to stay ahead of the curve by introducing modern tools, frameworks, and methodologies, carefully balancing technical debt with the pursuit of new features. Ultimately, I want to contribute to building sustainable engineering practices that not only solve immediate challenges but also set a long-term technology roadmap aligned with the company’s vision.",
    ],
    what_i_offer: [
      "I bring a unique combination of technical expertise, cross-domain experience, and business-oriented thinking that enables me to deliver software solutions with both immediate impact and long-term value. My track record spans diverse domains including ERP systems, recruiting platforms, lead generation tools, sales and marketing automation, dynamic multimedia processing, and Agentic AI development leveraging cutting-edge techniques such as LLMs, Retrieval-Augmented Generation (RAG), and Model Context Protocol (MCP).",
      "On the engineering side, I specialize in database schema design, clean and modular architecture, and scalable backend systems, complemented by skills in building secure REST/GraphQL APIs, real-time socket-based applications, and event-driven microservices. I am proficient in setting up CI/CD pipelines and DevOps workflows, ensuring smooth delivery, deployment, and long-term maintainability of applications.",
      "What truly differentiates me is my ability to translate complex business requirements into robust, production-grade technical solutions. By collaborating with stakeholders and cross-functional teams, I ensure that engineering outcomes align with organizational goals, whether the focus is on optimizing performance, improving reliability, or innovating with modern technologies.",
      "In short, I offer the expertise to design, build, and scale high-impact applications, while also providing the vision, adaptability, and problem-solving mindset needed to advance both technical excellence and business success.",
    ],
  },
  client: {
    who_am_i: [
      "I am a full-spectrum software engineer who understands both business needs and technical solutions. For over 5 years, I have worked on designing and developing backend systems that ensure enterprise data and services are secure, fast, and reliable. Alongside this, I have over 3 years of experience in frontend or user interface design, creating applications that are easy, visually appealing, and efficient for users.",
      "I have also worked with Artificial Intelligence (AI) and Large Language Models (LLMs), which allows me to leverage technology for complex data analysis, automation, and decision-making to benefit your business.",
    ],
    what_i_can_do: [
      "I develop software that makes your business operations faster, safer, and easier. For example, I can create ERP systems, recruiting platforms, lead generation tools, and sales & marketing automation, helping your team save time and achieve better results. Additionally, I can develop multimedia, video, or audio processing solutions and AI-powered smart applications to make your business more modern and efficient.",
      "I ensure that your software is secure, user-friendly, and sustainable over time. I can provide customized solutions tailored to your business needs, allowing you to focus on achieving your goals.",
    ],
    why_i_am_important: [
      "I don’t just write code—I understand business problems and solve them through technology. The core focus of my work is:",
      [
        "Keeping data and information secure",
        "Ensuring software is fast and reliable",
        "Adding new features and fixing existing issues",
        "Making your team’s work easier",
      ],
      "As a client, you want software that is long-lasting, user-friendly, secure, and high-quality. I am here to make sure your technology achieves these goals.",
    ],
  },
};

const bn_about_me = {
  filters: {
    general: "General",
    client: "Client",
  },
  who_am_i: "আমি কে?",
  what_i_want: "আমার লক্ষ্য কী?",
  what_i_offer: "আমি কী অফার করতে পারি?",
  what_i_can_do: "আমি কি করতে পারি?",
  why_i_am_important: "কেন আমি আপনার জন্য গুরুত্বপূর্ণ?",
  objective:
    "ব্যাকএন্ড ইনফ্রাস্ট্রাকচার উন্নয়নে ৫ বছরেরও বেশি অভিজ্ঞতা, তার সাথে ৩ বছরের রেসপন্সিভ ও পিক্সেল-নিখুঁত ফ্রন্টএন্ড ইঞ্জিনিয়ারিং দক্ষতা এবং কৃত্রিম বুদ্ধিমত্তায় গভীর তাত্ত্বিক জ্ঞান, যা ১ বছরের LLM-ভিত্তিক ইন্ডাস্ট্রি অভিজ্ঞতার মাধ্যমে আরও দৃঢ় হয়েছে—এসবের সমন্বয়ে আমি নিজেকে একটি ফুল-স্পেকট্রাম সফটওয়্যার ইঞ্জিনিয়ার হিসেবে পরিচিত করি, যিনি end-to-end ডেভেলপমেন্ট, ডিপ্লয়মেন্ট ও মেইনটেন্যান্স-এ বিশেষজ্ঞ। আমার লক্ষ্য হলো নিরাপদ, রক্ষণাবেক্ষণযোগ্য এবং উচ্চ-কার্যক্ষম সিস্টেম নির্মাণ করা, যেখানে আমি প্রযুক্তিগত সিদ্ধান্ত গ্রহণে অবদান রাখতে পারি, ইঞ্জিনিয়ারিং কার্যক্রমকে ব্যবসার লক্ষ্যগুলোর সাথে সামঞ্জস্য করতে পারি এবং আধুনিক প্রযুক্তি ব্যবহার করে নতুনত্ব আনতে পারি। ERP, রিক্রুটিং প্ল্যাটফর্ম, লিড জেনারেশন, সেলস ও মার্কেটিং অটোমেশন, ডাইনামিক মাল্টিমিডিয়া প্রসেসিং এবং LLM, RAG ও MCP ব্যবহার করে এজেন্টিক এআই ডেভেলপমেন্ট-এ আমার অভিজ্ঞতা, সাথে ডাটাবেস ডিজাইন, পরিচ্ছন্ন মডুলার আর্কিটেকচার, CI/CD, নিরাপদ REST/GraphQL API, রিয়েল-টাইম সকেট সিস্টেম, ইভেন্ট-ড্রিভেন মাইক্রোসার্ভিস এবং জটিল ব্যবসায়িক চাহিদাকে প্রযুক্তিগত সমাধানে রূপান্তরের দক্ষতা—এসব মিলিয়ে আমি এমন উচ্চ-প্রভাবসম্পন্ন অ্যাপ্লিকেশন তৈরি করতে পারি, যা প্রতিষ্ঠানকে তাদের লক্ষ্য অর্জনে এগিয়ে নেয়।",
  general: {
    who_am_i: [
      "ব্যাকএন্ড ইনফ্রাস্ট্রাকচার উন্নয়নে ৫ বছরেরও বেশি বাস্তব অভিজ্ঞতার মাধ্যমে, আমি ধারাবাহিকভাবে স্কেলেবল এন্টারপ্রাইজ সিস্টেমের ডিজাইন, ডেভেলপমেন্ট এবং অপ্টিমাইজেশনে অবদান রেখেছি। এই যাত্রা ৩ বছরের বেশি সময়ের রেসপন্সিভ, পিক্সেল-নিখুঁত ফ্রন্টএন্ড অ্যাপ্লিকেশন তৈরি করার দক্ষতার মাধ্যমে পরিপূরক, যা ব্যবহারকারীদের জন্য সহজ এবং স্বচ্ছ অভিজ্ঞতা প্রদান করে। সফটওয়্যার ইঞ্জিনিয়ারিংয়ের মূল ধারণার বাইরে, আমি কৃত্রিম বুদ্ধিমত্তায় (AI) গভীর তাত্ত্বিক জ্ঞান রাখি, যা ১ বছরের LLM-ভিত্তিক শিল্প স্তরের বাস্তব অভিজ্ঞতার মাধ্যমে আরও দৃঢ় হয়েছে।",
      "আমি নিজেকে একটি ফুল-স্পেকট্রাম সফটওয়্যার ইঞ্জিনিয়ার হিসেবে পরিচিত করি, যিনি end-to-end ডেভেলপমেন্ট, ডিপ্লয়মেন্ট এবং দীর্ঘমেয়াদি মেইনটেন্যান্স-এ বিশেষজ্ঞ। আমার কাজের পরিধি ব্যাকএন্ড সার্ভিস, ফ্রন্টএন্ড ইন্টারফেস এবং AI-চালিত সমাধান পর্যন্ত বিস্তৃত, যা প্রযুক্তিগত বাস্তবায়ন এবং ব্যবসায়িক মানের মধ্যে সেতুবন্ধন তৈরি করে। আমি এমন পরিবেশে উজ্জ্বলভাবে কাজ করি যেখানে উদ্ভাবন, স্কেলেবিলিটি এবং নির্ভরযোগ্যতা গুরুত্বপূর্ণ, এবং আমি এমন সমস্যা সমাধানের মনোভাব নিয়ে কাজ করি যা তাৎক্ষণিক প্রয়োজনের সাথে দীর্ঘমেয়াদি আর্কিটেকচারাল দৃষ্টিভঙ্গি সামঞ্জস্য করে।",
    ],
    what_i_want: [
      "আমি কেবল একজন ডেভেলপার হিসেবে নয়, বরং প্রযুক্তিগত দিকনির্দেশনা নির্ধারণ এবং প্রভাবশালী সমাধান প্রদান করার ক্ষেত্রে একটি কৌশলগত অংশীদার হিসেবেও অবদান রাখতে আগ্রহী। আমার লক্ষ্য হলো নিরাপদ, রক্ষণাবেক্ষণযোগ্য এবং উচ্চ-কার্যক্ষম সিস্টেমের উন্নয়ন চালানো, যেখানে আমি সক্রিয়ভাবে প্রযুক্তিগত সিদ্ধান্ত গ্রহণ এবং আর্কিটেকচার পরিকল্পনায় অংশগ্রহণ করি। আমি এমন সুযোগ খুঁজি যেখানে আমি ইঞ্জিনিয়ারিং প্রচেষ্টাকে বৃহত্তর ব্যবসায়িক লক্ষ্যগুলোর সাথে সামঞ্জস্য করতে পারি, নিশ্চিত করে যে প্রযুক্তি সরাসরি বৃদ্ধি এবং উদ্ভাবনের সহায়ক হিসাবে কাজ করে।",
      "আমি ডেভেলপারদের মেন্টরিং, টিম লিড এবং জটিল প্রকল্প পরিচালনায় কেন্দ্রীয় ভূমিকা পালন করতে চাই, এমন একটি পরিবেশ গড়ে তুলতে যেখানে সহযোগিতা এবং জ্ঞানের ভাগাভাগি উৎসাহিত হয়। কেবল কোডের বাইরে, আমি এন্টারপ্রাইজ-গ্রেড অ্যাপ্লিকেশনকে স্কেলেবিলিটি, নির্ভরযোগ্যতা এবং উচ্চ প্রাপ্যতার জন্য অপ্টিমাইজ করতে চাই, সাথে সাথে নিরাপত্তা প্রক্রিয়া এবং কমপ্লায়েন্স সচেতনতা ক্রমাগত উন্নত করতে চাই।",
      "একইভাবে, আমি সর্বদা আধুনিক টুল, ফ্রেমওয়ার্ক এবং পদ্ধতি প্রবর্তনের মাধ্যমে প্রযুক্তিগত অগ্রগতির সঙ্গে সামঞ্জস্য রাখার চেষ্টা করি, যেখানে নতুন ফিচারের প্রয়াসের সঙ্গে প্রযুক্তিগত দেন-দেনের (technical debt) মধ্যে সূক্ষ্ম ভারসাম্য বজায় থাকে। শেষ পর্যন্ত, আমি এমন টেকসই ইঞ্জিনিয়ারিং প্র্যাকটিস তৈরি করতে অবদান রাখতে চাই, যা কেবল তাৎক্ষণিক চ্যালেঞ্জ সমাধান করে না, বরং দীর্ঘমেয়াদি প্রযুক্তি রোডম্যাপ নির্ধারণ করে যা কোম্পানির ভিশনের সাথে সামঞ্জস্যপূর্ণ।",
    ],
    what_i_offer: [
      "আমি প্রযুক্তিগত দক্ষতা, ক্রস-ডোমেইন অভিজ্ঞতা এবং ব্যবসা-কেন্দ্রিক চিন্তাধারার একটি অনন্য সমন্বয় নিয়ে আসি, যা আমাকে এমন সফটওয়্যার সমাধান প্রদান করতে সক্ষম করে যা একদিকে তাৎক্ষণিক প্রভাব ফেলে এবং অন্যদিকে দীর্ঘমেয়াদী মূল্য যোগ করে। আমার অভিজ্ঞতা বিস্তৃত বিভিন্ন ক্ষেত্রে, যেমন ERP সিস্টেম, রিক্রুটিং প্ল্যাটফর্ম, লিড জেনারেশন টুল, সেলস ও মার্কেটিং অটোমেশন, ডায়নামিক মাল্টিমিডিয়া প্রসেসিং, এবং Agentic AI ডেভেলপমেন্ট—যেখানে LLMs, Retrieval-Augmented Generation (RAG), এবং Model Context Protocol (MCP)-এর মতো সর্বাধুনিক কৌশল ব্যবহার করা হয়েছে।",
      "ইঞ্জিনিয়ারিং-এর ক্ষেত্রে আমি ডাটাবেজ স্কিমা ডিজাইন, পরিষ্কার ও মডুলার আর্কিটেকচার, এবং স্কেলযোগ্য ব্যাকএন্ড সিস্টেমে বিশেষজ্ঞ। পাশাপাশি, সিকিউর REST/GraphQL API, রিয়েল-টাইম সকেট-ভিত্তিক অ্যাপ্লিকেশন, এবং ইভেন্ট-ড্রিভেন মাইক্রোসার্ভিস তৈরির দক্ষতা রয়েছে। আমি CI/CD পাইপলাইন এবং DevOps ওয়ার্কফ্লো সেটআপে দক্ষ, যা অ্যাপ্লিকেশনের মসৃণ ডেলিভারি, ডেপ্লয়মেন্ট, এবং দীর্ঘমেয়াদী মেইনটেইনেবিলিটি নিশ্চিত করে।",
      "যা আমাকে সত্যিই আলাদা করে তোলে তা হলো জটিল ব্যবসায়িক প্রয়োজনীয়তাকে দৃঢ়, প্রোডাকশন-গ্রেড টেকনিক্যাল সলিউশনে রূপান্তর করার ক্ষমতা। স্টেকহোল্ডার এবং ক্রস-ফাংশনাল টিমের সঙ্গে সহযোগিতা করে আমি নিশ্চিত করি যে ইঞ্জিনিয়ারিং ফলাফলগুলো সাংগঠনিক লক্ষ্যের সঙ্গে সামঞ্জস্যপূর্ণ—হোক সেটা পারফরম্যান্স অপ্টিমাইজেশন, রিলায়েবিলিটি উন্নয়ন, কিংবা আধুনিক প্রযুক্তির মাধ্যমে ইনোভেশন।",
      "সংক্ষেপে, আমি উচ্চ-প্রভাবশালী অ্যাপ্লিকেশন ডিজাইন, তৈরি এবং স্কেল করার দক্ষতা প্রদান করি। পাশাপাশি, প্রযুক্তিগত উৎকর্ষ ও ব্যবসায়িক সফলতাকে এগিয়ে নিতে প্রয়োজনীয় ভিশন, অভিযোজনযোগ্যতা, এবং সমস্যা সমাধানের মানসিকতাও প্রদান করি।",
    ],
  },
  client: {
    who_am_i: [
      "আমি একজন পূর্ণাঙ্গ সফটওয়্যার ইঞ্জিনিয়ার, যিনি ব্যবসায়িক প্রয়োজন এবং প্রযুক্তিগত সমাধান—উভয়ই ভালোভাবে বুঝি। গত ৫ বছরের বেশি সময় ধরে আমি ব্যাকএন্ড সিস্টেম ডিজাইন ও ডেভেলপমেন্টে কাজ করেছি, যা এন্টারপ্রাইজ ডেটা এবং সার্ভিসকে নিরাপদ, দ্রুত ও নির্ভরযোগ্য রাখে। পাশাপাশি, আমি ৩ বছরেরও বেশি সময় ধরে ফ্রন্টএন্ড বা ইউজার ইন্টারফেস ডিজাইনে অভিজ্ঞ, যেখানে ব্যবহারকারীদের জন্য সহজ, দৃষ্টিনন্দন এবং কার্যকর অ্যাপ্লিকেশন তৈরি করেছি।",

      "আমি কৃত্রিম বুদ্ধিমত্তা (AI) এবং বড় ভাষা মডেল (LLMs) নিয়েও কাজ করেছি, যা আমাকে জটিল ডেটা বিশ্লেষণ, অটোমেশন এবং সিদ্ধান্ত গ্রহণে প্রযুক্তিকে ব্যবহার করার সুযোগ দেয়—যা আপনার ব্যবসার জন্য উপকারী হতে পারে।",
    ],
    what_i_can_do: [
      "আমি এমন সফটওয়্যার তৈরি করি যা আপনার ব্যবসার কাজকে দ্রুততর, নিরাপদ এবং সহজ করে তোলে। উদাহরণস্বরূপ, আমি ERP সিস্টেম, রিক্রুটিং প্ল্যাটফর্ম, লিড জেনারেশন টুল এবং সেলস ও মার্কেটিং অটোমেশন সলিউশন তৈরি করতে পারি, যা আপনার টিমকে সময় বাঁচাতে এবং আরও ভালো ফলাফল অর্জনে সহায়তা করবে। এছাড়াও, আমি মাল্টিমিডিয়া, ভিডিও বা অডিও প্রসেসিং সলিউশন এবং AI-চালিত স্মার্ট অ্যাপ্লিকেশন তৈরি করতে পারি, যা আপনার ব্যবসাকে আরও আধুনিক ও কার্যকর করবে।",

      "আমি নিশ্চিত করি যে আপনার সফটওয়্যার নিরাপদ, ব্যবহারবান্ধব এবং দীর্ঘমেয়াদে টেকসই হয়। আমি আপনার ব্যবসার প্রয়োজন অনুযায়ী কাস্টমাইজড সলিউশন দিতে পারি, যাতে আপনি আপনার মূল লক্ষ্য অর্জনে মনোযোগ দিতে পারেন।",
    ],
    why_i_am_important: [
      "আমি শুধু কোড লিখি না—আমি ব্যবসায়িক সমস্যাগুলো বুঝে তা প্রযুক্তির মাধ্যমে সমাধান করি। আমার কাজের মূল লক্ষ্য হলো:",
      [
        "ডেটা ও তথ্য নিরাপদ রাখা",
        "সফটওয়্যারকে দ্রুত ও নির্ভরযোগ্য রাখা",
        "নতুন ফিচার যোগ করা এবং বিদ্যমান সমস্যাগুলো সমাধান করা",
        "আপনার টিমের কাজকে আরও সহজ করা",
      ],
      "একজন ক্লায়েন্ট হিসেবে, আপনি এমন সফটওয়্যার চান যা দীর্ঘস্থায়ী, ব্যবহারবান্ধব, নিরাপদ এবং উচ্চমানের। আমি এখানে আছি যাতে আপনার প্রযুক্তি এসব লক্ষ্য পূরণ করে।",
    ],
  },
};

const en_personal_info = {
  name: "Abir Hosen",
  email: "abir71.hosen@gmail.com",
  phone: "+880 1310 685450",
  github: "abir-hosen-ashik",
  linkedin: "abir-hosen-ashik",
  medium: "abir-hosen-ashik",
  youtube: "abir-hosen-ashik",
  fb: "abirdox",
  x: "abirhosen_ashik",
  gitlab: "abir-hosen",
  kaggle: "abirhosenashik",
};

const bn_personal_info = {
  name: "আবির হোসেন",
  email: "abir71.hosen@gmail.com",
  phone: "+৮৮০ ১৩১০ ৬৮৫৪৫০",
  github: "abir-hosen-ashik",
  linkedin: "abir-hosen-ashik",
  medium: "abir-hosen-ashik",
  youtube: "abir-hosen-ashik",
  fb: "abirdox",
  x: "abirhosen_ashik",
  gitlab: "abir-hosen",
  kaggle: "abirhosenashik",
};

const en_home = {
  greeting: "Hello, I am",
  name: "Abir Hosen",
  title: "AI Engineer & Full-Stack Developer",
  subtitle: "Building Intelligence that Empowers the World",
  slogan: "Turning ideas into intelligent, scalable solutions",
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
  slogan: "প্রযুক্তির শক্তিতে নতুন সম্ভাবনার দুয়ার উন্মোচন",
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
      objective: "Career Objective",
      about_me: en_about_me,
      viewAll: "More About Me",
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
      objective: "পেশাগত লক্ষ্য",
      about_me: bn_about_me,
      viewAll: "আমার সম্পর্কে বিস্তারিত",
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
