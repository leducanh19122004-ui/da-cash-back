export type Lang = 'vi' | 'en' | 'ko' | 'th' | 'id';

export interface Translations {
  // Meta
  siteName: string;
  slogan: string;
  // Nav
  nav: { home: string; exchanges: string; howItWorks: string; cashbackLookup: string; faq: string; contact: string; joinNow: string; lookupCashback: string; };
  // Hero
  hero: { badge: string; title1: string; titleHighlight1: string; title2: string; titleHighlight2: string; desc: string; cta1: string; cta2: string; badge1: string; badge2: string; badge3: string; dashTotal: string; dashMonth: string; dashExchanges: string; dashVerified: string; dashRecent: string; dashNext: string; };
  // Stats
  stats: { s1v: string; s1l: string; s1s: string; s2v: string; s2l: string; s2s: string; s3v: string; s3l: string; s3s: string; s4v: string; s4l: string; s4s: string; note: string; };
  // Exchanges
  exchanges: { badge: string; title: string; desc: string; all: string; crypto: string; forex: string; register: string; guide: string; rate: string; viewDetails: string; disclaimer: string; };
  // How it works
  how: { badge: string; title: string; desc: string; s1t: string; s1d: string; s2t: string; s2d: string; s3t: string; s3d: string; s4t: string; s4d: string; cta: string; };
  // Cashback Lookup
  lookup: { badge: string; title: string; desc: string; selectEx: string; selectPlaceholder: string; uidLabel: string; uidPlaceholder: string; uidHint: string; btn: string; loading: string; resultTitle: string; rUID: string; rExchange: string; rStatus: string; rCashback: string; rNextPayment: string; disclaimer: string; };
  // Benefits
  benefits: { badge: string; title: string; desc: string; b1t: string; b1d: string; b2t: string; b2d: string; b3t: string; b3d: string; b4t: string; b4d: string; b5t: string; b5d: string; b6t: string; b6d: string; };
  // Trust
  trust: { badge: string; title: string; p1: string; p2: string; p3: string; p4: string; p5: string; badge2: string; desc2: string; warning: string; warningDesc: string; onlyNeed: string; need1: string; need2: string; neverAsk: string; never1: string; never2: string; never3: string; never4: string; };
  // FAQ
  faq: { badge: string; title: string; desc: string; noAnswer: string; contactSupport: string; items: { q: string; a: string }[]; };
  // Testimonials
  test: { badge: string; title: string; note: string; items: { name: string; role: string; text: string }[]; };
  // Contact
  contact: { badge: string; title: string; desc: string; channels: string; nameLabel: string; namePlaceholder: string; contactLabel: string; contactPlaceholder: string; msgLabel: string; msgPlaceholder: string; submit: string; successTitle: string; successDesc: string; sendAnother: string; response: string; address: string; };
  // Footer
  footer: { desc: string; nav: string; legal: string; terms: string; privacy: string; risk: string; contact: string; disclaimer: string; copyright: string; };
  // Exchange descriptions
  exchangeDesc: { binance: string; okx: string; bybit: string; mexc: string; bingx: string; bitget: string; gate: string; kucoin: string; bitunix: string; ourbit: string; exness: string; vantage: string; xm: string; };
}

// ─── VIETNAMESE ───────────────────────────────────────────────────
const vi: Translations = {
  siteName: 'DA CASH BACK',
  slogan: 'Giao dịch thông minh hơn với cashback mỗi ngày',
  nav: { home: 'Trang chủ', exchanges: 'Sàn hỗ trợ', howItWorks: 'Cách hoạt động', cashbackLookup: 'Lịch sử hoàn phí', faq: 'Câu hỏi thường gặp', contact: 'Liên hệ', joinNow: 'Tham gia ngay', lookupCashback: 'Tra cứu cashback' },
  hero: { badge: 'Nền tảng hoàn phí giao dịch #1 Việt Nam', title1: 'Nhận', titleHighlight1: 'hoàn phí giao dịch', title2: 'Crypto & Forex cùng', titleHighlight2: 'DA CASH BACK', desc: 'Đăng ký tài khoản sàn qua link đối tác của DA CASH BACK, giao dịch như bình thường và nhận lại một phần phí giao dịch định kỳ. Minh bạch — An toàn — Không yêu cầu mật khẩu.', cta1: 'Bắt đầu nhận cashback', cta2: 'Xem sàn hỗ trợ', badge1: '🔒 Không yêu cầu mật khẩu', badge2: '🛡️ Không giữ tiền của khách hàng', badge3: '✅ Chỉ cần UID tài khoản sàn', dashTotal: 'Tổng cashback đã hoàn', dashMonth: 'Cashback tháng này', dashExchanges: 'Số sàn hỗ trợ', dashVerified: '✓ Đã xác minh UID', dashRecent: 'Hoàn phí gần đây', dashNext: 'Kỳ thanh toán tiếp theo:' },
  stats: { s1v: '10+', s1l: 'Sàn hỗ trợ', s1s: 'Crypto & Forex', s2v: 'Đến 70%', s2l: 'Tỷ lệ hoàn phí', s2s: 'tùy từng sàn & chương trình đối tác', s3v: 'Định kỳ', s3l: 'Thanh toán', s3s: 'Ngày / Tuần / Tháng', s4v: 'Minh bạch', s4l: 'Theo dõi', s4s: 'Lịch sử rõ ràng, dễ tra cứu', note: '* Tỷ lệ hoàn phí có thể thay đổi theo chính sách từng sàn và chương trình đối tác tại từng thời điểm.' },
  exchanges: { badge: 'Đối tác chính thức', title: 'Sàn giao dịch được hỗ trợ', desc: 'Đăng ký tài khoản qua link của DA CASH BACK để kích hoạt cashback. Tỷ lệ tùy từng sàn và đối tác.', all: 'Tất cả', crypto: '🔷 Crypto', forex: '📈 Forex', register: 'Đăng ký cashback', guide: 'Hướng dẫn', rate: 'Tỷ lệ hoàn phí', viewDetails: 'Xem chi tiết', disclaimer: '⚠️ Tỷ lệ hoàn phí có thể thay đổi theo chính sách từng sàn.' },
  how: { badge: 'Đơn giản & Minh bạch', title: 'Cách hoạt động', desc: 'Quy trình 4 bước đơn giản để bắt đầu nhận hoàn phí giao dịch', s1t: 'Chọn sàn giao dịch', s1d: 'Chọn sàn crypto hoặc forex bạn muốn đăng ký từ danh sách đối tác của DA CASH BACK.', s2t: 'Đăng ký bằng link/ref code', s2d: 'Đăng ký tài khoản mới trên sàn qua link hoặc mã giới thiệu được cung cấp bởi DA CASH BACK.', s3t: 'Gửi UID để xác minh', s3d: 'Sau khi tạo tài khoản thành công, gửi UID tài khoản sàn để hệ thống kiểm tra liên kết cashback.', s4t: 'Nhận cashback định kỳ', s4d: 'Giao dịch như bình thường trên sàn. Cashback sẽ được hoàn lại theo chu kỳ thanh toán của từng sàn.', cta: 'Bắt đầu ngay →' },
  lookup: { badge: 'Tra cứu nhanh', title: 'Kiểm tra cashback của bạn', desc: 'Nhập thông tin tài khoản để tra cứu tình trạng và cashback ước tính', selectEx: 'Chọn sàn giao dịch *', selectPlaceholder: '-- Chọn sàn --', uidLabel: 'UID tài khoản sàn *', uidPlaceholder: 'Nhập UID tài khoản của bạn...', uidHint: 'UID thường nằm trong phần Hồ sơ / Profile của tài khoản sàn', btn: '🔍 Tra cứu cashback', loading: '⏳ Đang tra cứu...', resultTitle: '📊 Kết quả tra cứu', rUID: 'UID', rExchange: 'Sàn giao dịch', rStatus: 'Trạng thái', rCashback: 'Cashback ước tính', rNextPayment: 'Kỳ thanh toán gần nhất', disclaimer: 'Dữ liệu chỉ mang tính tham khảo. Cashback thực tế phụ thuộc vào dữ liệu đối soát từ sàn đối tác.' },
  benefits: { badge: 'Lợi ích', title: 'Tại sao chọn DA CASH BACK?', desc: 'Tối ưu chi phí giao dịch mà không cần thay đổi bất kỳ thói quen nào', b1t: 'Không thay đổi cách giao dịch', b1d: 'Tiếp tục giao dịch như bình thường trên sàn. Không cần làm gì thêm sau khi đã đăng ký.', b2t: 'Không mất thêm phí', b2d: 'DA CASH BACK hoàn toàn miễn phí tham gia. Bạn không phải trả bất kỳ chi phí nào.', b3t: 'Nhận lại một phần phí giao dịch', b3d: 'Một phần phí bạn đã trả cho sàn được hoàn lại định kỳ thông qua chương trình đối tác.', b4t: 'Theo dõi lịch sử rõ ràng', b4d: 'Tra cứu cashback bất kỳ lúc nào, xem lịch sử hoàn phí chi tiết theo sàn và kỳ thanh toán.', b5t: 'Hỗ trợ nhiều sàn', b5d: 'Nhận cashback từ nhiều sàn crypto và forex cùng lúc, tối đa hóa lợi ích của bạn.', b6t: 'Không yêu cầu quyền truy cập', b6d: 'DA CASH BACK không yêu cầu mật khẩu, API key rút tiền, mã 2FA hay seed phrase của bạn.' },
  trust: { badge: 'Cam kết', title: 'An toàn và minh bạch là ưu tiên hàng đầu', p1: 'DA CASH BACK không yêu cầu mật khẩu tài khoản sàn của bạn.', p2: 'DA CASH BACK không giữ tiền giao dịch của khách hàng.', p3: 'Người dùng tự quản lý tài khoản trực tiếp trên sàn chính thức.', p4: 'Chúng tôi chỉ dùng UID để kiểm tra điều kiện hoàn phí từ chương trình đối tác.', p5: 'Không chia sẻ seed phrase, private key, mã 2FA hoặc API key có quyền rút tiền cho bất kỳ ai.', badge2: 'Nền tảng Đáng tin cậy', desc2: 'Hoạt động dựa trên chương trình đối tác chính thức. Không có quyền truy cập vào tài sản người dùng.', warning: 'Cảnh báo quan trọng', warningDesc: 'DA CASH BACK không cung cấp lời khuyên đầu tư và không cam kết lợi nhuận. Giao dịch crypto và forex có rủi ro cao.', onlyNeed: 'DA CASH BACK chỉ cần:', need1: '✅ UID tài khoản sàn của bạn', need2: '✅ Xác nhận đăng ký qua link đối tác', neverAsk: 'DA CASH BACK KHÔNG bao giờ yêu cầu:', never1: '⛔ Mật khẩu tài khoản', never2: '⛔ Mã 2FA / OTP', never3: '⛔ Private key / Seed phrase', never4: '⛔ API key rút tiền' },
  faq: { badge: 'Giải đáp thắc mắc', title: 'Câu hỏi thường gặp', desc: 'Các câu hỏi phổ biến về dịch vụ hoàn phí giao dịch của DA CASH BACK', noAnswer: 'Không tìm thấy câu trả lời?', contactSupport: 'Liên hệ hỗ trợ', items: [{ q: 'Cashback là gì?', a: 'Cashback là khoản hoàn lại một phần phí giao dịch mà người dùng đã phát sinh trên sàn, được chia lại từ chương trình đối tác (IB/affiliate) giữa DA CASH BACK và sàn giao dịch.' }, { q: 'Tôi có cần nạp tiền vào DA CASH BACK không?', a: 'Không. Người dùng giao dịch trực tiếp trên sàn chính thức. DA CASH BACK không nhận tiền nạp giao dịch của khách hàng và không phải là sàn giao dịch.' }, { q: 'Tôi cần cung cấp thông tin gì?', a: 'Thông thường chỉ cần UID tài khoản sàn để kiểm tra liên kết cashback. Tuyệt đối không cung cấp mật khẩu, mã 2FA, private key hoặc seed phrase.' }, { q: 'Cashback được trả khi nào?', a: 'Tùy theo chu kỳ đối soát của từng sàn. Một số sàn có thể trả theo ngày, tuần hoặc tháng.' }, { q: 'Nếu tôi đã có tài khoản sàn rồi thì có nhận cashback được không?', a: 'Tùy chính sách từng sàn. Một số sàn yêu cầu tài khoản mới đăng ký qua link đối tác mới đủ điều kiện cashback.' }, { q: 'DA CASH BACK có cam kết lợi nhuận không?', a: 'Không. DA CASH BACK chỉ là nền tảng hỗ trợ hoàn phí giao dịch, không cam kết lợi nhuận và không chịu trách nhiệm cho kết quả giao dịch.' }, { q: 'Cashback được thanh toán bằng gì?', a: 'Tùy từng sàn và thỏa thuận. Thông thường cashback được thanh toán bằng USDT hoặc coin gốc của sàn.' }] },
  test: { badge: 'Cộng đồng', title: 'Đánh giá từ người dùng', note: '* Đây là đánh giá minh họa', items: [{ name: 'Trader A.', role: 'Crypto Trader', text: 'Giao diện dễ tra cứu, quy trình đăng ký rõ ràng. Tôi theo dõi được cashback từ 3 sàn khác nhau trên cùng một nền tảng.' }, { name: 'Trader B.', role: 'Forex Trader', text: 'Tôi thích việc không cần cung cấp mật khẩu tài khoản. Chỉ cần UID là đủ, rất an tâm về bảo mật.' }, { name: 'Trader C.', role: 'Day Trader', text: 'Cashback giúp tôi tối ưu chi phí giao dịch hơn. Mỗi tháng tiết kiệm được một khoản phí đáng kể.' }] },
  contact: { badge: 'Hỗ trợ', title: 'Liên hệ với chúng tôi', desc: 'Đội ngũ hỗ trợ sẵn sàng giải đáp mọi thắc mắc về cashback và quy trình đăng ký', channels: 'Kênh liên hệ', nameLabel: 'Họ tên *', namePlaceholder: 'Nguyễn Văn A', contactLabel: 'Email / Telegram *', contactPlaceholder: 'email@example.com hoặc @username', msgLabel: 'Nội dung cần hỗ trợ *', msgPlaceholder: 'Mô tả vấn đề hoặc câu hỏi của bạn...', submit: 'Gửi yêu cầu hỗ trợ', successTitle: 'Gửi thành công!', successDesc: 'Chúng tôi sẽ phản hồi trong thời gian sớm nhất.', sendAnother: 'Gửi tin nhắn khác', response: '💡 Thời gian phản hồi thông thường: trong vòng 24 giờ trong ngày làm việc.', address: 'Việt Nam' },
  footer: { desc: 'Nền tảng hoàn phí giao dịch Crypto & Forex. Minh bạch — An toàn — Không yêu cầu mật khẩu.', nav: 'Điều hướng', legal: 'Pháp lý', terms: 'Điều khoản dịch vụ', privacy: 'Chính sách bảo mật', risk: 'Cảnh báo rủi ro', contact: 'Liên hệ', disclaimer: 'DA CASH BACK không phải là sàn giao dịch, không giữ tiền của khách hàng và không cung cấp lời khuyên đầu tư. Crypto và Forex là các thị trường rủi ro cao. Người dùng cần tự nghiên cứu kỹ lưỡng trước khi tham gia giao dịch.', copyright: '© {year} DA CASH BACK. All rights reserved.' },
  exchangeDesc: { binance: 'Sàn giao dịch crypto lớn nhất thế giới theo khối lượng giao dịch.', okx: 'Sàn đa năng với spot, futures, options và Web3 wallet tích hợp.', bybit: 'Nền tảng derivatives và spot hàng đầu với thanh khoản cao.', mexc: 'Hỗ trợ hàng nghìn altcoin với phí giao dịch cạnh tranh.', bingx: 'Sàn social trading với giao diện thân thiện người dùng.', bitget: 'Sàn giao dịch với tính năng copy trade phổ biến toàn cầu.', gate: 'Một trong những sàn lâu đời nhất với danh sách token đa dạng.', kucoin: 'Sàn giao dịch đa dạng token, thân thiện với người dùng mới.', bitunix: 'Sàn giao dịch derivatives với phí cạnh tranh và công cụ hiện đại.', ourbit: 'Sàn giao dịch mới nổi với tỷ lệ hoàn phí hấp dẫn cho trader.', exness: 'Broker forex uy tín với spread thấp và đòn bẩy linh hoạt.', vantage: 'Broker forex quốc tế, được quản lý bởi nhiều cơ quan uy tín toàn cầu.', xm: 'Broker forex toàn cầu với nhiều loại tài khoản và nền tảng MT4/MT5.' },
};

