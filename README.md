# Ripping Yard

> lifelog for living well

## Firebase

### Setup

```sh
$ npm install -g firebase-tools
```

### Start

```sh
$ pnpm dev
```

http://localhost:4000/

# Firebase Emulator ローカル開発環境

## 使い方

### 1. すべてのサービスを起動（推奨）

```bash
pnpm dev
```

このコマンドで以下が並行して起動します：

- Firebase Emulator（Firestore、Auth、Storage、Functions）
- apps/www（フロントエンド）- http://localhost:3334
- apps/functions（Cloud Functions）

### 2. 個別起動

必要に応じて個別に起動することも可能です：

```bash
# Emulatorのみ
cd apps/emulator && pnpm dev

# フロントエンド
cd pnpm dev:www

# Functions
cd apps/functions && pnpm dev
```

## Emulator UI

Firebase Emulator UIは以下でアクセスできます：

- http://localhost:4000

ここから以下を確認・操作できます：

- Firestore データベース
- Authentication ユーザー
- Storage ファイル
- Functions ログ

## データの永続化

Emulatorのデータは `apps/emulator/.emulator/` ディレクトリに保存されます。

- 起動時に前回のデータが自動的に読み込まれます
- 終了時に現在のデータが自動的に保存されます

## 環境変数

`env/emulator` ファイルにEmulator用の環境変数が設定されています。
このファイルは自動的に読み込まれるため、特別な設定は不要です。

## 注意事項

1. **プロジェクトID**: Emulator環境では `rydev` というプロジェクトIDを使用します
2. **ポート番号**:

   - Firestore: 8080
   - Auth: 9099
   - Storage: 9199
   - Functions: 5001
   - Emulator UI: 4000

3. **本番環境との切り替え**:
   - Emulator使用時は `VITE_USE_FIREBASE_EMULATOR=true` が設定されます
   - 本番環境では通常の `pnpm dev` を使用してください（環境変数ファイルを指定しない）

## トラブルシューティング

### Emulatorが起動しない場合

```bash
# プロセスをクリーンアップ
pkill -f firebase

# ログファイルを削除
cd apps/emulator
rm -rf *.log

# 再起動
pnpm dev
```

### データをリセットしたい場合

```bash
cd apps/emulator
rm -rf .emulator
pnpm dev
```
