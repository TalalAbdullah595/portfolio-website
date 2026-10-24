/* ============================================================
   content.ts — all site copy. Systems + games power the work
   cards and the project detail pages; HOME holds the home-page
   collections; SITE holds identity, contact, and social links.
   ============================================================ */

import type { IconName } from "@/components/Icon";

export type Accent = "primary" | "secondary" | "accent";

/* ---- Identity, contact, socials ----
   Single source of truth: every name, handle, and link on the site
   reads from here, so none of it is duplicated across components. */
export interface Social {
  ic: IconName;
  l: string;
  /* omitted while a profile URL is still outstanding — the footer
     renders those as non-clickable pills rather than dead links */
  href?: string;
  /* shown on hover for handles that have no linkable profile */
  handle?: string;
}

export const SITE = {
  name: "Talal Abdullah",
  brand: "ALPHA",
  role: "Roblox Developer",
  roleLong: "Roblox Developer & Luau Scripter",
  tagline:
    "Roblox developer, 2+ years production Luau — combat systems, player data, and event-driven architecture built to extend.",
  email: "talalabdullah108@gmail.com",
  discord: "_alpha2002",
  location: "Pakistan",
  timezone: "UTC+5",
  replyTime: "1 business day",
  /* Order is fixed by the design handoff: Upwork, Fiverr, Discord,
     GitHub, Roblox, YouTube, X. */
  socials: [
    { ic: "upwork", l: "Upwork", href: "https://www.upwork.com/freelancers/~016444093287db982d" },
    { ic: "fiverr", l: "Fiverr", href: "https://www.fiverr.com/s/LdwWjj4" },
    { ic: "chat", l: "Discord", handle: "_alpha2002" },
    { ic: "github", l: "GitHub" },
    { ic: "play", l: "Roblox" },
    { ic: "youtube", l: "YouTube", href: "https://www.youtube.com/@ALPHA-d5d" },
    { ic: "x", l: "X / Twitter" },
  ] satisfies Social[],
};

export interface Outcome {
  n: string;
  suf: string;
  l: string;
}

export interface Quote {
  text: string;
  who: string;
  role: string;
}

export interface Project {
  id: string;
  name: string;
  mono: string;
  kicker: string;
  accent: Accent;
  tier: "Game System" | "Fixes & cleanup" | "Full build";
  featured: boolean;
  wip?: boolean;
  summary: string;
  problem: string;
  approach: string[];
  outcomes: Outcome[];
  tech: string[];
  quote: Quote | null;
  /* YouTube video id only — the 11 chars after ?v= . Never a video file. */
  video?: string;
  /* paths under public/projects/<id>/ ; first one fills the large frame */
  images?: string[];
  liveUrl?: string;
}

export type ProjectType = "system" | "game";

export interface Stat {
  n: number;
  suf: string;
  l: string;
}

export interface Skill {
  t: string;
  star: boolean;
}

export interface ProcessStep {
  t: string;
  d: string;
}

export interface Engagement {
  tier: "sprint" | "project" | "partner";
  ribbon: string;
  name: string;
  price: { pre: string; val: string; post: string };
  desc: string;
  feats: string[];
  cta: string;
  pop: boolean;
}

export interface Testimonial {
  text: string;
  nm: string;
  mono: string;
  /* both optional — a rating or a role is only shown when the real one is
     known, never filled in to make a card look complete */
  stars?: number;
  role?: string;
}

