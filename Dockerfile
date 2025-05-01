# --- ベースイメージ（Node.js）
FROM node:18-alpine

# --- 作業ディレクトリ
WORKDIR /app

# --- Gitを使えるようにする（先に追加しておくとclone等も可能）
RUN apk add --no-cache git

# --- パッケージインストール
COPY package*.json ./
RUN npm install

# --- アプリコードをコピー
COPY . .

# --- ポート解放（例：Express）
EXPOSE 3000

# --- 起動コマンド
CMD ["npm", "start"]
