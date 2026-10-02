import { Cloud, Code, Cpu, Database, Globe, Sparkles, Wrench, LucideIcon } from 'lucide-react';

// Icon keys stored in the pf_ tables (pf_hero_roles.icon, pf_tech_categories.icon).
export const ICONS: Record<string, LucideIcon> = {
  cpu: Cpu,
  code: Code,
  sparkles: Sparkles,
  globe: Globe,
  database: Database,
  cloud: Cloud,
  wrench: Wrench,
};

export const iconFor = (key: string): LucideIcon => ICONS[key] ?? Code;
