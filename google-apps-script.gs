/**
 * DA CASH BACK — Google Apps Script
 * Sheet: https://docs.google.com/spreadsheets/d/1KnRuV3ZJll5w70ae2J7iQD8utvXAxebfkfkHtyKzBYY
 *
 * ═══ HƯỚNG DẪN CÀI ĐẶT (chỉ làm 1 lần) ═══
 *
 * 1. Mở link Sheet trên
 * 2. Vào menu: Extensions > Apps Script
 * 3. Xóa hết code cũ, paste toàn bộ file này vào
 * 4. Ctrl+S để lưu
 * 5. Click Deploy > New deployment
 *      - Type            : Web app
 *      - Execute as      : Me
 *      - Who has access  : Anyone
 * 6. Click Deploy → Allow permissions
 * 7. Copy URL dạng: https://script.google.com/macros/s/XXXX/exec
 * 8. Paste vào file .env.local:
 *      NEXT_PUBLIC_CONTACT_WEBHOOK_URL=https://script.google.com/macros/s/XXXX/exec
 * 9. Restart dev server (npm run dev)
 */

var SHEET_ID = '1KnRuV3ZJll5w70ae2J7iQD8utvXAxebfkfkHtyKzBYY';
var SHEET_NAME = 'Liên hệ'; // Tên tab trong Sheet

function doPost(e) {
  try {
    var ss    = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME);

    // Tạo tab mới nếu chưa có
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }

    // Tạo header nếu sheet trống
    if (sheet.getLastRow() === 0) {
      var headers = ['Thời gian', 'Họ tên', 'Email / Telegram', 'Nội dung', 'Ngôn ngữ'];
      sheet.appendRow(headers);
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold')
                 .setBackground('#D4AF37')
                 .setFontColor('#050505')
                 .setHorizontalAlignment('center');
      sheet.setFrozenRows(1);
      sheet.setColumnWidth(1, 160); // Thời gian
      sheet.setColumnWidth(2, 180); // Họ tên
      sheet.setColumnWidth(3, 220); // Email/Telegram
      sheet.setColumnWidth(4, 400); // Nội dung
      sheet.setColumnWidth(5, 80);  // Ngôn ngữ
    }

    var data      = JSON.parse(e.postData.contents);
    var timestamp = Utilities.formatDate(new Date(), 'Asia/Ho_Chi_Minh', 'dd/MM/yyyy HH:mm:ss');
    var row       = sheet.getLastRow() + 1;

    sheet.appendRow([
      timestamp,
      data.name    || '',
      data.contact || '',
      data.message || '',
      data.lang    || 'vi',
    ]);

    // Zebra stripe — dòng chẵn màu xám nhạt
    if (row % 2 === 0) {
      sheet.getRange(row, 1, 1, 5).setBackground('#1a1a1a');
    }

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, row: row }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ─── Chạy hàm này trong editor để test trước khi deploy ──────────
function testDoPost() {
  var fakeEvent = {
    postData: {
      contents: JSON.stringify({
        name:    'Nguyễn Văn A',
        contact: '@testuser',
        message: 'Test message từ DA CASH BACK website',
        lang:    'vi',
      })
    }
  };
  var result = doPost(fakeEvent);
  Logger.log(result.getContent());
}
