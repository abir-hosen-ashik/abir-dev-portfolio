/** One challenge of a project's case study: what was hard, how it was solved, what came of it. */
export interface ProjectChallenge {
  challenge: string;
  solution: string;
  result: string;
}

/** One headed section of a case study ("Problem", "Architecture", …); body is rich text. */
export interface CaseStudySection {
  heading: string;
  body: string;
}

/** A project's or publication's details, present only when switched on and something is visible. */
export interface CaseStudy {
  sections: CaseStudySection[];
  challenges: ProjectChallenge[];
}

/** A post on the Articles section: written elsewhere (opens there) or here (its own page). */
export interface ArticlePost {
  id: string;
  kind: 'external' | 'article';
  /** native, medium, linkedin, x, facebook, instagram, youtube, website, other */
  platform: string;
  /** external: the original post; article: /articles/<slug> */
  href: string;
  title: string;
  summary: string;
  cover?: string;
  tags: string[];
  date?: string;
  readingMinutes?: number;
  featured: boolean;
  /** Listed on the home page (batools show_on_home); View all lists everything. */
  onHome: boolean;
}

/** One block of an article's body, already in the reader's language. */
export interface ArticleBlock {
  id: string;
  kind: 'text' | 'heading' | 'image' | 'video' | 'quote' | 'code' | 'link' | 'divider';
  text: string;
  mediaUrl?: string;
  alt?: string;
  caption: string;
  linkUrl?: string;
  thumbnailUrl?: string;
  code?: string;
  codeLanguage?: string;
}

/** A native article with its body, for its own page. */
export interface ArticleDetail { post: ArticlePost; blocks: ArticleBlock[] }

export interface Project {
  id: string;
  title: string;
  duration: string;
  description: string;
  responsibilities: string[];
  techStack: string[];
  link?: string;
  featured?: boolean;
  caseStudy?: CaseStudy;
  /** Listed on the home page (batools show_on_home); View all lists everything. */
  onHome: boolean;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  duration: string;
  responsibilities: string[];
  current: boolean;
  /** industry | research | teaching (batools 063; industry before it). */
  kind: ExperienceKind;
  /** Listed on the home page (batools show_on_home); View all lists everything. */
  onHome: boolean;
}

export type ExperienceKind = 'industry' | 'research' | 'teaching';

export interface PersonalInfo {
  name: string;
  /** The English name, which is how author lists spell it. */
  nameEn: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  medium?: string;
  youtube?: string;
  facebook?: string;
  instagram?: string;
  x?: string;
  gitlab?: string;
  kaggle?: string;
  resumeUrl?: string;
  huggingface?: string;
  /** The user= id of the Google Scholar profile. */
  googleScholar?: string;
  orcid?: string;
  researchgate?: string;
}

/** A version of the portfolio (pf_versions, batools 063) and how it is drawn. */
export interface PortfolioVersion {
  slug: string;
  name: string;
  /** The version's title, else the profile's. */
  title: string;
  layout: 'developer' | 'researcher';
}

/** A released model, dataset, demo or code (pf_research_artifacts, batools 063). */
export interface ResearchArtifact {
  id: string;
  kind: 'model' | 'dataset' | 'demo' | 'code';
  /** huggingface, kaggle, github, zenodo, website, other */
  platform: string;
  title: string;
  description: string;
  url: string;
  demoUrl?: string;
  /** The publication it comes from. */
  publicationId?: string;
  metrics: string[];
  tags: string[];
  releasedOn?: string;
  featured: boolean;
  /** Listed and linked, but access is on request (batools 064). */
  isPrivate: boolean;
}

/** The researcher layout: who the researcher is and what they released. */
export interface Researcher {
  title: string;
  affiliation: string;
  statement: string;
  interests: string[];
  artifacts: ResearchArtifact[];
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

export type PublicationType = 'journal' | 'conference' | 'preprint' | 'thesis' | 'book_chapter' | 'other';

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue?: string;
  type: PublicationType;
  status: 'published' | 'accepted' | 'under_review';
  year?: number;
  abstract?: string;
  keywords: string[];
  doi?: string;
  url?: string;
  pdfUrl?: string;
  codeUrl?: string;
  citation?: string;
  featured: boolean;
  caseStudy?: CaseStudy;
  /** Listed on the home page (batools show_on_home); View all lists everything. */
  onHome: boolean;
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
  research: Group & { filters: Group; types: Group; status: Group; items: Publication[] };
  articles: Group & { platforms: Group; items: ArticlePost[] };
  /** Wording (labels group `researcher`) plus the research profile. */
  researcher: Group & Researcher;
  /** The version shown (none before any exists: everything, developer layout). */
  version?: PortfolioVersion;
  /** Every active version, for switching. */
  versions: PortfolioVersion[];
  contact: Group & { form: Group; social: Group };
  summery: Group & { check_list: { list: [string, number][] } };
}

export type Language = 'en' | 'bn';
export type Theme = 'dark' | 'light';
