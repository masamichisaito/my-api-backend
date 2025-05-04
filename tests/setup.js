const { execSync } = require('child_process');
require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

beforeAll(() => {
  const env = process.env.NODE_ENV || 'development';
  try {
    console.log(`🔧 Recreating ${env} DB...`);

    try {
      execSync(`npx sequelize-cli db:migrate:undo:all --env ${env}`, { stdio: 'inherit' });
    } catch {
      console.warn('⚠️ No migrations to undo or undo failed. Continuing...');
    }

    try {
      execSync(`npx sequelize-cli db:migrate --env ${env}`, { stdio: 'inherit' });
      console.log('✅ DB migrations completed');
    } catch (err) {
      console.warn('⚠️ Migration failed but continuing test run:', err.message);
      // exitしない
    }
  } catch (err) {
    console.error('❌ Unexpected migration error:', err.message);
  }
});
