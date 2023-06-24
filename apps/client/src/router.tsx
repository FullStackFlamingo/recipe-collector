import { createHashRouter } from 'react-router-dom';
import Home from './views/Home.tsx';
import ErrorPage from './views/ErrorPage.tsx';
import Recipe from './views/Recipe.tsx';

export const router = createHashRouter(
  [
    {
      id: 'home',
      path: '/',
      element: <Home />,
      errorElement: <ErrorPage />,
    },
    {
      id: 'recipe',
      path: '/recipes/:recipeId/:recipeSlug?',
      element: <Recipe />,
      errorElement: <ErrorPage />,
    },
  ],
  // { basename: '/recipe-collector' },
);
