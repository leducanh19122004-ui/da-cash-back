/**
 * Member testimonials. EMPTY until real, consented feedback exists.
 * The "What members say" section is not rendered at all while no entry passes
 * `isPublishableTestimonial`.
 *
 * Every entry needs a written consent reference and an approver. The
 * exchange must be one that is `available` today (BingX, Bitunix, Ourbit).
 */
import { exchangeById, isAvailable } from './exchanges';

export interface Testimonial {
  id: string;
  /** Exactly as the member wrote it (translate separately, never rewrite). */
  quote: string;
  originalLanguage: 'en' | 'vi' | 'ko' | 'th' | 'id';
  /** Name or handle the member agreed to show, e.g. "Minh T." */
  displayName: string;
  country?: string;
  exchangeId: string;
  /** ISO date the feedback was given. */
  date: string;
  /** Where it was collected, e.g. "Telegram DM". */
  source: string;
  /** Reference to the stored consent record. */
  consentRef: string;
  approvedBy: string;
  approvedAt: string; // ISO date
}

export const testimonials: readonly Testimonial[] = [];

export function isPublishableTestimonial(t: Testimonial): boolean {
  const ex = exchangeById(t.exchangeId);
  return (
    !!ex &&
    isAvailable(ex) &&
    [t.quote, t.displayName, t.date, t.source, t.consentRef, t.approvedBy, t.approvedAt].every((v) => !!v && v.trim() !== '')
  );
}

export const publishedTestimonials = () => testimonials.filter(isPublishableTestimonial);
