import { Link } from 'react-router-dom';
import slugify from 'slugify';
import purify from 'dompurify';
import { Recipe } from '../db';
import classNames from 'classnames';

const getRecipeURL = (recipe: Recipe): string => {
  return `/recipes/${recipe.id}/${slugify(recipe.name)}`;
};
type props = {
  recipe: Recipe;
  className?: string | null;
};

export function RecipeCard({ recipe, className }: props) {
  const classNameExtended = classNames('block bg-white border', className);

  return (
    <Link className={classNameExtended} to={getRecipeURL(recipe)}>
      <span className="flex items-center">
        {recipe.image?.url && <img src={recipe.image?.url} className="mr-4 max-w-24 max-h-20" />}
        <h2 dangerouslySetInnerHTML={{ __html: purify.sanitize(recipe.name) }} className="text-lg font-bold" />
      </span>
    </Link>
  );
}
