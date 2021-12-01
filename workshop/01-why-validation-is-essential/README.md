# Part 1 — Why validation is an essential part of every Node.js application

## 🧠 Learning objectives

- How validation fits into the HTTP request/response lifecycle
- Using validation to help us handle unsafe user input
- Closing the validation loop with HTTP error responses

## The HTTP request/response lifecycle

TODO: Create a request / response diagram

## Never trust user input

TODO: Pull in content from 'Email 1'

TODO: Mention data sanitization

## The Recipes API

TODO: Introduce recipes API

Explore the skeleton HTTP server:

- **[app.js](app.js)**. Contains a basic HTTP server implementation.
  - Uses the Node.js core [http](https://nodejs.org/api/http.html) module.
  - TODO
- **[server.js](server.js)**. TODO.
- **[routes.js](routes.js)**. Contains a skeleton route. You're going to configure it,
and then add basic validation and error handling to it.

## Start your server and check it's running

```sh
npm start
```

Make a valid `POST` request with [cURL](https://curl.se/) to the `/recipes` endpoint:

```sh
make valid-request
```

You should receive an HTTP 404 ([Not Found](https://httpstatuses.com/404)) error
response like this:

```
< HTTP/1.1 404 Not Found
< Date: Wed, 01 Dec 2021 11:14:22 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
< Transfer-Encoding: chunked
```

## Configure the route for creating new recipes

Open [routes.js](routes.js) in your code editor.

Set the route `method` to `"POST"`:

```diff
-     method: "", /** TODO */
+     method: "POST",
```

Set the route `path` to `"/recipes"`:

```diff
-     path: "", /** TODO */
+     path: "/recipes",
```

Set the `recipe` variable to `request.body`:

```diff
-      const recipe = {}; /** TODO */
+      const recipe = request.body;
```

Set `response.statusCode` to `201` ([Created](https://httpstatuses.com/201))
to indicate that the new recipe was successfully created:

```diff
-         response.statusCode = 0; /** TODO */
+         response.statusCode = 201;
```

Save the changes you have made.

Make a valid `POST` request to the `/recipes` endpoint:

```sh
make valid-request
```

You should receive an HTTP 201 ([Created](https://httpstatuses.com/201)) response
like this:

```
< HTTP/1.1 201 Created
< Content-Type:
< Date: Wed, 01 Dec 2021 11:24:00 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
< Transfer-Encoding: chunked
```

In the terminal where your HTTP server is running, you should see the following
message has been logged:

```
Recipe ingredients: parsley, 2 lemons, cucumber, bulgur
```

## Send the new recipe in the HTTP response

You will be sending a JSON formatted response body. You can indicate this to
the client by setting the `Content-Type` header to `"application/json"`:

```diff
-         response.setHeader("Content-Type", ""); /** TODO */
+         response.setHeader("Content-Type", "application/json");
```

Format the `newRecipe` JavaScript object as a JSON string. Then write it
to the HTTP response stream with the `response.write` method:

```diff
-         response.write(""); /** TODO */
+         response.write(JSON.stringify(newRecipe));
```

Save the changes you have made.

Make a valid `POST` request to the `/recipes` endpoint:

```sh
make valid-request
```

You should receive an HTTP 201 ([Created](https://httpstatuses.com/201)) response
like this with the correct `Content-Type` header and the new recipe in the response body:

```
< HTTP/1.1 201 Created
< Content-Type: application/json
< Date: Wed, 01 Dec 2021 11:33:00 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
< Transfer-Encoding: chunked
<

{"id":"865f7063-9e18-4937-84c5-7525e6c0a710","name":"Tabbouleh","ingredients":["parsley","2 lemons","cucumber","bulgur"]}
```

## Make an invalid request

Make a `POST` request to the `/recipes` endpoint where the `ingredients`
property is invalid. Instead of it being an array of ingredients, send them
as a comma separated string i.e. `"parsley, 2 lemons, cucumber, bulgur"`:

```sh
make invalid-request
```

You should receive the following error from cURL:

```
curl: (52) Empty reply from server
```

You should also see that your HTTP server has crashed with the following error:

```
TypeError: recipe.ingredients.join is not a function
```

The code in the recipes route handler function is expecting the `ingredients`
property to always be an array.

TODO: Explain that the invalid recipe has been stored in the database.

You're now going to fix these issues in the first exercise! 🐛

## 🎯 Exercise 1.1

**Goal: Prevent the application accepting invalid recipe ingredients.**

- Check the `recipe` object has an `ingredients` property.
- Check that the `ingredients` property is an array.
- Check that the `ingredients` array has 1 or more items.
- `return` to stop the route handler function continuing.

Check your work by running:

```sh
npm run <TODO>
```

<details>
  <summary><strong>Exercise hints (try without them to start with)</strong></summary>

  - Check the `recipe.ingredients` property exists.
  - Try using the `Array.isArray()` method ([documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray))
  - Check `recipe.ingredients.length`
</details>

## 🎯 Exercise 1.2

**Send an appropriate HTTP error status code when the ingredients are invalid.**

TODO: The HTTP response status code is currently 200 ([OK](TODO)) when the recipe ingredients are invalid.

- Pick the appropriate 4×× Client Error status code from [httpstatuses.com](https://httpstatuses.com/).
- Set the response HTTP status code.

Check your work by running:

```sh
npm run <TODO>
```

<details>
  <summary><strong>Exercise hints (try without them to start with)</strong></summary>

  - You've received an "entity" which you can't process.
  - Set the value of `response.statusCode` to set the response HTTP status code.
</details>

## ⏭️ Next part

[Part 2 — Creating flexible validation rules with JSON Schema and Ajv](../02-creating-flexible-validation-rules/README.md)
