/**
 * DA Ecosystem constants for DA Cashback.
 *
 * Mirrors DA-ECOSYSTEM-V3-SHARED-SPEC.md §1, §2, §3, §7, §9 — update there first,
 * then copy the change here. Planned: a build-time script copies the hub's
 * `shared/ecosystem.json` into this file (no shared backend in this phase).
 *
 * Components must read business facts from `config/*`, never hardcode them.
 */

export const BRAND = {
  network: 'DA Network',
  scalping: 'DA Scalping',
  cashback: 'DA Cashback',
  affiliate: 'DA Affiliate',
  signalTracking: 'DA Signal Tracking',
} as const;

/** Production origin of this site (used for metadataBase / canonical / sitemap). */
export const SITE_URL = 'https://www.dacashback.asia';

const AFFILIATE = {
  current: 'https://crypto.danetwork.asia',
  planned: 'https://affiliate.danetwork.asia',
  // Flip to true only after the 308 redirect crypto.* → affiliate.* is live.
  migrated: false,
} as const;

export const URLS = {
  network: 'https://danetwork.asia',
  cashback: 'https://www.dacashback.asia/',
  affiliate: AFFILIATE.migrated ? AFFILIATE.planned : AFFILIATE.current,
  signalTracking: 'https://signal.danetwork.asia/',
  telegramContact: 'https://t.me/jacksondz',
} as const;

export type SiteLang = 'en' | 'vi' | 'ko' | 'th' | 'id';

/** DA Network hub home for a locale (hub uses /en /vi /ko /th /id). */
export const networkUrl = (lang: SiteLang = 'en') => `${URLS.network}/${lang}`;

/** DA Network Learn section (hub). Override with a dedicated URL when one exists. */
export const learnUrl = (lang: SiteLang = 'en') => `${URLS.network}/${lang}#learn`;

/** Verification states (spec §3). */
export type VerificationStatus = 'NOT_AVAILABLE' | 'OWNER_ESTIMATE' | 'OWNER_REPORTED' | 'RECONCILED' | 'VERIFIED';
export const PUBLISHABLE_STATUSES: readonly VerificationStatus[] = ['RECONCILED', 'VERIFIED'];

/**
 * DA Signal Tracking is being rebuilt. While 'building', the signals section
 * must not claim the record already contains verified results.
 */
export const signalRecordStatus: 'building' | 'live' = 'building';

/** Comparison block (spec §9). Footnote stays hidden while null. */
export const comparison = {
  /** e.g. "Switching from DA Cashback to DA Affiliate requires a new exchange account." — owner to confirm. */
  switchingFootnote: null as string | null,
};

/** Standard disclaimers — exact EN text (spec §7). */
export const DISCLAIMERS = {
  market:
    'For information only, not financial advice. Trading crypto and stocks carries a risk of loss. Do your own research before making any decision.',
  signal:
    'Past performance does not guarantee future results. Performance figures, if shown, come from our public tracking at https://signal.danetwork.asia/. Every trading decision is your own.',
  tokenized:
    "Tokenized stocks are products offered by exchanges and may not be available in your country. Check the exchange's eligibility rules before trading.",
  rates: "Rates and reward tiers may change according to each exchange's policy and partner program.",
} as const;
