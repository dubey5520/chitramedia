/* ============================================================
   CHITRASWAY MEDIA — script.js  (Fixed Build 2026)
   ============================================================ */

/* ══════════ LOADER ══════════ */
function hideLoader() {
  const loader = document.getElementById('loader');
  if (loader) loader.classList.add('hidden');
}

// Fires once HTML is parsed and critical DOM is ready —
// doesn't wait for images/videos/fonts to finish downloading
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(hideLoader, 300); // small buffer so the fade-out feels intentional, not abrupt
});

// Safety net: never trap the user behind the loader for more than 4s,
// no matter how slow a background asset is
setTimeout(hideLoader, 4000);

function initViewportManager() {
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');
  const navLinks = document.getElementById('navLinks');
  const navToggle = document.getElementById('navToggle');

  /* Handle scroll effects for Navbar and Back-to-Top button */
  window.addEventListener('scroll', () => {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 60);
    if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  /* Safety net: close menu on rotate-to-desktop */
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1025) {
      if (navLinks) navLinks.classList.remove('open');
      if (navToggle) {
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
      document.body.style.overflow = '';
    }
  }, { passive: true });
} 
initViewportManager();

function initMenuController() {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (!navToggle || !navLinks) return; 

  /* Toggle hamburger → X and open/close menu */
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('active', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  /* Close menu on any nav link click */
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      const isAnchor = href && href.startsWith('#');

      /* Close menu instantly */
      navLinks.classList.remove('open');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');

      /* Smooth scroll logic */
      if (isAnchor && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          setTimeout(() => {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 50); 
        }
      }
    });
  });
}
initMenuController();

/* ══════════ BACK TO TOP ══════════ */
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ══════════ DARK / LIGHT MODE ══════════ */
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  const savedTheme = localStorage.getItem('cm-theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light');
    themeToggle.textContent = '☀️';
  }
  themeToggle.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light');
    themeToggle.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('cm-theme', isLight ? 'light' : 'dark');
  });
}

/* ══════════ TYPEWRITER ══════════ */
const words = ['START THE SCALE.', 'GROW THE BRAND.', 'BUILD THE FUTURE.', 'WIN THE FEED.'];
const typeEl = document.getElementById('typewriterText');
if (typeEl) {
  let wIdx = 0, cIdx = 0, deleting = false;
  function typeLoop() {
    const word = words[wIdx];
    typeEl.textContent = deleting ? word.slice(0, cIdx--) : word.slice(0, cIdx++);
    let delay = deleting ? 50 : 180;
    if (!deleting && cIdx > word.length) { delay = 1800; deleting = true; }
    if (deleting && cIdx < 0) { deleting = false; wIdx = (wIdx + 1) % words.length; delay = 300; }
    setTimeout(typeLoop, delay);
  }
  typeLoop();
}

/* ══════════ RING CAROUSEL ══════════ */
const ringClips = [
  { label:'Real Estate Creator', thumb:'https://res.cloudinary.com/idohvgwz/image/upload/v1784351162/BPTPSkynest_pfjfuo.png', video:'https://res.cloudinary.com/idohvgwz/video/upload/v1784305630/BPTPSkynest_compress_i7nv9w.mp4', hue:38, sat:55 },
  { label:'Real Estate Creator', thumb:'https://res.cloudinary.com/idohvgwz/image/upload/v1784351208/CreatorRE01_z53kgh.png', video:'https://res.cloudinary.com/idohvgwz/video/upload/v1784305686/CreatorRE01_compress_smn76r.mp4', hue:45, sat:45 },
  { label:'AI Commercial', thumb:'https://res.cloudinary.com/idohvgwz/image/upload/v1784351280/Milk_yejg2y.png', video:'https://res.cloudinary.com/idohvgwz/video/upload/v1784305870/Milk_commercial_tf8byf.mp4', hue:200, sat:40 },
  { label:'Street Clothing Brand', thumb:'https://res.cloudinary.com/idohvgwz/image/upload/v1784351100/Fashion_Videos_enmtag.jpg', video:'https://res.cloudinary.com/idohvgwz/video/upload/v1784344137/Ghareeza09_pb3att.mp4', hue:16, sat:50 },
  { label:'Property Walk Through', thumb:'https://res.cloudinary.com/idohvgwz/image/upload/v1784351342/Real_estate_okhtal.png', video:'https://res.cloudinary.com/idohvgwz/video/upload/v1784305921/Real_estate_pkxi0m.mp4', hue:260, sat:35 },
  { label:'Real Estate Commercial', thumb:'https://res.cloudinary.com/idohvgwz/image/upload/v1784351294/plot_video_rynk3b.jpg', video:'https://res.cloudinary.com/idohvgwz/video/upload/v1784344359/Sanskarenclave02June_compress_gzj1fx.mp4', hue:30, sat:48 },
  { label:'Real Estate Event', thumb:'https://res.cloudinary.com/idohvgwz/image/upload/v1784351378/RoyalgreenTwin02_zrsamk.png', video:'https://res.cloudinary.com/idohvgwz/video/upload/v1784305594/RoyalgreenTwin02_compress_jzpn8i.mp4', hue:28, sat:52 },
  { label:'Brand Meta Ads', thumb:'https://res.cloudinary.com/idohvgwz/image/upload/v1784351240/Man_walking_indoor_sportswear_brand_hh9jrf.jpg', video:'https://res.cloudinary.com/idohvgwz/video/upload/v1784344446/RDKLU02sept_ciispc.mp4', hue:22, sat:42 },
];

