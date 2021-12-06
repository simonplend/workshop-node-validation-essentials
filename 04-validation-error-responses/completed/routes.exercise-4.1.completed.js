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

// @ts-ignore
const recipeSchema = loadJsonFile(
  "./schemas/recipe.schema.json",
  import.meta.url
);

const validateRecipe = ajv.compile(recipeSchema);

export const routes = [
  {
    method: "POST",
    path: "/recipes",
    /** @type {import("./types").HandlerWithTypedBody<import("./types/schemas/recipe.schema").RecipeSchema>} */
    handler: async function (request, response) {
      const recipe = request.body;

      try {
        await validateRecipe(recipe);
      } catch (error) {
        if (!(error instanceof Ajv.ValidationError)) {
          throw error;
        }

        const statusCode = 422;

        /**
         * Construct a problem details object.
         */
        const problemDetails = {
          type: "http://localhost:3000/problem/invalid-recipe-object",
          title: "Invalid recipe object in request body",
          status: statusCode,
          validationErrors: error.errors,
        };

        response.statusCode = statusCode;

        /**
         * Send the appropriate problem details HTTP response header.
         */
        response.setHeader("Content-Type", "application/problem+json");

        response.write(JSON.stringify(problemDetails));

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
