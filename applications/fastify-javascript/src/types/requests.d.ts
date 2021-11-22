import { FastifyRequest } from "fastify";
import { RecipeSchema } from "./schemas/recipe.schema"

export type RecipeRequest = FastifyRequest<{
  Body: RecipeSchema;
}>;
