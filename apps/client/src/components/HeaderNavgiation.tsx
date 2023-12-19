import { useState } from 'react';
import { RecipeJSONLD, db } from '../db';
import { useFetch } from 'use-http';
import { useTranslation } from 'react-i18next';
import { Wrapper } from './Wrapper';
import { Bars3Icon, PlusCircleIcon } from '@heroicons/react/24/solid';
import DialogAddRecipe from './DialogAddRecipe';
import DialogMainNavigation from './DialogMainNavigation';

export function HeaderNavgiation() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const { get } = useFetch<RecipeJSONLD>(import.meta.env.VITE_API_URI);

  const openUrlPrompt = async () => {
    const url = window.prompt('Enter recipe url', 'https://www.bbcgoodfood.com/recipes/cheese-bacon-turnovers');
    if (url) {
      const result = await get(`/?${new URLSearchParams({ url }).toString()}`);
      console.log(result);
      const id = await db.addRecipeFromJSON(result);
    }
  };

  const { t } = useTranslation();

  return (
    <nav className="relative flex items-center h-16 bg-teal-600 text-white">
      <Wrapper className="flex">
        <button aria-label={t('headerNavigation.toggleMenu')} onClick={() => setMenuOpen(!menuOpen)}>
          <Bars3Icon className="w-12 p-2" aria-hidden />
        </button>
        <span className="flex-1" />
        <button className="flex items-center" onClick={openUrlPrompt}>
          <span>Add Recipe</span>
          <PlusCircleIcon aria-hidden className="w-12 p-2" />
        </button>
      </Wrapper>
      <DialogMainNavigation isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </nav>
  );
}