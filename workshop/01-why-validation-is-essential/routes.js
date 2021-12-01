import { db } from "./database.js";

export const routes = [
  {
    method: "" /** TODO */,
    path: "" /** TODO */,
    handler: async function (request, response) {
      const recipe = {} /** TODO */;

      console.log(`Recipe ingredients: `, recipe.ingredients.join(", "));

      try {
        const newRecipe = db.insertRecipe(recipe);

        response.statusCode = 0 /** TODO */;

        response.setHeader("Content-Type", "" /** TODO */);

        response.write("" /** TODO */);
      } catch (error) {
        console.error(error);

        response.statusCode = 0 /** TODO */;
      }
    },
  },
];
