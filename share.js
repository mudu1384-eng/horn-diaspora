/* Kamjaroon Online: breadcrumb, share bar and font size for article pages */
(function () {
  var lang = "so";
  try { lang = localStorage.getItem("kj-lang") || "so"; } catch (e) {}
  var T = lang === "en"
    ? { home: "Home", news: "News", share: "Share", copy: "Copy link", copied: "Copied!", size: "Font size" }
    : { home: "Hoyga", news: "Wararka", share: "La wadaag", copy: "Koobiyee link-ga", copied: "Waa la koobiyeeyay!", size: "Cabbirka qoraalka" };

  var art = document.querySelector(".article");
  var meta = art && art.querySelector(".meta");
  if (!art || !meta) return;

  var css = document.createElement("style");
  css.textContent =
    ".crumb{font-size:.85rem;color:var(--muted);margin-bottom:14px}" +
    ".crumb a{color:var(--accent);text-decoration:none;font-weight:600}" +
    ".crumb a:hover{text-decoration:underline}" +
    ".sharebar{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin:18px 0 6px;padding:12px 0;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}" +
    ".sharebar .lbl{font:700 .72rem Inter,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin-right:4px}" +
    ".sharebar a,.sharebar button{display:inline-flex;align-items:center;justify-content:center;gap:6px;height:34px;min-width:34px;padding:0 10px;border-radius:8px;border:0;color:#fff;text-decoration:none;font:600 .8rem Inter,sans-serif;cursor:pointer;transition:transform .15s,opacity .15s}" +
    ".sharebar a:hover,.sharebar button:hover{transform:translateY(-2px);opacity:.92}" +
    ".sharebar svg{width:16px;height:16px;fill:currentColor}" +
    ".sharebar .fsz{margin-left:auto;display:flex;gap:4px;align-items:center}" +
    ".sharebar .fsz button{background:var(--card);color:var(--ink);border:1px solid var(--line);min-width:36px;padding:0 8px}" +
    ".sharebar .fsz button:hover{border-color:var(--accent);color:var(--accent)}" +
    ".article-body p,.article-body li{font-size:calc(1.1rem * var(--fz,1))}" +
    "@media(max-width:560px){.sharebar .t{display:none}.sharebar .fsz{margin-left:0}}";
  document.head.appendChild(css);

  // Breadcrumb
  var crumb = document.createElement("div");
  crumb.className = "crumb";
  crumb.innerHTML = '<a href="./">' + T.home + '</a> › <a href="./#posts">' + T.news + "</a>";
  var tag = art.querySelector(".tag");
  art.insertBefore(crumb, tag || art.firstChild);
  var back = art.querySelector(".back");
  if (back) { var br = back.nextElementSibling; if (br && br.tagName === "BR") br.remove(); back.remove(); }

  // Share links
  var url = location.href.split("#")[0].split("?")[0];
  var title = (art.querySelector("h1") || document).textContent.trim();
  var u = encodeURIComponent(url), t = encodeURIComponent(title);
  var I = {
    fb: '<svg viewBox="0 0 24 24"><path d="M14 8h3V4h-3c-2.8 0-4 1.7-4 4.3V10H7v4h3v8h4v-8h3l1-4h-4V8.6c0-.4.2-.6.6-.6z"/></svg>',
    ms: '<svg viewBox="0 0 24 24"><path d="M12 2C6.4 2 2 6.1 2 11.7c0 2.9 1.2 5.5 3.2 7.2V22l3-1.6c1.2.3 2.4.5 3.8.5 5.6 0 10-4.1 10-9.7S17.6 2 12 2zm1 13l-2.6-2.7-5 2.7 5.5-5.8 2.6 2.7 4.9-2.7z"/></svg>',
    x: '<svg viewBox="0 0 24 24"><path d="M17.8 3h3.1l-6.8 7.8L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.3-8.3L1.9 3h6.4l4.4 5.8zm-1.1 16.2h1.7L7.4 4.7H5.6z"/></svg>',
    wa: '<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.3-.5 0-1 .2-3.3-.7-2.8-1.1-4.5-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.7-.1l.9-1.1c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.2z"/></svg>',
    li: '<svg viewBox="0 0 24 24"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4z"/></svg>',
    tg: '<svg viewBox="0 0 24 24"><path d="M21.9 4.3 18.7 19.6c-.2 1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.3-5 9.1-8.2c.4-.4-.1-.6-.6-.2L6.2 13.3l-4.8-1.5c-1-.3-1.1-1 .2-1.5L20.5 3c.9-.3 1.7.2 1.4 1.3z"/></svg>',
    ln: '<svg viewBox="0 0 24 24"><path d="M10.6 13.4a1 1 0 0 1 0-1.4l3.4-3.4a1 1 0 1 1 1.4 1.4L12 13.4a1 1 0 0 1-1.4 0zM8.1 19a4 4 0 0 1-2.8-6.8l2.1-2.1a1 1 0 1 1 1.4 1.4l-2.1 2.1a2 2 0 0 0 2.8 2.8l2.1-2.1a1 1 0 1 1 1.4 1.4l-2.1 2.1A4 4 0 0 1 8.1 19zm8-5.5a1 1 0 0 1-.7-1.7l2.1-2.1a2 2 0 0 0-2.8-2.8l-2.1 2.1a1 1 0 0 1-1.4-1.4l2.1-2.1a4 4 0 0 1 5.6 5.6l-2.1 2.1a1 1 0 0 1-.7.3z"/></svg>',
    em: '<svg viewBox="0 0 24 24"><path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm9 7.2L4.4 7H19.6zM4 8.3V17h16V8.3l-7.4 5.1a1 1 0 0 1-1.2 0z"/></svg>'
  };
  var links = [
    ["Facebook", "#1877f2", I.fb, "https://www.facebook.com/sharer/sharer.php?u=" + u],
    ["Messenger", "#0084ff", I.ms, "fb-messenger://share/?link=" + u],
    ["X", "#000", I.x, "https://twitter.com/intent/tweet?url=" + u + "&text=" + t],
    ["WhatsApp", "#25d366", I.wa, "https://api.whatsapp.com/send?text=" + t + "%20" + u],
    ["LinkedIn", "#0a66c2", I.li, "https://www.linkedin.com/shareArticle?mini=true&url=" + u + "&title=" + t],
    ["Telegram", "#229ed9", I.tg, "https://t.me/share/url?url=" + u + "&text=" + t],
    ["Email", "#6b7280", I.em, "mailto:?subject=" + t + "&body=" + u]
  ];

  function bar() {
    var d = document.createElement("div");
    d.className = "sharebar";
    var h = '<span class="lbl">' + T.share + "</span>";
    links.forEach(function (l) {
      var ext = l[3].indexOf("http") === 0 ? ' target="_blank" rel="noopener"' : "";
      h += '<a href="' + l[3] + '"' + ext + ' style="background:' + l[1] + '" aria-label="' + l[0] + '" title="' + l[0] + '">' + l[2] + '<span class="t">' + l[0] + "</span></a>";
    });
    h += '<button type="button" class="copy" style="background:var(--accent-2)" title="' + T.copy + '">' + I.ln + '<span class="t">' + T.copy + "</span></button>";
    h += '<span class="fsz" title="' + T.size + '"><button type="button" data-z="-1" aria-label="Smaller text">A−</button><button type="button" data-z="0" aria-label="Normal text">A</button><button type="button" data-z="1" aria-label="Larger text">A+</button></span>';
    d.innerHTML = h;
    d.querySelector(".copy").addEventListener("click", function (e) {
      var btn = e.currentTarget, span = btn.querySelector(".t");
      function done() { var old = span.textContent; span.textContent = T.copied; btn.title = T.copied; setTimeout(function () { span.textContent = old; }, 1800); }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(done, function () { window.prompt(T.copy, url); });
      else window.prompt(T.copy, url);
    });
    d.querySelectorAll(".fsz button").forEach(function (b) {
      b.addEventListener("click", function () { setZ(+b.dataset.z); });
    });
    return d;
  }

  var steps = [0.85, 0.92, 1, 1.12, 1.25, 1.4], idx = 2;
  try { var saved = parseInt(localStorage.getItem("kj-fz"), 10); if (saved >= 0 && saved < steps.length) idx = saved; } catch (e) {}
  function apply() { document.documentElement.style.setProperty("--fz", steps[idx]); try { localStorage.setItem("kj-fz", idx); } catch (e) {} }
  function setZ(dz) { idx = dz === 0 ? 2 : Math.max(0, Math.min(steps.length - 1, idx + dz)); apply(); }
  apply();

  meta.parentNode.insertBefore(bar(), meta.nextSibling);
  var body = art.querySelector(".article-body");
  if (body) { var bottom = bar(); bottom.style.marginTop = "30px"; body.parentNode.insertBefore(bottom, body.nextSibling); }
})();
