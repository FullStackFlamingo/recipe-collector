import { useTranslation } from 'react-i18next';
import { useLiveQuery } from 'dexie-react-hooks';
import { Recipe, db } from '../db';
import { RecipeCard } from '../components/RecipeCard';

function ViewHome() {
  const { t } = useTranslation();

  const recipes = useLiveQuery<Recipe[]>(() => {
    // return db.recipes.where('keywords').anyOfIgnoreCase('chocolate', 'romance').distinct().toArray();
    return db.recipes.toArray();
  }, []);

  return (
    <div>
      <div>{t('home.test')}</div>

      {recipes?.map((recipe) => (
        <RecipeCard recipe={recipe} key={recipe.id} />
      ))}
    </div>
  );
}

export default ViewHome;