// ─── ENGLISH ──────────────────────────────────────────────────────
const en: Translations = {
  siteName: 'DA CASH BACK',
  slogan: 'Trade smarter with daily cashback',
  nav: { home: 'Home', exchanges: 'Exchanges', howItWorks: 'How It Works', cashbackLookup: 'Cashback History', faq: 'FAQ', contact: 'Contact', joinNow: 'Join Now', lookupCashback: 'Check Cashback' },
  hero: { badge: '#1 Trading Cashback Platform in Vietnam', title1: 'Earn', titleHighlight1: 'Trading Cashback', title2: 'on Crypto & Forex with', titleHighlight2: 'DA CASH BACK', desc: 'Register on exchanges through DA CASH BACK partner links, trade as usual, and receive a portion of your trading fees back periodically. Transparent — Secure — No password required.', cta1: 'Start Earning Cashback', cta2: 'View Exchanges', badge1: '🔒 No Password Required', badge2: '🛡️ We Never Hold Your Funds', badge3: '✅ Only Your Exchange UID Needed', dashTotal: 'Total Cashback Earned', dashMonth: 'This Month Cashback', dashExchanges: 'Supported Exchanges', dashVerified: '✓ UID Verified', dashRecent: 'Recent Cashback', dashNext: 'Next payment:' },
  stats: { s1v: '10+', s1l: 'Exchanges', s1s: 'Crypto & Forex', s2v: 'Up to 70%', s2l: 'Cashback Rate', s2s: 'varies by exchange & program', s3v: 'Periodic', s3l: 'Payments', s3s: 'Daily / Weekly / Monthly', s4v: 'Transparent', s4l: 'Tracking', s4s: 'Clear history, easy to check', note: '* Cashback rates may vary depending on exchange policy and partner program at any given time.' },
  exchanges: { badge: 'Official Partners', title: 'Supported Exchanges', desc: 'Register through DA CASH BACK partner links to activate cashback. Rates vary by exchange and partner program.', all: 'All', crypto: '🔷 Crypto', forex: '📈 Forex', register: 'Get Cashback', guide: 'Guide', rate: 'Cashback Rate', viewDetails: 'View details', disclaimer: '⚠️ Cashback rates may change according to each exchange\'s policy.' },
  how: { badge: 'Simple & Transparent', title: 'How It Works', desc: 'A simple 4-step process to start earning trading fee rebates', s1t: 'Choose an Exchange', s1d: 'Select a crypto or forex exchange from the DA CASH BACK partner list that you want to join.', s2t: 'Register via Referral Link', s2d: 'Create a new account on the exchange using the referral link or code provided by DA CASH BACK.', s3t: 'Submit Your UID', s3d: 'After creating your account, send your exchange UID to verify the cashback link.', s4t: 'Receive Periodic Cashback', s4d: 'Trade as normal on the exchange. Cashback will be paid back according to each exchange\'s payment cycle.', cta: 'Get Started →' },
  lookup: { badge: 'Quick Lookup', title: 'Check Your Cashback', desc: 'Enter your account details to check status and estimated cashback', selectEx: 'Select Exchange *', selectPlaceholder: '-- Select Exchange --', uidLabel: 'Exchange Account UID *', uidPlaceholder: 'Enter your account UID...', uidHint: 'UID is usually found in the Profile section of your exchange account', btn: '🔍 Check Cashback', loading: '⏳ Searching...', resultTitle: '📊 Lookup Result', rUID: 'UID', rExchange: 'Exchange', rStatus: 'Status', rCashback: 'Estimated Cashback', rNextPayment: 'Next Payment Date', disclaimer: 'Data is for reference only. Actual cashback depends on reconciliation data from the partner exchange.' },
  benefits: { badge: 'Benefits', title: 'Why Choose DA CASH BACK?', desc: 'Optimize trading costs without changing any of your habits', b1t: 'No Change to Your Trading', b1d: 'Continue trading as usual on the exchange. No extra steps needed after registration.', b2t: 'No Additional Fees', b2d: 'DA CASH BACK is completely free to join. You pay absolutely nothing extra.', b3t: 'Get Trading Fees Back', b3d: 'A portion of the fees you paid to the exchange is returned periodically through the partner program.', b4t: 'Transparent History', b4d: 'Check cashback anytime, view detailed rebate history by exchange and payment cycle.', b5t: 'Multiple Exchanges Supported', b5d: 'Earn cashback from multiple crypto and forex exchanges simultaneously to maximize your benefits.', b6t: 'No Access Required', b6d: 'DA CASH BACK never requires your password, withdrawal API keys, 2FA codes, or seed phrase.' },
  trust: { badge: 'Commitment', title: 'Safety and Transparency Are Our Top Priority', p1: 'DA CASH BACK never asks for your exchange account password.', p2: 'DA CASH BACK never holds your trading funds.', p3: 'Users manage their accounts directly on the official exchange.', p4: 'We only use your UID to verify cashback eligibility through the partner program.', p5: 'Never share your seed phrase, private key, 2FA code, or withdrawal API key with anyone.', badge2: 'Trusted Platform', desc2: 'Operating through official partner programs. No access to user assets.', warning: 'Important Warning', warningDesc: 'DA CASH BACK does not provide investment advice and makes no profit guarantees. Crypto and Forex trading carries high risk.', onlyNeed: 'DA CASH BACK Only Needs:', need1: '✅ Your exchange account UID', need2: '✅ Confirmation of registration via partner link', neverAsk: 'DA CASH BACK Will NEVER Ask For:', never1: '⛔ Account Password', never2: '⛔ 2FA Code / OTP', never3: '⛔ Private Key / Seed Phrase', never4: '⛔ Withdrawal API Key' },
  faq: { badge: 'FAQ', title: 'Frequently Asked Questions', desc: 'Common questions about DA CASH BACK trading fee rebate service', noAnswer: 'Can\'t find your answer?', contactSupport: 'Contact Support', items: [{ q: 'What is cashback?', a: 'Cashback is a rebate of a portion of trading fees you paid on the exchange, shared back through the IB/affiliate partner program between DA CASH BACK and the exchange.' }, { q: 'Do I need to deposit money into DA CASH BACK?', a: 'No. Users trade directly on the official exchange. DA CASH BACK does not accept trading deposits and is not an exchange.' }, { q: 'What information do I need to provide?', a: 'Usually only your exchange account UID is needed to verify the cashback link. Never provide your password, 2FA code, private key, or seed phrase.' }, { q: 'When is cashback paid?', a: 'It depends on each exchange\'s reconciliation cycle. Some exchanges may pay daily, weekly, or monthly.' }, { q: 'Can I receive cashback if I already have an exchange account?', a: 'It depends on each exchange\'s policy. Some exchanges require new accounts registered through a partner link to qualify.' }, { q: 'Does DA CASH BACK guarantee profits?', a: 'No. DA CASH BACK is only a trading fee rebate platform. We make no profit guarantees and are not responsible for trading results.' }, { q: 'What currency is cashback paid in?', a: 'It depends on the exchange and agreement. Cashback is typically paid in USDT or the exchange\'s native token.' }] },
  test: { badge: 'Community', title: 'User Reviews', note: '* These are illustrative reviews', items: [{ name: 'Trader A.', role: 'Crypto Trader', text: 'Easy to check interface, clear registration process. I can track cashback from 3 different exchanges on one platform.' }, { name: 'Trader B.', role: 'Forex Trader', text: 'I love that I don\'t need to provide my account password. Just the UID is enough — very secure.' }, { name: 'Trader C.', role: 'Day Trader', text: 'Cashback helps me optimize trading costs. I save a significant amount in fees every month.' }] },
  contact: { badge: 'Support', title: 'Contact Us', desc: 'Our support team is ready to answer any questions about cashback and the registration process', channels: 'Contact Channels', nameLabel: 'Full Name *', namePlaceholder: 'John Doe', contactLabel: 'Email / Telegram *', contactPlaceholder: 'email@example.com or @username', msgLabel: 'Support Request *', msgPlaceholder: 'Describe your issue or question...', submit: 'Send Support Request', successTitle: 'Sent Successfully!', successDesc: 'We will respond as soon as possible.', sendAnother: 'Send Another Message', response: '💡 Typical response time: within 24 hours on business days.', address: 'Vietnam' },
  footer: { desc: 'Crypto & Forex Trading Cashback Platform. Transparent — Secure — No Password Required.', nav: 'Navigation', legal: 'Legal', terms: 'Terms of Service', privacy: 'Privacy Policy', risk: 'Risk Disclaimer', contact: 'Contact', disclaimer: 'DA CASH BACK is not an exchange, does not hold client funds, and does not provide investment advice. Crypto and Forex are high-risk markets. Users should conduct their own research before trading.', copyright: '© {year} DA CASH BACK. All rights reserved.' },
  exchangeDesc: { binance: 'The world\'s largest crypto exchange by trading volume.', okx: 'Multi-functional exchange with spot, futures, options, and Web3 wallet.', bybit: 'Leading derivatives and spot trading platform with high liquidity.', mexc: 'Supports thousands of altcoins with competitive trading fees.', bingx: 'Social trading exchange with a user-friendly interface.', bitget: 'Exchange known for its popular copy trading feature.', gate: 'One of the oldest exchanges with a diverse token listing.', kucoin: 'Diverse token exchange, user-friendly for beginners.', bitunix: 'Derivatives exchange with competitive fees and modern tools.', ourbit: 'Emerging exchange with attractive cashback rates for traders.', exness: 'Reputable Forex broker with low spreads and flexible leverage.', vantage: 'International Forex broker regulated by multiple global authorities.', xm: 'Global Forex broker with various account types and MT4/MT5 platforms.' },
};

