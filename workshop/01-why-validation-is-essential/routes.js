import { db } from "./database.js";

export const routes = [
  {
    method: "", /** TODO */
    path: "", /** TODO */
    handler: async function (request, response) {
      const recipe = {}; /** TODO */

      try {
        const newRecipe = await db.insertRecipe(recipe);

        console.log(`Recipe ingredients:`, recipe.ingredients.join(", "));

        response.statusCode = 0; /** TODO */

        response.setHeader("Content-Type", ""); /** TODO */

        response.write(""); /** TODO */
      } catch (error) {
        console.error(error);

        response.statusCode = 0; /** TODO */
      }
    },
  },
];
