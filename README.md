# HFGC EXPO 2026 — Hospitality Ministry

A blue and gold, touch-first booth experience designed for a **1080 × 1920 portrait display**. The reference-style opening includes the animated HFGC logo and five large outlined navigation buttons. It includes four pillars, all nine ministry teams, a team finder, expandable responsibilities, and session reset. It uses the approved repository logo and has no external font, image, or JavaScript dependencies.

## Open the experience

Live site: https://dangerous83.github.io/HFGC-Interactive-Screen/

GitHub Pages publishes this repository’s `main` branch. Merging a pull request into `main` triggers the Pages build and deployment.

For a local preview, run `python -m http.server 8000` and open `http://localhost:8000`. The layout prioritizes 1080 × 1920 portrait screens and adapts to smaller screens. Use the top-right full-screen control or the browser's kiosk mode on the installed touchscreen. `portrait.css` contains the blue and gold design and portrait display rules.

## Registration setup

The approved form URL was not supplied. Join Us currently directs visitors to speak with the Hospitality booth team. It does not collect personal information or display a sample QR code or a registration confirmation.

When the form is approved, edit `config.js`:

- Set `signupUrl` to the approved form URL.
- Add a locally hosted QR image that encodes that exact URL and set `signupQrImage` to its relative path. Test scanning on real phones at the installed display.
- Set `teamQueryParameter` only if the approved form supports a prefilled team parameter. Otherwise visitors are instructed to select the team in the form.

Registration uses the approved external form. The touchscreen cannot verify external form submission and therefore never displays a successful-registration confirmation.

## Kiosk behavior

The initial screen shows the animated logo and direct navigation to **Our Heart**, **What We Do**, **VIP Hospitality**, **Our Teams**, and **Get Involved**. **Touch to Explore** opens the welcome menu. **Start Over** clears the selected team, filters, and navigation history and replays the opening. **Home** remains available across all screens. Team selection stays in memory only until a session reset or page reload.

After 90 seconds without interaction, **Still exploring?** offers Continue or Return to Home. After a further 15 seconds without a response, the session resets to the logo attract screen. The visiting thank-you screen returns home after 12 seconds. These durations can be changed in `config.js`.

## Display checks

Before the expo, check the actual screen orientation and resolution, viewing-distance readability, touch calibration, browser full-screen settings, and approved registration link/QR on real phones. Motion respects the device's reduced-motion preference. Ministry photographs can be incorporated when authentic approved assets are available.
