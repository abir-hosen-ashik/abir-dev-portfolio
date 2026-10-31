import { supabase, PORTFOLIO_USER_ID } from "../utils/config";
import type { AboutSection, ArticleBlock, ArticleDetail, ArticlePost, Content, Language } from "../types";

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
  "articles", "articles.platforms", "researcher",
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

/** Detail-view and Tech Stack wording used until the owner sets their own labels (ui.*). */
const UI_DEFAULTS: Record<Language, Record<string, string>> = {
  en: {
    back: "Back", view_details: "View details",
    projects_count: "{n} projects", projects_count_one: "1 project", most_used: "Most used in my projects", used_in: "Used in",
  },
  bn: {
    back: "ফিরে যান", view_details: "বিস্তারিত দেখুন",
    projects_count: "{n}টি প্রকল্প", projects_count_one: "১টি প্রকল্প", most_used: "আমার প্রকল্পে সবচেয়ে বেশি ব্যবহৃত", used_in: "যেখানে ব্যবহৃত",
  },
};

/** Case-study wording used until the owner sets their own labels (projects.case_study, …). */
const CASE_STUDY_LABELS: Record<Language, Record<string, string>> = {
  en: { kind_feature: "Feature project", kind_enterprise: "Enterprise grade", case_study: "Case study", challenges: "Challenges & solutions", challenge: "Challenge", solution: "How I solved it", result: "Result" },
  bn: { kind_feature: "ফিচার প্রকল্প", kind_enterprise: "এন্টারপ্রাইজ গ্রেড", case_study: "কেস স্টাডি", challenges: "চ্যালেঞ্জ ও সমাধান", challenge: "চ্যালেঞ্জ", solution: "কীভাবে সমাধান করেছি", result: "ফলাফল" },
};

/** Case-study sections and challenges (batools 058), each pointing at a project or a publication; posts (061). */
type Details = { sections: Row[]; challenges: Row[]; posts: Row[]; artifacts: Row[]; audiences: Row[] };

/** The version being shown and every version's id (batools 063). */
type VersionPick = { current?: Row; active: Row[]; known: Set<string> };

/**
 * Which version to show: ?version=<slug>, else VITE_PORTFOLIO_VERSION, else
 * the default, else the first active one. Inactive versions are never shown.
 */
function pickVersion(rows: Row[], wanted: string | null): VersionPick {
  const active = rows.filter(v => v.is_active);
  const bySlug = (slug: string | null | undefined) => (slug ? active.find(v => v.slug === slug) : undefined);
  const current = bySlug(wanted) ?? bySlug(import.meta.env.VITE_PORTFOLIO_VERSION) ?? active.find(v => v.is_default) ?? active[0];
  return { current, active, known: new Set(rows.map(v => v.id)) };
}

/** A row is in every version unless tagged; tags of deleted versions don't count. */
const inVersion = (row: Row, pick: VersionPick) => {
  const tags = ((row.versions ?? []) as string[]).filter(id => pick.known.has(id));
  return !tags.length || (!!pick.current && tags.includes(pick.current.id));
};

