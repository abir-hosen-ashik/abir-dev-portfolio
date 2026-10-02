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
  current: boolean;
}

export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  medium?: string;
  youtube?: string;
  facebook?: string;
  x?: string;
  gitlab?: string;
  kaggle?: string;
  resumeUrl?: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  location: string;
}

/** A paragraph, or (as an array) a bullet list. */
export type AboutBlock = string | string[];

export interface AboutSection {
  id: string;
  heading: string;
  blocks: AboutBlock[];
}

export type AboutAudience = 'general' | 'client';

export interface HeroRole {
  text: string;
  icon: string;
}

export interface TechCategory {
  id: string;
  title: string;
  icon: string;
  skills: string[];
}

/** Labels (pf_labels) of one group, e.g. `nav` or `contact.form`. */
type Group = Record<string, string>;

/** Everything the site shows, in one language. */
export interface Content {
  years: number;
  nav: Group;
  ui: Group & { terminal: Group };
  personalInfo: PersonalInfo;
  home: { greeting: string; name: string; title: string; subtitle: string; slogan: string; roles: HeroRole[] };
  about: Group & {
    filters: Group;
    objectiveText: string;
    sections: Record<AboutAudience, AboutSection[]>;
    education: { title: string; items: Education[] };
    interests: string[];
    core: [string, string][];
  };
  projects: Group & { filters: Group; items: Project[] };
  experience: Group & { items: Experience[] };
  techStack: Group & { categories: TechCategory[] };
  contact: Group & { form: Group; social: Group };
  summery: Group & { check_list: { list: [string, number][] } };
}

export type Language = 'en' | 'bn';
export type Theme = 'dark' | 'light';
