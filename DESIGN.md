# DESIGN.md — Mafskins Design System
## Guidelines, not rules. Creative freedom always wins.

---

## THE ONLY REAL RULE

Make something a person would screenshot and share.

If following any guideline in this file produces something that looks
templated, generic, or forgettable — ignore the guideline.

These are starting points. They exist so you don't waste time on
decisions that don't matter. When a decision does matter — make it
yourself. Be bold. Take the risk.

---

## PHILOSOPHY

Every product should feel like it was made by one thoughtful person
who needed it themselves. Not a startup. Not a SaaS product. A tool
with a soul.

Before designing anything, answer this:
"When someone opens this, they should feel ___"

That answer governs every decision. If a design choice doesn't serve
that feeling — remove it.

---

## COLOUR

### The starting palette (override freely)

Dark mode should feel like candlelight, not a cave.
Light mode should feel like morning light through linen, not a hospital.

Avoid pure black (#000) and pure white (#fff).
Avoid cold greys — everything should have a hint of warmth.

**Suggested dark base:**
```
#1c1917   warm charcoal (better than cold black)
#292524   surface cards
#3c3836   hover states
```

**Suggested light base:**
```
#faf9f7   warm off-white
#f5f4f0   surface cards
#ede9e4   hover states
```

**Accent colour — define per product:**
Stay Close: #22c55e (pounamu jade — Māori greenstone)

The accent should be used sparingly. One moment of colour is more
powerful than colour everywhere.

**Warning/overdue:** #f59e0b — amber. Never red. Amber is a quiet
signal. Red is an alarm. This product doesn't alarm people.

### Colour freedom
If the product calls for a completely different palette — use it.
The guidelines above are defaults, not constraints.

---

## TYPOGRAPHY

Font: Inter (Google Fonts) — reliable, human, clean.
But if a different typeface serves the product better, use it.

**Scale (adapt freely):**
```
App name:      15–17px   weight 500–600
Page headers:  24–32px   weight 700
Card names:    16–18px   weight 600
Body:          14px      weight 400
Secondary:     13px      weight 400   muted colour
Labels:        11px      weight 500   uppercase   letter-spacing 0.08em
Timestamps:    12px      weight 400   muted colour
```

**Typography risks worth taking:**
- A large, expressive number as the hero element
- A quote or human message in the empty state
- Mixing weights dramatically within a single element
- Letting one typographic moment be the signature of the page

---

## SPACING

Base unit: 4px. Use multiples.
When in doubt, add more space. Breathing room is never wasted.

**Page max-width:** 800px for intimate tools. Don't go wider.
**Page padding:** 24px (mobile: 16px)
**Card padding:** At least 20px — cards that feel cramped feel cheap.
**Between cards:** 10–12px
**Section gaps:** 40–48px

---

## ANIMATION & MOTION

Motion is what separates a good app from a great one.

**Use animation:**
- Cards fading up on load (staggered, 60ms delay per card)
- Stats counting up from 0 on load (400ms)
- Modal sliding up from bottom (200ms)
- Hover states lifting cards (translateY -2px)
- Colour transitions on interactive elements (150ms)
- "Reach out" button fading in on card hover

**Take risks with motion:**
- A subtle pulse on the accent colour
- A gentle gradient animation in the background
- Cards that feel like they breathe
- An entrance animation that makes the first load feel like an event

**Rules:**
- Only animate: opacity, transform, filter, color, background
- Never animate: width, height, position properties
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

## COMPONENTS

### Cards
The card is the heart of most products. Make it feel good to look at.

Minimum requirements:
- Enough padding (20px+)
- A clear visual hierarchy (name first, details second)
- A hover state that responds to the user
- An overdue signal that's quiet (amber left border, nothing more)

Beyond that — design freedom. Try different layouts. Try horizontal,
try vertical. Try something unexpected.

### Buttons
Primary CTA: rounded pill, accent colour, confident.
The button should feel like an invitation, not a command.

### Empty states
This is your most important design moment. Don't waste it with "No
items found." Write something human. Make it feel like the product
is talking to the person.

Examples:
- "The people who matter deserve to be remembered."
- "Your people are waiting to be added."
- "No one's here yet. Who do you miss?"

---

## DARK / LIGHT MODE

Both modes must feel intentional and beautiful.
Dark ≠ black. Light ≠ white. Both have warmth.

Toggle: small sun/moon icon, top right, no label needed.
Store preference in localStorage.

---

## WHAT CHANGES PER PRODUCT

1. Accent colour
2. App name + icon
3. Tagline
4. Empty state copy
5. The feeling sentence
6. Background warmth (cooler for professional tools, warmer for personal)
7. Animation intensity (more for playful, less for serious)
8. Typography expression (more expressive for creative tools)

---

## THE ONLY QUESTIONS THAT MATTER

Before shipping any screen:

1. Would someone screenshot this?
2. Does it feel like a person made it?
3. Does every element earn its place?
4. Does it make you feel something?

All four yes → ship it.
Any no → keep going.

---

## A NOTE ON CREATIVE RISK

The worst thing a design can be is forgettable.

Safe choices produce safe results. A near-black background with a
green accent and Inter font is safe. It works. But it doesn't
surprise anyone.

Take one real risk per product. One thing that makes someone say
"I've never seen that in an app like this before." That's the thing
people remember. That's what gets shared.

Find that thing. Then build everything else quietly around it.