/** Articles wording used until the owner sets their own labels (articles.*, nav.articles). */
const ARTICLE_LABELS: Record<Language, Record<string, string>> = {
  en: {
    title: "Articles", subTitle: "Writing on engineering, AI and the things I build.", viewAll: "View All Articles",
    allTitle: "All Articles", read: "Read article", open: "Open post", min_read: "min read", back: "Back to portfolio",
    not_found: "This article could not be found.", watch: "Watch video", all: "All",
  },
  bn: {
    title: "আর্টিকেল", subTitle: "ইঞ্জিনিয়ারিং, এআই এবং আমার তৈরি জিনিস নিয়ে লেখা।", viewAll: "সব আর্টিকেল দেখুন",
    allTitle: "সব আর্টিকেল", read: "আর্টিকেল পড়ুন", open: "পোস্টটি খুলুন", min_read: "মিনিট পড়া", back: "পোর্টফোলিওতে ফিরুন",
    not_found: "এই আর্টিকেলটি পাওয়া যায়নি।", watch: "ভিডিও দেখুন", all: "সব",
  },
};
/** Researcher-site wording used until the owner sets their own labels (researcher.*). */
const RESEARCHER_LABELS: Record<Language, Record<string, string>> = {
  en: {
    about: "About", publications: "Publications", models: "Models & Data", experience: "Experience", projects: "Projects", writing: "Writing", contact: "Contact",
    interests_title: "Research interests", peer_reviewed: "Peer-reviewed", under_review: "Under review", accepted: "Accepted",
    abstract: "Abstract", bibtex: "BibTeX", copied: "Copied", pdf: "PDF", doi: "DOI", paper: "Paper", code: "Code", model: "Model", dataset: "Dataset", demo: "Live demo",
    from_paper: "From", released: "Released", research_experience: "Research experience", industry_experience: "Industry experience",
    teaching: "Teaching", education: "Education", selected_projects: "Selected engineering projects", resume: "Resume", email: "Email",
    stat_publications: "publications", stat_under_review: "under review", stat_models: "open models", stat_datasets: "datasets",
    models_intro: "Trained models, datasets and code released with my research, each with a link to try or reuse it.",
    contact_intro: "Open to research collaborations, graduate research positions and applied AI work.",
    kind_model: "Model", kind_dataset: "Dataset", kind_demo: "Demo", kind_code: "Code", all: "All", updated: "Last updated",
    private: "Private", private_tip: "Private dataset — send me a message to request access.", request_access: "Request access",
    access_subject: "Access request: {title}", access_message: "Hi, I would like to request access to \"{title}\" for research use.",
    form_name: "Name", form_email: "Email", form_subject: "Subject", form_message: "Message", form_send: "Send message", form_sending: "Sending…",
    form_sent: "Thanks — your message was sent.", form_failed: "Sorry, the message could not be sent. Please email me instead.",
    view_all: "View all", details: "Details", close: "Close", more_about: "More about me", about_title: "About me",
    beyond: "Beyond research", nothing: "Nothing to show here yet.",
    keywords: "Keywords", did: "What I did", tech: "Tech", case_study: "Case study", challenges: "Challenges & solutions",
    challenge: "Challenge", solution: "How I solved it", result: "Result", released_with: "Released with this paper", status: "Status", current: "Current", search: "Search…", no_match: "Nothing matches.",
  },
  bn: {
    about: "পরিচিতি", publications: "প্রকাশনা", models: "মডেল ও ডেটা", experience: "অভিজ্ঞতা", projects: "প্রকল্প", writing: "লেখা", contact: "যোগাযোগ",
    interests_title: "গবেষণার আগ্রহ", peer_reviewed: "পিয়ার-রিভিউড", under_review: "পর্যালোচনাধীন", accepted: "গৃহীত",
    abstract: "সারসংক্ষেপ", bibtex: "BibTeX", copied: "কপি হয়েছে", pdf: "PDF", doi: "DOI", paper: "পেপার", code: "কোড", model: "মডেল", dataset: "ডেটাসেট", demo: "লাইভ ডেমো",
    from_paper: "যে পেপার থেকে", released: "প্রকাশ", research_experience: "গবেষণার অভিজ্ঞতা", industry_experience: "ইন্ডাস্ট্রির অভিজ্ঞতা",
    teaching: "শিক্ষকতা", education: "শিক্ষা", selected_projects: "নির্বাচিত ইঞ্জিনিয়ারিং প্রকল্প", cv: "সিভি", email: "ইমেইল",
    stat_publications: "প্রকাশনা", stat_under_review: "পর্যালোচনাধীন", stat_models: "উন্মুক্ত মডেল", stat_datasets: "ডেটাসেট",
    models_intro: "আমার গবেষণার সাথে প্রকাশিত মডেল, ডেটাসেট ও কোড — প্রতিটি চালিয়ে দেখা বা ব্যবহার করার লিংকসহ।",
    contact_intro: "গবেষণা সহযোগিতা, স্নাতকোত্তর গবেষণার সুযোগ এবং প্রয়োগমূলক এআই কাজের জন্য যোগাযোগ করুন।",
    kind_model: "মডেল", kind_dataset: "ডেটাসেট", kind_demo: "ডেমো", kind_code: "কোড", all: "সব", updated: "সর্বশেষ হালনাগাদ",
    private: "প্রাইভেট", private_tip: "প্রাইভেট ডেটাসেট — অ্যাক্সেসের জন্য আমাকে মেসেজ দিন।", request_access: "অ্যাক্সেস চান",
    access_subject: "অ্যাক্সেসের অনুরোধ: {title}", access_message: "হ্যালো, গবেষণার জন্য \"{title}\" এর অ্যাক্সেস চাই।",
    form_name: "নাম", form_email: "ইমেইল", form_subject: "বিষয়", form_message: "বার্তা", form_send: "বার্তা পাঠান", form_sending: "পাঠানো হচ্ছে…",
    form_sent: "ধন্যবাদ — আপনার বার্তা পাঠানো হয়েছে।", form_failed: "দুঃখিত, বার্তা পাঠানো যায়নি। অনুগ্রহ করে ইমেইল করুন।",
    view_all: "সব দেখুন", details: "বিস্তারিত", close: "বন্ধ", more_about: "আমার সম্পর্কে আরও", about_title: "আমার সম্পর্কে",
    beyond: "গবেষণার বাইরে", nothing: "এখনো দেখানোর মতো কিছু নেই।",
    keywords: "কীওয়ার্ড", did: "আমার কাজ", tech: "প্রযুক্তি", case_study: "কেস স্টাডি", challenges: "চ্যালেঞ্জ ও সমাধান",
    challenge: "চ্যালেঞ্জ", solution: "কীভাবে সমাধান করেছি", result: "ফলাফল", released_with: "এই পেপারের সাথে প্রকাশিত", status: "অবস্থা", current: "বর্তমান", search: "খুঁজুন…", no_match: "কিছু মেলেনি।",
  },
};

