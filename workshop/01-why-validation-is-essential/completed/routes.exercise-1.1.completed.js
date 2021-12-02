import { db } from "../../shared/database.js";

export const routes = [
  {
    method: "POST",
    path: "/recipes",
    handler: async function (request, response) {
      const recipe = request.body;

      if (
        /** Check the `recipe` object has an `ingredients` property. */
        !recipe.hasOwnProperty("ingredients") ||
        /** Check that the `ingredients` property is an array. */
        !Array.isArray(recipe.ingredients) ||
        /** Check that the `ingredients` array has 1 or more items. */
        !recipe.ingredients.length >= 1
      ) {
        /** `return` early to stop the route handler function continuing. */
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
