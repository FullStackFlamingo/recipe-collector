import { useLiveQuery } from 'dexie-react-hooks';
import { Recipe, db } from '../db';
import { RecipeCard } from '../components/RecipeCard';
import { Wrapper } from '../components/Wrapper';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAddRecipe } from '../utils/use-add-recipe';
import { CogIcon, PlusCircleIcon } from '@heroicons/react/24/solid';
import RCButton from '../components/RCButton';

function ViewHome() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const searchText = searchParams.get('searchText') || '';

  const recipes = useLiveQuery<Recipe[]>(async () => {
    /* if (searchText) {
      // dexis search is a bit crummy
      return db.recipes.where('keywords').anyOfIgnoreCase([searchText]).distinct().toArray();
    } */

    const arr = await db.recipes.toArray();
    const searchTextNormalized = searchText?.trim()?.toLowerCase();

    if (!searchTextNormalized?.trim()) return arr;

    return arr.filter((recipe) => {
      return (
        recipe.keywords.join('').toLowerCase().includes(searchTextNormalized) ||
        recipe.recipeCategory.join('').toLowerCase().includes(searchTextNormalized)
      );
    });
  }, [searchParams]);

  const noRecipes = !recipes || recipes.length === 0;

  const onChangeSearchText = (e: { target: { value: string } }) => {
    setSearchParams((current) => {
      current.set('searchText', e.target.value);
      return current;
    });
  };
  const { openAddRecipeDialog, loading } = useAddRecipe();

  return (
    <Wrapper className="py-4">
      <div>
        <form>
          <div className="flex items-center mb-4">
            <label className="mr-2 sr-only" htmlFor="searchText">
              {t('recipeLister.labelSearchText')}
            </label>
            <input
              id="searchText"
              placeholder={t('recipeLister.labelSearchText')}
              className="w-full border py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              onChange={onChangeSearchText}
              value={searchText}
            />
          </div>
        </form>
      </div>
      {noRecipes && (
        <RCButton as="button" className="flex items-center mx-auto" disabled={loading} onClick={openAddRecipeDialog}>
          {loading ? (
            <CogIcon aria-hidden className="w-12 p-2 animate-spin" />
          ) : (
            <PlusCircleIcon aria-hidden className="w-12 p-2" />
          )}
          <span>{t('recipeLister.buttonAddRecipe')}</span>
        </RCButton>
      )}
      {recipes?.map((recipe) => (
        <RecipeCard className="mb-2" recipe={recipe} key={recipe.id} />
      ))}
    </Wrapper>
  );
}

export default ViewHome;
