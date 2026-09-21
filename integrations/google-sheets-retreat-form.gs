/**
 * ZÉLL-V Wellness Retreat enquiry form → Google Sheets
 * ------------------------------------------------------------------
 * Receives the enquiry form on wellness-retreat.html, adds one row per enquiry
 * to a Google Sheet, and (optionally) emails a notification.
 *
 * ONE-TIME SETUP (about 5 minutes)
 * 1. Create a new Google Sheet (e.g. "ZÉLL-V Retreat Enquiries") with the Google
 *    account that should own the data.
 * 2. In the Sheet: Extensions → Apps Script. Delete the sample code and paste
 *    this whole file in. Click Save.
 * 3. Check the two settings below (NOTIFY_EMAIL, SHEET_NAME).
 * 4. Click Deploy → New deployment → gear icon → "Web app".
 *      Description:    Retreat form
 *      Execute as:     Me
 *      Who has access: Anyone
 *    Click Deploy, then Authorize access and allow the permissions
 *    (Google may show "unverified app": Advanced → Go to project → Allow).
 * 5. Copy the "Web app URL" (ends in /exec) and paste it into
 *    assets/js/retreat.js → FORM_ENDPOINT = '...';
 * 6. Upload the site, submit a test enquiry and check the new row appears.
 *
 * CHANGING THIS SCRIPT LATER
 * After editing, use Deploy → Manage deployments → pencil icon → Version: "New version"
 * → Deploy. This keeps the same URL, so the website does not need changing.
 */

// Where notification emails go. Set to '' to switch emails off.
const NOTIFY_EMAIL = 'enquiry@zell-v.com';

// The tab inside the Sheet that enquiries are written to (created automatically).
const SHEET_NAME = 'Enquiries';

// Columns: [form field name, column heading]
const COLUMNS = [
  ['submittedAt', 'Submitted'],
  ['firstName', 'First name'],
  ['lastName', 'Last name'],
  ['email', 'Email'],
  ['phone', 'Phone'],
  ['interests', 'Interested in'],
  ['message', 'Message'],
  ['page', 'Page'],
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const p = (e && e.parameter) || {};
    if (p.website) return reply({ result: 'success' }); // spam bot filled the hidden field
    if (!p.firstName || !p.email || !p.phone) return reply({ result: 'error', error: 'Missing required fields' });

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(COLUMNS.map((c) => c[1]));
      sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    const row = COLUMNS.map(([key]) => (key === 'submittedAt' ? new Date() : clean(p[key])));
    sheet.appendRow(row);

    if (NOTIFY_EMAIL) {
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        replyTo: clean(p.email),
        subject: `New Wellness Retreat enquiry: ${clean(p.firstName)} ${clean(p.lastName)}`,
        body: COLUMNS.map(([, label], i) => `${label}: ${row[i]}`).join('\n') +
          `\n\nAll enquiries: ${ss.getUrl()}`,
      });
    }
    return reply({ result: 'success' });
  } catch (err) {
    return reply({ result: 'error', error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Lets you open the Web app URL in a browser to check it is live.
function doGet() {
  return reply({ result: 'ok', message: 'ZÉLL-V retreat form endpoint is running.' });
}

// Trims long input and stops text starting with = + - @ being run as a spreadsheet formula
function clean(value) {
  const text = String(value || '').trim().slice(0, 3000);
  return /^[=+\-@]/.test(text) ? `'${text}` : text;
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
