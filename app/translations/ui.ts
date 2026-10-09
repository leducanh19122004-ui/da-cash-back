import type { Lang } from './index';

/**
 * Interface strings added with the DA Network redesign (labels, table
 * headers, accessibility text, honest data states). Existing marketing copy
 * stays in index.ts; nothing here restates or replaces it.
 */
export interface UiStrings {
  skip: string;
  openMenu: string;
  closeMenu: string;
  language: string;
  primaryNav: string;
  newTab: string;
  partOf: string;
  networkLink: string;
  hero: {
    eyebrow: string;
    summaryTitle: string;
    cryptoLabel: string;
    forexLabel: string;
    upTo: (rate: string) => string;
    partnerCount: (n: number) => string;
    summaryNote: string;
  };
  exchanges: {
    colExchange: string;
    colMarket: string;
    colRate: string;
    colStatus: string;
    colAction: string;
    available: string;
    count: (n: number) => string;
    filterLabel: string;
  };
  record: {
    eyebrow: string;
    title: string;
    lead: string;
    cadence: string;
    colMetric: string;
    colValue: string;
    colStatus: string;
    pendingValue: string;
    pendingStatus: string;
    liveStatus: string;
    supportedNote: string;
    sampleBadge: string;
    sampleNote: string;
    colTime: string;
    colExchange: string;
    colAccount: string;
    colAmount: string;
    loading: string;
    empty: string;
    error: string;
  };
  lookup: {
    uidShort: string;
    noticeTitle: string;
    noticeBody: string;
    statusManual: string;
    contactCta: string;
  };
  security: { mayLabel: string; neverLabel: string; supportVia: string };
  feedback: {
    title: string;
    prev: string;
    next: string;
    pause: string;
    play: string;
    position: (i: number, n: number) => string;
  };
  ecosystem: { eyebrow: string; title: string; body: string; visit: string; trackingLabel: string };
  contact: { sending: string; sendError: string; telegram: string; email: string; location: string };
  footer: { ecosystem: string; support: string; languages: string; network: string; crypto: string; tracking: string };
}

