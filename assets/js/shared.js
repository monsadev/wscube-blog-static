/* ============================================================
   shared.js — shared widgets for category.html & article.html
   Lead modal, carousel, masterclass, courses, fixed CTA bar,
   back-to-top, per-category config. Needs data.js + render.js.
   ============================================================ */
(function () {
  'use strict';

  var esc = window.escapeHtml;
  var BASE = 'https://www.wscubetech.com/';

  /* ---------------- course catalogue (course slider) ---------------- */
  var COURSES = [
    { id: 'digital-marketing', t: 'Online Digital Marketing Course', d: '6 Months', m: 'Live Online', tag: 'Digital Marketing', c: '#194cff', bg: '#e8edff', href: BASE + 'online-digital-marketing-course', pts: ['SEO, Ads & Social Media', 'Live projects & tools', 'Placement support'] },
    { id: 'seo', t: 'Advanced SEO Course', d: '3 Months', m: 'Live Online', tag: 'SEO', c: '#c77200', bg: '#fff3dc', href: BASE + 'seo-course', pts: ['On-page, Off-page, Technical', 'Real website audits', 'Certificate included'] },
    { id: 'web-development', t: 'Full Stack Web Development', d: '6 Months', m: 'Live Online', tag: 'Web Development', c: '#15803d', bg: '#dcfce7', href: BASE + 'full-stack-web-development-course', pts: ['HTML, CSS, JS, React, Node', 'Build 10+ projects', 'Placement support'] },
    { id: 'artificial-intelligence', t: 'Generative AI Course', d: '4 Months', m: 'Live Online', tag: 'Artificial Intelligence', c: '#1238d6', bg: '#e8edff', href: BASE + 'generative-ai-course', pts: ['Prompts, LLMs & AI tools', 'Build AI applications', 'Industry mentors'] },
    { id: 'data', t: 'Data Analytics Course', d: '6 Months', m: 'Live Online', tag: 'Data Analytics', c: '#d97706', bg: '#fff3dc', href: BASE + 'data-analytics-course', pts: ['Excel, SQL, Python, Power BI', 'Dashboards & case studies', 'Interview preparation'] },
    { id: 'cyber', t: 'Cyber Security Course', d: '7 Months', m: 'Live Online', tag: 'Cyber Security', c: '#be123c', bg: '#ffe4e6', href: BASE + 'cyber-security-course', pts: ['Ethical hacking & networks', 'Hands-on labs', 'Certification prep'] },
  ];

  var CITIES = ['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Pune', 'Chennai', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Jodhpur', 'Lucknow', 'Indore', 'Chandigarh', 'Noida', 'Gurgaon', 'Kota'];

  var RELATED_NAMES = {
    'performance-marketing': 'Performance Marketing',
    seo: 'Search Engine Optimization',
    'email-marketing': 'Email Marketing',
    'social-media-marketing': 'Social Media Marketing',
    ppc: 'Pay Per Click Marketing',
    'content-marketing': 'Content Marketing',
    'digital-marketing': 'Digital Marketing',
    'web-development': 'Web Development',
    'artificial-intelligence': 'Artificial Intelligence',
    'career-guidance': 'Career Guidance',
    'interview-questions': 'Interview Questions',
    'data-analytics': 'Data Analytics',
    'cyber-security': 'Cyber Security',
  };

  /* ---------------- per-category config ---------------- */
  var CAT_CFG = {
    'digital-marketing': { course: 0, curriculum: true, short: 'Digital Marketing', related: ['performance-marketing', 'seo', 'email-marketing', 'social-media-marketing', 'ppc'], cities: true },
    seo: { course: 1, curriculum: true, short: 'SEO', related: ['digital-marketing', 'content-marketing', 'social-media-marketing', 'performance-marketing'], cities: true },
    'web-development': { course: 2, curriculum: true, short: 'Web Development', related: ['artificial-intelligence', 'interview-questions', 'career-guidance'], cities: true },
    'artificial-intelligence': { course: 3, curriculum: true, short: 'AI', related: ['web-development', 'data-analytics', 'career-guidance'], cities: true },
    'career-guidance': { course: 0, curriculum: false, short: 'Career', related: ['interview-questions', 'digital-marketing', 'web-development', 'artificial-intelligence'], cities: false },
    'interview-questions': { course: -1, curriculum: false, short: 'Interview', related: ['web-development', 'digital-marketing', 'artificial-intelligence', 'career-guidance'], cities: false },
  };
  function cfgFor(catId) {
    var c = CAT_CFG[catId] || { course: 0, curriculum: true, short: RELATED_NAMES[catId] || 'Skills', related: ['digital-marketing', 'seo', 'web-development', 'artificial-intelligence'], cities: false };
    var course = c.course >= 0 ? COURSES[c.course] : null;
    return { course: course, curriculum: c.curriculum && !!course, short: c.short, related: c.related, cities: c.cities };
  }

  /* ---------------- alumni (success stories) ---------------- */
  var ALUMNI_CDN = 'https://deen3evddmddt.cloudfront.net/uploads/alumni/';
  var STORIES = [
    { name: 'Adnan Hafeez', co: 'KPMG', photo: ALUMNI_CDN + '10%20Adnan%20Hafeez.webp', g: 'linear-gradient(160deg,#194cff,#1238d6)' },
    { name: 'Sheenam Bilandi', co: 'Microsoft', photo: ALUMNI_CDN + '17%20Sheenam%20Bilandi.webp', g: 'linear-gradient(160deg,#fc9c03,#f97316)' },
    { name: 'Manik Gupta', co: 'Physics Wallah', photo: ALUMNI_CDN + '06%20Manik%20Gupta.webp', g: 'linear-gradient(160deg,#0e9fb8,#0369a1)' },
    { name: 'Lakshit Sharma', co: 'DianApps', photo: ALUMNI_CDN + '58%20Lakshit%20Sharma.webp', g: 'linear-gradient(160deg,#15803d,#22c55e)' },
    { name: 'Hardik Jain', co: 'Bent Chair', photo: ALUMNI_CDN + '01%20Hardik%20Jain.webp', g: 'linear-gradient(160deg,#be123c,#f97316)' },
  ];
  var QUOTES = [
    'The practical, project-based approach made %s easy to learn and helped me switch careers with confidence.',
    'Mentors explained %s step by step and reviewed every assignment. I felt job-ready by the end of the program.',
    'From basics to advanced %s, the curriculum was clear and industry-focused. The interview prep made the difference.',
    'Live classes and real projects on %s gave me the portfolio I needed to land my role.',
    'I started with zero knowledge of %s. Today I work on real client projects every day.',
  ];

  /* ---------------- small helpers ---------------- */
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function svg(p, s) {
    return '<svg width="' + (s || 18) + '" height="' + (s || 18) + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + p + '</svg>';
  }
  var I = {
    arrow: svg('<path d="M5 12h14M12 5l7 7-7 7"/>', 16),
    dl: svg('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>', 17),
    up: svg('<polyline points="18 15 12 9 6 15"/>', 20),
    x: svg('<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>', 16),
    star: '<svg width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>',
    clock: svg('<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>', 14),
    mode: svg('<rect x="2" y="4" width="20" height="14" rx="2"/><path d="M8 22h8M12 18v4"/>', 14),
    check: svg('<polyline points="20 6 9 17 4 12"/>', 14),
  };

  /* ---------------- lead modal ---------------- */
  function injectLeadModal() {
    if ($('#lead-overlay')) return;
    var d = document.createElement('div');
    d.innerHTML =
      '<div class="lead-overlay" id="lead-overlay" role="dialog" aria-modal="true" aria-labelledby="lead-title" hidden>' +
      '<div class="lead-modal"><div class="lead-visual" aria-hidden="true"><div class="lead-visual-pills"><span class="lv-pill lv-pill-1">Professional Growth</span><span class="lv-pill lv-pill-2">Career Development</span><span class="lv-pill lv-pill-3">Pay Enhancement</span><span class="lv-pill lv-pill-4">Career Enhancement</span></div>' +
      '<div class="lead-visual-rocket"><svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91 0z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg></div>' +
      '<p class="lead-visual-cap">Let\'s enable fun learning experiences, together</p></div>' +
      '<div class="lead-form-wrap"><button class="lead-close" id="lead-close" aria-label="Close dialog"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg></button>' +
      '<h3 class="lead-title" id="lead-title">Book Mentor Session</h3>' +
      '<form class="lead-form" id="lead-form" novalidate>' +
      '<label class="lead-label" for="lead-name">Name</label><input class="lead-input" type="text" id="lead-name" placeholder="Your Name" autocomplete="name" />' +
      '<label class="lead-label" for="lead-phone">Phone Number</label><div class="lead-phone"><span class="lead-phone-cc">+91</span><input class="lead-input" type="tel" id="lead-phone" placeholder="Enter phone number" autocomplete="tel" inputmode="numeric" maxlength="10" /></div>' +
      '<label class="lead-label" for="lead-education">Highest Education</label><select class="lead-input lead-select" id="lead-education"><option value="" selected disabled>Select Highest Education</option><option>High School (10th)</option><option>Senior Secondary (12th)</option><option>Diploma</option><option>Graduate</option><option>Post Graduate</option></select>' +
      '<label class="lead-label" for="lead-course">Courses</label><select class="lead-input lead-select" id="lead-course"><option value="" selected disabled>Select Course</option><option>Digital Marketing</option><option>Web Development</option><option>Data Analytics</option><option>Artificial Intelligence</option><option>App Development</option><option>UI/UX Design</option></select>' +
      '<label class="lead-check"><input type="checkbox" id="lead-agree" checked /><span>I have read and agree to the Privacy Policy and Terms &amp; Conditions.</span></label>' +
      '<label class="lead-check"><input type="checkbox" id="lead-wa" checked /><span>Send me updates on WhatsApp</span></label>' +
      '<button class="lead-submit" type="submit">Continue</button><p class="lead-msg" id="lead-msg" aria-live="polite"></p></form></div></div></div>';
    document.body.appendChild(d.firstChild);
  }

  function initLeadModal() {
    injectLeadModal();
    var overlay = $('#lead-overlay'), closeBtn = $('#lead-close'), form = $('#lead-form'), msg = $('#lead-msg'), titleEl = $('#lead-title');
    var last = null;
    function setMsg(t, ok) { if (!msg) return; msg.textContent = t; msg.className = 'lead-msg ' + (ok ? 'lead-ok' : 'lead-err'); }
    function open(label, course) {
      last = document.activeElement;
      if (label && titleEl) titleEl.textContent = label;
      if (course) { var sel = $('#lead-course'); if (sel) { $$('option', sel).forEach(function (o) { if (o.textContent === course) sel.value = o.value || o.textContent; }); } }
      overlay.hidden = false; overlay.style.display = 'flex'; void overlay.offsetWidth;
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(function () { overlay.classList.add('open'); var f = $('#lead-name'); if (f) f.focus(); });
    }
    function close() {
      overlay.classList.remove('open'); document.body.style.overflow = '';
      setTimeout(function () { overlay.hidden = true; overlay.style.display = ''; }, 220);
      if (msg) { msg.textContent = ''; msg.className = 'lead-msg'; }
      if (last && last.focus) last.focus();
    }
    document.addEventListener('click', function (e) {
      var b = e.target.closest('[data-open-lead]');
      if (b) { e.preventDefault(); open(b.getAttribute('data-open-lead'), b.getAttribute('data-course')); }
    });
    if (closeBtn) closeBtn.addEventListener('click', close);
    overlay.addEventListener('mousedown', function (e) { if (e.target === overlay) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !overlay.hidden) close(); });
    if (form) form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = $('#lead-name'), phone = $('#lead-phone'), agree = $('#lead-agree');
      [name, phone].forEach(function (el) { el && el.classList.remove('err'); });
      if (!(name.value.trim().length >= 2)) { name.classList.add('err'); return setMsg('Please enter your name.', false); }
      if (!/^\d{10}$/.test(phone.value.trim())) { phone.classList.add('err'); return setMsg('Please enter a valid 10-digit phone number.', false); }
      if (!agree.checked) return setMsg('Please accept the Privacy Policy to continue.', false);
      setMsg('Thanks! Our team will reach out to you shortly.', true);
      form.reset(); agree.checked = true; var wa = $('#lead-wa'); if (wa) wa.checked = true;
      setTimeout(close, 1800);
    });
  }

  /* ---------------- carousel ---------------- */
  function initCarousel(o) {
    var track = o.track, viewport = o.viewport, prevBtn = o.prevBtn, nextBtn = o.nextBtn, gap = o.gap == null ? 16 : o.gap;
    var dotsEl = o.dotsEl, dotClass = o.dotClass || 'usk-dot', autoplay = o.autoplay || 0, loop = !!o.loop;
    if (!track || !viewport) return null;
    var index = 0, timer = null;
    function step() { var f = track.children[0]; return f ? f.getBoundingClientRect().width + gap : viewport.clientWidth; }
    function maxI() { var vis = Math.max(1, Math.round(viewport.clientWidth / step())); return Math.max(0, track.children.length - vis); }
    function render(anim) {
      if (anim === undefined) anim = true;
      index = Math.max(0, Math.min(index, maxI()));
      track.style.transition = anim ? '' : 'none';
      track.style.transform = 'translateX(' + -index * step() + 'px)';
      if (!anim) { void track.offsetWidth; track.style.transition = ''; }
      if (prevBtn) prevBtn.disabled = !loop && index <= 0;
      if (nextBtn) nextBtn.disabled = !loop && index >= maxI();
      if (dotsEl) {
        var total = maxI() + 1, h = '';
        for (var i = 0; i < total; i++) h += '<button class="' + dotClass + (i === index ? ' active' : '') + '" aria-label="Slide ' + (i + 1) + '" data-i="' + i + '"></button>';
        dotsEl.innerHTML = h;
      }
    }
    function go(n) { var m = maxI(); if (loop) { if (n < 0) n = m; else if (n > m) n = 0; } index = n; render(); }
    function next() { go(index + 1); }
    function prev() { go(index - 1); }
    function start() { if (!autoplay) return; stop(); timer = setInterval(next, autoplay); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    if (prevBtn) prevBtn.addEventListener('click', function () { prev(); start(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { next(); start(); });
    if (dotsEl) dotsEl.addEventListener('click', function (e) { var d = e.target.closest('[data-i]'); if (d) { go(parseInt(d.dataset.i, 10)); start(); } });
    var dragging = false, sx = 0, stf = 0, moved = false;
    function down(e) { dragging = true; moved = false; sx = e.touches ? e.touches[0].clientX : e.clientX; stf = -index * step(); track.style.transition = 'none'; stop(); }
    function move(e) { if (!dragging) return; var x = e.touches ? e.touches[0].clientX : e.clientX; if (Math.abs(x - sx) > 5) moved = true; track.style.transform = 'translateX(' + (stf + x - sx) + 'px)'; }
    function up(e) {
      if (!dragging) return; dragging = false; track.style.transition = '';
      var x = e.changedTouches ? e.changedTouches[0].clientX : e.clientX, dx = x - sx, th = step() * 0.25;
      if (dx <= -th) next(); else if (dx >= th) prev(); else render();
      start();
    }
    viewport.addEventListener('mousedown', down); window.addEventListener('mousemove', move, { passive: true }); window.addEventListener('mouseup', up);
    viewport.addEventListener('touchstart', down, { passive: true }); viewport.addEventListener('touchmove', move, { passive: true }); viewport.addEventListener('touchend', up);
    viewport.addEventListener('click', function (e) { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
    if (autoplay) { viewport.addEventListener('mouseenter', stop); viewport.addEventListener('mouseleave', start); }
    var rz; window.addEventListener('resize', function () { clearTimeout(rz); rz = setTimeout(function () { render(false); }, 120); }, { passive: true });
    render(false); start();
    return { go: go, next: next, prev: prev, render: render };
  }

  /* ---------------- masterclass ---------------- */
  var MC_CDN = 'https://deen3evddmddt.cloudfront.net/uploads/master-class-media/';
  var MASTERCLASSES = [
    { title: 'Learn SQL for Data Analysis in 90 Minutes', img: MC_CDN + '1a-2026-11-04T104254-170-1793775597335-525104.webp', grad: 'linear-gradient(145deg,#1b1147,#3a1d8a)' },
    { title: 'Build Your Own AI Employee: Automate Everyday Tasks Using AI', img: MC_CDN + '1a-2026-10-26T170300-899-1793714286940-818504.webp', grad: 'linear-gradient(145deg,#06240f,#0b3d1a)' },
    { title: 'How to Become a Freelance Performance Marketer', img: MC_CDN + '1a-2026-11-04T175937-303-1793861038927-834592.webp', grad: 'linear-gradient(145deg,#10243f,#143a63)' },
    { title: 'Upcoming Live Masterclass with WsCube Tech', img: MC_CDN + '1a-2026-11-04T131540-690-1793778753297-944907.webp', grad: 'linear-gradient(145deg,#2b1247,#4a1d6b)' },
  ];
  function masterclassHTML() {
    return '<section class="section mc-section" id="masterclass" aria-labelledby="mc-h2"><div class="container"><div class="mc-head"><div>' +
      '<h2 class="sec-title" id="mc-h2">Upcoming Masterclass</h2><p class="sec-sub">Attend our live classes led by experienced and dedicated instructors of WsCube Tech.</p></div>' +
      '<div class="mc-nav"><button class="carousel-arrow" id="mc-prev" aria-label="Previous masterclasses">' + svg('<polyline points="15 18 9 12 15 6"/>', 18) + '</button>' +
      '<button class="carousel-arrow" id="mc-next" aria-label="Next masterclasses">' + svg('<polyline points="9 18 15 12 9 6"/>', 18) + '</button></div></div>' +
      '<div class="mc-viewport"><div class="mc-track" id="mc-track" aria-label="Masterclass listing"></div></div></div></section>';
  }
  function initMasterclass() {
    var track = $('#mc-track'); if (!track) return;
    track.innerHTML = MASTERCLASSES.map(function (m) {
      return '<article class="mc-card" style="--mc-grad:' + m.grad + ';" aria-label="' + esc(m.title) + '"><img class="mc-card-img" src="' + esc(m.img) + '" alt="' + esc(m.title) + '" loading="lazy" onerror="this.style.display=\'none\';this.parentElement.classList.add(\'mc-card-noimg\');" /></article>';
    }).join('');
    initCarousel({ track: track, viewport: track.parentElement, prevBtn: $('#mc-prev'), nextBtn: $('#mc-next'), gap: 24, loop: true, autoplay: 4500 });
  }

  /* ---------------- course slider ---------------- */
  function courseCardHTML(c) {
    return '<article class="pg-course">' +
      '<div class="pg-course-top"><div class="pg-course-row"><span class="pg-course-tag">' + esc(c.tag) + '</span>' +
      '<span class="pg-course-live"><i></i>' + esc(c.m) + '</span></div>' +
      '<span class="pg-course-ico">' + svg('<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>', 28) + '</span></div>' +
      '<div class="pg-course-body"><h3>' + esc(c.t) + '</h3>' +
      '<div class="pg-course-meta"><span>' + I.clock + ' ' + esc(c.d) + '</span><span>' + I.check + ' Certificate</span></div>' +
      '<ul>' + c.pts.map(function (p) { return '<li>' + I.check + '<span>' + esc(p) + '</span></li>'; }).join('') + '</ul>' +
      '<div class="pg-course-actions"><a class="pgb pgb--primary pgb--sm" href="' + esc(c.href) + '" target="_blank" rel="noopener">Know More ' + I.arrow + '</a>' +
      '<button class="pgb pgb--ghost pgb--sm" type="button" data-open-lead="Download Curriculum" data-course="">' + I.dl + ' Curriculum</button></div></div></article>';
  }  function courseSliderHTML(title, sub, activeCatId) {
    var list = COURSES.slice();
    var cfg = CAT_CFG[activeCatId];
    if (cfg && cfg.course >= 0) { var first = list.splice(cfg.course, 1)[0]; list.unshift(first); }
    return '<section class="pg-sec pg-sec--alt" id="courses"><div class="pg-wrap"><div class="pg-sec-head"><div><span class="pg-eyebrow">Online Programs</span><h2 class="pg-h2">' + esc(title) + '</h2>' + (sub ? '<p class="pg-sub">' + esc(sub) + '</p>' : '') + '</div>' +
      '<div class="mc-nav"><button class="carousel-arrow" id="co-prev" aria-label="Previous courses">' + svg('<polyline points="15 18 9 12 15 6"/>', 18) + '</button><button class="carousel-arrow" id="co-next" aria-label="Next courses">' + svg('<polyline points="9 18 15 12 9 6"/>', 18) + '</button></div></div>' +
      '<div class="pg-co-viewport" id="co-viewport"><div class="pg-co-track" id="co-track">' + list.map(courseCardHTML).join('') + '</div></div></div></section>';
  }
  function initCourseSlider() {
    var track = $('#co-track'); if (!track) return;
    initCarousel({ track: track, viewport: $('#co-viewport'), prevBtn: $('#co-prev'), nextBtn: $('#co-next'), gap: 20, loop: false });
  }

  /* ---------------- fixed CTA bar + back to top ---------------- */
  function initFloaters() {
    var bar = document.createElement('div');
    bar.className = 'pg-fixbar'; bar.id = 'pg-fixbar';
    bar.innerHTML = '<div class="pg-fixbar-in"><div class="pg-fixbar-txt"><span class="pg-fixbar-ico">' + svg('<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>', 20) + '</span><div><b>Confused about your career path?</b><span>Talk to a program advisor and get a personalised plan.</span></div></div>' +
      '<div class="pg-fixbar-act"><button class="pgb pgb--yellow" type="button" data-open-lead="Get Free Career Counselling">Get Free Career Counselling ' + I.arrow + '</button>' +
      '<button class="pg-fixbar-x" type="button" id="pg-fixbar-x" aria-label="Dismiss">' + I.x + '</button></div></div>';
    document.body.appendChild(bar);
    var top = document.createElement('button');
    top.className = 'pg-top'; top.id = 'pg-top'; top.type = 'button'; top.setAttribute('aria-label', 'Back to top'); top.innerHTML = I.up;
    document.body.appendChild(top);
    var dismissed = false;
    $('#pg-fixbar-x').addEventListener('click', function () { dismissed = true; bar.classList.remove('show'); document.body.classList.remove('has-fixbar'); });
    top.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    function onScroll() {
      var y = window.scrollY;
      var showBar = y > 420 && !dismissed;
      bar.classList.toggle('show', showBar);
      document.body.classList.toggle('has-fixbar', showBar);
      top.classList.toggle('show', y > 700);
    }
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }

  /* ---------------- FAQ builder ---------------- */
  function faqHTML(items, idPrefix) {
    return '<div class="faq-list">' + items.map(function (it, i) {
      return '<div class="faq-item"><button class="faq-q" aria-expanded="false" onclick="toggleFaq(this)" id="' + idPrefix + i + '"><span>' + esc(it.question) + '</span><span class="faq-icon" aria-hidden="true">' + ICONS.plus + '</span></button>' +
        '<div class="faq-a" role="region" aria-labelledby="' + idPrefix + i + '"><div class="faq-a-in">' + (it.answer || '') + '</div></div></div>';
    }).join('') + '</div>';
  }
  function faqsFromArticles(arts, limit) {
    var out = [];
    (arts || []).forEach(function (a) { (a.content || []).forEach(function (b) { if (b.type === 'faq') (b.items || []).forEach(function (q) { out.push(q); }); }); });
    return out.slice(0, limit || 8);
  }

  /* ---------------- share links ---------------- */
  function shareHTML(title) {
    var u = encodeURIComponent(location.href), t = encodeURIComponent(title || document.title);
    var items = [
      ['Facebook', 'https://www.facebook.com/sharer/sharer.php?u=' + u, '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>'],
      ['X', 'https://twitter.com/intent/tweet?url=' + u + '&text=' + t, '<path d="M4 4l16 16M20 4L4 20"/>'],
      ['LinkedIn', 'https://www.linkedin.com/sharing/share-offsite/?url=' + u, '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/>'],
      ['WhatsApp', 'https://wa.me/?text=' + t + '%20' + u, '<path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-5.2A8.5 8.5 0 1 1 21 11.5z"/>'],
    ];
    return '<div class="pg-share" aria-label="Share"><span class="pg-share-lbl">Share</span>' + items.map(function (s) {
      return '<a class="pg-share-btn" href="' + esc(s[1]) + '" target="_blank" rel="noopener" aria-label="Share on ' + s[0] + '" title="' + s[0] + '">' + svg(s[2], 16) + '</a>';
    }).join('') + '<button class="pg-share-btn pg-copy" type="button" aria-label="Copy link" title="Copy link">' + svg('<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>', 16) + '</button></div>';
  }
  function wireCopy() {
    $$('.pg-copy').forEach(function (b) {
      b.addEventListener('click', function () {
        function done() { b.classList.add('copied'); setTimeout(function () { b.classList.remove('copied'); }, 1800); }
        if (navigator.clipboard) navigator.clipboard.writeText(location.href).then(done, done); else done();
      });
    });
  }
  /* ---------------- testimonials ---------------- */
  function storiesHTML(shortName) {
    return '<div class="pg-stories">' + STORIES.slice(0, 3).map(function (s, i) {
      return '<article class="pg-story"><div class="pg-story-q">&ldquo;</div><div class="pg-stars" aria-label="5 out of 5">' + I.star + I.star + I.star + I.star + I.star + '</div>' +
        '<p>' + esc(QUOTES[i % QUOTES.length].replace('%s', shortName)) + '</p>' +
        '<div class="pg-story-who"><span class="pg-story-ph" style="background:' + s.g + '"><img src="' + esc(s.photo) + '" alt="' + esc(s.name) + '" loading="lazy" onerror="this.remove()" /></span>' +
        '<div><b>' + esc(s.name) + '</b><span>Now at ' + esc(s.co) + '</span></div></div></article>';
    }).join('') + '</div>';
  }

  window.PG = {
    COURSES: COURSES, CITIES: CITIES, RELATED_NAMES: RELATED_NAMES, CAT_CFG: CAT_CFG, cfgFor: cfgFor,
    initLeadModal: initLeadModal, initCarousel: initCarousel, masterclassHTML: masterclassHTML, initMasterclass: initMasterclass,
    courseSliderHTML: courseSliderHTML, initCourseSlider: initCourseSlider, initFloaters: initFloaters,
    faqHTML: faqHTML, faqsFromArticles: faqsFromArticles, shareHTML: shareHTML, wireCopy: wireCopy, storiesHTML: storiesHTML, I: I, svg: svg,
  };
})();
