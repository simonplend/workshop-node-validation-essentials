import { readFile } from 'fs/promises';

/**
 * @param {string} filepath
 * @param {string} basePath
 * @returns {Promise<Object>}
 */
export async function loadJsonFile(filepath, basePath) {
  // @ts-ignore
  return JSON.parse(await readFile(new URL(filepath, basePath)));
}
