import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = dirname(fileURLToPath(import.meta.url));

import { test } from "tap";
import get from "simple-get";
const makeRequest = get.concat;

import { createHttpServer } from "../../shared/app.js";
import { loadJsonFile } from "../../shared/helpers.js";

test("recipe schema", async (t) => {
  const recipeSchema = await loadJsonFile(
    "../schemas/recipe.schema.json",
    import.meta.url
  );

  t.test("property `time` has schema with `type` 'object'", (t) => {
    t.plan(1);
    t.equal(recipeSchema.properties.time.type, "object");
  });

  t.test("property `time` has schema with `required` properties", (t) => {
    t.plan(1);
    t.has(recipeSchema.properties.time.required, ["preparation", "cooking"]);
  });

  t.test("property `time` has schema defining `properties`", (t) => {
    t.plan(1);
    t.has(recipeSchema.properties.time.properties, {
      preparation: {
        type: "integer",
      },
      cooking: {
        type: "integer",
      },
    });
  });
});

test("POST /recipes route", async (t) => {
  const server = await createHttpServer({
    routesPath: resolve(`${__dirname}/../routes.js`),
  });

  t.beforeEach(() => {
    return new Promise((resolve, reject) => {
      const httpServer = server.listen(0, () => {
        t.context.httpServer = httpServer;
        t.context.rootUrl = `http://127.0.0.1:${httpServer.address().port}`;
        resolve();
      });
    });
  });

  t.afterEach(() => t.context.httpServer.close());

  t.test(
    "should send a response with the newly created recipe when request body is valid",
    (t) => {
      t.plan(3);

      const body = {
        name: "Tabbouleh",
        ingredients: ["parsley", "2 lemons", "cucumber", "bulgur"],
        time: {
          preparation: 20,
          cooking: 45,
        },
      };

      makeRequest(
        {
          url: t.context.rootUrl + "/recipes",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body,
          json: true,
        },
        (error, response, responseBody) => {
          t.error(error);
          t.equal(response.statusCode, 201);
          t.match(responseBody, body);
        }
      );
    }
  );

  t.test(
    "should send an error response with a validation error when request body property `ingredients` is not an array",
    (t) => {
      t.plan(3);

      const expectedResponseBody = [
        {
          instancePath: "/ingredients",
          schemaPath: "#/properties/ingredients/type",
          keyword: "type",
          params: { type: "array" },
          message: "must be array",
        },
      ];

      makeRequest(
        {
          url: t.context.rootUrl + "/recipes",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            name: "Tabbouleh",
            ingredients: "parsley, 2 lemons, cucumber, bulgur",
          },
          json: true,
        },
        (error, response, responseBody) => {
          t.error(error);
          t.equal(response.statusCode, 422);
          t.match(responseBody, expectedResponseBody);
        }
      );
    }
  );

  t.test(
    "should send an error response with a validation error when request body property `time` is invalid",
    (t) => {
      t.plan(3);

      // TODO: Update
      const expectedResponseBody = [
        {
          instancePath: "/time",
          schemaPath: "#/properties/time/type",
          keyword: "type",
          params: { type: "object" },
          message: "must be object",
        },
      ];

      makeRequest(
        {
          url: t.context.rootUrl + "/recipes",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            name: "Tabbouleh",
            ingredients: ["parsley", "2 lemons", "cucumber", "bulgur"],
            time: 65,
          },
          json: true,
        },
        (error, response, responseBody) => {
          t.error(error);
          t.equal(response.statusCode, 422);
          t.match(responseBody, expectedResponseBody);
        }
      );
    }
  );
});