const ringTrack = document.getElementById('ringTrack');
const ringNowLabel = document.getElementById('ringNowLabel');

if (ringTrack && ringNowLabel) {
  const RING_N = ringClips.length, RING_R = 440, CARD_W = 240, CARD_H = 426;
  let ringAngle = 0, ringRaf = null, ringFrontIdx = 0;
  let isHovered = false; // Flag to track hover state
  const ringCards = [];

  ringClips.forEach((clip, i) => {
    const card = document.createElement('div');
    card.className = 'ring-card';

    if (clip.video) {
      const vid = document.createElement('video');
      vid.className = 'ring-thumb-bg';
      vid.src = clip.video; vid.poster = clip.thumb;
      vid.muted = true; vid.loop = true; vid.playsInline = true; vid.preload = 'none';
      card.appendChild(vid);
      
      card.addEventListener('mouseenter', () => vid.play().catch(() => {}));
      card.addEventListener('mouseleave', () => { vid.pause(); vid.currentTime = 0; });
    } else {
      const bg = document.createElement('div');
      bg.className = 'ring-thumb-bg';
      bg.style.background = `radial-gradient(ellipse at 40% 35%,hsla(${clip.hue},${clip.sat}%,12%,1) 0%,hsl(${clip.hue+8},${clip.sat-12}%,4%) 100%)`;
      card.appendChild(bg);
    }

    const overlay = document.createElement('div');
    overlay.className = 'ring-card-overlay';
    const lbl = document.createElement('div');
    lbl.className = 'ring-card-label';
    lbl.textContent = clip.label;
    overlay.appendChild(lbl);
    card.appendChild(overlay);

    card.addEventListener('click', () => {
      if (ringFrontIdx === i && ringClips[i].video) openLightbox(ringClips[i].video);
    });

    ringTrack.appendChild(card);
    ringCards.push(card);
  });

  function ringPosition(deg) {
    ringCards.forEach((card, i) => {
      const theta = (2 * Math.PI * i / RING_N) + (deg * Math.PI / 180);
      const x = Math.sin(theta) * RING_R;
      const z = Math.cos(theta) * RING_R;
      const y = Math.sin(theta * 0.5) * -30;
      const depth = (z + RING_R) / (2 * RING_R);
      const scale = 0.50 + depth * 0.68;
      const opacity= 0.22 + depth * 0.78;
      card.style.cssText = `position:absolute;width:${CARD_W}px;height:${CARD_H}px;border-radius:12px;overflow:hidden;cursor:pointer;background:#141414;transform:translate(${x-CARD_W/2}px,${y-CARD_H/2}px) scale(${scale.toFixed(3)});opacity:${opacity.toFixed(3)};z-index:${Math.round(depth*100)};transition:border-color .35s,box-shadow .35s;`;
      const front = z > RING_R * 0.86;
      card.style.border = front ? '1.5px solid rgba(201,168,76,.8)' : '1.5px solid rgba(201,168,76,0)';
      card.style.boxShadow = front ? '0 0 28px rgba(201,168,76,.18)' : 'none';
      card.querySelector('.ring-card-overlay').style.opacity = front ? '1' : '0';
      if (front && ringFrontIdx !== i) { ringFrontIdx = i; ringNowLabel.textContent = ringClips[i].label; }
    });
  }

  function ringAutoRotate() { 
    // Only update the angle if the mouse is not hovering
    if (!isHovered) {
      ringAngle -= 0.14; 
      ringPosition(ringAngle); 
    }
    ringRaf = requestAnimationFrame(ringAutoRotate); 
  }

  function ringSnapTo(idx) {
    cancelAnimationFrame(ringRaf);
    const step = 360 / RING_N;
    const curr = ((ringAngle % 360) + 360) % 360;
    const tgt = ((idx * step) % 360 + 360) % 360;
    let delta = tgt - curr;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    const from = ringAngle, to = ringAngle - delta, start = performance.now(), DUR = 520;
    const ease = t => t < .5 ? 2*t*t : -1+(4-2*t)*t;
    function step2(now) {
      const t = Math.min((now - start) / DUR, 1);
      ringAngle = from + (to - from) * ease(t);
      ringPosition(ringAngle);
      if (t < 1) requestAnimationFrame(step2); else ringAutoRotate();
    }
    requestAnimationFrame(step2);
  }

  const ringPrevBtn = document.getElementById('ringPrev');
  const ringNextBtn = document.getElementById('ringNext');
  if (ringPrevBtn) ringPrevBtn.addEventListener('click', () => ringSnapTo((ringFrontIdx - 1 + RING_N) % RING_N));
  if (ringNextBtn) ringNextBtn.addEventListener('click', () => ringSnapTo((ringFrontIdx + 1) % RING_N));

  let rTouchX = null;
  const ringScene = document.getElementById('ringScene');
  if (ringScene) {
    // Pause auto-rotation on hover
    ringScene.addEventListener('mouseenter', () => isHovered = true);
    ringScene.addEventListener('mouseleave', () => isHovered = false);

    ringScene.addEventListener('touchstart', e => { rTouchX = e.touches[0].clientX; }, { passive: true });
    ringScene.addEventListener('touchend', e => {
      if (rTouchX === null) return;
      const dx = e.changedTouches[0].clientX - rTouchX;
      if (Math.abs(dx) > 40) ringSnapTo(dx < 0 ? (ringFrontIdx + 1) % RING_N : (ringFrontIdx - 1 + RING_N) % RING_N);
      rTouchX = null;
    }, { passive: true });
  }

  ringAutoRotate();
}

