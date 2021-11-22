# Notes

## Generated types from schemas + JSDoc annotations

### Approach 1

```javascript
/**
 * @param {import('fastify').FastifyRequest<{Body: import('./types/schemas/recipe.schema').RecipeSchema}>} request
 */
```

### Approach 2

```javascript
/**
 * @param {import('./types/requests').RecipeRequest} request
 */
```

```typescript
// types/requests.d.ts
import { FastifyRequest } from "fastify";
import { RecipeSchema } from "./schemas/recipe.schema";

export type RecipeRequest = FastifyRequest<{
	Body: RecipeSchema;
}>;
```
