# A10 Sport Academy — Landing Page

Single-file React landing page for أكاديمية A10 الرياضية (Riyadh + Jeddah).

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in dist/
```

## The deliverable

Everything lives in **`src/A10Academy.jsx`** — one self-contained default-exported
component. It injects its own stylesheet (fonts, design tokens, clip-path motifs,
keyframes) on mount and uses only Tailwind arbitrary values, so no
`tailwind.config.js` theme entries are required. Drop it into any React + Tailwind
app:

```jsx
import A10Academy from "./A10Academy.jsx";
```

Dependencies: `react`, `lucide-react`, Tailwind CSS.

## Design direction

Chosen from the `ui-ux-pro-max` dataset's **Sports Team/Club** profile rather than
picked by taste:

| Axis | What the data specified |
| --- | --- |
| Style | Vibrant & Block-based + Motion-Driven, on an OLED-dark base |
| Landing pattern | Hero-Centric + Feature-Rich |
| Typography mood | Bold + impactful → the `Barlow Condensed / Barlow` sports pairing |
| Colour mood | Team colours + energetic accent |
| Key effects | Score animations + schedule reveals |
| Required content | Schedule + roster |
| Anti-pattern | Static content, poor fan engagement |

So the page is built from **solid colour blocks with hairline edges and cut
corners**, not glass cards: big condensed numerals, a light programs section that
inverts against the dark ones, and a single gold accent reserved for figures worth
bragging about.

## Tokens

Three layers — primitive → semantic → component — as CSS variables on `.a10`. No
component carries a raw hex value.

| Layer | Examples |
| --- | --- |
| Primitive | `--p-ink #070E18`, `--p-navy-900 #0A1628`, `--p-navy-800 #112A46`, `--p-navy-700 #14477E`, `--p-sky-500 #29A9E0`, `--p-gold-400 #FFB800`, `--p-chalk-50 #F4F8FC` |
| Semantic | `--bg`, `--bg-invert`, `--fg`, `--fg-muted`, `--fg-faint`, `--fg-invert`, `--fg-invert-muted`, `--primary`, `--accent`, `--line`, `--scrim` |
| Component | `--btn-bg`, `--btn-bg-hover`, `--block-bg`, `--block-line`, `--ring` |

Every text/background pair clears 4.5:1. The two light-surface text tokens are
annotated with their measured ratio in the stylesheet.

Type: **Barlow Condensed** (display + data, tabular figures) and **Barlow** (body)
for Latin; **Alexandria** carries Arabic in both roles. Arabic display faces are
not condensed, so `.t-hero` / `.t-sec` / `.t-block` each set a smaller size under
`[dir="rtl"]`.

Motifs: the crest's diagonal navy/sky split (`.crest-cut`, the staff plates and the
rating card), cut-corner blocks (`.cut-tr`, `.cut-sm`), the three stars as section
marker, and a 96px pitch grid.

## What's interactive

| Feature | Where |
| --- | --- |
| Dual-city switcher (nav, hero, programs, staff, contact) | updates staff, schedule, pitch counts, phone, WhatsApp and map |
| Player Growth Index card | `GrowthIndex` — pick an age group, tap a pillar (TEC/TAC/PHY/MEN) for what we measure |
| Age-group program finder | `Programs` — filter chips, prices, and a schedule board whose rows re-reveal on branch change |
| Coaching staff roster | `Squad` — per-branch, with licence badges |
| 3-step trial booking | `TrialModal` — player → program/branch → guardian contact, per-field validation with inline errors, WhatsApp hand-off |
| Reels carousel + social hub | `Media` — scroll-snap rail, five platform tiles |
| Floating rail | WhatsApp on desktop, sticky CTA bar on mobile |
| RTL/LTR toggle | nav `EN / ع` button; sets `dir` and `lang` on `<html>` |

Motion follows the dataset's Scroll Reveal *Standard* tier: 400–600ms, `power2.out`
equivalent easing, stagger capped at ~70ms and under 8 children. Anything already
on screen at mount reveals immediately instead of waiting on the observer, and
`prefers-reduced-motion` collapses all of it.

## Where to plug in real content

- `BRANCHES` — addresses, staff, phones, WhatsApp numbers, Google Maps embeds,
  schedules. **Phone numbers, staff names and map queries are placeholders.**
- `PROGRAMS` — ages, focus points, session counts, prices, and the rating values
  behind the Growth Index card.
- `REELS` — replace the CSS gradients with poster images and link each tile to the
  real TikTok/Instagram/YouTube post.
- `SOCIALS` — already points at @akdamya10 (Instagram, TikTok), akdamy10a
  (Snapchat), t.me/academyA10, @academya10 (YouTube).
- `VOICES`, `METHOD`, `SCOUT_STATS` — testimonials and claims; swap for approved
  copy before launch.

The trial form ends at a confirmation summary with a WhatsApp link. Wire
`TrialModal`'s confirm step to your CRM or an API route when one exists.