// ─── KOREAN ───────────────────────────────────────────────────────
const ko: Translations = {
  siteName: 'DA CASH BACK',
  slogan: '매일 캐시백으로 더 스마트하게 거래하세요',
  nav: { home: '홈', exchanges: '지원 거래소', howItWorks: '이용 방법', cashbackLookup: '캐시백 이력', faq: '자주 묻는 질문', contact: '문의하기', joinNow: '지금 가입', lookupCashback: '캐시백 조회' },
  hero: { badge: '베트남 #1 트레이딩 캐시백 플랫폼', title1: '암호화폐 & 외환 거래에서', titleHighlight1: '거래 수수료 환급', title2: '받기,', titleHighlight2: 'DA CASH BACK', desc: 'DA CASH BACK 파트너 링크를 통해 거래소에 가입하고, 평소처럼 거래하면서 거래 수수료의 일부를 정기적으로 돌려받으세요. 투명 — 안전 — 비밀번호 불필요.', cta1: '캐시백 받기 시작', cta2: '지원 거래소 보기', badge1: '🔒 비밀번호 불필요', badge2: '🛡️ 고객 자금 보관 안 함', badge3: '✅ 거래소 UID만 필요', dashTotal: '총 캐시백 수령액', dashMonth: '이번 달 캐시백', dashExchanges: '지원 거래소 수', dashVerified: '✓ UID 인증 완료', dashRecent: '최근 환급', dashNext: '다음 지급일:' },
  stats: { s1v: '10+', s1l: '지원 거래소', s1s: '암호화폐 & 외환', s2v: '최대 70%', s2l: '캐시백 비율', s2s: '거래소 및 프로그램에 따라 다름', s3v: '정기', s3l: '지급', s3s: '일간 / 주간 / 월간', s4v: '투명한', s4l: '이력 관리', s4s: '명확한 이력, 쉬운 조회', note: '* 캐시백 비율은 각 거래소의 정책 및 파트너 프로그램에 따라 변경될 수 있습니다.' },
  exchanges: { badge: '공식 파트너', title: '지원 거래소', desc: 'DA CASH BACK 파트너 링크를 통해 가입하면 캐시백이 활성화됩니다. 비율은 거래소마다 다릅니다.', all: '전체', crypto: '🔷 암호화폐', forex: '📈 외환', register: '캐시백 받기', guide: '가이드', rate: '캐시백 비율', viewDetails: '자세히 보기', disclaimer: '⚠️ 캐시백 비율은 각 거래소 정책에 따라 변경될 수 있습니다.' },
  how: { badge: '간단하고 투명하게', title: '이용 방법', desc: '거래 수수료 환급을 시작하는 간단한 4단계', s1t: '거래소 선택', s1d: 'DA CASH BACK 파트너 목록에서 원하는 암호화폐 또는 외환 거래소를 선택하세요.', s2t: '추천 링크로 가입', s2d: 'DA CASH BACK에서 제공하는 추천 링크 또는 코드를 사용하여 새 계정을 등록하세요.', s3t: 'UID 제출하여 인증', s3d: '계정 생성 후, 거래소 UID를 제출하여 캐시백 연동을 확인하세요.', s4t: '정기 캐시백 수령', s4d: '거래소에서 평소처럼 거래하세요. 각 거래소의 지급 주기에 따라 캐시백이 환급됩니다.', cta: '지금 시작하기 →' },
  lookup: { badge: '빠른 조회', title: '캐시백 확인', desc: '계정 정보를 입력하여 상태 및 예상 캐시백을 조회하세요', selectEx: '거래소 선택 *', selectPlaceholder: '-- 거래소 선택 --', uidLabel: '거래소 계정 UID *', uidPlaceholder: '계정 UID를 입력하세요...', uidHint: 'UID는 보통 거래소 계정의 프로필 섹션에서 확인할 수 있습니다', btn: '🔍 캐시백 조회', loading: '⏳ 조회 중...', resultTitle: '📊 조회 결과', rUID: 'UID', rExchange: '거래소', rStatus: '상태', rCashback: '예상 캐시백', rNextPayment: '다음 지급 예정일', disclaimer: '데이터는 참고용입니다. 실제 캐시백은 파트너 거래소의 정산 데이터에 따라 달라집니다.' },
  benefits: { badge: '혜택', title: 'DA CASH BACK을 선택하는 이유', desc: '거래 습관을 바꾸지 않고도 거래 비용을 최적화하세요', b1t: '거래 방식 변경 없음', b1d: '거래소에서 평소처럼 거래를 계속하세요. 가입 후 추가 작업이 필요 없습니다.', b2t: '추가 수수료 없음', b2d: 'DA CASH BACK은 완전 무료입니다. 아무런 추가 비용이 들지 않습니다.', b3t: '거래 수수료 일부 환급', b3d: '거래소에 지불한 수수료의 일부가 파트너 프로그램을 통해 정기적으로 환급됩니다.', b4t: '투명한 이력 관리', b4d: '언제든지 캐시백을 조회하고 거래소 및 지급 주기별 상세 환급 이력을 확인하세요.', b5t: '다수 거래소 지원', b5d: '여러 암호화폐 및 외환 거래소에서 동시에 캐시백을 받아 혜택을 극대화하세요.', b6t: '접근 권한 불필요', b6d: 'DA CASH BACK은 비밀번호, 출금 API 키, 2FA 코드, 시드 구문을 절대 요청하지 않습니다.' },
  trust: { badge: '약속', title: '안전과 투명성이 최우선입니다', p1: 'DA CASH BACK은 거래소 계정 비밀번호를 절대 요청하지 않습니다.', p2: 'DA CASH BACK은 고객의 거래 자금을 보관하지 않습니다.', p3: '사용자는 공식 거래소에서 직접 계정을 관리합니다.', p4: '파트너 프로그램을 통한 캐시백 자격 확인을 위해 UID만 사용합니다.', p5: '시드 구문, 개인 키, 2FA 코드, 출금 API 키를 누구에게도 공유하지 마세요.', badge2: '신뢰할 수 있는 플랫폼', desc2: '공식 파트너 프로그램을 통해 운영됩니다. 사용자 자산에 대한 접근 권한이 없습니다.', warning: '중요 경고', warningDesc: 'DA CASH BACK은 투자 조언을 제공하지 않으며 수익을 보장하지 않습니다. 암호화폐 및 외환 거래는 높은 위험을 수반합니다.', onlyNeed: 'DA CASH BACK이 필요한 것:', need1: '✅ 거래소 계정 UID', need2: '✅ 파트너 링크를 통한 가입 확인', neverAsk: 'DA CASH BACK이 절대 요청하지 않는 것:', never1: '⛔ 계정 비밀번호', never2: '⛔ 2FA 코드 / OTP', never3: '⛔ 개인 키 / 시드 구문', never4: '⛔ 출금 API 키' },
  faq: { badge: '자주 묻는 질문', title: '자주 묻는 질문', desc: 'DA CASH BACK 거래 수수료 환급 서비스에 대한 일반적인 질문들', noAnswer: '답변을 찾지 못하셨나요?', contactSupport: '고객 지원 문의', items: [{ q: '캐시백이란 무엇인가요?', a: '캐시백은 거래소에서 발생한 거래 수수료의 일부를 DA CASH BACK과 거래소 간의 IB/제휴 파트너 프로그램을 통해 돌려받는 금액입니다.' }, { q: 'DA CASH BACK에 돈을 입금해야 하나요?', a: '아니요. 사용자는 공식 거래소에서 직접 거래합니다. DA CASH BACK은 거래 입금을 받지 않으며 거래소가 아닙니다.' }, { q: '어떤 정보를 제공해야 하나요?', a: '일반적으로 캐시백 연동 확인을 위해 거래소 계정 UID만 필요합니다. 비밀번호, 2FA 코드, 개인 키, 시드 구문은 절대 제공하지 마세요.' }, { q: '캐시백은 언제 지급되나요?', a: '각 거래소의 정산 주기에 따라 다릅니다. 일부 거래소는 일간, 주간 또는 월간으로 지급할 수 있습니다.' }, { q: '이미 거래소 계정이 있으면 캐시백을 받을 수 있나요?', a: '각 거래소의 정책에 따라 다릅니다. 일부 거래소는 파트너 링크를 통해 새로 가입한 계정만 자격이 있습니다.' }, { q: 'DA CASH BACK이 수익을 보장하나요?', a: '아니요. DA CASH BACK은 거래 수수료 환급 플랫폼일 뿐입니다. 수익을 보장하지 않으며 거래 결과에 대한 책임을 지지 않습니다.' }, { q: '캐시백은 어떤 화폐로 지급되나요?', a: '거래소와 계약에 따라 다릅니다. 일반적으로 USDT 또는 거래소 네이티브 토큰으로 지급됩니다.' }] },
  test: { badge: '커뮤니티', title: '사용자 후기', note: '* 이는 예시 후기입니다', items: [{ name: 'Trader A.', role: '암호화폐 트레이더', text: '조회하기 쉬운 인터페이스, 명확한 등록 과정. 하나의 플랫폼에서 3개의 거래소 캐시백을 추적할 수 있어요.' }, { name: 'Trader B.', role: '외환 트레이더', text: '계정 비밀번호를 제공할 필요가 없어서 좋아요. UID만으로 충분하고 보안에 매우 안심이 됩니다.' }, { name: 'Trader C.', role: '데이 트레이더', text: '캐시백 덕분에 거래 비용을 최적화할 수 있어요. 매달 상당한 수수료를 절약하고 있습니다.' }] },
  contact: { badge: '고객 지원', title: '문의하기', desc: '지원팀이 캐시백 및 등록 과정에 관한 모든 질문에 답변해 드립니다', channels: '연락 채널', nameLabel: '이름 *', namePlaceholder: '홍길동', contactLabel: '이메일 / 텔레그램 *', contactPlaceholder: 'email@example.com 또는 @username', msgLabel: '문의 내용 *', msgPlaceholder: '문제 또는 질문을 설명해 주세요...', submit: '문의 보내기', successTitle: '전송 완료!', successDesc: '가능한 빨리 답변 드리겠습니다.', sendAnother: '다른 메시지 보내기', response: '💡 일반 응답 시간: 영업일 기준 24시간 이내.', address: '베트남' },
  footer: { desc: '암호화폐 & 외환 거래 캐시백 플랫폼. 투명 — 안전 — 비밀번호 불필요.', nav: '탐색', legal: '법적 고지', terms: '서비스 약관', privacy: '개인정보 처리방침', risk: '위험 고지', contact: '문의', disclaimer: 'DA CASH BACK은 거래소가 아니며 고객 자금을 보관하지 않고 투자 조언을 제공하지 않습니다. 암호화폐 및 외환은 고위험 시장입니다. 거래 참여 전 충분한 조사가 필요합니다.', copyright: '© {year} DA CASH BACK. All rights reserved.' },
  exchangeDesc: { binance: '거래량 기준 세계 최대 암호화폐 거래소.', okx: '현물, 선물, 옵션 및 Web3 지갑을 갖춘 다기능 거래소.', bybit: '높은 유동성을 갖춘 선도적인 파생상품 및 현물 거래 플랫폼.', mexc: '경쟁력 있는 거래 수수료로 수천 개의 알트코인을 지원.', bingx: '사용자 친화적인 인터페이스의 소셜 트레이딩 거래소.', bitget: '인기 있는 카피 트레이딩 기능으로 유명한 거래소.', gate: '다양한 토큰 목록을 보유한 가장 오래된 거래소 중 하나.', kucoin: '초보자에게 친화적인 다양한 토큰 거래소.', bitunix: '경쟁력 있는 수수료와 현대적인 도구를 갖춘 파생상품 거래소.', ourbit: '트레이더를 위한 매력적인 캐시백 비율을 제공하는 신흥 거래소.', exness: '낮은 스프레드와 유연한 레버리지를 갖춘 신뢰할 수 있는 외환 브로커.', vantage: '여러 글로벌 기관의 규제를 받는 국제 외환 브로커.', xm: '다양한 계좌 유형과 MT4/MT5 플랫폼을 갖춘 글로벌 외환 브로커.' },
};