/* ══════════ SHOWREEL ══════════ */
const showreels = [
  { src: 'https://res.cloudinary.com/idohvgwz/video/upload/v1784344962/Comp_2_1_yw6trr.mp4',   title: 'Commercial — Brand Showcase',   label: "Campaign",   thumb: 'https://res.cloudinary.com/idohvgwz/image/upload/v1784351167/honda_tet8ap.png' },
  { src: 'https://res.cloudinary.com/idohvgwz/video/upload/v1784346135/Real_estate_ad_compress_rl0vci.mp4', title: 'Real Estate Tour',   label: 'Architectural Showcase',   thumb: 'https://res.cloudinary.com/idohvgwz/image/upload/v1784351343/Rael_estate_fxukf4.png' },
  { src: 'https://res.cloudinary.com/idohvgwz/video/upload/v1784344848/chitraai_ad_y4ennb.mp4',   title: 'AI Campaign- Films',     label: 'Short Film',    thumb: 'https://res.cloudinary.com/idohvgwz/image/upload/v1784351113/chitraai_owmo0u.png' },
  { src: 'https://res.cloudinary.com/idohvgwz/video/upload/v1784343882/cc4k_compress_ztxaiw.mp4', title: 'Product Advertisement', label: 'Campaign', thumb: 'https://res.cloudinary.com/idohvgwz/image/upload/v1784351055/cc4k_f0fh0a.png' }
];
/* ══════════ SHOWREEL ══════════ */

const showreelVid = document.getElementById('showreelVideo');
const showreelTitle = document.getElementById('showreelTitle');
const showreelLabel = document.getElementById('showreelLabel');
const showreelDots = document.getElementById('showreelDots');
const showreelProg = document.getElementById('showreelProgress');

