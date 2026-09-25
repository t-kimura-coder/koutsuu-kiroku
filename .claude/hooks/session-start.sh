#!/bin/bash
# Claude Code on the web 用 SessionStart フック。
# このプロジェクトは依存パッケージのない静的PWAなので、インストールは行わず、
# 必要なツールの存在確認と JS / Python の構文チェックだけを行う。
# チェックに失敗してもセッション開始は妨げない(警告を出すだけ)。
set -uo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-.}"

for cmd in node python3; do
  if ! command -v "$cmd" >/dev/null 2>&1; then
    echo "[session-start] 警告: $cmd が見つかりません" >&2
  fi
done

status=0
for f in app.js service-worker.js; do
  if ! node --check "$f"; then
    echo "[session-start] 警告: $f に構文エラーがあります" >&2
    status=1
  fi
done

if ! python3 -m py_compile server.py; then
  echo "[session-start] 警告: server.py に構文エラーがあります" >&2
  status=1
fi
rm -rf __pycache__

if [ "$status" -eq 0 ]; then
  echo "[session-start] 構文チェックOK (app.js / service-worker.js / server.py)。ローカル確認は 'python3 server.py' で http://127.0.0.1:8934/ に配信。"
fi
exit 0
