/* ============================================================
   GALLERY 326 — script.js
   Populates exhibition grid, drives lightbox carousel, interactive
   screening-room paint simulation, scroll reveals, and mobile nav.
   ============================================================ */

/* ---- 1. Exhibition Data -------------------------------------------------- */
const ARTWORKS = [
  { img: "images/art-01.jpg", no: "001", title: "Curated Masterwork No. 1",  artist: "@art.gallery_326", medium: "Fine Art Collection, 2026" },
  { img: "images/art-02.jpg", no: "002", title: "Curated Masterwork No. 2",  artist: "@art.gallery_326", medium: "Fine Art Collection, 2026" },
  { img: "images/art-03.jpg", no: "003", title: "Curated Masterwork No. 3",  artist: "@art.gallery_326", medium: "Fine Art Collection, 2026" },
  { img: "images/art-04.jpg", no: "004", title: "Curated Masterwork No. 4",  artist: "@art.gallery_326", medium: "Fine Art Collection, 2026" },
  { img: "images/art-05.jpg", no: "005", title: "Curated Masterwork No. 5",  artist: "@art.gallery_326", medium: "Fine Art Collection, 2026" },
  { img: "images/art-06.jpg", no: "006", title: "Curated Masterwork No. 6",  artist: "@art.gallery_326", medium: "Fine Art Collection, 2026" },
  { img: "images/art-07.jpg", no: "007", title: "Curated Masterwork No. 7",  artist: "@art.gallery_326", medium: "Fine Art Collection, 2026" },
  { img: "images/art-08.jpg", no: "008", title: "Curated Masterwork No. 8",  artist: "@art.gallery_326", medium: "Fine Art Collection, 2026" },
  { img: "images/art-09.jpg", no: "009", title: "Curated Masterwork No. 9",  artist: "@art.gallery_326", medium: "Fine Art Collection, 2026" },
  { img: "images/art-10.jpg", no: "010", title: "Curated Masterwork No. 10", artist: "@art.gallery_326", medium: "Fine Art Collection, 2026" },
  { img: "images/art-11.jpg", no: "011", title: "Curated Masterwork No. 11", artist: "@art.gallery_326", medium: "Fine Art Collection, 2026" },
  { img: "images/art-12.jpg", no: "012", title: "Curated Masterwork No. 12", artist: "@art.gallery_326", medium: "Fine Art Collection, 2026" },
  { img: "images/art-13.jpg", no: "013", title: "Curated Masterwork No. 13", artist: "@art.gallery_326", medium: "Fine Art Collection, 2026" },
  { img: "images/art-14.jpg", no: "014", title: "Curated Masterwork No. 14", artist: "@art.gallery_326", medium: "Fine Art Collection, 2026" },
  { img: "images/art-15.jpg", no: "015", title: "Curated Masterwork No. 15", artist: "@art.gallery_326", medium: "Fine Art Collection, 2026" },
  { img: "images/art-16.jpg", no: "016", title: "Curated Masterwork No. 16", artist: "@art.gallery_326", medium: "Fine Art Collection, 2026" },
  { img: "images/art-17.jpg", no: "017", title: "Curated Masterwork No. 17", artist: "@art.gallery_326", medium: "Fine Art Collection, 2026" },
  { img: "images/art-18.jpg", no: "018", title: "Curated Masterwork No. 18", artist: "@art.gallery_326", medium: "Fine Art Collection, 2026" },
  { img: "images/art-19.jpg", no: "019", title: "Curated Masterwork No. 19", artist: "@art.gallery_326", medium: "Fine Art Collection, 2026" },
  { img: "images/art-20.jpg", no: "020", title: "Curated Masterwork No. 20", artist: "@art.gallery_326", medium: "Fine Art Collection, 2026" },
  { img: "images/art-21.jpg", no: "021", title: "Curated Masterwork No. 21", artist: "@art.gallery_326", medium: "Fine Art Collection, 2026" },
  { img: "images/art-22.jpg", no: "022", title: "Curated Masterwork No. 22", artist: "@art.gallery_326", medium: "Fine Art Collection, 2026" },
];

let currentLightboxIndex = 0;

/* ---- 2. Build the exhibition grid ---------------------------------- */
const grid = document.getElementById("galleryGrid");

