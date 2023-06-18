// db.ts
import Dexie, { DexieOptions, Table } from 'dexie';

export type RecipeImage = {
  url: string;
};
export type RecipeNutrition = {
  ['@type']: string;
  calories?: string;
  fatContent?: string;
  saturatedFatContent?: string;
  carbohydrateContent?: string;
  sugarContent?: string;
  fiberContent?: string;
  proteinContent?: string;
  sodiumContent?: string;
};
export type RecipeInstruction = {
  ['@type']: string;
  text: string;
};

export type RecipeJSONLD = {
  name: string;
  description: string;
  url: string;
  dateModified: string;
  datePublished: string;
  headline: string;
  recipeCategory: string;
  keywords: string;
  recipeIngredient: string[];
  recipeInstructions: RecipeInstruction[];
  cookTime: string;
  prepTime: string;
  totalTime: string;
  nutrition?: RecipeNutrition;
  image?: RecipeImage;
  recipeYield: number | string;
  suitableForDiet: string;
};
export type Recipe = Omit<RecipeJSONLD, 'keywords'> & {
  id?: string;
  keywords: string[];
};

export class DexieRecipes extends Dexie {
  recipes!: Table<Recipe>;

  constructor(databaseName: string, options?: DexieOptions) {
    super(databaseName, options);
    // * prefix= multiEntry index https://dexie.org/docs/MultiEntry-Index
    this.version(1).stores({
      recipes:
        '++id, description, url, dateModified, datePublished, headline, recipeCategory, *keywords, *recipeIngredient, *recipeInstructions, cookTime, prepTime, totalTime, nutrition, image, recipeYield, suitableForDiet', // Primary key and indexed props,
    });
  }

  addRecipeFromJSON(json: RecipeJSONLD | undefined) {
    if (!json) return;
    // convert RecipeJSONLD to Recipe
    const recipeObj: Recipe = {
      ...json,
      keywords: json.keywords.split(',').map((str: string) => str.trim()),
    };
    return db.recipes.add(recipeObj);
  }
}

export const db = new DexieRecipes('recipeCollectorDB');