// ─── THAI ─────────────────────────────────────────────────────────
const th: Translations = {
  siteName: 'DA CASH BACK',
  slogan: 'เทรดอย่างฉลาดด้วยแคชแบ็กทุกวัน',
  nav: { home: 'หน้าหลัก', exchanges: 'ตลาดที่รองรับ', howItWorks: 'วิธีการทำงาน', cashbackLookup: 'ประวัติแคชแบ็ก', faq: 'คำถามที่พบบ่อย', contact: 'ติดต่อเรา', joinNow: 'เข้าร่วมเลย', lookupCashback: 'ตรวจสอบแคชแบ็ก' },
  hero: { badge: 'แพลตฟอร์มแคชแบ็กการเทรด #1 ในเวียดนาม', title1: 'รับ', titleHighlight1: 'เงินคืนค่าธรรมเนียมการเทรด', title2: 'Crypto & Forex กับ', titleHighlight2: 'DA CASH BACK', desc: 'สมัครบัญชีตลาดผ่านลิงก์พาร์ทเนอร์ของ DA CASH BACK เทรดตามปกติ และรับส่วนหนึ่งของค่าธรรมเนียมการเทรดคืนเป็นระยะ โปร่งใส — ปลอดภัย — ไม่ต้องใช้รหัสผ่าน', cta1: 'เริ่มรับแคชแบ็ก', cta2: 'ดูตลาดที่รองรับ', badge1: '🔒 ไม่ต้องใช้รหัสผ่าน', badge2: '🛡️ ไม่เก็บเงินลูกค้า', badge3: '✅ ต้องการแค่ UID บัญชีตลาด', dashTotal: 'แคชแบ็กทั้งหมดที่ได้รับ', dashMonth: 'แคชแบ็กเดือนนี้', dashExchanges: 'จำนวนตลาดที่รองรับ', dashVerified: '✓ ยืนยัน UID แล้ว', dashRecent: 'แคชแบ็กล่าสุด', dashNext: 'รอบการจ่ายครั้งถัดไป:' },
  stats: { s1v: '10+', s1l: 'ตลาดที่รองรับ', s1s: 'Crypto & Forex', s2v: 'สูงสุด 70%', s2l: 'อัตราแคชแบ็ก', s2s: 'ขึ้นอยู่กับตลาดและโปรแกรม', s3v: 'สม่ำเสมอ', s3l: 'การจ่ายเงิน', s3s: 'รายวัน / รายสัปดาห์ / รายเดือน', s4v: 'โปร่งใส', s4l: 'การติดตาม', s4s: 'ประวัติชัดเจน ตรวจสอบง่าย', note: '* อัตราแคชแบ็กอาจเปลี่ยนแปลงตามนโยบายของแต่ละตลาดและโปรแกรมพาร์ทเนอร์ในแต่ละช่วงเวลา' },
  exchanges: { badge: 'พาร์ทเนอร์อย่างเป็นทางการ', title: 'ตลาดที่รองรับ', desc: 'สมัครผ่านลิงก์ DA CASH BACK เพื่อเปิดใช้งานแคชแบ็ก อัตราขึ้นอยู่กับแต่ละตลาดและพาร์ทเนอร์', all: 'ทั้งหมด', crypto: '🔷 คริปโต', forex: '📈 ฟอเร็กซ์', register: 'รับแคชแบ็ก', guide: 'คู่มือ', rate: 'อัตราแคชแบ็ก', viewDetails: 'ดูรายละเอียด', disclaimer: '⚠️ อัตราแคชแบ็กอาจเปลี่ยนแปลงตามนโยบายของแต่ละตลาด' },
  how: { badge: 'ง่ายและโปร่งใส', title: 'วิธีการทำงาน', desc: 'กระบวนการ 4 ขั้นตอนง่ายๆ เพื่อเริ่มรับเงินคืนค่าธรรมเนียมการเทรด', s1t: 'เลือกตลาด', s1d: 'เลือกตลาด crypto หรือ forex ที่ต้องการจากรายชื่อพาร์ทเนอร์ DA CASH BACK', s2t: 'สมัครผ่านลิงก์แนะนำ', s2d: 'สร้างบัญชีใหม่บนตลาดโดยใช้ลิงก์หรือรหัสแนะนำที่ DA CASH BACK จัดให้', s3t: 'ส่ง UID เพื่อยืนยัน', s3d: 'หลังจากสร้างบัญชีแล้ว ส่ง UID บัญชีตลาดเพื่อยืนยันการเชื่อมต่อแคชแบ็ก', s4t: 'รับแคชแบ็กสม่ำเสมอ', s4d: 'เทรดตามปกติบนตลาด แคชแบ็กจะถูกคืนตามรอบการจ่ายของแต่ละตลาด', cta: 'เริ่มต้นเลย →' },
  lookup: { badge: 'ตรวจสอบด่วน', title: 'ตรวจสอบแคชแบ็กของคุณ', desc: 'ป้อนข้อมูลบัญชีเพื่อตรวจสอบสถานะและแคชแบ็กโดยประมาณ', selectEx: 'เลือกตลาด *', selectPlaceholder: '-- เลือกตลาด --', uidLabel: 'UID บัญชีตลาด *', uidPlaceholder: 'ป้อน UID บัญชีของคุณ...', uidHint: 'UID มักอยู่ในส่วนโปรไฟล์ของบัญชีตลาด', btn: '🔍 ตรวจสอบแคชแบ็ก', loading: '⏳ กำลังค้นหา...', resultTitle: '📊 ผลการตรวจสอบ', rUID: 'UID', rExchange: 'ตลาด', rStatus: 'สถานะ', rCashback: 'แคชแบ็กโดยประมาณ', rNextPayment: 'รอบการจ่ายครั้งถัดไป', disclaimer: 'ข้อมูลเป็นเพียงข้อมูลอ้างอิง แคชแบ็กจริงขึ้นอยู่กับข้อมูลการกระทบยอดจากตลาดพาร์ทเนอร์' },
  benefits: { badge: 'ประโยชน์', title: 'ทำไมต้องเลือก DA CASH BACK?', desc: 'เพิ่มประสิทธิภาพต้นทุนการเทรดโดยไม่ต้องเปลี่ยนนิสัยใดๆ', b1t: 'ไม่เปลี่ยนวิธีการเทรด', b1d: 'เทรดตามปกติบนตลาดต่อไป ไม่ต้องทำอะไรเพิ่มเติมหลังจากสมัคร', b2t: 'ไม่มีค่าธรรมเนียมเพิ่มเติม', b2d: 'DA CASH BACK เข้าร่วมฟรีทั้งหมด คุณไม่ต้องจ่ายอะไรเพิ่ม', b3t: 'รับค่าธรรมเนียมการเทรดคืน', b3d: 'ส่วนหนึ่งของค่าธรรมเนียมที่คุณจ่ายให้ตลาดจะถูกคืนเป็นระยะผ่านโปรแกรมพาร์ทเนอร์', b4t: 'ประวัติโปร่งใส', b4d: 'ตรวจสอบแคชแบ็กได้ตลอดเวลา ดูประวัติการคืนเงินตามตลาดและรอบการจ่าย', b5t: 'รองรับหลายตลาด', b5d: 'รับแคชแบ็กจากหลายตลาด crypto และ forex พร้อมกันเพื่อเพิ่มผลประโยชน์สูงสุด', b6t: 'ไม่ต้องให้สิทธิ์เข้าถึง', b6d: 'DA CASH BACK ไม่ขอรหัสผ่าน API key ถอนเงิน รหัส 2FA หรือ seed phrase ของคุณ' },
  trust: { badge: 'ความมุ่งมั่น', title: 'ความปลอดภัยและความโปร่งใสคือสิ่งสำคัญที่สุด', p1: 'DA CASH BACK ไม่เคยขอรหัสผ่านบัญชีตลาดของคุณ', p2: 'DA CASH BACK ไม่เก็บเงินการเทรดของลูกค้า', p3: 'ผู้ใช้จัดการบัญชีของตนเองโดยตรงบนตลาดอย่างเป็นทางการ', p4: 'เราใช้ UID เท่านั้นเพื่อตรวจสอบสิทธิ์แคชแบ็กผ่านโปรแกรมพาร์ทเนอร์', p5: 'ห้ามแชร์ seed phrase, private key, รหัส 2FA หรือ API key ถอนเงินกับใคร', badge2: 'แพลตฟอร์มที่เชื่อถือได้', desc2: 'ดำเนินงานผ่านโปรแกรมพาร์ทเนอร์อย่างเป็นทางการ ไม่มีสิทธิ์เข้าถึงทรัพย์สินของผู้ใช้', warning: 'คำเตือนสำคัญ', warningDesc: 'DA CASH BACK ไม่ให้คำแนะนำการลงทุนและไม่รับประกันผลกำไร การเทรด Crypto และ Forex มีความเสี่ยงสูง', onlyNeed: 'DA CASH BACK ต้องการเพียง:', need1: '✅ UID บัญชีตลาดของคุณ', need2: '✅ การยืนยันการสมัครผ่านลิงก์พาร์ทเนอร์', neverAsk: 'DA CASH BACK จะไม่ขอสิ่งเหล่านี้:', never1: '⛔ รหัสผ่านบัญชี', never2: '⛔ รหัส 2FA / OTP', never3: '⛔ Private Key / Seed Phrase', never4: '⛔ API Key ถอนเงิน' },
  faq: { badge: 'คำถามที่พบบ่อย', title: 'คำถามที่พบบ่อย', desc: 'คำถามทั่วไปเกี่ยวกับบริการคืนค่าธรรมเนียมการเทรดของ DA CASH BACK', noAnswer: 'ไม่พบคำตอบ?', contactSupport: 'ติดต่อฝ่ายสนับสนุน', items: [{ q: 'แคชแบ็กคืออะไร?', a: 'แคชแบ็กคือการคืนส่วนหนึ่งของค่าธรรมเนียมการเทรดที่ผู้ใช้จ่ายบนตลาด ผ่านโปรแกรมพาร์ทเนอร์ IB/affiliate ระหว่าง DA CASH BACK และตลาด' }, { q: 'ต้องฝากเงินเข้า DA CASH BACK ไหม?', a: 'ไม่ ผู้ใช้เทรดโดยตรงบนตลาดอย่างเป็นทางการ DA CASH BACK ไม่รับเงินฝากและไม่ใช่ตลาดการเทรด' }, { q: 'ต้องให้ข้อมูลอะไรบ้าง?', a: 'โดยทั่วไปต้องการเพียง UID บัญชีตลาดเพื่อยืนยันการเชื่อมต่อแคชแบ็ก ห้ามให้รหัสผ่าน รหัส 2FA, private key หรือ seed phrase' }, { q: 'แคชแบ็กจ่ายเมื่อไหร่?', a: 'ขึ้นอยู่กับรอบการกระทบยอดของแต่ละตลาด บางตลาดอาจจ่ายรายวัน รายสัปดาห์ หรือรายเดือน' }, { q: 'มีบัญชีตลาดอยู่แล้วรับแคชแบ็กได้ไหม?', a: 'ขึ้นอยู่กับนโยบายของแต่ละตลาด บางตลาดกำหนดให้บัญชีใหม่ที่สมัครผ่านลิงก์พาร์ทเนอร์เท่านั้นที่มีสิทธิ์' }, { q: 'DA CASH BACK รับประกันกำไรไหม?', a: 'ไม่ DA CASH BACK เป็นเพียงแพลตฟอร์มคืนค่าธรรมเนียมการเทรด ไม่รับประกันกำไรและไม่รับผิดชอบต่อผลการเทรด' }, { q: 'แคชแบ็กจ่ายเป็นสกุลเงินอะไร?', a: 'ขึ้นอยู่กับตลาดและข้อตกลง โดยทั่วไปจ่ายเป็น USDT หรือโทเค็นหลักของตลาด' }] },
  test: { badge: 'ชุมชน', title: 'รีวิวจากผู้ใช้', note: '* นี่คือรีวิวตัวอย่าง', items: [{ name: 'Trader A.', role: 'เทรดเดอร์คริปโต', text: 'อินเทอร์เฟซตรวจสอบง่าย กระบวนการสมัครชัดเจน ฉันติดตามแคชแบ็กจาก 3 ตลาดบนแพลตฟอร์มเดียวได้' }, { name: 'Trader B.', role: 'เทรดเดอร์ฟอเร็กซ์', text: 'ชอบที่ไม่ต้องให้รหัสผ่านบัญชี UID ก็เพียงพอ ปลอดภัยมาก' }, { name: 'Trader C.', role: 'เดย์เทรดเดอร์', text: 'แคชแบ็กช่วยให้ฉันเพิ่มประสิทธิภาพต้นทุนการเทรด ประหยัดค่าธรรมเนียมได้มากทุกเดือน' }] },
  contact: { badge: 'สนับสนุน', title: 'ติดต่อเรา', desc: 'ทีมสนับสนุนพร้อมตอบทุกคำถามเกี่ยวกับแคชแบ็กและกระบวนการสมัคร', channels: 'ช่องทางติดต่อ', nameLabel: 'ชื่อ-นามสกุล *', namePlaceholder: 'สมชาย ใจดี', contactLabel: 'อีเมล / Telegram *', contactPlaceholder: 'email@example.com หรือ @username', msgLabel: 'เรื่องที่ต้องการสนับสนุน *', msgPlaceholder: 'อธิบายปัญหาหรือคำถามของคุณ...', submit: 'ส่งคำขอสนับสนุน', successTitle: 'ส่งสำเร็จ!', successDesc: 'เราจะตอบกลับโดยเร็วที่สุด', sendAnother: 'ส่งข้อความอื่น', response: '💡 เวลาตอบสนองทั่วไป: ภายใน 24 ชั่วโมงในวันทำการ', address: 'เวียดนาม' },
  footer: { desc: 'แพลตฟอร์มแคชแบ็กการเทรด Crypto & Forex โปร่งใส — ปลอดภัย — ไม่ต้องใช้รหัสผ่าน', nav: 'นำทาง', legal: 'กฎหมาย', terms: 'ข้อกำหนดการให้บริการ', privacy: 'นโยบายความเป็นส่วนตัว', risk: 'การเปิดเผยความเสี่ยง', contact: 'ติดต่อ', disclaimer: 'DA CASH BACK ไม่ใช่ตลาดการเทรด ไม่เก็บเงินลูกค้า และไม่ให้คำแนะนำการลงทุน Crypto และ Forex เป็นตลาดความเสี่ยงสูง ผู้ใช้ควรศึกษาข้อมูลก่อนเข้าร่วมการเทรด', copyright: '© {year} DA CASH BACK. All rights reserved.' },
  exchangeDesc: { binance: 'ตลาดแลกเปลี่ยนคริปโตที่ใหญ่ที่สุดในโลกตามปริมาณการซื้อขาย', okx: 'ตลาดอเนกประสงค์พร้อม spot, futures, options และ Web3 wallet', bybit: 'แพลตฟอร์มซื้อขาย derivatives และ spot ชั้นนำที่มีสภาพคล่องสูง', mexc: 'รองรับ altcoin นับพันชนิดพร้อมค่าธรรมเนียมการเทรดที่แข่งขันได้', bingx: 'ตลาด social trading ที่มีอินเทอร์เฟซที่ใช้งานง่าย', bitget: 'ตลาดที่ขึ้นชื่อด้วยฟีเจอร์ copy trading ที่ได้รับความนิยม', gate: 'หนึ่งในตลาดที่เก่าแก่ที่สุดพร้อมรายชื่อโทเค็นที่หลากหลาย', kucoin: 'ตลาดโทเค็นหลากหลาย เหมาะสำหรับผู้เริ่มต้น', bitunix: 'ตลาด derivatives พร้อมค่าธรรมเนียมแข่งขันได้และเครื่องมือทันสมัย', ourbit: 'ตลาดใหม่ที่มีอัตราแคชแบ็กที่น่าสนใจสำหรับเทรดเดอร์', exness: 'โบรกเกอร์ Forex ที่น่าเชื่อถือ spread ต่ำ leverage ยืดหยุ่น', vantage: 'โบรกเกอร์ Forex นานาชาติ ควบคุมโดยหน่วยงานระดับโลกหลายแห่ง', xm: 'โบรกเกอร์ Forex ระดับโลกพร้อมประเภทบัญชีหลากหลายและแพลตฟอร์ม MT4/MT5' },
};

