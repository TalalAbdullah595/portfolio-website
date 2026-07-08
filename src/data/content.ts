/* ============================================================
   content.ts — all site copy, ported from the design handoff's
   portfolio-data.js. Systems + games power the work cards and
   the project detail pages; HOME holds the home-page collections.
   ============================================================ */

export type Accent = "primary" | "secondary" | "accent";

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
  tier: "Sprint" | "Project" | "Partnership" | "Game";
  featured: boolean;
  wip?: boolean;
  summary: string;
  problem: string;
  approach: string[];
  outcomes: Outcome[];
  tech: string[];
  quote: Quote | null;
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
  stars: number;
  text: string;
  nm: string;
  role: string;
  mono: string;
}

export const SYSTEMS: Project[] = [
  {
    id: "apex-matchmaking", name: "Apex Matchmaking", mono: "AX",
    kicker: "Multiplayer / Matchmaking", accent: "primary",
    tier: "Partnership", featured: true,
    summary: "Skill-based matchmaking that fills lobbies in under 5 seconds across 40+ regions.",
    problem: "A 600k-DAU shooter was losing players to 30s+ queue times and lopsided matches that gutted retention.",
    approach: [
      "Designed a two-pass MMR + latency solver running on a dedicated matchmaking service.",
      "Built backfill so half-empty rounds top up without a full re-queue.",
      "Added confidence decay so returning players re-calibrate in a handful of games.",
    ],
    outcomes: [{ n: "78", suf: "%", l: "faster queues" }, { n: "4.6", suf: "s", l: "median match time" }, { n: "+19", suf: "%", l: "D7 retention" }],
    tech: ["Luau", "MessagingService", "MemoryStore", "OpenCloud", "Rust solver"],
    quote: { text: "Queue complaints went to basically zero overnight. Apex just works.", who: "Dana Okafor", role: "Exec Producer, Tracer Studios" },
  },
  {
    id: "choreo-sync", name: "Choreo Sync", mono: "CS",
    kicker: "Replication / Animation", accent: "secondary",
    tier: "Project", featured: false,
    summary: "Deterministic animation replication that keeps 30-player set pieces in lockstep.",
    problem: "Synchronized dance and combat sequences drifted badly on high-ping clients, breaking the spectacle.",
    approach: [
      "Authored a fixed-timestep choreography clock with server-stamped keyframes.",
      "Interpolated client playback against a shared timeline rather than per-event messages.",
      "Built an authoring tool so designers script sequences without touching networking code.",
    ],
    outcomes: [{ n: "30", suf: "", l: "players in sync" }, { n: "0", suf: "ms", l: "perceived drift" }, { n: "12", suf: "x", l: "less bandwidth" }],
    tech: ["Luau", "AnimationController", "Custom timeline DSL", "Profiler"],
    quote: { text: "Our concert mode finally looks the same on everyone's screen.", who: "Liam Reyes", role: "Tech Lead, Wavelength" },
  },
  {
    id: "cinematic-loader", name: "Cinematic Loader", mono: "CL",
    kicker: "Streaming / First-run", accent: "accent",
    tier: "Sprint", featured: false,
    summary: "A streaming-aware loading experience that hides pop-in behind a directed intro.",
    problem: "Players were dropped into half-streamed worlds with texture pop and floating assets on first join.",
    approach: [
      "Gated spawn on a content-readiness signal tied to StreamingEnabled regions.",
      "Directed a short camera fly-in that masks the exact moment assets resolve.",
      "Added a graceful low-end path that shortens the intro on weak devices.",
    ],
    outcomes: [{ n: "92", suf: "%", l: "fewer pop-in reports" }, { n: "1.8", suf: "s", l: "to interactive" }, { n: "+8", suf: "%", l: "first-session length" }],
    tech: ["Luau", "StreamingEnabled", "TweenService", "ContentProvider"],
    quote: null,
  },
  {
    id: "sentinel-anticheat", name: "Sentinel Anti-Cheat", mono: "SN",
    kicker: "Security / Server-auth", accent: "primary",
    tier: "Partnership", featured: true,
    summary: "Server-authoritative movement & economy validation that cut exploit incidents by 96%.",
    problem: "An economy game was hemorrhaging value to speed hacks, item dupes, and remote-event abuse.",
    approach: [
      "Moved every economy mutation behind validated server requests with rate budgets.",
      "Built a movement sanity model flagging impossible deltas without punishing lag.",
      "Shipped a live ops dashboard so the team triages flags instead of reading logs.",
    ],
    outcomes: [{ n: "96", suf: "%", l: "fewer exploits" }, { n: "0", suf: "", l: "dupe events post-launch" }, { n: "24/7", suf: "", l: "live flag triage" }],
    tech: ["Luau", "Server validation", "OpenCloud", "Anomaly model", "Webhooks"],
    quote: { text: "Sentinel paid for itself in the first week. The dupes just stopped.", who: "Priya Nandakumar", role: "Owner, Vaultworks" },
  },
  {
    id: "morph-kit", name: "Morph Kit", mono: "MK",
    kicker: "Avatars / Customization", accent: "secondary",
    tier: "Project", featured: false,
    summary: "A modular avatar morph & layered-clothing system with instant in-game preview.",
    problem: "Custom characters needed dozens of swappable parts without tanking memory or load time.",
    approach: [
      "Built a part-registry that streams and pools meshes by slot instead of cloning rigs.",
      "Designed a layered accessory solver that resolves clipping deterministically.",
      "Exposed a clean API so other systems request looks without knowing the internals.",
    ],
    outcomes: [{ n: "240", suf: "+", l: "mix-and-match parts" }, { n: "63", suf: "%", l: "less avatar memory" }, { n: "<1", suf: "f", l: "swap latency" }],
    tech: ["Luau", "Mesh pooling", "Accessory API", "EditableImage"],
    quote: null,
  },
  {
    id: "hex-combat", name: "Hex Combat", mono: "HX",
    kicker: "Combat / Gameplay", accent: "primary",
    tier: "Partnership", featured: true,
    summary: "A snappy, server-fair melee + ability combat framework with hitbox rewind.",
    problem: "Combat felt mushy and unfair: hits that looked clean missed, and laggy players got punished.",
    approach: [
      "Implemented lag-compensated hitbox rewind so the server judges what the player saw.",
      "Built a data-driven ability graph designers tune without engineering tickets.",
      "Added client prediction with reconciliation for responsive-feeling strikes.",
    ],
    outcomes: [{ n: "120", suf: "", l: "tunable abilities" }, { n: "98", suf: "%", l: "hit-reg accuracy" }, { n: "+27", suf: "%", l: "combat session time" }],
    tech: ["Luau", "Lag compensation", "Ability graph DSL", "Client prediction"],
    quote: { text: "It's the first Roblox combat that feels genuinely fair to fight in.", who: "Marcus Hale", role: "Game Director, Ironhide" },
  },
  {
    id: "beacon-telemetry", name: "Beacon Telemetry", mono: "BT",
    kicker: "Analytics / Live ops", accent: "accent",
    tier: "Project", featured: false,
    summary: "A lightweight event pipeline that turns raw play sessions into funnels the team reads daily.",
    problem: "The studio was flying blind — no funnels, no retention cohorts, just gut feel.",
    approach: [
      "Designed a batched, sampling-aware client logger that barely touches the frame budget.",
      "Streamed events through OpenCloud into a warehouse with ready-made funnel views.",
      "Built guardrails so a logging mistake can never spam or stall the server.",
    ],
    outcomes: [{ n: "40", suf: "M", l: "events/day" }, { n: "0.3", suf: "ms", l: "client cost/frame" }, { n: "9", suf: "", l: "live dashboards" }],
    tech: ["Luau", "OpenCloud", "BigQuery", "Batched logger"],
    quote: null,
  },
  {
    id: "quest-engine", name: "Quest Engine", mono: "QE",
    kicker: "Progression / Content", accent: "secondary",
    tier: "Project", featured: false,
    summary: "A data-driven quest & objective system designers author entirely in spreadsheets.",
    problem: "Every new quest meant an engineer wiring bespoke logic — content velocity was crawling.",
    approach: [
      "Modeled quests as composable conditions + rewards loaded from structured data.",
      "Built a validator that catches broken quest graphs before they ship.",
      "Added save-safe progress tracking that survives schema changes.",
    ],
    outcomes: [{ n: "300", suf: "+", l: "quests shipped" }, { n: "0", suf: "", l: "engineer hours/quest" }, { n: "5", suf: "x", l: "content velocity" }],
    tech: ["Luau", "Data-driven design", "DataStore2", "Schema validation"],
    quote: { text: "Our designers ship a week of quests in an afternoon now.", who: "Sofia Lindqvist", role: "Content Lead, Mythwright" },
  },
  {
    id: "playersafe-comms", name: "PlayerSafe Comms", mono: "PS",
    kicker: "Safety / Social", accent: "accent",
    tier: "Sprint", featured: false,
    summary: "Age-aware chat & social features built to pass policy review the first time.",
    problem: "A social game needed rich comms for a young audience without tripping safety policy.",
    approach: [
      "Layered platform text filtering with context-aware rate and intent limits.",
      "Designed age-appropriate channels and a clean report-to-resolution flow.",
      "Documented the safety model so policy review was a rubber stamp.",
    ],
    outcomes: [{ n: "1", suf: "st", l: "policy pass" }, { n: "0", suf: "", l: "safety escalations" }, { n: "100", suf: "%", l: "filtered surfaces" }],
    tech: ["Luau", "TextChatService", "Policy API", "Report pipeline"],
    quote: null,
  },
  {
    id: "voxel-streaming", name: "Voxel Streaming v2", mono: "VX",
    kicker: "Terrain / Streaming", accent: "secondary",
    tier: "Project", featured: false, wip: true,
    summary: "Chunked voxel terrain that streams an effectively endless world at a stable frame rate.",
    problem: "An open-world build choked the moment the map grew past a few thousand studs.",
    approach: [
      "Split the world into LOD-aware chunks that load and unload around each player.",
      "Built a greedy mesher that collapses voxel faces to keep triangle counts sane.",
      "Pooled chunk meshes so streaming never triggers a GC stall.",
    ],
    outcomes: [{ n: "∞", suf: "", l: "world size (chunked)" }, { n: "60", suf: "fps", l: "while streaming" }, { n: "70", suf: "%", l: "fewer draw calls" }],
    tech: ["Luau", "Greedy meshing", "Chunk LOD", "EditableMesh"],
    quote: null,
  },
  {
    id: "lumen-ui", name: "Lumen UI", mono: "LU",
    kicker: "UI Framework / DX", accent: "primary",
    tier: "Project", featured: false,
    summary: "A reactive UI framework that makes Roblox interfaces feel like a real component library.",
    problem: "UI code was a tangle of manual instance juggling that nobody wanted to touch.",
    approach: [
      "Built a declarative, state-driven component layer with automatic cleanup.",
      "Added a spring animation system so motion is one prop, not a tween soup.",
      "Shipped a starter kit of accessible, themeable components.",
    ],
    outcomes: [{ n: "50", suf: "+", l: "shared components" }, { n: "55", suf: "%", l: "less UI code" }, { n: "1", suf: "", l: "source of truth" }],
    tech: ["Luau", "Reactive state", "Spring motion", "Theming"],
    quote: { text: "Lumen made UI the part of the codebase people actually enjoy.", who: "Theo Bianchi", role: "Eng Lead, Brightline" },
  },
  {
    id: "replay-vault", name: "Replay Vault", mono: "RV",
    kicker: "Recording / Esports", accent: "accent",
    tier: "Sprint", featured: false, wip: true,
    summary: "Deterministic match recording & playback for highlights, esports, and dispute review.",
    problem: "There was no way to review a contested match or cut a highlight after the round ended.",
    approach: [
      "Recorded compact input + state deltas instead of raw frames.",
      "Built a deterministic re-sim so playback reconstructs the match exactly.",
      "Added a scrubbable timeline with free-cam for highlight capture.",
    ],
    outcomes: [{ n: "98", suf: "%", l: "size reduction" }, { n: "1", suf: "click", l: "to highlight" }, { n: "0", suf: "", l: "playback desync" }],
    tech: ["Luau", "Deterministic sim", "Delta encoding", "Free-cam"],
    quote: null,
  },
];

