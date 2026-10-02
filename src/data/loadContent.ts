import { supabase, PORTFOLIO_USER_ID } from "../utils/config";
import type { AboutAudience, AboutSection, Content, Language } from "../types";

// Reads one portfolio out of the pf_ tables and shapes it per language.
// Text may contain {years}, filled in here from the career start year.

// Rows straight from PostgREST; each pf_ table has its own columns.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Row = Record<string, any>;

const LIST_TABLES = [
  "pf_hero_roles",
  "pf_about_sections",
  "pf_about_blocks",
  "pf_education",
  "pf_interests",
  "pf_core_skills",
  "pf_projects",
  "pf_experiences",
  "pf_tech_categories",
  "pf_checklist",
  "pf_publications",
] as const;
type ListTable = (typeof LIST_TABLES)[number];

const BN_DIGITS = "০১২৩৪৫৬৭৮৯";
export const localizeDigits = (value: string | number, lang: Language) =>
  lang === "bn" ? String(value).replace(/\d/g, d => BN_DIGITS[Number(d)]) : String(value);

/** Groups the site reads from; always present even if no label is set. */
const LABEL_GROUPS = [
  "nav", "ui", "ui.terminal", "about", "about.filters", "about.education",
  "projects", "projects.filters", "experience", "techStack",
  "contact", "contact.form", "contact.social", "summery",
  "research", "research.filters", "research.types", "research.status",
];

function labelTree(labels: Row[], lang: Language) {
  const tree: Row = {};
  const ensure = (path: string[]) => path.reduce((node, k) => (node[k] ??= {}), tree);
  LABEL_GROUPS.forEach(g => ensure(g.split(".")));
  for (const { key, value_en, value_bn } of labels) {
    const path = String(key).split(".");
    const leaf = path.pop()!;
    const node = ensure(path);
    if (typeof node === "object") node[leaf] = lang === "en" ? value_en : value_bn || value_en;
  }
  return tree;
}

/** Deep-replaces {years} in every string. */
function fillYears<T>(value: T, years: string): T {
  if (typeof value === "string") return value.replace(/\{years\}/g, years) as T;
  if (Array.isArray(value)) return value.map(v => fillYears(v, years)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, fillYears(v, years)])) as T;
  }
  return value;
}

