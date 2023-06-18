import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useLiveQuery } from 'dexie-react-hooks';
import { Recipe, db } from '../db';
import { RecipeCard } from '../components/RecipeCard';
const HomeRoot = styled.div``;

function ViewHome() {
  const { i18n, t } = useTranslation();

  const recipes = useLiveQuery<Recipe[]>(() => {
    return db.recipes.where('keywords').anyOfIgnoreCase('chocolate', 'romance').distinct().toArray();
  }, []);

  return (
    <HomeRoot>
      <div>{t('home.test')}</div>

      {recipes?.map((recipe) => (
        <RecipeCard recipe={recipe} key={recipe.id} />
      ))}
    </HomeRoot>
  );
}

export default ViewHome;
