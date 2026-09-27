#!/bin/sh
# Voice every chapter at the locked pace. The heavy chapters (7: his sons, 9: the ending) run slower.
#   tools/voice_all.sh            ElevenLabs (needs ELEVENLABS_API_KEY and VOICE_ID in video/.env)
#   tools/voice_all.sh --piper    offline stand-in voice, for timing the edit before the real read
cd "$(dirname "$0")/.."
export PIPER_MODEL=${PIPER_MODEL:-/home/user/piper/en_US-ryan-high.onnx}
for f in script/ch*.txt; do
  n=$(basename "$f" .txt)
  case "$n" in
    ch07_*|ch09_*) export VOICE_MAX_PAUSE=0.35 VOICE_SENT_GAP=0.05 VOICE_PARA_GAP=0.55 VOICE_STRETCH=1.08 PIPER_LENGTH=1.08 ;;
    *)             export VOICE_MAX_PAUSE=0.25 VOICE_SENT_GAP=0    VOICE_PARA_GAP=0.35 VOICE_STRETCH=1.15 PIPER_LENGTH=0.93 ;;
  esac
  echo "== $n (stretch $VOICE_STRETCH)"
  python3 tools/voice.py "$f" "$n" "$@" 2>&1 | tail -1 || exit 1
done
