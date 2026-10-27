import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, ExternalLink, Mail, Send } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import type { Experience } from '../../types';
import RichText from '../UI/RichText';
import { Pill, REQUEST_ACCESS, Section, academicLinks } from './shared';
import { insertMessage } from '../../utils/supabase';
import { sendEmail } from '../../utils/apis';

const Role: React.FC<{ e: Experience; detailed?: boolean }> = ({ e, detailed }) => (
  <li className="grid sm:grid-cols-[10rem_1fr] gap-x-6 gap-y-1">
    <span className="text-sm text-zinc-500 dark:text-zinc-400 pt-0.5">{e.duration}</span>
    <div className="min-w-0">
      <p className="font-medium text-zinc-900 dark:text-zinc-50">{e.position}</p>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">{e.company}{e.location ? ` · ${e.location}` : ''}</p>
      {detailed && e.responsibilities.length > 0 && (
        <ul className="mt-2 space-y-1 text-sm text-zinc-700 dark:text-zinc-300 list-disc pl-5 marker:text-zinc-400">
          {e.responsibilities.map((x, i) => <li key={i}>{x}</li>)}
        </ul>
      )}
    </div>
  </li>
);

/** Research roles in full, teaching, then industry roles (details on demand), then education. */
export const Background: React.FC = () => {
  const { t } = useLanguage();
  const r = t.researcher;
  const [industryOpen, setIndustryOpen] = useState(false);
  const research = t.experience.items.filter(e => e.kind === 'research');
  const teaching = t.experience.items.filter(e => e.kind === 'teaching');
  const industry = t.experience.items.filter(e => e.kind === 'industry');
  const education = t.about.education.items;
  const h3 = 'text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4';
  return (
    <Section id="experience" title={r.experience}>
      <div className="space-y-10">
        {research.length > 0 && (
          <div><h3 className={h3}>{r.research_experience}</h3><ol className="space-y-6">{research.map(e => <Role key={e.id} e={e} detailed />)}</ol></div>
        )}
        {teaching.length > 0 && (
          <div><h3 className={h3}>{r.teaching}</h3><ol className="space-y-6">{teaching.map(e => <Role key={e.id} e={e} detailed />)}</ol></div>
        )}
        {industry.length > 0 && (
          <div>
            <h3 className={`${h3} flex items-center gap-3`}>
              {r.industry_experience}
              <button onClick={() => setIndustryOpen(o => !o)} className="normal-case tracking-normal font-normal text-sky-800 dark:text-sky-300 inline-flex items-center gap-1">
                {industryOpen ? '−' : '+'}<ChevronDown size={14} className={`transition-transform ${industryOpen ? 'rotate-180' : ''}`} />
              </button>
            </h3>
            <ol className="space-y-5">{industry.map(e => <Role key={e.id} e={e} detailed={industryOpen} />)}</ol>
          </div>
        )}
        {education.length > 0 && (
          <div>
            <h3 className={h3}>{r.education}</h3>
            <ol className="space-y-4">
              {education.map((e, i) => (
                <li key={i} className="grid sm:grid-cols-[10rem_1fr] gap-x-6">
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">{e.year}</span>
                  <div>
                    <p className="font-medium text-zinc-900 dark:text-zinc-50">{e.degree}</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{e.institution}{e.location ? ` · ${e.location}` : ''}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </Section>
  );
};

/** The engineering projects picked for the home page, compactly. */
export const SelectedProjects: React.FC = () => {
  const { t } = useLanguage();
  // Projects that are a released model are already under Models & Data.
  const released = new Set(t.researcher.artifacts.map(a => a.url));
  const items = t.projects.items.filter(p => p.onHome && !(p.link && released.has(p.link)));
  if (!items.length) return null;
  return (
    <Section id="projects" title={t.researcher.selected_projects}>
      <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
        {items.map(p => (
          <li key={p.id} className="min-w-0">
            <p className="font-medium text-zinc-900 dark:text-zinc-50">
              {p.link ? <a href={p.link} target="_blank" rel="noopener noreferrer" className="hover:text-sky-800 dark:hover:text-sky-300">{p.title}</a> : p.title}
              {p.duration && <span className="ml-2 text-xs font-normal text-zinc-500">{p.duration}</span>}
            </p>
            <RichText text={p.description} className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3" />
            {p.techStack.length > 0 && <p className="mt-1 text-xs text-zinc-500">{p.techStack.slice(0, 6).join(' · ')}</p>}
          </li>
        ))}
      </ul>
    </Section>
  );
};

/** Posts and articles, as a plain list. */
export const Writing: React.FC = () => {
  const { t } = useLanguage();
  const items = t.articles.items;
  if (!items.length) return null;
  return (
    <Section id="writing" title={t.researcher.writing}>
      <ul className="space-y-3">
        {items.map(a => {
          const internal = a.kind === 'article';
          return (
            <li key={a.id} className="grid sm:grid-cols-[7rem_1fr] gap-x-6">
              <span className="text-sm text-zinc-500">{a.date ? a.date.slice(0, 7) : ''}</span>
              <a href={a.href} {...(internal ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                className="text-zinc-900 dark:text-zinc-100 hover:text-sky-800 dark:hover:text-sky-300">
                {a.title} <span className="text-xs text-zinc-500">· {t.articles.platforms[a.platform] ?? a.platform}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </Section>
  );
};

/**
 * Contact: links plus a form, saved to the inbox (pf_messages) and emailed
 * like the developer site's. A private item's "Request access" fills it in.
 */
export const ResearchContact: React.FC = () => {
  const { t } = useLanguage();
  const r = t.researcher;
  const p = t.personalInfo;
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');
  const nameInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onRequest = (e: Event) => {
      const title = String((e as CustomEvent<string>).detail ?? '');
      setForm(f => ({ ...f, subject: r.access_subject.replace('{title}', title), message: r.access_message.replace('{title}', title) }));
      setState('idle');
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      window.setTimeout(() => nameInput.current?.focus({ preventScroll: true }), 600);
    };
    window.addEventListener(REQUEST_ACCESS, onRequest);
    return () => window.removeEventListener(REQUEST_ACCESS, onRequest);
  }, [r.access_subject, r.access_message]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('sending');
    const message = { name: form.name, contact: form.email, subject: form.subject, message: form.message };
    const saved = await insertMessage(message).catch(() => null);
    if (!saved || saved.error) { setState('failed'); return; }
    // The inbox has it; the email is a courtesy copy.
    if (p.email) await sendEmail(message, { email: p.email, name: p.name }).catch(() => undefined);
    setForm({ name: '', email: '', subject: '', message: '' });
    setState('sent');
  };

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(f => ({ ...f, [k]: e.target.value }));
  const input = 'w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 ' +
    'focus:outline-none focus:ring-2 focus:ring-sky-700/40 focus:border-sky-700';
  const label = 'block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1';

  return (
    <Section id="contact" title={r.contact} intro={r.contact_intro}>
      <div className="grid md:grid-cols-[1fr_1.4fr] gap-8">
        <div className="flex flex-wrap content-start gap-2">
          {p.email && <Pill href={`mailto:${p.email}`} icon={<Mail size={12} />}>{p.email}</Pill>}
          {academicLinks(p).map(l => <Pill key={l.key} href={l.href} icon={<ExternalLink size={12} />}>{l.label}</Pill>)}
        </div>
        <form onSubmit={e => void submit(e)} className="space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <label><span className={label}>{r.form_name}</span><input ref={nameInput} required value={form.name} onChange={set('name')} className={input} /></label>
            <label><span className={label}>{r.form_email}</span><input required type="email" value={form.email} onChange={set('email')} className={input} /></label>
          </div>
          <label className="block"><span className={label}>{r.form_subject}</span><input required value={form.subject} onChange={set('subject')} className={input} /></label>
          <label className="block"><span className={label}>{r.form_message}</span><textarea required rows={5} value={form.message} onChange={set('message')} className={input} /></label>
          <div className="flex flex-wrap items-center gap-3">
            <button type="submit" disabled={state === 'sending'}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-sky-800 text-white text-sm font-medium hover:bg-sky-900 disabled:opacity-60 dark:bg-sky-600 dark:hover:bg-sky-500">
              <Send size={14} />{state === 'sending' ? r.form_sending : r.form_send}
            </button>
            {state === 'sent' && <span className="text-sm text-emerald-700 dark:text-emerald-400">{r.form_sent}</span>}
            {state === 'failed' && <span className="text-sm text-red-700 dark:text-red-400">{r.form_failed}</span>}
          </div>
        </form>
      </div>
    </Section>
  );
};
