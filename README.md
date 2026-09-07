# LaptopFinder - The Only Laptop Guide Freshers Actually Need

A simple, honest laptop buying guide for Indian college freshers who have no idea what RAM, SSD, or RTX means.

No sponsorship. No commission talk. No fake top 10 lists. Just clear advice based on what you will actually do in college.

**Run it locally:**
```bash
python3 -m http.server 8765
```
Then open `http://localhost:8765` in your browser. That is it. No npm, no build, no headache.

---

## What is this website?

LaptopFinder is a one page website that helps you pick your first laptop without getting scammed.

You tell it three things:
1. What is your course or purpose (coding, design, MBA, engineering, general use, gaming)
2. What is your budget (35K to 1 Lakh)
3. What matters to you (battery, speed, light weight)

It tells you what specs you need and which real models to check on Amazon or Flipkart India.

Think of it like that one senior who actually knows laptops, minus the attitude.

---

## Why did we make this?

Because buying a first laptop in India is chaos.

The shopkeeper will say, "Sir, take i7 with 1TB, best hai." Your relative will say, "HP le lo, mere office me same hai." YouTube will confuse you with 2 hour videos. And you will end up paying 60K for a laptop that hangs when you open 10 Chrome tabs.

This site exists to stop that.

It explains the 10 things that actually matter: processor, RAM, storage, display, battery, GPU, keyboard, ports, build, and OS. In plain words. With examples. With warnings about common traps.

Like this classic trap: 4GB RAM + 1TB HDD for 28K. Sounds like a deal. Feels like 2015. Boots slower than your college bus.

---

## Who is this for?

- CSE or IT students who will run VS Code, Chrome, Docker, Android Studio
- Mechanical, Civil, ECE students who need CAD and heavy software
- Design, editing, architecture folks who need good color and GPU
- MBA, BCom, BBA, Law students who carry their laptop everywhere
- BA, BSc, medical, general students who need notes, PDFs, and Netflix
- Parents who are paying and want zero regret

If you do not know the difference between RAM and ROM, this site was made exactly for you.

---

## Fun roast section (read only if you can handle the truth)

Let's be honest about how most freshers buy laptops:

1. **The i7 blind lover.** "Bhai i7 hai, matlab best hai." Bro, i7 11th gen loses to i5 13th gen. Generation matters more than the i3, i5, i7 sticker. Check the CPU score, not the sticker.

2. **The 1TB HDD victim.** Shopkeeper gave you 1TB slow hard disk instead of 512GB fast SSD because "storage zyada hai." Now your laptop takes 2 minutes to start and you have time to make chai while it boots.

3. **The gaming laptop for Excel guy.** You bought a 2.5kg RTX beast with 4 hour battery for BCom. Now you carry a room heater to class and hunt for charging plugs like Pokemon.

4. **The 8GB soldered trap.** You saved 3K and took 8GB RAM that cannot be upgraded. By sem 3, Docker + Chrome + Meet will make it cry. We warned you.

5. **The Mac for showoff plan.** You want a MacBook for coding but your budget is 40K. Relax. A good Ryzen 7 Windows laptop will carry you for 2 years. Buy Mac when you actually need iOS dev or have the budget.

If any of these hurt, good. That means this guide is working.

---

## What you will find inside

- **Finder Quiz:** 5 clicks and you get a clear answer. Takes 60 seconds.
- **By Purpose tabs:** Coding, Engineering, Design, MBA, General, Gaming. Pick yours, see exact specs.
- **Budget Picks:** Real models from around 35K, 50 to 60K, and 80K to 1L. With India prices.
- **Spec Calculator:** Move RAM and storage sliders and see a simple verdict.
- **Shop Checklist:** 10 questions to ask before paying. Copy it to your phone and read it at the shop like a pro.
- **CPU check guide:** How to use cpubenchmark.net in 30 seconds so no one can fool you with old processors.

---

## How to use this guide the smart way

1. Start with the Finder Quiz. Get your shortlist.
2. Read your purpose tab fully. Note the minimum specs.
3. Check the CPU on cpubenchmark.net. If the CPU Mark is low, reject it even if the name sounds big.
4. Compare 2 to 3 models in Budget Picks during a sale (Great Indian Festival, Big Billion Days).
5. Take the Shop Checklist with you. Ask about upgradeable RAM, SSD type, warranty, and licensed Windows.

Simple rule to remember: 16GB RAM + 512GB SSD + FHD IPS + 8 hour battery will keep 95 percent of students happy for 4 years.

---

## Tech stuff (for developers, in simple words)

This is a plain static website. No backend. No database. Just files you can open.

- `index.html` is the full site. Every section has comments so you can find things fast.
- `css/style.css` has the custom colors and small styles.
- `js/app.js` has all logic: tabs, quiz, sliders, filters, checklist copy.
- `js/tailwind-config.js` has the theme colors and fonts.
- Fonts come from Google Fonts. Icons come from RemixIcon. Styling uses Tailwind CDN.

Project structure:
```
laptop-finder/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── tailwind-config.js
│   └── app.js
├── assets/
├── README.md
├── CONTRIBUTING.md
├── LICENSE
└── .gitignore
```

Want to change colors or fonts? Edit `js/tailwind-config.js` and `css/style.css`. That is all.

---

## Quick start for contributors

```bash
git clone https://github.com/<your-username>/laptop-finder.git
cd laptop-finder
python3 -m http.server 8765
```

Open `http://localhost:8765`, test on mobile and desktop, test the quiz fully, then send a PR.

Easy first tasks: update prices for a new sale, add a new budget pick, fix a typo, translate a section to Hindi.

Details are in `CONTRIBUTING.md`.

---

## A small warning

Prices change fast in India. We checked Amazon India and Flipkart during July 2026 sale. Before you buy, check the live price, seller rating, and warranty. This guide gives direction, not a buy button guarantee.

---

## License

MIT. See `LICENSE`. Use it, share it, improve it.

Made for freshers, by people who once bought the wrong laptop so you do not have to.
