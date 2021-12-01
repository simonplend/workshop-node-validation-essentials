# Part 1 — Why validation is an essential part of every Node.js application

...

TODO: Make a request with cURL, receive an HTTP 404 error response

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

```diff
-         response.setHeader("Content-Type", undefined /** TODO */);
+         response.setHeader("Content-Type", "application/json");
```

```diff
-         response.write(/** TODO */);
+         response.write(JSON.stringify(newRecipe));
```

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
