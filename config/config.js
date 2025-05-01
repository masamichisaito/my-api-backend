require('dotenv').config({ path: '.env.test' });

console.log('DB_USERNAME:', process.env.DB_USERNAME);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);

module.exports = {
  development: {
    username: 'postgres',
    password: 'your_password',
    database: 'your_database',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: process.env.DB_USERNAME || 'user',
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || 'myapp',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
  },
};
