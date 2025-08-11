import { PersonalInfo, Project, Experience } from '../types';

export const content = {
  en: {
    // Navigation
    nav: {
      home: 'home',
      about: 'about',
      projects: 'projects',
      experience: 'experience',
      techStack: 'tech-stack',
      contact: 'contact',
      resume: 'resume'
    },
    
    // Personal Info
    personalInfo: {
      name: 'Abir Hosen',
      email: 'abir71.hosen@gmail.com',
      phone: '+880 1310 685450',
      github: 'abirdox',
      linkedin: 'abirdox',
      medium: 'abirdev',
      gitlab: 'abir-hosen',
      kaggle: 'abirhosenashik',
      objective: `With 5+ years of experience in full-stack development and AI, I am deeply passionate about leveraging AI and software development to drive innovation. My expertise spans AI-driven applications with hands-on experience in LLM integration, vector databases, and scalable back-end architectures.`
    } as PersonalInfo,
    
    // Home section
    home: {
      greeting: 'Hello, I am',
      name: 'Abir Hosen',
      title: 'AI Engineer & Full-Stack Developer',
      subtitle: 'Building intelligent solutions with code',
      prompt: 'abir@terminal:~$',
      commands: [
        'whoami',
        'ls -la skills/',
        'cat experience.txt',
        'python ai_projects.py'
      ]
    },
    
    // About section
    about: {
      title: 'About Me',
      education: {
        title: 'Education',
        items: [
          {
            degree: 'MSc - Information & Communication Engineering',
            institution: 'Noakhali Science & Technology University',
            year: '2023',
            location: 'Noakhali, Chittagong'
          },
          {
            degree: 'BSc - Information & Communication Engineering', 
            institution: 'Noakhali Science & Technology University',
            year: '2019',
            location: 'Noakhali, Chittagong'
          }
        ]
      },
      interests: [
        'Problem solving on HackerRank',
        'Writing content on Medium',
        'Kaggle contributor',
        'Theatre group member at Bangladesh Shilpakala Academy',
        'Film society organizer (Zero Definition)',
        'Video production & motion graphics'
      ]
    },
    
    // Projects
    projects: {
      title: 'Featured Projects',
      allTitle: 'All Projects',
      viewAll: 'View All Projects',
      filters: {
        all: 'All Projects',
        featured: 'Featured',
        main: 'Main Projects'
      },
      items: [
        {
          id: '1',
          title: 'Jamahook – AI Music Generator',
          duration: 'May 2025 - Present',
          description: 'AI-powered music production enhancement feature enabling solo instrumental generation using Stable Audio open models.',
          responsibilities: [
            'Designed & developed Stable Audio-based solo music generation feature service',
            'Analyzed platform requirements and constraints to choose optimal deployment architecture',
            'Integrated into Jamahook\'s real-time DAW assistant system'
          ],
          techStack: ['AI/ML', 'Stable Audio', 'Python', 'FastAPI', 'Docker'],
          featured: true
        },
        {
          id: '2', 
          title: 'Chat Brokers',
          duration: 'March 2025 - May 2025',
          description: 'AI and LLM-powered broker info chat system using RAG and MCP enabled dynamic context-aware conversations.',
          responsibilities: [
            'Data ingestion and structuring pipeline for diverse broker profiles',
            'RAG and MCP toolset enabling intelligent comparison and recommendations',
            'End-to-end system architecture and data modeling'
          ],
          techStack: ['LangChain', 'RAG', 'MCP', 'Python', 'FastAPI', 'PostgreSQL'],
          featured: true
        },
        {
          id: '3',
          title: 'Cannella Recruitment Service (AI)',
          duration: 'Feb 2025 - April 2025', 
          description: 'AI-powered job platform that streamlines hiring by intelligently matching job requirements with applicant CVs.',
          responsibilities: [
            'Developed AI models to analyze and match job requirements with CVs',
            'Implemented machine learning algorithms for candidate-job ranking',
            'Optimized system for accurate and efficient job matching'
          ],
          techStack: ['Machine Learning', 'NLP', 'Python', 'Scikit-learn', 'PostgreSQL'],
          featured: true
        },
        {
          id: '4',
          title: 'Query AI',
          duration: 'Oct 2024 - Jan 2025',
          description: 'NLP-based solution that generates and executes SQL queries from user prompts, bridging user intent and data insights.',
          responsibilities: [
            'Developed FastAPI backend for the project',
            'Designed and optimized PostgreSQL and pgVector for storage',
            'Responsible for complete database design'
          ],
          techStack: ['NLP', 'FastAPI', 'PostgreSQL', 'pgVector', 'Python'],
          featured: true
        },
        {
          id: '5',
          title: 'MashAllah Ecommerce',
          duration: 'Feb 2024 - Nov 2024',
          description: 'A scalable e-commerce platform built with microservices and microfrontend architecture. Features modules for e-commerce, inventory management, order processing and admin controls.',
          responsibilities: [
            'Developed Spring Boot microservices and Next.js microfrontend architecture',
            'Designed and implemented PostgreSQL database schema',
            'Utilized Docker for project virtualization'
          ],
          techStack: ['Spring Boot', 'Next.js', 'PostgreSQL', 'Docker', 'Microservices'],
          featured: false
        },
        {
          id: '6',
          title: 'Singistic',
          duration: 'March 2023 - Aug 2023',
          description: 'An online karaoke app for Web, Android and iOS users with a wide range of songs in multiple languages.',
          responsibilities: [
            'Developed backend with NestJS and DynamoDB',
            'Implemented audio processing using ffmpeg, Spleeter and ImageMagick',
            'Managed file storage with AWS S3'
          ],
          techStack: ['NestJS', 'DynamoDB', 'AWS S3', 'FFmpeg', 'Spleeter'],
          featured: false
        },
        {
          id: '7',
          title: 'Probashkormi',
          duration: 'Aug 2023 - Ongoing',
          description: 'Recruitment management system for individuals seeking jobs abroad, eliminating middlemen.',
          responsibilities: [
            'Developed backend with NestJS, Prisma, GraphQL and MongoDB',
            'Integrated AWS S3 for file storage',
            'Responsible for complete DB design and API pipeline'
          ],
          techStack: ['NestJS', 'GraphQL', 'MongoDB', 'AWS S3', 'Prisma'],
          featured: false
        },
        {
          id: '8',
          title: 'SoftCollab',
          duration: 'April 2023 - Ongoing',
          description: 'A platform for sharing and collaborating on music files between producers and musicians.',
          responsibilities: [
            'Upgraded backend using ExpressJS, SocketIO and MySQL',
            'Utilized ffmpeg and ImageMagick for audio processing',
            'Integrated AWS S3 for file management'
          ],
          techStack: ['ExpressJS', 'SocketIO', 'MySQL', 'AWS S3', 'FFmpeg'],
          featured: false
        },
        {
          id: '9',
          title: 'Cloud Infra',
          duration: 'May 2021 - July 2022',
          description: 'Cloud server management platform designed to streamline the management of web servers for business owners. Offers automated backups, server monitoring and deployment tools.',
          responsibilities: [
            'Developed frontend using ReactJS, Redux and Axios',
            'Worked with Docker for project virtualization',
            'Integrated Keycloak for SSO'
          ],
          techStack: ['ReactJS', 'Redux', 'Docker', 'Keycloak', 'Axios'],
          featured: false
        },
        {
          id: '10',
          title: 'Roboket - Marketing Automation System',
          duration: 'Feb 2021 - March 2023',
          description: 'Marketing automation software that integrates lead-generation tools with social media and communication platforms.',
          responsibilities: [
            'Upgraded backend in microservice architecture using FastAPI',
            'Worked with Keycloak for SSO and Docker for project virtualization',
            'Managed frontend components using ReactJS and Redux'
          ],
          techStack: ['FastAPI', 'ReactJS', 'Redux', 'Keycloak', 'Docker'],
          featured: false
        },
        {
          id: '11',
          title: 'Tiger ERP',
          duration: 'Jan 2020 - Jan 2021',
          description: 'Enterprise resource planning (ERP) solution designed to manage various business operations like inventory, sales, procurement and accounting.',
          responsibilities: [
            'Developed both backend and frontend with Spring Boot and AngularJS',
            'Designed database schema and created custom queries',
            'Developed secure authentication and API pipeline using JWT'
          ],
          techStack: ['Spring Boot', 'AngularJS', 'JWT', 'MySQL', 'Maven'],
          featured: false
        }
      ] as Project[]
    },
    
    // Experience
    experience: {
      title: 'Professional Experience',
      allTitle: 'Complete Work Experience',
      viewAll: 'View All Experience',
      items: [
        {
          id: '1',
          company: 'Embedded Logic Operation (ELO)',
          position: 'Software Engineer (Full Stack Developer)',
          location: 'Dhaka, BD',
          duration: 'March 2023 – Present',
          responsibilities: [
            'Developing, optimizing and extending existing and new software',
            'Producing clean, efficient code based on specifications',
            'Verifying and deploying programs and systems',
            'Ensuring fast render and bug-free code',
            'Maintaining Agile Scrum in development life cycle'
          ]
        },
        {
          id: '2', 
          company: 'ADN Diginet',
          position: 'Software Engineer (Full Stack Developer)',
          location: 'Dhaka, BD',
          duration: 'February 2021 – March 2023',
          responsibilities: [
            'Responsible for optimizing and extending existing software',
            'Ensuring fast render and fresh bug-free code',
            'Maintaining Agile Scrum in development life cycle',
            'Actively participating in database design and project planning'
          ]
        },
        {
          id: '3',
          company: 'Tiger ERP',
          position: 'Java Developer (Full Stack Developer)', 
          location: 'Dhaka, BD',
          duration: 'January 2020 – January 2021',
          responsibilities: [
            'Requirement analysis and project development',
            'Active participation in database design and project planning',
            'Testing, analyzing, and debugging software',
            'Maintaining Agile Scrum in development life cycle'
          ]
        }
      ] as Experience[]
    },
    
    // Tech Stack
    techStack: {
      title: 'Technical Arsenal',
      categories: {
        ai: {
          title: 'AI & Machine Learning',
          skills: ['Scikit-learn', 'TensorFlow', 'Hugging Face', 'SpaCy', 'LangChain', 'RAG', 'FAISS', 'MCP', 'OpenAI', 'Gemini']
        },
        backend: {
          title: 'Backend Development',
          skills: ['NestJS', 'ExpressJS', 'FastAPI', 'Spring Boot', 'GraphQL', 'RESTful APIs', 'Microservices']
        },
        frontend: {
          title: 'Frontend Development', 
          skills: ['ReactJS', 'NextJS', 'TypeScript', 'Redux', 'AngularJS', 'HTML5', 'CSS3', 'Tailwind CSS']
        },
        database: {
          title: 'Databases',
          skills: ['PostgreSQL', 'pgVector', 'MongoDB', 'MySQL', 'DynamoDB', 'Redis']
        },
        cloud: {
          title: 'Cloud & DevOps',
          skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Microservices', 'Serverless']
        },
        tools: {
          title: 'Tools & Others',
          skills: ['Git', 'Keycloak', 'Socket.IO', 'FFmpeg', 'ImageMagick', 'Prisma', 'Maven']
        }
      }
    },
    
    // Contact
    contact: {
      title: 'Get In Touch',
      subtitle: 'Let\'s build something amazing together',
      form: {
        name: 'Name',
        email: 'Email', 
        subject: 'Subject',
        message: 'Message',
        send: 'Send Message'
      },
      social: {
        title: 'Connect with me'
      }
    },
    
    // UI Elements
    ui: {
      downloadResume: 'Download Resume',
      viewProject: 'View Project',
      learnMore: 'Learn More',
      backToTop: 'Back to Top',
      theme: 'Theme',
      language: 'Language',
      loading: 'Loading...',
      copied: 'Copied!',
      terminal: {
        prompt: 'abir@portfolio:~$',
        welcome: 'Welcome to Abir\'s Terminal Portfolio',
        type: 'Type "help" to see available commands'
      }
    }
  },
  
  bn: {
    // Navigation
    nav: {
      home: 'হোম', 
      about: 'সম্পর্কে',
      projects: 'প্রকল্প',
      experience: 'অভিজ্ঞতা',
      techStack: 'প্রযুক্তি',
      contact: 'যোগাযোগ',
      resume: 'জীবনবৃত্তান্ত'
    },
    
    // Personal Info
    personalInfo: {
      name: 'আবির হোসেন',
      email: 'abir71.hosen@gmail.com',
      phone: '+৮৮০ ১৩১০ ৬৮৫৪৫০',
      github: 'abirdox',
      linkedin: 'abirdox', 
      medium: 'abirdev',
      gitlab: 'abir-hosen',
      kaggle: 'abirhosenashik',
      objective: `ফুল-স্ট্যাক ডেভেলপমেন্ট এবং এআই-তে ৫+ বছরের অভিজ্ঞতার সাথে, আমি এআই এবং সফটওয়্যার ডেভেলপমেন্ট ব্যবহার করে উদ্ভাবন চালানোর জন্য গভীরভাবে আগ্রহী। আমার দক্ষতা এআই-চালিত অ্যাপ্লিকেশন জুড়ে বিস্তৃত।`
    } as PersonalInfo,
    
    // Home section
    home: {
      greeting: 'হ্যালো, আমি',
      name: 'আবির হোসেন',
      title: 'এআই ইঞ্জিনিয়ার ও ফুল-স্ট্যাক ডেভেলপার',
      subtitle: 'কোডের মাধ্যমে বুদ্ধিমান সমাধান তৈরি করছি',
      prompt: 'abir@terminal:~$',
      commands: [
        'whoami',
        'ls -la দক্ষতা/',
        'cat অভিজ্ঞতা.txt',
        'python ai_প্রকল্প.py'
      ]
    },
    
    // About section
    about: {
      title: 'আমার সম্পর্কে',
      education: {
        title: 'শিক্ষাগত যোগ্যতা',
        items: [
          {
            degree: 'এমএসসি - তথ্য ও যোগাযোগ প্রকৌশল',
            institution: 'নোয়াখালী বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়',
            year: '২০২৩',
            location: 'নোয়াখালী, চট্টগ্রাম'
          },
          {
            degree: 'বিএসসি - তথ্য ও যোগাযোগ প্রকৌশল',
            institution: 'নোয়াখালী বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়',
            year: '২০১৯', 
            location: 'নোয়াখালী, চট্টগ্রাম'
          }
        ]
      },
      interests: [
        'হ্যাকার র‍্যাঙ্কে সমস্যা সমাধান',
        'মিডিয়ামে কন্টেন্ট লেখা',
        'ক্যাগল অবদানকারী',
        'বাংলাদেশ শিল্পকলা একাডেমিতে নাট্য দলের সদস্য',
        'ফিল্ম সোসাইটি সংগঠক (জিরো ডেফিনিশন)',
        'ভিডিও প্রোডাকশন ও মোশন গ্রাফিক্স'
      ]
    },
    
    // Projects
    projects: {
      title: 'বিশেষ প্রকল্পসমূহ',
      allTitle: 'সকল প্রকল্প',
      viewAll: 'সকল প্রকল্প দেখুন',
      filters: {
        all: 'সকল প্রকল্প',
        featured: 'বিশেষ',
        main: 'মূল প্রকল্প'
      },
      items: [
        {
          id: '1',
          title: 'জামাহুক – এআই মিউজিক জেনারেটর',
          duration: 'মে ২০২৫ - বর্তমান',
          description: 'স্টেবল অডিও ওপেন মডেল ব্যবহার করে একক যন্ত্রসংগীত তৈরির এআই-চালিত মিউজিক প্রোডাকশন উন্নতিকরণ ফিচার।',
          responsibilities: [
            'স্টেবল অডিও-ভিত্তিক একক সংগীত তৈরির ফিচার সার্ভিস ডিজাইন ও ডেভেলপ করেছি',
            'সর্বোত্তম ডিপ্লয়মেন্ট আর্কিটেকচার নির্বাচনের জন্য প্ল্যাটফর্ম প্রয়োজনীয়তা বিশ্লেষণ করেছি',
            'জামাহুকের রিয়েল-টাইম DAW সহায়ক সিস্টেমে একীভূত করেছি'
          ],
          techStack: ['AI/ML', 'Stable Audio', 'Python', 'FastAPI', 'Docker'],
          featured: true
        },
        {
          id: '2',
          title: 'চ্যাট ব্রোকার্স',
          duration: 'মার্চ ২০২৫ - মে ২০২৫',
          description: 'RAG এবং MCP ব্যবহার করে গতিশীল প্রসঙ্গ-সচেতন কথোপকথন সক্ষম এআই এবং LLM-চালিত ব্রোকার তথ্য চ্যাট সিস্টেম।',
          responsibilities: [
            'বিভিন্ন ব্রোকার প্রোফাইলের জন্য ডেটা ইনজেশন এবং স্ট্রাকচারিং পাইপলাইন',
            'বুদ্ধিমান তুলনা এবং সুপারিশ সক্ষম RAG এবং MCP টুলসেট',
            'এন্ড-টু-এন্ড সিস্টেম আর্কিটেকচার এবং ডেটা মডেলিং'
          ],
          techStack: ['LangChain', 'RAG', 'MCP', 'Python', 'FastAPI', 'PostgreSQL'],
          featured: true
        }
      ] as Project[]
    },
    
    // Experience  
    experience: {
      title: 'পেশাগত অভিজ্ঞতা',
      allTitle: 'সম্পূর্ণ কর্ম অভিজ্ঞতা',
      viewAll: 'সকল অভিজ্ঞতা দেখুন',
      items: [
        {
          id: '1',
          company: 'এমবেডেড লজিক অপারেশন (ELO)',
          position: 'সফটওয়্যার ইঞ্জিনিয়ার (ফুল স্ট্যাক ডেভেলপার)',
          location: 'ঢাকা, বাংলাদেশ',
          duration: 'মার্চ ২০২৩ – বর্তমান',
          responsibilities: [
            'বিদ্যমান এবং নতুন সফটওয়্যার ডেভেলপ, অপটিমাইজ এবং সম্প্রসারণ করা',
            'স্পেসিফিকেশন অনুযায়ী পরিষ্কার, দক্ষ কোড তৈরি করা',
            'প্রোগ্রাম এবং সিস্টেম যাচাই এবং ডিপ্লয় করা',
            'দ্রুত রেন্ডার এবং বাগ-মুক্ত কোড নিশ্চিত করা'
          ]
        }
      ] as Experience[]
    },
    
    // Tech Stack
    techStack: {
      title: 'প্রযুক্তিগত দক্ষতা',
      categories: {
        ai: {
          title: 'এআই ও মেশিন লার্নিং',
          skills: ['Scikit-learn', 'TensorFlow', 'Hugging Face', 'SpaCy', 'LangChain', 'RAG', 'FAISS', 'MCP', 'OpenAI', 'Gemini']
        },
        backend: {
          title: 'ব্যাকএন্ড ডেভেলপমেন্ট',
          skills: ['NestJS', 'ExpressJS', 'FastAPI', 'Spring Boot', 'GraphQL', 'RESTful APIs', 'Microservices']
        },
        frontend: {
          title: 'ফ্রন্টএন্ড ডেভেলপমেন্ট',
          skills: ['ReactJS', 'NextJS', 'TypeScript', 'Redux', 'AngularJS', 'HTML5', 'CSS3', 'Tailwind CSS']
        },
        database: {
          title: 'ডেটাবেস',
          skills: ['PostgreSQL', 'pgVector', 'MongoDB', 'MySQL', 'DynamoDB', 'Redis']
        },
        cloud: {
          title: 'ক্লাউড ও ডেভঅপস',
          skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Microservices', 'Serverless']
        },
        tools: {
          title: 'টুলস ও অন্যান্য',
          skills: ['Git', 'Keycloak', 'Socket.IO', 'FFmpeg', 'ImageMagick', 'Prisma', 'Maven']
        }
      }
    },
    
    // Contact
    contact: {
      title: 'যোগাযোগ করুন',
      subtitle: 'চলুন একসাথে দুর্দান্ত কিছু তৈরি করি',
      form: {
        name: 'নাম',
        email: 'ইমেইল',
        subject: 'বিষয়',
        message: 'বার্তা',
        send: 'বার্তা পাঠান'
      },
      social: {
        title: 'আমার সাথে যুক্ত হন'
      }
    },
    
    // UI Elements
    ui: {
      downloadResume: 'জীবনবৃত্তান্ত ডাউনলোড',
      viewProject: 'প্রকল্প দেখুন',
      learnMore: 'আরো জানুন',
      backToTop: 'উপরে ফিরুন',
      theme: 'থিম',
      language: 'ভাষা',
      loading: 'লোড হচ্ছে...',
      copied: 'কপি হয়েছে!',
      terminal: {
        prompt: 'abir@portfolio:~$',
        welcome: 'আবিরের টার্মিনাল পোর্টফোলিওতে স্বাগতম',
        type: 'উপলব্ধ কমান্ড দেখতে "help" টাইপ করুন'
      }
    }
  }
};