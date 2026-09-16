(function () {
  "use strict";

  /* ═══════════════════════════════════════════════════════════════
     FORMATTING
     ═══════════════════════════════════════════════════════════════ */

  window.fmtSize = function (value, unit) {
    if (value >= 1e9) return (value / 1e9).toFixed(2) + " E" + unit;
    if (value >= 1e6) return (value / 1e6).toFixed(2) + " P" + unit;
    if (value >= 1e3) return (value / 1e3).toFixed(2) + " T" + unit;
    return value.toFixed(0) + " " + unit;
  };

  /* ═══════════════════════════════════════════════════════════════
     LOG
     ═══════════════════════════════════════════════════════════════ */

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

  /* ═══════════════════════════════════════════════════════════════
     FAKE PROGRESS BAR (never finishes)
     ═══════════════════════════════════════════════════════════════ */

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

  /* ═══════════════════════════════════════════════════════════════
     VISITOR COUNTER
     ═══════════════════════════════════════════════════════════════ */

  window.startVisitorCounter = function (el, start) {
    if (!el) return;
    var n = start;
    setInterval(function () {
      n += Math.floor(Math.random() * 3);
      el.textContent = "VISITORS: " + String(n).padStart(8, "0");
    }, 800);
  };

  /* ═══════════════════════════════════════════════════════════════
     FAKE ETA (never gets closer)
     ═══════════════════════════════════════════════════════════════ */

  window.startFakeETA = function (el) {
    if (!el) return;
    var etas = [
      "calculating...",
      "almost there...",
      "5 seconds remaining",
      "4 seconds remaining",
      "3 seconds remaining",
      "2 seconds remaining",
      "1 second remaining",
      "just a moment...",
      "0 seconds remaining",
      "negative 5 seconds remaining",
      "calculating...",
      "finalizing..."
    ];
    setInterval(function () {
      el.textContent = etas[Math.floor(Math.random() * etas.length)];
    }, 1500);
  };

  /* ═══════════════════════════════════════════════════════════════
     POPUPS
     ═══════════════════════════════════════════════════════════════ */

  window.showPopup  = function (id) { var e = document.getElementById(id); if (e) e.classList.add("show"); };
  window.closePopup = function (id) { var e = document.getElementById(id); if (e) e.classList.remove("show"); };

  /* ═══════════════════════════════════════════════════════════════
     UPTIME
     ═══════════════════════════════════════════════════════════════ */

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

  /* ═══════════════════════════════════════════════════════════════
     BSOD — fake blue screen of death
     ═══════════════════════════════════════════════════════════════ */

  var BSOD_LINES = {
    RAM: [
      "MEMORY_MANAGEMENT",
      "RAM_OVERFLOW_EXCEPTION",
      "TOO_MUCH_RAM",
      "INSUFFICIENT_PHYSICAL_MEMORY",
      "PAGE_FAULT_IN_NONPAGED_AREA",
      "RAM_HAS_BECOME_SENTIENT"
    ],
    GPU: [
      "VIDEO_TDR_FAILURE",
      "GPU_NOT_FOUND",
      "TOO_MANY_FRAMES",
      "FRAME_RATE_EXCEEDS_REALITY",
      "GPU_MELTED",
      "RAY_TRACING_THE_VOID"
    ],
    WIFI: [
      "WIRELESS_ADAPTER_FAILURE",
      "TOO_MUCH_SIGNAL",
      "NEIGHBOR_DETECTED",
      "WIFI_BEYOND_PHYSICAL_LIMITS",
      "ROUTER_NOT_FOUND",
      "SSID_HAS_BECOME_SELF_AWARE"
    ],
    STORAGE: [
      "DISK_FULL_OF_DISK",
      "STORAGE_PARADOX",
      "TOO_MUCH_STORAGE",
      "PARTITION_TABLE_ON_FIRE",
      "DEFRAGMENTATION_REQUIRED",
      "HDD_BECAME_SENTIENT"
    ],
    BATTERY: [
      "BATTERY_OVER_100_PERCENT",
      "POWER_EXCEEDS_CAPACITY",
      "TOO_MUCH_ENERGY",
      "BATTERY_IS_NOW_A_BOMB",
      "CHARGING_IMPOSSIBLE",
      "LAPTOP_IS_NOW_PORTABLE_SUN"
    ],
    FPS: [
      "FRAMES_PER_SECOND_EXCEEDS_TIME",
      "FPS_NOT_FOUND",
      "TOO_MANY_FRAMES",
      "MONITOR_MELTDOWN",
      "EYES_NOT_COMPATIBLE",
      "REALITY_IS_24_FPS"
    ],
    PING: [
      "NEGATIVE_PING_DETECTED",
      "PING_BELOW_ZERO",
      "TIME_PARADOX_IN_NETWORK",
      "PREDICTED_PACKET_LOSS",
      "SERVER_IS_INSIDE_YOUR_HOUSE",
      "LAG_HAS_BEEN_DEPORTED"
    ],
    RGB: [
      "TOO_MANY_COLORS",
      "RAINBOW_OVERFLOW",
      "COLOR_NOT_FOUND",
      "RGB_IS_NOW_SENTIENT",
      "ROOM_VISIBLE_FROM_SPACE",
      "NEW_COLOR_INVENTED_ACCIDENTALLY"
    ],
    "BRAIN CELLS": [
      "TOO_MANY_THOUGHTS",
      "IQ_EXCEEDS_SAFE_LIMITS",
      "BRAIN_OVERFLOW",
      "SUDDENLY_SMART",
      "TAXES_UNDERSTOOD",
      "PASSWORDS_REMEMBERED"
    ],
    MOTIVATION: [
      "MOTIVATION_EXCEEDS_LIMITS",
      "PRODUCTIVITY_OVERFLOW",
      "TOO_MUCH_DONE",
      "DEADLINES_MET",
      "SUDDENLY_ORGANIZED",
      "HOUSE_IS_CLEAN"
    ]
  };

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  window.triggerBSOD = function (theme, unit) {
    if (document.querySelector(".bsod")) return;

    var codes = BSOD_LINES[theme] || [
      "GENERIC_SYSTEM_FAILURE",
      "UNKNOWN_ERROR",
      "SOMETHING_WENT_WRONG",
      "IT_JUST_BROKE"
    ];
    var code = pick(codes);

    var overlay = document.createElement("div");
    overlay.className = "bsod";
    overlay.setAttribute("role", "alert");
    overlay.setAttribute("aria-live", "assertive");

    var inner = document.createElement("div");
    inner.className = "bsod-inner";

    inner.innerHTML =
      '<div class="bsod-header">' + theme + '_DOWNLOADER.EXE</div>' +
      '<p>A problem has been detected and Windows has been shut down to prevent damage to your computer.</p>' +
      '<p>The problem seems to be caused by the following file: <span class="bsod-code">' + theme.toLowerCase() + '_downloader.sys</span></p>' +
      '<p class="bsod-code">' + code + '</p>' +
      '<p>If this is the first time you\'ve seen this Stop error screen, restart your computer. If this screen appears again, follow these steps:</p>' +
      '<p>Check to make sure any new hardware or software is properly installed. If this is a new installation, ask your hardware or software manufacturer for any Windows updates you might need.</p>' +
      '<p>If problems continue, disable or remove any newly installed hardware or software. Disable BIOS memory options such as caching or shadowing. If you need to use Safe Mode to remove or disable components, restart your computer, press F8 to select Advanced Startup Options, and then select Safe Mode.</p>' +
      '<p class="bsod-code">Technical information:</p>' +
      '<p class="bsod-code">*** STOP: 0x000000' + (Math.floor(Math.random() * 0xFFFF) + 0x1000).toString(16).toUpperCase().padStart(4, "0") +
        ' (0x' + (Math.floor(Math.random() * 0xFFFFFFFF)).toString(16).toUpperCase().padStart(8, "0") +
        ', 0x' + (Math.floor(Math.random() * 0xFFFFFFFF)).toString(16).toUpperCase().padStart(8, "0") +
        ', 0x' + (Math.floor(Math.random() * 0xFFFFFFFF)).toString(16).toUpperCase().padStart(8, "0") +
        ')</p>' +
      '<p class="bsod-code">' + code + '</p>' +
      '<p class="bsod-hint">' +
        'Press any key to continue <span class="bsod-blink">_</span>' +
        '<br><span style="color:#8888ff">(This is a joke. Your computer is fine.)</span>' +
      '</p>' +
      '<p class="bsod-hint" style="margin-top:14px;font-size:11px;color:#8888ff">' +
        'Auto-continuing in <span class="bsod-count" id="bsodCount">8</span> seconds...' +
      '</p>';

    overlay.appendChild(inner);
    document.body.appendChild(overlay);

    // Force reflow so the animation plays
    void overlay.offsetWidth;
    overlay.classList.add("show");

    // Freeze the page behind the overlay
    var prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    var dismissed = false;
    var dismiss = function () {
      if (dismissed) return;
      dismissed = true;
      overlay.classList.remove("show");
      document.body.style.overflow = prevOverflow;
      setTimeout(function () {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      }, 200);
      document.removeEventListener("keydown", onKey);
    };

    var onKey = function () { dismiss(); };
    document.addEventListener("keydown", onKey);
    overlay.addEventListener("click", dismiss);

    // Auto-dismiss countdown
    var count = 8;
    var countEl = inner.querySelector("#bsodCount");
    var iv = setInterval(function () {
      count--;
      if (countEl) countEl.textContent = count;
      if (count <= 0) {
        clearInterval(iv);
        dismiss();
      }
    }, 1000);

    // Stop the countdown if the user dismisses early
    overlay.addEventListener("click", function () { clearInterval(iv); });
  };

  /* Called from generator pages. 1-in-6 chance after a successful download. */
  window.maybeBSOD = function (theme, unit) {
    if (Math.random() < 1 / 6) {
      window.triggerBSOD(theme, unit);
      return true;
    }
    return false;
  };

  /* ═══════════════════════════════════════════════════════════════
     THEME FROM PAGE TITLE
     Pulls "RAM" / "GPU" / "WIFI" / etc. out of document.title.
     Titles look like "RAM DOWNLOADER - FREE RAM DOWNLOAD".
     "BRAIN" gets normalised to "BRAIN CELLS" so the right BSOD pool
     is used.
     ═══════════════════════════════════════════════════════════════ */

  function themeFromTitle() {
    var t = (document.title || "").split(" ")[0].toUpperCase();
    if (t === "BRAIN") return "BRAIN CELLS";
    return t || "RAM";
  }

  /* ═══════════════════════════════════════════════════════════════
     WIRE GENERATOR
     ═══════════════════════════════════════════════════════════════ */

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
    var theme  = opts.theme || themeFromTitle();
    var current = start;
    var busy = false;

    window.startFakeProgress(fill, label);
    window.startFakeETA(document.getElementById("eta"));
    window.startUptime(document.getElementById("uptime"));
    window.startVisitorCounter(
      document.getElementById("visitorCounter"),
      99999900 + Math.floor(Math.random() * 99)
    );

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

          // 1-in-6 chance of a themed BSOD right after a download
          if (window.maybeBSOD) window.maybeBSOD(theme, unit);

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

    // Konami code — always triggers a BSOD as a reward
    var konami = [];
    var code = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
    document.addEventListener("keydown", function (e) {
      konami.push(e.key);
      konami = konami.slice(-code.length);
      if (konami.join(",") === code.join(",")) {
        current += 9999;
        renderSize();
        window.pushLog(log, "info", "KONAMI CODE ACTIVATED - +9999 " + unit);
        if (window.triggerBSOD) window.triggerBSOD(theme, unit);
      }
    });
  };
})();