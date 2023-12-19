import { Link } from 'react-router-dom';
import { Recipe } from '../db';
import slugify from 'slugify';

const getRecipeURL = (recipe: Recipe): string => {
  return `/recipes/${recipe.id}/${slugify(recipe.name)}`;
};
type props = {
  recipe: Recipe;
};

export function RecipeCard({ recipe }: props) {
  return (
    <Link className="block p-4 bg-white" to={getRecipeURL(recipe)}>
      {recipe.name}
    </Link>
  );
}
