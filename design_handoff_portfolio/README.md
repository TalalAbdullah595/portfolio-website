# Handoff: Kai Voss — Roblox Scripter Portfolio (Next.js)

## Overview
A cartoony, chunky-3D portfolio website for a Roblox scripter/game developer ("Kai Voss" — replace with the real name/handle). Three pages: Home (hero + about + selected work + testimonials + contact + footer), Projects index, and a Project detail page. The signature visual is a **CSS-3D floating island centerpiece** in the hero — built entirely from DOM boxes, no WebGL.

**Target: Next.js (App Router).** The files in `reference/` are **design references created in HTML + in-browser Babel/React** — prototypes showing intended look and behavior, NOT production code to copy directly. The task is to recreate them as a Next.js app using its conventions (components, `next/font`, `next/image`, CSS modules or global CSS).

## Fidelity
**High-fidelity.** Colors, typography, spacing, copy, animations and interactions are final. Recreate pixel-perfectly. The React component code in `reference/*.jsx` is directly portable — most components can be copied nearly verbatim into Next.js client components.

## Hero centerpiece: the 3D Island (IMPORTANT)
The chosen hero object is the **isometric floating island** (`IslandObject` in `reference/scene.jsx`). It must ship as the default (`heroObject: "island"`).

How it works — no 3D library needed:
- `Box` (scene.jsx) is a generic CSS-3D box primitive: 6 absolutely-positioned `.face` divs inside a `transform-style: preserve-3d` container, each face translated/rotated into place. Props: `w/h/d` (px), `c` (face color), `x/y/z` position, `rx/ry/rz` rotation, `fr` (face border-radius), optional `glyph`.
- Faces get depth shading via `filter: brightness()` per side (top 1.24, front 1.0, back .88, right .80, left .70, bottom .52) plus a 2px `var(--ink)` outline and inner shadows — this creates the chunky "toy" look (see `.face` in scene.css).
- `IslandObject` composes ~14 boxes: 3 stacked land layers (grass `#5ec46a`, dirt `#a06a3f`, deep dirt `#7c4f30`), a tree (trunk `#8a5a33`, two foliage blobs `#3fae5a` / `#56cf6e`), a rotated crystal (`--secondary`), a two-box hut (`--primary` walls, `--accent` roof rotated 45°), and 3 small floating cubes on offset bob animations.
- `Scene` wraps it in a perspective stage (`perspective: 1150px`): pointer-move drives parallax tilt (`ry = px*36`, `rx = -8 - py*22`), pointer-drag spins it (`spin += dx*0.45`). Base rest pose: `rotateX(-8deg) rotateY(16deg)`. Includes an animated radial-gradient ground shadow and two pill "hint chips" ("Drag to spin", "Live CSS 3D").
- Idle animation: `.obj.float` bobs ±15px over 5s. All motion disabled under `prefers-reduced-motion`.

In Next.js: make `Scene` a client component (`"use client"`). No dynamic import needed — it's pure DOM/CSS.

## Screens / Views

### 1. Home (`reference/Portfolio.html`)
- **Nav** (sticky, hides on scroll-down): brand mark (cube icon + "Kai Voss"), links Home / Work / About / Reception, CTA button. Height `--nav-h: 78px`.
- **Hero**: 2-col grid (text left, 3D island right). Eyebrow pill, huge Fredoka display headline ("I build games" style with outlined/stroke word), description, 2 CTAs, stat chips, marquee-style skill pills. On ≤ ~900px the layout stacks — **3D island goes BELOW the title and description** (source order already does this; do not add `order: -1` to the stage).
- **About**: 2-col grid (`.9fr 1.15fr`), portrait card left with the character render `assets/roblox-character.png` (side-facing katana pose) — `object-fit: contain`, padding `5% 6% 6%`, drop shadow, 6s bob animation — plus floating badges; bio text right.
- **Selected Work**: cards grid from `portfolio-data.js` (systems + games), with hover pop (`--sh-pop`, spring easing).
- **Reception**: infinite testimonial marquee (duplicated row, CSS animation).
- **Contact**: card with aside (email, Discord, reply time, location — NO character image here) + form side.
- **Footer**: big CTA ("Let's build something unbreakable."), brand, social links **in this exact order: Upwork, Fiverr, Discord, GitHub, Roblox, YouTube, X/Twitter** (icons in icons.jsx; hrefs are placeholders — wire real profile URLs), copyright line.

### 2. Projects index (`reference/Projects.html` + projects.js/css) — filterable grid of all systems/games.
### 3. Project detail (`reference/Project.html` + project.js/css) — hero, feature list, tech breakdown for one project.

