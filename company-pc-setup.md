# 会社PC セットアップガイド

このAIオーケストレーションシステムを会社PCで動かすための手順書。

---

## 前提確認

| 項目 | 内容 |
|------|------|
| リポジトリ | `plizz4000/takuya-cc-company`（プライベート） |
| サブモジュール | `creator-orchestra-pro`、`skr-shinki-bassai`（いずれもプライベート） |
| 必要ツール | Git、Claude Code CLI |

---

## STEP 1: GitHubの認証設定（SSH推奨）

プライベートリポジトリへのアクセスにSSH鍵を使う。

### SSHキーを生成する

```powershell
ssh-keygen -t ed25519 -C "plizz4000@gmail.com"
# パスフレーズは任意（空でもOK）
# 保存先: C:\Users\<ユーザー名>\.ssh\id_ed25519
```

### 公開鍵をGitHubに登録する

```powershell
# 公開鍵の内容を表示してコピー
Get-Content "$env:USERPROFILE\.ssh\id_ed25519.pub"
```

コピーした内容を GitHub → Settings → SSH and GPG keys → New SSH key に貼り付ける。

### 接続確認

```powershell
ssh -T git@github.com
# "Hi plizz4000! You've successfully authenticated..." と表示されればOK
```

---

## STEP 2: リポジトリをクローン（サブモジュール込み）

```powershell
git clone --recurse-submodules git@github.com:plizz4000/takuya-cc-company.git
cd takuya-cc-company
```

サブモジュールが空の場合（cloneし忘れた場合）：

```powershell
git submodule update --init --recursive
```

---

## STEP 3: Claude Code CLI のインストール

```powershell
# Node.js が必要（https://nodejs.org/ からインストール）
npm install -g @anthropic-ai/claude-code
```

インストール確認：

```powershell
claude --version
```

---

## STEP 4: 環境変数の設定

`.env` ファイルをプロジェクトルートに作成（gitignore済みなのでコミットされない）：

```powershell
# プロジェクトルートに移動してから
New-Item -Name ".env" -ItemType File
notepad .env
```

`.env` の内容（必要なAPIキーを設定）：

```
ANTHROPIC_API_KEY=sk-ant-xxxx
# 他に必要なAPIキーがあれば追加
```

---

## STEP 5: Claude Code を起動

```powershell
cd takuya-cc-company
claude
```

起動後、CLAUDE.md が自動読み込みされ、秘書部が窓口として機能する。

---

## 日常の使い方

### 最新状態に更新する（毎日の作業開始時）

```powershell
git pull origin master
git submodule update --remote --merge
```

### 変更を保存する

```powershell
git add -A
git commit -m "作業内容の説明"
git push origin master
```

---

## トラブルシューティング

### サブモジュールが空のまま

```powershell
git submodule update --init --recursive
```

### SSH認証が失敗する

```powershell
# SSHエージェントを起動して鍵を追加
Start-Service ssh-agent
ssh-add "$env:USERPROFILE\.ssh\id_ed25519"
ssh -T git@github.com
```

### `creator-orchestra-pro` の変更を反映する

```powershell
cd creator-orchestra-pro
git pull origin master
cd ..
git add creator-orchestra-pro
git commit -m "chore: creator-orchestra-pro サブモジュール更新"
git push
```
