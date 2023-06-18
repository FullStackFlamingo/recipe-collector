import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { Recipe, db } from '../db';
import { usePrettyDuration } from '../utils/use-pretty-duration';

function ViewRecipe() {
  const { i18n, t } = useTranslation();

  const { recipeId } = useParams();

  const recipe = useLiveQuery<Recipe | undefined>(() => {
    if (recipeId) {
      return db.recipes.get({ id: Number(recipeId) });
    }
    return undefined;
  }, [recipeId]);
  recipe?.keywords;
  const cookTime = usePrettyDuration(recipe?.cookTime);
  const prepTime = usePrettyDuration(recipe?.prepTime);

  if (!recipe) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>{recipe.name}</h1>
      <img src={recipe.image?.url} />
      <div>
        <h4>{t('recipe.labelCookTime')}</h4>
        <span>{cookTime}</span>
      </div>
      <div>
        <h4>{t('recipe.labelPrepTime')}</h4>
        <span>{prepTime}</span>
      </div>

      <p>{recipe.description}</p>
    </div>
  );
}

export default ViewRecipe;
