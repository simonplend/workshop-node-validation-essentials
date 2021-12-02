# Part 4 — Sending back validation errors in an effective response format

## 🧠 Learning objectives

- What makes an error response effective.
- How the Problem Details specification can help us.
- Transforming Ajv errors into a Problem Details error response.

## 🗣️ What makes an error response effective

Discuss as a group.

## Introducing the Problem Details specification

The Problem Details specification — formally known as
[Problem Details for HTTP APIs](https://tools.ietf.org/html/rfc7807) (RFC7807) —
defines a common format which you can use for error responses from your API.
It describes a problem detail as "a way to carry machine-readable details of
errors in an HTTP response".

This specification avoids having to invent your own error response format or,
even worse, attempting to redefine the purpose of existing HTTP status codes.
The error status codes defined in the [HTTP standard](https://datatracker.ietf.org/doc/html/rfc7231#section-6)
each have a specific meaning, but they often don't convey enough information
by themselves to be helpful.

Take for example the status code `422 (Unprocessable Entity)`. As defined in the
HTTP specification, it tells a client that the server understood the request body
and its structure, but was unable to process it. However, that alone doesn't tell
the client specifically _what_ was wrong with the JSON that was sent in the request
body. It's lacking context. Using problem details in a response can provide context
in a structured way.

Here's an example problem details response from the Problem Details specification:

```json
HTTP/1.1 403 Forbidden
Content-Type: application/problem+json
Content-Language: en

{
  "type": "https://example.com/probs/out-of-credit",
  "title": "You do not have enough credit.",
  "detail": "Your current balance is 30, but that costs 50.",
  "instance": "/account/12345/msgs/abc",
  "balance": 30,
  "accounts": ["/account/12345", "/account/67890"]
}
```

<!-- TODO: Create a diagram to visualise problem types and problem details objects -->

The specification defines two key concepts, "problem types" and "problem details objects".

### Problem types

A problem type definition must include a `type` URI (typically a URL), a short
`title` to describe it, and the HTTP `status` code for it to be used with.

If needed, the definition can also specify additional properties to be included
on problem details objects which use this type e.g. `balance` and `accounts` in
the example above. These additional properties are referred to as "extensions".

The `type` URI is effectively the namespace for the problem type definition. If
the definition changes, the type should also change.

### Problem details objects

An object which includes the `type`, `title` and `status` properties for a problem type.
This object represents a specific occurrence of that problem type. It can optionally
contain a `detail` property, which should be a human-readable explanation specific
to this occurrence of the problem. It can also optionally contain an `instance`
property: a URI reference that identifies the specific occurrence of the problem.

A problem details object should include values for any extensions specified by the
problem type definition.

## Breaking down a problem details response

To better understand the properties which make up a problem details object, let's
break it down and look at each property line by line:

```json
"type": "https://example.com/probs/out-of-credit"
```

The `type` URI for the problem type being used by this problem details object
(typically a URL). The specification encourages that this is  a real URL which
provides human-readable documentation in HTML format. The client should use the
value of this field as the primary identifier for the problem.

The `type` for a problem is typically one that you define, which is specific to
your API. In this example, when the client receiving the problem details response
checks the value of the `type` field, it can identify it as an "out of credit"
problem and handle it appropriately.

```json
"title": "You do not have enough credit."
```

The `title` defined by the problem type.

```json
"status": 403
```

The HTTP `status` code defined by the problem type. Should be the same as the
status code sent in the response from the API.

As intermediaries between the client and the server (e.g. a proxy or a cache)
might modify the response status code, this value can be used by the client to
determine the original status code of the response. Also useful in situations
where the response body is the only available part of the response e.g. in logs.

```json
"detail": "Your current balance is 30, but that costs 50."
```

A human-readable explanation of the problem. It should focus on helping the
client correct the problem. Machine-readable information should be added in
extensions. Specific to this occurrence of the problem.

```json
"instance": "/account/12345/msgs/abc"
```

A URI reference for the specific problem occurrence. Typically a URL, optionally
containing more information. Specific to this occurrence of the problem.

```json
"balance": 30,
"accounts": ["/account/12345", "/account/67890"]
```

Extensions specified by the `https://example.com/probs/out-of-credit` problem type.
These values are specific to this occurrence of the problem.

The `type`, `title` and `status` — as defined by a problem type — should be the
same for every occurrence of the problem.

_Note: As with any response you send from your API, be careful when creating
problem details objects not to expose any of the implementation details of your
application, as this can make it potentially vulnerable to attack._

The example problem details response above contains the HTTP header
`Content-Type: application/problem+json`. This is the media type for JSON problem
details, and must be set for any response which contains a problem details object.
Clients can use the response's `Content-Type` header to determine how they should
parse the response body, allowing them to handle different types of response
bodies in different ways.

## Adding problem details to your applications

Like the JSON Schema specification, the Problem Details specification is not tied
to a specific language or framework. You can use problem details when building
any Node.js application. An implementation of problem details for validation
errors ideally involves the following steps:

- Defining problem types, and potentially mapping them to JavaScript error types.
- Handling validation errors when they occur at the route handler level.
- Picking an appropriate problem type which corresponds to the validation errors.
- Constructing a problem details object, which is of the determined problem type,
and which contains the validation errors.
- Sending the problem details as the body of an HTTP response, along with a
suitable HTTP error status code.

## Change back into the workshop directory

```sh
cd ..
```

## Copy over your work so far

```sh
cp 03-generated-schema-types/routes.js 04-validation-error-responses/routes.js

cp -r 03-generated-schema-types/schemas 04-validation-error-responses/

cp -r 03-generated-schema-types/types/schemas 04-validation-error-responses/types/
```

## Start your server

```sh
npm start --part=04-validation-error-responses
```

## 🎯 Exercise 4.1

**Send validation errors in a problem details error response.**

- Define a problem type (a URL as an identifier for the problem type, does not need to exist).
- Construct a problem details object which includes validation errors in a
`validationErrors` extension property.
- Send the problem details in an HTTP error response.
- Run the command `make invalid-request` to test your HTTP error response.

Check your work by running:

```sh
npm test 04-validation-error-responses/test/routes.exercise-4.1.test.js
```

<details>
  <summary><strong>Exercise hints (try without them to start with)</strong></summary>

  - Problem details objects must include a:
    - `type` (problem type URL)
    - `title` (short description of the problem type)
    - `status` (HTTP status code matching the HTTP status code of the response)
  - Make sure you include the Ajv validation errors in a `validationErrors` extension property.
  - Make sure you send a Problem Details `Content-Type` HTTP response header.
</details>

<details>
  <summary><strong>Solution</strong></summary>

  You can see a passing solution in
  [completed/routes.exercise-4.1.completed.js](completed/routes.exercise-4.1.completed.js).
</details>

## ⏭️ Next part

[Part 5 — Integrating validation with Node.js frameworks](../05-integrating-validation-with-frameworks/README.md)
