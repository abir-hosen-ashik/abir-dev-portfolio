export interface Project {
  id: string;
  title: string;
  duration: string;
  description: string;
  responsibilities: string[];
  techStack: string[];
  link?: string;
  featured?: boolean;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  duration: string;
  responsibilities: string[];
}

export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  medium?: string;
  gitlab: string;
  kaggle: string;
  objective: string;
}

export type Language = 'en' | 'bn';
export type Theme = 'dark' | 'light';