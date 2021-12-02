import { db } from "../../shared/database.js";

export const routes = [
  {
    method: "POST",
    path: "/recipes",
    handler: async function (request, response) {
      const recipe = request.body;

      if (
        !recipe.hasOwnProperty("ingredients") ||
        !Array.isArray(recipe.ingredients) ||
        !recipe.ingredients.length >= 1
      ) {
        /**
         * Find the appropriate 4×× Client Error status code (422 — Unprocessable Entity).
         *
         * Set the response HTTP status code.
         */
        response.statusCode = 422;

        return;
      }

      const newRecipe = await db.insertRecipe(recipe);

      console.log("Recipe ingredients:", recipe.ingredients.join(", "));

      response.statusCode = 201;

      response.setHeader("Content-Type", "application/json");

      response.write(JSON.stringify(newRecipe));
    },
  },
];
