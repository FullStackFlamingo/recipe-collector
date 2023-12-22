import { useLiveQuery } from 'dexie-react-hooks';
import { Recipe, db } from '../db';
import { RecipeCard } from '../components/RecipeCard';
import { Wrapper } from '../components/Wrapper';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function ViewHome() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const keywords = searchParams.get('keywords') || '';

  const recipes = useLiveQuery<Recipe[]>(async () => {
    /* if (keywords) {
      // dexis search is a bit crummy
      return db.recipes.where('keywords').anyOfIgnoreCase([keywords]).distinct().toArray();
    } */

    const arr = await db.recipes.toArray();
    if (!keywords?.trim()) return arr;
    return arr.filter((recipe) => recipe.keywords.join('').toLowerCase().includes(keywords.toLowerCase()));
  }, [searchParams]);

  const onChangeKeywords = (e: { target: { value: string } }) => {
    setSearchParams((current) => {
      current.set('keywords', e.target.value);
      return current;
    });
  };
  console.log('render');
  return (
    <Wrapper className="py-4">
      <div>
        <form>
          <div className="flex items-center mb-4">
            <label className="mr-2 sr-only" htmlFor="keywords">
              {t('recipeLister.labelKeywords')}{' '}
            </label>
            <input
              id="keywords"
              placeholder={t('recipeLister.labelKeywords')}
              className="w-full border py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              onChange={onChangeKeywords}
              value={keywords}
            />
          </div>
        </form>
      </div>
      {recipes?.map((recipe) => (
        <RecipeCard className="mb-2" recipe={recipe} key={recipe.id} />
      ))}
    </Wrapper>
  );
}

export default ViewHome;
