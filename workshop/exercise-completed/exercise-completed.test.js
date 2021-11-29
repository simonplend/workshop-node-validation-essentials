import { test } from "tap";
import get from "simple-get";
const makeRequest = get.concat;

import { createServer } from "./app.js";

test("POST /recipes route", async (t) => {
  const server = createServer();

  t.before(() => {
    return new Promise((resolve, reject) => {
      const httpServer = server.listen(0, () => {
        t.context.httpServer = httpServer;
        t.context.rootUrl = `http://127.0.0.1:${httpServer.address().port}`;
        resolve();
      });
    });
  });

  t.teardown(() => t.context.httpServer.close());

  t.test("should send a success response when request body is valid", (t) => {
    t.plan(3);

    const body = {
      name: "Tabbouleh",
      ingredients: ["parsley", "2 lemons"],
    };

    makeRequest(
      {
        url: t.context.rootUrl + "/recipes",
        method: "POST",
        headers: {
          "content-type": "application/json",
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
  });

  t.test("should send an error response when request body is invalid", (t) => {
    t.plan(2);

    makeRequest(
      {
        url: t.context.rootUrl + "/recipes",
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: {},
        json: true,
      },
      (error, response, responseBody) => {
        t.error(error);
        t.equal(response.statusCode, 422);
        // TODO: Check the response body
        // t.match(responseBody, { name: "JsonSchemaValidationError" });
      }
    );
  });
});