const PLATFORM_LABELS: Record<string, string> = {
  native: "Article", medium: "Medium", linkedin: "LinkedIn", x: "X", facebook: "Facebook",
  instagram: "Instagram", youtube: "YouTube", website: "Website", other: "Other",
};

/** A pf_posts row in the reader's language. */
function postOf(p: Row, lang: Language): ArticlePost {
  const tr = (f: string) => (lang === "bn" && p[`${f}_bn`]) || p[`${f}_en`] || "";
  return {
    id: p.id,
    kind: p.kind,
    platform: p.kind === "article" ? "native" : p.platform,
    href: p.kind === "article" ? `/articles/${p.slug}` : p.external_url,
    title: tr("title"),
    summary: tr("summary"),
    cover: p.cover_url ?? undefined,
    tags: p.tags ?? [],
    date: p.published_at ?? undefined,
    readingMinutes: p.reading_minutes ?? undefined,
    featured: !!p.is_featured,
    onHome: p.show_on_home ?? true,
  };
}

function build(lang: Language, profile: Row, labels: Row[], lists: Record<ListTable, Row[]>, details: Details, pick: VersionPick): Content {
  // Bangla falls back to English wherever a translation is left empty.
  const tr = (row: Row, field: string): string =>
    (lang === "bn" && row[`${field}_bn`]) || row[`${field}_en`] || "";
  const trList = (row: Row, field: string): string[] =>
    lang === "bn" && row[`${field}_bn`]?.length ? row[`${field}_bn`] : row[`${field}_en`] ?? [];

  // Each list shows only while its switch on the project / publication is on
  // (batools 060); hidden items were filtered out when read. Before 060,
  // show_challenges is missing and challenges follow show_case_study.
  const caseStudyOf = (parent: Row, column: "project_id" | "publication_id") => {
    const showSections = parent.show_case_study === true;
    const showChallenges = (parent.show_challenges ?? parent.show_case_study) === true;
    const sections = (showSections ? details.sections : [])
      .filter(s => s[column] === parent.id)
      .map(s => ({ heading: tr(s, "heading"), body: tr(s, "body") }));
    const challenges = (showChallenges ? details.challenges : [])
      .filter(c => c[column] === parent.id)
      .map(c => ({ challenge: tr(c, "challenge"), solution: tr(c, "solution"), result: tr(c, "result") }));
    return sections.length || challenges.length ? { sections, challenges } : undefined;
  };

  // The version's own text wins over the profile's.
  const version = pick.current ?? {};
  const versionOf = (v: Row) => ({ slug: v.slug, name: tr(v, "name"), title: tr(v, "title") || tr(profile, "title"), layout: v.layout });

  const years = profile.career_start_year ? new Date().getFullYear() - profile.career_start_year : 0;
  const l = labelTree(labels, lang);

  const sectionOf = (s: Row): AboutSection => ({
    id: s.id,
    heading: tr(s, "heading"),
    blocks: lists.pf_about_blocks
      .filter(b => b.section_id === s.id)
      .map(b => (b.kind === "list" ? trList(b, "items") : tr(b, "text"))),
  });
  // The version's audiences (067), else the two fixed ones from before it.
  // A section without an audience joins the first tab; one whose audience is
  // hidden or in another version is not shown.
  const tabs: Row[] = details.audiences.length
    ? details.audiences.map(a => ({ id: a.id, name: tr(a, "name") }))
    : [{ id: "general", name: l.about.filters.general || "In general" }, { id: "client", name: l.about.filters.client || "As a client" }];
  const tabOf = (s: Row) => {
    if (s.audience_id) return s.audience_id;
    const legacy = details.audiences.length ? undefined : s.audience;
    return tabs.some(t => t.id === legacy) ? legacy : tabs[0]?.id;
  };
  const audiences = tabs
    .map(tab => ({ id: tab.id as string, name: tab.name as string, sections: lists.pf_about_sections.filter(s => tabOf(s) === tab.id).map(sectionOf) }))
    .filter(a => a.sections.length);

  const content: Content = {
    years,
    nav: { articles: ARTICLE_LABELS[lang].title, ...l.nav },
    ui: { ...UI_DEFAULTS[lang], ...l.ui },
    personalInfo: {
      name: tr(profile, "name"),
      nameEn: profile.name_en ?? "",
      email: profile.email ?? "",
      phone: tr(profile, "phone"),
      location: tr(profile, "location") || undefined,
      photoUrl: version.photo_url ?? profile.photo_url ?? undefined,
      github: profile.github ?? "",
      linkedin: profile.linkedin ?? "",
      medium: profile.medium ?? undefined,
      youtube: profile.youtube ?? undefined,
      facebook: profile.facebook ?? undefined,
      instagram: profile.instagram ?? undefined,
      x: profile.x ?? undefined,
      gitlab: profile.gitlab ?? undefined,
      kaggle: profile.kaggle ?? undefined,
      resumeUrl: version.cv_url ?? profile.resume_url ?? undefined,
      // Research profile (batools 063); absent before it.
      huggingface: profile.huggingface ?? undefined,
      googleScholar: profile.google_scholar ?? undefined,
      orcid: profile.orcid ?? undefined,
      researchgate: profile.researchgate ?? undefined,
    },
    home: {
      greeting: tr(profile, "greeting"),
      name: tr(profile, "name"),
      title: tr(version, "title") || tr(profile, "title"),
      subtitle: tr(profile, "subtitle"),
      slogan: tr(profile, "slogan"),
      roles: lists.pf_hero_roles.map(r => ({ text: tr(r, "text"), icon: r.icon })),
    },
    about: {
      empty: lang === "en" ? "Nothing to show here yet." : "এখনো দেখানোর মতো কিছু নেই।",
      ...l.about,
      objectiveText: tr(version, "statement") || tr(profile, "objective"),
      audiences,
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
      ...CASE_STUDY_LABELS[lang],
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
        caseStudy: caseStudyOf(p, "project_id"),
        // Before batools 062 the home page showed the featured projects.
        onHome: p.show_on_home ?? !!p.is_featured,
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
        kind: e.kind ?? "industry",
        onHome: e.show_on_home ?? true,
      })),
    },
    techStack: {
      ...l.techStack,
      categories: lists.pf_tech_categories.map(c => ({ id: c.id, title: tr(c, "title"), icon: c.icon, skills: c.skills ?? [] })),
    },
    articles: {
      ...ARTICLE_LABELS[lang],
      ...l.articles,
      platforms: { ...PLATFORM_LABELS, ...l.articles.platforms },
      // Featured first; otherwise the order set in batools.
      items: [...details.posts]
        .sort((a, b) => Number(b.is_featured) - Number(a.is_featured))
        .map(p => postOf(p, lang)),
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
          // Shown only while the owner offers it to everyone (056 pdf_public).
          pdfUrl: p.pdf_public === false ? undefined : p.pdf_url ?? undefined,
          codeUrl: p.code_url ?? undefined,
          citation: p.citation ?? undefined,
          featured: p.is_featured,
          caseStudy: caseStudyOf(p, "publication_id"),
          onHome: p.show_on_home ?? true,
        })),
    },
    researcher: {
      ...RESEARCHER_LABELS[lang],
      ...l.researcher,
      title: tr(version, "title") || tr(profile, "title"),
      affiliation: tr(version, "affiliation"),
      statement: tr(version, "statement") || tr(profile, "objective"),
      interests: trList(version, "interests"),
      // Featured first; otherwise the order set in batools.
      artifacts: [...details.artifacts]
        .sort((a, b) => Number(b.is_featured) - Number(a.is_featured))
        .map(a => ({
          id: a.id,
          kind: a.kind,
          platform: a.platform,
          title: tr(a, "title"),
          description: tr(a, "description"),
          url: a.url,
          demoUrl: a.demo_url ?? undefined,
          publicationId: a.publication_id ?? undefined,
          metrics: a.metrics ?? [],
          tags: a.tags ?? [],
          releasedOn: a.released_on ?? undefined,
          featured: !!a.is_featured,
          isPrivate: !!a.is_private,
        })),
    },
    version: pick.current ? versionOf(pick.current) : undefined,
    versions: pick.active.map(versionOf),
    contact: l.contact,
    summery: {
      ...l.summery,
      check_list: { list: lists.pf_checklist.map(c => [tr(c, "text"), c.rating] as [string, number]) },
    },
  };
  return fillYears(content, localizeDigits(years, lang));
}