if (showreelVid && showreelDots) {
  let srIdx = 0, srTimer = null, srHovering = false, srLoaded = false;

  // Switches which reel is selected: swaps poster image, title, label, and
  // active dot. Does NOT touch the network — the video file isn't requested here.
  function selectShowreel(idx, autoplay = false) {
    srIdx = idx;
    clearInterval(srTimer);
    srLoaded = false;

    showreelVid.pause();
    showreelVid.removeAttribute('src');
    showreelVid.load(); // drops any loaded video so the poster image shows again
    showreelVid.poster = showreels[idx].thumb;

    if (showreelTitle) showreelTitle.textContent = showreels[idx].title;
    if (showreelLabel) showreelLabel.textContent = showreels[idx].label;
    showreelDots.querySelectorAll('.showreel-dot').forEach((d, i) => d.classList.toggle('active', i === idx));
    if (showreelProg) showreelProg.style.width = '0%';

    if (autoplay || srHovering) playShowreel();
  }

  // Fetches and plays the current reel. Only called from a hover/tap
  // interaction (or when auto-chaining to the next reel while still hovered).
  function playShowreel() {
    if (!srLoaded) {
      showreelVid.src = showreels[srIdx].src; // the actual video request happens here
      showreelVid.load();
      srLoaded = true;
    }
    showreelVid.play().catch(() => {});

    if (showreelProg) {
      clearInterval(srTimer);
      let elapsed = 0;
      srTimer = setInterval(() => {
        elapsed += 250;
        const dur = (showreelVid.duration || 8) * 1000;
        showreelProg.style.width = Math.min(elapsed / dur * 100, 100) + '%';
        if (elapsed >= dur) {
          clearInterval(srTimer);
          selectShowreel((srIdx + 1) % showreels.length, true); // keeps cycling while still hovered
        }
      }, 250);
    }
  }

  // Drops the loaded video and reverts to the thumbnail — this is the resting state
  function stopShowreel() {
    clearInterval(srTimer);
    showreelVid.pause();
    showreelVid.removeAttribute('src');
    showreelVid.load();
    srLoaded = false;
    if (showreelProg) showreelProg.style.width = '0%';
  }

  const showreelStage = showreelVid.parentElement || showreelVid;
  showreelStage.addEventListener('mouseenter', () => { srHovering = true; playShowreel(); });
  showreelStage.addEventListener('mouseleave', () => { srHovering = false; stopShowreel(); });
  showreelStage.addEventListener('click', () => playShowreel()); // tap-to-play fallback for touch screens

  showreels.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'showreel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Showreel ${i + 1}`);
    dot.addEventListener('click', (e) => { e.stopPropagation(); selectShowreel(i, true); });
    showreelDots.appendChild(dot);
  });

  selectShowreel(0); // shows the first thumbnail only — nothing loads until interaction
}

/* ══════════ FEATURED REELS STRIP ══════════ */
(function () {
  const strip = document.getElementById('reelsStrip');
  if (!strip) return;

  strip.querySelectorAll('.reel-card').forEach(card => {
    const video = card.querySelector('.reel-video');
    const thumb = card.querySelector('.reel-thumb');
    if (!video) return;

    card.addEventListener('mouseenter', () => {
      video.play().catch(() => {});
      if (thumb) thumb.style.opacity = '0';
      video.style.opacity = '1';
    });
    card.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0;
      video.style.opacity = '0';
      if (thumb) thumb.style.opacity = '1';
    });

    let tapped = false;
    card.addEventListener('click', e => {
      if (window.innerWidth > 767) {
        openLightbox(card.dataset.video);
        return;
      }
      if (!tapped) {
        e.preventDefault();
        tapped = true;
        video.play().catch(() => {});
        if (thumb) thumb.style.opacity = '0';
        video.style.opacity = '1';
        card.classList.add('playing');
      } else {
        tapped = false;
        video.pause();
        video.currentTime = 0;
        video.style.opacity = '0';
        if (thumb) thumb.style.opacity = '1';
        card.classList.remove('playing');
        if (card.dataset.video) openLightbox(card.dataset.video);
      }
    });
  });

  const origCards = Array.from(strip.querySelectorAll('.reel-card'));
  origCards.forEach(c => {
    const clone = c.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    const vid = clone.querySelector('.reel-video');
    const img = clone.querySelector('.reel-thumb');
    if (vid && img) {
      clone.addEventListener('mouseenter', () => { vid.play().catch(() => {}); img.style.opacity = '0'; vid.style.opacity = '1'; });
      clone.addEventListener('mouseleave', () => { vid.pause(); vid.currentTime = 0; vid.style.opacity = '0'; img.style.opacity = '1'; });
    }
    strip.appendChild(clone);
  });

  strip.addEventListener('mouseenter', () => strip.style.animationPlayState = 'paused');
  strip.addEventListener('mouseleave', () => strip.style.animationPlayState = 'running');
})();

