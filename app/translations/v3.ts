/**
 * DA Cashback page copy — V3.2 homepage (fee-rebate platform).
 * DA-ECOSYSTEM-V3.1-SHARED-SPEC.md §1: DA Cashback is an independent
 * trading-fee rebate platform, part of DA Network. It is NOT a membership and
 * NOT a signal provider.
 *
 * English is canonical. Vietnamese is a full translation of every string.
 * ko / th / id fall back to English (see `v3Copy` at the bottom) — those
 * pages are mixed-language and NOT releasable until translated.
 *
 * Rules: no rates, figures, payout windows or response times in copy — those
 * come from config/* and are omitted while null. Volume Rewards belong to the
 * DA Network Trader Hub and are never called cashback. No "earn" for traders'
 * rebates; no banned wording (V3 spec §8).
 */
import type { Lang } from './index';
import { BRAND, DISCLAIMERS } from '@/config/ecosystem';

export interface FaqContext {
  hasPublishedTerms: boolean;
  tokenizedConfirmed: boolean;
  telegram: string;
}

type Counts = { open: number; linkUpdating: number; newPartners: number; paused: number };

const VI_MARKET_DISCLAIMER =
  'Chỉ nhằm mục đích cung cấp thông tin, không phải lời khuyên tài chính. Giao dịch crypto và cổ phiếu có rủi ro thua lỗ. Hãy tự nghiên cứu trước khi đưa ra bất kỳ quyết định nào.';
const VI_TOKENIZED_DISCLAIMER =
  'Cổ phiếu token hoá là sản phẩm do sàn cung cấp và có thể không khả dụng tại quốc gia của bạn. Hãy kiểm tra điều kiện của sàn trước khi giao dịch.';

const RESPONSIBLE_EN =
  'Rebates return part of the fees you pay. They do not make a losing trade profitable — never trade more just for rebates.';
const RESPONSIBLE_VI =
  'Hoàn phí chỉ trả lại một phần phí bạn đã trả. Hoàn phí không biến một lệnh thua thành lệnh có lãi — đừng bao giờ giao dịch nhiều hơn chỉ vì hoàn phí.';

