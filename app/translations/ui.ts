import type { Lang } from './index';

/** Interface strings (labels, accessibility text) for every language. */
export interface UiStrings {
  skip: string;
  openMenu: string;
  closeMenu: string;
  language: string;
  primaryNav: string;
  newTab: string;
  partOf: string;
  networkLink: string;
  contact: { sending: string; sendError: string };
  footer: { support: string; languages: string };
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
  contact: { sending: 'Đang gửi…', sendError: 'Gửi thất bại. Vui lòng thử lại hoặc liên hệ qua Telegram.' },
  footer: { support: 'Hỗ trợ', languages: 'Ngôn ngữ' },
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
  contact: { sending: 'Sending…', sendError: 'Sending failed. Please try again or contact us on Telegram.' },
  footer: { support: 'Support', languages: 'Languages' },
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
  contact: { sending: '전송 중…', sendError: '전송에 실패했습니다. 다시 시도하시거나 텔레그램으로 문의해 주세요.' },
  footer: { support: '고객지원', languages: '언어' },
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
  contact: { sending: 'กำลังส่ง…', sendError: 'ส่งไม่สำเร็จ กรุณาลองใหม่หรือติดต่อทาง Telegram' },
  footer: { support: 'ฝ่ายสนับสนุน', languages: 'ภาษา' },
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
  contact: { sending: 'Mengirim…', sendError: 'Gagal mengirim. Silakan coba lagi atau hubungi kami via Telegram.' },
  footer: { support: 'Dukungan', languages: 'Bahasa' },
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
