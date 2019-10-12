#!/bin/sh
OUT=$(tsc --noEmit)
MATCH_LINES=$(echo "$OUT" | grep -E ".(tsx|ts)\(")
ERRORED_FILES=$(echo "$MATCH_LINES" | cut -f1 -d"(" | uniq)

if [ "$ERRORED_FILES" = "" ]; then
  echo "No errors"
else
  echo "$ERRORED_FILES"
  code $ERRORED_FILES
  tsc --noEmit
fi
