(() => {
  'use strict';
  const list = document.getElementById('record-list');
  const status = document.getElementById('organizer-status');
  const exportButton = document.getElementById('export-signups');
  let records = [];
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function refresh() {
    try {
      records = window.HFGC_SIGNUPS.list();
      exportButton.disabled = !records.length;
      status.textContent = records.length ? `${records.length} saved ${records.length===1?'interest form':'interest forms'} on this kiosk.` : 'No interest forms have been saved in this browser yet.';
      const fields = [['team','Preferred team'],['phone','Phone'],['email','Email'],['church','Church / location'],['reason','Why they’d like to join'],['availability','Availability']];
      list.innerHTML = [...records].reverse().map(r => `<article class="signup-record"><h2>${escape(r.name)}</h2><p class="record-time">${escape(new Date(r.createdAt).toLocaleString())}</p><dl>${fields.map(([key,label])=>`<dt>${label}</dt><dd>${escape(r[key] || '—')}</dd>`).join('')}</dl></article>`).join('');
    } catch {
      records = [];
      exportButton.disabled = true;
      list.replaceChildren();
      status.textContent = 'Saved records could not be read. Ask the kiosk organizer to check browser storage. Do not clear browser data.';
    }
  }
  exportButton.addEventListener('click', () => {
    refresh();
    if (!records.length) return;
    const blob = new Blob([window.HFGC_SIGNUPS.csv(records)], {type:'text/csv;charset=utf-8;'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `HFGC-Hospitality-Signups-${new Date().toISOString().slice(0,10)}.csv`;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    status.textContent = 'CSV download started. Check that the file was saved before closing this kiosk.';
  });
  document.getElementById('refresh-signups').addEventListener('click', refresh);
  window.addEventListener('storage', refresh);
  refresh();
})();
