/* Xander Bartlett — shared behaviour
   - Case-study drawers are native <dialog>s. Each one is deep-linkable:
     /social/#remira opens the dialog with id="cs-remira".
   - Copy-to-clipboard for the email address.
   - Hover + keyboard tooltips for chart marks ([data-tip]). */
(function () {
  "use strict";

  var root = document.documentElement;

  /* ---------------- case-study drawers ---------------- */
  function dialogFor(key) {
    return key ? document.getElementById("cs-" + key) : null;
  }

  function openCase(key, opener) {
    var d = dialogFor(key);
    if (!d || d.open) return;
    d._opener = opener || null;
    d.showModal();
    root.classList.add("cs-lock");
    var sc = d.querySelector(".cs__scroll");
    if (sc) sc.scrollTop = 0;
    if (location.hash !== "#" + key) history.replaceState(null, "", "#" + key);
  }

  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-open]");
    if (t) {
      e.preventDefault();
      openCase(t.getAttribute("data-open"), t);
      return;
    }
    var c = e.target.closest("[data-close]");
    if (c) {
      var d = c.closest("dialog");
      if (d) d.close();
    }
  });

  Array.prototype.forEach.call(document.querySelectorAll("dialog.cs"), function (d) {
    // click on the backdrop (outside the panel) closes
    d.addEventListener("click", function (e) {
      if (e.target !== d) return;
      var r = d.getBoundingClientRect();
      var inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      if (!inside) d.close();
    });
    d.addEventListener("close", function () {
      root.classList.remove("cs-lock");
      if (location.hash) history.replaceState(null, "", location.pathname + location.search);
      if (d._opener && document.contains(d._opener)) d._opener.focus();
    });
  });

  function openFromHash() {
    var key = location.hash.replace("#", "");
    if (dialogFor(key)) openCase(key);
  }
  window.addEventListener("hashchange", openFromHash);
  if (location.hash) openFromHash();

  /* ---------------- copy email ---------------- */
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-copy]");
    if (!b) return;
    e.preventDefault();
    var text = b.getAttribute("data-copy");
    var label = b.querySelector("[data-copy-label]") || b;
    var original = label.textContent;
    function done(ok) {
      label.textContent = ok ? "Copied" : "Press ⌘C";
      b.classList.add("is-copied");
      setTimeout(function () { label.textContent = original; b.classList.remove("is-copied"); }, 1600);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(false); });
    } else {
      done(false);
    }
  });

  /* ---------------- chart tooltips ---------------- */
  var tip = null;
  function ensureTip() {
    if (tip) return tip;
    tip = document.createElement("div");
    tip.className = "tip";
    tip.setAttribute("role", "status");
    var v = document.createElement("b");
    var k = document.createElement("span");
    tip.appendChild(v);
    tip.appendChild(k);
    return tip;
  }
  function showTip(el, x, y) {
    var t = ensureTip();
    // tooltips live inside the open dialog (top layer) when there is one
    var host = el.closest("dialog") || document.body;
    if (t.parentNode !== host) host.appendChild(t);
    t.firstChild.textContent = el.getAttribute("data-tip-v") || "";
    t.lastChild.textContent = el.getAttribute("data-tip") || "";
    var w = t.offsetWidth, h = t.offsetHeight;
    var left = Math.min(Math.max(8, x - w / 2), window.innerWidth - w - 8);
    var top = Math.max(8, y - h - 12);
    t.style.left = left + "px";
    t.style.top = top + "px";
    t.classList.add("on");
  }
  function hideTip() { if (tip) tip.classList.remove("on"); }

  document.addEventListener("pointermove", function (e) {
    var el = e.target.closest && e.target.closest("[data-tip]");
    if (el) showTip(el, e.clientX, e.clientY);
    else hideTip();
  });
  document.addEventListener("focusin", function (e) {
    var el = e.target.closest && e.target.closest("[data-tip]");
    if (!el) return;
    var r = el.getBoundingClientRect();
    showTip(el, r.left + r.width / 2, r.top);
  });
  document.addEventListener("focusout", hideTip);
})();
