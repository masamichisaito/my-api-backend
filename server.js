// 1回だけ .env を読み込む
require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

const app = require('./app'); // Expressアプリ本体

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT} (${process.env.NODE_ENV})`);
});