// ─── INDONESIAN ───────────────────────────────────────────────────
const id: Translations = {
  siteName: 'DA CASH BACK',
  slogan: 'Trading lebih cerdas dengan cashback setiap hari',
  nav: { home: 'Beranda', exchanges: 'Exchange', howItWorks: 'Cara Kerja', cashbackLookup: 'Riwayat Cashback', faq: 'FAQ', contact: 'Hubungi Kami', joinNow: 'Daftar Sekarang', lookupCashback: 'Cek Cashback' },
  hero: { badge: 'Platform Cashback Trading #1 di Vietnam', title1: 'Dapatkan', titleHighlight1: 'Cashback Biaya Trading', title2: 'Crypto & Forex bersama', titleHighlight2: 'DA CASH BACK', desc: 'Daftar akun exchange melalui link partner DA CASH BACK, trading seperti biasa, dan dapatkan kembali sebagian biaya trading secara berkala. Transparan — Aman — Tanpa kata sandi.', cta1: 'Mulai Terima Cashback', cta2: 'Lihat Exchange', badge1: '🔒 Tanpa Kata Sandi', badge2: '🛡️ Dana Klien Tidak Kami Simpan', badge3: '✅ Hanya Butuh UID Akun Exchange', dashTotal: 'Total Cashback Diterima', dashMonth: 'Cashback Bulan Ini', dashExchanges: 'Jumlah Exchange', dashVerified: '✓ UID Terverifikasi', dashRecent: 'Cashback Terbaru', dashNext: 'Pembayaran berikutnya:' },
  stats: { s1v: '10+', s1l: 'Exchange', s1s: 'Crypto & Forex', s2v: 'Hingga 70%', s2l: 'Tingkat Cashback', s2s: 'tergantung exchange & program', s3v: 'Berkala', s3l: 'Pembayaran', s3s: 'Harian / Mingguan / Bulanan', s4v: 'Transparan', s4l: 'Pelacakan', s4s: 'Riwayat jelas, mudah dicek', note: '* Tingkat cashback dapat berubah sesuai kebijakan masing-masing exchange dan program partner.' },
  exchanges: { badge: 'Mitra Resmi', title: 'Exchange yang Didukung', desc: 'Daftar melalui link DA CASH BACK untuk mengaktifkan cashback. Tingkat bervariasi per exchange dan mitra.', all: 'Semua', crypto: '🔷 Kripto', forex: '📈 Forex', register: 'Daftar Cashback', guide: 'Panduan', rate: 'Tingkat Cashback', viewDetails: 'Lihat detail', disclaimer: '⚠️ Tingkat cashback dapat berubah sesuai kebijakan masing-masing exchange.' },
  how: { badge: 'Sederhana & Transparan', title: 'Cara Kerja', desc: 'Proses 4 langkah sederhana untuk mulai mendapatkan pengembalian biaya trading', s1t: 'Pilih Exchange', s1d: 'Pilih exchange crypto atau forex yang ingin Anda daftar dari daftar mitra DA CASH BACK.', s2t: 'Daftar via Link Referral', s2d: 'Buat akun baru di exchange menggunakan link atau kode referral yang disediakan DA CASH BACK.', s3t: 'Kirim UID untuk Verifikasi', s3d: 'Setelah membuat akun, kirim UID akun exchange Anda untuk memverifikasi koneksi cashback.', s4t: 'Terima Cashback Berkala', s4d: 'Trading seperti biasa di exchange. Cashback akan dikembalikan sesuai siklus pembayaran masing-masing exchange.', cta: 'Mulai Sekarang →' },
  lookup: { badge: 'Cek Cepat', title: 'Periksa Cashback Anda', desc: 'Masukkan informasi akun untuk memeriksa status dan perkiraan cashback', selectEx: 'Pilih Exchange *', selectPlaceholder: '-- Pilih Exchange --', uidLabel: 'UID Akun Exchange *', uidPlaceholder: 'Masukkan UID akun Anda...', uidHint: 'UID biasanya ada di bagian Profil akun exchange Anda', btn: '🔍 Cek Cashback', loading: '⏳ Mencari...', resultTitle: '📊 Hasil Pencarian', rUID: 'UID', rExchange: 'Exchange', rStatus: 'Status', rCashback: 'Perkiraan Cashback', rNextPayment: 'Jadwal Pembayaran Berikutnya', disclaimer: 'Data hanya untuk referensi. Cashback aktual tergantung data rekonsiliasi dari exchange partner.' },
  benefits: { badge: 'Keuntungan', title: 'Mengapa Memilih DA CASH BACK?', desc: 'Optimalkan biaya trading tanpa mengubah kebiasaan apapun', b1t: 'Tidak Ada Perubahan Cara Trading', b1d: 'Terus trading seperti biasa di exchange. Tidak perlu melakukan apapun setelah mendaftar.', b2t: 'Tanpa Biaya Tambahan', b2d: 'DA CASH BACK sepenuhnya gratis untuk diikuti. Anda tidak perlu membayar apapun.', b3t: 'Dapatkan Kembali Biaya Trading', b3d: 'Sebagian biaya yang Anda bayarkan ke exchange dikembalikan secara berkala melalui program partner.', b4t: 'Riwayat Transparan', b4d: 'Cek cashback kapan saja, lihat riwayat pengembalian detail per exchange dan periode pembayaran.', b5t: 'Mendukung Banyak Exchange', b5d: 'Dapatkan cashback dari banyak exchange crypto dan forex sekaligus untuk memaksimalkan manfaat Anda.', b6t: 'Tidak Perlu Akses', b6d: 'DA CASH BACK tidak pernah meminta kata sandi, API key penarikan, kode 2FA, atau seed phrase Anda.' },
  trust: { badge: 'Komitmen', title: 'Keamanan dan Transparansi adalah Prioritas Utama', p1: 'DA CASH BACK tidak pernah meminta kata sandi akun exchange Anda.', p2: 'DA CASH BACK tidak menyimpan dana trading klien.', p3: 'Pengguna mengelola akun mereka langsung di exchange resmi.', p4: 'Kami hanya menggunakan UID untuk memverifikasi kelayakan cashback melalui program partner.', p5: 'Jangan pernah membagikan seed phrase, private key, kode 2FA, atau API key penarikan kepada siapapun.', badge2: 'Platform Terpercaya', desc2: 'Beroperasi melalui program partner resmi. Tidak ada akses ke aset pengguna.', warning: 'Peringatan Penting', warningDesc: 'DA CASH BACK tidak memberikan saran investasi dan tidak menjamin keuntungan. Trading Crypto dan Forex memiliki risiko tinggi.', onlyNeed: 'DA CASH BACK Hanya Membutuhkan:', need1: '✅ UID akun exchange Anda', need2: '✅ Konfirmasi pendaftaran via link partner', neverAsk: 'DA CASH BACK TIDAK PERNAH Meminta:', never1: '⛔ Kata Sandi Akun', never2: '⛔ Kode 2FA / OTP', never3: '⛔ Private Key / Seed Phrase', never4: '⛔ API Key Penarikan' },
  faq: { badge: 'FAQ', title: 'Pertanyaan yang Sering Diajukan', desc: 'Pertanyaan umum tentang layanan pengembalian biaya trading DA CASH BACK', noAnswer: 'Tidak menemukan jawaban?', contactSupport: 'Hubungi Dukungan', items: [{ q: 'Apa itu cashback?', a: 'Cashback adalah pengembalian sebagian biaya trading yang dibayarkan pengguna di exchange, dibagikan kembali melalui program partner IB/afiliasi antara DA CASH BACK dan exchange.' }, { q: 'Apakah saya perlu menyetor uang ke DA CASH BACK?', a: 'Tidak. Pengguna trading langsung di exchange resmi. DA CASH BACK tidak menerima setoran trading dan bukan merupakan exchange.' }, { q: 'Informasi apa yang perlu saya berikan?', a: 'Biasanya hanya UID akun exchange yang diperlukan untuk memverifikasi koneksi cashback. Jangan pernah memberikan kata sandi, kode 2FA, private key, atau seed phrase.' }, { q: 'Kapan cashback dibayarkan?', a: 'Tergantung siklus rekonsiliasi masing-masing exchange. Beberapa exchange mungkin membayar harian, mingguan, atau bulanan.' }, { q: 'Bisakah saya menerima cashback jika sudah memiliki akun exchange?', a: 'Tergantung kebijakan masing-masing exchange. Beberapa exchange mensyaratkan akun baru yang didaftarkan melalui link partner.' }, { q: 'Apakah DA CASH BACK menjamin keuntungan?', a: 'Tidak. DA CASH BACK hanyalah platform pengembalian biaya trading. Kami tidak menjamin keuntungan dan tidak bertanggung jawab atas hasil trading.' }, { q: 'Cashback dibayar dalam mata uang apa?', a: 'Tergantung exchange dan perjanjian. Cashback biasanya dibayarkan dalam USDT atau token native exchange.' }] },
  test: { badge: 'Komunitas', title: 'Ulasan Pengguna', note: '* Ini adalah ulasan ilustrasi', items: [{ name: 'Trader A.', role: 'Crypto Trader', text: 'Antarmuka mudah dicek, proses pendaftaran jelas. Saya bisa melacak cashback dari 3 exchange berbeda di satu platform.' }, { name: 'Trader B.', role: 'Forex Trader', text: 'Saya suka tidak perlu memberikan kata sandi akun. Cukup UID saja, sangat aman.' }, { name: 'Trader C.', role: 'Day Trader', text: 'Cashback membantu saya mengoptimalkan biaya trading. Saya menghemat biaya yang signifikan setiap bulannya.' }] },
  contact: { badge: 'Dukungan', title: 'Hubungi Kami', desc: 'Tim dukungan kami siap menjawab pertanyaan tentang cashback dan proses pendaftaran', channels: 'Saluran Kontak', nameLabel: 'Nama Lengkap *', namePlaceholder: 'Budi Santoso', contactLabel: 'Email / Telegram *', contactPlaceholder: 'email@example.com atau @username', msgLabel: 'Permintaan Dukungan *', msgPlaceholder: 'Jelaskan masalah atau pertanyaan Anda...', submit: 'Kirim Permintaan', successTitle: 'Berhasil Terkirim!', successDesc: 'Kami akan merespons sesegera mungkin.', sendAnother: 'Kirim Pesan Lain', response: '💡 Waktu respons biasa: dalam 24 jam di hari kerja.', address: 'Vietnam' },
  footer: { desc: 'Platform Cashback Trading Crypto & Forex. Transparan — Aman — Tanpa Kata Sandi.', nav: 'Navigasi', legal: 'Hukum', terms: 'Syarat Layanan', privacy: 'Kebijakan Privasi', risk: 'Penafian Risiko', contact: 'Kontak', disclaimer: 'DA CASH BACK bukan exchange, tidak menyimpan dana klien, dan tidak memberikan saran investasi. Crypto dan Forex adalah pasar berisiko tinggi. Pengguna harus melakukan penelitian sendiri sebelum trading.', copyright: '© {year} DA CASH BACK. All rights reserved.' },
  exchangeDesc: { binance: 'Exchange kripto terbesar di dunia berdasarkan volume trading.', okx: 'Exchange serbaguna dengan spot, futures, options, dan dompet Web3.', bybit: 'Platform trading derivatives dan spot terkemuka dengan likuiditas tinggi.', mexc: 'Mendukung ribuan altcoin dengan biaya trading yang kompetitif.', bingx: 'Exchange social trading dengan antarmuka yang ramah pengguna.', bitget: 'Exchange yang terkenal dengan fitur copy trading populer.', gate: 'Salah satu exchange tertua dengan daftar token yang beragam.', kucoin: 'Exchange token beragam, ramah untuk pengguna baru.', bitunix: 'Exchange derivatives dengan biaya kompetitif dan alat modern.', ourbit: 'Exchange baru dengan tingkat cashback menarik untuk trader.', exness: 'Broker Forex terpercaya dengan spread rendah dan leverage fleksibel.', vantage: 'Broker Forex internasional yang diatur oleh banyak otoritas global.', xm: 'Broker Forex global dengan berbagai jenis akun dan platform MT4/MT5.' },
};

