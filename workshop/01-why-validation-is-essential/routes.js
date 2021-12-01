import { db } from "./database.js";

export const routes = [
  {
    method: "" /** TODO */,
    path: "" /** TODO */,
    handler: async function (request, response) {
      const recipe = undefined /** TODO */;

      console.log(`Recipe ingredients: `, recipe.ingredients.join(", "));

      try {
        const newRecipe = db.insertRecipe(recipe);

        response.statusCode = undefined /** TODO */;

        response.setHeader("Content-Type", undefined /** TODO */);

        response.write(/** TODO */);
      } catch (error) {
        response.statusCode = undefined /** TODO */;
      }
    },
  },
];
