import Ajv from "ajv";

import { db } from "../shared/database.js";
import { loadJsonFile } from "../shared/helpers.js";

const ajv = new Ajv();

ajv.addKeyword({
  keyword: "uniqueName",
  async: true,
  type: "string",
  error: {
    message: "must be a unique recipe name",
  },
  validate: async function checkNameIsUnique(schema, nameValue) {
    if (schema === false) {
      return true;
    }

    const recipe = await db.fetchRecipeByName(nameValue);
    const nameIsUnique = recipe === null;

    return nameIsUnique;
  },
});

ajv.addKeyword({
  keyword: "glutenFree",
  type: "string",
  error: {
    message: "must not be an ingredient which contains gluten",
  },
  validate: function checkIfGlutenFree(schema, ingredientValue) {
    if (schema === false) {
      return true;
    }

    ingredientValue = ingredientValue.toLowerCase();
    const isGlutenFree = !["bread", "couscous", "bulgur", "pasta"].includes(
      ingredientValue
    );

    return isGlutenFree;
  },
});

const recipeSchema = await loadJsonFile(
  "./schemas/recipe.schema.json",
  import.meta.url
);

const validateRecipe = ajv.compile(recipeSchema);

export const routes = [
  {
    method: "POST",
    path: "/recipes",
    handler: async function (request, response) {
      const recipe = request.body;

      try {
        await validateRecipe(recipe);
      } catch (error) {
        if (!(error instanceof Ajv.ValidationError)) {
          throw error;
        }

        response.statusCode = 422;

        response.write(JSON.stringify(error.errors));

        return;
      }

      const newRecipe = await db.insertRecipe(recipe);

      console.log(`Recipe ingredients:`, recipe.ingredients.join(", "));

      response.statusCode = 201;

      response.setHeader("Content-Type", "application/json");

      response.write(JSON.stringify(newRecipe));
    },
  },
];
