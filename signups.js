/* Local kiosk records. No visitor details are sent to GitHub or a remote service. */
(() => {
  'use strict';
  const key = 'hfgc-hospitality-signups-v1';
  function list() {
    const raw = localStorage.getItem(key);
    if (raw === null) return [];
    const records = JSON.parse(raw);
    if (!Array.isArray(records) || records.some(r => !r || typeof r.id !== 'string' || typeof r.name !== 'string')) {
      throw new Error('The saved records could not be read.');
    }
    return records;
  }
  function save(details) {
    const records = list();
    const record = {...details, id:crypto.randomUUID(), createdAt:new Date().toISOString()};
    records.push(record);
    localStorage.setItem(key, JSON.stringify(records));
    if (!list().some(r => r.id === record.id)) throw new Error('The entry could not be verified.');
    return record;
  }
  function csv(records) {
    // Neutralize spreadsheet formulas while preserving commas, quotes and line breaks.
    const cell = value => {
      let text = String(value ?? '');
      if (/^[\s\uFEFF]*[=+@-]/.test(text) || /^[\t\r\n]/.test(text)) text = "'" + text;
      return '"' + text.replace(/"/g, '""') + '"';
    };
    const columns = ['createdAt','name','phone','email','church','district','team','reason','availability','id'];
    const labels = ['Saved at (UTC)','Full name','Phone','Email','Locale Church','District','Preferred team','Reason for joining (previous forms)','Availability (previous forms)','Reference'];
    return '\uFEFF' + [labels, ...records.map(r => columns.map(c => r[c]))].map(row => row.map(cell).join(',')).join('\r\n');
  }
  window.HFGC_SIGNUPS = Object.freeze({list, save, csv});
})();
