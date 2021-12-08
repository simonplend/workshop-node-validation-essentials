// src/routes.js

import { loadJsonFile } from "./helpers/load-json-file.js";

const recipeSchema = await loadJsonFile(
  "./schemas/recipe.schema.json",
  import.meta.url
);

/** @type {import('fastify').FastifyPluginAsync} */
export default async function routes(fastify) {
  fastify.post(
    "/",
    {
      schema: {
        body: recipeSchema,
      },
    },
    /** @param {import('./types/requests').RecipeRequest} request */
    async function createRecipe(request, reply) {
      const newRecipe = request.body;

      /**
       * In a real application we would save the recipe to a database here.
       */
      if (!newRecipe) {
        throw new Error("Error creating recipe");
      }

      request.log.info("New recipe created");

      reply.status(201);

      return newRecipe;
    }
  );
}
