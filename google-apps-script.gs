/**
 * DA CASH BACK — Google Apps Script
 * Hướng dẫn cài đặt:
 * 1. Mở Google Sheet của bạn
 * 2. Vào Extensions > Apps Script
 * 3. Xóa code mặc định, paste toàn bộ code này vào
 * 4. Nhấn Save (Ctrl+S)
 * 5. Nhấn Deploy > New deployment
 *    - Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Nhấn Deploy, copy URL vào .env.local
 *    NEXT_PUBLIC_CONTACT_WEBHOOK_URL=https://script.google.com/macros/s/...../exec
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Tạo header nếu sheet còn trống
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Thời gian', 'Họ tên', 'Email / Telegram', 'Nội dung', 'Ngôn ngữ', 'IP']);
      sheet.getRange(1, 1, 1, 6).setFontWeight('bold').setBackground('#D4AF37').setFontColor('#050505');
      sheet.setFrozenRows(1);
    }

    var timestamp = Utilities.formatDate(new Date(), 'Asia/Ho_Chi_Minh', 'dd/MM/yyyy HH:mm:ss');

    sheet.appendRow([
      timestamp,
      data.name    || '',
      data.contact || '',
      data.message || '',
      data.lang    || 'vi',
      data.ip      || '',
    ]);

    // Auto-resize columns
    sheet.autoResizeColumns(1, 6);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function — chạy thử trong Apps Script editor
function testDoPost() {
  var fakeEvent = {
    postData: {
      contents: JSON.stringify({
        name: 'Nguyễn Văn A',
        contact: '@testuser',
        message: 'Test message từ DA CASH BACK',
        lang: 'vi',
      })
    }
  };
  var result = doPost(fakeEvent);
  Logger.log(result.getContent());
}
