# HFGC EXPO 2026 — Hospitality Ministry

A blue and gold, touch-first booth experience designed for a **1080 × 1920 portrait display**. The reference-style opening includes the animated HFGC logo and four large outlined navigation buttons. It includes four pillars, all nine ministry teams, a team finder, expandable responsibilities, and session reset. It uses the approved repository logo and has no external font, image, or JavaScript dependencies.

The ministry copy follows the revised opening section of the October 5 document, **WHO WE ARE - HOSPITALITY INTERACTIVE**. That section takes precedence over the original creative brief retained later in the same document. It includes the complete pillar verses, the Greeters and VIP Reception locations, People with Determination terminology, the HFGC Altar Call Team, the coordinator/driver distinction, the Lounge/Host coordination note, and the Protocol leadership boundary. Longer responsibilities remain expandable. The approved opening design and the simplified locale church/district sign-up form are preserved.

## Open the experience

Live site: https://dangerous83.github.io/HFGC-Interactive-Screen/

GitHub Pages publishes this repository’s `main` branch. Merging a pull request into `main` triggers the Pages build and deployment.

For a local preview, run `python -m http.server 8000` and open `http://localhost:8000`. The visitor experience always renders at **1080 × 1920** inside `kiosk.html`. `index.html` and `screen-fit.js` scale and center that complete portrait screen to fit the device, including mobile. Navigation, card columns, typography, photo crops, and footer remain the same composition. Different device proportions leave blue space around the screen instead of stretching or cropping it. The content area still scrolls, and touch controls, the form, and the idle dialog remain interactive. The organizer page keeps its normal responsive layout.

The first touch or Enter/Space action on the opening screen requests full screen for the outer page, while the selected button still works immediately. The header control can enter or exit full screen. A manual exit is respected until the page reloads. Browsers require user activation for website-requested full screen; automatic full screen at browser launch must be configured on the installed display. Unsupported or blocked browsers keep normal navigation and the manual control. See [requestFullscreen requirements](https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullscreen). Full screen expands the outer page while preserving the 1080 × 1920 design viewport. `portrait.css` contains the blue and gold design and portrait display rules. Sign-up records remain in the same origin's browser storage and can still be reviewed in `organizer.html`.

## Registration setup

**Join Us opens a working interest form.** Visitors provide their full name, a phone number or email, and a preferred team (including “I’m not sure”). A **Locale Church & District** button below the team selection opens two optional fields. The reason-for-joining and availability fields have been removed. Choosing “I’m Interested” on a team page prefills that team. The form keeps its draft while the visitor explores, and clears it on Home, inactivity reset, or successful submission. The starting menu has four options: Our Heart, What We Do, VIP Hospitality, and Get Involved.

Entries are saved in **localStorage in the kiosk’s browser**, not a server or GitHub. A confirmation appears only after saving and verifying the record. If storage fails, the form stays open and displays an error; it never reports a successful submission. Private browsing, clearing browser data, or changing browser profiles can remove or hide the records. Use the normal kiosk browser profile and export records regularly.

Open **[organizer.html](https://dangerous83.github.io/HFGC-Interactive-Screen/organizer.html)** on the same kiosk, in the same browser/profile, to review names, contact details, preferred teams, locale churches, and districts. Download Sign-Ups (CSV) exports the records for follow-up. Previously saved reasons for joining and availability remain available in older records and CSV exports. The organizer page is separate from the visitor navigation; it has no account authentication and displays only that browser’s local records. Control access to the kiosk itself. No personal details are embedded in the repository.

For an optional online form, edit `config.js`:

- Set `signupUrl` to the approved form URL.
- Add a locally hosted QR image that encodes that exact URL and set `signupQrImage` to its relative path. Test scanning on real phones at the installed display.
- Set `teamQueryParameter` only if the approved form supports a prefilled team parameter. Otherwise visitors are instructed to select the team in the form.

The optional online form appears as a second sign-up choice. Its entries are managed by that external service and do not appear in the kiosk’s local list. The touchscreen does not claim to verify external submissions. For shared collection across devices, connect an approved online form or backend; GitHub Pages does not provide a registration database.

## Search and Hospitality Assistant

Search is available in the upper-right corner of the opening screen and in the header. The opening screen has no Ask Hospitality launcher; the assistant remains in the experience footer and as a tab inside the search dialog. It searches the approved ministry copy, including team purposes, responsibilities, pillar verses, and joining information. Related topic suggestions update as visitors type; matching topics open their exact screen. Common role aliases, partial words, and small spelling errors are supported. A built-in touch keyboard includes Shift, Backspace, Clear, Space, and Search/Ask; physical keyboards also work. The full dialog scales with the same portrait canvas on mobile.

The bottom-right Start Over button is replaced with an animated open-hands **Ask Hospitality** widget. This is a local, content-based assistant, not a connected generative AI service. It uses the same team and pillar arrays as the page content, answers common ministry questions, offers team recommendations and follow-up questions, and links to relevant pages or the interest form. Team-specific joining links prefill the selected team while preserving other draft fields. Exact event details that are absent from the guide are referred to the booth team rather than invented. No API keys, external AI calls, or search of private sign-up records are involved.

Search queries and conversations remain in session memory only. Closing the dialog preserves them during the visit; Home, a page reload, or the inactivity reset clears them. They are not saved to localStorage or sent to a server. Using the guide counts as activity, and its dialog closes before an inactivity warning. The hands have a gentle repeating glow and float animation that respects reduced motion.

## Kiosk behavior

The initial screen shows the logo with a soft looping gold glow and direct navigation to **Our Heart**, **What We Do**, **VIP Hospitality**, and **Get Involved**. These four buttons use color emoji graphics with gentle heartbeat, offering-hands, crown, and floating-hearts loops. The fixed icon slots preserve button spacing. The logo has no moving light sweep or scale animation. **Touch to Explore** opens the welcome menu. **Home** and the header logo clear the selected team, filters, and navigation history and return to the opening screen. Finishing a visit and an inactivity reset also return to that screen. Team selection stays in memory only until a session reset or page reload. Motion is disabled when the device requests reduced motion.

Emoji graphics in `assets/emoji` are from [Twemoji](https://github.com/jdecked/twemoji), by Twitter, Inc. and other contributors, licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). They are bundled locally and animated with CSS; see `assets/emoji/LICENSE-GRAPHICS.txt` for the graphics license.

After 90 seconds without interaction, **Still exploring?** offers Continue or Return to Home. Typing, selecting fields, and scrolling count as activity. After a further 15 seconds without a response, the session resets to the logo attract screen. The confirmation screen appears after a saved submission and returns home after 20 seconds. These durations can be changed in `config.js`.

## Display checks

The Greeters detail screen uses the approved `Greeters.png` as its background, with dark blue panels for readable content. Other screens keep the standard blue background. The browser favicon and Apple touch icon use the uploaded `pmcc_logo_icon.png`.

Before the expo, check the actual screen orientation and resolution, viewing-distance readability, touch calibration, browser full-screen settings, and approved registration link/QR on real phones. Motion respects the device's reduced-motion preference. Ministry photographs can be incorporated when authentic approved assets are available.
