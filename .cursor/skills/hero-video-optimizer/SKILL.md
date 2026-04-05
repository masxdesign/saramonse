---
name: hero-video-optimizer
description: Optimize Astro hero videos into small WebM/MP4 + poster assets and update service page VideoHeroLayout props. Use when adding or replacing hero videos, when the user mentions eyes-hero/body-hero/facials-hero style optimization, or asks to automate hero video processing.
---

# Hero Video Optimizer

Automates the exact service-page hero workflow used in this project:
- Generate `*.small.webm`
- Generate `*.small.mp4`
- Generate `*-poster.webp` (via temp JPEG + `cwebp`)
- Wire `videoWebmSrc`, `videoMp4Src`, and `videoPoster` in Astro pages

## Defaults (must match existing project pattern)

- Input location: `public/assets/<name>.mp4`
- Output naming:
  - `public/assets/<name>.small.webm`
  - `public/assets/<name>.small.mp4`
  - `public/assets/<name>-poster.webp`
- Encoding settings:
  - Scale: `1600:-2`
  - FPS: `24`
  - WebM: `libvpx-vp9 -b:v 0 -crf 38 -an`
  - MP4: `libx264 -preset slow -crf 29 -movflags +faststart -an`
  - Poster: frame at `00:00:01`, JPEG quality `-q:v 2`

## Workflow

Copy this checklist and run in order:

```md
- [ ] 1) Confirm source video exists in public/assets
- [ ] 2) Run optimize script to create .small.webm/.small.mp4/-poster.webp
- [ ] 3) Update target Astro page VideoHeroLayout props
- [ ] 4) Ensure Services nav includes the page if this is a new service
- [ ] 5) Run lint/build validation
```

## Commands

### One command (optimize + Astro props)

Runs `optimize-hero-video.sh`, then `update-videohero-props.py`. The base name is taken from the MP4 filename (e.g. `eyes-hero.mp4` → `eyes-hero`).

```bash
bash .cursor/skills/hero-video-optimizer/scripts/run-all.sh public/assets/eyes-hero.mp4 src/pages/services/eyes.astro
```

Optional third argument: poster frame seek time (passed to ffmpeg), e.g. `00:00:02`.

### 1) Optimize a hero video only

```bash
bash .cursor/skills/hero-video-optimizer/scripts/optimize-hero-video.sh public/assets/eyes-hero.mp4
```

### 2) Update one Astro page with generated assets only

```bash
python3 .cursor/skills/hero-video-optimizer/scripts/update-videohero-props.py src/pages/services/eyes.astro eyes-hero
```

This updates or inserts:
- `videoWebmSrc="/assets/<base>.small.webm?t=1"`
- `videoMp4Src="/assets/<base>.small.mp4?t=1"`
- `videoPoster="/assets/<base>-poster.webp"`

## Validation

Run after updates:

```bash
npm run build
```

If only one page changed, also check lints on that page.

## Notes

- The script updates the first `VideoHeroLayout` component block in the target file.
- Keep `?t=1` in source URLs for cache-busting consistency with existing pages.