export const SYSTEMS: Project[] = [
  {
    id: "combat-revamp", name: "Combat System Revamp", mono: "CB",
    kicker: "Combat / Client commission", accent: "primary",
    tier: "Game System", featured: true,
    summary: "A full pass over a Roblox combat system — combos, parries, block breaking and steerable dashes, with every overlapping state resolved.",
    problem: "Most of the mechanics already existed in some form, but they fought each other. Block, dash, stun, ragdoll and airborne states overlapped in ways that made exchanges unreadable.",
    approach: [
      "Rebuilt the core string: a 4-hit M1 combo with proper hit registration and combo timing windows, closing into an uppercut launch and downslam.",
      "Gave the guard finite health so every hit chips it and a depleted block shatters, then added parry timing, backstab ragdoll and dash-into-block stun so blocking is never a free answer to aggression.",
      "Built front, side and back dashes with mid-dash direction control — the front dash swings the sword and deals damage on contact.",
      "Resolved state precedence across the whole set: when a player may dash out of stun, whether a downslam connects on a falling target, and what wins when two mechanics fire on the same frame.",
    ],
    outcomes: [
      { n: "4", suf: "-hit", l: "M1 combo string" },
      { n: "3", suf: "", l: "Dash directions, steerable" },
      { n: "1", suf: "s", l: "Hit stun on every hit taken" },
    ],
    tech: ["Luau", "State machines", "Hit registration", "Ragdoll physics"],
    quote: null,
    video: "PV5KfaDZVIo",
  },
  {
    id: "roblox-website", name: "The Roblox Website, Inside Roblox", mono: "RW",
    kicker: "API integration / Client commission", accent: "secondary",
    tier: "Game System", featured: true,
    summary: "An in-experience game browser pulling live data straight from Roblox's own API — search, genres, live server lists, and one-click teleport into any running instance.",
    problem: "The client wanted the Roblox website itself playable inside a Roblox experience — but HttpService cannot reach roblox.com directly.",
    approach: [
      "Built a data service that fetches real games and their stats — visits, likes, creator, ID, creation date and description — through the RoProxy endpoint.",
      "Sorted games into genre categories with full search across the catalogue.",
      "Surfaced each game's live server list on selection, and wired play to TeleportService so the player lands in that exact running instance.",
    ],
    outcomes: [
      { n: "6", suf: "", l: "Live stats per game" },
      { n: "Live", suf: "", l: "Server list per game" },
      { n: "1", suf: "-click", l: "Teleport into any server" },
    ],
    tech: ["Luau", "HttpService", "RoProxy", "TeleportService"],
    quote: null,
    video: "0e0EUrpekvU",
  },
  {
    id: "pack-opening", name: "Pack-Opening Rebuild", mono: "PO",
    kicker: "VFX / Client commission", accent: "accent",
    tier: "Game System", featured: true,
    summary: "Reworked a client's pack-opening VFX and built the code-driven animated backdrop system that plays behind it.",
    problem: "The reveal moment carries the game's monetization loop, and its backdrops had to animate correctly even before streaming had fully loaded them in.",
    approach: [
      "Rebuilt the box and pack opening VFX, then integrated it into the opening sequence.",
      "Scripted the SpacialUI backdrop scenes entirely in code — floating stones and planets on a gentle sine bob, pulsing lamps, fading light lines and twinkling stars — through TweenService and a per-frame loop.",
      "Wrapped the whole thing in a clean Show/Hide system built on Knit, kept streaming-safe.",
    ],
    outcomes: [
      { n: "5", suf: "", l: "Animated backdrop layers" },
      { n: "Streaming", suf: "-safe", l: "Animates before load completes" },
    ],
    tech: ["Luau", "Knit", "TweenService", "SpacialUI"],
    quote: null,
    video: "uySakAWwXVo",
  },
  {
    id: "cyber-jump", name: "Cyber Jump", mono: "CJ",
    kicker: "Progression / Retention systems", accent: "accent",
    tier: "Game System", featured: true,
    summary: "A standard obby rebuilt into a competitive, high-retention experience with daily objectives, global leaderboards and a modular trait system.",
    problem: "A plain obby had nothing bringing players back the next day.",
    approach: [
      "Created a thumbnail-based character select with a locked/unlocked system that saves your selection automatically.",
      "Scripted a 30-day daily objective system on Profile Store, tracking daily logins, handling progress resets and rewarding streaks with unlocks.",
      "Added precise start/finish speedrun timers and a 0–100% progress bar.",
      "Built global leaderboards ranking the fastest completion times.",
      "Developed a modular trait framework for stats like speed and jump power, future-proofed so the owner can add new abilities without touching core code.",
    ],
    outcomes: [
      { n: "30", suf: "-day", l: "Daily objective cycle" },
      { n: "0-100", suf: "%", l: "Live progress bar" },
      { n: "Global", suf: "", l: "Speedrun leaderboard" },
    ],
    tech: ["Luau", "Profile Store", "DataStore2", "Custom UI"],
    quote: null,
    video: "aojAjDU5h2A",
  },
  {
    id: "toilet-paper-game", name: "Mission Loop & Economy", mono: "TP",
    kicker: "Progression / Client commission", accent: "primary",
    tier: "Game System", featured: false,
    summary: "A fully integrated mission-based gameplay loop connecting world interactions, inventory management and a multi-currency economy.",
    problem: "The game's missions, inventory and economy needed to work as one system — and every bit of progress had to survive a rejoin.",
    approach: [
      "Built the Legendary Backpack, which automatically grants a free legendary mission every 24 hours.",
      "Scripted mission progression including animation triggers for throwing TP and tackling, plus automated cooldowns on world objects.",
      "Persisted every mission securely through DataStore so rejoining players pick up where they left off.",
      "Scripted a persistent UI that tracks and displays mission progression accurately in real time.",
    ],
    outcomes: [
      { n: "24", suf: "h", l: "Legendary mission cycle" },
      { n: "Multi", suf: "-currency", l: "Economy" },
      { n: "Real", suf: "-time", l: "Progress UI" },
    ],
    tech: ["Luau", "Advanced DataStore", "Custom UI/UX", "Economy"],
    quote: null,
    video: "1Cn_bbk8PPA",
  },
  {
    id: "guillotine-simulator", name: "Guillotine Simulator", mono: "GL",
    kicker: "Cinematic / Atmosphere", accent: "primary",
    tier: "Game System", featured: false,
    summary: "A cinematic horror sequence built on atmosphere and timing — lighting, animation and sound synchronized to a single guillotine drop.",
    problem: "The experience had to carry its tension through atmosphere and visual storytelling rather than mechanics.",
    approach: [
      "Synchronized the guillotine sequence with reactive lighting, animations and sound effects.",
      "Scripted the environment around it — a rapidly spinning clock, a glowing radio fading between colours, floating NPCs and timed effects leading to the blade drop, followed by a seamless reset of the room.",
      "Added a global leaderboard for deaths and time played, badge rewards for milestones, and a smooth respawn interface.",
      "Built a flooding water effect and interactive doors for added realism.",
    ],
    outcomes: [
      { n: "2", suf: "", l: "Leaderboard metrics" },
      { n: "Badge", suf: "", l: "Milestone rewards" },
      { n: "Seamless", suf: "", l: "Scene reset" },
    ],
    tech: ["Luau", "TweenService", "Lighting", "Badges", "Leaderboards"],
    quote: null,
    video: "1vZlFHXBPsg",
  },
  {
    id: "gun-modification", name: "Gun Modification System", mono: "GM",
    kicker: "Weapons / Viewmodel", accent: "accent",
    tier: "Game System", featured: false,
    summary: "A complete gun system with a custom viewmodel, bullet hit and damage handling, forced first-person and a death sequence.",
    problem: "The game needed a full weapon loop: an engaging viewmodel, damage that lands where it should, and first-person framing enforced from the moment play starts.",
    approach: [
      "Built the gun system with a unique viewmodel for the firing experience.",
      "Created bullet hit and damage handling for precise detection and application.",
      "Forced first-person view at the start of the game, with the gun auto-equipped.",
      "Added a death sequence for when the player dies.",
    ],
    outcomes: [
      { n: "1", suf: "st person", l: "Forced from spawn" },
      { n: "Auto", suf: "-equip", l: "Weapon on start" },
      { n: "Custom", suf: "", l: "Viewmodel" },
    ],
    tech: ["Luau", "Viewmodel", "Hit detection", "Camera control"],
    quote: null,
    video: "c79DJoH7M4Q",
  },
  {
    id: "botverse", name: "BotVerse — Bot Builder", mono: "BV",
    kicker: "UI / Real-time preview", accent: "secondary",
    tier: "Game System", featured: false,
    summary: "A complete UI flow for a bot-building game, with a real-time viewport preview that updates as players swap chassis and mods.",
    problem: "Players needed to see exactly what they were assembling — every chassis and attachment choice represented visually before entering a match.",
    approach: [
      "Built the full flow from main menu through battle setup and customization.",
      "Integrated a real-time viewport preview into the interface that updates instantly as players switch bots or select different mod types.",
      "Kept the UI logic clean and separated from the in-engine preview rendering.",
    ],
    outcomes: [
      { n: "Real", suf: "-time", l: "Viewport preview" },
      { n: "Menu", suf: " → match", l: "Complete UI flow" },
    ],
    tech: ["Luau", "ViewportFrame", "UI state"],
    quote: null,
    video: "WSAGMiYYOnk",
  },
  {
    id: "vyn-outfits", name: "Vyn Outfits", mono: "VY",
    kicker: "Avatar / Commerce", accent: "secondary",
    tier: "Game System", featured: false,
    summary: "Interactive clothing, purchasing and leaderboard systems for an outfit experience, plus a streaming-based performance pass.",
    problem: "Browsing and buying had to stay smooth while many outfitted models sit on display at once.",
    approach: [
      "Built a complete purchasing framework supporting bulk purchase, single-item purchase, wear item and wear all.",
      "Added leaderboards tracking player spending and purchase counts, with quick access to sprinting and avatar customization.",
      "Shipped an optimized avatar customizer, streaming-based performance improvements and a fully functional emotes button.",
      "Refined the UI to closely match the reference game Matching Outfit Ideas.",
    ],
    outcomes: [
      { n: "4", suf: "", l: "Purchase and wear paths" },
      { n: "2", suf: "", l: "Leaderboard metrics" },
      { n: "Streaming", suf: "-based", l: "Performance pass" },
    ],
    tech: ["Luau", "StreamingEnabled", "Avatar customization", "Leaderboards"],
    quote: null,
    video: "2FTzxY6u76s",
  },
  {
    id: "outfit-editor", name: "Outfit Editor", mono: "OE",
    kicker: "Avatar / Commerce", accent: "accent",
    tier: "Game System", featured: false,
    summary: "Browsing, preview and purchasing systems for an outfit game — rotating model displays, per-item try-on, and a top-spender leaderboard.",
    problem: "Players needed to inspect an outfit fully — every included asset visible — then buy or wear at whatever granularity they wanted.",
    approach: [
      "Built detailed outfit displays with rotating models showcasing all included assets.",
      "Made each item individually try-on-able or purchasable, with options to wear the full outfit or buy all assets at once.",
      "Added a top-spent leaderboard to track player activity and progress.",
    ],
    outcomes: [
      { n: "4", suf: "", l: "Purchase and wear modes" },
      { n: "Rotating", suf: "", l: "Model displays" },
      { n: "Top", suf: "-spent", l: "Leaderboard" },
    ],
    tech: ["Luau", "Avatar customization", "Leaderboards", "UI"],
    quote: null,
    video: "S6Gybwr7Sg4",
  },
  {
    id: "ddakji-game", name: "Ddakji Minigame", mono: "DK",
    kicker: "Minigame / Timing", accent: "secondary",
    tier: "Game System", featured: false,
    summary: "A recreation of the traditional Korean paper-flipping challenge, with a click-speed power bar and timing indicator driving the flip.",
    problem: "The flip had to feel skill-based and readable — players need to know whether they hit it before the piece lands.",
    approach: [
      "Tracked the player's click count inside a timer window against a threshold to decide whether the piece flips.",
      "Built a visual power bar that transitions from red to yellow to green as clicking speed increases.",
      "Added a moving indicator line showing the player's timing, confirming the flip when it reaches the green zone.",
    ],
    outcomes: [
      { n: "3", suf: "", l: "Power bar stages" },
      { n: "Click", suf: "-speed", l: "Flip threshold" },
      { n: "Live", suf: "", l: "Timing feedback" },
    ],
    tech: ["Luau", "UI feedback", "Physics"],
    quote: null,
    video: "lsxs3yzL7sY",
  },
  {
    id: "loading-screen", name: "Custom Loading Screen", mono: "LS",
    kicker: "UI / First impression", accent: "primary",
    tier: "Game System", featured: false,
    summary: "A fully custom, tween-animated loading screen built for a smooth and performance-efficient transition into the game.",
    problem: "The game needed a professional first impression — a transition that felt polished without costing frames before the main game loads.",
    approach: [
      "Designed and animated the screen entirely using Roblox tweens.",
      "Tuned timing so the transition into the main game stays seamless.",
      "Kept it performance-efficient so the screen never competes with load.",
    ],
    outcomes: [
      { n: "Tween", suf: "-driven", l: "Fully custom animation" },
      { n: "Seamless", suf: "", l: "Handoff into the game" },
    ],
    tech: ["Luau", "TweenService", "UI"],
    quote: null,
    video: "dwL7ZvrzqQY",
  },
  {
    id: "gun-system", name: "Gun System Accuracy Pass", mono: "GS",
    kicker: "Weapons / Accuracy", accent: "primary",
    tier: "Fixes & cleanup", featured: false,
    summary: "Refined a laser-based shooting system so every beam travels precisely toward the player's mouse position.",
    problem: "The system simulates projectile fire with laser beams, but the beams weren't tracking where the player was actually aiming, so hit detection came out inconsistent.",
    approach: [
      "Corrected beam trajectory so each laser travels precisely toward the player's mouse position.",
      "Tightened hit detection so registration stays consistent shot to shot.",
    ],
    outcomes: [
      { n: "Exact", suf: "", l: "Mouse-position targeting" },
      { n: "Consistent", suf: "", l: "Hit detection" },
    ],
    tech: ["Luau", "Laser beam sim", "Hit detection"],
    quote: null,
    video: "LZ45WCA-Zg8",
  },
  {
    id: "prestige-obby-fixes", name: "Prestige Obby Fixes", mono: "PF",
    kicker: "Performance / Stability", accent: "accent",
    tier: "Fixes & cleanup", featured: false,
    summary: "A performance, visual and stability pass on a prestige obby — a lag-free shop, persistent skins, and reworked throw visuals.",
    problem: "The prestige shop rebuilt itself from scratch on every refresh, dropping frames on equip and unequip, and skins unequipped themselves after death.",
    approach: [
      "Redid the prestige shop so it no longer remakes itself on every refresh, removing the frame drops on equipping and unequipping.",
      "Reworked throw-item visuals to use the actual models instead of placeholder parts.",
      "Refined the troll aura to a larger gold form with a subtle glow.",
      "Fixed skins unequipping after respawn, including while using prestige throwing items.",
    ],
    outcomes: [
      { n: "0", suf: "", l: "Shop rebuilds per refresh" },
      { n: "Lag", suf: "-free", l: "Equip and unequip" },
      { n: "Persistent", suf: "", l: "Skins across respawn" },
    ],
    tech: ["Luau", "Performance profiling", "UI caching"],
    quote: null,
    video: "gmG4onAk1pQ",
  },
  {
    id: "animation-sync", name: "Animation Sync System", mono: "AS",
    kicker: "Animation / Repair", accent: "secondary",
    tier: "Fixes & cleanup", featured: false,
    summary: "Repaired and stabilized a chain-based sync system where players link together and follow a leader's dance, speed and behaviour.",
    problem: "The chain-based animation sync was unstable — players linked to a leader drifted out of step instead of following cleanly.",
    approach: [
      "Repaired the chain linking so players stay attached to their leader.",
      "Stabilized propagation of the leader's dance, speed and behaviour down the chain.",
    ],
    outcomes: [
      { n: "Chain", suf: "-based", l: "Linked player groups" },
      { n: "3", suf: "", l: "Properties kept in sync" },
    ],
    tech: ["Luau", "Animation replication"],
    quote: null,
    video: "6i1fhucMc34",
  },
  {
    id: "store-game-mods", name: "Store Game Modifications", mono: "SG",
    kicker: "Environment / Access control", accent: "primary",
    tier: "Fixes & cleanup", featured: false,
    summary: "Environment control and access systems for a store roleplay game — a timed day/night cycle, rank-gated rooms and teleport commands.",
    problem: "The game needed believable ambience and real role separation: a working clock, lights that respond to it, and areas only the right staff can enter.",
    approach: [
      "Reworked the in-game time system to open at 5 AM, with outdoor lights switching off at 6:30 AM and back on at 7 PM for seamless day–night transitions.",
      "Added a scripted switch so players can turn the kitchen lighting on and off.",
      "Gated the kitchen with transparent sections tied to group ranks, so only the cook can enter.",
      "Built a command that teleports players straight to the office.",
    ],
    outcomes: [
      { n: "5", suf: " AM", l: "Opening time" },
      { n: "2", suf: "", l: "Automatic light transitions" },
      { n: "Rank", suf: "-gated", l: "Kitchen access" },
    ],
    tech: ["Luau", "Lighting", "Region gating", "Group ranks"],
    quote: null,
    video: "6DTPw_E666s",
  },
];

