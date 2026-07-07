/* projects.js — renders the Projects archive (Systems / Full Games tabs) */
(function () {
  "use strict";

  var SYSTEMS = window.PORTFOLIO_SYSTEMS || [];
  var GAMES = window.PORTFOLIO_GAMES || [];

  var arrow = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h13"></path><path d="M13 6l6 6-6 6"></path></svg>';
  var star = '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true"><path d="M12 3.2l2.5 5.3 5.8.7-4.3 4 1.1 5.8L12 16.9 6.9 19l1.1-5.8-4.3-4 5.8-.7L12 3.2z"></path></svg>';
  var cube = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z"></path><path d="M4 7.5l8 4.5 8-4.5M12 12v9"></path></svg>';

  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function tintFor(a) { return a === "primary" ? "t3" : a === "secondary" ? "t2" : a === "accent" ? "t4" : "t1"; }
  function monoColor(a) { return "var(--" + (a || "secondary") + ")"; }

  function card(item, type, feat) {
    var href = "Project.html?type=" + type + "&id=" + encodeURIComponent(item.id);
    var wip = item.wip ? '<span class="chip" style="margin-left:10px;font-size:12px;padding:3px 10px">WIP</span>' : "";
    var starFlag = item.featured ? '<span class="star-flag">' + star + "</span>" : "";
    var glyphSize = feat ? 104 : 76;
    return (
      '<a class="work-card card spotlight lift reveal' + (feat ? " feat" : "") + '" href="' + href + '">' +
        '<div class="thumb ' + tintFor(item.accent) + '">' +
          '<span class="glyph glyph3d txt" style="color:' + monoColor(item.accent) + ";font-size:" + glyphSize + 'px">' + esc(item.mono) + "</span>" +
          '<span class="badge-tier chip solid">' + esc(item.tier) + "</span>" +
          starFlag +
        "</div>" +
        '<div class="work-body">' +
          '<div class="kicker">' + esc(item.kicker) + "</div>" +
          "<h3>" + esc(item.name) + wip + "</h3>" +
          "<p>" + esc(item.summary) + "</p>" +
          '<div class="work-meta">' + item.tech.slice(0, 3).map(function (t) { return '<span class="chip">' + esc(t) + "</span>"; }).join("") + "</div>" +
          '<div class="work-go">View project ' + arrow.replace('width="16" height="16"', 'width="16" height="16" class="arr"') + "</div>" +
        "</div>" +
      "</a>"
    );
  }

  /* ---------- tier filters (systems only) ---------- */
  var TIERS = ["All", "Sprint", "Project", "Partnership"];
  var activeTier = "All";

  function renderSystems() {
    var items = SYSTEMS.filter(function (x) { return activeTier === "All" || x.tier === activeTier; });
    if (!items.length) return '<div class="empty-note">No systems in this category yet.</div>';
    return '<div class="arc-grid">' + items.map(function (x) { return card(x, "system", !!x.featured); }).join("") + "</div>";
  }

  function renderGames() {
    return '<div class="arc-grid games">' + GAMES.map(function (x) { return card(x, "game", false); }).join("") + "</div>";
  }

  /* ---------- page shell ---------- */
  var html =
    '<nav class="nav"><div class="nav-inner">' +
      '<a class="brand" href="Portfolio.html"><span class="mark">' + cube + '</span><span>Kai Voss<small>Roblox Scripter</small></span></a>' +
      '<div class="nav-links">' +
        '<a class="nav-link" href="Portfolio.html">Home</a>' +
        '<a class="nav-link active" href="Projects.html">Projects</a>' +
        '<a class="nav-link" href="Portfolio.html#engagements">Engagements</a>' +
        '<a class="nav-link" href="Portfolio.html#reception">Reception</a>' +
      "</div>" +
      '<a href="Portfolio.html#contact" class="btn btn-primary nav-cta">Hire me</a>' +
    "</div></nav>" +

    '<main class="page wrap">' +
      '<header class="arc-hero">' +
        '<span class="eyebrow reveal">My portfolio</span>' +
        '<h1 class="reveal" data-screen-label="Projects">Work I\'ve<br /><span class="stroke">shipped.</span></h1>' +
        '<p class="lead reveal">A complete look at what I\'ve built — the reusable systems I script and the full games they power. Pick a tab, filter by engagement, and open any card for the complete project overview.</p>' +

        '<div class="tabbar-wrap reveal">' +
          '<div class="tabbar" role="tablist">' +
            '<button class="tab active" data-tab="systems" role="tab">Game Systems <span class="count">' + SYSTEMS.length + "</span></button>" +
            '<button class="tab" data-tab="games" role="tab">Full Games <span class="count">' + GAMES.length + "</span></button>" +
          "</div>" +
        "</div>" +
      "</header>" +

      '<section class="arc-panel" id="panel-systems">' +
        '<div class="filters reveal">' +
          '<span class="flabel">Filter by engagement</span>' +
          TIERS.map(function (t) { return '<button class="fchip' + (t === "All" ? " active" : "") + '" data-tier="' + t + '">' + t + "</button>"; }).join("") +
        "</div>" +
        '<div id="systems-grid">' + renderSystems() + "</div>" +
      "</section>" +

      '<section class="arc-panel" id="panel-games" hidden>' +
        '<div id="games-grid">' + renderGames() + "</div>" +
      "</section>" +

      '<footer class="arc-foot"><span>© 2026 Kai Voss · Roblox Scripter</span><a href="Portfolio.html" style="font-family:Fredoka;color:var(--text)">← Back to home</a></footer>' +
    "</main>";

  document.getElementById("app").innerHTML = html;

  /* ---------- tab switching ---------- */
  var tabs = Array.prototype.slice.call(document.querySelectorAll(".tab"));
  var panels = { systems: document.getElementById("panel-systems"), games: document.getElementById("panel-games") };

  function setHashTab(name) {
    try { history.replaceState(null, "", "#" + name); } catch (e) {}
  }

  function activate(name, doScroll) {
    tabs.forEach(function (t) { t.classList.toggle("active", t.getAttribute("data-tab") === name); });
    Object.keys(panels).forEach(function (k) {
      var p = panels[k];
      if (k === name) { p.hidden = false; p.classList.add("swapping"); requestAnimationFrame(function () { p.classList.remove("swapping"); }); }
      else { p.hidden = true; }
    });
    setHashTab(name);
    observeReveals();
    if (doScroll) {
      var top = document.querySelector(".tabbar-wrap").getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: top, behavior: "smooth" });
    }
  }

  tabs.forEach(function (t) {
    t.addEventListener("click", function () { activate(t.getAttribute("data-tab"), true); });
  });

  /* ---------- tier filter ---------- */
  function bindFilters() {
    Array.prototype.slice.call(document.querySelectorAll(".fchip")).forEach(function (c) {
      c.addEventListener("click", function () {
        activeTier = c.getAttribute("data-tier");
        document.querySelectorAll(".fchip").forEach(function (x) { x.classList.toggle("active", x === c); });
        document.getElementById("systems-grid").innerHTML = renderSystems();
        observeReveals();
      });
    });
  }
  bindFilters();

  /* open correct tab from hash */
  var initial = (location.hash || "").replace("#", "");
  if (initial === "games") activate("games", false);

  /* ---------- reveal (visible by default; animate only when page is visible) ---------- */
  var io = ("IntersectionObserver" in window) ? new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }) : null;

  function observeReveals() {
    if (!document.documentElement.classList.contains("anim-on")) return;
    var els = Array.prototype.slice.call(document.querySelectorAll(".arc-panel:not([hidden]) .reveal:not(.in), .arc-hero .reveal:not(.in)"));
    if (!io) { els.forEach(function (e) { e.classList.add("in"); }); return; }
    els.forEach(function (e, i) { e.style.transitionDelay = Math.min(i * 35, 320) + "ms"; io.observe(e); });
    setTimeout(function () { els.forEach(function (e) { e.classList.add("in"); }); }, 2000);
  }

  function startReveals() {
    document.documentElement.classList.add("anim-on");
    observeReveals();
  }
  if (document.visibilityState === "visible") {
    startReveals();
  } else {
    // Loaded in a background/throttled tab: keep content statically visible
    // (transitions freeze at t=0 when not painting). Animate once shown.
    document.addEventListener("visibilitychange", function onVis() {
      if (document.visibilityState === "visible") {
        document.removeEventListener("visibilitychange", onVis);
        startReveals();
      }
    });
  }

  /* ---------- nav hide on scroll-down ---------- */
  var navEl = document.querySelector(".nav");
  var lastY = 0;
  window.addEventListener("scroll", function () {
    var y = window.scrollY;
    if (navEl) navEl.classList.toggle("hide", y > 600 && y > lastY);
    lastY = y;
  }, { passive: true });

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
