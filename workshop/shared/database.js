import { randomUUID } from "node:crypto";

export const db = {
  async insertRecipe(recipe) {
    return {
      id: randomUUID(),
      ...recipe,
    };
  },
  async fetchRecipeByName(name) {
    if (name !== "Tabbouleh") {
      return null;
    }

    return {
      id: randomUUID(),
      name: "Tabbouleh",
      ingredients: ["parsley", "2 lemons", "cucumber", "bulgur"],
    };
  },
};