ARTWORKS.forEach((art, index) => {
  const frame = document.createElement("article");
  frame.className = "frame reveal";
  frame.tabIndex = 0;
  frame.setAttribute("role", "button");
  frame.setAttribute("aria-label", `View artwork ${index + 1}`);
  frame.innerHTML = `
    <div class="frame__img-wrap">
      <img src="${art.img}" alt="Fine Art Artwork by @art.gallery_326" loading="lazy">
    </div>
  `;
  frame.addEventListener("click", () => openLightbox(index));
  frame.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox(index); }
  });
  grid.appendChild(frame);
});


/* ---- 3. Lightbox with Carousel Navigation ------------------------------ */
const lightbox        = document.getElementById("lightbox");
const lightboxImg      = document.getElementById("lightboxImg");
const lightboxClose    = document.getElementById("lightboxClose");
const lightboxPrev     = document.getElementById("lightboxPrev");
const lightboxNext     = document.getElementById("lightboxNext");

function openLightbox(index){
  currentLightboxIndex = (index + ARTWORKS.length) % ARTWORKS.length;
  const art = ARTWORKS[currentLightboxIndex];

  lightboxImg.src = art.img;
  lightboxImg.alt = `Artwork ${currentLightboxIndex + 1}`;

  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}


function closeLightbox(){
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function prevArtwork(){ openLightbox(currentLightboxIndex - 1); }
function nextArtwork(){ openLightbox(currentLightboxIndex + 1); }

lightboxClose.addEventListener("click", closeLightbox);
lightboxPrev.addEventListener("click", prevArtwork);
lightboxNext.addEventListener("click", nextArtwork);

lightbox.addEventListener("click", (e) => { 
  if (e.target === lightbox || e.target.classList.contains('lightbox__img-container')) closeLightbox(); 
});

document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("is-open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") prevArtwork();
  if (e.key === "ArrowRight") nextArtwork();
});

/* ---- 4. Scroll reveal --------------------------------------------------- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting){
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal, .frame").forEach((el) => revealObserver.observe(el));

/* ---- 5. Mobile nav toggle ------------------------------------------------ */
const navToggle = document.getElementById("navToggle");
const navLinks   = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  navToggle.classList.toggle("open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});
navLinks.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
  navLinks.classList.remove("is-open");
  navToggle.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
}));

/* ---- 6. Interactive Screening Room — Paint & Fluid Simulation Loop ------ */
const reelCanvas  = document.getElementById("reelCanvas");
const reelPoster  = document.getElementById("reelPoster");
const reelPlayBtn = document.getElementById("reelPlay");
const reelFrame   = document.getElementById("reelFrame");
let reelPlaying = false, reelRAF = null;
let mouseX = 0, mouseY = 0, isHovered = false;

function sizeCanvas(){
  if (!reelCanvas) return;
  const rect = reelCanvas.parentElement.getBoundingClientRect();
  reelCanvas.width  = rect.width  * (window.devicePixelRatio || 1);
  reelCanvas.height = rect.height * (window.devicePixelRatio || 1);
}
sizeCanvas();
window.addEventListener("resize", sizeCanvas);

const ctx = reelCanvas ? reelCanvas.getContext("2d") : null;

// Dynamic interactive particles/strokes
const strokes = Array.from({ length: 42 }, () => ({
  x: Math.random(),
  y: Math.random(),
  vx: (Math.random() - 0.5) * 0.002,
  vy: (Math.random() - 0.5) * 0.002,
  r: 40 + Math.random() * 110,
  hue: ["#B98D46", "#6E2A34", "#D8B26A", "#6B7A5E", "#E7E0D2"][Math.floor(Math.random() * 5)],
  alpha: 0.08 + Math.random() * 0.12,
  life: Math.random() * Math.PI * 2
}));