const en = {
  nav: {
    exchanges: 'Exchanges',
    how: 'How it works',
    rebates: 'Rebates',
    guides: 'Guides',
    safety: 'Safety',
    faq: 'FAQ',
    contact: 'Contact',
    ecosystem: 'Ecosystem',
    ecosystemMenu: 'DA ecosystem products',
    ctaStart: 'Choose an exchange',
  },
  hero: {
    eyebrow: `${BRAND.network} · Trading-fee rebates`,
    title: 'Get part of your trading fees back.',
    sub: 'DA Cashback is a trading-fee rebate platform: register through a DA partner link, confirm your UID and receive rebates under each exchange’s confirmed terms.',
    ctaPrimary: 'Choose an exchange',
    ctaSecondary: 'How it works',
    trust: ['UID only', 'No passwords', 'We never hold your funds'],
    panelTitle: 'Open for registration',
    panelEmpty: 'No exchange is open for registration right now.',
    register: 'Register',
    more: (c: Counts) =>
      [
        c.linkUpdating ? `${c.linkUpdating} link updating` : null,
        c.newPartners ? `${c.newPartners} new partners being set up` : null,
        c.paused ? `${c.paused} partnership paused` : null,
      ]
        .filter(Boolean)
        .join(' · '),
    allExchanges: 'All exchanges',
    flowTitle: 'How a rebate is made',
    flow: ['Eligible fees', 'Confirmation', 'Rebate'],
    flowNote: 'Rates and payout timing are confirmed per exchange.',
  },
  exchanges: {
    eyebrow: 'Exchanges',
    title: 'Choose an exchange',
    lead: 'Register through a DA partner link. Registration happens on the exchange itself — DA never asks for your exchange password.',
    count: (c: Counts) =>
      [
        `${c.open} open for registration`,
        c.linkUpdating ? `${c.linkUpdating} link updating` : null,
        c.newPartners ? `${c.newPartners} new partners being set up` : null,
        `${c.paused} partnership paused`,
      ]
        .filter(Boolean)
        .join(' · '),
    searchLabel: 'Search exchanges',
    searchPlaceholder: 'Search by name',
    filterLabel: 'Market',
    filterAll: 'All',
    showPaused: 'Show paused exchanges',
    shown: (n: number) => (n === 1 ? '1 exchange shown' : `${n} exchanges shown`),
    empty: 'No exchange matches your search.',
    clear: 'Clear filters',
    forexNote: 'Forex rebates are not offered yet. Forex exchanges are listed for reference only.',
    note: 'Rebate rates are published per exchange once they are confirmed with the exchange. Open Details for what is confirmed today.',
    partnership: {
      active: 'Partner',
      new_deal_pending: 'New partner · setup in progress',
      paused: 'Partnership paused',
    } as Record<string, string>,
    link: {
      awaiting_update: 'Registration link updating',
      awaiting_link: 'Registration link coming',
    } as Record<string, string>,
    market: { crypto: 'Crypto', forex: 'Forex' } as Record<string, string>,
    marketUnknown: 'To be confirmed',
    register: 'Register',
    details: 'Details',
    detailsFor: (name: string) => `Details for ${name}`,
    partnerCode: 'Partner code',
    copy: 'Copy',
    copied: 'Copied',
    copyLabel: (name: string) => `Copy the ${name} partner code`,
    rate: 'Rebate rate',
    basis: 'Calculation basis',
    products: 'Eligible products',
    payout: 'Payout period',
    method: 'Payout method',
    existing: 'Existing accounts',
    askTeam: 'Confirmed per exchange — ask the team',
    termsPending: (name: string) => `Rebate terms for ${name} are published here once confirmed with the exchange.`,
    termsNew: (name: string) => `${name} is a new partner. Terms and the registration link are being set up.`,
    termsPaused: (name: string) => `We are not registering new accounts on ${name} through DA right now.`,
    productNames: { spot: 'Spot', futures: 'Futures', 'tokenized-stocks': 'Tokenized stocks' } as Record<string, string>,
  },
  how: {
    eyebrow: 'How it works',
    title: 'Four steps, then trade as usual',
    steps: (uidStep: string) => [
      { t: 'Choose an exchange', d: 'Pick an exchange open for registration and sign up through the DA partner link.' },
      { t: 'Confirm your UID', d: uidStep },
      { t: 'Trade to your plan', d: 'Trade as you normally would. Nothing changes on the exchange side.' },
      { t: 'Receive rebates', d: 'Rebates are paid under the terms confirmed for your exchange.' },
    ],
    uidAdmin: (handle: string) => `Send your UID and the exchange name to the DA team on Telegram (${handle}).`,
    uidBot: 'Send your UID to the DA Telegram bot.',
    uidForm: 'Submit your UID through the DA form.',
    uidLink: 'Open Telegram',
    responsibleTitle: 'Trade for your plan, not for the rebate.',
    responsible: RESPONSIBLE_EN,
  },
  rebates: {
    eyebrow: 'Rebates & payouts',
    title: 'Check your rebates and payout history',
    lookupTitle: 'Rebate status',
    lookupStatus: 'Online lookup isn’t available yet',
    lookupBody: 'Ask the DA team on Telegram about your rebate status. For your privacy, account data is never shown from a UID alone.',
    lookupCta: 'Ask on Telegram',
    historyTitle: 'Payout history',
    states: [
      { id: 'accrued', label: 'Pending', d: 'Fees are counted and waiting for confirmation with the exchange.' },
      { id: 'approved', label: 'Approved', d: 'Confirmed with the exchange and scheduled for payout.' },
      { id: 'paid', label: 'Paid', d: 'The payout has been sent.' },
    ],
    statesNote: 'The three states are tracked separately and never added together.',
    emptyTitle: 'No payout figures published yet',
    emptyBody: 'Figures appear here only after they are reconciled with exchange data.',
    metricLabels: {
      'cashback-paid-total': 'Rebates paid (total)',
      'cashback-paid-month': 'Rebates paid this month',
      'verified-accounts': 'Verified accounts',
    } as Record<string, string>,
    verified: 'Verified',
    reconciled: 'Checked against exchange data by the DA team',
    period: (p: string) => `Period: ${p}`,
    updated: (d: string) => `Updated ${d}`,
  },
  guides: {
    eyebrow: 'Guides',
    title: 'Before you register',
    readMore: 'Read the guide',
    readLess: 'Hide the guide',
    items: [
      {
        id: 'register',
        title: 'Register through DA',
        summary: 'Sign up on the exchange through the DA partner link so your account is linked to DA.',
        steps: [
          'Use the Register button on this page — it opens the exchange’s own sign-up page.',
          'If the sign-up form shows a referral or partner code, check it matches the code in that exchange’s Details.',
          'Complete sign-up and any identity checks on the exchange itself.',
          'Only enter your exchange password on the exchange’s own website or app.',
        ],
      },
      {
        id: 'uid',
        title: 'Find your UID',
        summary: 'Your UID is the account number shown in your exchange profile — it is all we need.',
        steps: [
          'Open the exchange app or website and go to your profile or account page.',
          'Copy the UID (sometimes called User ID). It is a number, not your email address.',
          'Send it to the DA team on Telegram together with the exchange name.',
          'Never send passwords, 2FA codes, seed phrases or keys — DA will never ask for them.',
        ],
      },
      {
        id: 'existing',
        title: 'Existing account & referral',
        summary: 'Already have an account on the exchange? Ask the team before you do anything.',
        steps: [
          'Whether an existing account can be linked to DA depends on each exchange’s partner programme rules.',
          'Some exchanges let you change the referral; others do not. The rule is confirmed per exchange.',
          'Ask the DA team before you open a new account or contact the exchange about your referral.',
        ],
      },
    ],
    videos: 'Video guides',
    watch: (name: string) => `Watch the ${name} guide`,
    perExchange: 'Per-exchange guides are added here once they are confirmed.',
    ask: 'Ask the team on Telegram',
  },
  ecosystem: {
    eyebrow: 'DA ecosystem',
    title: `Part of ${BRAND.network}`,
    lead: `${BRAND.cashback} handles trading-fee rebates. Other DA products are separate, each with its own site.`,
    items: [
      {
        id: 'network',
        name: BRAND.network,
        tag: 'Trader Hub, community and Volume Rewards',
        body: 'Daily plans, the trader community and Volume Rewards live on the DA Network Trader Hub. Volume Rewards are a separate programme from cashback.',
        cta: `Visit ${BRAND.network}`,
      },
      {
        id: 'affiliate',
        name: BRAND.affiliate,
        tag: 'Partnerships and direct commission',
        body: 'A partner programme for people who refer traders, with one-level direct commission.',
        cta: `Visit ${BRAND.affiliate}`,
      },
      {
        id: 'signal',
        name: BRAND.signalTracking,
        tag: 'Signal record and methodology',
        body: 'A public record of DA signals, their history and how results are evaluated.',
        cta: `Visit ${BRAND.signalTracking}`,
      },
    ],
  },
  safety: {
    title: 'Account safety',
    items: ['UID only', 'No passwords', 'No 2FA codes', 'No private keys', 'We never hold funds', 'No deposits to unlock rebates'],
    warnBody: 'If anyone claiming to be DA Cashback asks for any of these, stop and contact us on Telegram',
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Frequently asked questions',
    noAnswer: 'Can’t find your answer?',
    contact: 'Contact the team',
    items: (c: FaqContext) => [
      {
        q: 'What is DA Cashback?',
        a: `A trading-fee rebate platform, part of ${BRAND.network}. Register on a supported exchange through a DA partner link, confirm your UID, and receive a rebate on eligible trading fees. It is not a membership and does not provide trading signals.`,
      },
      {
        q: 'How do rebates work?',
        a: `When you trade on an account registered through a DA partner link, part of the eligible trading fees you pay comes back to you as a rebate. The rate, eligible products and payout timing are set per exchange and confirmed with its partner programme. ${
          c.hasPublishedTerms
            ? 'Confirmed terms are shown in each exchange’s Details above.'
            : 'Rebate terms are published per exchange once confirmed — ask the team for the exchange you use.'
        }`,
      },
      {
        q: 'What do you need from me?',
        a: 'Your exchange UID, the exchange name and a way to contact you (Telegram or email). Never share your password, 2FA code, private key or seed phrase.',
      },
      {
        q: 'Which exchanges are supported?',
        a: 'The list above shows every exchange and its status. Exchanges with a Register button are open for registration. “Registration link updating” means we are still a partner but the DA link is being replaced. “New partner · setup in progress” means the registration link is not ready yet.',
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
        a: `No. ${RESPONSIBLE_EN}`,
      },
      {
        q: `What is the difference between DA Cashback and ${BRAND.network} Volume Rewards?`,
        a: `They are separate programmes. ${BRAND.cashback} is a trading-fee rebate. Volume Rewards are a ${BRAND.network} trader benefit: milestone-based rewards funded by a portion of ${BRAND.network}’s partner commission, run on the ${BRAND.network} Trader Hub.`,
      },
      {
        q: 'How do I know a message is really from DA?',
        a: `DA will never ask for your password, 2FA code, seed phrase, private key, an API key with withdrawal rights, a transfer to a personal wallet or a deposit to “unlock” rebates. If anyone does, stop and contact us on Telegram ${c.telegram}.`,
      },
    ],
  },
  disclosures: {
    eyebrow: 'Disclosures',
    title: 'Risk and programme conditions',
    riskTitle: 'Trading risk',
    risk: [DISCLAIMERS.market, RESPONSIBLE_EN],
    programmeTitle: 'Programme conditions',
    programme: [
      'Rebate rates, eligible products and payout timing are set by each exchange’s partner programme and may change.',
      'Rebates apply only to accounts registered through a DA partner link and confirmed by UID, where the exchange allows it.',
      `${BRAND.cashback} is not an exchange, does not hold client funds and does not give investment advice.`,
    ],
    terms: 'Terms of service',
    riskLink: 'Risk disclaimer',
  },
  contact: {
    eyebrow: 'Support',
    title: 'Contact',
    lead: 'Questions about registering, your UID or your rebates? Message the DA team on Telegram.',
    channels: 'Contact channels',
    telegram: 'Telegram',
    email: 'Email',
    responseTime: 'Response time',
    hours: 'Hours',
    telegramCta: 'Message on Telegram',
    formTitle: 'Or send a message',
    formNote: 'Do not include passwords, 2FA codes, seed phrases or private keys in your message.',
  },
  footer: {
    desc: `A trading-fee rebate platform, part of ${BRAND.network}. Register through a DA partner link, confirm your UID and get part of your trading fees back.`,
    disclaimer: `${BRAND.cashback} is part of ${BRAND.network}. It is not an exchange, does not hold client funds and does not give investment advice. Trading crypto and stocks carries a risk of loss. Do your own research before making any decision. Rebate terms may change according to each exchange's policy and partner programme.`,
    sections: 'Sections',
    ecosystem: 'DA Network ecosystem',
    network: BRAND.network,
    traders: `${BRAND.network} Trader Hub`,
    affiliate: BRAND.affiliate,
    tracking: BRAND.signalTracking,
    copyright: (year: number) => `© ${year} ${BRAND.cashback}. Part of ${BRAND.network}.`,
  },
};

