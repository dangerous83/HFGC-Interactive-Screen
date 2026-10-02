// Join Us includes a form that saves interest records on this kiosk browser.
// Optionally add an online form URL for visitors who prefer to use their phone.
window.HFGC_CONFIG = Object.freeze({
  signupUrl: '',
  // Optional approved QR image, kept in this repository. The QR must encode signupUrl.
  signupQrImage: '',
  // Set only if the approved form accepts a team query parameter.
  teamQueryParameter: '',
  idleSeconds: 90,
  idleWarningSeconds: 15,
  thankYouSeconds: 20
});

