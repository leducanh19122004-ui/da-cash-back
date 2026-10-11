/**
 * DA Cashback page copy — V3.1 fee-rebate positioning
 * (DA-ECOSYSTEM-V3.1-SHARED-SPEC.md §1: DA Cashback is an independent
 * trading-fee rebate platform, part of DA Network — NOT the trader membership).
 *
 * ENGLISH ONLY for now. vi / ko / th / id fall back to English for every
 * section, so non-English pages are MIXED and NOT RELEASABLE until these
 * strings are translated (add a per-language object to `v3Copy` below).
 *
 * Rules: no rates, figures, payout windows or response times in copy — those
 * come from config/* and are omitted while null. Daily plans, signals,
 * community, learning and Volume Rewards belong to the hub Trader page and are
 * only mentioned in the cross-link block and the FAQ "difference" answer.
 * No "earn" for traders' rebates; no banned wording (V3 spec §8).
 */
import type { Lang } from './index';
import { BRAND, DISCLAIMERS } from '@/config/ecosystem';

export interface FaqContext {
  hasPublishedTerms: boolean;
  tokenizedConfirmed: boolean;
  telegram: string;
}

const RESPONSIBLE =
  'Rebates return part of the fees you pay. They do not make a losing trade profitable — never trade more just for rebates.';

