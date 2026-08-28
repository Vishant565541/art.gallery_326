# Gallery 326 — static website

A full static site (HTML/CSS/JS, no build step) for an Instagram-style
art-promotion account, in a "museum wall" visual language: brass plaques,
catalog numbers, a screening room, an open call for submissions.

## About the images — please read

I could not pull the actual photos/videos from `@art.gallery_326`:

- Instagram blocks automated/scripted access to profile pages and media
  (its `robots.txt` disallows it), so there's no reliable technical way
  to fetch them from this environment.
- Even if it were technically possible, the images and reels on that
  account belong to the artists who made them or to whoever posted them —
  not to me, and I don't know that you're the account owner — so
  downloading and republishing them isn't something I can do.

Instead, every "artwork" on this site (`images/art-01.jpg` … `art-12.jpg`,
plus `hero.jpg` and `reel-poster.jpg`) is an **original, generative
composition** I created from scratch for this template, so there's nothing
to clear rights on. They're placeholders — swap them for your own.

## How to drop in your real content

**1. Replace the images.** Export your photos from Instagram (save the
originals, not screenshots) and drop them into `images/`, keeping the same
filenames — or new ones, as long as you also update the paths in
`script.js`.

**2. Edit the exhibition data.** Open `script.js` and look at the
`ARTWORKS` array near the top — that's the *only* place you need to touch
to change what's in the grid: image path, catalog number, title, artist
handle, medium/year.

**3. Wire up the real reel.** The Screening Room section currently loops a
generative canvas animation as a stand-in. To use a real video:
```html
<!-- in index.html, replace the <canvas> + poster <img> with: -->
<video class="reel-frame__poster" src="images/your-reel.mp4" muted loop playsinline poster="images/reel-poster.jpg"></video>
```
and remove the canvas-related JS in `script.js` (section 6).

**4. Live-embed your Instagram feed (optional).** For a grid that updates
itself automatically instead of manually, use a free embed widget like
[LightWidget](https://lightwidget.com) or [SnapWidget](https://snapwidget.com):
create a widget for `@art.gallery_326`, then paste the `<iframe>` code they
give you into the empty `#instagramEmbed` div near the bottom of
`index.html` (Follow section).

**5. Connect the submission form.** The "Submit Work" form is styled but
not wired to anywhere. Fastest options with no backend of your own:
- [Formspree](https://formspree.io) — add `action="https://formspree.io/f/yourID"` and `method="POST"` to the `<form>`
- Netlify Forms — add `data-netlify="true"` and a hidden `form-name` field if you host on Netlify

## File structure
```
gallery326/
├── index.html      — all page markup/content
├── style.css        — design system + layout (single stylesheet)
├── script.js         — gallery data, lightbox, nav, form, reel loop
└── images/           — 12 artwork placeholders + hero + reel poster
```

## Running it
No build tools needed. Open `index.html` directly in a browser, or serve
the folder with any static server (e.g. `python3 -m http.server`) and visit
`http://localhost:8000`.

## Design notes
- Palette: charcoal wall, warm plaster white, brass, deep velvet red,
  moss sage — a physical-gallery feel rather than a generic "portfolio
  site" look.
- Type: Fraunces (serif display) + Inter (body) + IBM Plex Mono (museum
  placard captions/labels), loaded from Google Fonts.
- Signature interaction: hover/tap any frame to reveal its museum
  placard (catalog no., title, artist, medium) — same pattern used in the
  full-screen lightbox.
- Fully responsive, keyboard-accessible (frames are focusable and
  Enter/Space-activated), and respects `prefers-reduced-motion`.
