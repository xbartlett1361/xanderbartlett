# xanderbartlett

Personal site for Xander Bartlett: plain static HTML and CSS, no build step. Every page is designed to fit one desktop screen without scrolling.

## Pages

| Path | What it is |
| --- | --- |
| `/` | The landing page: the belief ("the differentiator is taste"), who I am with every link, and three doors stacked on the right. Availability sits in the header |
| `/gtm/` | GTM Strategy & Engineering: "Distribution is moat." Six key skills, then Aether (main) and Remira as cards |
| `/product/` | Product Management and Design: "Ideas are nothing without team execution." Remira, Prove Your Pick, New Wave Capital |
| `/social/` | Social Media Marketing: Remira, The Finance Guide and Aether, each with its best post linked as a thumbnail, plus receipts |
| `404.html` | Not-found page (uses root-absolute paths) |

Each "case study" button opens a `<dialog class="cs" id="cs-KEY">` in the same file, and every one is deep-linkable: `/social/#remira`, `/gtm/#aether`, `/product/#pyp`, and so on.

## Editing

- **Shared styles** live in `assets/css/site.css`, with page-only layout in each page's `<style>` block.
- **Shared behaviour** (drawers, deep links, copy-email, chart tooltips) lives in `assets/js/site.js`.
- **Email links** point at Gmail's compose window (`https://mail.google.com/mail/?view=cm&fs=1&to=…`) with `target="_blank"` and a `data-mailto` attribute. On touch devices `site.js` swaps them to `mailto:` so phones open the mail app. Use the same pattern for any new email link.
- **Page anatomy** (`.page`, `.ph`, `.skills`, `.xps`/`.xp` cards, `.tldr` rows, `.reel` post thumbnails) is shared in `site.css`, so every page reads the same way.
- **Receipts** (dashboard screenshots) live in `assets/img/`.
- **Fit-to-screen.** The root font size scales with the viewport (`clamp(10px, min(1.04vw, 1.74vh), 22px)`), and every size is in `rem`. If you add copy and a page starts to scroll on a laptop, trim words before you shrink type.
- **Script words.** Wrap a word in `<span class="scr">word</span>` to set it in Mr Dafoe with the vermilion print offset. Use one per headline.

### Adding a case study

1. Copy one of the `<article class="xp">` cards on the page, and point its `.open-cs` button at a new `data-open="KEY"`.
2. Copy one of the `<dialog class="cs">` blocks at the bottom of the file, set `id="cs-KEY"`, and write the study.
3. Re-check that the page still fits one laptop screen (1280×620 is the tightest common size). Trim words before shrinking type.

## Assets and licenses

- Fonts are self-hosted in `assets/fonts/`: Geist and Geist Mono (Vercel) and Mr Dafoe (Sudtipos), all under the SIL Open Font License. The license texts sit next to the files.
- The hero "taste" lettering is inline SVG. It was generated from Mr Dafoe's glyph outlines (shaped with HarfBuzz), plus a custom tapered flourish and a vermilion print offset. `assets/img/taste.svg` is a static copy.
- `assets/img/og.jpg` is the social share card.
