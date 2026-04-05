#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [[ $# -lt 2 || $# -gt 3 ]]; then
  echo "Usage: $0 <input-mp4-path> <astro-file> [poster-seek-time]"
  echo "Example: $0 public/assets/eyes-hero.mp4 src/pages/services/eyes.astro"
  echo "Example: $0 public/assets/eyes-hero.mp4 src/pages/services/eyes.astro 00:00:02"
  exit 1
fi

INPUT_PATH="$1"
ASTRO_PATH="$2"
POSTER_SEEK="${3:-}"

FILE_NAME="$(basename "$INPUT_PATH")"
BASE_NAME="${FILE_NAME%.*}"

if [[ -n "$POSTER_SEEK" ]]; then
  bash "$SCRIPT_DIR/optimize-hero-video.sh" "$INPUT_PATH" "$POSTER_SEEK"
else
  bash "$SCRIPT_DIR/optimize-hero-video.sh" "$INPUT_PATH"
fi

python3 "$SCRIPT_DIR/update-videohero-props.py" "$ASTRO_PATH" "$BASE_NAME"

echo
echo "Next: npm run build"