export type V3Copy = typeof en;

const vi: V3Copy = {
  nav: {
    exchanges: 'Sàn giao dịch',
    how: 'Cách hoạt động',
    rebates: 'Hoàn phí',
    guides: 'Hướng dẫn',
    safety: 'An toàn',
    faq: 'Hỏi đáp',
    contact: 'Liên hệ',
    ecosystem: 'Hệ sinh thái',
    ecosystemMenu: 'Các sản phẩm trong hệ sinh thái DA',
    ctaStart: 'Chọn sàn',
  },
  hero: {
    eyebrow: `${BRAND.network} · Hoàn phí giao dịch`,
    title: 'Nhận lại một phần phí giao dịch của bạn.',
    sub: 'DA Cashback là nền tảng hoàn phí giao dịch: đăng ký qua link đối tác của DA, xác nhận UID và nhận hoàn phí theo điều khoản đã xác nhận của từng sàn.',
    ctaPrimary: 'Chọn sàn',
    ctaSecondary: 'Cách hoạt động',
    trust: ['Chỉ cần UID', 'Không cần mật khẩu', 'DA không bao giờ giữ tiền của bạn'],
    panelTitle: 'Đang mở đăng ký',
    panelEmpty: 'Hiện chưa có sàn nào mở đăng ký.',
    register: 'Đăng ký',
    more: (c: Counts) =>
      [
        c.linkUpdating ? `${c.linkUpdating} sàn đang cập nhật link` : null,
        c.newPartners ? `${c.newPartners} đối tác mới đang thiết lập` : null,
        c.paused ? `${c.paused} sàn tạm dừng hợp tác` : null,
      ]
        .filter(Boolean)
        .join(' · '),
    allExchanges: 'Tất cả các sàn',
    flowTitle: 'Hoàn phí được tạo ra như thế nào',
    flow: ['Phí hợp lệ', 'Xác nhận', 'Hoàn phí'],
    flowNote: 'Tỷ lệ và thời gian chi trả được xác nhận theo từng sàn.',
  },
  exchanges: {
    eyebrow: 'Sàn giao dịch',
    title: 'Chọn sàn',
    lead: 'Đăng ký qua link đối tác của DA. Việc đăng ký diễn ra ngay trên sàn — DA không bao giờ hỏi mật khẩu tài khoản sàn của bạn.',
    count: (c: Counts) =>
      [
        `${c.open} sàn mở đăng ký`,
        c.linkUpdating ? `${c.linkUpdating} sàn đang cập nhật link` : null,
        c.newPartners ? `${c.newPartners} đối tác mới đang thiết lập` : null,
        `${c.paused} sàn tạm dừng hợp tác`,
      ]
        .filter(Boolean)
        .join(' · '),
    searchLabel: 'Tìm sàn',
    searchPlaceholder: 'Tìm theo tên',
    filterLabel: 'Thị trường',
    filterAll: 'Tất cả',
    showPaused: 'Hiện các sàn tạm dừng',
    shown: (n: number) => `Đang hiển thị ${n} sàn`,
    empty: 'Không có sàn nào khớp với tìm kiếm.',
    clear: 'Xoá bộ lọc',
    forexNote: 'Hiện chưa có hoàn phí cho Forex. Các sàn Forex chỉ được liệt kê để tham khảo.',
    note: 'Tỷ lệ hoàn phí được công bố theo từng sàn sau khi đã xác nhận với sàn. Mở phần Chi tiết để xem những gì đã được xác nhận hôm nay.',
    partnership: {
      active: 'Đối tác',
      new_deal_pending: 'Đối tác mới · đang thiết lập',
      paused: 'Tạm dừng hợp tác',
    } as Record<string, string>,
    link: {
      awaiting_update: 'Đang cập nhật link đăng ký',
      awaiting_link: 'Link đăng ký sắp có',
    } as Record<string, string>,
    market: { crypto: 'Crypto', forex: 'Forex' } as Record<string, string>,
    marketUnknown: 'Đang xác nhận',
    register: 'Đăng ký',
    details: 'Chi tiết',
    detailsFor: (name: string) => `Chi tiết về ${name}`,
    partnerCode: 'Mã đối tác',
    copy: 'Sao chép',
    copied: 'Đã sao chép',
    copyLabel: (name: string) => `Sao chép mã đối tác ${name}`,
    rate: 'Tỷ lệ hoàn phí',
    basis: 'Cách tính',
    products: 'Sản phẩm áp dụng',
    payout: 'Kỳ chi trả',
    method: 'Hình thức chi trả',
    existing: 'Tài khoản đã có sẵn',
    askTeam: 'Xác nhận theo từng sàn — hãy hỏi đội ngũ DA',
    termsPending: (name: string) => `Điều khoản hoàn phí của ${name} sẽ được công bố tại đây sau khi xác nhận với sàn.`,
    termsNew: (name: string) => `${name} là đối tác mới. Điều khoản và link đăng ký đang được thiết lập.`,
    termsPaused: (name: string) => `Hiện DA không nhận đăng ký tài khoản mới trên ${name}.`,
    productNames: { spot: 'Spot', futures: 'Futures', 'tokenized-stocks': 'Cổ phiếu token hoá' } as Record<string, string>,
  },
  how: {
    eyebrow: 'Cách hoạt động',
    title: 'Bốn bước, rồi giao dịch như bình thường',
    steps: (uidStep: string) => [
      { t: 'Chọn sàn', d: 'Chọn một sàn đang mở đăng ký và đăng ký qua link đối tác của DA.' },
      { t: 'Xác nhận UID', d: uidStep },
      { t: 'Giao dịch theo kế hoạch', d: 'Giao dịch như bạn vẫn làm. Không có gì thay đổi ở phía sàn.' },
      { t: 'Nhận hoàn phí', d: 'Hoàn phí được chi trả theo điều khoản đã xác nhận cho sàn của bạn.' },
    ],
    uidAdmin: (handle: string) => `Gửi UID và tên sàn cho đội ngũ DA qua Telegram (${handle}).`,
    uidBot: 'Gửi UID của bạn cho bot Telegram của DA.',
    uidForm: 'Gửi UID qua biểu mẫu của DA.',
    uidLink: 'Mở Telegram',
    responsibleTitle: 'Giao dịch theo kế hoạch, không phải vì hoàn phí.',
    responsible: RESPONSIBLE_VI,
  },
  rebates: {
    eyebrow: 'Hoàn phí & chi trả',
    title: 'Kiểm tra hoàn phí và lịch sử chi trả',
    lookupTitle: 'Trạng thái hoàn phí',
    lookupStatus: 'Chưa có tra cứu trực tuyến',
    lookupBody: 'Hãy hỏi đội ngũ DA trên Telegram về trạng thái hoàn phí của bạn. Để bảo vệ quyền riêng tư, dữ liệu tài khoản không bao giờ được hiển thị chỉ dựa trên UID.',
    lookupCta: 'Hỏi qua Telegram',
    historyTitle: 'Lịch sử chi trả',
    states: [
      { id: 'accrued', label: 'Đang chờ', d: 'Phí đã được ghi nhận và đang chờ xác nhận với sàn.' },
      { id: 'approved', label: 'Đã duyệt', d: 'Đã xác nhận với sàn và được lên lịch chi trả.' },
      { id: 'paid', label: 'Đã chi trả', d: 'Khoản chi trả đã được gửi.' },
    ],
    statesNote: 'Ba trạng thái được theo dõi riêng và không bao giờ cộng gộp với nhau.',
    emptyTitle: 'Chưa có số liệu chi trả được công bố',
    emptyBody: 'Số liệu chỉ xuất hiện ở đây sau khi đã đối soát với dữ liệu của sàn.',
    metricLabels: {
      'cashback-paid-total': 'Hoàn phí đã chi trả (tổng)',
      'cashback-paid-month': 'Hoàn phí đã chi trả trong tháng',
      'verified-accounts': 'Tài khoản đã xác minh',
    } as Record<string, string>,
    verified: 'Đã xác minh',
    reconciled: 'Đã được đội ngũ DA đối soát với dữ liệu của sàn',
    period: (p: string) => `Kỳ: ${p}`,
    updated: (d: string) => `Cập nhật ${d}`,
  },
  guides: {
    eyebrow: 'Hướng dẫn',
    title: 'Trước khi đăng ký',
    readMore: 'Xem hướng dẫn',
    readLess: 'Ẩn hướng dẫn',
    items: [
      {
        id: 'register',
        title: 'Đăng ký qua DA',
        summary: 'Đăng ký trên sàn qua link đối tác của DA để tài khoản được liên kết với DA.',
        steps: [
          'Dùng nút Đăng ký trên trang này — nút sẽ mở trang đăng ký chính thức của sàn.',
          'Nếu biểu mẫu đăng ký có ô mã giới thiệu hoặc mã đối tác, hãy kiểm tra mã khớp với mã trong phần Chi tiết của sàn đó.',
          'Hoàn tất đăng ký và các bước xác minh danh tính ngay trên sàn.',
          'Chỉ nhập mật khẩu sàn trên website hoặc ứng dụng chính thức của sàn.',
        ],
      },
      {
        id: 'uid',
        title: 'Tìm UID của bạn',
        summary: 'UID là mã số tài khoản hiển thị trong hồ sơ trên sàn — đó là tất cả những gì DA cần.',
        steps: [
          'Mở ứng dụng hoặc website của sàn và vào trang hồ sơ hoặc tài khoản.',
          'Sao chép UID (đôi khi gọi là User ID). Đó là một dãy số, không phải địa chỉ email.',
          'Gửi UID kèm tên sàn cho đội ngũ DA qua Telegram.',
          'Không bao giờ gửi mật khẩu, mã 2FA, cụm từ khôi phục hay khoá — DA sẽ không bao giờ hỏi những thông tin này.',
        ],
      },
      {
        id: 'existing',
        title: 'Tài khoản có sẵn & mã giới thiệu',
        summary: 'Bạn đã có tài khoản trên sàn? Hãy hỏi đội ngũ DA trước khi làm bất cứ điều gì.',
        steps: [
          'Việc tài khoản có sẵn có thể liên kết với DA hay không phụ thuộc vào quy định chương trình đối tác của từng sàn.',
          'Một số sàn cho phép đổi người giới thiệu, một số sàn thì không. Quy định được xác nhận theo từng sàn.',
          'Hãy hỏi đội ngũ DA trước khi mở tài khoản mới hoặc liên hệ sàn về mã giới thiệu.',
        ],
      },
    ],
    videos: 'Video hướng dẫn',
    watch: (name: string) => `Xem hướng dẫn cho ${name}`,
    perExchange: 'Hướng dẫn riêng cho từng sàn sẽ được bổ sung tại đây sau khi được xác nhận.',
    ask: 'Hỏi đội ngũ DA trên Telegram',
  },
  ecosystem: {
    eyebrow: 'Hệ sinh thái DA',
    title: `Một phần của ${BRAND.network}`,
    lead: `${BRAND.cashback} phụ trách hoàn phí giao dịch. Các sản phẩm DA khác hoạt động riêng, mỗi sản phẩm có website riêng.`,
    items: [
      {
        id: 'network',
        name: BRAND.network,
        tag: 'Trader Hub, cộng đồng và Volume Rewards',
        body: 'Kế hoạch giao dịch hằng ngày, cộng đồng trader và Volume Rewards nằm trên Trader Hub của DA Network. Volume Rewards là chương trình riêng, không phải hoàn phí.',
        cta: `Truy cập ${BRAND.network}`,
      },
      {
        id: 'affiliate',
        name: BRAND.affiliate,
        tag: 'Hợp tác và hoa hồng trực tiếp',
        body: 'Chương trình đối tác dành cho người giới thiệu trader, với hoa hồng trực tiếp một cấp.',
        cta: `Truy cập ${BRAND.affiliate}`,
      },
      {
        id: 'signal',
        name: BRAND.signalTracking,
        tag: 'Hồ sơ tín hiệu và phương pháp',
        body: 'Hồ sơ công khai về các tín hiệu của DA, lịch sử và cách đánh giá kết quả.',
        cta: `Truy cập ${BRAND.signalTracking}`,
      },
    ],
  },
  safety: {
    title: 'An toàn tài khoản',
    items: [
      'Chỉ cần UID',
      'Không hỏi mật khẩu',
      'Không hỏi mã 2FA',
      'Không hỏi khoá riêng tư',
      'Không bao giờ giữ tiền',
      'Không yêu cầu nạp tiền để “mở khoá” hoàn phí',
    ],
    warnBody: 'Nếu có ai tự xưng là DA Cashback và hỏi bất kỳ thông tin nào ở trên, hãy dừng lại và liên hệ chúng tôi qua Telegram',
  },
  faq: {
    eyebrow: 'Hỏi đáp',
    title: 'Câu hỏi thường gặp',
    noAnswer: 'Không tìm thấy câu trả lời?',
    contact: 'Liên hệ đội ngũ DA',
    items: (c: FaqContext) => [
      {
        q: 'DA Cashback là gì?',
        a: `Một nền tảng hoàn phí giao dịch, thuộc ${BRAND.network}. Đăng ký trên sàn được hỗ trợ qua link đối tác của DA, xác nhận UID và nhận hoàn phí trên phí giao dịch hợp lệ. Đây không phải gói thành viên và không cung cấp tín hiệu giao dịch.`,
      },
      {
        q: 'Hoàn phí hoạt động như thế nào?',
        a: `Khi bạn giao dịch trên tài khoản đăng ký qua link đối tác của DA, một phần phí giao dịch hợp lệ bạn đã trả sẽ được hoàn lại. Tỷ lệ, sản phẩm áp dụng và thời gian chi trả do từng sàn quy định và được xác nhận với chương trình đối tác của sàn. ${
          c.hasPublishedTerms
            ? 'Điều khoản đã xác nhận được hiển thị trong phần Chi tiết của từng sàn ở trên.'
            : 'Điều khoản hoàn phí được công bố theo từng sàn sau khi xác nhận — hãy hỏi đội ngũ DA về sàn bạn dùng.'
        }`,
      },
      {
        q: 'DA cần gì từ tôi?',
        a: 'UID tài khoản sàn, tên sàn và cách liên hệ với bạn (Telegram hoặc email). Không bao giờ chia sẻ mật khẩu, mã 2FA, khoá riêng tư hay cụm từ khôi phục.',
      },
      {
        q: 'Những sàn nào được hỗ trợ?',
        a: 'Danh sách ở trên hiển thị mọi sàn và trạng thái của sàn. Sàn có nút Đăng ký là sàn đang mở đăng ký. “Đang cập nhật link đăng ký” nghĩa là DA vẫn là đối tác nhưng link của DA đang được thay mới. “Đối tác mới · đang thiết lập” nghĩa là link đăng ký chưa sẵn sàng.',
      },
      {
        q: 'Khi nào hoàn phí được chi trả?',
        a: 'Thời gian chi trả được xác nhận theo từng sàn. Hãy hỏi đội ngũ DA về lịch chi trả hiện tại trên sàn của bạn.',
      },
      {
        q: 'Tôi đã có tài khoản trên sàn này. Tôi có tham gia được không?',
        a: 'Điều này phụ thuộc vào quy định chương trình đối tác của sàn, được xác nhận theo từng sàn. Hãy hỏi đội ngũ DA trước khi đăng ký tài khoản mới.',
      },
      {
        q: 'Sản phẩm giao dịch nào được áp dụng? Cổ phiếu token hoá có được tính không?',
        a: `Sản phẩm áp dụng (ví dụ spot hoặc futures) được xác nhận theo từng sàn. ${
          c.tokenizedConfirmed
            ? 'Trên một số sàn, cổ phiếu token hoá được áp dụng — hãy kiểm tra điều khoản của sàn bạn dùng.'
            : 'Cổ phiếu token hoá chưa được xác nhận là áp dụng trên sàn nào, vì vậy đừng tính đến điều này.'
        } ${VI_TOKENIZED_DISCLAIMER}`,
      },
      {
        q: 'Tôi có cần nạp tiền cho DA không?',
        a: 'Không. Bạn giao dịch trực tiếp trên sàn. DA Cashback không phải sàn giao dịch và không bao giờ giữ tiền của bạn.',
      },
      {
        q: 'DA Cashback có cam kết lợi nhuận không?',
        a: `Không. ${RESPONSIBLE_VI}`,
      },
      {
        q: `DA Cashback khác gì Volume Rewards của ${BRAND.network}?`,
        a: `Đây là hai chương trình riêng biệt. ${BRAND.cashback} là hoàn phí giao dịch. Volume Rewards là quyền lợi dành cho trader của ${BRAND.network}: phần thưởng theo các mốc khối lượng, được tài trợ từ một phần hoa hồng đối tác của ${BRAND.network}, và vận hành trên Trader Hub của ${BRAND.network}.`,
      },
      {
        q: 'Làm sao biết tin nhắn thực sự đến từ DA?',
        a: `DA sẽ không bao giờ hỏi mật khẩu, mã 2FA, cụm từ khôi phục, khoá riêng tư, API key có quyền rút tiền, yêu cầu chuyển tiền vào ví cá nhân hay nạp tiền để “mở khoá” hoàn phí. Nếu có ai yêu cầu như vậy, hãy dừng lại và liên hệ chúng tôi qua Telegram ${c.telegram}.`,
      },
    ],
  },
  disclosures: {
    eyebrow: 'Công bố',
    title: 'Rủi ro và điều kiện chương trình',
    riskTitle: 'Rủi ro giao dịch',
    risk: [VI_MARKET_DISCLAIMER, RESPONSIBLE_VI],
    programmeTitle: 'Điều kiện chương trình',
    programme: [
      'Tỷ lệ hoàn phí, sản phẩm áp dụng và thời gian chi trả do chương trình đối tác của từng sàn quy định và có thể thay đổi.',
      'Hoàn phí chỉ áp dụng cho tài khoản đăng ký qua link đối tác của DA và đã xác nhận bằng UID, khi sàn cho phép.',
      `${BRAND.cashback} không phải sàn giao dịch, không giữ tiền của khách hàng và không đưa ra lời khuyên đầu tư.`,
    ],
    terms: 'Điều khoản dịch vụ',
    riskLink: 'Cảnh báo rủi ro',
  },
  contact: {
    eyebrow: 'Hỗ trợ',
    title: 'Liên hệ',
    lead: 'Có câu hỏi về đăng ký, UID hay hoàn phí? Nhắn tin cho đội ngũ DA qua Telegram.',
    channels: 'Kênh liên hệ',
    telegram: 'Telegram',
    email: 'Email',
    responseTime: 'Thời gian phản hồi',
    hours: 'Giờ làm việc',
    telegramCta: 'Nhắn tin qua Telegram',
    formTitle: 'Hoặc gửi tin nhắn',
    formNote: 'Không đưa mật khẩu, mã 2FA, cụm từ khôi phục hay khoá riêng tư vào tin nhắn.',
  },
  footer: {
    desc: `Nền tảng hoàn phí giao dịch, thuộc ${BRAND.network}. Đăng ký qua link đối tác của DA, xác nhận UID và nhận lại một phần phí giao dịch.`,
    disclaimer: `${BRAND.cashback} thuộc ${BRAND.network}. Đây không phải sàn giao dịch, không giữ tiền của khách hàng và không đưa ra lời khuyên đầu tư. Giao dịch crypto và cổ phiếu có rủi ro thua lỗ. Hãy tự nghiên cứu trước khi đưa ra bất kỳ quyết định nào. Điều khoản hoàn phí có thể thay đổi theo chính sách và chương trình đối tác của từng sàn.`,
    sections: 'Mục',
    ecosystem: 'Hệ sinh thái DA Network',
    network: BRAND.network,
    traders: `Trader Hub của ${BRAND.network}`,
    affiliate: BRAND.affiliate,
    tracking: BRAND.signalTracking,
    copyright: (year: number) => `© ${year} ${BRAND.cashback}. Thuộc ${BRAND.network}.`,
  },
};

/**
 * Per-language copy. EN canonical, VI fully translated.
 * ko / th / id intentionally fall back to English (mixed, not releasable).
 */
export const v3Copy: Record<Lang, V3Copy> = { en, vi, ko: en, th: en, id: en };
