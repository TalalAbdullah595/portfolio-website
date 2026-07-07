/* project.js — vanilla renderer for Project.html (?type=system|game&id=slug) */
(function () {
  "use strict";

  /* ---------- lookup ---------- */
  var params = new URLSearchParams(location.search);
  var type = params.get("type") === "game" ? "game" : "system";
  var list = type === "game" ? window.PORTFOLIO_GAMES : window.PORTFOLIO_SYSTEMS;
  var idx = list.findIndex(function (x) { return x.id === params.get("id"); });
  if (idx < 0) idx = 0;
  var item = list[idx];
  var prev = list[(idx - 1 + list.length) % list.length];
  var next = list[(idx + 1) % list.length];
  var typeLabel = type === "game" ? "Full Game" : "Game System";

  document.title = item.name + " — Kai Voss";

  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  var accent = "var(--" + (item.accent || "secondary") + ")";

  var arrow = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h13"></path><path d="M13 6l6 6-6 6"></path></svg>';
  var arrowL = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H6"></path><path d="M11 6l-6 6 6 6"></path></svg>';
  var check = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7"></path></svg>';
  var cube = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z"></path><path d="M4 7.5l8 4.5 8-4.5M12 12v9"></path></svg>';

  function statHtml(o) {
    var numeric = /^[0-9.]+$/.test(o.n);
    var nSpan = numeric
      ? '<span data-count="' + esc(o.n) + '">0</span>'
      : '<span>' + esc(o.n) + '</span>';
    return '<div class="pstat reveal"><div class="n">' + nSpan + '<span class="suf">' + esc(o.suf) + '</span></div><div class="l">' + esc(o.l) + '</div></div>';
  }

  function chips() {
    var out = '<span class="chip solid">' + esc(typeLabel) + "</span>";
    out += '<span class="chip">' + esc(item.tier) + " engagement</span>";
    if (item.featured) out += '<span class="chip dot">Featured work</span>';
    if (item.wip) out += '<span class="chip">In development</span>';
    return out;
  }

  function pnCard(entry, dir) {
    var lbl = dir === "prev" ? arrowL + " Previous " + typeLabel.toLowerCase() : "Next " + typeLabel.toLowerCase() + " " + arrow;
    return (
      '<a class="card pn-card lift spotlight ' + dir + '" href="Project.html?type=' + type + "&id=" + encodeURIComponent(entry.id) + '">' +
      '<span class="dir">' + lbl + "</span>" +
      "<h3>" + esc(entry.name) + "</h3>" +
      '<p style="color:var(--text-dim);font-size:15px;margin:0">' + esc(entry.kicker) + "</p>" +
      "</a>"
    );
  }

  var slotBase = type + "-" + item.id;
  var mediaHtml =
    (item.video
      ? '<div class="proj-video reveal"><video src="' + esc(item.video) + '" controls playsinline></video></div>'
      : "") +
    '<div class="media-grid reveal">' +
    '<image-slot class="media-main" id="' + slotBase + '-main" radius="18" placeholder="Drop the main screenshot or GIF for ' + esc(item.name) + '"></image-slot>' +
    '<image-slot class="media-side" id="' + slotBase + '-side-a" radius="18" placeholder="Detail shot"></image-slot>' +
    '<image-slot class="media-side" id="' + slotBase + '-side-b" radius="18" placeholder="Detail shot"></image-slot>' +
    "</div>" +
    '<div class="media-note"><span class="d"></span>Drag images straight onto the frames — they save automatically and show for anyone viewing this page.</div>';

  var html =
    '<nav class="nav"><div class="nav-inner">' +
    '<a class="brand" href="Portfolio.html"><span class="mark">' + cube + '</span><span>Kai Voss<small>Roblox Scripter</small></span></a>' +
    '<div class="nav-links">' +
    '<a class="nav-link" href="Portfolio.html">Home</a>' +
    '<a class="nav-link" href="Projects.html">Projects</a>' +
    '<a class="nav-link" href="Portfolio.html#engagements">Engagements</a>' +
    "</div>" +
    '<a href="Portfolio.html#contact" class="btn btn-primary nav-cta">Hire me</a>' +
    "</div></nav>" +

    '<main class="page wrap">' +
    '<header class="proj-hero">' +
    '<div class="crumbs reveal">' + chips() + "</div>" +
    '<span class="eyebrow reveal" style="color:' + accent + '">' + esc(item.kicker) + "</span>" +
    '<h1 class="reveal" data-screen-label="' + esc(item.name) + '">' + esc(item.name) + "</h1>" +
    '<p class="lead reveal">' + esc(item.summary) + "</p>" +
    '<div class="pstats">' + item.outcomes.map(statHtml).join("") + "</div>" +
    "</header>" +

    '<section class="proj-media">' + mediaHtml + "</section>" +

    '<section class="proj-section"><div class="block">' +
    '<div><span class="eyebrow reveal">The brief</span></div>' +
    '<div class="body"><h2 class="reveal">What was breaking</h2><p class="reveal" style="margin-top:14px">' + esc(item.problem) + "</p></div>" +
    "</div></section>" +

    '<section class="proj-section"><div class="block">' +
    '<div><span class="eyebrow reveal">The work</span></div>' +
    '<div class="body"><h2 class="reveal">What I built</h2>' +
    '<ul class="approach-list" style="margin-top:18px">' +
    item.approach.map(function (a) { return '<li class="reveal"><span class="tick">' + check + "</span>" + esc(a) + "</li>"; }).join("") +
    "</ul></div></div></section>" +

    '<section class="proj-section"><div class="block">' +
    '<div><span class="eyebrow reveal">Under the hood</span></div>' +
    '<div class="body"><h2 class="reveal">Tech &amp; tools</h2>' +
    '<div class="tech-row reveal" style="margin-top:18px">' +
    item.tech.map(function (t) { return '<span class="chip dot">' + esc(t) + "</span>"; }).join("") +
    "</div></div></section>" +

    (item.quote
      ? '<section class="proj-quote reveal"><div class="card spotlight"><blockquote>“' + esc(item.quote.text) + "”</blockquote>" +
        '<div class="who"><span class="av">' + esc(item.quote.who.split(" ").map(function (w) { return w[0]; }).join("")) + "</span>" +
        '<div><div class="nm">' + esc(item.quote.who) + '</div><div class="rl">' + esc(item.quote.role) + "</div></div></div></div></section>"
      : "") +

    '<div class="pn-grid">' + pnCard(prev, "prev") + pnCard(next, "next") + "</div>" +

    '<section class="proj-cta reveal">' +
    "<h2>Want something like " + esc(item.name) + "?</h2>" +
    "<p>This kind of system can be scoped as a sprint or folded into a bigger build. Tell me what you're making.</p>" +
    '<a href="Portfolio.html#contact" class="btn btn-accent btn-lg">Start a conversation ' + arrow + "</a>" +
    "</section>" +

    '<footer class="proj-foot"><span>© 2026 Kai Voss · Roblox Scripter</span><a href="Portfolio.html" style="font-family:Fredoka;color:var(--text)">← Back to home</a></footer>' +
    "</main>";

  document.getElementById("app").innerHTML = html;

  /* ---------- reading progress ---------- */
  var bar = document.querySelector(".read-progress");
  function onScroll() {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- reveal (visible by default; animate only when page is visible) ---------- */
  var revealIO = ("IntersectionObserver" in window) ? new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); revealIO.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -7% 0px" }) : null;

  function startReveals() {
    document.documentElement.classList.add("anim-on");
    var els = Array.prototype.slice.call(document.querySelectorAll(".reveal:not(.in)"));
    if (!revealIO) { els.forEach(function (e) { e.classList.add("in"); }); return; }
    els.forEach(function (e) { revealIO.observe(e); });
    setTimeout(function () { els.forEach(function (e) { e.classList.add("in"); }); }, 2000);
  }
  if (document.visibilityState === "visible") {
    startReveals();
  } else {
    document.addEventListener("visibilitychange", function onVis() {
      if (document.visibilityState === "visible") {
        document.removeEventListener("visibilitychange", onVis);
        startReveals();
      }
    });
  }

  /* ---------- count-up ---------- */
  var counters = Array.prototype.slice.call(document.querySelectorAll("[data-count]"));
  var cio = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      cio.unobserve(e.target);
      var el = e.target;
      var end = parseFloat(el.getAttribute("data-count"));
      var dp = (String(end).split(".")[1] || "").length;
      var t0 = performance.now();
      (function step(now) {
        var p = Math.min(1, (now - t0) / 1400);
        el.textContent = (end * (1 - Math.pow(1 - p, 3))).toFixed(dp);
        if (p < 1) requestAnimationFrame(step);
      })(t0);
    });
  }, { threshold: 0.5 });
  counters.forEach(function (c) { cio.observe(c); });
  setTimeout(function () {
    counters.forEach(function (c) {
      var end = parseFloat(c.getAttribute("data-count"));
      var dp = (String(end).split(".")[1] || "").length;
      if (parseFloat(c.textContent) !== end) c.textContent = end.toFixed(dp);
    });
  }, 2600);

  /* ---------- cursor glow + card spotlight ---------- */
  var glow = document.querySelector(".cursor-glow");
  var raf = 0, lx = 0, ly = 0;
  window.addEventListener("pointermove", function (e) {
    lx = e.clientX; ly = e.clientY;
    if (raf) return;
    raf = requestAnimationFrame(function () {
      raf = 0;
      if (glow) glow.style.transform = "translate3d(" + (lx - 230) + "px," + (ly - 230) + "px,0)";
      document.querySelectorAll(".card.spotlight").forEach(function (c) {
        var r = c.getBoundingClientRect();
        if (lx >= r.left && lx <= r.right && ly >= r.top && ly <= r.bottom) {
          c.style.setProperty("--mx", (lx - r.left) + "px");
          c.style.setProperty("--my", (ly - r.top) + "px");
        }
      });
    });
  });
})();
