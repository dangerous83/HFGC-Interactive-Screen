# HFGC EXPO 2026 — Hospitality Ministry

A blue and gold, touch-first booth experience designed for a **1080 × 1920 portrait display**. The reference-style opening includes the animated HFGC logo and five large outlined navigation buttons. It includes four pillars, all nine ministry teams, a team finder, expandable responsibilities, and session reset. It uses the approved repository logo and has no external font, image, or JavaScript dependencies.

## Open the experience

Live site: https://dangerous83.github.io/HFGC-Interactive-Screen/

GitHub Pages publishes this repository’s `main` branch. Merging a pull request into `main` triggers the Pages build and deployment.

For a local preview, run `python -m http.server 8000` and open `http://localhost:8000`. The layout prioritizes 1080 × 1920 portrait screens and adapts to smaller screens. Use the top-right full-screen control or the browser's kiosk mode on the installed touchscreen. `portrait.css` contains the blue and gold design and portrait display rules.

## Registration setup

**Join Us opens a working interest form.** Visitors provide their full name, a phone number or email, a preferred team (including “I’m not sure”), and their reason for joining. Church/location and availability are optional. Choosing “I’m Interested” on a team page prefills that team. The form keeps its draft while the visitor explores, and clears it on Home, Start Over, inactivity reset, or successful submission.

Entries are saved in **localStorage in the kiosk’s browser**, not a server or GitHub. A confirmation appears only after saving and verifying the record. If storage fails, the form stays open and displays an error; it never reports a successful submission. Private browsing, clearing browser data, or changing browser profiles can remove or hide the records. Use the normal kiosk browser profile and export records regularly.

Open **[organizer.html](https://dangerous83.github.io/HFGC-Interactive-Screen/organizer.html)** on the same kiosk, in the same browser/profile, to review names, contact details, preferred teams, reasons for joining, and availability. Download Sign-Ups (CSV) exports the records for follow-up. The organizer page is separate from the visitor navigation; it has no account authentication and displays only that browser’s local records. Control access to the kiosk itself. No personal details are embedded in the repository.

For an optional online form, edit `config.js`:

- Set `signupUrl` to the approved form URL.
- Add a locally hosted QR image that encodes that exact URL and set `signupQrImage` to its relative path. Test scanning on real phones at the installed display.
- Set `teamQueryParameter` only if the approved form supports a prefilled team parameter. Otherwise visitors are instructed to select the team in the form.

The optional online form appears as a second sign-up choice. Its entries are managed by that external service and do not appear in the kiosk’s local list. The touchscreen does not claim to verify external submissions. For shared collection across devices, connect an approved online form or backend; GitHub Pages does not provide a registration database.

## Kiosk behavior

The initial screen shows the logo with a soft looping gold glow and direct navigation to **Our Heart**, **What We Do**, **VIP Hospitality**, **Our Teams**, and **Get Involved**. The logo has no moving light sweep or scale animation. **Touch to Explore** opens the welcome menu. **Home**, the header logo, and **Start Over** clear the selected team, filters, and navigation history and return to the opening screen. Finishing a visit and an inactivity reset also return to that screen. Team selection stays in memory only until a session reset or page reload. Motion is disabled when the device requests reduced motion.

After 90 seconds without interaction, **Still exploring?** offers Continue or Return to Home. Typing, selecting fields, and scrolling count as activity. After a further 15 seconds without a response, the session resets to the logo attract screen. The confirmation screen appears after a saved submission and returns home after 20 seconds. These durations can be changed in `config.js`.

## Display checks

The Greeters detail screen uses the approved `Greeters.png` as its background, with dark blue panels for readable content. Other screens keep the standard blue background. The browser favicon and Apple touch icon use the uploaded `pmcc_logo_icon.png`.

Before the expo, check the actual screen orientation and resolution, viewing-distance readability, touch calibration, browser full-screen settings, and approved registration link/QR on real phones. Motion respects the device's reduced-motion preference. Ministry photographs can be incorporated when authentic approved assets are available.