/* ---- TEMPLATE — copy this block, fill it, drop it at the top of a list ----
{
  id: "folder-safe-slug",          // also the public/projects/<id>/ folder name
  name: "Project Name",
  mono: "PN",                      // 2 letters, shown big on the card
  kicker: "Category / Client commission",
  accent: "primary",               // primary=coral, secondary=blue, accent=lime
  tier: "Game System",             // Game System | Fixes & cleanup | Full build
  featured: true,                  // gives it the wide card + star
  summary: "One sentence. Shows on the card and as the page lead.",
  problem: "What the client needed, or what was broken.",
  approach: ["What I built, 1", "What I built, 2"],
  outcomes: [                      // real facts only — numbers count up, text sits still
    { n: "2", suf: "", l: "Languages" },
  ],
  tech: ["Luau", "Knit"],
  quote: null,
  video: "dQw4w9WgXcQ",            // YouTube id only, from ?v=
  images: ["/projects/folder-safe-slug/cover.jpg"],
  liveUrl: "https://www.roblox.com/games/...",
},
---------------------------------------------------------------------------- */

/* Complete games shipped end to end, as opposed to systems built into
   someone else's game. Drives the "Full Games" tab on the archive. */
export const GAMES: Project[] = [
  {
    id: "saudi-heritage", name: "Saudi Heritage Adventure", mono: "SH",
    kicker: "Educational / Client commission", accent: "accent",
    tier: "Full build", featured: true,
    summary: "A bilingual educational adventure walking players through three pillars of Saudi tradition — the Majlis, Al-Qatt Al-Asiri, and the Ardah.",
    problem: "The client needed culture taught through play rather than reading — and the whole journey playable end to end in both English and Arabic.",
    approach: [
      "Built a traditional village hub where players pick a character and are guided by three elders, one per heritage pillar.",
      "Taught the Majlis through drag-and-drop seating order and serving dates and coffee the right way.",
      "Built an Al-Qatt stage around finding a lost paintbrush while learning what each colour means, and an Ardah stage on rhythm-based footwork and sword timing.",
      "Shipped the experience fully voiced in English and Arabic with a language toggle at the start.",
      "Gated each area behind a wearable reward from the stage before it, closing on a cultural ceremony with a tiered Heritage Champion reward.",
      "Tracked progress through a quiet Cultural Points system so the focus stays on learning, not scores.",
    ],
    outcomes: [
      { n: "2", suf: "", l: "Languages, fully voiced" },
      { n: "3", suf: "", l: "Heritage pillars taught" },
      { n: "3", suf: "", l: "Elder-guided stages" },
    ],
    tech: ["Luau", "Localization", "Voiceover system"],
    quote: null,
    video: "vvRYu6jLb0s",
    liveUrl: "https://www.roblox.com/games/92079279419223/Saudi-Heritage-Adventure",
  },
];
export function projectType(item: Project): ProjectType {
  return GAMES.some((g) => g.id === item.id) ? "game" : "system";
}

