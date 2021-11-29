import Ajv from "ajv";

const ajv = new Ajv();

const recipeSchema = {
  type: "object",
  required: ["name", "ingredients"],
  properties: {
    name: {
      type: "string",
      minLength: 1,
      maxLength: 100,
    },
    ingredients: {
      type: "array",
      minItems: 1,
      items: {
        type: "string",
        minLength: 1,
        maxLength: 100,
      },
    },
    time: {
      type: "integer",
      minimum: 1,
    },
  },
  additionalProperties: false,
};

export const routes = [
  {
    method: "POST",
    path: "/recipes",
    handler: async function (request, response) {
      const validateRecipe = ajv.compile(recipeSchema);

      if (!validateRecipe(request.body)) {
        const statusCode = 422;

        const problemDetails = {
          type: "https://example-api.com/problem/invalid-recipe-object",
          title: "Invalid recipe object in request body",
          status: statusCode,
          // TODO: Is validateRecipe.errors guaranteed to be related to this request?
          validationErrors: validateRecipe.errors
        };

        response.statusCode = statusCode;
        response.setHeader("Content-Type", "application/problem+json");
        response.end(JSON.stringify(problemDetails));

        return;
      }

      // TODO: Save to database?

      response.statusCode = 201;
      response.setHeader("Content-Type", "application/json");
      response.end(JSON.stringify(request.body));
    },
  },
];