const vi: UiStrings = {
  skip: 'Chuyển đến nội dung chính',
  openMenu: 'Mở menu',
  closeMenu: 'Đóng menu',
  language: 'Ngôn ngữ',
  primaryNav: 'Điều hướng chính',
  newTab: 'mở trong thẻ mới',
  partOf: 'Một sản phẩm của DA Network',
  networkLink: 'DA Network',
  hero: {
    eyebrow: 'DA Network · Hoàn phí giao dịch',
    summaryTitle: 'Tóm tắt chương trình',
    cryptoLabel: 'Sàn Crypto',
    forexLabel: 'Broker Forex',
    upTo: (r) => `Lên đến ${r}`,
    partnerCount: (n) => `${n} đối tác`,
    summaryNote: 'Tỷ lệ theo danh sách đối tác hiện tại bên dưới.',
  },
  exchanges: {
    colExchange: 'Sàn giao dịch',
    colMarket: 'Thị trường',
    colRate: 'Tỷ lệ hoàn phí',
    colStatus: 'Trạng thái',
    colAction: 'Đăng ký',
    available: 'Đang mở',
    count: (n) => `${n} đối tác`,
    filterLabel: 'Lọc theo thị trường',
  },
  record: {
    eyebrow: 'Báo cáo cashback',
    title: 'Hồ sơ hoàn phí',
    lead: 'Số liệu tổng hợp chỉ được công bố sau khi đối soát với sàn đối tác. Không có số liệu ước tính hay mô phỏng.',
    cadence: 'Cập nhật định kỳ',
    colMetric: 'Chỉ số',
    colValue: 'Giá trị',
    colStatus: 'Trạng thái',
    pendingValue: 'Chờ công bố',
    pendingStatus: 'Công bố sau đối soát',
    liveStatus: 'Theo danh sách đối tác',
    supportedNote: 'Crypto & Forex',
    sampleBadge: 'Dữ liệu mẫu',
    sampleNote: 'Bảng dưới đây là ví dụ minh họa định dạng lịch sử cashback, không phải giao dịch thật của khách hàng.',
    colTime: 'Thời gian',
    colExchange: 'Sàn',
    colAccount: 'Tài khoản',
    colAmount: 'Số tiền',
    loading: 'Đang tải dữ liệu…',
    empty: 'Chưa có giao dịch nào được công bố.',
    error: 'Không thể tải dữ liệu lúc này. Vui lòng thử lại sau.',
  },
  lookup: {
    uidShort: 'UID phải có ít nhất 4 ký tự.',
    noticeTitle: 'Tra cứu được xử lý thủ công',
    noticeBody:
      'Tra cứu trực tuyến chưa được kết nối với dữ liệu đối soát. Thông tin của bạn chưa được gửi đi. Để kiểm tra trạng thái cashback, hãy gửi tên sàn và UID cho bộ phận hỗ trợ qua Telegram.',
    statusManual: 'Cần xác minh thủ công',
    contactCta: 'Nhắn hỗ trợ qua Telegram',
  },
  security: {
    mayLabel: 'Có thể cần',
    neverLabel: 'Không bao giờ yêu cầu',
    supportVia: 'Telegram @jacksondz',
  },
  feedback: {
    title: 'Phản hồi từ người dùng',
    prev: 'Phản hồi trước',
    next: 'Phản hồi tiếp theo',
    pause: 'Tạm dừng tự động chuyển',
    play: 'Bật tự động chuyển',
    position: (i, n) => `${i} / ${n}`,
  },
  ecosystem: {
    eyebrow: 'Hệ sinh thái DA Network',
    title: 'DA Cashback là một phần của DA Network',
    body: 'DA Network kết nối nội dung, công cụ giao dịch và dịch vụ hoàn phí trong một hệ sinh thái. Mỗi sản phẩm hoạt động độc lập.',
    visit: 'Truy cập DA Network',
    trackingLabel: 'Theo dõi công khai',
  },
  contact: {
    sending: 'Đang gửi…',
    sendError: 'Gửi thất bại. Vui lòng thử lại hoặc liên hệ qua Telegram.',
    telegram: 'Telegram',
    email: 'Email',
    location: 'Khu vực',
  },
  footer: {
    ecosystem: 'Hệ sinh thái',
    support: 'Hỗ trợ',
    languages: 'Ngôn ngữ',
    network: 'DA Network',
    crypto: 'DA Crypto',
    tracking: 'DA Signal Tracking',
  },
};

