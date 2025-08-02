import type { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  preset: "ts-jest",
  testEnvironment: "jest-fixed-jsdom",
  collectCoverage: true,
  coveragePathIgnorePatterns: ["node_modules", "dist"],
  coverageDirectory: "<rootDir>/coverage/",
  coverageReporters: ["html", "text", "text-summary", "cobertura"],
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  setupFilesAfterEnv: ["<rootDir>/src/jest.setup.ts"],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        diagnostics: {
          ignoreCodes: [1343],
        },
        astTransformers: {
          before: [
            {
              path: "ts-jest-mock-import-meta",
              options: { metaObjectReplacement: { env: { BASE_URL: "/" } } },
            },
          ],
        },
      },
    ],
  },
};
export default config;
