import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = dirname(fileURLToPath(import.meta.url));

import { test } from "tap";
import get from "simple-get";
const makeRequest = get.concat;

import { createHttpServer } from "../../shared/app.js";

test("POST /recipes route", async (t) => {
  const server = await createHttpServer({ routesPath: resolve(`${__dirname}/../routes.js`) });

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

  t.test("should send a response with the newly created recipe when request body is valid", (t) => {
    t.plan(3);

    const body = {
      "name": "Tabbouleh",
      "ingredients": [
        "parsley",
        "2 lemons",
        "cucumber",
        "bulgur"
      ]
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
  });

  t.test("should send an error response when request body is missing an `ingredients` property", (t) => {
    t.plan(2);

    makeRequest(
      {
        url: t.context.rootUrl + "/recipes",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "name": "Tabbouleh"
        })
      },
      (error, response, responseBody) => {
        t.error(error);
        t.equal(response.statusCode, 422);
      }
    );
  });

  t.test("should send an error response when request body `ingredients` property is a string", (t) => {
    t.plan(2);

    makeRequest(
      {
        url: t.context.rootUrl + "/recipes",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "name": "Tabbouleh",
          "ingredients": "parsley, 2 lemons, cucumber, bulgur"
        })
      },
      (error, response, responseBody) => {
        t.error(error);
        t.equal(response.statusCode, 422);
      }
    );
  });

  t.test("should send an error response when request body `ingredients` property is an array with 0 items", (t) => {
    t.plan(2);

    makeRequest(
      {
        url: t.context.rootUrl + "/recipes",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "name": "Tabbouleh",
          "ingredients": []
        })
      },
      (error, response, responseBody) => {
        t.error(error);
        t.equal(response.statusCode, 422);
      }
    );
  });
});
