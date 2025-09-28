#!/bin/bash

# Firebase Functions設定をローカル環境用にセットアップするスクリプト
# emulator環境変数ファイルから値を読み込んで.runtimeconfig.jsonを生成

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
ENV_FILE="$ROOT_DIR/env/emulator"
CONFIG_FILE="$ROOT_DIR/apps/functions/.runtimeconfig.json"

# 環境変数ファイルが存在することを確認
if [ ! -f "$ENV_FILE" ]; then
    echo "❌ Error: Environment file not found at $ENV_FILE"
    exit 1
fi

# 環境変数を読み込む
source "$ENV_FILE"

# .runtimeconfig.jsonを生成
cat > "$CONFIG_FILE" << EOF
{
  "runtime": {
    "env": "emulator"
  },
  "algolia": {
    "appid": "${VITE_ALGOLIA_APPID}",
    "apikey": "${VITE_ALGOLIA_APIKEY}",
    "apikeyadmin": "${ALGOLIA_APIKEY_ADMIN}"
  }
}
EOF

echo "✅ Firebase Functions config has been set up at $CONFIG_FILE"
echo "📝 This file is git-ignored and needs to be generated locally"