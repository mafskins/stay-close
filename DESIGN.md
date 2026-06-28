# DESIGN.md — Mafskins Design System
## The foundation. Inherit this. Override what you need per product.

---

## PHILOSOPHY

Every product built under this system should feel like it was made
by one thoughtful person who needed it themselves. Not a startup.
Not a SaaS. A tool with a soul.

Three questions every design decision must answer:
1. Does this serve the person using it?
2. Does this feel intentional, not accidental?
3. Would someone notice if it was removed?

If the answer to 3 is no — remove it.

Before designing anything, write one sentence:
"When someone opens this, they should feel ___"
That sentence governs every decision.

---

## COLOUR SYSTEM

### Base tokens (always the same across products)
```
Background primary:     #0c0c0e   near-black, barely warm
Background surface:     #141416   cards, modals
Background hover:       #1a1a1d   interactive hover state
Border default:         rgba(255,255,255,0.06)
Border interactive:     rgba(255,255,255,0.14)
Text primary:           #f9fafb   headlines, names, important
Text secondary:         #9ca3af   supporting information
Text muted:             #6b7280   timestamps, labels, hints
Warning/overdue:        #f59e0b   amber — never red, never alarming
Danger:                 #ef4444   destructive actions only
```

### Accent (define per product in CLAUDE.md and style.css)
```
--accent:               [hex]         primary brand colour
--accent-hover:         brightness(1.1) of accent
--accent-subtle:        rgba version at 0.12 opacity
--accent-text:          text colour on accent background
```

### Product accent library
```
Stay Close:     #22c55e   pounamu jade (Māori greenstone)
Job Agent:      #6366f1   indigo (focused, professional)
Music tool:     #ec4899   pink (expressive, creative)
Health/wellness:#14b8a6   teal (calm, balanced)
Finance:        #f59e0b   amber (considered, serious)
```

### Light mode overrides
```
Background primary:     #fafafa
Background surface:     #ffffff
Background hover:       #f3f4f6
Border default:         rgba(0,0,0,0.08)
Border interactive:     rgba(0,0,0,0.16)
Text primary:           #111827
Text secondary:         #6b7280
Text muted:             #9ca3af
```

---

## TYPOGRAPHY

Font: Inter from Google Fonts
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
font-family: 'Inter', -apple-system, sans-serif;
```

Scale:
```
App name/wordmark:      15px  weight 500  letter-spacing 0.02em
Page title:             28px  weight 700
Section header:         18px  weight 600
Card title/name:        16px  weight 600
Body:                   14px  weight 400
Secondary/supporting:   13px  weight 400  color: text-secondary
Labels/tags/caps:       11px  weight 500  uppercase  letter-spacing 0.08em
Micro/timestamps:       12px  weight 400  color: text-muted
```

Rules:
- Never go below 11px
- Never use weight 800 or 900
- Line height: 1.2 for headlines, 1.6 for body, 1.5 for inputs
- Sentence case everywhere except tags/labels (those are UPPERCASE)

---

## SPACING

Base unit: 4px. Use multiples only.
```
4px   micro gaps (icon to label)
8px   tight gaps (label to input)
12px  small gaps (between form fields)
16px  card padding compact
20px  card padding standard
24px  page padding (mobile: 16px)
32px  modal padding, section gaps
40px  between major sections
48px  generous section breathing room
64px  large vertical gaps
80px  empty state top margin
```

Layout widths:
```
760px    personal/intimate tools (Stay Close, journals)
1080px   dashboards and data tools
1280px   marketing pages, landing pages
```

---

## BORDER RADIUS

```
Buttons (primary CTA):  9999px  (pill shape)
Buttons (secondary):    8px
Cards:                  12px
Modals:                 16px
Inputs:                 8px
Tags/pills:             9999px
Avatar circles:         50%
Small badges:           6px
```

---

## COMPONENTS

### Primary CTA Button
```css
background: var(--accent)
color: var(--accent-text)
font-size: 13px, font-weight: 600
padding: 8px 16px
border-radius: 9999px
border: none
transition: filter 150ms ease
hover: filter brightness(1.08)
active: transform scale(0.97)
```

### Secondary Button
```css
background: transparent
border: 1px solid var(--border)
color: var(--text-secondary)
border-radius: 8px
hover: border-color var(--border-active), color var(--text-primary)
```

### Ghost / Text Button
```css
background: transparent
border: none
color: var(--accent)
font-size: 13px
hover: opacity 0.75
```

### Form Fields
```
Label:   11px uppercase, letter-spacing 0.08em, color text-muted
Input:   bg var(--bg), border var(--border), border-radius 8px
         padding 12px 14px, font-size 15px
         focus: border-color var(--accent)
         placeholder: color text-muted
