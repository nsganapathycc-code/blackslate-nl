/* Brand kit for the mockup (preview only, not part of the Wix build).
   Saves brands in this browser (localStorage) and re-colours / re-fonts every page. */
(function () {
  var KEY = 'bk.brands', ACTIVE = 'bk.active';
  var DEFAULT = { name: 'Template default', brand: '#354A40', action: '#B5D334', accent: '#8A6A2C', light: '#F3F5F3', text: '#1F2A25', head: 'Space Grotesk', body: 'DM Sans' };
  var FONTS = ['Space Grotesk', 'DM Sans', 'Inter', 'Manrope', 'Plus Jakarta Sans', 'Sora', 'Outfit', 'Poppins', 'Montserrat', 'Work Sans', 'IBM Plex Sans', 'Source Sans 3', 'Lora', 'Merriweather', 'Playfair Display', 'Fraunces', 'Libre Baskerville'];

  // Built-in brand themes (4 brand kits + 12 creative themes). Optional fields: onAction (button text colour), headerLight (header uses the hero/light colour with dark text), gradient / lightGradient / actionGradient (colour lists for gradient fills on dark surfaces, light sections and buttons), always available (saved brands with the same name override them)
  var PRESETS = {"Black Slate · Chalk & Signal": {"name": "Black Slate · Chalk & Signal", "brand": "#2E3A3F", "action": "#F1E9D2", "accent": "#A63D2A", "light": "#F6F4EF", "text": "#1C2326", "head": "Libre Baskerville", "body": "IBM Plex Sans"}, "Unboxed · Curious Purple": {"name": "Unboxed · Curious Purple", "brand": "#6B2FB3", "action": "#FFD23F", "accent": "#B4174F", "light": "#FFFAF0", "text": "#240F3D", "head": "Outfit", "body": "Work Sans"}, "Fitcrum · Active Red": {"name": "Fitcrum · Active Red", "brand": "#C62828", "action": "#FCBF49", "accent": "#B3261E", "light": "#FFF8F0", "text": "#1D1D1D", "head": "Montserrat", "body": "Inter"}, "SkyZoo · Night Sky": {"name": "SkyZoo · Night Sky", "brand": "#2C2A6B", "action": "#FFD6A5", "accent": "#7B2CBF", "light": "#F8F5FF", "text": "#1A1840", "head": "Playfair Display", "body": "Manrope"}, "Sunset Pop": {"name": "Sunset Pop", "brand": "#C2410C", "action": "#FED7AA", "accent": "#9D174D", "light": "#FFF7ED", "text": "#2B1A12", "head": "Poppins", "body": "DM Sans"}, "Royal Blue & Sun": {"name": "Royal Blue & Sun", "brand": "#1D4ED8", "action": "#FDE047", "accent": "#1D4ED8", "light": "#EFF6FF", "text": "#0F172A", "head": "Montserrat", "body": "Inter"}, "Candy Pink": {"name": "Candy Pink", "brand": "#BE185D", "action": "#FBCFE8", "accent": "#9D174D", "light": "#FDF2F8", "text": "#3B0A23", "head": "Sora", "body": "Poppins"}, "Mint Studio": {"name": "Mint Studio", "brand": "#0F766E", "action": "#99F6E4", "accent": "#0F766E", "light": "#F0FDFA", "text": "#042F2E", "head": "Outfit", "body": "Manrope"}, "Lavender Dream": {"name": "Lavender Dream", "brand": "#6D28D9", "action": "#DDD6FE", "accent": "#6D28D9", "light": "#FAF5FF", "text": "#1E1033", "head": "Fraunces", "body": "Manrope"}, "Editorial Red": {"name": "Editorial Red", "brand": "#B91C1C", "action": "#FEF3C7", "accent": "#B91C1C", "light": "#FFFBF5", "text": "#1C1917", "head": "Playfair Display", "body": "Source Sans 3"}, "Olive Grove": {"name": "Olive Grove", "brand": "#4D7C0F", "action": "#FEF08A", "accent": "#3F6212", "light": "#F7FEE7", "text": "#1A2E05", "head": "Merriweather", "body": "Work Sans"}, "Terracotta & Mint": {"name": "Terracotta & Mint", "brand": "#9A3412", "action": "#A7F3D0", "accent": "#9A3412", "light": "#FDF6EC", "text": "#292524", "head": "Libre Baskerville", "body": "IBM Plex Sans"}, "Nordic Steel": {"name": "Nordic Steel", "brand": "#475569", "action": "#BAE6FD", "accent": "#0369A1", "light": "#F8FAFC", "text": "#0F172A", "head": "Manrope", "body": "Manrope"}, "Monochrome Editorial": {"name": "Monochrome Editorial", "brand": "#262626", "action": "#E5E5E5", "accent": "#525252", "light": "#FAFAFA", "text": "#0A0A0A", "head": "Playfair Display", "body": "Inter"}, "Black & White": {"name": "Black & White", "brand": "#111111", "action": "#111111", "onAction": "#FFFFFF", "accent": "#4A4A4A", "light": "#F5F5F5", "text": "#111111", "head": "Playfair Display", "body": "Inter"}, "Seamless Sand · header = hero": {"name": "Seamless Sand · header = hero", "brand": "#2F3E46", "action": "#F4A261", "accent": "#1F7A70", "light": "#F6EFE6", "text": "#1F2A30", "head": "Plus Jakarta Sans", "body": "Plus Jakarta Sans", "headerLight": true}, "Royal Blue & Sun · Gradient": {"name": "Royal Blue & Sun · Gradient", "brand": "#1D4ED8", "action": "#FDE047", "accent": "#1D4ED8", "light": "#EFF6FF", "text": "#0F172A", "head": "Montserrat", "body": "Inter", "gradient": ["#1D4ED8", "#6D28D9", "#BE185D"], "lightGradient": ["#DBEAFE", "#FEF3C7"], "actionGradient": ["#FDE047", "#FB923C"], "heroGradient": ["#1D4ED8", "#6D28D9", "#BE185D"]}, "Sunset Gradient": {"name": "Sunset Gradient", "brand": "#AD1457", "action": "#C2185B", "onAction": "#FFFFFF", "accent": "#C2185B", "light": "#FFF5F7", "text": "#2A0F1C", "head": "Poppins", "body": "Poppins", "gradient": ["#8E24AA", "#D81B60"], "heroGradient": ["#8E24AA", "#E91E63", "#FF7043"], "actionGradient": ["#C2185B", "#E64A19"]}, "Aurora · Gradient": {"name": "Aurora · Gradient", "brand": "#134E4A", "action": "#A7F3D0", "accent": "#0F766E", "light": "#F0FDFA", "text": "#042F2E", "head": "Sora", "body": "Inter", "gradient": ["#134E4A", "#3B0764"], "heroGradient": ["#0F766E", "#0E7490", "#6D28D9"], "actionGradient": ["#A7F3D0", "#FDE68A"]}, "Ember · Gradient": {"name": "Ember · Gradient", "brand": "#7C2D12", "action": "#FDE68A", "accent": "#9A3412", "light": "#FFF7ED", "text": "#1C1917", "head": "Outfit", "body": "DM Sans", "gradient": ["#450A0A", "#7C2D12"], "heroGradient": ["#7F1D1D", "#C2410C", "#B45309"], "actionGradient": ["#FDE68A", "#FDBA74"]}, "Deep Ocean · Gradient": {"name": "Deep Ocean · Gradient", "brand": "#1E3A8A", "action": "#67E8F9", "accent": "#1D4ED8", "light": "#EFF6FF", "text": "#0B1E3F", "head": "Manrope", "body": "Manrope", "gradient": ["#0B1E3F", "#1E1B4B"], "heroGradient": ["#0C4A6E", "#1E3A8A", "#312E81"], "actionGradient": ["#67E8F9", "#A5B4FC"]}, "Berry Smoothie · Gradient": {"name": "Berry Smoothie · Gradient", "brand": "#831843", "action": "#FBCFE8", "accent": "#9D174D", "light": "#FDF2F8", "text": "#3B0A23", "head": "Fraunces", "body": "Work Sans", "gradient": ["#4A044E", "#831843"], "heroGradient": ["#701A75", "#BE185D", "#9D174D"], "actionGradient": ["#FBCFE8", "#FDE68A"]}, "Forest Mist · Gradient": {"name": "Forest Mist · Gradient", "brand": "#14532D", "action": "#BBF7D0", "accent": "#15803D", "light": "#F0FDF4", "text": "#052E16", "head": "Merriweather", "body": "Source Sans 3", "gradient": ["#052E16", "#1A2E05"], "heroGradient": ["#14532D", "#166534", "#365314"], "actionGradient": ["#BBF7D0", "#FEF08A"]}, "Midnight Neon · Gradient": {"name": "Midnight Neon · Gradient", "brand": "#1E1B4B", "action": "#22D3EE", "accent": "#6D28D9", "light": "#F5F3FF", "text": "#0F172A", "head": "Space Grotesk", "body": "Inter", "gradient": ["#020617", "#312E81"], "heroGradient": ["#0F172A", "#4C1D95", "#BE185D"], "actionGradient": ["#22D3EE", "#A3E635"]}, "Golden Hour · Gradient": {"name": "Golden Hour · Gradient", "brand": "#78350F", "action": "#FEF3C7", "accent": "#92400E", "light": "#FFFBEB", "text": "#292524", "head": "Playfair Display", "body": "Lora", "gradient": ["#451A03", "#881337"], "heroGradient": ["#92400E", "#B45309", "#BE123C"], "actionGradient": ["#FEF3C7", "#FED7AA"]}, "Lagoon · Gradient": {"name": "Lagoon · Gradient", "brand": "#155E75", "action": "#FEF08A", "accent": "#0E7490", "light": "#ECFEFF", "text": "#083344", "head": "Plus Jakarta Sans", "body": "Plus Jakarta Sans", "gradient": ["#083344", "#064E3B"], "heroGradient": ["#155E75", "#0F766E", "#047857"], "actionGradient": ["#FEF08A", "#FDBA74"]}, "Plum Dusk · Gradient": {"name": "Plum Dusk · Gradient", "brand": "#581C87", "action": "#F5D0FE", "accent": "#7E22CE", "light": "#FAF5FF", "text": "#2E1065", "head": "Libre Baskerville", "body": "IBM Plex Sans", "gradient": ["#2E1065", "#4C0519"], "heroGradient": ["#3B0764", "#6B21A8", "#9F1239"], "actionGradient": ["#F5D0FE", "#FECDD3"]}, "Steel Sunrise · Gradient": {"name": "Steel Sunrise · Gradient", "brand": "#334155", "action": "#FDE047", "accent": "#1E40AF", "light": "#F8FAFC", "text": "#0F172A", "head": "Montserrat", "body": "Inter", "gradient": ["#0F172A", "#334155"], "heroGradient": ["#334155", "#1E40AF", "#C2410C"], "actionGradient": ["#FDE047", "#FB923C"]}, "Black & Gold · Gradient": {"name": "Black & Gold · Gradient", "brand": "#141210", "action": "#E8C766", "accent": "#7A5B12", "light": "#FAF7F0", "text": "#0E0D0B", "head": "Playfair Display", "body": "Inter", "heroGradient": ["#000000", "#1A1712", "#4A3A16"], "gradient": ["#000000", "#2B2316"], "actionGradient": ["#F3DC8E", "#C9A227"], "heroButton": ["#F3DC8E", "#C9A227"], "heroButtonText": "#0E0D0B"}, "Black Glow · Gradient": {"name": "Black Glow · Gradient", "brand": "#0B0B10", "action": "#C4B5FD", "accent": "#5B21B6", "light": "#F6F5FA", "text": "#0B0B10", "head": "Space Grotesk", "body": "Inter", "heroGradient": ["#000000", "#0B0B14", "#1E1B4B", "#3B0764"], "gradient": ["#000000", "#161427"], "actionGradient": ["#C4B5FD", "#93C5FD"], "heroButton": ["#A78BFA", "#60A5FA"], "heroButtonText": "#0B0B10"}};

  function store(k, v) { try { if (v === undefined) return JSON.parse(localStorage.getItem(k)); localStorage.setItem(k, JSON.stringify(v)); } catch (e) { return null; } }
  var EXTRAS = ['onAction', 'headerLight', 'gradient', 'lightGradient', 'actionGradient', 'heroGradient', 'heroButton', 'heroButtonText'];
  // Saved copies keep the gradient / special settings of the built-in theme they came from (the panel only edits colours and fonts)
  function withExtras(p) { var src = PRESETS[p.name]; if (!src) return p; var o = {}, k; for (k in p) o[k] = p[k]; EXTRAS.forEach(function (e) { if (o[e] === undefined && src[e] !== undefined) o[e] = src[e]; }); return o; }
  function brands() { var b = {}, k, own = store(KEY) || {}; for (k in PRESETS) b[k] = PRESETS[k]; for (k in own) b[k] = withExtras(own[k]); return b; }
  function active() { var n = store(ACTIVE); var b = brands(); return (n && b[n]) ? b[n] : DEFAULT; }

  function hex2rgb(h) { h = h.replace('#', ''); if (h.length === 3) h = h.split('').map(function (c) { return c + c; }).join(''); return [parseInt(h.substr(0, 2), 16), parseInt(h.substr(2, 2), 16), parseInt(h.substr(4, 2), 16)]; }
  function rgb2hex(c) { return '#' + c.map(function (v) { v = Math.max(0, Math.min(255, Math.round(v))); return (v < 16 ? '0' : '') + v.toString(16); }).join('').toUpperCase(); }
  function mix(a, b, t) { var x = hex2rgb(a), y = hex2rgb(b); return rgb2hex([x[0] + (y[0] - x[0]) * t, x[1] + (y[1] - x[1]) * t, x[2] + (y[2] - x[2]) * t]); }

  // Every theme colour used in the mockups, mapped to one of the 5 brand roles.
  function colourMap(p) {
    var B = p.brand, A = p.action, C = p.accent, L = p.light, T = p.text, K = '#000000', W = '#FFFFFF';
    return {
      '#354A40': B, '#374A42': B, '#2F4238': mix(B, K, .12), '#2E4238': mix(B, K, .12), '#2B3A33': mix(B, K, .2), '#26352E': mix(B, K, .28),
      '#1E2B25': mix(B, K, .42), '#1A2620': mix(B, K, .5), '#41594D': mix(B, W, .1), '#4A6357': mix(B, W, .14), '#4E7A63': mix(B, W, .2), '#8FAF7E': mix(B, W, .45),
      '#E4EAE6': mix(B, W, .88), '#C8D2CC': mix(B, W, .75), '#CFD8D3': mix(B, W, .78), '#D7DED9': mix(B, W, .83),
      '#B5D334': A, '#A3BF2B': mix(A, K, .1), '#9DB82A': mix(A, K, .13), '#C6DE5E': mix(A, W, .25), '#D9E3B6': mix(A, W, .6), '#E3EDB9': mix(A, W, .65),
      '#E7EFC6': mix(A, W, .72), '#E9EFD3': mix(A, W, .75), '#EEF5CF': mix(A, W, .78), '#EEF6CC': mix(A, W, .8),
      '#8A6A2C': C, '#745824': mix(C, K, .16), '#6A5120': mix(C, K, .24), '#EFE6D3': mix(C, W, .8),
      '#F3F5F3': L, '#F4F5F1': L, '#F1F3F2': L, '#F2F4F3': L, '#F5F6F5': L, '#EEF0EE': mix(L, K, .02), '#E8EBE9': mix(L, K, .04),
      '#1F2A25': T, '#3B4842': mix(T, W, .18), '#46504B': mix(T, W, .25), '#4A5751': mix(T, W, .27)
    };
  }

  function apply(p) {
    var isDefault = ['brand', 'action', 'accent', 'light', 'text', 'head', 'body'].every(function (k) { return String(p[k]).toUpperCase() === String(DEFAULT[k]).toUpperCase(); });
    if (isDefault) return;
    var map = colourMap(p), rgbMap = {};
    Object.keys(map).forEach(function (h) { var c = hex2rgb(h); rgbMap[c.join(',')] = hex2rgb(map[h]); });
    var hexRe = new RegExp('#(' + Object.keys(map).map(function (h) { return h.slice(1); }).join('|') + ')\\b', 'gi');
    function fixText(v) {
      if (!v) return v;
      v = v.replace(hexRe, function (m) { return map[m.toUpperCase()] || m; });
      v = v.replace(/rgba?\((\d+),\s*(\d+),\s*(\d+)(\s*,\s*[\d.]+)?\)/g, function (m, r, g, b, a) {
        var n = rgbMap[[r, g, b].join(',')]; if (!n) return m;
        return a ? 'rgba(' + n.join(', ') + a + ')' : 'rgb(' + n.join(', ') + ')';
      });
      v = v.replace(/['"]?Space Grotesk['"]?/g, "'" + p.head + "'").replace(/['"]?DM Sans['"]?/g, "'" + p.body + "'");
      return v;
    }
    function walk(rules) {
      for (var i = 0; i < rules.length; i++) {
        var r = rules[i];
        if (r.cssRules) walk(r.cssRules);
        if (!r.style) continue;
        for (var j = 0; j < r.style.length; j++) {
          var prop = r.style[j], val = r.style.getPropertyValue(prop), nv = fixText(val);
          if (nv !== val) r.style.setProperty(prop, nv, r.style.getPropertyPriority(prop));
        }
      }
    }
    for (var s = 0; s < document.styleSheets.length; s++) { try { walk(document.styleSheets[s].cssRules); } catch (e) { } }
    function fixEl(el) { var st = el.getAttribute && el.getAttribute('style'); if (st) { var n = fixText(st); if (n !== st) el.setAttribute('style', n); } }
    document.querySelectorAll('[style]').forEach(fixEl);
    new MutationObserver(function (ms) {
      ms.forEach(function (m) {
        if (m.type === 'attributes') fixEl(m.target);
        m.addedNodes && m.addedNodes.forEach(function (n) { if (n.nodeType === 1) { fixEl(n); n.querySelectorAll && n.querySelectorAll('[style]').forEach(fixEl); } });
      });
    }).observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['style'] });
    var fams = [p.head, p.body].filter(function (f, i, a) { return a.indexOf(f) === i; });
    var link = document.createElement('link'); link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?' + fams.map(function (f) { return 'family=' + f.replace(/ /g, '+') + ':wght@400;500;600;700'; }).join('&') + '&display=swap';
    document.head.appendChild(link);

    // Optional extras: button text colour, header matching the hero, readable links on the main colour
    function lumi(h) { return hex2rgb(h).map(function (v) { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); }).reduce(function (a, v, i) { return a + v * [.2126, .7152, .0722][i]; }, 0); }
    function contrast(a, b) { var x = lumi(a), y = lumi(b); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05); }
    var css = '', BTN = 'a.btn:not(.btn-line):not(.ghost),button.btn:not(.btn-line):not(.ghost),span.btn:not(.btn-line),.btn-lime,.sh-join,.atc,.btn-atc,.f-btn,.plan.pro .btn,.strip a,a.go,button.go,.ribbon,.pv-btn';
    if (p.onAction) css += BTN.split(',').map(function (x) { return 'body ' + x; }).join(',') + '{color:' + p.onAction + '!important}';
    if (contrast(p.action, p.brand) < 3) {
      css += 'footer .f-grid nav a,footer .f-copy a{color:#FFFFFF!important}footer .f-btn{background:#FFFFFF!important;color:' + p.brand + '!important}';
      css += '.sec.dark .eyebrow,.dark .eyebrow{color:#FFFFFF!important}';
      if (!p.headerLight) css += 'body .home header .btn-lime,body header .sh-join{background:#FFFFFF!important;color:' + p.brand + '!important}';
    }
    function lg(c, a) { return 'linear-gradient(' + (a || 135) + 'deg,' + c.join(',') + ')'; }
    if (p.gradient) css += '.home header,header.sh,body > header,footer,.sec.dark,.dk,section.dark,.plan.pro,.strip,.pl.hi .rb{background-image:' + lg(p.gradient) + '!important}';
    if (p.gradient) css += '.pl.hi .rb{color:#FFFFFF!important}';
    if (p.lightGradient) css += '.home .panel,.home .sec.tint,.home .chero,.home .whero,.lhero,.home .phd,.home .area,.wl,section.intro,section.feed,.home .final{background-image:' + lg(p.lightGradient, 160) + '!important}';
    if (p.actionGradient) css += BTN.split(',').map(function (x) { return 'body ' + x; }).join(',') + ',footer .f-btn{background-image:' + lg(p.actionGradient, 120) + '!important}';
    // heroGradient: header and the top section of every page share one full-width gradient, with white text and white pill buttons
    if (p.heroGradient) {
      var HG = lg(p.heroGradient, 120), TOP = '.home .hero,.home .hero .panel,.home .chero,.home .whero,.lhero,.home .phd,.home .bhero,.thero,section.intro,.wl,.pintro,.bill';
      var HDR = '.home header,header.sh,body > header';
      css += HDR + ',' + TOP + '{background-image:' + HG + '!important;background-attachment:fixed!important;background-size:100vw 100vh!important;background-color:transparent!important}';
      css += HDR + '{border-bottom:0!important;box-shadow:none!important}';
      css += TOP.split(',').map(function (x) { return x + ' h1,' + x + ' .lead,' + x + ' p,' + x + ' .crumb,' + x + ' .crumb a,' + x + ' .kicker,' + x + ' .eyebrow,' + x + ' .ttag,' + x + ' .tmem,' + x + ' .tmem a,' + x + ' figcaption,' + x + ' li,' + x + ' .when,' + x + ' .pre,' + x + ' label,' + x + ' a.link,' + x + ' .more'; }).join(',') + '{color:#FFFFFF!important}';
      css += '.wl form,.wl form *{color:' + p.text + '}.wl form label,.wl form p{color:' + p.text + '!important}';
      css += TOP.split(',').map(function (x) { return 'body ' + x + ' .btn:not(.btn-line):not(.ghost),body ' + x + ' .btn-lime'; }).join(',') + '{background:#FFFFFF!important;background-image:' + (p.heroButton ? lg(p.heroButton, 120) : 'none') + '!important;color:' + (p.heroButtonText || p.brand) + '!important;border-radius:999px!important}';
      css += TOP.split(',').map(function (x) { return 'body ' + x + ' .btn-line'; }).join(',') + '{background:transparent!important;color:#FFFFFF!important;border-color:#FFFFFF!important;border-radius:999px!important}';
      css += 'html body .home header a.btn-lime:not(.btn-line),html body header a.sh-join:not(.btn-line){background:#FFFFFF!important;background-image:' + (p.heroButton ? lg(p.heroButton, 120) : 'none') + '!important;color:' + (p.heroButtonText || p.brand) + '!important;border-radius:999px!important}';
      css += '.home .hero .panel{position:relative;overflow:hidden}.home .hero .panel::before{content:"";position:absolute;width:70vw;height:70vw;left:-20vw;top:-30vw;border-radius:50%;background:rgba(255,255,255,.10);pointer-events:none}';
      css += '.home .hero .hero-in{position:relative;z-index:1}';
    }
    if (p.headerLight) {
      css += '.home header,header.sh,body > header{background:' + p.light + '!important;border-bottom:1px solid rgba(0,0,0,.08)}';
      css += '.home header .logo,.home header .nav a,.home header .login,.sh-logo,.sh .sh-nav a,.sh-act a:not(.sh-join),.sh-ico,header .back,header .logo{color:' + p.text + '!important}';
      css += '.home .burger,.sh-burger{color:' + p.text + '!important;border-color:' + p.text + '!important}';
    }
    if (css) { var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st); }
  }

  // Small switcher on every page (mockup only)
  function switcher() {
    if (document.getElementById('bk-switch') || document.body.dataset.bkPanel) return;
    var b = brands(), names = Object.keys(b), cur = store(ACTIVE) || '';
    var root = location.pathname.indexOf('/01-public-pages/') > -1 || location.pathname.indexOf('/02-free-plan/') > -1 ? '../' : '';
    var d = document.createElement('div'); d.id = 'bk-switch';
    d.setAttribute('style', 'position:fixed;left:12px;bottom:12px;z-index:9999;background:#fff;border:1px solid #C9CECB;border-radius:8px;padding:6px 8px;font:13px/1.2 Arial,sans-serif;color:#222;box-shadow:0 4px 14px rgba(0,0,0,.15);display:flex;gap:6px;align-items:center');
    d.innerHTML = '<span title="Mockup preview only">Brand</span><select style="font:13px Arial;padding:2px"></select><a href="' + root + 'index.html#brandkit" style="color:#222">Edit</a>';
    var sel = d.querySelector('select');
    sel.add(new Option('Template default', ''));
    names.forEach(function (n) { sel.add(new Option(n, n)); });
    sel.value = b[cur] ? cur : '';
    sel.onchange = function () { store(ACTIVE, sel.value); location.reload(); };
    document.body.appendChild(d);
  }

  window.BrandKit = { DEFAULT: DEFAULT, FONTS: FONTS, brands: brands, active: active,
    save: function (p) { var b = store(KEY) || {}; b[p.name] = p; store(KEY, b); },
    remove: function (n) { var b = store(KEY) || {}; delete b[n]; store(KEY, b); if (store(ACTIVE) === n) store(ACTIVE, ''); },
    setActive: function (n) { store(ACTIVE, n || ''); },
    activeName: function () { return store(ACTIVE) || ''; } };

  function init() { apply(active()); switcher(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();