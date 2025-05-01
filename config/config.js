require('dotenv').config(); // .env ファイルの読み込み

module.exports = {
  development: {
    username: 'postgres',
    password: 'your_password',
    database: 'your_database',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME_TEST || 'my_api_test',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432,
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
  },
};