export const translations: Record<Lang, Translations> = { vi, en, ko, th, id };

export const langNames: Record<Lang, string> = {
  vi: '🇻🇳 Tiếng Việt',
  en: '🇬🇧 English',
  ko: '🇰🇷 한국어',
  th: '🇹🇭 ภาษาไทย',
  id: '🇮🇩 Bahasa Indonesia',
};

// ─── PATCH: inject new fields into existing translations ──────────
// This extends the Translations interface with new sections
declare module './index' {}

export interface TranslationsExtra {
  heroCard: {
    title: string; liveActivity: string; verifiedUid: string;
    totalLabel: string; monthLabel: string; exchangesLabel: string;
    recentLabel: string; mockDataLabel: string; privacyNote: string;
    periodicUpdate: string;
  };
  time: {
    justNow: string; secondsAgo: string; minutesAgo: string;
    hoursAgo: string; daysAgo: string;
  };
  activity: {
    sectionBadge: string; sectionTitle: string; mockBadge: string;
    totalLabel: string; monthLabel: string; verifiedLabel: string;
    liveFeedTitle: string; privacyNote: string; disclaimer: string;
    disclaimerMock: string;
  };
  testimonials: {
    badge: string; title: string; subtitle: string; mockLabel: string;
    privacyNote: string; fullNote: string;
    badges: { verifiedUid: string; cashbackRecorded: string; privacyProtected: string; };
    exchange: string;
  };
}

