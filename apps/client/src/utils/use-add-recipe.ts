import { useFetch } from 'use-http';
import { useNavigate } from 'react-router-dom';
import { RecipeJSONLD, db } from '../db';

export function useAddRecipe() {
  const navigate = useNavigate();
  const { get, loading } = useFetch<RecipeJSONLD>(import.meta.env.VITE_API_URI);

  async function openAddRecipeDialog() {
    if (loading) return;
    const url = window.prompt('Enter recipe url', 'https://www.bbcgoodfood.com/recipes/cheese-bacon-turnovers');
    if (url) {
      const result = await get(`/?${new URLSearchParams({ url }).toString()}`);
      const id = await db.addRecipeFromJSON(result);
      if (id) {
        navigate(`/recipes/${id}`);
      }
    }
  }

  return { loading, openAddRecipeDialog };
}
