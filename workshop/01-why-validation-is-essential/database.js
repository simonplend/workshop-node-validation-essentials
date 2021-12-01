import { randomUUID } from "node:crypto";

export const db = {
  insertRecipe(recipe) {
    return {
      id: randomUUID(),
      ...recipe
    }
  }
};