function drawReel(){
  if (!ctx) return;
  const w = reelCanvas.width, h = reelCanvas.height;
  
  // Semi-transparent trailing background for painting feel
  ctx.fillStyle = "rgba(23, 21, 28, 0.15)";
  ctx.fillRect(0, 0, w, h);

  const dpr = window.devicePixelRatio || 1;

  strokes.forEach((s) => {
    s.life += 0.015;
    s.x += s.vx + Math.sin(s.life) * 0.0005;
    s.y += s.vy + Math.cos(s.life) * 0.0005;

    // React to mouse cursor position when hovered
    if (isHovered) {
      const dx = (mouseX * dpr) - (s.x * w);
      const dy = (mouseY * dpr) - (s.y * h);
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 250 * dpr) {
        s.x += (dx / dist) * 0.003;
        s.y += (dy / dist) * 0.003;
      }
    }

    if (s.x < -0.1) s.x = 1.1; if (s.x > 1.1) s.x = -0.1;
    if (s.y < -0.1) s.y = 1.1; if (s.y > 1.1) s.y = -0.1;

    const grad = ctx.createRadialGradient(s.x * w, s.y * h, 0, s.x * w, s.y * h, s.r * dpr);
    grad.addColorStop(0, s.hue);
    grad.addColorStop(1, "transparent");

    ctx.globalAlpha = s.alpha;
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(s.x * w, s.y * h, s.r * dpr, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.globalAlpha = 1;
  reelRAF = requestAnimationFrame(drawReel);
}

// Track mouse/touch inside screening frame
if (reelFrame) {
  reelFrame.addEventListener("mousemove", (e) => {
    const rect = reelFrame.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    isHovered = true;
  });

  reelFrame.addEventListener("mouseleave", () => { isHovered = false; });

  reelFrame.addEventListener("touchmove", (e) => {
    if (e.touches.length > 0) {
      const rect = reelFrame.getBoundingClientRect();
      mouseX = e.touches[0].clientX - rect.left;
      mouseY = e.touches[0].clientY - rect.top;
      isHovered = true;
    }
  });
}

if (reelPlayBtn) {
  reelPlayBtn.addEventListener("click", () => {
    reelPlaying = !reelPlaying;
    reelPlayBtn.classList.toggle("is-playing", reelPlaying);
    reelPoster.classList.toggle("is-hidden", reelPlaying);
    if (reelPlaying){ 
      // Initialize background
      ctx.fillStyle = "#17151C";
      ctx.fillRect(0, 0, reelCanvas.width, reelCanvas.height);
      drawReel(); 
    } else { 
      cancelAnimationFrame(reelRAF); 
    }
  });
}

/* ---- 6b. Instagram Reels Gallery & Player Modal ----------------------- */
const REELS = [
  {
    id: "user-reel-1",
    title: "Studio Reel I — Fine Art Process",
    tag: "Featured Video",
    duration: "Process Reel",
    desc: "Behind the scenes process study from @art.gallery_326 collection.",
    url: "https://www.instagram.com/art.gallery_326",
    poster: "images/art-01.jpg",
    video: "images/user-reel-1.mp4"
  },
  {
    id: "user-reel-2",
    title: "Studio Reel II — Paint & Texture",
    tag: "Technique",
    duration: "Studio Study",
    desc: "Detailed close-up on color composition and canvas textures.",
    url: "https://www.instagram.com/art.gallery_326",
    poster: "images/art-02.jpg",
    video: "images/user-reel-2.mp4"
  },
  {
    id: "user-reel-3",
    title: "Studio Reel III — Studio Flow",
    tag: "Studio Visit",
    duration: "Studio Time-Lapse",
    desc: "Natural light, easel arrangements, and studio work in progress.",
    url: "https://www.instagram.com/art.gallery_326",
    poster: "images/art-03.jpg",
    video: "images/user-reel-3.mp4"
  },
  {
    id: "user-reel-4",
    title: "Studio Reel IV — Linework & Details",
    tag: "Time-Lapse",
    duration: "Process Study",
    desc: "Precision stroke technique and fine art detailing.",
    url: "https://www.instagram.com/art.gallery_326",
    poster: "images/art-04.jpg",
    video: "images/user-reel-4.mp4"
  },
  {
    id: "user-reel-5",
    title: "Studio Reel V — Exhibition Wall Highlights",
    tag: "Exhibition",
    duration: "Gallery Reel",
    desc: "Full wall hang highlights and volume exhibition walkthrough.",
    url: "https://www.instagram.com/art.gallery_326",
    poster: "images/art-05.jpg",
    video: "images/user-reel-5.mp4"
  }
];


const reelsGrid = document.getElementById("reelsGrid");
const reelModal = document.getElementById("reelModal");
const reelModalEmbed = document.getElementById("reelModalEmbed");
const reelModalTitle = document.getElementById("reelModalTitle");
const reelModalDesc = document.getElementById("reelModalDesc");
const reelModalTag = document.getElementById("reelModalTag");
const reelModalLink = document.getElementById("reelModalLink");
const reelModalClose = document.getElementById("reelModalClose");

if (reelsGrid) {
  REELS.forEach((reel, idx) => {
    const card = document.createElement("div");
    card.className = "reel-card reveal";
    card.innerHTML = `
      <div class="reel-card__video-wrap">
        <video class="reel-card__video" src="${reel.video}" poster="${reel.poster}" controls loop playsinline preload="metadata"></video>
      </div>
    `;

    reelsGrid.appendChild(card);
    if (typeof revealObserver !== "undefined") {
      revealObserver.observe(card);
    }
  });
}



function openReelModal(reel) {
  if (!reelModal) return;
  reelModalEmbed.innerHTML = `
    <video src="${reel.video}" poster="${reel.poster}" controls autoplay loop playsinline style="width:100%; max-height:480px;"></video>
  `;
  reelModalTitle.textContent = reel.title;
  reelModalDesc.textContent = reel.desc;
  reelModalTag.textContent = reel.tag;
  reelModalLink.href = reel.url;

  reelModal.classList.add("is-open");
  reelModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeReelModal() {
  if (!reelModal) return;
  reelModal.classList.remove("is-open");
  reelModal.setAttribute("aria-hidden", "true");
  reelModalEmbed.innerHTML = "";
  document.body.style.overflow = "";
}

if (reelModalClose) reelModalClose.addEventListener("click", closeReelModal);
if (reelModal) {
  reelModal.addEventListener("click", (e) => {
    if (e.target === reelModal) closeReelModal();
  });
}


/* ---- 7. Footer year ------------------------------------------------------ */

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---- 8. Submission Form Feedback ---------------------------------------- */
const submitForm = document.getElementById("submitForm");
const submitToast = document.getElementById("submitToast");

if (submitForm) {
  submitForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const artist = document.getElementById("artistName").value || "Artist";
    
    if (submitToast) {
      submitToast.innerHTML = `
        <div class="toast-success">
          <strong>✓ Submission Received</strong>
          <p>Thank you ${artist}! Your work has been submitted to the Gallery 326 jury. We will review your piece within 5–7 days.</p>
        </div>
      `;
      submitToast.classList.add("is-visible");
    }
    submitForm.reset();
  });
}

/* ---- 7. Category Filter Logic --------------------------------------------- */
const categoryButtons = document.querySelectorAll("#categoryFilter .filter-btn");
if (categoryButtons.length) {
  categoryButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      categoryButtons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const filter = btn.getAttribute("data-filter");

      const frames = document.querySelectorAll("#galleryGrid .frame");
      frames.forEach((frame, idx) => {
        if (filter === "all") {
          frame.style.display = "block";
        } else if (filter === "devotional" && (idx === 0 || idx === 3 || idx === 8 || idx === 12 || idx === 17)) {
          frame.style.display = "block";
        } else if (filter === "color" && (idx % 2 === 1)) {
          frame.style.display = "block";
        } else if (filter === "sketch" && (idx % 2 === 0 && idx !== 0)) {
          frame.style.display = "block";
        } else {
          frame.style.display = "none";
        }
      });
    });
  });
}

