import type {Config} from 'jest';
  
const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  modulePathIgnorePatterns: ["<rootDir>/.serverless/", "<rootDir>/dist/"], // Ignora a pasta .serverless e dist
};

export default config;
