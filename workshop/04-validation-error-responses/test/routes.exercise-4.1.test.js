import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = dirname(fileURLToPath(import.meta.url));

import { test } from "tap";
import get from "simple-get";
const makeRequest = get.concat;

import { createHttpServer } from "../../shared/app.js";

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
        name: "Pecan Pie",
        ingredients: ["flour", "butter", "maple syrup", "3 eggs", "pecans", "double cream"],
        time: {
          preparation: 20,
          cooking: 75,
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
    "should send a problem details error response containing validation errors when request body is not valid",
    (t) => {
      t.plan(4);

      const expectedResponseBody = {
        type: String,
        title: String,
        status: Number,
        validationErrors: [
          {
            instancePath: String,
            schemaPath: String,
            keyword: String,
            params: {},
            message: String
          }
        ]
      };

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
          },
          json: true,
        },
        (error, response, responseBody) => {

          console.log({ 'responseBody.validationErrors': responseBody.validationErrors });

          t.error(error);
          t.equal(response.statusCode, 422);
          t.match(response.headers['content-type'], "application/problem+json");
          t.match(responseBody, expectedResponseBody);
        }
      );
    }
  );
});
