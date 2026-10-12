/**
 * Per-exchange guides for DA Cashback (#guides and exchange Details).
 *
 * Nothing is confirmed today, so every field is null and the site shows
 * generic, neutral guidance plus "Ask the team on Telegram". Fill a field
 * only from a confirmed source (the owner's own video, or the exchange's
 * written partner-programme rule).
 */
import { exchanges } from './exchanges';

export interface ExchangeGuide {
  exchangeId: string;
  /** Owner-made registration / UID walkthrough video (https). null = none. */
  videoUrl: string | null;
  /**
   * The exchange's confirmed rule for existing accounts / switching referrer,
   * in plain language (EN). null = "confirmed per exchange — ask the team".
   */
  refSwitchPolicy: string | null;
}

export const guides: readonly ExchangeGuide[] = exchanges.map((e) => ({
  exchangeId: e.id,
  videoUrl: null,
  refSwitchPolicy: null,
}));

export const guideFor = (exchangeId: string) => guides.find((g) => g.exchangeId === exchangeId) ?? null;

/** Guides with a confirmed https video. */
export const videoGuides = () =>
  guides.filter((g): g is ExchangeGuide & { videoUrl: string } => typeof g.videoUrl === 'string' && g.videoUrl.startsWith('https://'));