/* ══════════ PORTFOLIO SELECTED WORK ══════════ */

const projects = [
  { 
    category: 'commercials', tag: 'Commercial', title: 'TVC Film',      
    video: 'https://res.cloudinary.com/idohvgwz/video/upload/v1784345150/TVC_video_2_compress_wu1lfv.mp4',   
    thumbnail: 'https://res.cloudinary.com/idohvgwz/image/upload/v1784351400/tvc_ad_zzdpgr.png'  
  },
  { 
    category: 'commercials', tag: 'Commercial', title: 'Product Ads',       
    video: 'https://res.cloudinary.com/idohvgwz/video/upload/v1784343882/cc4k_compress_ztxaiw.mp4',     
    thumbnail: 'https://res.cloudinary.com/idohvgwz/image/upload/v1784351055/cc4k_f0fh0a.png' 
  },
  { 
    category: 'commercials', tag: 'Commercial', title: 'Brand Commercial',      
    video: 'https://res.cloudinary.com/idohvgwz/video/upload/v1784344962/Comp_2_1_yw6trr.mp4',   
    thumbnail: 'https://res.cloudinary.com/idohvgwz/image/upload/v1784351167/honda_tet8ap.png'  
  },
  { 
    category: 'commercials', tag: 'Commercial', title: 'AI Commercial',       
    video: 'https://res.cloudinary.com/idohvgwz/video/upload/v1784344848/chitraai_ad_y4ennb.mp4',     
    thumbnail: 'https://res.cloudinary.com/idohvgwz/image/upload/v1784351113/chitraai_owmo0u.png' 
  },
  { 
    category: 'motion', tag: 'Social Media', title: 'SAAS Animation',       
    video: "https://res.cloudinary.com/idohvgwz/video/upload/v1784306569/final_video_i6vvbz.mp4",   
    thumbnail: 'https://res.cloudinary.com/idohvgwz/image/upload/v1784351108/final_video_cjenoz.png'
  },
  { 
    category: 'motion', tag: 'Social Media', title: 'Meta Ads',       
    video: 'https://res.cloudinary.com/idohvgwz/video/upload/v1784346135/Real_estate_ad_compress_rl0vci.mp4',   
    thumbnail: 'https://res.cloudinary.com/idohvgwz/image/upload/v1784351343/Rael_estate_fxukf4.png' 
  },
  { 
    category: 'motion', tag: 'Social Media', title: 'Documentary',       
    video: 'https://res.cloudinary.com/idohvgwz/video/upload/v1784318219/Doc01_Compress_pe0ezo.mp4',   
    thumbnail: 'https://res.cloudinary.com/idohvgwz/image/upload/v1784351370/sunidhi_dswsy2.png' 
  },
  { 
    category: 'motion', tag: 'Social Media', title: 'Documentary',       
    video: 'https://res.cloudinary.com/idohvgwz/video/upload/v1784307641/Renalias_V01_Compress_jqitvs.mp4',   
    thumbnail: 'https://res.cloudinary.com/idohvgwz/image/upload/v1784351318/Renaliese_bh6cdp.jpg'
  },
  { 
    category: 'realestate', tag: 'Real Estate', title: 'Digital Walkthrough', 
    video: 'https://res.cloudinary.com/idohvgwz/video/upload/v1784305512/The_RIPL_video_compress_pbanle.mp4',     
    thumbnail: 'https://res.cloudinary.com/idohvgwz/image/upload/v1784351384/THE_ripl_jijboj.png' 
  },
  { 
    category: 'realestate', tag: 'Real Estate', title: 'Podcast',    
    video: 'https://res.cloudinary.com/idohvgwz/video/upload/v1784347334/Podcast_Teaser01_wwvyaj.mp4',     
    thumbnail: 'https://res.cloudinary.com/idohvgwz/image/upload/v1784351306/Podcast_Teaser01_o1k76u.png'  
  },
  { 
    category: 'realestate', tag: 'Real Estate', title: 'Property Tour',     
    video: 'https://res.cloudinary.com/idohvgwz/video/upload/v1784346286/FarmVilla_compress_ugk4qu.mp4',     
    thumbnail: 'https://res.cloudinary.com/idohvgwz/image/upload/v1784351042/Farmvilla_qycbr5.png'
  },
  { 
    category: 'realestate', tag: 'Real Estate', title: 'Case Study',     
    video: 'https://res.cloudinary.com/idohvgwz/video/upload/v1784346287/Deepti_malik01_compress_bi3voi.mp4',     
    thumbnail: 'https://res.cloudinary.com/idohvgwz/image/upload/v1784351067/deepti_vbcnum.png' 
  }
];

