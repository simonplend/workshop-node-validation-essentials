import Ajv from "ajv";

/**
 * TODO: Implement custom validation function.
 */

const ajv = new Ajv();

export const routes = [
  {
    method: "POST",
    path: "/recipes",
    /** @type {import("./types").HandlerWithTypedBody<import("./types/schemas/recipe.schema").RecipeSchema>} */
    handler: async function (request, response) {
      const recipe = request.body;
      const validateRecipe = ajv.compile(recipeSchema);

      if (!validateRecipe(recipe)) {
        const statusCode = 422;

        const problemDetails = {
          type: "https://example-api.com/problem/invalid-recipe-object",
          title: "Invalid recipe object in request body",
          status: statusCode,
          // TODO: Is validateRecipe.errors guaranteed to be related to this request?
          validationErrors: validateRecipe.errors,
        };

        response.statusCode = statusCode;
        response.setHeader("Content-Type", "application/problem+json");
        response.end(JSON.stringify(problemDetails));

        return;
      }

      // TODO: Save to database?

      response.statusCode = 201;
      response.setHeader("Content-Type", "application/json");
      response.end(JSON.stringify(recipe));
    },
  },
];

/**
 * TODO: Move this out.
 */

import { readFile } from "node:fs/promises";

/**
 * @param {string} filepath
 * @param {string} basePath
 * @returns {Promise<Object>}
 */
async function loadJsonFile(filepath, basePath) {
  // @ts-ignore
  return JSON.parse(await readFile(new URL(filepath, basePath)));
}

// @ts-ignore
const recipeSchema = await loadJsonFile(
  "./schemas/recipe.schema.json",
  import.meta.url
);
