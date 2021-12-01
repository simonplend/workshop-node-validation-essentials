# Part 4 — Sending back validation errors in an effective response format

## 🧠 Learning objectives

- What makes an error response effective.
- How the Problem Details specification can help us.
- Transforming Ajv errors into a Problem Details error response.

## What makes an error response effective

<!-- TODO: Content -->

## How the Problem Details specification can help us

<!-- TODO: Create a diagram to visualise problem types and problem details objects -->

<!-- TODO: Pull in content from launch email 'Email 6 - Sending effective validation error responses' -->

## Copy over your work so far

```sh
cp 03-generated-schema-types/routes.js 04-validation-error-responses/routes.js
```

## Start your server

```sh
npm start --part=04-validation-error-responses
```

## 🎯 TODO: Exercise 4.1

**Send validation errors in a problem details error response.**

- Define a problem type.
- Construct a problem details object which includes validation errors.
- Send the problem details in an HTTP error response.

Check your work by running:

```sh
npm test 04-validation-error-responses/test/routes.exercise-4.1.test.js
```

<details>
  <summary><strong>Exercise hints (try without them to start with)</strong></summary>

  - TODO
</details>

<details>
  <summary><strong>Solution</strong></summary>

  You can see a passing solution in
  [completed/routes.exercise-4.1.completed.js](completed/routes.exercise-4.1.completed.js).
</details>