const portfolioTrack = document.getElementById('portfolioTrack');
const portfolioStrip = document.getElementById('portfolioStrip');
const filterTabsContainer = document.getElementById('filterTabs');

if (portfolioTrack && portfolioStrip) {
  let pAnimId = null, pScrollX = 0, pPaused = false;
  const pSpeed = 1;
  let pSetWidth = 0;

  function renderPortfolio(filter = 'all') {
    if (pAnimId) cancelAnimationFrame(pAnimId);
    portfolioTrack.innerHTML = '';
    pScrollX = 0;
    portfolioStrip.scrollLeft = 0;

    const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);
    if (filtered.length === 0) {
      portfolioTrack.innerHTML = '<p style="padding:20px 40px;color:var(--grey)">No projects found.</p>';
      return;
    }

    const layout = filtered.length < 3
      ? [...filtered, ...filtered, ...filtered, ...filtered]
      : [...filtered, ...filtered];

    layout.forEach(project => {
      const card = document.createElement('div');
      card.className = 'portfolio-card';
      card.innerHTML = `
        <video muted loop playsinline preload="none" poster="${project.thumbnail}" data-src="${project.video}"></video>
        <div class="portfolio-overlay">
          <div>
            <div class="portfolio-tag">${project.tag}</div>
            <div class="portfolio-title">${project.title}</div>
          </div>
        </div>`;
      portfolioTrack.appendChild(card);
    });

    requestAnimationFrame(() => {
      const uniqueCount = layout.length / 2;
      const sampleCard = portfolioTrack.children[0];
      if (!sampleCard) return;
      const cardFullW = sampleCard.getBoundingClientRect().width + 24; // 24px is the gap in CSS
      pSetWidth = cardFullW * uniqueCount;
      initPortfolioCards();
      startPortfolioScroll();
    });
  }

  function startPortfolioScroll() {
    function loop() {
      if (!pPaused) {
        pScrollX += pSpeed;
        if (pScrollX >= pSetWidth && pSetWidth > 0) pScrollX = 0;
        portfolioStrip.scrollLeft = pScrollX;
      }
      pAnimId = requestAnimationFrame(loop);
    }
    pAnimId = requestAnimationFrame(loop);
  }

  function initPortfolioCards() {
    portfolioTrack.querySelectorAll('.portfolio-card').forEach(card => {
      const video = card.querySelector('video');
      let playPromise;

      // Attaches the real video file to the <video> tag the first time it's needed.
      // Before this runs, the card shows only its poster thumbnail — no network request.
      function ensureLoaded() {
        if (video && !video.src && video.dataset.src) {
          video.src = video.dataset.src;
          video.load();
        }
      }

      // Desktop: hover loads (once) and plays
      card.addEventListener('mouseenter', () => {
        pPaused = true;
        if (video) { ensureLoaded(); playPromise = video.play(); }
      });

      card.addEventListener('mouseleave', () => {
        if(video) { 
          if (playPromise !== undefined) {
            playPromise.then(() => {
              video.pause(); 
              video.currentTime = 0;
            }).catch(() => {}); // Ignores fast-swipe errors
          } else {
            video.pause();
            video.currentTime = 0;
          }
        } 
        pPaused = false; 
      });

      // Mobile: first tap loads + plays, second tap opens the lightbox
      let tapped = false;
      card.addEventListener('click', () => {
        if (!video) return;
        if (!tapped) {
          tapped = true;
          pPaused = true;
          ensureLoaded();
          video.play().catch(() => {});
        } else {
          if (video.dataset.src) openLightbox(video.dataset.src);
        }
      });
    });
  }

  if (filterTabsContainer) {
    filterTabsContainer.addEventListener('click', e => {
      const btn = e.target.closest('.filter-tab');
      if (!btn) return;
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      renderPortfolio(btn.dataset.filter);
    });
  }

  renderPortfolio('all');
}

