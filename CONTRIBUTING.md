# Contributing to LaptopFinder

Thanks for helping freshers not get scammed!

## Ways to contribute

- **Update prices/models** – `index.html` → Budget Picks section, keep India Amazon links
- **Add purpose** – e.g., Architecture, Medical imaging
- **Translate** – Hindi version using `Mukta` + `Rozha One` (Bodhya Hindi pair)
- **Improve quiz** – new branches in `js/app.js:computeResult()`
- **A11y / performance** – Lighthouse, keyboard nav

## Setup

```bash
git clone <your-fork>
cd laptop-finder
python3 -m http.server 8765
# edit index.html / css/style.css / js/app.js
```

No build step. Tailwind via CDN.

## Project rules

- Keep Bodhya palette: `Cream #FFF8F3`, `Ink #241E1B`, `Terracotta #AD544B`, `Teal #16564F`, `Mustard #E8B84B` (only on dark)
- Keep display font `Archivo Black`, body `Newsreader`, mono `Space Mono`
- Headings in Title Case (not ALL CAPS) – e.g., “Your First Laptop Shouldn't Be a Regret.”
- No sponsorship – honest specs only, cite source if you add a model

## Pull Request

1. Fork → branch `feat/your-thing`
2. Test locally on mobile + desktop, test quiz end-to-end
3. Update `README.md` if you add a section
4. PR with screenshots

## Code style

- HTML: 2-space indent, comments for sections (`<!-- HERO -->`)
- CSS: keep `css/style.css` flat, hairline borders
- JS: vanilla, no deps, keep IDs (`#quizStepLabel`, `#budgetGrid`) stable

Questions? Open an issue.
