import { randomUUID } from "node:crypto";

export const db = {
  async insertRecipe(recipe) {
    return {
      id: randomUUID(),
      ...recipe
    };
  }
};
