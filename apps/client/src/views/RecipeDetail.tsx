import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import purify from 'dompurify';
import { Recipe, db } from '../db';
import { usePrettyDuration } from '../utils/use-pretty-duration';
import { Wrapper } from '../components/Wrapper';
import TagPill from '../components/TagPill';
import RCButton from '../components/RCButton';

export default function ViewRecipe() {
  const { t } = useTranslation();

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
    return <h1>{t('recipeDetail.loading')}</h1>;
  }
  return (
    <article className="py-4">
      <Wrapper>
        <div className="prose">
          <RCButton className="mb-4" to="/">
            {t('recipeDetail.buttonBack')}
          </RCButton>
          <h1 dangerouslySetInnerHTML={{ __html: purify.sanitize(recipe.name) }} />

          <section>
            {recipe.image?.url && <img src={recipe.image?.url} />}
            <p dangerouslySetInnerHTML={{ __html: purify.sanitize(recipe.description) }} />
          </section>
          <section className="flex">
            <table className="max-w-80">
              <thead>
                <tr>
                  <th>
                    <h4>{t('recipeDetail.labelCookTime')}</h4>
                  </th>
                  <th>
                    <h4>{t('recipeDetail.labelPrepTime')}</h4>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <span>{cookTime}</span>
                  </td>
                  <td>
                    <span>{prepTime}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>

          <section>
            <h2>{t('recipeDetail.titleIngredients')}</h2>
            <ul>
              {recipe.recipeIngredient.map((ingredient, index) => (
                <li key={ingredient + index}>{ingredient}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2>{t('recipeDetail.titleSteps')}</h2>
            <ol>
              {recipe.recipeInstructions.map((instruction) => (
                <li key={instruction.text}>{instruction.text}</li>
              ))}
            </ol>
          </section>

          {recipe.nutrition && (
            <section>
              <h2>{t('recipeDetail.titleNutrition')}</h2>
              <ul>
                {Object.entries(recipe.nutrition).map((val) => (
                  <li key={val[0]}>
                    {val[0]} - {val[1]}
                  </li>
                ))}
              </ul>
            </section>
          )}
          <section className="not-prose">
            <h2 className="text-lg font-bold mb-2">{t('recipeDetail.titleTags')}</h2>
            <ul className="flex flex-wrap">
              {recipe.keywords.map((keyword) => (
                <li key={keyword} className="mr-2 mb-2">
                  <TagPill>{keyword}</TagPill>
                </li>
              ))}
            </ul>
            <h2 className="text-lg font-bold mb-2">{t('recipeDetail.titleCategories')}</h2>
            <ul className="flex flex-wrap">
              {recipe.recipeCategory.map((category) => (
                <li key={category} className="mr-2 mb-2">
                  <TagPill>{category}</TagPill>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </Wrapper>
    </article>
  );
}