/* ---- 8. Digital Studio Painting Workbench Canvas ----------------------- */
const wbCanvas = document.getElementById("workbenchCanvas");
if (wbCanvas) {
  const wbCtx = wbCanvas.getContext("2d");
  let isPainting = false;
  let currentColor = "#B98D46";
  let currentSize = 8;

  wbCtx.fillStyle = "#FAF8F5";
  wbCtx.fillRect(0, 0, wbCanvas.width, wbCanvas.height);

  const paletteDots = document.querySelectorAll("#colorPalette .color-dot");
  paletteDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      paletteDots.forEach((d) => d.classList.remove("is-active"));
      dot.classList.add("is-active");
      currentColor = dot.getAttribute("data-color");
    });
  });

  const brushSlider = document.getElementById("brushSlider");
  if (brushSlider) {
    brushSlider.addEventListener("input", (e) => currentSize = e.target.value);
  }

  const clearBtn = document.getElementById("clearCanvasBtn");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      wbCtx.fillStyle = "#FAF8F5";
      wbCtx.fillRect(0, 0, wbCanvas.width, wbCanvas.height);
    });
  }

  function getPos(e) {
    const rect = wbCanvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * (wbCanvas.width / rect.width),
      y: (clientY - rect.top) * (wbCanvas.height / rect.height)
    };
  }

  function startPaint(e) {
    isPainting = true;
    const pos = getPos(e);
    wbCtx.beginPath();
    wbCtx.moveTo(pos.x, pos.y);
  }

  function drawPaint(e) {
    if (!isPainting) return;
    const pos = getPos(e);
    wbCtx.lineWidth = currentSize;
    wbCtx.lineCap = "round";
    wbCtx.lineJoin = "round";
    wbCtx.strokeStyle = currentColor;
    wbCtx.lineTo(pos.x, pos.y);
    wbCtx.stroke();
  }

  function stopPaint() { isPainting = false; }

  wbCanvas.addEventListener("mousedown", startPaint);
  wbCanvas.addEventListener("mousemove", drawPaint);
  wbCanvas.addEventListener("mouseup", stopPaint);
  wbCanvas.addEventListener("mouseleave", stopPaint);

  wbCanvas.addEventListener("touchstart", (e) => { e.preventDefault(); startPaint(e); });
  wbCanvas.addEventListener("touchmove", (e) => { e.preventDefault(); drawPaint(e); });
  wbCanvas.addEventListener("touchend", stopPaint);
}

