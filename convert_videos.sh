#!/usr/bin/env bash
# One-off batch: AVI -> MP4 (H.264 + AAC, faststart) for web playback
set -e
SRC="D:/avis"
DST="C:/Users/ntrin/Documents/cocinero-nomada/assets/videos"
CRF=26

conv() {
  local in="$1" out="$2"
  echo ">>> $(basename "$in") -> $out"
  ffmpeg -y -i "$in" \
    -vf "scale='min(1280,iw)':'-2'" \
    -c:v libx264 -preset medium -crf $CRF -movflags +faststart \
    -c:a aac -b:a 128k \
    -loglevel error -stats \
    "$out"
}

conv "$SRC/Barichara.avi"        "$DST/barichara/barichara.mp4"
conv "$SRC/Minca.avi"            "$DST/minca/minca.mp4"
conv "$SRC/San Gil.avi"          "$DST/san-gil/san-gil.mp4"
conv "$SRC/San Gil1.avi"         "$DST/san-gil/san-gil-2.mp4"
conv "$SRC/Taganga.avi"          "$DST/taganga/taganga.mp4"
conv "$SRC/cartagena.avi"        "$DST/cartagena/cartagena.mp4"
conv "$SRC/new york.avi"         "$DST/new-york/new-york.mp4"
conv "$SRC/palo quema plaza.avi" "$DST/palo-quemado/palo-quemado.mp4"
conv "$SRC/parque tayrona.avi"   "$DST/parque-tayrona/parque-tayrona.mp4"
conv "$SRC/trailer.avi"          "$DST/trailer.mp4"

echo "=== done ==="
