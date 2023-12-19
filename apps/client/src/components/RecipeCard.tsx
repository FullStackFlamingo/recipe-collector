import { Link } from 'react-router-dom';
import slugify from 'slugify';
import purify from 'dompurify';
import { Recipe } from '../db';

const getRecipeURL = (recipe: Recipe): string => {
  return `/recipes/${recipe.id}/${slugify(recipe.name)}`;
};
type props = {
  recipe: Recipe;
};

export function RecipeCard({ recipe }: props) {
  return (
    <Link
      className="block p-4 bg-white"
      to={getRecipeURL(recipe)}
      dangerouslySetInnerHTML={{ __html: purify.sanitize(recipe.name) }}
    />
  );
}