export const extraTranslations: Record<Lang, TranslationsExtra> = {
  vi: {
    heroCard: {
      title: 'Hoạt động cashback', liveActivity: 'Live Activity', verifiedUid: '✓ Đã xác minh UID',
      totalLabel: 'Tổng cashback đã ghi nhận', monthLabel: 'Cashback tháng này',
      exchangesLabel: 'Sàn hỗ trợ', recentLabel: 'Hoàn phí gần đây',
      mockDataLabel: 'Dữ liệu minh họa', privacyNote: 'Thông tin tài khoản được ẩn để bảo vệ quyền riêng tư.',
      periodicUpdate: 'Cập nhật định kỳ',
    },
    time: { justNow:'vừa xong', secondsAgo:'{n} giây trước', minutesAgo:'{n} phút trước', hoursAgo:'{n} giờ trước', daysAgo:'{n} ngày trước' },
    activity: {
      sectionBadge:'Minh bạch & Thời gian thực', sectionTitle:'Hoạt động cashback gần đây',
      mockBadge:'Dữ liệu cashback được cập nhật định kỳ. Một số thông tin tài khoản đã được ẩn để bảo vệ quyền riêng tư.',
      totalLabel:'Tổng cashback đã ghi nhận', monthLabel:'Cashback trong tháng',
      verifiedLabel:'Tài khoản đã xác minh', liveFeedTitle:'Giao dịch cashback gần đây',
      privacyNote:'Thông tin tài khoản đã được ẩn để bảo vệ quyền riêng tư',
      disclaimer:'Dữ liệu hiển thị mang tính minh họa. Cashback thực tế phụ thuộc vào tài khoản đã xác minh và chính sách từng sàn.',
      disclaimerMock:'Số liệu được cập nhật định kỳ từ hệ thống đối soát. Cashback phụ thuộc vào chính sách từng sàn.',
    },
    testimonials: {
      badge:'Phản hồi', title:'Phản hồi từ người dùng đã xác minh',
      subtitle:'Các phản hồi bên dưới là ví dụ giao diện. Đánh giá thực tế sẽ được cập nhật sau khi hoàn tất các kỳ cashback đầu tiên.',
      mockLabel:'Đánh giá minh họa giao diện',
      privacyNote:'Email/UID được ẩn để bảo vệ quyền riêng tư người dùng.',
      fullNote:'Email/UID được ẩn một phần để bảo vệ quyền riêng tư. Một số phản hồi có thể là dữ liệu minh họa giao diện cho đến khi hệ thống cập nhật đánh giá xác minh thực tế.',
      badges:{ verifiedUid:'Đã xác minh UID', cashbackRecorded:'Cashback đã ghi nhận', privacyProtected:'Tài khoản được ẩn danh' },
      exchange:'Sàn sử dụng',
    },
  },
  en: {
    heroCard: {
      title:'Cashback Activity', liveActivity:'Live Activity', verifiedUid:'✓ UID Verified',
      totalLabel:'Total Cashback Recorded', monthLabel:'This Month Cashback',
      exchangesLabel:'Exchanges', recentLabel:'Recent Cashback',
      mockDataLabel:'Sample Data', privacyNote:'Account information is masked to protect privacy.',
      periodicUpdate:'Periodic Updates',
    },
    time: { justNow:'just now', secondsAgo:'{n}s ago', minutesAgo:'{n} min ago', hoursAgo:'{n}h ago', daysAgo:'{n}d ago' },
    activity: {
      sectionBadge:'Transparent & Real-Time', sectionTitle:'Recent Cashback Activity',
      mockBadge:'Cashback data is updated periodically. Some account details are masked to protect user privacy.',
      totalLabel:'Total Cashback Recorded', monthLabel:'Monthly Cashback',
      verifiedLabel:'Verified Accounts', liveFeedTitle:'Recent Cashback Transactions',
      privacyNote:'Account information is masked to protect privacy',
      disclaimer:'Data shown is for illustration. Actual cashback depends on verified accounts and each exchange\'s policy.',
      disclaimerMock:'Figures are updated periodically from reconciliation. Cashback depends on each exchange\'s policy.',
    },
    testimonials: {
      badge:'Feedback', title:'Verified User Reviews',
      subtitle:'Reviews below are interface examples. Real reviews will be updated after the first cashback cycles are completed.',
      mockLabel:'Interface sample review',
      privacyNote:'Emails/UIDs are partially masked for privacy.',
      fullNote:'Emails and UIDs are partially masked for privacy. Some feedback may be sample interface data until verified reviews are updated.',
      badges:{ verifiedUid:'Verified UID', cashbackRecorded:'Cashback Recorded', privacyProtected:'Privacy Protected' },
      exchange:'Exchange Used',
    },
  },
  ko: {
    heroCard: {
      title:'캐시백 활동', liveActivity:'실시간 활동', verifiedUid:'✓ UID 인증 완료',
      totalLabel:'총 캐시백 기록', monthLabel:'이번 달 캐시백',
      exchangesLabel:'지원 거래소', recentLabel:'최근 환급',
      mockDataLabel:'예시 데이터', privacyNote:'개인정보 보호를 위해 계정 정보가 마스킹됩니다.',
      periodicUpdate:'주기적 업데이트',
    },
    time: { justNow:'방금 전', secondsAgo:'{n}초 전', minutesAgo:'{n}분 전', hoursAgo:'{n}시간 전', daysAgo:'{n}일 전' },
    activity: {
      sectionBadge:'투명성 & 실시간', sectionTitle:'최근 캐시백 활동',
      mockBadge:'캐시백 데이터는 정기적으로 업데이트됩니다. 일부 계정 정보는 개인정보 보호를 위해 마스킹됩니다.',
      totalLabel:'총 캐시백 기록', monthLabel:'월간 캐시백',
      verifiedLabel:'인증된 계정', liveFeedTitle:'최근 캐시백 거래',
      privacyNote:'개인정보 보호를 위해 계정 정보가 마스킹됩니다',
      disclaimer:'표시된 데이터는 예시입니다. 실제 캐시백은 인증된 계정과 각 거래소의 정책에 따라 다릅니다.',
      disclaimerMock:'수치는 정산 시스템에서 주기적으로 업데이트됩니다.',
    },
    testimonials: {
      badge:'피드백', title:'인증된 사용자 리뷰',
      subtitle:'아래 리뷰는 인터페이스 예시입니다. 실제 리뷰는 첫 번째 캐시백 주기 완료 후 업데이트됩니다.',
      mockLabel:'인터페이스 예시 리뷰',
      privacyNote:'이메일/UID는 개인정보 보호를 위해 일부 마스킹됩니다.',
      fullNote:'개인정보 보호를 위해 이메일과 UID는 일부 마스킹됩니다. 일부 피드백은 실제 검증 리뷰가 업데이트되기 전까지 인터페이스 예시 데이터일 수 있습니다.',
      badges:{ verifiedUid:'UID 인증 완료', cashbackRecorded:'캐시백 기록됨', privacyProtected:'익명 처리됨' },
      exchange:'사용 거래소',
    },
  },
  th: {
    heroCard: {
      title:'กิจกรรมแคชแบ็ก', liveActivity:'กิจกรรมสด', verifiedUid:'✓ ยืนยัน UID แล้ว',
      totalLabel:'แคชแบ็กทั้งหมดที่บันทึก', monthLabel:'แคชแบ็กเดือนนี้',
      exchangesLabel:'ตลาดที่รองรับ', recentLabel:'แคชแบ็กล่าสุด',
      mockDataLabel:'ข้อมูลตัวอย่าง', privacyNote:'ข้อมูลบัญชีถูกปกปิดเพื่อปกป้องความเป็นส่วนตัว',
      periodicUpdate:'อัปเดตเป็นระยะ',
    },
    time: { justNow:'เมื่อกี้', secondsAgo:'{n} วิที่แล้ว', minutesAgo:'{n} นาทีที่แล้ว', hoursAgo:'{n} ชม.ที่แล้ว', daysAgo:'{n} วันที่แล้ว' },
    activity: {
      sectionBadge:'โปร่งใสและเรียลไทม์', sectionTitle:'กิจกรรมแคชแบ็กล่าสุด',
      mockBadge:'ข้อมูลแคชแบ็กอัปเดตเป็นระยะ ข้อมูลบัญชีบางส่วนถูกปิดบังเพื่อความเป็นส่วนตัว',
      totalLabel:'แคชแบ็กทั้งหมดที่บันทึก', monthLabel:'แคชแบ็กรายเดือน',
      verifiedLabel:'บัญชีที่ยืนยันแล้ว', liveFeedTitle:'ธุรกรรมแคชแบ็กล่าสุด',
      privacyNote:'ข้อมูลบัญชีถูกปกปิดเพื่อปกป้องความเป็นส่วนตัว',
      disclaimer:'ข้อมูลที่แสดงเป็นเพียงตัวอย่าง แคชแบ็กจริงขึ้นอยู่กับบัญชีที่ยืนยันและนโยบายของแต่ละตลาด',
      disclaimerMock:'ตัวเลขอัปเดตเป็นระยะจากระบบกระทบยอด',
    },
    testimonials: {
      badge:'ความคิดเห็น', title:'รีวิวจากผู้ใช้ที่ยืนยันแล้ว',
      subtitle:'รีวิวด้านล่างเป็นตัวอย่างอินเทอร์เฟซ รีวิวจริงจะอัปเดตหลังรอบแคชแบ็กแรกเสร็จสิ้น',
      mockLabel:'รีวิวตัวอย่างอินเทอร์เฟซ',
      privacyNote:'อีเมล/UID ถูกปกปิดบางส่วนเพื่อความเป็นส่วนตัว',
      fullNote:'อีเมลและ UID ถูกปกปิดบางส่วนเพื่อความเป็นส่วนตัว รีวิวบางส่วนอาจเป็นข้อมูลตัวอย่าง',
      badges:{ verifiedUid:'ยืนยัน UID แล้ว', cashbackRecorded:'บันทึกแคชแบ็กแล้ว', privacyProtected:'ปกป้องความเป็นส่วนตัว' },
      exchange:'ตลาดที่ใช้',
    },
  },
  id: {
    heroCard: {
      title:'Aktivitas Cashback', liveActivity:'Aktivitas Langsung', verifiedUid:'✓ UID Terverifikasi',
      totalLabel:'Total Cashback Tercatat', monthLabel:'Cashback Bulan Ini',
      exchangesLabel:'Exchange', recentLabel:'Cashback Terbaru',
      mockDataLabel:'Data Contoh', privacyNote:'Informasi akun disembunyikan untuk melindungi privasi.',
      periodicUpdate:'Pembaruan Berkala',
    },
    time: { justNow:'baru saja', secondsAgo:'{n} dtk lalu', minutesAgo:'{n} mnt lalu', hoursAgo:'{n} jam lalu', daysAgo:'{n} hari lalu' },
    activity: {
      sectionBadge:'Transparan & Real-Time', sectionTitle:'Aktivitas Cashback Terbaru',
      mockBadge:'Data cashback diperbarui secara berkala. Beberapa informasi akun disembunyikan untuk privasi.',
      totalLabel:'Total Cashback Tercatat', monthLabel:'Cashback Bulanan',
      verifiedLabel:'Akun Terverifikasi', liveFeedTitle:'Transaksi Cashback Terbaru',
      privacyNote:'Informasi akun disembunyikan untuk melindungi privasi',
      disclaimer:'Data yang ditampilkan bersifat ilustrasi. Cashback aktual tergantung pada akun terverifikasi dan kebijakan masing-masing exchange.',
      disclaimerMock:'Angka diperbarui secara berkala dari sistem rekonsiliasi.',
    },
    testimonials: {
      badge:'Ulasan', title:'Ulasan Pengguna Terverifikasi',
      subtitle:'Ulasan di bawah adalah contoh antarmuka. Ulasan nyata akan diperbarui setelah siklus cashback pertama selesai.',
      mockLabel:'Ulasan contoh antarmuka',
      privacyNote:'Email/UID disembunyikan sebagian untuk privasi.',
      fullNote:'Email dan UID disembunyikan sebagian untuk privasi. Beberapa ulasan mungkin merupakan data contoh antarmuka.',
      badges:{ verifiedUid:'UID Terverifikasi', cashbackRecorded:'Cashback Tercatat', privacyProtected:'Privasi Terlindungi' },
      exchange:'Exchange Digunakan',
    },
  },
};

// ── Safety section translations ────────────────────────────────────
export interface SafetyTranslations {
  badge: string; title: string; desc: string;
  canNeedTitle: string; neverAskTitle: string;
  canNeed: string[]; neverAsk: string[];
  warningTitle: string; warningText: string; warningLink: string;
}

export const safetyTranslations: Record<Lang, SafetyTranslations> = {
  vi: {
    badge: 'Bảo mật tài khoản',
    title: 'An toàn tài khoản là ưu tiên số 1',
    desc: 'DA CASH BACK hoạt động dựa trên chương trình đối tác chính thức. Chúng tôi không cần và không bao giờ yêu cầu quyền kiểm soát tài khoản của bạn.',
    canNeedTitle: 'DA CASH BACK có thể cần',
    neverAskTitle: 'DA CASH BACK KHÔNG BAO GIỜ yêu cầu',
    canNeed: ['UID tài khoản sàn giao dịch', 'Email hoặc Telegram để liên hệ hỗ trợ', 'Tên sàn bạn đã đăng ký', 'Xác nhận đã đăng ký qua link đối tác DA CASH BACK'],
    neverAsk: ['Mật khẩu tài khoản sàn', 'Mã OTP / 2FA xác thực', 'Seed phrase hoặc private key', 'API key có quyền rút tiền', 'Chuyển tiền vào ví hoặc tài khoản cá nhân', 'Nạp tiền để "mở khóa" hoặc "kích hoạt" cashback'],
    warningTitle: 'Cảnh báo mạo danh',
    warningText: 'Nếu có bất kỳ ai mạo danh DA CASH BACK yêu cầu mật khẩu, OTP, private key, seed phrase, API key rút tiền hoặc chuyển tiền riêng — hãy dừng lại ngay và liên hệ kênh hỗ trợ chính thức qua',
    warningLink: '',
  },
  en: {
    badge: 'Account Security',
    title: 'Account Safety Is Our #1 Priority',
    desc: 'DA CASH BACK operates through official partner programs. We do not need and will never request control over your trading account.',
    canNeedTitle: 'DA CASH BACK May Need',
    neverAskTitle: 'DA CASH BACK Will NEVER Ask For',
    canNeed: ['Your exchange account UID', 'Email or Telegram for support contact', 'Name of the exchange you registered with', 'Confirmation that you registered via DA CASH BACK partner link'],
    neverAsk: ['Your exchange account password', 'OTP / 2FA authentication code', 'Seed phrase or private key', 'API key with withdrawal permissions', 'Money transfers to any personal wallet or account', 'Deposits to "unlock" or "activate" cashback'],
    warningTitle: 'Impersonation Warning',
    warningText: 'If anyone impersonating DA CASH BACK requests your password, OTP, private key, seed phrase, withdrawal API key, or money transfer — stop immediately and contact our official support via',
    warningLink: '',
  },
  ko: {
    badge: '계정 보안',
    title: '계정 안전이 최우선입니다',
    desc: 'DA CASH BACK은 공식 파트너 프로그램을 통해 운영됩니다. 저희는 귀하의 거래 계정에 대한 통제권을 필요로 하지 않으며 절대 요청하지 않습니다.',
    canNeedTitle: 'DA CASH BACK이 필요할 수 있는 것',
    neverAskTitle: 'DA CASH BACK이 절대 요청하지 않는 것',
    canNeed: ['거래소 계정 UID', '지원 연락을 위한 이메일 또는 텔레그램', '등록한 거래소 이름', 'DA CASH BACK 파트너 링크를 통해 등록했음을 확인'],
    neverAsk: ['거래소 계정 비밀번호', 'OTP / 2FA 인증 코드', '시드 구문 또는 개인 키', '출금 권한이 있는 API 키', '개인 지갑 또는 계좌로의 송금', '캐시백을 "잠금 해제"하거나 "활성화"하기 위한 입금'],
    warningTitle: '사칭 경고',
    warningText: 'DA CASH BACK을 사칭하는 누군가가 비밀번호, OTP, 개인 키, 시드 구문, 출금 API 키 또는 송금을 요청한다면 즉시 중단하고 공식 지원 채널로 문의하세요',
    warningLink: '',
  },
  th: {
    badge: 'ความปลอดภัยของบัญชี',
    title: 'ความปลอดภัยของบัญชีคืออันดับ 1',
    desc: 'DA CASH BACK ดำเนินงานผ่านโปรแกรมพาร์ทเนอร์อย่างเป็นทางการ เราไม่ต้องการและจะไม่ขอสิทธิ์ควบคุมบัญชีการเทรดของคุณ',
    canNeedTitle: 'DA CASH BACK อาจต้องการ',
    neverAskTitle: 'DA CASH BACK จะไม่ขอสิ่งเหล่านี้',
    canNeed: ['UID บัญชีตลาดของคุณ', 'อีเมลหรือ Telegram สำหรับติดต่อสนับสนุน', 'ชื่อตลาดที่คุณสมัคร', 'การยืนยันว่าสมัครผ่านลิงก์พาร์ทเนอร์ DA CASH BACK'],
    neverAsk: ['รหัสผ่านบัญชีตลาด', 'รหัส OTP / 2FA', 'Seed phrase หรือ private key', 'API key ที่มีสิทธิ์ถอนเงิน', 'การโอนเงินไปยังกระเป๋าหรือบัญชีส่วนตัว', 'การฝากเงินเพื่อ "ปลดล็อก" หรือ "เปิดใช้งาน" แคชแบ็ก'],
    warningTitle: 'คำเตือนการแอบอ้าง',
    warningText: 'หากมีใครแอบอ้างเป็น DA CASH BACK และขอรหัสผ่าน, OTP, private key, seed phrase, API key ถอนเงิน หรือการโอนเงิน — หยุดทันทีและติดต่อช่องทางสนับสนุนอย่างเป็นทางการผ่าน',
    warningLink: '',
  },
  id: {
    badge: 'Keamanan Akun',
    title: 'Keamanan Akun Adalah Prioritas #1',
    desc: 'DA CASH BACK beroperasi melalui program partner resmi. Kami tidak memerlukan dan tidak akan pernah meminta kendali atas akun trading Anda.',
    canNeedTitle: 'DA CASH BACK Mungkin Membutuhkan',
    neverAskTitle: 'DA CASH BACK TIDAK PERNAH Meminta',
    canNeed: ['UID akun exchange Anda', 'Email atau Telegram untuk kontak dukungan', 'Nama exchange yang Anda daftarkan', 'Konfirmasi bahwa Anda mendaftar melalui link partner DA CASH BACK'],
    neverAsk: ['Kata sandi akun exchange', 'Kode OTP / 2FA', 'Seed phrase atau private key', 'API key dengan izin penarikan', 'Transfer uang ke dompet atau akun pribadi', 'Setoran untuk "membuka kunci" atau "mengaktifkan" cashback'],
    warningTitle: 'Peringatan Peniruan',
    warningText: 'Jika ada yang berpura-pura menjadi DA CASH BACK dan meminta kata sandi, OTP, private key, seed phrase, API key penarikan, atau transfer uang — segera hentikan dan hubungi dukungan resmi melalui',
    warningLink: '',
  },
};


