# HFGC EXPO 2026 — Hospitality Ministry

A responsive, touch-first booth experience with an animated HFGC logo opening, five main sections, four pillars, all nine ministry teams, a team finder, expandable responsibilities, and session reset. It uses the approved repository logo and has no external font, image, or JavaScript dependencies.

## Open the experience

Serve this folder as a static website. For a local preview, run `python -m http.server 8000` and open `http://localhost:8000`. The layout adapts to landscape, portrait, tablet, and phone displays. Use the top-right full-screen control or the browser's kiosk mode on the installed touchscreen.

## Registration setup

The approved form URL was not supplied. Join Us currently directs visitors to speak with the Hospitality booth team. It does not collect personal information or display a sample QR code or a registration confirmation.

When the form is approved, edit `config.js`:

- Set `signupUrl` to the approved form URL.
- Add a locally hosted QR image that encodes that exact URL and set `signupQrImage` to its relative path. Test scanning on real phones at the installed display.
- Set `teamQueryParameter` only if the approved form supports a prefilled team parameter. Otherwise visitors are instructed to select the team in the form.

Registration uses the approved external form. The touchscreen cannot verify external form submission and therefore never displays a successful-registration confirmation.

## Kiosk behavior

The initial screen shows the animated logo until the visitor touches **Touch to Explore**. **Start Over** clears the selected team, filters, and navigation history and replays the opening. **Home** remains available across all screens. Team selection stays in memory only until a session reset or page reload.

After 90 seconds without interaction, **Still exploring?** offers Continue or Return to Home. After a further 15 seconds without a response, the session resets to the logo attract screen. The visiting thank-you screen returns home after 12 seconds. These durations can be changed in `config.js`.

## Display checks

Before the expo, check the actual screen orientation and resolution, viewing-distance readability, touch calibration, browser full-screen settings, and approved registration link/QR on real phones. Motion respects the device's reduced-motion preference. Ministry photographs can be incorporated when authentic approved assets are available.
