module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./tests/setup.js'], // ← これが重要！
  testTimeout: 10000
};