function build(lang: Language, profile: Row, labels: Row[], lists: Record<ListTable, Row[]>): Content {
  // Bangla falls back to English wherever a translation is left empty.
  const tr = (row: Row, field: string): string =>
    (lang === "bn" && row[`${field}_bn`]) || row[`${field}_en`] || "";
  const trList = (row: Row, field: string): string[] =>
    lang === "bn" && row[`${field}_bn`]?.length ? row[`${field}_bn`] : row[`${field}_en`] ?? [];

  const years = profile.career_start_year ? new Date().getFullYear() - profile.career_start_year : 0;
  const l = labelTree(labels, lang);

  const sections: Record<AboutAudience, AboutSection[]> = { general: [], client: [] };
  for (const s of lists.pf_about_sections) {
    sections[s.audience as AboutAudience]?.push({
      id: s.id,
      heading: tr(s, "heading"),
      blocks: lists.pf_about_blocks
        .filter(b => b.section_id === s.id)
        .map(b => (b.kind === "list" ? trList(b, "items") : tr(b, "text"))),
    });
  }

  const content: Content = {
    years,
    nav: l.nav,
    ui: l.ui,
    personalInfo: {
      name: tr(profile, "name"),
      nameEn: profile.name_en ?? "",
      email: profile.email ?? "",
      phone: tr(profile, "phone"),
      github: profile.github ?? "",
      linkedin: profile.linkedin ?? "",
      medium: profile.medium ?? undefined,
      youtube: profile.youtube ?? undefined,
      facebook: profile.facebook ?? undefined,
      x: profile.x ?? undefined,
      gitlab: profile.gitlab ?? undefined,
      kaggle: profile.kaggle ?? undefined,
      resumeUrl: profile.resume_url ?? undefined,
    },
    home: {
      greeting: tr(profile, "greeting"),
      name: tr(profile, "name"),
      title: tr(profile, "title"),
      subtitle: tr(profile, "subtitle"),
      slogan: tr(profile, "slogan"),
      roles: lists.pf_hero_roles.map(r => ({ text: tr(r, "text"), icon: r.icon })),
    },
    about: {
      ...l.about,
      objectiveText: tr(profile, "objective"),
      sections,
      education: {
        title: l.about.education.title ?? "",
        items: lists.pf_education.map(e => ({
          degree: tr(e, "degree"),
          institution: tr(e, "institution"),
          year: tr(e, "year"),
          location: tr(e, "location"),
        })),
      },
      interests: lists.pf_interests.map(i => tr(i, "text")),
      core: lists.pf_core_skills.map(c => [tr(c, "label"), localizeDigits(c.percent, lang)] as [string, string]),
    },
    projects: {
      ...l.projects,
      items: lists.pf_projects.map(p => ({
        id: p.id,
        title: tr(p, "title"),
        duration: tr(p, "duration"),
        description: tr(p, "description"),
        responsibilities: trList(p, "responsibilities"),
        techStack: p.tech_stack ?? [],
        link: p.link ?? undefined,
        featured: p.is_featured,
      })),
    },
    experience: {
      ...l.experience,
      items: lists.pf_experiences.map(e => ({
        id: e.id,
        company: tr(e, "company"),
        position: tr(e, "position"),
        location: tr(e, "location"),
        duration: tr(e, "duration"),
        responsibilities: trList(e, "responsibilities"),
        current: e.is_current,
      })),
    },
    techStack: {
      ...l.techStack,
      categories: lists.pf_tech_categories.map(c => ({ id: c.id, title: tr(c, "title"), icon: c.icon, skills: c.skills ?? [] })),
    },
    research: {
      ...l.research,
      // Featured papers lead; otherwise the order set in the editor.
      items: [...lists.pf_publications]
        .sort((a, b) => Number(b.is_featured) - Number(a.is_featured))
        .map(p => ({
          id: p.id,
          title: tr(p, "title"),
          authors: p.authors ?? [],
          venue: p.venue ?? undefined,
          type: p.pub_type,
          status: p.status,
          year: p.year ?? undefined,
          abstract: tr(p, "abstract") || undefined,
          keywords: p.keywords ?? [],
          doi: p.doi ?? undefined,
          url: p.url ?? undefined,
          pdfUrl: p.pdf_url ?? undefined,
          codeUrl: p.code_url ?? undefined,
          citation: p.citation ?? undefined,
          featured: p.is_featured,
        })),
    },
    contact: l.contact,
    summery: {
      ...l.summery,
      check_list: { list: lists.pf_checklist.map(c => [tr(c, "text"), c.rating] as [string, number]) },
    },
  };
  return fillYears(content, localizeDigits(years, lang));
}

export async function loadContent(userId = PORTFOLIO_USER_ID): Promise<Record<Language, Content>> {
  const [profileRes, labelsRes, ...listRes] = await Promise.all([
    supabase.from("pf_profile").select("*").eq("user_id", userId).maybeSingle(),
    supabase.from("pf_labels").select("key, value_en, value_bn").eq("user_id", userId),
    ...LIST_TABLES.map(table =>
      supabase.from(table).select("*").eq("user_id", userId).eq("is_visible", true).order("sort_order"),
    ),
  ]);

  const failed = [profileRes, labelsRes, ...listRes].find(r => r.error);
  if (failed?.error) throw failed.error;
  if (!profileRes.data) throw new Error("Portfolio not found");

  const lists = Object.fromEntries(LIST_TABLES.map((t, i) => [t, listRes[i].data ?? []])) as Record<ListTable, Row[]>;
  const labels = labelsRes.data ?? [];
  return {
    en: build("en", profileRes.data, labels, lists),
    bn: build("bn", profileRes.data, labels, lists),
  };
}
