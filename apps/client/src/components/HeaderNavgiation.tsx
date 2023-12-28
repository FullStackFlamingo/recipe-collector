import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Bars3Icon, PlusCircleIcon, HomeIcon, CogIcon } from '@heroicons/react/24/solid';
import { Wrapper } from './Wrapper';
import DialogMainNavigation from './DialogMainNavigation';
import { useAddRecipe } from '../utils/use-add-recipe';

export function HeaderNavgiation() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const { openAddRecipeDialog, loading } = useAddRecipe();

  const { t } = useTranslation();

  return (
    <nav className="relative flex items-center h-16 bg-teal-600 text-white">
      <Wrapper className="flex">
        <button aria-label={t('headerNavigation.toggleMenu')} onClick={() => setMenuOpen(!menuOpen)}>
          <Bars3Icon className="w-12 p-2" aria-hidden />
        </button>
        <span className="flex-1" />
        <Link className="flex items-center ml-4" to="/">
          <HomeIcon aria-hidden className="w-12 p-2" />
          <span>{t('headerNavigation.buttonRecipeList')}</span>
        </Link>
        <button className="flex items-center ml-4" onClick={openAddRecipeDialog}>
          {loading ? (
            <CogIcon aria-hidden className="w-12 p-2 animate-spin" />
          ) : (
            <PlusCircleIcon aria-hidden className="w-12 p-2" />
          )}
          <span>{t('headerNavigation.buttonAddRecipe')}</span>
        </button>
      </Wrapper>
      <DialogMainNavigation isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </nav>
  );
}
