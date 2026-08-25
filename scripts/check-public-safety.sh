#!/usr/bin/env bash
set -euo pipefail

mapfile -t tracked < <(git ls-files)

for path in "${tracked[@]}"; do
  name=${path##*/}
  case "$name" in
    .env|.env.*|*.pem|*.key|*.p12|*.pfx|id_rsa|id_ed25519|credentials.json|service-account*.json)
      echo "Unsafe credential-like file is tracked: $path" >&2
      exit 1
      ;;
  esac
done

credential_pattern='(-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----|gh[pousr]_[A-Za-z0-9_]{20,}|github_pat_[A-Za-z0-9_]{20,}|sk-or-v1-[A-Za-z0-9_-]{20,}|AIza[0-9A-Za-z_-]{30,}|xox[baprs]-[0-9A-Za-z-]{10,})'

if git grep -nEI "$credential_pattern" -- . \
  ':(exclude)package-lock.json' \
  ':(exclude)scripts/check-public-safety.sh'; then
  echo "Possible credential found in tracked public content." >&2
  exit 1
fi

echo "Public-file safety check passed."
