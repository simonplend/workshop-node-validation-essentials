# Part 2 — Creating flexible validation rules with JSON Schema and Ajv

## 🧠 Learning objectives

- The benefits of defining validation rules with JSON Schema.
- Validating our data against a JSON schema with Ajv.
- How schema builders can help us build our JSON schemas faster.
- Adding custom validation logic with Ajv keywords.

## Introducing JSON Schema and Ajv

<!-- TODO: Pull in content from article 'Get started with validation in Node.js' -->

TODO:
In this workshop you'll be using JSON Schema and Ajv in the context of an API
built with Node.js, but it can be used anywhere: client side JavaScript,
a command line tool etc.

## The benefits of defining validation rules with JSON Schema

<!-- TODO: Pull in content from article 'Get started with validation in Node.js' -->

## Copy over your work so far

```sh
cp 01-why-validation-is-essential/routes.js 02-creating-flexible-validation-rules/routes.js
```

## Start your server

```sh
npm start --part=02-creating-flexible-validation-rules
```

## Add constraints to the recipe JSON schema

Open [schemas/recipe.schema.json](schemas/recipe.schema.json).

Specify which properties are required:

```diff
  {
    "type": "object",
+   "required": ["name", "ingredients"],
```

Restrict the length of the recipe `name`:

```diff
      "name": {
-       "type": "string"
+       "type": "string",
+       "minLength": 1,
+       "maxLength": 100
      },
```

Restrict the type and length of the `ingredients` array items with an `items`
subschema:

```diff
      "ingredients": {
        "type": "array",
-       "minItems": 1
+       "minItems": 1,
+       "items": {
+         "type": "string",
+         "minLength": 1,
+         "maxLength": 100
+       }
      }
```

Don't allow any properties that aren't listed in this schema:

```diff
+   "additionalProperties": false
}
```

Save your changes.

## Integrate the Ajv library

<!-- TODO: Pull in content from article 'Get started with validation in Node.js' -->

## Import and compile the recipe schema

<!-- TODO: -->

```javascript
// TODO: Do this more cleanly
const recipeSchema = await loadJsonFile(
  "./schemas/recipe.schema.json",
  import.meta.url
);
```

Inside the handler function, use Ajv to compile the recipe JSON schema:

<!-- TODO: Should this be inside or outside the handler function? -->

```diff
  handler: async function (request, response) {
+   const validateRecipe = ajv.compile(recipeSchema);
    const recipe = request.body;
```

Save your changes.

## Validate the request body against the recipe schema

Replace any existing validation code inside the handler function with:

```javascript
if (!validateRecipe(recipe)) {
  console.error(validateRecipe.errors);

  response.statusCode = 422;

  response.write(JSON.stringify(validateRecipe.errors));

  return;
}
```
Save your changes.

## Test the validation is working

Make a valid `POST` request to the `/recipes` endpoint:

```sh
make valid-request
```

Make an invalid `POST` request to the `/recipes` endpoint:

```sh
make invalid-request
```

## 🎯 TODO: Exercise 2.1

**Goal: Improve the validation of recipes.**

- Change the schema for the `time` property to allow for an `object` like this
instead of an integer:

```javascript
{
  time: {
    preparation: 20,
    cooking: 45
  }
}
```

Check your work by running:

```sh
npm test 02-creating-flexible-validation-rules/test/routes.exercise-2.1.test.js
```

<details>
  <summary><strong>Exercise hints (try without them to start with)</strong></summary>

  - TODO
</details>

<details>
  <summary><strong>Solution</strong></summary>

  You can see a passing solution in
  [completed/routes.exercise-2.1.completed.js](completed/routes.exercise-2.1.completed.js).
</details>

## How schema builders can help us build our JSON schemas faster

<!-- TODO: Pull in content from article 'Get started with validation in Node.js' -->

## Adding custom validation logic with Ajv keywords

<!-- TODO: Write up steps for adding custom Ajv keywords. -->

## 🎯 TODO: Exercise 2.2

**Goal: Ensure that the recipe title is unique.**

- TODO

Check your work by running:

```sh
npm test 02-creating-flexible-validation-rules/test/routes.exercise-2.2.test.js
```

<details>
  <summary><strong>Exercise hints (try without them to start with)</strong></summary>

  - TODO
</details>

<details>
  <summary><strong>Solution</strong></summary>

  You can see a passing solution in
  [completed/routes.exercise-2.2.completed.js](completed/routes.exercise-2.2.completed.js).
</details>

## ⏭️ Next part

[Part 3 — Making our applications more robust with schema generated types](../03-generated-schema-types/README.md)
