import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import purify from 'dompurify';
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
      <h1 dangerouslySetInnerHTML={{ __html: purify.sanitize(recipe.name) }} />
      <div>
        <h2>Tags</h2>
        <ul>
          {recipe.keywords.map((keyword) => (
            <li key={keyword}>{keyword}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Categories</h2>
        <ul>
          {recipe.recipeCategory.map((category) => (
            <li key={category}>{category}</li>
          ))}
        </ul>
      </div>
      <img src={recipe.image?.url} />
      <div>
        <h4>{t('recipe.labelCookTime')}</h4>
        <span>{cookTime}</span>
      </div>
      <div>
        <h4>{t('recipe.labelPrepTime')}</h4>
        <span>{prepTime}</span>
      </div>

      <p dangerouslySetInnerHTML={{ __html: purify.sanitize(recipe.description) }} />

      <div>
        <h2>Steps</h2>
        <ol>
          {recipe.recipeInstructions.map((instruction) => (
            <li key={instruction.text}>{instruction.text}</li>
          ))}
        </ol>
      </div>

      <div>
        <h2>Ingredients</h2>
        <ul>
          {recipe.recipeIngredient.map((ingredient, index) => (
            <li key={ingredient + index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      {recipe.nutrition && (
        <div>
          <h2>Nutrition</h2>
          <ul>
            {Object.entries(recipe.nutrition).map((val) => (
              <li key={val[0]}>
                {val[0]} - {val[1]}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ViewRecipe;