export interface PrivilegesTranslations {
  badge: string; title: string; subtitle: string; ctaText: string;
  disclaimer: string;
  p1: { icon: string; title: string; sub: string; points: string[]; };
  p2: { icon: string; title: string; sub: string; points: string[]; };
  p3: { icon: string; title: string; sub: string; points: string[]; };
}

export const privilegesTranslations: Record<import('./index').Lang, PrivilegesTranslations> = {
  vi: {
    badge: 'Dành riêng cho thành viên DA Cashback',
    title: 'Đặc quyền khi cashback\ndưới DA CASH BACK',
    subtitle: 'Không chỉ là hoàn phí — bạn còn nhận được cả một hệ sinh thái hỗ trợ trader phát triển bền vững.',
    ctaText: 'Tham gia DA CASH BACK ngay',
    disclaimer: 'Kết quả giao dịch có thể thay đổi theo thị trường, không cam kết lợi nhuận.',
    p1: {
      icon: '📡',
      title: 'Nhóm Tín Hiệu Telegram',
      sub: 'Tín hiệu giao dịch mỗi ngày',
      points: [
        'Truy cập nhóm tín hiệu giao dịch riêng trên Telegram',
        'Signal cập nhật đều đặn hàng ngày',
        'Tỷ lệ thắng mục tiêu lên tới 80% theo thống kê nội bộ',
        'Phân tích thị trường từ chuyên gia crypto',
      ],
    },
    p2: {
      icon: '🎓',
      title: 'Đào Tạo KOL Crypto',
      sub: 'Được đào tạo để trở thành KOL',
      points: [
        'Hướng dẫn bởi chuyên gia có kinh nghiệm lâu năm',
        'Xây dựng thương hiệu cá nhân trong crypto',
        'Phát triển cộng đồng và affiliate crypto',
        'Tạo nội dung, tối ưu chuyển đổi hiệu quả',
      ],
    },
    p3: {
      icon: '🌐',
      title: 'Hệ Sinh Thái DA Network',
      sub: 'Kết nối với cộng đồng DA Network',
      points: [
        'Tiếp cận nhiều deal sàn và chương trình affiliate',
        'Kết nối với cộng đồng trader chuyên nghiệp',
        'Cơ hội hợp tác và phát triển trong thị trường crypto',
        'Thông tin và deal độc quyền từ DA Network',
      ],
    },
  },
  en: {
    badge: 'Exclusive for DA Cashback Members',
    title: 'Privileges for DA CASH BACK\nMembers',
    subtitle: 'More than just cashback — get access to an ecosystem designed to grow with you.',
    ctaText: 'Join DA CASH BACK Now',
    disclaimer: 'Trading results may vary with market conditions. No profit guarantee.',
    p1: {
      icon: '📡',
      title: 'Telegram Signal Group',
      sub: 'Daily trading signals',
      points: [
        'Access to exclusive Telegram trading signal group',
        'Signals updated daily by experienced analysts',
        'Target win rate up to 80% based on internal stats',
        'Market analysis from crypto experts',
      ],
    },
    p2: {
      icon: '🎓',
      title: 'Crypto KOL Training',
      sub: 'Become a crypto KOL',
      points: [
        'Mentored by veteran crypto and affiliate experts',
        'Build your personal brand in crypto',
        'Grow a community and master crypto affiliate',
        'Content creation and conversion optimization',
      ],
    },
    p3: {
      icon: '🌐',
      title: 'DA Network Ecosystem',
      sub: 'Connect with DA Network',
      points: [
        'Access to multiple exchange deals and affiliate programs',
        'Connect with professional crypto traders',
        'Collaboration opportunities in the crypto market',
        'Exclusive info and deals from DA Network',
      ],
    },
  },
  ko: {
    badge: 'DA Cashback 회원 전용',
    title: 'DA CASH BACK 회원\n특별 혜택',
    subtitle: '캐시백 그 이상 — 트레이더로 성장하기 위한 완전한 생태계를 제공합니다.',
    ctaText: '지금 DA CASH BACK 가입',
    disclaimer: '거래 결과는 시장 상황에 따라 다를 수 있으며 수익을 보장하지 않습니다.',
    p1: {
      icon: '📡',
      title: '텔레그램 시그널 그룹',
      sub: '매일 업데이트되는 트레이딩 시그널',
      points: [
        '독점 텔레그램 트레이딩 시그널 그룹 접근',
        '경험 많은 분석가의 일일 시그널 업데이트',
        '내부 통계 기준 목표 승률 최대 80%',
        '크립토 전문가의 시장 분석',
      ],
    },
    p2: {
      icon: '🎓',
      title: '크립토 KOL 교육',
      sub: 'KOL로 성장하는 교육',
      points: [
        '크립토 및 어필리에이트 베테랑 전문가 멘토링',
        '크립토 분야 개인 브랜드 구축',
        '커뮤니티 성장 및 크립토 어필리에이트',
        '콘텐츠 제작 및 전환 최적화',
      ],
    },
    p3: {
      icon: '🌐',
      title: 'DA Network 생태계',
      sub: 'DA Network 커뮤니티 연결',
      points: [
        '다양한 거래소 딜 및 어필리에이트 프로그램 접근',
        '전문 크립토 트레이더와 네트워킹',
        '크립토 시장에서의 협업 기회',
        'DA Network 독점 정보 및 딜',
      ],
    },
  },
  th: {
    badge: 'สิทธิพิเศษสำหรับสมาชิก DA Cashback',
    title: 'สิทธิพิเศษสำหรับ\nสมาชิก DA CASH BACK',
    subtitle: 'มากกว่าแค่แคชแบ็ก — รับระบบนิเวศที่ออกแบบมาเพื่อเติบโตไปกับคุณ',
    ctaText: 'เข้าร่วม DA CASH BACK เลย',
    disclaimer: 'ผลการเทรดอาจแตกต่างกันตามสภาวะตลาด ไม่รับประกันผลกำไร',
    p1: {
      icon: '📡',
      title: 'กลุ่ม Signal Telegram',
      sub: 'สัญญาณเทรดรายวัน',
      points: [
        'เข้าถึงกลุ่ม Signal เทรดใน Telegram แบบพิเศษ',
        'อัปเดต Signal ทุกวันจากนักวิเคราะห์มากประสบการณ์',
        'อัตราชนะเป้าหมายสูงสุด 80% ตามสถิติภายใน',
        'การวิเคราะห์ตลาดจากผู้เชี่ยวชาญ crypto',
      ],
    },
    p2: {
      icon: '🎓',
      title: 'อบรม KOL Crypto',
      sub: 'เรียนรู้การเป็น KOL',
      points: [
        'รับการสอนจากผู้เชี่ยวชาญ crypto และ affiliate',
        'สร้างแบรนด์ส่วนตัวในวงการ crypto',
        'พัฒนาชุมชนและ crypto affiliate',
        'สร้างคอนเทนต์และเพิ่มประสิทธิภาพการแปลง',
      ],
    },
    p3: {
      icon: '🌐',
      title: 'ระบบนิเวศ DA Network',
      sub: 'เชื่อมต่อกับ DA Network',
      points: [
        'เข้าถึงดีล exchange และโปรแกรม affiliate หลายรายการ',
        'เชื่อมต่อกับเทรดเดอร์มืออาชีพ',
        'โอกาสร่วมมือในตลาด crypto',
        'ข้อมูลและดีลพิเศษจาก DA Network',
      ],
    },
  },
  id: {
    badge: 'Eksklusif untuk Anggota DA Cashback',
    title: 'Keistimewaan Anggota\nDA CASH BACK',
    subtitle: 'Lebih dari sekadar cashback — dapatkan ekosistem lengkap untuk berkembang bersama kami.',
    ctaText: 'Bergabung DA CASH BACK Sekarang',
    disclaimer: 'Hasil trading dapat bervariasi sesuai kondisi pasar. Tidak ada jaminan keuntungan.',
    p1: {
      icon: '📡',
      title: 'Grup Sinyal Telegram',
      sub: 'Sinyal trading setiap hari',
      points: [
        'Akses ke grup sinyal trading eksklusif di Telegram',
        'Sinyal diperbarui setiap hari oleh analis berpengalaman',
        'Target win rate hingga 80% berdasarkan statistik internal',
        'Analisis pasar dari ahli crypto',
      ],
    },
    p2: {
      icon: '🎓',
      title: 'Pelatihan KOL Crypto',
      sub: 'Jadilah KOL crypto',
      points: [
        'Dibimbing oleh veteran crypto dan affiliate',
        'Bangun brand pribadi di dunia crypto',
        'Kembangkan komunitas dan kuasai affiliate crypto',
        'Pembuatan konten dan optimasi konversi',
      ],
    },
    p3: {
      icon: '🌐',
      title: 'Ekosistem DA Network',
      sub: 'Terhubung dengan DA Network',
      points: [
        'Akses ke banyak deal exchange dan program affiliate',
        'Terhubung dengan trader crypto profesional',
        'Peluang kolaborasi di pasar crypto',
        'Info dan deal eksklusif dari DA Network',
      ],
    },
  },
};
