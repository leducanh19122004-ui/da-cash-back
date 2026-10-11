export type Lang = 'vi' | 'en' | 'ko' | 'th' | 'id';

/**
 * Localised strings that are still used after the V3 restructure: the
 * contact form and the legal-page link labels. All V3 page copy lives in
 * ./v3.ts (English for every language until translated).
 */
export interface Translations {
  contact: {
    nameLabel: string;
    namePlaceholder: string;
    contactLabel: string;
    contactPlaceholder: string;
    msgLabel: string;
    msgPlaceholder: string;
    submit: string;
    successTitle: string;
    successDesc: string;
    sendAnother: string;
  };
  footer: { legal: string; terms: string; privacy: string; risk: string };
}

// ─── VIETNAMESE ──────────────────────────────────────────────────
const vi: Translations = {
  contact: {
    nameLabel: 'Họ tên *',
    namePlaceholder: 'Nguyễn Văn A',
    contactLabel: 'Email / Telegram *',
    contactPlaceholder: 'email@example.com hoặc @username',
    msgLabel: 'Nội dung cần hỗ trợ *',
    msgPlaceholder: 'Mô tả vấn đề hoặc câu hỏi của bạn...',
    submit: 'Gửi yêu cầu hỗ trợ',
    successTitle: 'Gửi thành công!',
    successDesc: 'Chúng tôi sẽ phản hồi trong thời gian sớm nhất.',
    sendAnother: 'Gửi tin nhắn khác',
  },
  footer: { legal: 'Pháp lý', terms: 'Điều khoản dịch vụ', privacy: 'Chính sách bảo mật', risk: 'Cảnh báo rủi ro' },
};

// ─── ENGLISH ─────────────────────────────────────────────────────
const en: Translations = {
  contact: {
    nameLabel: 'Full Name *',
    namePlaceholder: 'John Doe',
    contactLabel: 'Email / Telegram *',
    contactPlaceholder: 'email@example.com or @username',
    msgLabel: 'Support Request *',
    msgPlaceholder: 'Describe your issue or question...',
    submit: 'Send Support Request',
    successTitle: 'Sent Successfully!',
    successDesc: 'We will respond as soon as possible.',
    sendAnother: 'Send Another Message',
  },
  footer: { legal: 'Legal', terms: 'Terms of Service', privacy: 'Privacy Policy', risk: 'Risk Disclaimer' },
};

// ─── KOREAN ──────────────────────────────────────────────────────
const ko: Translations = {
  contact: {
    nameLabel: '이름 *',
    namePlaceholder: '홍길동',
    contactLabel: '이메일 / 텔레그램 *',
    contactPlaceholder: 'email@example.com 또는 @username',
    msgLabel: '문의 내용 *',
    msgPlaceholder: '문제 또는 질문을 설명해 주세요...',
    submit: '문의 보내기',
    successTitle: '전송 완료!',
    successDesc: '가능한 빨리 답변 드리겠습니다.',
    sendAnother: '다른 메시지 보내기',
  },
  footer: { legal: '법적 고지', terms: '서비스 약관', privacy: '개인정보 처리방침', risk: '위험 고지' },
};

// ─── THAI ────────────────────────────────────────────────────────
const th: Translations = {
  contact: {
    nameLabel: 'ชื่อ-นามสกุล *',
    namePlaceholder: 'สมชาย ใจดี',
    contactLabel: 'อีเมล / Telegram *',
    contactPlaceholder: 'email@example.com หรือ @username',
    msgLabel: 'เรื่องที่ต้องการสนับสนุน *',
    msgPlaceholder: 'อธิบายปัญหาหรือคำถามของคุณ...',
    submit: 'ส่งคำขอสนับสนุน',
    successTitle: 'ส่งสำเร็จ!',
    successDesc: 'เราจะตอบกลับโดยเร็วที่สุด',
    sendAnother: 'ส่งข้อความอื่น',
  },
  footer: { legal: 'กฎหมาย', terms: 'ข้อกำหนดการให้บริการ', privacy: 'นโยบายความเป็นส่วนตัว', risk: 'การเปิดเผยความเสี่ยง' },
};

// ─── INDONESIAN ──────────────────────────────────────────────────
const id: Translations = {
  contact: {
    nameLabel: 'Nama Lengkap *',
    namePlaceholder: 'Budi Santoso',
    contactLabel: 'Email / Telegram *',
    contactPlaceholder: 'email@example.com atau @username',
    msgLabel: 'Permintaan Dukungan *',
    msgPlaceholder: 'Jelaskan masalah atau pertanyaan Anda...',
    submit: 'Kirim Permintaan',
    successTitle: 'Berhasil Terkirim!',
    successDesc: 'Kami akan merespons sesegera mungkin.',
    sendAnother: 'Kirim Pesan Lain',
  },
  footer: { legal: 'Hukum', terms: 'Syarat Layanan', privacy: 'Kebijakan Privasi', risk: 'Penafian Risiko' },
};

export const translations: Record<Lang, Translations> = { vi, en, ko, th, id };