/* ══════════ SCROLL REVEAL ══════════ */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { 
      e.target.classList.add('visible'); 
      revealObs.unobserve(e.target); 
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ══════════ LAZY VIDEO (Intersection Observer) ══════════ */
const lazyVids = document.querySelectorAll('video[preload="none"]');
const vidObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const v = e.target;
      v.querySelectorAll('source').forEach(s => { if (!v.src && s.src) v.src = s.src; });
      v.load();
      vidObs.unobserve(v);
    }
  });
}, { rootMargin: '200px' });
lazyVids.forEach(v => vidObs.observe(v));

function openLightbox(src) {
  // Add lightbox implementation if needed
}

/* ══════════ CONTACT FORM & INTL TEL INPUT WITH SUPABASE ══════════ */
document.addEventListener("DOMContentLoaded", () => {
  // 1. Connection Configurations (Using your specific project URL)
  const SUPABASE_URL = "https://vliyixytklvjexirgehy.supabase.co"; 
  
  // REPLACE THIS placeholder with your actual public 'anon' key (NOT the secret key!)
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsaXlpeHl0a2x2amV4aXJnZWh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQwOTkyMTgsImV4cCI6MjA5OTY3NTIxOH0.0Dnlw5zmoR-xoZk0Rw8NZcBmsb20Hu1lPKpX6IKgb9U"; 
  
  const supabaseInstance = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

  const phoneInputField = document.querySelector("#fphone");
  let phoneInput = null;

  if (phoneInputField && window.intlTelInput) {
    phoneInput = window.intlTelInput(phoneInputField, {
      initialCountry: "in", 
      separateDialCode: true, 
      utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/18.2.1/js/utils.js",
    });
  }

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async function(event) {
      event.preventDefault(); 
      
      const form = event.target;
      const submitBtn = document.getElementById('submitBtn');

      if (!form.checkValidity()) {
        alert("We're missing a few details. Please complete all required fields so we can assist you better.");
        return; 
      }

      if (!supabaseInstance) {
        console.error("Supabase SDK did not load. Check that the script tag is added in your HTML.");
        alert("Configuration error. Please try again later.");
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = "Sending details...";
      }

      // Format the dial code (+91) explicitly with the raw text input digits
      let fullPhoneNumber = null;
      if (phoneInputField && phoneInputField.value.trim() !== "" && phoneInput) {
        const countryData = phoneInput.getSelectedCountryData();
        fullPhoneNumber = `+${countryData.dialCode}${phoneInputField.value.trim()}`;
      }

      const payloadData = {
        name: document.getElementById('fname').value,
        company: document.getElementById('fcompany').value || null,
        email: document.getElementById('femail').value,
        phone: fullPhoneNumber, 
        project_type: document.getElementById('ftype').value,
        budget_range: document.getElementById('fbudget').value || null,
        timeline: document.getElementById('ftimeline').value || null,
        project_details: document.getElementById('fdetails').value || null
      };

      try {
        const { error } = await supabaseInstance
          .from('leads') 
          .insert(payloadData);

        if (error) throw error;

        const successMsg = document.getElementById('formSuccess');
        if (successMsg) {
          successMsg.style.display = 'block';
          form.style.display = 'none';
        } else {
          alert("Success! Your edit details have been submitted.");
          form.reset();
        }

      } catch (dbError) {
        console.error("Supabase Operation Failed:", dbError);
        alert(`Failed to save details: ${dbError.message || dbError}`);
        
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerText = "Let's Elevate Your Edit →";
        }
      }
    });
  }
});