export function getProject(slug: string): Project | undefined {
  return SYSTEMS.find((x) => x.id === slug) ?? GAMES.find((x) => x.id === slug);
}

/* ---- Home-page collections ---- */
export const HOME = {
  stats: [
    { n: 50, suf: "+", l: "Commissions delivered" },
    { n: 2, suf: "+ yr", l: "Building on Roblox" },
    { n: 21, suf: "", l: "Devlogs published" },
  ] satisfies Stat[],
  /* Starred = stated specialism. Combat leads; matchmaking and
     anti-cheat are real capabilities but deliberately unstarred. */
  skills: [
    { t: "Server-Authoritative Combat", star: true },
    { t: "Parry & Block Systems", star: false },
    { t: "Player Data & Session Locking", star: true },
    { t: "Event-Driven Architecture", star: true },
    { t: "Anti-Cheat & Exploit Prevention", star: false },
    { t: "Pet & Progression Systems", star: false },
    { t: "Wave & Enemy Systems", star: false },
    { t: "Matchmaking", star: false },
    { t: "Knit Framework", star: false },
    { t: "NPC Pathfinding & AI", star: false },
    { t: "Performance Optimization", star: true },
    { t: "Mobile · Console · PC UI", star: false },
  ] satisfies Skill[],
  process: [
    { t: "Discover", d: "We map the real problem — the metric that's bleeding, the dream that's stuck — and agree on what 'done' looks like." },
    { t: "Architect", d: "I design the system on paper first: data flow, server authority, failure modes. You approve the shape before code." },
    { t: "Prototype", d: "A vertical slice proves the risky part early. We feel it in-engine, not in a doc, while changes are still cheap." },
    { t: "Build", d: "Production code in small, reviewable chunks. Server-authoritative by default, tested under real network conditions." },
    { t: "Harden", d: "Load tests, exploit passes, profiling. I break it on purpose so your players never get the chance to." },
    { t: "Handoff", d: "Clean APIs, docs your team can read, and a dashboard to watch it live. I leave you owning the system, not renting it." },
  ] satisfies ProcessStep[],
  engagements: [
    {
      tier: "sprint", ribbon: "Sprint", name: "System Sprint",
      price: { pre: "from", val: "$4k", post: "/ 1–2 weeks" },
      desc: "One sharp system, scoped and shipped. Perfect for unblocking a launch.",
      feats: ["A single self-contained system", "Server-authoritative by default", "Drop-in API + docs", "1 week of fixes included"],
      cta: "Book a sprint", pop: false,
    },
    {
      tier: "project", ribbon: "Project · Most picked", name: "Project Build",
      price: { pre: "from", val: "$18k", post: "/ 4–8 weeks" },
      desc: "Multiple connected systems built into your game with you in the loop the whole way.",
      feats: ["Several integrated systems", "Architecture + prototype phase", "Load & exploit hardening", "Live-ops dashboard", "Team handoff + training"],
      cta: "Start a project", pop: true,
    },
    {
      tier: "partner", ribbon: "Partnership", name: "Studio Partner",
      price: { pre: "", val: "Retainer", post: "/ ongoing" },
      desc: "I act as your fractional systems lead — owning the hard infrastructure long-term.",
      feats: ["Dedicated days each month", "Roadmap + architecture ownership", "On-call for live incidents", "Mentoring for your engineers", "Priority on everything"],
      cta: "Talk partnership", pop: false,
    },
  ] satisfies Engagement[],
  capabilities: [
    "Luau", "Server Authority", "Replication", "Matchmaking", "Anti-Cheat", "OpenCloud",
    "MemoryStore", "DataStore", "Streaming & LOD", "Profiling", "Reactive UI", "Telemetry",
    "Lag Compensation", "Live Ops", "Tooling & DX",
  ],
  testimonials: [
    {
      text: "I just wanted to take a moment to say a huge thank you for all the incredible work you've been putting into the project. Every time you push an update, the game looks and feels significantly better. The progress on the team system, infection mechanics, and visual effects is awesome, and I'm really excited about how it's coming together.",
      nm: "Nickolas Lionberger", mono: "NL",
    },
    {
      text: "He did exactly what I needed for my car scripts for my roleplay game it took like 3 weeks but it was worth every penny and it was a good time frame of 3 weeks because it was like 50+ cars. THANK YOU FOR YOUR HELP I WILL COME BACK FOR MORE HELP IN THE FUTURE.",
      nm: "coguardianx", mono: "CO",
    },
    { text: "Very good guy working with him was stress free", nm: "mecronixa", mono: "ME" },
    { text: "Good Job well Done", nm: "varela_kris", mono: "VK" },
    { text: "Good Job well Done", nm: "adeyonugenesis2", mono: "AD" },
  ] satisfies Testimonial[],
};
