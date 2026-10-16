/**
 * DA Cashback page copy — V3.3 conversion homepage (fee-rebate platform).
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
 * DA Network Trader Hub and are never called cashback. Never encourage
 * trading more for rebates; no banned wording (V3 spec §8).
 */
import type { Lang } from './index';
import { BRAND, DISCLAIMERS } from '@/config/ecosystem';
import type { ExchangeCounts } from '@/config/exchanges';

export interface FaqContext {
  hasPublishedTerms: boolean;
  telegram: string;
}

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
    calculator: 'Calculator',
    how: 'How it works',
    payouts: 'Payouts',
    guides: 'Guides',
    faq: 'FAQ',
    contact: 'Contact',
    ctaStart: 'Find your exchange',
  },
  hero: {
    eyebrow: `${BRAND.network} · Trading-fee rebates`,
    title: 'Get part of your trading fees back.',
    sub: 'Register on a supported exchange through a DA partner link and receive a share of your eligible trading fees back, under each exchange’s confirmed terms.',
    ctaPrimary: 'Find your exchange',
    ctaSecondary: 'How it works',
    live: (n: number) => (n === 1 ? '1 exchange open for registration' : `${n} exchanges open for registration`),
    trust: ['No password needed', 'We never hold your funds'],
    support: 'Support on Telegram',
  },
  exchanges: {
    eyebrow: 'Exchanges',
    title: 'Find your exchange',
    lead: 'Register through the DA partner link on the exchange’s own site. DA never asks for your exchange password.',
    count: (c: ExchangeCounts) =>
      [
        `${c.open} open for registration`,
        c.linkPending ? `${c.linkPending} registration link pending` : null,
        c.unavailable ? `${c.unavailable} temporarily unavailable` : null,
      ]
        .filter(Boolean)
        .join(' · '),
    searchLabel: 'Search exchanges',
    searchPlaceholder: 'Search by name',
    filterLabel: 'Market',
    filterAll: 'All',
    showUnavailable: 'Show temporarily unavailable',
    shown: (n: number) => (n === 1 ? '1 exchange shown' : `${n} exchanges shown`),
    empty: 'No exchange matches your search.',
    clear: 'Clear filters',
    forexNote: 'No Forex exchange is open for registration right now. Forex exchanges are listed for reference only.',
    pendingTitle: 'Why rates show “pending”',
    pendingNote:
      'DA publishes an exchange’s rebate rate, eligible products and payout timing only after confirming them with the exchange’s partner programme. Until then, ask the team on Telegram about the exchange you use.',
    pendingCta: 'Ask on Telegram',
    availability: {
      open: 'Open for registration',
      linkPending: 'Registration link pending',
      unavailable: 'Temporarily unavailable',
    } as Record<string, string>,
    terms: { confirmed: 'Terms confirmed', pending: 'Terms pending confirmation' },
    market: { crypto: 'Crypto', forex: 'Forex' } as Record<string, string>,
    marketUnknown: 'Market to be confirmed',
    rebate: 'Rebate',
    rateValue: (pct: string) => `${pct}% of eligible fees`,
    per100: (amount: string) => `≈ ${amount} back per $100 in fees`,
    ratePending: 'Rate pending confirmation',
    products: 'Eligible products',
    payout: 'Payout',
    partnerCode: 'Partner code',
    copy: 'Copy',
    copied: 'Copied',
    copyLabel: (name: string) => `Copy the ${name} partner code`,
    register: (name: string) => `Register on ${name}`,
    existingBtn: 'Already have an account?',
    existingFor: (name: string) => `Existing ${name} account`,
    existingBody: (name: string) =>
      `Whether an existing ${name} account can receive rebates depends on ${name}’s rules. Don’t assume it is eligible — ask the DA team on Telegram before you trade.`,
    existingConfirmed: (name: string) => `${name}’s confirmed rule for existing accounts:`,
    askTelegram: 'Ask on Telegram',
    termsBtn: 'Terms',
    termsFor: (name: string) => `Terms for ${name}`,
    basis: 'Calculation basis',
    method: 'Payout method',
    existing: 'Existing accounts',
    effective: 'Effective from',
    termsPendingBody: (name: string) =>
      `${name}’s rebate terms are pending confirmation with the exchange. Only confirmed terms are shown here.`,
    unavailableBody: (name: string) => `DA isn’t registering new ${name} accounts right now.`,
    linkPendingBody: (name: string) => `The DA registration link for ${name} isn’t ready yet.`,
    productNames: { spot: 'Spot', futures: 'Futures', 'tokenized-stocks': 'Tokenized stocks' } as Record<string, string>,
    tokenizedNote: DISCLAIMERS.tokenized as string,
  },
  calculator: {
    eyebrow: 'Calculator',
    title: 'Estimate your rebate',
    lead: 'Rebates are calculated on the trading fees you pay — not on your trading volume.',
    exchange: 'Exchange',
    volume: 'Monthly trading volume (USD)',
    volumeHint: 'The total value of the trades you place in a month.',
    fee: 'Your fee rate (%)',
    feeHint: 'Check your fee tier on the exchange.',
    volumeError: 'Enter a volume above 0.',
    feeError: 'Enter a fee rate above 0 and below 100.',
    feesOut: 'Estimated monthly trading fees',
    feesFormula: 'Volume × your fee rate',
    rebateOut: 'Estimated monthly rebate',
    rebateFormula: (pct: string) => `Fees × confirmed rate (${pct}%)`,
    emptyOut: 'Enter your volume and fee rate to see your estimated fees.',
    ratePending: (name: string) => `Rebate estimate appears once ${name}’s rate is confirmed.`,
    note: 'Estimate — actual rebates depend on the exchange’s confirmed terms and eligible fees.',
    responsible: 'Rebates reduce costs on trades you already make — don’t trade more to earn them.',
  },
  how: {
    eyebrow: 'How it works',
    title: 'Three steps, then trade as usual',
    steps: (uidStep: string) => [
      {
        t: 'Register through the DA link',
        d: 'Choose an exchange open for registration and use the DA partner link when you sign up.',
      },
      { t: 'Send your UID', d: `${uidStep} Complete any verification the exchange requires.` },
      {
        t: 'Trade as usual',
        d: 'Nothing changes on the exchange side. Rebates are paid under the exchange’s confirmed terms.',
      },
    ],
    uidAdmin: (handle: string) => `Send your UID and the exchange name to the DA team on Telegram (${handle}) to confirm the account.`,
    uidBot: 'Send your UID to the DA Telegram bot to confirm the account.',
    uidForm: 'Submit your UID through the DA form to confirm the account.',
    uidLink: 'Open Telegram',
    existingTitle: 'Already have an account?',
    existingPoints: [
      'Eligibility depends on the exchange — never assume an existing account qualifies.',
      'Some exchanges let you switch your referral; others require a new account.',
      'Ask the DA team on Telegram before you trade.',
    ],
    existingCta: 'Ask on Telegram',
  },
  payouts: {
    eyebrow: 'Payouts',
    title: 'Check your rebates and how payouts work',
    facts: (open: number) => [
      open === 1 ? '1 exchange open for registration' : `${open} exchanges open for registration`,
      'Three payout states, tracked separately',
      'Figures published only after reconciliation',
    ],
    lookupTitle: 'Your rebate status',
    lookupStatus: 'Online lookup isn’t available yet',
    lookupBody: 'Ask the DA team on Telegram. For your privacy, account data is never shown from a UID alone.',
    lookupCta: 'Check on Telegram',
    historyTitle: 'Payout states',
    states: [
      { id: 'accrued', label: 'Pending', d: 'Fees are counted and waiting for confirmation with the exchange.' },
      { id: 'approved', label: 'Approved', d: 'Confirmed with the exchange and scheduled for payout.' },
      { id: 'paid', label: 'Paid', d: 'The payout has been sent.' },
    ],
    statesNote: 'Each state is tracked separately and never added together.',
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
    title: 'Registration and UID guides',
    readMore: 'Read the guide',
    readLess: 'Hide the guide',
    items: [
      {
        id: 'register',
        title: 'Register through DA',
        summary: 'Sign up on the exchange through the DA partner link so your account is linked to DA.',
        steps: [
          'Use the Register button on the exchange’s card — it opens the exchange’s own sign-up page.',
          'If the sign-up form shows a referral or partner code, check it matches the partner code on the card. Don’t enter any other code.',
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
    ],
    videos: 'Video guides',
    watch: (name: string) => `Watch the ${name} guide`,
    perExchange: 'Per-exchange guides are added here once they are confirmed.',
    ask: 'Ask the team on Telegram',
  },
  ecosystem: {
    title: `Also part of ${BRAND.network}`,
    lead: 'Separate DA products, each on its own site.',
    items: [
      { id: 'network', name: BRAND.network, tag: 'Trader Hub, community and Volume Rewards (not cashback)' },
      { id: 'affiliate', name: BRAND.affiliate, tag: 'Partner programme for people who refer traders' },
      { id: 'signal', name: BRAND.signalTracking, tag: 'Public record of DA signals and methodology' },
    ],
  },
  safety: {
    title: 'Account safety',
    items: ['We only ask for your UID', 'Never your password, 2FA code or private key', 'No deposits to DA — ever'],
    warnBody: 'If anyone claiming to be DA Cashback asks for any of these, stop and contact us on Telegram',
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Frequently asked questions',
    noAnswer: 'Can’t find your answer?',
    contact: 'Contact the team',
    items: (c: FaqContext) => [
      {
        q: 'How does DA Cashback work?',
        a: `Register on a supported exchange through a DA partner link, send your UID to the DA team on Telegram to confirm the account, then trade as usual. Part of the eligible trading fees you pay comes back to you under that exchange’s confirmed terms. ${BRAND.cashback} is part of ${BRAND.network}; it is not an exchange and never holds your funds.`,
      },
      {
        q: 'How much cashback can I receive?',
        a: `It depends on the exchange. Each exchange’s rebate rate is shown on its card once it is confirmed with the exchange’s partner programme. The rebate is a share of the eligible trading fees you pay — not a share of your trading volume. ${
          c.hasPublishedTerms
            ? 'Use the calculator to estimate it from your own fees.'
            : 'Rates are still pending confirmation — ask the team on Telegram about the exchange you use.'
        }`,
      },
      {
        q: 'Can existing exchange users qualify?',
        a: 'It depends on the exchange. Some let you switch your referral; others require a new account. Ask the team on Telegram before you trade — don’t assume an existing account is eligible.',
      },
      {
        q: 'How do I register correctly?',
        a: `Use the Register button on the exchange’s card: it opens the exchange’s own sign-up page through the DA link. Don’t enter any other referral code — if the form asks for one, use the partner code shown on the card. After signing up, send your UID to the DA team on Telegram (${c.telegram}).`,
      },
      {
        q: 'When and how is cashback paid?',
        a: 'Payout timing and method are confirmed per exchange and shown under the exchange’s Terms once confirmed. Every rebate moves through three states: pending, approved and paid.',
      },
      {
        q: 'What if my account isn’t eligible?',
        a: 'Ask before you trade: send the team your exchange name on Telegram and they will tell you whether your account qualifies. Asking costs nothing.',
      },
      {
        q: 'How do I contact support?',
        a: `Message the DA team on Telegram: ${c.telegram}. DA will never ask for your password, 2FA code, private key or a deposit.`,
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
    calculator: 'Máy tính',
    how: 'Cách hoạt động',
    payouts: 'Chi trả',
    guides: 'Hướng dẫn',
    faq: 'Hỏi đáp',
    contact: 'Liên hệ',
    ctaStart: 'Tìm sàn của bạn',
  },
  hero: {
    eyebrow: `${BRAND.network} · Hoàn phí giao dịch`,
    title: 'Nhận lại một phần phí giao dịch của bạn.',
    sub: 'Đăng ký trên sàn được hỗ trợ qua link đối tác của DA và nhận lại một phần phí giao dịch hợp lệ, theo điều khoản đã xác nhận của từng sàn.',
    ctaPrimary: 'Tìm sàn của bạn',
    ctaSecondary: 'Cách hoạt động',
    live: (n: number) => `${n} sàn đang mở đăng ký`,
    trust: ['Không cần mật khẩu', 'DA không bao giờ giữ tiền của bạn'],
    support: 'Hỗ trợ qua Telegram',
  },
  exchanges: {
    eyebrow: 'Sàn giao dịch',
    title: 'Tìm sàn của bạn',
    lead: 'Đăng ký qua link đối tác của DA ngay trên website của sàn. DA không bao giờ hỏi mật khẩu tài khoản sàn của bạn.',
    count: (c: ExchangeCounts) =>
      [
        `${c.open} sàn đang mở đăng ký`,
        c.linkPending ? `${c.linkPending} sàn đang chờ link đăng ký` : null,
        c.unavailable ? `${c.unavailable} sàn tạm thời không khả dụng` : null,
      ]
        .filter(Boolean)
        .join(' · '),
    searchLabel: 'Tìm sàn',
    searchPlaceholder: 'Tìm theo tên',
    filterLabel: 'Thị trường',
    filterAll: 'Tất cả',
    showUnavailable: 'Hiện sàn tạm thời không khả dụng',
    shown: (n: number) => `Đang hiển thị ${n} sàn`,
    empty: 'Không có sàn nào khớp với tìm kiếm.',
    clear: 'Xoá bộ lọc',
    forexNote: 'Hiện chưa có sàn Forex nào mở đăng ký. Các sàn Forex chỉ được liệt kê để tham khảo.',
    pendingTitle: 'Vì sao tỷ lệ đang “chờ xác nhận”',
    pendingNote:
      'DA chỉ công bố tỷ lệ hoàn phí, sản phẩm áp dụng và thời gian chi trả của một sàn sau khi đã xác nhận với chương trình đối tác của sàn. Trong lúc chờ, hãy hỏi đội ngũ DA qua Telegram về sàn bạn dùng.',
    pendingCta: 'Hỏi qua Telegram',
    availability: {
      open: 'Đang mở đăng ký',
      linkPending: 'Đang chờ link đăng ký',
      unavailable: 'Tạm thời không khả dụng',
    } as Record<string, string>,
    terms: { confirmed: 'Đã xác nhận điều khoản', pending: 'Điều khoản đang chờ xác nhận' },
    market: { crypto: 'Crypto', forex: 'Forex' } as Record<string, string>,
    marketUnknown: 'Thị trường đang xác nhận',
    rebate: 'Hoàn phí',
    rateValue: (pct: string) => `${pct}% phí hợp lệ`,
    per100: (amount: string) => `≈ ${amount} hoàn lại cho mỗi $100 phí`,
    ratePending: 'Tỷ lệ đang chờ xác nhận',
    products: 'Sản phẩm áp dụng',
    payout: 'Chi trả',
    partnerCode: 'Mã đối tác',
    copy: 'Sao chép',
    copied: 'Đã sao chép',
    copyLabel: (name: string) => `Sao chép mã đối tác ${name}`,
    register: (name: string) => `Đăng ký ${name}`,
    existingBtn: 'Đã có tài khoản?',
    existingFor: (name: string) => `Tài khoản ${name} đã có sẵn`,
    existingBody: (name: string) =>
      `Tài khoản ${name} đã có sẵn có nhận được hoàn phí hay không phụ thuộc vào quy định của ${name}. Đừng mặc định tài khoản đủ điều kiện — hãy hỏi đội ngũ DA qua Telegram trước khi giao dịch.`,
    existingConfirmed: (name: string) => `Quy định đã xác nhận của ${name} cho tài khoản có sẵn:`,
    askTelegram: 'Hỏi qua Telegram',
    termsBtn: 'Điều khoản',
    termsFor: (name: string) => `Điều khoản của ${name}`,
    basis: 'Cách tính',
    method: 'Hình thức chi trả',
    existing: 'Tài khoản có sẵn',
    effective: 'Áp dụng từ',
    termsPendingBody: (name: string) =>
      `Điều khoản hoàn phí của ${name} đang chờ xác nhận với sàn. Tại đây chỉ hiển thị điều khoản đã được xác nhận.`,
    unavailableBody: (name: string) => `Hiện DA không nhận đăng ký tài khoản ${name} mới.`,
    linkPendingBody: (name: string) => `Link đăng ký của DA cho ${name} chưa sẵn sàng.`,
    productNames: { spot: 'Spot', futures: 'Futures', 'tokenized-stocks': 'Cổ phiếu token hoá' } as Record<string, string>,
    tokenizedNote: VI_TOKENIZED_DISCLAIMER,
  },
  calculator: {
    eyebrow: 'Máy tính',
    title: 'Ước tính hoàn phí',
    lead: 'Hoàn phí được tính trên phí giao dịch bạn trả — không phải trên khối lượng giao dịch.',
    exchange: 'Sàn',
    volume: 'Khối lượng giao dịch mỗi tháng (USD)',
    volumeHint: 'Tổng giá trị các lệnh bạn đặt trong một tháng.',
    fee: 'Mức phí của bạn (%)',
    feeHint: 'Kiểm tra cấp phí (fee tier) của bạn trên sàn.',
    volumeError: 'Nhập khối lượng lớn hơn 0.',
    feeError: 'Nhập mức phí lớn hơn 0 và nhỏ hơn 100.',
    feesOut: 'Phí giao dịch ước tính mỗi tháng',
    feesFormula: 'Khối lượng × mức phí của bạn',
    rebateOut: 'Hoàn phí ước tính mỗi tháng',
    rebateFormula: (pct: string) => `Phí × tỷ lệ đã xác nhận (${pct}%)`,
    emptyOut: 'Nhập khối lượng và mức phí để xem phí ước tính.',
    ratePending: (name: string) => `Ước tính hoàn phí sẽ hiển thị khi tỷ lệ của ${name} được xác nhận.`,
    note: 'Chỉ là ước tính — hoàn phí thực tế phụ thuộc vào điều khoản đã xác nhận của sàn và phí hợp lệ.',
    responsible: 'Hoàn phí giúp giảm chi phí cho những lệnh bạn vẫn giao dịch — đừng giao dịch nhiều hơn chỉ để nhận hoàn phí.',
  },
  how: {
    eyebrow: 'Cách hoạt động',
    title: 'Ba bước, rồi giao dịch như bình thường',
    steps: (uidStep: string) => [
      {
        t: 'Đăng ký qua link DA',
        d: 'Chọn một sàn đang mở đăng ký và dùng link đối tác của DA khi đăng ký.',
      },
      { t: 'Gửi UID', d: `${uidStep} Hoàn tất các bước xác minh mà sàn yêu cầu.` },
      {
        t: 'Giao dịch như bình thường',
        d: 'Không có gì thay đổi ở phía sàn. Hoàn phí được chi trả theo điều khoản đã xác nhận của sàn.',
      },
    ],
    uidAdmin: (handle: string) => `Gửi UID và tên sàn cho đội ngũ DA qua Telegram (${handle}) để xác nhận tài khoản.`,
    uidBot: 'Gửi UID cho bot Telegram của DA để xác nhận tài khoản.',
    uidForm: 'Gửi UID qua biểu mẫu của DA để xác nhận tài khoản.',
    uidLink: 'Mở Telegram',
    existingTitle: 'Đã có tài khoản?',
    existingPoints: [
      'Điều kiện phụ thuộc vào từng sàn — đừng mặc định tài khoản có sẵn sẽ đủ điều kiện.',
      'Một số sàn cho phép đổi người giới thiệu, một số sàn yêu cầu tạo tài khoản mới.',
      'Hãy hỏi đội ngũ DA qua Telegram trước khi giao dịch.',
    ],
    existingCta: 'Hỏi qua Telegram',
  },
  payouts: {
    eyebrow: 'Chi trả',
    title: 'Kiểm tra hoàn phí và cách chi trả',
    facts: (open: number) => [
      `${open} sàn đang mở đăng ký`,
      'Ba trạng thái chi trả, theo dõi riêng',
      'Số liệu chỉ công bố sau khi đối soát',
    ],
    lookupTitle: 'Trạng thái hoàn phí của bạn',
    lookupStatus: 'Chưa có tra cứu trực tuyến',
    lookupBody: 'Hãy hỏi đội ngũ DA qua Telegram. Để bảo vệ quyền riêng tư, dữ liệu tài khoản không bao giờ được hiển thị chỉ dựa trên UID.',
    lookupCta: 'Kiểm tra qua Telegram',
    historyTitle: 'Các trạng thái chi trả',
    states: [
      { id: 'accrued', label: 'Đang chờ', d: 'Phí đã được ghi nhận và đang chờ xác nhận với sàn.' },
      { id: 'approved', label: 'Đã duyệt', d: 'Đã xác nhận với sàn và được lên lịch chi trả.' },
      { id: 'paid', label: 'Đã chi trả', d: 'Khoản chi trả đã được gửi.' },
    ],
    statesNote: 'Mỗi trạng thái được theo dõi riêng và không bao giờ cộng gộp với nhau.',
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
    title: 'Hướng dẫn đăng ký và UID',
    readMore: 'Xem hướng dẫn',
    readLess: 'Ẩn hướng dẫn',
    items: [
      {
        id: 'register',
        title: 'Đăng ký qua DA',
        summary: 'Đăng ký trên sàn qua link đối tác của DA để tài khoản được liên kết với DA.',
        steps: [
          'Dùng nút Đăng ký trên thẻ của sàn — nút sẽ mở trang đăng ký chính thức của sàn.',
          'Nếu biểu mẫu đăng ký có ô mã giới thiệu hoặc mã đối tác, hãy kiểm tra mã khớp với mã đối tác trên thẻ. Không nhập mã nào khác.',
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
    ],
    videos: 'Video hướng dẫn',
    watch: (name: string) => `Xem hướng dẫn cho ${name}`,
    perExchange: 'Hướng dẫn riêng cho từng sàn sẽ được bổ sung tại đây sau khi được xác nhận.',
    ask: 'Hỏi đội ngũ DA qua Telegram',
  },
  ecosystem: {
    title: `Cũng thuộc ${BRAND.network}`,
    lead: 'Các sản phẩm DA hoạt động riêng, mỗi sản phẩm có website riêng.',
    items: [
      { id: 'network', name: BRAND.network, tag: 'Trader Hub, cộng đồng và Volume Rewards (không phải hoàn phí)' },
      { id: 'affiliate', name: BRAND.affiliate, tag: 'Chương trình đối tác cho người giới thiệu trader' },
      { id: 'signal', name: BRAND.signalTracking, tag: 'Hồ sơ công khai về tín hiệu DA và phương pháp' },
    ],
  },
  safety: {
    title: 'An toàn tài khoản',
    items: ['DA chỉ cần UID của bạn', 'Không bao giờ hỏi mật khẩu, mã 2FA hay khoá riêng tư', 'Không bao giờ yêu cầu nạp tiền cho DA'],
    warnBody: 'Nếu có ai tự xưng là DA Cashback và hỏi bất kỳ thông tin nào ở trên, hãy dừng lại và liên hệ chúng tôi qua Telegram',
  },
  faq: {
    eyebrow: 'Hỏi đáp',
    title: 'Câu hỏi thường gặp',
    noAnswer: 'Không tìm thấy câu trả lời?',
    contact: 'Liên hệ đội ngũ DA',
    items: (c: FaqContext) => [
      {
        q: 'DA Cashback hoạt động như thế nào?',
        a: `Đăng ký trên sàn được hỗ trợ qua link đối tác của DA, gửi UID cho đội ngũ DA qua Telegram để xác nhận tài khoản, rồi giao dịch như bình thường. Một phần phí giao dịch hợp lệ bạn đã trả sẽ được hoàn lại theo điều khoản đã xác nhận của sàn. ${BRAND.cashback} thuộc ${BRAND.network}; đây không phải sàn giao dịch và không bao giờ giữ tiền của bạn.`,
      },
      {
        q: 'Tôi có thể nhận lại bao nhiêu?',
        a: `Tuỳ vào từng sàn. Tỷ lệ hoàn phí của mỗi sàn được hiển thị trên thẻ của sàn sau khi đã xác nhận với chương trình đối tác của sàn. Hoàn phí là một phần phí giao dịch hợp lệ bạn trả — không phải một phần khối lượng giao dịch. ${
          c.hasPublishedTerms
            ? 'Dùng máy tính để ước tính dựa trên phí của chính bạn.'
            : 'Các tỷ lệ vẫn đang chờ xác nhận — hãy hỏi đội ngũ DA qua Telegram về sàn bạn dùng.'
        }`,
      },
      {
        q: 'Người đã có tài khoản sàn có tham gia được không?',
        a: 'Tuỳ vào từng sàn. Một số sàn cho phép đổi người giới thiệu, một số sàn yêu cầu tạo tài khoản mới. Hãy hỏi đội ngũ DA qua Telegram trước khi giao dịch — đừng mặc định tài khoản có sẵn sẽ đủ điều kiện.',
      },
      {
        q: 'Làm sao để đăng ký đúng cách?',
        a: `Dùng nút Đăng ký trên thẻ của sàn: nút sẽ mở trang đăng ký chính thức của sàn qua link DA. Không nhập mã giới thiệu nào khác — nếu biểu mẫu yêu cầu, hãy dùng mã đối tác hiển thị trên thẻ. Sau khi đăng ký, gửi UID cho đội ngũ DA qua Telegram (${c.telegram}).`,
      },
      {
        q: 'Hoàn phí được chi trả khi nào và bằng cách nào?',
        a: 'Thời gian và hình thức chi trả được xác nhận theo từng sàn và hiển thị trong phần Điều khoản của sàn sau khi xác nhận. Mỗi khoản hoàn phí đi qua ba trạng thái: đang chờ, đã duyệt và đã chi trả.',
      },
      {
        q: 'Nếu tài khoản của tôi không đủ điều kiện thì sao?',
        a: 'Hãy hỏi trước khi giao dịch: gửi tên sàn cho đội ngũ DA qua Telegram và đội ngũ sẽ cho bạn biết tài khoản có đủ điều kiện hay không. Hỏi hoàn toàn miễn phí.',
      },
      {
        q: 'Làm sao để liên hệ hỗ trợ?',
        a: `Nhắn tin cho đội ngũ DA qua Telegram: ${c.telegram}. DA sẽ không bao giờ hỏi mật khẩu, mã 2FA, khoá riêng tư hay yêu cầu nạp tiền.`,
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