export async function loadContent(
  userId = PORTFOLIO_USER_ID,
  wantedVersion = new URLSearchParams(window.location.search).get("version"),
): Promise<Record<Language, Content>> {
  // Case studies (058) and articles (061) are optional extras: if their tables
  // are missing or a read fails, the rest of the portfolio shows without them.
  const detailsReq = (table: string, publishedOnly = false) => {
    let query = supabase.from(table).select("*").eq("user_id", userId).eq("is_visible", true);
    if (publishedOnly) query = query.eq("status", "published");
    return query.order("sort_order").then(({ data, error }) => {
      if (error) console.warn(`${table} unavailable`, error.message);
      return (data ?? []) as Row[];
    });
  };
  const detailsPromise = Promise.all([
    detailsReq("pf_case_study_sections"),
    detailsReq("pf_challenges"),
    // Articles (061): published posts only; drafts never leave batools.
    detailsReq("pf_posts", true),
    // Released models and datasets (063).
    detailsReq("pf_research_artifacts"),
    // About audiences (067).
    detailsReq("pf_about_audiences"),
    // Versions (063): active or not, so tags of inactive versions are known.
    supabase.from("pf_versions").select("*").eq("user_id", userId).order("sort_order").then(({ data, error }) => {
      if (error) console.warn("pf_versions unavailable", error.message);
      return (data ?? []) as Row[];
    }),
  ]);
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

  const [sections, challenges, posts, artifacts, audienceRows, versionRows] = await detailsPromise;
  const pick = pickVersion(versionRows, wantedVersion);
  // Only the rows of the version shown; children follow their parent.
  const lists = Object.fromEntries(
    LIST_TABLES.map((t, i) => [t, ((listRes[i].data ?? []) as Row[]).filter(r => inVersion(r, pick))]),
  ) as Record<ListTable, Row[]>;
  const labels = labelsRes.data ?? [];
  const details = {
    sections,
    challenges,
    posts: posts.filter(r => inVersion(r, pick)),
    artifacts: artifacts.filter(r => inVersion(r, pick)),
    audiences: audienceRows.filter(r => inVersion(r, pick)),
  };
  return {
    en: build("en", profileRes.data, labels, lists, details, pick),
    bn: build("bn", profileRes.data, labels, lists, details, pick),
  };
}