const en: UiStrings = {
  skip: 'Skip to main content',
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
  language: 'Language',
  primaryNav: 'Primary navigation',
  newTab: 'opens in a new tab',
  partOf: 'A DA Network product',
  networkLink: 'DA Network',
  hero: {
    eyebrow: 'DA Network · Trading fee rebates',
    summaryTitle: 'Programme summary',
    cryptoLabel: 'Crypto exchanges',
    forexLabel: 'Forex brokers',
    upTo: (r) => `Up to ${r}`,
    partnerCount: (n) => `${n} partners`,
    summaryNote: 'Rates follow the current partner list below.',
  },
  exchanges: {
    colExchange: 'Exchange',
    colMarket: 'Market',
    colRate: 'Cashback rate',
    colStatus: 'Status',
    colAction: 'Register',
    available: 'Available',
    count: (n) => `${n} partners`,
    filterLabel: 'Filter by market',
  },
  record: {
    eyebrow: 'Cashback reporting',
    title: 'Cashback record',
    lead: 'Aggregate figures are published only after reconciliation with partner exchanges. Nothing here is estimated or simulated.',
    cadence: 'Updated periodically',
    colMetric: 'Metric',
    colValue: 'Value',
    colStatus: 'Status',
    pendingValue: 'Pending',
    pendingStatus: 'Published after reconciliation',
    liveStatus: 'From the partner list',
    supportedNote: 'Crypto & Forex',
    sampleBadge: 'Sample data',
    sampleNote: 'The table below illustrates the cashback history format. It is not a record of real customer transactions.',
    colTime: 'Time',
    colExchange: 'Exchange',
    colAccount: 'Account',
    colAmount: 'Amount',
    loading: 'Loading records…',
    empty: 'No transactions have been published yet.',
    error: 'Records could not be loaded right now. Please try again later.',
  },
  lookup: {
    uidShort: 'UID must be at least 4 characters.',
    noticeTitle: 'Lookups are handled manually',
    noticeBody:
      'Online lookup is not yet connected to reconciliation data, and your details have not been sent anywhere. To check your cashback status, send your exchange and UID to support on Telegram.',
    statusManual: 'Manual verification required',
    contactCta: 'Message support on Telegram',
  },
  security: {
    mayLabel: 'May require',
    neverLabel: 'Never requires',
    supportVia: 'Telegram @jacksondz',
  },
  feedback: {
    title: 'What traders say',
    prev: 'Previous feedback',
    next: 'Next feedback',
    pause: 'Pause auto-advance',
    play: 'Resume auto-advance',
    position: (i, n) => `${i} / ${n}`,
  },
  ecosystem: {
    eyebrow: 'DA Network ecosystem',
    title: 'DA Cashback is part of DA Network',
    body: 'DA Network brings content, trading tools and fee rebates together in one ecosystem. Each product operates independently.',
    visit: 'Visit DA Network',
    trackingLabel: 'Public tracking',
  },
  contact: {
    sending: 'Sending…',
    sendError: 'Sending failed. Please try again or contact us on Telegram.',
    telegram: 'Telegram',
    email: 'Email',
    location: 'Location',
  },
  footer: {
    ecosystem: 'Ecosystem',
    support: 'Support',
    languages: 'Languages',
    network: 'DA Network',
    crypto: 'DA Crypto',
    tracking: 'DA Signal Tracking',
  },
};

const ko: UiStrings = {
  skip: '본문으로 건너뛰기',
  openMenu: '메뉴 열기',
  closeMenu: '메뉴 닫기',
  language: '언어',
  primaryNav: '주요 메뉴',
  newTab: '새 탭에서 열림',
  partOf: 'DA Network의 서비스',
  networkLink: 'DA Network',
  hero: {
    eyebrow: 'DA Network · 거래 수수료 리베이트',
    summaryTitle: '프로그램 요약',
    cryptoLabel: '암호화폐 거래소',
    forexLabel: '외환 브로커',
    upTo: (r) => `최대 ${r}`,
    partnerCount: (n) => `파트너 ${n}곳`,
    summaryNote: '요율은 아래 현재 파트너 목록을 따릅니다.',
  },
  exchanges: {
    colExchange: '거래소',
    colMarket: '시장',
    colRate: '캐시백 비율',
    colStatus: '상태',
    colAction: '가입',
    available: '이용 가능',
    count: (n) => `파트너 ${n}곳`,
    filterLabel: '시장별 필터',
  },
  record: {
    eyebrow: '캐시백 보고',
    title: '캐시백 기록',
    lead: '합계 수치는 파트너 거래소와의 정산 후에만 공개됩니다. 추정치나 시뮬레이션 수치는 없습니다.',
    cadence: '정기 업데이트',
    colMetric: '항목',
    colValue: '값',
    colStatus: '상태',
    pendingValue: '공개 대기',
    pendingStatus: '정산 후 공개',
    liveStatus: '파트너 목록 기준',
    supportedNote: '암호화폐 및 외환',
    sampleBadge: '샘플 데이터',
    sampleNote: '아래 표는 캐시백 내역 형식을 보여주는 예시이며, 실제 고객 거래 기록이 아닙니다.',
    colTime: '시간',
    colExchange: '거래소',
    colAccount: '계정',
    colAmount: '금액',
    loading: '기록을 불러오는 중…',
    empty: '아직 공개된 거래가 없습니다.',
    error: '지금은 기록을 불러올 수 없습니다. 잠시 후 다시 시도해 주세요.',
  },
  lookup: {
    uidShort: 'UID는 4자 이상이어야 합니다.',
    noticeTitle: '조회는 수동으로 처리됩니다',
    noticeBody:
      '온라인 조회는 아직 정산 데이터와 연결되어 있지 않으며, 입력하신 정보는 어디에도 전송되지 않았습니다. 캐시백 상태를 확인하려면 거래소 이름과 UID를 텔레그램 고객지원으로 보내주세요.',
    statusManual: '수동 확인 필요',
    contactCta: '텔레그램으로 문의하기',
  },
  security: {
    mayLabel: '요청할 수 있는 정보',
    neverLabel: '절대 요청하지 않는 정보',
    supportVia: 'Telegram @jacksondz',
  },
  feedback: {
    title: '사용자 후기',
    prev: '이전 후기',
    next: '다음 후기',
    pause: '자동 넘김 일시정지',
    play: '자동 넘김 재개',
    position: (i, n) => `${i} / ${n}`,
  },
  ecosystem: {
    eyebrow: 'DA Network 생태계',
    title: 'DA Cashback은 DA Network의 일부입니다',
    body: 'DA Network는 콘텐츠, 트레이딩 도구, 수수료 리베이트를 하나의 생태계로 연결합니다. 각 서비스는 독립적으로 운영됩니다.',
    visit: 'DA Network 방문하기',
    trackingLabel: '공개 추적',
  },
  contact: {
    sending: '전송 중…',
    sendError: '전송에 실패했습니다. 다시 시도하시거나 텔레그램으로 문의해 주세요.',
    telegram: 'Telegram',
    email: '이메일',
    location: '지역',
  },
  footer: {
    ecosystem: '생태계',
    support: '고객지원',
    languages: '언어',
    network: 'DA Network',
    crypto: 'DA Crypto',
    tracking: 'DA Signal Tracking',
  },
};

