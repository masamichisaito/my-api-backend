// server.js
// .env.test や .env.production に応じて読み込み
require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

const app = require('./app'); // Expressアプリの定義（app.js）

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT} (${process.env.NODE_ENV})`);
});