/**
 * One native article and its visible blocks, in the reader's language, or
 * null when there is no published article at that address.
 */
export async function loadArticle(slug: string, lang: Language, userId = PORTFOLIO_USER_ID): Promise<ArticleDetail | null> {
  const { data: post, error } = await supabase.from("pf_posts").select("*")
    .eq("user_id", userId).eq("kind", "article").eq("slug", slug)
    .eq("status", "published").eq("is_visible", true).maybeSingle();
  if (error) throw error;
  if (!post) return null;
  const { data: rows, error: blocksError } = await supabase.from("pf_post_blocks").select("*")
    .eq("post_id", post.id).eq("is_visible", true).order("sort_order");
  if (blocksError) throw blocksError;
  const tr = (r: Row, f: string) => (lang === "bn" && r[`${f}_bn`]) || r[`${f}_en`] || "";
  const blocks: ArticleBlock[] = (rows ?? []).map((b: Row) => ({
    id: b.id,
    kind: b.kind,
    text: tr(b, "text"),
    mediaUrl: b.media_url ?? undefined,
    alt: b.alt_en ?? undefined,
    caption: tr(b, "caption"),
    linkUrl: b.link_url ?? undefined,
    thumbnailUrl: b.thumbnail_url ?? undefined,
    code: b.code ?? undefined,
    codeLanguage: b.code_language ?? undefined,
  }));
  return { post: postOf(post, lang), blocks };
}