const th: UiStrings = {
  skip: 'ข้ามไปยังเนื้อหาหลัก',
  openMenu: 'เปิดเมนู',
  closeMenu: 'ปิดเมนู',
  language: 'ภาษา',
  primaryNav: 'เมนูหลัก',
  newTab: 'เปิดในแท็บใหม่',
  partOf: 'ผลิตภัณฑ์ของ DA Network',
  networkLink: 'DA Network',
  hero: {
    eyebrow: 'DA Network · คืนค่าธรรมเนียมการเทรด',
    summaryTitle: 'สรุปโปรแกรม',
    cryptoLabel: 'กระดานเทรดคริปโต',
    forexLabel: 'โบรกเกอร์ Forex',
    upTo: (r) => `สูงสุด ${r}`,
    partnerCount: (n) => `${n} พันธมิตร`,
    summaryNote: 'อัตราเป็นไปตามรายชื่อพันธมิตรปัจจุบันด้านล่าง',
  },
  exchanges: {
    colExchange: 'กระดานเทรด',
    colMarket: 'ตลาด',
    colRate: 'อัตราเงินคืน',
    colStatus: 'สถานะ',
    colAction: 'สมัคร',
    available: 'เปิดให้บริการ',
    count: (n) => `${n} พันธมิตร`,
    filterLabel: 'กรองตามตลาด',
  },
  record: {
    eyebrow: 'รายงานเงินคืน',
    title: 'บันทึกเงินคืน',
    lead: 'ตัวเลขรวมจะเผยแพร่หลังจากกระทบยอดกับกระดานเทรดพันธมิตรแล้วเท่านั้น ไม่มีตัวเลขประมาณการหรือจำลอง',
    cadence: 'อัปเดตเป็นระยะ',
    colMetric: 'รายการ',
    colValue: 'มูลค่า',
    colStatus: 'สถานะ',
    pendingValue: 'รอเผยแพร่',
    pendingStatus: 'เผยแพร่หลังกระทบยอด',
    liveStatus: 'ตามรายชื่อพันธมิตร',
    supportedNote: 'คริปโตและ Forex',
    sampleBadge: 'ข้อมูลตัวอย่าง',
    sampleNote: 'ตารางด้านล่างเป็นตัวอย่างรูปแบบประวัติเงินคืน ไม่ใช่ธุรกรรมจริงของลูกค้า',
    colTime: 'เวลา',
    colExchange: 'กระดานเทรด',
    colAccount: 'บัญชี',
    colAmount: 'จำนวน',
    loading: 'กำลังโหลดข้อมูล…',
    empty: 'ยังไม่มีธุรกรรมที่เผยแพร่',
    error: 'ไม่สามารถโหลดข้อมูลได้ในขณะนี้ กรุณาลองใหม่ภายหลัง',
  },
  lookup: {
    uidShort: 'UID ต้องมีอย่างน้อย 4 ตัวอักษร',
    noticeTitle: 'การตรวจสอบดำเนินการโดยเจ้าหน้าที่',
    noticeBody:
      'ระบบตรวจสอบออนไลน์ยังไม่ได้เชื่อมต่อกับข้อมูลกระทบยอด และข้อมูลของคุณยังไม่ถูกส่งไปที่ใด หากต้องการตรวจสอบสถานะเงินคืน กรุณาส่งชื่อกระดานเทรดและ UID ให้ฝ่ายสนับสนุนทาง Telegram',
    statusManual: 'ต้องตรวจสอบโดยเจ้าหน้าที่',
    contactCta: 'ติดต่อฝ่ายสนับสนุนทาง Telegram',
  },
  security: {
    mayLabel: 'อาจขอข้อมูล',
    neverLabel: 'ไม่ขอเด็ดขาด',
    supportVia: 'Telegram @jacksondz',
  },
  feedback: {
    title: 'ความคิดเห็นจากผู้ใช้',
    prev: 'ความคิดเห็นก่อนหน้า',
    next: 'ความคิดเห็นถัดไป',
    pause: 'หยุดเลื่อนอัตโนมัติ',
    play: 'เลื่อนอัตโนมัติต่อ',
    position: (i, n) => `${i} / ${n}`,
  },
  ecosystem: {
    eyebrow: 'ระบบนิเวศ DA Network',
    title: 'DA Cashback เป็นส่วนหนึ่งของ DA Network',
    body: 'DA Network รวมเนื้อหา เครื่องมือการเทรด และบริการคืนค่าธรรมเนียมไว้ในระบบนิเวศเดียว แต่ละผลิตภัณฑ์ดำเนินงานอย่างอิสระ',
    visit: 'ไปที่ DA Network',
    trackingLabel: 'การติดตามสาธารณะ',
  },
  contact: {
    sending: 'กำลังส่ง…',
    sendError: 'ส่งไม่สำเร็จ กรุณาลองใหม่หรือติดต่อทาง Telegram',
    telegram: 'Telegram',
    email: 'อีเมล',
    location: 'พื้นที่',
  },
  footer: {
    ecosystem: 'ระบบนิเวศ',
    support: 'ฝ่ายสนับสนุน',
    languages: 'ภาษา',
    network: 'DA Network',
    crypto: 'DA Crypto',
    tracking: 'DA Signal Tracking',
  },
};

