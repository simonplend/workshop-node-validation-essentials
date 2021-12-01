# Part 2 — Creating flexible validation rules with JSON Schema and Ajv

## 🧠 Learning objectives

- The benefits of defining validation rules with JSON Schema.
- Validating our data against a JSON schema with Ajv.
- How schema builders can help us build our JSON schemas faster.
- Adding custom validation logic with Ajv keywords.

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

## Validating our data against a JSON schema with Ajv

<!-- TODO: Pull in content from article 'Get started with validation in Node.js' -->

## 🎯 TODO: Exercise 2.1

**Goal: Validate request data against a JSON Schema with Ajv.**

- Define a JSON schema.
- Integrate the Ajv library.
- Compile schema with Ajv.
- Validate request data against the JSON schema.

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

<!--

TODO:

- [ ] We're going to be using JSON Schema and Ajv in the context of an API
      built with Node.js, but it can be used anywhere: client side JavaScript,
      a command line tool etc.
-->

## ⏭️ Next part

[Part 3 — Making our applications more robust with schema generated types](../03-generated-schema-types/README.md)
