/**
 * DA Cashback V3 page copy (source: V3-SOURCE-DA-Cashback-content-EN.md, owner doc 2026-10-09).
 *
 * ENGLISH ONLY for now. vi / ko / th / id fall back to English for every V3
 * section, so non-English pages are MIXED and NOT RELEASABLE until these
 * strings are translated (add a per-language object to `v3Copy` below).
 *
 * Rules: no figures, thresholds, rates, response times or payout windows in
 * copy — those come from config/* and are omitted while null. No "earn" for
 * traders' rewards; no banned wording (spec §8).
 */
import type { Lang } from './index';
import { BRAND, DISCLAIMERS } from '@/config/ecosystem';

export interface FaqContext {
  period: string | null;
  payoutDays: number | null;
  products: string | null;
  tokenizedCounts: boolean;
  hasTiers: boolean;
  telegram: string;
}

const en = {
  nav: {
    exchanges: 'Exchanges',
    rewards: 'Rewards',
    join: 'How to join',
    progress: 'Progress',
    safety: 'Safety',
    faq: 'FAQ',
    contact: 'Contact',
    ctaJoin: 'Join',
    ctaProgress: 'Check progress',
  },
  hero: {
    eyebrow: 'DA Network · Trader benefits',
    title1: 'Trade with a plan.',
    title2: 'Get part of your fees back.',
    /** Used once at least one milestone is published (doc wording). */
    subLive:
      'DA Cashback is the trader side of DA Network. Register through our partner link, submit your UID, and receive fee rewards at every volume milestone — plus a daily plan, a community and real support.',
    /** Used while no milestone is published yet. */
    subPending:
      'DA Cashback is the trader side of DA Network. Register through our partner link and submit your UID. Fee rewards come at volume milestones, published here once confirmed with each exchange — plus a daily plan, a community and real support.',
    ctaPrimary: 'See supported exchanges',
    ctaSecondary: 'How rewards work',
    trust: ['UID only', 'No passwords', 'We never hold your funds'],
    trustNote: 'We may also need the exchange name, a way to contact you and confirmation that you registered through our link.',
    cardTitle: 'Membership',
    cardBrand: BRAND.cashback,
    availableNow: (n: number) => `${n} available now`,
    paused: (n: number) => `${n} partnership paused`,
    includedLabel: 'Included',
  },
  benefits: {
    eyebrow: 'What you get',
    title: 'Cashback is one part. The plan, the community and the support are the rest.',
    items: {
      feeRewards: {
        title: 'Fee rewards',
        body: 'Reach a volume milestone and DA sends a reward to your exchange account, where the exchange supports it.',
      },
      dailyPlan: { title: 'Daily plan', body: `A morning market plan and signals on the ${BRAND.scalping} Telegram channel.` },
      community: { title: 'Member community', body: 'A chat group with other DA traders and the team.' },
      learning: {
        title: 'Learning',
        body: 'Free guides on crypto and US stocks, from market basics to trade planning.',
        link: 'Open DA Network Learn',
      },
      support: {
        title: 'Support',
        body: (responseTime: string | null) =>
          responseTime ? `A real person from the DA team replies ${responseTime}.` : 'Support from the DA team — a real person answers your questions.',
      },
    },
    open: 'Open',
  },
  rewards: {
    eyebrow: 'How fee rewards work',
    title: 'Rewards at volume milestones',
    lead: (period: string | null) =>
      `Eligible trades you place through a DA partner link count toward your ${period ? `${period} ` : ''}trading volume. Reach a milestone and DA sends your reward to your exchange account.`,
    ladderTitle: 'Milestone ladder',
    pendingTitle: 'Milestones are being confirmed',
    pendingBody: 'Milestones for each exchange are published here once confirmed with the exchange partner programme.',
    howSteps: [
      { t: 'Trade through a DA partner link', d: 'Your eligible volume is counted on the exchange account you registered with DA.' },
      { t: 'Reach a milestone', d: 'Each published milestone is a volume level for the period.' },
      { t: 'Receive the reward', d: 'DA sends the reward to your exchange account, where the exchange supports it.' },
    ],
    colMilestone: (period: string | null, currency: string) =>
      `Milestone (${period ? `${period} ` : ''}trading volume, ${currency})`,
    colReward: 'Reward',
    exchangeTabs: 'Choose an exchange',
    // Detail bullets — each only when its config value exists.
    bulletBasis: (basis: string, products: string | null) =>
      `Volume is counted from ${basis}${products ? `, on ${products}` : ''}.`,
    bulletPayout: (days: number) =>
      `Rewards are sent within ${days} days after a milestone is confirmed, straight to your exchange account by UID.`,
    bulletBelowFirst: (policy: string) => `Below the first milestone: ${policy}`,
    // Neutral wording while those values are not confirmed.
    neutralBasis: 'Which products count toward volume, and how it is measured, is confirmed per exchange.',
    neutralPayout: 'Payout timing is confirmed per exchange. Ask the team for the current schedule.',
    rates: DISCLAIMERS.rates,
    boxTitle: 'Trade for your plan, not for the milestone.',
    boxBody:
      'Milestones reward the volume you already trade. The fees you pay to reach a milestone are usually larger than the reward, so never add trades just to hit one.',
    demoTag: 'DEMO ONLY — not real milestones',
    products: { spot: 'spot', futures: 'futures', 'tokenized-stocks': 'tokenized stocks' } as Record<string, string>,
    periods: { monthly: 'monthly', weekly: 'weekly' } as Record<string, string>,
  },
  exchanges: {
    eyebrow: 'Partner exchanges',
    title: 'Supported exchanges',
    lead: 'Register through a DA partner link to join. "Partnership paused" means we are not registering new members on that exchange right now.',
    count: (available: number, paused: number) => `${available} available now · ${paused} partnership paused`,
    groupAvailable: 'Available',
    groupPaused: 'Partnership paused',
    statusAvailable: 'Available',
    statusPaused: 'Partnership paused',
    colExchange: 'Exchange',
    colMarket: 'Market',
    colStatus: 'Status',
    colAction: 'Action',
    market: { crypto: 'Crypto', forex: 'Forex' } as Record<string, string>,
    register: 'Register',
    viewMilestones: 'View milestones',
    note: 'Registration happens on the exchange itself. DA never asks for your exchange password.',
  },
  join: {
    eyebrow: 'How to join',
    title: 'Five steps, then trade as usual',
    steps: (uidStep: string) => [
      { t: 'Pick an available exchange.', d: 'Only exchanges marked "Available" are open to new members.' },
      { t: 'Register through the DA partner link.', d: 'The link connects your new account to DA Cashback.' },
      { t: 'Submit your UID.', d: uidStep },
      { t: 'Join the member community and the daily plan channel.', d: null },
      { t: 'Trade as usual and check your milestone progress with your UID.', d: null },
    ],
    uidAdmin: (handle: string) => `Send your UID to the DA team on Telegram (${handle}).`,
    uidBot: 'Send your UID to the DA Telegram bot.',
    uidForm: 'Submit your UID through the DA form.',
    uidLink: 'Open Telegram',
    cta: 'Get part of your fees back',
  },
  record: {
    eyebrow: 'Reward record',
    title: 'Reward record',
    lead: 'We publish totals only after reconciling with partner exchanges. Nothing here is estimated.',
    colMetric: 'Metric',
    colValue: 'Value',
    colStatus: 'Status',
    pendingValue: 'Not yet published',
    pendingStatus: 'Published after reconciliation',
    verified: 'Verified',
    reconciled: 'Reconciled',
    period: (p: string) => `Period: ${p}`,
    updated: (d: string) => `Updated ${d}`,
  },
  progress: {
    eyebrow: 'Member tools',
    title: 'Check your milestone progress',
    lead: 'Select your exchange, enter your UID and see your volume this month, your next milestone and the rewards you have received.',
    exchangeLabel: 'Exchange',
    exchangePlaceholder: 'Select an exchange',
    exchangeError: 'Select an exchange.',
    uidLabel: 'Exchange UID',
    uidPlaceholder: 'e.g. 12345678',
    uidHint: 'Your UID is in the profile section of your exchange account.',
    uidError: 'Enter your UID.',
    uidShort: 'UID must be at least 4 characters.',
    submit: 'Check progress',
    checking: 'Checking…',
    unavailableTitle: 'Online progress lookup isn’t connected yet',
    unavailableBody:
      'Send your exchange and UID to the DA team on Telegram — your details have not been sent anywhere.',
    contactCta: (handle: string) => `Message ${handle} on Telegram`,
    summaryExchange: 'Exchange',
    summaryUid: 'UID',
    resultVolume: 'Eligible volume',
    resultCurrent: 'Current milestone',
    resultNext: 'Next milestone',
    resultHistory: 'Rewards received',
    none: 'None yet',
  },
  signals: {
    eyebrow: BRAND.signalTracking,
    title: 'Every signal on the record',
    bodyLive:
      'We post plans and signals every day. Each one is recorded against real exchange prices, wins and losses alike.',
    bodyBuilding: `${BRAND.scalping}'s plans and signals are being moved onto a public record where each signal is logged with its entry, stop and outcome — wins and losses alike.`,
    cta: 'Verify the record',
    disclaimer: DISCLAIMERS.signal,
  },
  safety: {
    eyebrow: 'Account safety',
    title: 'We only need what it takes to confirm your account',
    needTitle: 'We only ever need',
    need: [
      'Your exchange UID',
      'Your contact (email or Telegram)',
      'The exchange name',
      'Confirmation that you registered through our link',
    ],
    neverTitle: 'We will never ask for',
    never: [
      'Your password',
      'A 2FA code',
      'Your seed phrase',
      'A private key',
      'An API key with withdrawal rights',
      'A transfer to any personal wallet',
      'A deposit to “unlock” rewards',
    ],
    warnTitle: 'Impersonation warning',
    warnBody: 'If anyone claiming to be DA Cashback asks for any of the above, stop and contact us at Telegram',
  },
  testimonials: {
    eyebrow: 'Members',
    title: 'What members say',
    via: (exchange: string) => `Trades on ${exchange}`,
  },
  compare: {
    eyebrow: 'Compare',
    title: 'Two ways to trade with DA',
    lead: 'Pick the one that fits how you trade.',
    colA: BRAND.cashback,
    colB: `${BRAND.affiliate} — Trader offering`,
    rows: [
      {
        k: 'Best for',
        a: 'Traders who want a plan, a community and support',
        b: 'Experienced, higher-volume traders who only want signals',
      },
      {
        k: 'Fee return',
        a: 'Rewards at volume milestones',
        b: 'A fixed commission rate on your own eligible trading fees, where the exchange programme supports it',
      },
      {
        k: 'How it’s paid',
        a: 'Sent by DA to your exchange account, where the exchange supports it',
        b: 'Credited by the exchange’s affiliate system, where supported',
      },
      { k: 'Included', a: 'Daily plan, member community, learning, support', b: 'Signal-only channel' },
    ],
    cta: `Trading at higher volume? See ${BRAND.affiliate}`,
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Frequently asked questions',
    noAnswer: 'Can’t find your answer?',
    contact: 'Contact the team',
    /** Answers that depend on unconfirmed facts use the neutral, true wording until config is set. */
    items: (c: FaqContext) => [
      {
        q: 'What is DA Cashback?',
        a: 'The trader membership of DA Network. You get fee rewards at volume milestones, plus a daily plan, a member community, learning and support.',
      },
      {
        q: 'How do fee rewards work?',
        a: `Eligible trades placed through a DA partner link count toward your ${c.period ? `${c.period} ` : ''}volume. Each milestone you reach comes with a reward, sent by DA to your exchange account where the exchange supports it. ${
          c.hasTiers
            ? 'The current milestones are listed in the rewards section above.'
            : 'Milestones for each exchange are published on this page once confirmed with the exchange partner programme.'
        }`,
      },
      {
        q: 'Do I need to deposit money with DA?',
        a: 'No. You trade directly on the exchange. DA Cashback is not an exchange and never holds your funds.',
      },
      {
        q: 'What do you need from me?',
        a: 'Your exchange UID, the exchange name, a way to contact you (email or Telegram) and confirmation that you registered through our link. Never share your password, 2FA code, private key or seed phrase.',
      },
      {
        q: 'When are rewards sent?',
        a: c.payoutDays
          ? `Within ${c.payoutDays} days after a milestone is confirmed with the exchange.`
          : 'After a milestone is confirmed with the exchange. The exact timing is confirmed per exchange — ask the team for the current schedule.',
      },
      {
        q: 'I already have an account on this exchange. Can I join?',
        a: 'It depends on the exchange’s partner programme rules, which are confirmed per exchange. Ask the team before you register a new account.',
      },
      {
        q: 'Which trading products count toward milestones?',
        a: c.products
          ? `Volume on ${c.products} counts toward milestones. Details can differ by exchange.`
          : 'Which products count (for example spot or futures) is confirmed per exchange with its partner programme. Ask the team for the exchange you use.',
      },
      {
        q: 'Does trading tokenized US stocks count?',
        a: `${
          c.tokenizedCounts
            ? 'On some exchanges, yes — check the milestone details for your exchange.'
            : 'This has not been confirmed for any exchange yet, so do not count on it. Ask the team before relying on it.'
        } ${DISCLAIMERS.tokenized}`,
      },
      {
        q: 'Does DA Cashback guarantee profits?',
        a: 'No. Rewards return part of the fees you paid. They do not make a losing trade profitable.',
      },
      {
        q: 'What does “Partnership paused” mean?',
        a: 'We are not registering new members on that exchange right now.',
      },
      {
        q: 'How do I know a message is really from DA?',
        a: `DA will never ask for your password, 2FA code, seed phrase, private key, an API key with withdrawal rights, a transfer to a personal wallet or a deposit to “unlock” rewards. If anyone does, stop and contact us at Telegram ${c.telegram}.`,
      },
    ],
  },
  contact: {
    eyebrow: 'Support',
    title: 'Contact',
    lead: 'Questions about joining, your UID or a reward? Message the DA team.',
    channels: 'Contact channels',
    telegram: 'Telegram',
    email: 'Email',
    responseTime: 'Response time',
    hours: 'Hours',
    formTitle: 'Send a message',
    formNote: 'Do not include passwords, 2FA codes, seed phrases or private keys in your message.',
  },
  footer: {
    desc: 'The trader membership of DA Network: fee rewards at volume milestones, plus a daily plan, a member community, learning and support.',
    disclaimer:
      "DA Cashback is part of DA Network. It is not an exchange, does not hold client funds and does not give investment advice. Trading crypto and stocks carries a risk of loss. Do your own research before making any decision. Reward tiers may change according to each exchange's policy and partner program.",
    sections: 'Sections',
    ecosystem: 'DA Network ecosystem',
    network: BRAND.network,
    affiliate: BRAND.affiliate,
    tracking: BRAND.signalTracking,
    copyright: (year: number) => `© ${year} ${BRAND.cashback}. Part of ${BRAND.network}.`,
  },
};

export type V3Copy = typeof en;

/**
 * Per-language copy. Non-English entries intentionally point to English until
 * translated (documented as "mixed, not releasable").
 */
export const v3Copy: Record<Lang, V3Copy> = { en, vi: en, ko: en, th: en, id: en };