## Interactions & Behavior
- Scroll-reveal: `.reveal` elements fade/slide in via IntersectionObserver (see hooks.jsx). Direction variants: `.rv-left` (slide from left — About portrait), `.rv-right`, `.rv-pop` (spring scale-in — hero 3D stage).
- **Scroll progress bar**: fixed 5px coral→lime gradient bar at viewport top, driven by CSS scroll-driven animation (`animation-timeline: scroll(root)` on `body::before`, inside `@supports`). No JS.
- Nav hides on scroll-down, reveals on scroll-up; active link tracks section in view. Brand cube mark does an occasional idle wiggle (7s keyframe loop, pauses on hover).
- Magnetic buttons (`Magnetic` wrapper): translate toward cursor within small radius, spring back. Primary/accent buttons also do a "jelly" squash-stretch keyframe on hover.
- Count-up stats on first reveal.
- Card hover: lift + chunky ink shadow, `--spring` easing (`cubic-bezier(.34,1.56,.64,1)`). Testimonial cards lift + tilt −1°; footer social pills lift + tilt; contact-point icons wiggle on row hover.
- Micro-motion: hero "can't" word wobbles periodically; skill-marquee stars twinkle; About name tag sways; About floating badges + work-card star flag bob; footer divider blocks hop in sequence.
- 3D scene: parallax on pointer-move, drag-to-spin (see above).
- ALL decorative motion gated behind `prefers-reduced-motion: reduce` — keep this in the port.

## Design Tokens (default palette: "Grape Arcade")
Defined in `reference/styles.css` (3 alternate palettes also there — ship grape as default):
- Backgrounds: `--bg #221a38`, `--bg-2 #18122a`; surfaces `#2e2350 / #3a2c66 / #473885`
- Ink (outlines/shadows): `#0d0918`; text `#fdf6ee`; dim text `#b6a9d8`
- Primary (coral) `#ff6b4a` · Secondary (blue) `#58a6ff` · Accent (lime) `#c8f24e` (+ matching `--on-*` text colors)
- Radii: card 18px, small 12px, pill 999px; outline width 2px
- Shadows: chunky "ink offset" style, e.g. `--sh-pop: 0 7px 0 -2px var(--ink), 0 28px 42px -16px rgba(0,0,0,.55)`
- Springs: `--spring: cubic-bezier(.34,1.56,.64,1)`, `--spring-soft: cubic-bezier(.22,1.2,.36,1)`
- Layout: `--maxw 1240px`, `--nav-h 78px`
- Font: **Fredoka** (Google Fonts) for display + UI — load via `next/font/google`

## State Management
Pure presentational site — React `useState`/refs only. Content lives in `portfolio-data.js` (stats, skills, projects, testimonials) — port to a typed `data/content.ts`. The prototype's tweaks panel (palette/hero-object switcher in app.jsx) is a design tool — do NOT port it; hard-code the grape palette and island hero.

## Assets
- `reference/assets/roblox-character.png` — About portrait (side-facing katana render, transparent PNG)
- `reference/assets/roblox-character-3.png` — spare front-facing render (currently unused)
- All icons are inline SVG components in `reference/icons.jsx` (chunky rounded line style, 24×24, stroke 2.4)
- Everything else (3D island, shapes, badges) is pure CSS/DOM — no image assets needed

## Files
- `reference/Portfolio.html` — home page shell (open in a browser to see the live design)
- `reference/app.jsx` — page assembly + tweak defaults
- `reference/sections-a/b/c.jsx` — Nav+Hero+About / Work / Reception+Contact+Footer
- `reference/scene.jsx` + `scene.css` — **the 3D Box primitive, IslandObject, Scene stage**
- `reference/hooks.jsx` — reveal, count-up, magnetic hooks
- `reference/icons.jsx` — icon set
- `reference/styles.css` — tokens + base; `sections.css` — section styles
- `reference/portfolio-data.js` — all copy/content
- `reference/Projects.html` / `Project.html` + their js/css — secondary pages

## Suggested Next.js mapping
```
app/layout.tsx        ← fonts (Fredoka), globals.css (styles.css+sections.css+scene.css merged)
app/page.tsx          ← Home
app/projects/page.tsx ← Projects index
app/projects/[slug]/page.tsx ← Project detail
components/{Nav,Hero,Scene,About,SelectedWork,Reception,Contact,Footer,Icon,Magnetic}.tsx ("use client" where interactive)
data/content.ts       ← from portfolio-data.js
public/               ← character PNGs
```
