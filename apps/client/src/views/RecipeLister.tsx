import { useLiveQuery } from 'dexie-react-hooks';
import { Recipe, db } from '../db';
import { RecipeCard } from '../components/RecipeCard';
import { Wrapper } from '../components/Wrapper';

function ViewHome() {
  const recipes = useLiveQuery<Recipe[]>(() => {
    // return db.recipes.where('keywords').anyOfIgnoreCase('chocolate', 'romance').distinct().toArray();
    return db.recipes.toArray();
  }, []);

  return (
    <Wrapper>
      {recipes?.map((recipe) => (
        <RecipeCard recipe={recipe} key={recipe.id} />
      ))}
    </Wrapper>
  );
}

export default ViewHome;
