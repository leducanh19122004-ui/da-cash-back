/**
 * Member benefits (spec §6: Fee rewards · Daily plan · Member community · Learning · Support).
 * Copy lives in app/translations/v3.ts; this file holds the facts each one depends on.
 */
import { learnUrl, type SiteLang } from './ecosystem';
import { memberChannels, supportResponseTime } from './contact';

export type BenefitId = 'feeRewards' | 'dailyPlan' | 'community' | 'learning' | 'support';

export interface Benefit {
  id: BenefitId;
  /** Optional link shown under the benefit. */
  href: string | null;
}

export const benefits = (lang: SiteLang): Benefit[] => [
  { id: 'feeRewards', href: null },
  { id: 'dailyPlan', href: memberChannels.dailyPlanChannel },
  { id: 'community', href: memberChannels.memberCommunity },
  { id: 'learning', href: learnUrl(lang) },
  { id: 'support', href: null },
];

/** Re-exported so the support benefit can decide whether to mention a time. */
export { supportResponseTime };

/** Inactive offers (spec §6) — not mentioned in public copy until enabled. */
export const inactiveOffers = {
  tradingBot: { enabled: false },
  planMarketChannel: { enabled: false },
  factsAndQuotesChannel: { enabled: false },
} as const;