const id: UiStrings = {
  skip: 'Lewati ke konten utama',
  openMenu: 'Buka menu',
  closeMenu: 'Tutup menu',
  language: 'Bahasa',
  primaryNav: 'Navigasi utama',
  newTab: 'terbuka di tab baru',
  partOf: 'Produk DA Network',
  networkLink: 'DA Network',
  hero: {
    eyebrow: 'DA Network · Rebate biaya trading',
    summaryTitle: 'Ringkasan program',
    cryptoLabel: 'Bursa kripto',
    forexLabel: 'Broker Forex',
    upTo: (r) => `Hingga ${r}`,
    partnerCount: (n) => `${n} mitra`,
    summaryNote: 'Tarif mengikuti daftar mitra saat ini di bawah.',
  },
  exchanges: {
    colExchange: 'Bursa',
    colMarket: 'Pasar',
    colRate: 'Tarif cashback',
    colStatus: 'Status',
    colAction: 'Daftar',
    available: 'Tersedia',
    count: (n) => `${n} mitra`,
    filterLabel: 'Filter berdasarkan pasar',
  },
  record: {
    eyebrow: 'Laporan cashback',
    title: 'Catatan cashback',
    lead: 'Angka agregat hanya dipublikasikan setelah rekonsiliasi dengan bursa mitra. Tidak ada angka perkiraan atau simulasi.',
    cadence: 'Diperbarui berkala',
    colMetric: 'Metrik',
    colValue: 'Nilai',
    colStatus: 'Status',
    pendingValue: 'Menunggu',
    pendingStatus: 'Dipublikasikan setelah rekonsiliasi',
    liveStatus: 'Dari daftar mitra',
    supportedNote: 'Kripto & Forex',
    sampleBadge: 'Data contoh',
    sampleNote: 'Tabel di bawah menggambarkan format riwayat cashback. Ini bukan catatan transaksi nyata pelanggan.',
    colTime: 'Waktu',
    colExchange: 'Bursa',
    colAccount: 'Akun',
    colAmount: 'Jumlah',
    loading: 'Memuat data…',
    empty: 'Belum ada transaksi yang dipublikasikan.',
    error: 'Data tidak dapat dimuat saat ini. Silakan coba lagi nanti.',
  },
  lookup: {
    uidShort: 'UID minimal 4 karakter.',
    noticeTitle: 'Pengecekan diproses secara manual',
    noticeBody:
      'Pengecekan online belum terhubung ke data rekonsiliasi, dan data Anda belum dikirim ke mana pun. Untuk mengecek status cashback, kirim nama bursa dan UID Anda ke tim dukungan melalui Telegram.',
    statusManual: 'Perlu verifikasi manual',
    contactCta: 'Hubungi dukungan via Telegram',
  },
  security: {
    mayLabel: 'Mungkin diperlukan',
    neverLabel: 'Tidak pernah diminta',
    supportVia: 'Telegram @jacksondz',
  },
  feedback: {
    title: 'Kata para trader',
    prev: 'Ulasan sebelumnya',
    next: 'Ulasan berikutnya',
    pause: 'Jeda geser otomatis',
    play: 'Lanjutkan geser otomatis',
    position: (i, n) => `${i} / ${n}`,
  },
  ecosystem: {
    eyebrow: 'Ekosistem DA Network',
    title: 'DA Cashback adalah bagian dari DA Network',
    body: 'DA Network menyatukan konten, alat trading, dan rebate biaya dalam satu ekosistem. Setiap produk beroperasi secara independen.',
    visit: 'Kunjungi DA Network',
    trackingLabel: 'Pelacakan publik',
  },
  contact: {
    sending: 'Mengirim…',
    sendError: 'Gagal mengirim. Silakan coba lagi atau hubungi kami via Telegram.',
    telegram: 'Telegram',
    email: 'Email',
    location: 'Lokasi',
  },
  footer: {
    ecosystem: 'Ekosistem',
    support: 'Dukungan',
    languages: 'Bahasa',
    network: 'DA Network',
    crypto: 'DA Crypto',
    tracking: 'DA Signal Tracking',
  },
};

export const uiStrings: Record<Lang, UiStrings> = { vi, en, ko, th, id };

/** Language labels without flag emoji, matching the hub's switcher. */
export const langLabels: Record<Lang, { short: string; native: string }> = {
  vi: { short: 'VI', native: 'Tiếng Việt' },
  en: { short: 'EN', native: 'English' },
  ko: { short: 'KO', native: '한국어' },
  th: { short: 'TH', native: 'ไทย' },
  id: { short: 'ID', native: 'Bahasa Indonesia' },
};