/* ---- 9. Custom Artwork Commission Calculator ---------------------------- */
const calcPrice = document.getElementById("calcPrice");
const styleChoices = document.querySelectorAll("#styleChoices .choice-btn");
const mediumChoices = document.querySelectorAll("#mediumChoices .choice-btn");
const sizeSelect = document.getElementById("canvasSizeSelect");

if (calcPrice) {
  let selectedStyle = "portrait";
  let selectedMedium = "charcoal";
  let selectedSize = "a3";

  const priceMap = {
    portrait: {
      charcoal: { a4: "₹2,500 – ₹3,800", a3: "₹4,500 – ₹6,500", a2: "₹7,500 – ₹11,000", custom: "₹14,000+" },
      acrylic: { a4: "₹3,500 – ₹5,000", a3: "₹6,000 – ₹9,000", a2: "₹10,000 – ₹15,000", custom: "₹18,000+" },
      gold: { a4: "₹4,500 – ₹7,000", a3: "₹8,500 – ₹12,000", a2: "₹14,000 – ₹20,000", custom: "₹25,000+" }
    },
    devotional: {
      charcoal: { a4: "₹3,000 – ₹4,500", a3: "₹5,500 – ₹8,000", a2: "₹9,000 – ₹13,000", custom: "₹16,000+" },
      acrylic: { a4: "₹4,000 – ₹6,500", a3: "₹7,500 – ₹11,000", a2: "₹12,000 – ₹17,000", custom: "₹22,000+" },
      gold: { a4: "₹5,500 – ₹8,500", a3: "₹10,000 – ₹15,000", a2: "₹16,000 – ₹24,000", custom: "₹30,000+" }
    },
    color: {
      charcoal: { a4: "₹2,800 – ₹4,000", a3: "₹5,000 – ₹7,500", a2: "₹8,500 – ₹12,000", custom: "₹15,000+" },
      acrylic: { a4: "₹3,800 – ₹5,800", a3: "₹7,000 – ₹10,000", a2: "₹11,000 – ₹16,000", custom: "₹20,000+" },
      gold: { a4: "₹5,000 – ₹8,000", a3: "₹9,000 – ₹14,000", a2: "₹15,000 – ₹22,000", custom: "₹28,000+" }
    }
  };

  function updatePrice() {
    const priceStr = priceMap[selectedStyle]?.[selectedMedium]?.[selectedSize] || "₹5,000 – ₹8,000";
    calcPrice.textContent = priceStr;
  }

  styleChoices.forEach((btn) => {
    btn.addEventListener("click", () => {
      styleChoices.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      selectedStyle = btn.getAttribute("data-val");
      updatePrice();
    });
  });

  mediumChoices.forEach((btn) => {
    btn.addEventListener("click", () => {
      mediumChoices.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      selectedMedium = btn.getAttribute("data-val");
      updatePrice();
    });
  });

  if (sizeSelect) {
    sizeSelect.addEventListener("change", (e) => {
      selectedSize = e.target.value;
      updatePrice();
    });
  }
}

/* ---- 10. Collector FAQ Accordion --------------------------------------- */
const faqItems = document.querySelectorAll(".faq-item");
faqItems.forEach((item) => {
  const btn = item.querySelector(".faq-question");
  if (btn) {
    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");
      faqItems.forEach((i) => i.classList.remove("is-open"));
      if (!isOpen) item.classList.add("is-open");
    });
  }
});


