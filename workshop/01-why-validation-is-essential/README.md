# Part 1 — Why validation is an essential part of every Node.js application

...

## Explore the skeleton HTTP server

- **[app.js](app.js)**. Contains a basic HTTP server implementation.
  - Uses the Node.js core [http](https://nodejs.org/api/http.html) module.
  - TODO
- **[server.js](server.js)**. TODO.
- **[routes.js](routes.js)**. A skeleton route which you're going to configure,
and add basic validation and error handling to.

## TODO: Heading

TODO: Make a request with cURL, receive an HTTP 404 error response

```sh
npm start
```

## TODO: Heading

```diff
-     method: "" /** TODO */,
+     method: "POST",
```

```diff
-     path: "" /** TODO */,
+     path: "/recipes",
```

```diff
-      const recipe = undefined /** TODO */;
+      const recipe = request.body;
```

```diff
-         response.statusCode = undefined /** TODO */;
+         response.statusCode = 201;
```

TODO: cURL request

## TODO: Heading

```diff
-         response.setHeader("Content-Type", "" /** TODO */);
+         response.setHeader("Content-Type", "application/json");
```

```diff
-         response.write("" /** TODO */);
+         response.write(JSON.stringify(newRecipe));
```

## TODO: Heading

```diff
-         response.statusCode = undefined /** TODO */;
+         response.statusCode = 500;
```

## 🏋️ TODO: Exercise 1.1

**Prevent the application from crashing when request data is invalid.**

- Check the request body data.
- Send an HTTP error response.

<!--

Outline:

- How validation fits into the HTTP request/response lifecycle
- Using validation to help us handle unsafe user data
- Closing the validation loop with HTTP error responses
- Exercise 1.1

TODO:

- [ ] Pull in content from 'Email 1'
- [ ] Create a request / response diagram
- [ ] Mention data sanitization

-->
