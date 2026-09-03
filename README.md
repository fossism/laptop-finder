# LaptopFinder — The Only Laptop Guide Freshers Need

> A no-BS, no-sponsorship buying guide for Indian college freshers & first-job professionals who don’t know RAM from ROM. Choose by **purpose, not just price**.

Built from two real buying guides: **35K → 1 Lakh Detailed Guide** + **Best Laptop for Coding 2026 (CS Students Guide)** — distilled into an actionable, chapterized website.

**Live Preview:** `http://localhost:8765` after `python3 -m http.server 8765`

---

## Features

- **Purpose → Specs Map** — Tabs for Coding/CSE, Engineering (Mech/Civil/ECE), Design/Editing, MBA/Commerce/Law, General, Gaming+Study
- **10 Pillars Guide** — Processor, RAM, Storage, Display, Battery, GPU, Keyboard/Ports/Build, OS — with fresher traps (e.g., “4GB RAM + 1TB HDD”)
- **60-sec Finder Quiz** — 5 clicks (purpose / budget / priority / OS / gaming) → real models with Amazon links for India (35K–1L)
- **Quick Spec Calculator** — Sliders for RAM/Storage + budget pills with live verdict
- **Budget Picks** — 6 cards: ~35K (HP 15s, IdeaPad Slim 3), 50–60K (VivoBook 15 OLED ★ Fresher’s Choice), 80K–1L (MacBook Air M2/M3, Lenovo LOQ RTX 4050)
- **Checklist** — 10-point printable checklist with Copy button + FAQ
- **Design** — Bodhya palette (`Cream #FFF8F3` / `Ink #241E1B` / `Terracotta #AD544B` / `Teal #16564F` / `Mustard #E8B84B`) + Cloudflare editorial layout (flat, hairline borders, `Archivo Black` / `Newsreader` / `Space Mono`)

## Tech Stack

- **HTML5** — semantic, accessible
- **Tailwind CSS (CDN)** — `https://cdn.tailwindcss.com` + `js/tailwind-config.js` for Bodhya tokens & fonts
- **CSS** — `css/style.css` for custom editorial styles (dot-grid, hairline, focus)
- **JavaScript (vanilla)** — `js/app.js` for tabs, quiz, sliders, filters, checklist
- **Fonts** — Google Fonts: `Archivo Black`, `Newsreader`, `Space Mono`, `Archivo`
- **Icons** — RemixIcon `4.2.0`
- **No build step** — single static site

## Project Structure

```
laptop-finder/
├── index.html              # Main document (links to css/js)
├── css/
│   └── style.css           # Custom editorial styles (732 bytes)
├── js/
│   ├── tailwind-config.js  # Tailwind CDN config (Bodhya colors + fonts)
│   └── app.js              # App logic: tabs, quiz, calculators, filters
├── assets/                 # Images / screenshots (add here)
├── README.md
├── CONTRIBUTING.md
├── LICENSE                 # MIT
└── .gitignore
```

Clone and contribute easily — every section is commented in `index.html`.

## Quick Start

```bash
# 1. Clone (or download)
git clone https://github.com/<your-username>/laptop-finder.git
cd laptop-finder

# 2. Run locally — no npm needed
python3 -m http.server 8765
# or: npx serve .  or  php -S localhost:8765

# 3. Open
open http://localhost:8765
```

## Branding

- **Cloudflare Workers** — editorial spacing, thin rules, doc-like cards → https://www.cloudflare.com/products/workers/
- **Bodhya** — colors & type → https://bodhya.net/branding/
  - `Terracotta #AD544B` primary accent, `Teal #16564F` secondary, `Mustard #E8B84B` on dark only, `Ink #241E1B` text, `Cream #FFF8F3` ground, `CreamTint #F4EBE3` bands
  - `Archivo Black` display, `Newsreader` body, `Space Mono` labels

To change theme, edit `js/tailwind-config.js` and `css/style.css`.

## Content Sources

- https://youtu.be/n9efUFE9nZ8 — Before buying Laptop & MacBook (35K to 1Lakh)
- https://youtu.be/wQ6wWjfyBvs — Best Laptop for Coding in 2026 (CS Students Guide)
- Prices checked on Amazon India / Flipkart — July 2026 sale (verify before buying)

## Contributing

See `CONTRIBUTING.md`. Good first issues: add new budget picks, translate to Hindi, add comparison table vs real prices.

## License

MIT — see `LICENSE`.

---

Made for freshers, by people who wasted money on the wrong laptop so you don’t.
