import { createHashRouter } from 'react-router-dom';
import RecipeLister from './views/RecipeLister.tsx';
import ErrorPage from './views/ErrorPage.tsx';
import RecipeDetail from './views/RecipeDetail.tsx';
import App from './App.tsx';

export const router = createHashRouter(
  [
    {
      id: 'root',
      path: '/',
      element: <App />,
      children: [
        {
          id: 'recipe-lister',
          index: true,
          element: <RecipeLister />,
          errorElement: <ErrorPage />,
        },
        {
          id: 'recipe-detail',
          path: 'recipes/:recipeId/:recipeSlug?',
          element: <RecipeDetail />,
          errorElement: <ErrorPage />,
        },
      ],
    },
  ],
  // { basename: '/recipe-collector' },
);