export const GAMES: Project[] = [
  {
    id: "striker-fc", name: "Striker FC", mono: "SF",
    kicker: "Sports / Competitive", accent: "primary", tier: "Game", featured: true,
    summary: "A fast, fair 5v5 football game with skill-based matchmaking and lag-compensated touches.",
    problem: "The studio wanted competitive football that felt fair across wildly different pings.",
    approach: ["Integrated Apex Matchmaking + Hex Combat's lag-comp core for fair touches.", "Built the ball physics and shot model from scratch for predictability.", "Tuned a ranked ladder with seasonal resets."],
    outcomes: [{ n: "2.1", suf: "M", l: "visits" }, { n: "4.7", suf: "★", l: "rating" }, { n: "31", suf: "%", l: "D1 retention" }],
    tech: ["Luau", "Custom physics", "Matchmaking", "Ranked ladder"],
    quote: { text: "Kai owned the systems that made Striker feel pro.", who: "Dana Okafor", role: "Exec Producer" },
  },
  {
    id: "mesozoic", name: "Mesozoic", mono: "MZ",
    kicker: "Survival / Open world", accent: "secondary", tier: "Game", featured: true,
    summary: "A dino survival sandbox with streaming terrain and a deep crafting economy.",
    problem: "An ambitious open world kept falling over on memory and exploited crafting.",
    approach: ["Shipped Voxel Streaming v2 for the endless map.", "Hardened the economy with Sentinel anti-cheat.", "Built the taming + crafting progression loops."],
    outcomes: [{ n: "5.4", suf: "M", l: "visits" }, { n: "60", suf: "fps", l: "open world" }, { n: "44", suf: "min", l: "avg session" }],
    tech: ["Luau", "Voxel streaming", "Anti-cheat", "Crafting economy"],
    quote: null,
  },
  {
    id: "vacant-skies", name: "Vacant Skies", mono: "VS",
    kicker: "Exploration / Flight", accent: "accent", tier: "Game", featured: false,
    summary: "A serene sky-island explorer about gliding between floating ruins and forgotten machines.",
    problem: "Seamless flight across huge distances without loading seams or motion sickness.",
    approach: ["Used chunked streaming tuned for high-speed flight.", "Built a glide model with readable, forgiving controls.", "Directed a Cinematic Loader intro that sets the mood."],
    outcomes: [{ n: "900", suf: "k", l: "visits" }, { n: "4.8", suf: "★", l: "rating" }, { n: "12", suf: "", l: "sky regions" }],
    tech: ["Luau", "Streaming", "Flight model", "Cinematic loader"],
    quote: { text: "It feels like a calm, beautiful console game — on Roblox.", who: "Iris Vance", role: "Creative Director" },
  },
  {
    id: "nightowl", name: "Nightowl", mono: "NO",
    kicker: "Co-op / Horror", accent: "primary", tier: "Game", featured: false,
    summary: "A tense 4-player co-op horror where comms, light, and nerves are your only tools.",
    problem: "Co-op horror lives or dies on synchronized scares and trustworthy proximity voice.",
    approach: ["Synchronized scripted scares with Choreo Sync.", "Tuned PlayerSafe Comms for proximity chat.", "Built an AI director that paces tension per run."],
    outcomes: [{ n: "1.3", suf: "M", l: "visits" }, { n: "68", suf: "%", l: "play with friends" }, { n: "4.6", suf: "★", l: "rating" }],
    tech: ["Luau", "Choreo Sync", "Proximity comms", "AI director"],
    quote: null,
  },
  {
    id: "glassroots", name: "Glassroots", mono: "GR",
    kicker: "Building / Tycoon", accent: "secondary", tier: "Game", featured: false,
    summary: "A cozy build-and-trade tycoon where greenhouses you design actually simulate.",
    problem: "Player builds needed to persist, simulate, and trade without save corruption.",
    approach: ["Built save-safe persistence on the Quest Engine's data layer.", "Simulated plant growth on a server tick budget.", "Added a player-to-player trading market with anti-cheat."],
    outcomes: [{ n: "780", suf: "k", l: "visits" }, { n: "0", suf: "", l: "save losses" }, { n: "26", suf: "min", l: "avg session" }],
    tech: ["Luau", "Persistence", "Simulation", "Trading market"],
    quote: { text: "Players trust their builds are safe — that's everything for a tycoon.", who: "Sofia Lindqvist", role: "Content Lead" },
  },
  {
    id: "aetheric", name: "Aetheric", mono: "AE",
    kicker: "Action MMO / Magic", accent: "accent", tier: "Game", featured: true, wip: true,
    summary: "An in-development action MMO where spellcasting is a live, server-fair combat language.",
    problem: "MMO-scale combat that stays fair and readable with dozens of players casting at once.",
    approach: ["Scaling Hex Combat's ability graph to MMO encounter sizes.", "Streaming the world with Voxel Streaming v2.", "Recording boss fights with Replay Vault for balance review."],
    outcomes: [{ n: "2026", suf: "", l: "target launch" }, { n: "60", suf: "", l: "abilities in beta" }, { n: "40", suf: "", l: "player raids" }],
    tech: ["Luau", "Ability graph", "Voxel streaming", "Replay Vault"],
    quote: null,
  },
];

