const path = require('path');

const config = {
  moduleNameMapper: {
    '^.+\\.(css|less)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
    // jest对esmodule支持不完善，某些es包得改cjs包
    'antd/es/locale/zh_CN': 'antd/lib/locale/zh_CN',
  },
  transform: {
    '^.+\\.(js|jsx)$': ['babel-jest', {
      presets: ['@babel/preset-env', '@babel/preset-react'],
    }],
    '^.+\\.(ts|tsx)$': ['ts-jest'],
  },
  collectCoverage: true,
  setupFilesAfterEnv: ['<rootDir>/config/jest.setup.js'],
  rootDir: path.resolve(__dirname, '..'),
  modulePathIgnorePatterns: ['<rootDir>/example/'],
};

module.exports = config;
