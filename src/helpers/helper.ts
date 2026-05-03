import type { Meal } from "../pages/MealsListing";

export function getIngredients(meal: Meal): { name: string; measure: string }[] {
    const result: { name: string; measure: string }[] = [];
    for (let i = 1; i <= 20; i++) {
        const name = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (name && name.trim()) {
            result.push({ name: name.trim(), measure: (measure ?? "").trim() });
        }
    }
    return result;
}

export function parseSteps(instructions: string): string[] {
    return instructions
        .split(/\r?\n/)
        .map((s) => s.replace(/^(STEP \d+[-—:]?\s*)/i, "").trim())
        .filter(Boolean);
}

