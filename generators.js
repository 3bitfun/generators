(function () {
  "use strict";
  window.fmtSize = function (value, unit) {
    if (value >= 1e9) return (value / 1e9).toFixed(2) + " E" + unit;
    if (value >= 1e6) return (value / 1e6).toFixed(2) + " P" + unit;
    if (value >= 1e3) return (value / 1e3).toFixed(2) + " T" + unit;
    return value.toFixed(0) + " " + unit;
  };
  window.pushLog = function (el, type, text) {
    if (!el) return;
    var line = document.createElement("div");
    line.className = type;
    var t = new Date().toLocaleTimeString();
    line.textContent = "[" + t + "] " + text;
    el.appendChild(line);
    while (el.children.length > 100) el.removeChild(el.firstChild);
    el.scrollTop = el.scrollHeight;
  };
  window.startFakeProgress = function (fillEl, labelEl) {
    if (!fillEl || !labelEl) return;
    function cycle() {
      var pct = 0;
      var target = 90 + Math.random() * 9;
      var timer = setInterval(function () {
        pct += 2 + Math.random() * 3;
        if (pct >= target) {
          clearInterval(timer);
          pct = target;
          fillEl.style.width = pct + "%";
          labelEl.textContent = "Downloading: " + Math.round(pct) + "% (0 bytes remaining)";
          setTimeout(function () {
            fillEl.style.width = "0%";
            labelEl.textContent = "Downloading: 0% (0 bytes remaining)";
            setTimeout(cycle, 400);
          }, 400);
          return;
        }
        fillEl.style.width = pct + "%";
        labelEl.textContent = "Downloading: " + Math.round(pct) + "% (0 bytes remaining)";
      }, 80);
    }
    cycle();
  };
  window.startVisitorCounter = function (el, start) {
    if (!el) return;
    var n = start;
    setInterval(function () {
      n += Math.floor(Math.random() * 3);
      el.textContent = "VISITORS: " + String(n).padStart(8, "0");
    }, 800);
  };
  window.startFakeETA = function (el) {
    if (!el) return;
    var etas = ["calculating...","almost there...","5 seconds remaining","4 seconds remaining","3 seconds remaining","2 seconds remaining","1 second remaining","just a moment...","0 seconds remaining","negative 5 seconds remaining","calculating...","finalizing..."];
    setInterval(function () { el.textContent = etas[Math.floor(Math.random() * etas.length)]; }, 1500);
  };
  window.showPopup  = function (id) { var e = document.getElementById(id); if (e) e.classList.add("show"); };
  window.closePopup = function (id) { var e = document.getElementById(id); if (e) e.classList.remove("show"); };
  window.startUptime = function (el) {
    if (!el) return;
    var start = Date.now();
    setInterval(function () {
      var s = Math.floor((Date.now() - start) / 1000);
      var h = String(Math.floor(s / 3600)).padStart(2, "0");
      var m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
      var sec = String(s % 60).padStart(2, "0");
      el.textContent = h + ":" + m + ":" + sec;
    }, 1000);
  };
  window.wireGenerator = function (opts) {
    var btn    = document.getElementById(opts.buttonId || "downloadBtn");
    var fill   = document.getElementById(opts.fillId   || "progressFill");
    var label  = document.getElementById(opts.labelId  || "progressLabel");
    var log    = document.getElementById(opts.logId    || "syslog");
    var sizeEl = document.getElementById(opts.sizeId   || "ramAmount");
    var infoEl = document.getElementById(opts.infoId   || "ramInfo");
    var unit   = opts.unit || "GB";
    var start  = opts.start || 10;
    var pool   = opts.logs || [];
    var current = start;
    var busy = false;
    window.startFakeProgress(fill, label);
    window.startFakeETA(document.getElementById("eta"));
    window.startUptime(document.getElementById("uptime"));
    window.startVisitorCounter(document.getElementById("visitorCounter"), 99999900 + Math.floor(Math.random() * 99));
    function renderSize() {
      var s = window.fmtSize(current, unit);
      if (sizeEl) sizeEl.textContent = s;
      if (infoEl) infoEl.textContent = s;
    }
    renderSize();
    function drip() {
      if (!log || !pool.length) return;
      var entry = pool[Math.floor(Math.random() * pool.length)];
      window.pushLog(log, entry[0], entry[1]);
      setTimeout(drip, 2500 + Math.random() * 2500);
    }
    drip(); drip(); drip();
    if (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        if (busy) return;
        busy = true;
        btn.classList.add("downloading");
        btn.textContent = "DOWNLOADING...";
        var pct = 0;
        var iv = setInterval(function () {
          pct += Math.random() * 18;
          if (pct > 97) pct = 97;
          fill.style.width = pct + "%";
          label.textContent = "Downloading: " + Math.round(pct) + "% (0 bytes remaining)";
        }, 200);
        setTimeout(function () {
          clearInterval(iv);
          fill.style.width = "100%";
          label.textContent = "Downloading: 100% (0 bytes remaining)";
          current += Math.floor(Math.random() * 900 + 100);
          renderSize();
          window.pushLog(log, "ok", "Downloaded " + window.fmtSize(Math.random() * 500 + 100, unit));
          window.pushLog(log, "ok", "Download complete. You are welcome.");
          setTimeout(function () {
            busy = false;
            btn.classList.remove("downloading");
            btn.textContent = opts.buttonText || "DOWNLOAD MORE";
            fill.style.width = "0%";
            label.textContent = "Downloading: 0% (0 bytes remaining)";
          }, 800);
        }, 2200);
      });
    }
    var konami = [];
    var code = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
    document.addEventListener("keydown", function (e) {
      konami.push(e.key);
      konami = konami.slice(-code.length);
      if (konami.join(",") === code.join(",")) {
        current += 9999;
        renderSize();
        window.pushLog(log, "info", "KONAMI CODE ACTIVATED - +9999 " + unit);
      }
    });
  };
})();