const en = {
  nav: {
    how: 'How it works',
    exchanges: 'Exchanges',
    status: 'Check status',
    record: 'Record',
    safety: 'Safety',
    faq: 'FAQ',
    contact: 'Contact',
    ctaStart: 'Get started',
    ctaStatus: 'Check status',
  },
  hero: {
    eyebrow: `${BRAND.network} · Trading fee rebates`,
    title1: 'Get part of your',
    title2: 'trading fees back.',
    sub: 'Register through a DA partner link, submit your UID, and receive a rebate on eligible trading fees. Rates, eligible products and payout timing are confirmed per exchange.',
    ctaPrimary: 'See supported exchanges',
    ctaSecondary: 'How cashback works',
    trust: ['UID only', 'No passwords', 'We never hold your funds'],
    trustNote: 'We may also need the exchange name, a way to contact you and confirmation that you registered through our link.',
    cardTitle: 'Exchange status',
    cardBrand: BRAND.cashback,
    open: (n: number) => `${n} open for registration`,
    linkUpdating: (n: number) => `${n} registration link updating`,
    newPartners: (n: number) => `${n} new partners being set up`,
    paused: (n: number) => `${n} partnership paused`,
    termsLabel: 'Rebate terms',
    termsBody: 'Published per exchange once confirmed.',
  },
  benefits: {
    eyebrow: 'What you get',
    title: 'A rebate on the trading fees you already pay.',
    items: [
      { title: 'Fee rebates', body: 'Get part of the fees back on eligible trades, under each exchange’s confirmed terms.' },
      { title: 'Exchanges you trade on', body: 'Rebates work through DA partner links on supported exchanges — you keep trading where you trade.' },
      { title: 'UID-only setup', body: 'We only need your exchange UID. DA never holds your funds or touches your account.' },
      { title: 'A clear record', body: 'Cashback totals are published only after they are reconciled with exchange data.' },
      { title: 'Cashback support', body: 'A person from the DA team answers questions about your UID and your rebates.' },
    ],
  },
  how: {
    eyebrow: 'How cashback works',
    title: 'Five steps, then trade as usual',
    steps: (uidStep: string) => [
      { t: 'Pick an exchange open for registration.', d: 'Only exchanges with a Register button accept new sign-ups through DA today.' },
      { t: 'Register through the DA partner link.', d: 'The link connects your new exchange account to DA Cashback.' },
      { t: 'Submit your UID.', d: uidStep },
      { t: 'Trade as usual.', d: 'Keep trading according to your own plan. Nothing changes on the exchange side.' },
      { t: 'Receive your rebates.', d: 'Rebates are sent according to the exchange’s confirmed terms.' },
    ],
    uidAdmin: (handle: string) => `Send your UID, the exchange name and a way to contact you to the DA team on Telegram (${handle}).`,
    uidBot: 'Send your UID to the DA Telegram bot.',
    uidForm: 'Submit your UID through the DA form.',
    uidLink: 'Open Telegram',
    termsTitle: 'Rebate terms by exchange',
    termsPending: 'Rebate terms are published per exchange once confirmed.',
    termsRebate: 'Rebate',
    termsProducts: 'Eligible products',
    termsPayout: 'Payout timing',
    termsMethod: 'Payout method',
    termsAsk: 'Confirmed per exchange — ask the team',
    products: { spot: 'spot', futures: 'futures', 'tokenized-stocks': 'tokenized stocks' } as Record<string, string>,
    responsibleTitle: 'Trade for your plan, not for the rebate.',
    responsible: RESPONSIBLE,
    cta: 'See supported exchanges',
  },
  exchanges: {
    eyebrow: 'Partner exchanges',
    title: 'Supported exchanges',
    lead: 'Register through a DA partner link to receive rebates. "Partnership paused" means we are not registering new accounts on that exchange right now.',
    count: (c: { open: number; linkUpdating: number; newPartners: number; paused: number }) =>
      [
        `${c.open} open for registration`,
        c.linkUpdating ? `${c.linkUpdating} link updating` : null,
        c.newPartners ? `${c.newPartners} new partners being set up` : null,
        `${c.paused} partnership paused`,
      ]
        .filter(Boolean)
        .join(' · '),
    groupPartners: 'Partner exchanges',
    groupNew: 'New partners',
    groupPaused: 'Partnership paused',
    partnership: {
      active: 'Partner',
      new_deal_pending: 'New partner · setup in progress',
      paused: 'Partnership paused',
    } as Record<string, string>,
    link: {
      awaiting_update: 'Registration link updating',
      awaiting_link: 'Registration link coming',
    } as Record<string, string>,
    colExchange: 'Exchange',
    colMarket: 'Market',
    colStatus: 'Status',
    colAction: 'Registration',
    market: { crypto: 'Crypto', forex: 'Forex' } as Record<string, string>,
    marketUnknown: 'To be confirmed',
    register: 'Register',
    note: 'Registration happens on the exchange itself. DA never asks for your exchange password.',
  },
  record: {
    eyebrow: 'Cashback record',
    title: 'Cashback record',
    lead: 'We publish cashback totals only after reconciling them with partner exchange data. Nothing here is estimated.',
    colMetric: 'Metric',
    colValue: 'Value',
    colStatus: 'Status',
    pendingValue: 'Not yet published',
    pendingStatus: 'Published after reconciliation',
    verified: 'Verified',
    reconciled: 'Checked against exchange data by the DA team',
    period: (p: string) => `Period: ${p}`,
    updated: (d: string) => `Updated ${d}`,
  },
  lookup: {
    eyebrow: 'Cashback tools',
    title: 'Check your cashback status',
    lead: 'Select your exchange and enter your UID. Online status checks are not connected yet — the DA team answers status questions on Telegram.',
    exchangeLabel: 'Exchange',
    exchangePlaceholder: 'Select an exchange',
    exchangeError: 'Select an exchange.',
    uidLabel: 'Exchange UID',
    uidPlaceholder: 'e.g. 12345678',
    uidHint: 'Your UID is in the profile section of your exchange account.',
    uidError: 'Enter your UID.',
    uidShort: 'UID must be at least 4 characters.',
    submit: 'Check status',
    checking: 'Checking…',
    unavailableTitle: 'Online status lookup isn’t connected yet',
    unavailableBody: 'Send your exchange and UID to the DA team on Telegram — your details have not been sent anywhere.',
    contactCta: (handle: string) => `Message ${handle} on Telegram`,
    summaryExchange: 'Exchange',
    summaryUid: 'UID',
    resultLinked: 'Linked to DA',
    resultPeriod: 'Period',
    resultAccrued: 'Accrued',
    resultApproved: 'Approved',
    resultPaid: 'Paid',
    yes: 'Yes',
    no: 'Not confirmed',
    none: 'None yet',
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
      'A deposit to “unlock” rebates',
    ],
    warnTitle: 'Impersonation warning',
    warnBody: 'If anyone claiming to be DA Cashback asks for any of the above, stop and contact us at Telegram',
  },
  traders: {
    eyebrow: `${BRAND.network} for traders`,
    title: 'Looking for daily plans, signals and Volume Rewards?',
    body: `Those are part of ${BRAND.network}’s trader benefits, a separate programme from ${BRAND.cashback}.`,
    cta: `See ${BRAND.network} for traders`,
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Frequently asked questions',
    noAnswer: 'Can’t find your answer?',
    contact: 'Contact the team',
    items: (c: FaqContext) => [
      {
        q: 'What is DA Cashback?',
        a: `A trading-fee rebate platform, part of ${BRAND.network}. Register on a supported exchange through a DA partner link, submit your UID, and receive a rebate on eligible trading fees.`,
      },
      {
        q: 'How do rebates work?',
        a: `When you trade on an account registered through a DA partner link, part of the eligible trading fees you pay comes back to you as a rebate. The rate, eligible products and payout timing are set per exchange and confirmed with its partner programme. ${
          c.hasPublishedTerms
            ? 'Confirmed terms are listed in “How cashback works” above.'
            : 'Rebate terms are published per exchange once confirmed — ask the team for the exchange you use.'
        }`,
      },
      {
        q: 'What do you need from me?',
        a: 'Your exchange UID, the exchange name, a way to contact you (email or Telegram) and confirmation that you registered through our link. Never share your password, 2FA code, private key or seed phrase.',
      },
      {
        q: 'Which exchanges are supported?',
        a: 'The list above shows every exchange and its status. Exchanges with a Register button are open for registration. “Registration link updating” means we are still a partner but the DA link is being replaced — check back or ask the team. “New partner · setup in progress” means the partnership is being set up and the registration link is not ready yet.',
      },
      {
        q: 'When are rebates paid?',
        a: 'Payout timing is confirmed per exchange. Ask the team for the current schedule on your exchange.',
      },
      {
        q: 'I already have an account on this exchange. Can I join?',
        a: 'It depends on the exchange’s partner programme rules, which are confirmed per exchange. Ask the team before you register a new account.',
      },
      {
        q: 'Which trading products are eligible? Do tokenized stocks count?',
        a: `Eligible products (for example spot or futures) are confirmed per exchange. ${
          c.tokenizedConfirmed
            ? 'On some exchanges tokenized stocks are eligible — check the terms for your exchange.'
            : 'Tokenized stocks have not been confirmed as eligible on any exchange yet, so do not count on it.'
        } ${DISCLAIMERS.tokenized}`,
      },
      {
        q: 'Do I need to deposit money with DA?',
        a: 'No. You trade directly on the exchange. DA Cashback is not an exchange and never holds your funds.',
      },
      {
        q: 'Does DA Cashback guarantee profits?',
        a: `No. ${RESPONSIBLE}`,
      },
      {
        q: 'What does “Partnership paused” mean?',
        a: 'We are not registering new accounts on that exchange right now.',
      },
      {
        q: `What is the difference between DA Cashback and ${BRAND.network} Volume Rewards?`,
        a: `They are separate programmes. ${BRAND.cashback} is a trading-fee rebate. Volume Rewards are a ${BRAND.network} trader benefit: milestone-based rewards funded by a portion of ${BRAND.network}’s partner commission, run on the ${BRAND.network} Trader page.`,
      },
      {
        q: 'How do I know a message is really from DA?',
        a: `DA will never ask for your password, 2FA code, seed phrase, private key, an API key with withdrawal rights, a transfer to a personal wallet or a deposit to “unlock” rebates. If anyone does, stop and contact us at Telegram ${c.telegram}.`,
      },
    ],
  },
  contact: {
    eyebrow: 'Support',
    title: 'Contact',
    lead: 'Questions about registering, your UID or your cashback? Message the DA team.',
    channels: 'Contact channels',
    telegram: 'Telegram',
    email: 'Email',
    responseTime: 'Response time',
    hours: 'Hours',
    formTitle: 'Send a message',
    formNote: 'Do not include passwords, 2FA codes, seed phrases or private keys in your message.',
  },
  footer: {
    desc: `A trading-fee rebate platform, part of ${BRAND.network}. Register through a DA partner link, submit your UID and get part of your trading fees back.`,
    disclaimer: `${BRAND.cashback} is part of ${BRAND.network}. It is not an exchange, does not hold client funds and does not give investment advice. Trading crypto and stocks carries a risk of loss. Do your own research before making any decision. Rebate terms may change according to each exchange's policy and partner program.`,
    sections: 'Sections',
    ecosystem: 'DA Network ecosystem',
    network: BRAND.network,
    traders: `${BRAND.network} for traders`,
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