export function projectType(item: Project): ProjectType {
  return item.tier === "Game" ? "game" : "system";
}

export function getProject(slug: string): Project | undefined {
  return SYSTEMS.find((x) => x.id === slug) ?? GAMES.find((x) => x.id === slug);
}

/* ---- Home-page collections ---- */
export const HOME = {
  stats: [
    { n: 60, suf: "+", l: "Systems shipped" },
    { n: 18, suf: "M", l: "Players reached" },
    { n: 7, suf: "yr", l: "On the platform" },
    { n: 96, suf: "%", l: "Repeat clients" },
  ] satisfies Stat[],
  skills: [
    { t: "Server-Authoritative Architecture", star: true },
    { t: "Networking & Replication", star: false },
    { t: "Anti-Cheat & Security", star: true },
    { t: "Matchmaking", star: false },
    { t: "Luau Performance", star: true },
    { t: "Combat Systems", star: false },
    { t: "OpenCloud & Live Ops", star: false },
    { t: "Reactive UI Frameworks", star: false },
    { t: "Streaming & LOD", star: true },
    { t: "Telemetry & Analytics", star: false },
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
    { stars: 5, text: "Kai is the rare engineer who makes the hard infrastructure invisible. Our players just feel that it's better.", nm: "Dana Okafor", role: "Exec Producer, Tracer Studios", mono: "DO" },
    { stars: 5, text: "Sentinel stopped our dupe economy bleeding in a week. Easiest ROI we've ever signed off on.", nm: "Priya Nandakumar", role: "Owner, Vaultworks", mono: "PN" },
    { stars: 5, text: "He writes systems my team can actually own after he leaves. The docs alone were worth it.", nm: "Theo Bianchi", role: "Eng Lead, Brightline", mono: "TB" },
    { stars: 5, text: "First Roblox combat that's ever felt genuinely fair. Hex Combat is a cheat code for retention.", nm: "Marcus Hale", role: "Game Director, Ironhide", mono: "MH" },
    { stars: 5, text: "Our designers ship a week of content in an afternoon now. Quest Engine changed how we work.", nm: "Sofia Lindqvist", role: "Content Lead, Mythwright", mono: "SL" },
    { stars: 5, text: "Calm, senior, and impossible to rattle during a live incident. I'd hire Kai for anything.", nm: "Iris Vance", role: "Creative Director, Skybound", mono: "IV" },
  ] satisfies Testimonial[],
};
