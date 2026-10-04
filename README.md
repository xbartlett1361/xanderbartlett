# xanderbartlett

Personal site for Xander Bartlett: plain static HTML and CSS, no build step. Every page is designed to fit one desktop screen without scrolling.

## Pages

| Path | What it is |
| --- | --- |
| `/` | The landing page: the belief ("the differentiator is taste"), every contact link, and three doors |
| `/gtm/` | GTM Strategy & Engineering: Aether (main) vs Remira, as a strategy matrix, plus what's running now |
| `/product/` | Product Management and Design: Remira, Prove Your Pick, New Wave Capital |
| `/social/` | Social Media Marketing: Remira, The Finance Guide, Aether, with receipts |
| `404.html` | Not-found page (uses root-absolute paths) |

Each "case study" button opens a `<dialog class="cs" id="cs-KEY">` in the same file, and every one is deep-linkable: `/social/#remira`, `/gtm/#aether`, `/product/#pyp`, and so on.

## Editing

- **Shared styles** live in `assets/css/site.css`, with page-only layout in each page's `<style>` block.
- **Shared behaviour** (drawers, deep links, copy-email, chart tooltips) lives in `assets/js/site.js`.
- **Receipts** (dashboard screenshots) live in `assets/img/`.
- **Fit-to-screen.** The root font size scales with the viewport (`clamp(10.5px, min(1.04vw, 1.74vh), 18px)`), and every size is in `rem`. If you add copy and a page starts to scroll on a laptop, trim words before you shrink type.
- **Script words.** Wrap a word in `<span class="scr">word</span>` to set it in Mr Dafoe with the vermilion print offset. Use one per headline.

### Adding a GTM case study

1. In `gtm/index.html`, copy one of the `.case-btn` buttons in the "Case studies" column and give it a new `data-open="KEY"`.
2. Copy one of the `<dialog class="cs">` blocks at the bottom of the file, set `id="cs-KEY"`, and write the study.
3. Replace the dashed "Aether Phase 2 readout" placeholder when that readout ships.

## Assets and licenses

- Fonts are self-hosted in `assets/fonts/`: Geist and Geist Mono (Vercel) and Mr Dafoe (Sudtipos), all under the SIL Open Font License. The license texts sit next to the files.
- The hero "taste" lettering is inline SVG. It was generated from Mr Dafoe's glyph outlines (shaped with HarfBuzz), plus a custom tapered flourish and a vermilion print offset. `assets/img/taste.svg` is a static copy.
- `assets/img/og.jpg` is the social share card.
