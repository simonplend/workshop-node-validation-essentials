import { readFileSync } from "node:fs";

/**
 * @param {string} filepath
 * @param {string} basePath
 * @returns {Object}
 */
export function loadJsonFile(filepath, basePath) {

  const jsonConfigFileContents = readFileSync(
    new URL(filepath, basePath),
    { encoding: "utf8" }
  );

  return JSON.parse(jsonConfigFileContents);
}