```

### Cards
```
background: var(--surface)
border: 1px solid var(--border)
border-left: 3px solid transparent  (overdue: var(--warning))
border-radius: 12px
padding: 16px 20px
hover: background var(--surface-hover), translateY(-1px)
transition: all 150ms ease
```

### Stats Strip
```
Single row, three columns, divided by 1px rgba borders
No card background — numbers float in space
Number: 36px weight 700, color text-primary
        if attention > 0: color var(--warning)
Label:  11px uppercase letter-spacing 0.08em color text-muted
```

### Avatar Circles
```
Size: 36–40px
Border-radius: 50%
Colour: auto-generated from name (see JS utility)
Initial: first letter, uppercase, font-weight 700
```

Avatar colour utility (copy into every project):
```javascript
function getAvatarColour(name) {
  const colours = ['#22c55e','#f59e0b','#6366f1','#ec4899','#14b8a6','#f97316'];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colours[Math.abs(hash) % colours.length];
}
```

### Tag / Pill variants
```
font-size: 10px, font-weight: 500, uppercase, letter-spacing 0.06em
padding: 2px 8px, border-radius: 9999px

Green:    bg rgba(34,197,94,0.12)    text #22c55e
Amber:    bg rgba(245,158,11,0.12)   text #f59e0b
Indigo:   bg rgba(99,102,241,0.12)   text #6366f1
Pink:     bg rgba(236,72,153,0.12)   text #ec4899
Grey:     bg rgba(107,114,128,0.12)  text #6b7280
```

### Modal
```
Overlay: rgba(0,0,0,0.7), backdrop-filter blur(4px)
Card: max-width 440px, background var(--surface)
      border 1px solid var(--border-active)
      border-radius 16px, padding 32px
      animation: slideUp 200ms ease

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

### Empty State
```
margin-top: 80px
text-align: center
Primary message: one honest sentence, 15px, color text-muted
CTA: accent-coloured text link, 13px, "Do the thing →"
Nothing else. No illustrations unless the product calls for it.
```

---

## ANIMATION & MOTION

Philosophy: motion should feel inevitable, not decorative.

Timing scale:
```
150ms ease    hover states, colour transitions
200ms ease    modals opening, drawers
300ms ease    page content loading
400ms ease    stat number count-ups
60ms          stagger delay per card on load
```

Card stagger on page load:
```javascript
cards.forEach((card, i) => {
  card.style.animationDelay = `${i * 60}ms`;
});

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

Stat count-up:
```javascript
function countUp(el, target, duration = 400) {
  const start = performance.now();
  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = Math.floor(progress * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  }
  requestAnimationFrame(update);
}
```

Hover-reveal elements (e.g. action buttons on cards):
```css
.reveal { opacity: 0; transition: opacity 150ms ease; }
.card:hover .reveal { opacity: 1; }
```

Rules:
- Only animate: opacity, transform, filter, color, background
- Never animate: width, height, top, left, display
- Always respect prefers-reduced-motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## DARK / LIGHT MODE

Add to CSS root:
```css
:root { color-scheme: light dark; }
```

Body class toggle: `class="dark"` or `class="light"`

JS utility:
```javascript
function toggleTheme() {
  const isDark = document.body.classList.contains('dark');
  document.body.classList.toggle('dark', !isDark);
  document.body.classList.toggle('light', isDark);
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
}

// On page load
const saved = localStorage.getItem('theme') || 'dark';
document.body.classList.add(saved);
```

Toggle button: small sun/moon or ◐ icon, top right of header, no label.

---

## HEADER PATTERN

Always the same structure:
```html
<header class="header">
  <div class="brand">
    [icon] AppName
    <span class="tagline">One line. What this is for.</span>
  </div>
  <div class="header-actions">
    [theme toggle]
    [primary CTA]
  </div>
</header>
```

Height: 64px
Position: sticky top
Border-bottom: 1px solid var(--border)

---

## WHAT CHANGES PER PRODUCT

1. --accent colour (define in style.css :root)
2. App name + icon in header
3. Tagline
4. Empty state message
5. The feeling sentence (in CLAUDE.md)
6. Max-width (760 / 1080 / 1280)
7. Animation intensity — dial up for playful, dial down for serious
8. Table names and API routes in server.js

Everything else: inherit from this file.

---

## THE QUALITY CHECK

Before shipping any screen:
- Is every element here for a reason?
- Does the spacing breathe?
- Does colour draw the eye to the right thing?
- Would someone feel something opening this?
- Does it look like something a person made, not a template?

All five yes → ship it.
