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
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
+   "required": ["name", "ingredients"],
```

Don't allow any properties that aren't listed in this schema:

```diff
  {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "required": ["name", "ingredients"],
+   "additionalProperties": false,
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

Save your changes.

## Integrate the Ajv library

Import the Ajv library and create a new Ajv instance:

```javascript
import Ajv from "ajv";
```

```javascript
const ajv = new Ajv();
```

## Import and compile the recipe schema

```javascript
import { loadJsonFile } from "../shared/helpers.js";
```

Above the `routes` array:

```javascript
// TODO: Do this more cleanly and update everywhere
const recipeSchema = await loadJsonFile(
  "./schemas/recipe.schema.json",
  import.meta.url
);
```

Use Ajv to compile the recipe JSON schema:

```javascript
const validateRecipe = ajv.compile(recipeSchema);
```

Save your changes.

## Validate the request body against the recipe schema

Replace any existing validation code inside the route handler function with:

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

## 🎯 Exercise 2.1

**Goal: Change the recipe schema to allow for an improved `time` value.**

- The recipes need to include the times for preparation and cooking.
- Change the schema for the `time` property from an `integer` to allow for an
`object` like this:

```json
{
  "time": {
    "preparation": 20,
    "cooking": 45
  }
}
```

Check your work by running:

```sh
npm test 02-creating-flexible-validation-rules/test/routes.exercise-2.1.test.js
```

<details>
  <summary><strong>Exercise hints (try without them to start with)</strong></summary>

  - Take a look at the [object reference documentation on Understanding JSON Schema](https://json-schema.org/understanding-json-schema/reference/object.html).
  - Make sure you specify which properties are required.
</details>

<details>
  <summary><strong>Solution</strong></summary>

  You can see a passing solution in
  [completed/recipe.schema.exercise-2.1.completed.json](completed/recipe.schema.exercise-2.1.completed.json).
</details>

## How schema builders can help us build our JSON schemas faster

<!-- TODO: Pull in content from article 'Get started with validation in Node.js' -->

## Adding custom validation logic with Ajv keywords

Add this after the Ajv instance is created in [routes.js](routes.js)

```javascript
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
```

Add the `glutenFree` keyword to the `ingredients.items` schema:

```diff
  "ingredients": {
    "type": "array",
    "minItems": 1,
    "items": {
      "type": "string",
       "minLength": 1,
-      "maxLength": 100
+      "maxLength": 100,
+      "glutenFree": true
  }
},
```

Make a `POST` request to the `/recipes` endpoint:

```sh
make valid-request
```

This request now fails validation as the recipe has an ingredient which contains gluten.

Set `glutenFree` to `false` to allow recipes with ingredients which contain gluten.

Make another `POST` request to the `/recipes` endpoint:

```sh
make valid-request
```

## 🎯 Exercise 2.2

**Goal: Ensure that the recipe name is unique.**

- Copy this skeleton code which defines a new validation keyword. Paste it
after the Ajv instance is created in [routes.js](routes.js):

```javascript
ajv.addKeyword({
  keyword: "uniqueName",
  async: undefined, /** TODO */
  type: "", /** TODO */
  error: {
    message: "", /** TODO */
    params: {}
  },
  validate: async function checkNameIsUnique(schema, nameValue) {
    if (schema === false) {
      return undefined; /** TODO */
    }

    const recipe = await db.fetchRecipeByName(nameValue);
    const nameIsUnique = undefined; /** TODO */

    return undefined; /** TODO */
  },
});
```

- Note: `db.fetchRecipeByName` returns a recipe object if it finds a recipe with a matching name,
or `null` if it doesn't.
- Replace the validation and error handling code:

```diff
- if (!validateRecipe(recipe)) {
-   console.error(validateRecipe.errors);
-
-   response.statusCode = 422;
-
-   response.write(JSON.stringify(validateRecipe.errors));
-
-   return;
- }
+ try {
+   await validateRecipe(recipe);
+ } catch (error) {
+   if (!(error instanceof Ajv.ValidationError)) {
+     throw error;
+   }
+
+   response.statusCode = 422;
+
+   response.write(JSON.stringify(error.errors));
+
+   return;
+ }
```

- Complete the lines of code which have `/** TODO */` comments on them.
- Use the `uniqueName` keyword in the recipe schema to ensure that the value of the `name` property is unique.
- Refer to the Ajv guide for [user-defined keywords](https://ajv.js.org/guide/user-keywords.html) and documentation for [asynchronous validation](https://ajv.js.org/guide/async-validation.html).

Check your work by running:

```sh
npm test 02-creating-flexible-validation-rules/test/routes.exercise-2.2.test.js
```

<details>
  <summary><strong>Exercise hints (try without them to start with)</strong></summary>

  - The `db.fetchRecipeByName` method is asynchronous.
  - If the schema for the `uniqueName` keyword is `false`, you don't need to check if the name is unique.
  - Make sure you've added `"$async": "true"` in the recipe schema.
</details>

<details>
  <summary><strong>Solution</strong></summary>

  You can see a passing solution in
  [completed/routes.exercise-2.2.completed.js](completed/routes.exercise-2.2.completed.js) and
  [completed/recipe.schema.exercise-2.2.completed.json](completed/recipe.schema.exercise-2.2.completed.json).
</details>

## ⏭️ Next part

[Part 3 — Making our applications more robust with schema generated types](../03-generated-schema-types/README.md)
