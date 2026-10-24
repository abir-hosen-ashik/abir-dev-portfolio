import React from 'react';
import DOMPurify from 'dompurify';

// Passages edited as rich text in batools are stored as HTML. Older values are
// plain text, possibly with <b>…</b>; those still show the same: plain lines
// become paragraphs and HTML passes through. Everything is sanitised first.

const toHtml = (text: string): string => {
  if (/<[a-z][\s\S]*>/i.test(text) && /<\/?(p|ul|ol|li|h\d|blockquote|pre|br)\b/i.test(text)) return text;
  // Plain text (inline tags like <b> allowed): paragraphs on blank lines, breaks on single ones.
  return text.split(/\n{2,}/).map(par => `<p>${par.replace(/\n/g, '<br>')}</p>`).join('');
};

export const RichText: React.FC<{ text: string | null | undefined; className?: string }> = ({ text, className = '' }) =>
  text ? (
    <div
      className={`rich-text ${className}`}
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(toHtml(text), { ADD_ATTR: ['target'] }) }}
    />
  ) : null;

export default RichText;
