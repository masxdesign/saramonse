#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 1 || $# -gt 2 ]]; then
  echo "Usage: $0 <input-mp4-path> [poster-seek-time]"
  echo "Example: $0 public/assets/eyes-hero.mp4 00:00:01"
  exit 1
fi

INPUT_PATH="$1"
POSTER_SEEK="${2:-00:00:01}"

if [[ ! -f "$INPUT_PATH" ]]; then
  echo "Error: input file not found: $INPUT_PATH"
  exit 1
fi

DIR_PATH="$(dirname "$INPUT_PATH")"
FILE_NAME="$(basename "$INPUT_PATH")"
BASE_NAME="${FILE_NAME%.*}"

WEBM_OUT="${DIR_PATH}/${BASE_NAME}.small.webm"
MP4_OUT="${DIR_PATH}/${BASE_NAME}.small.mp4"
POSTER_OUT="${DIR_PATH}/${BASE_NAME}-poster.jpg"

echo "Optimizing: $INPUT_PATH"
echo " -> $WEBM_OUT"
echo " -> $MP4_OUT"
echo " -> $POSTER_OUT"

ffmpeg -y -i "$INPUT_PATH" \
  -vf "scale=1600:-2,fps=24" \
  -c:v libvpx-vp9 -b:v 0 -crf 38 -an \
  "$WEBM_OUT"

ffmpeg -y -i "$INPUT_PATH" \
  -vf "scale=1600:-2,fps=24" \
  -c:v libx264 -preset slow -crf 29 -movflags +faststart -an \
  "$MP4_OUT"

ffmpeg -y -ss "$POSTER_SEEK" -i "$MP4_OUT" \
  -frames:v 1 -q:v 2 -update 1 \
  "$POSTER_OUT"

echo
echo "Done. Astro props snippet:"
echo "videoWebmSrc=\"/assets/${BASE_NAME}.small.webm?t=1\""
echo "videoMp4Src=\"/assets/${BASE_NAME}.small.mp4?t=1\""
echo "videoPoster=\"/assets/${BASE_NAME}-poster.jpg\""
