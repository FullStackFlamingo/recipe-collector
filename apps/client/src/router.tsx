import { createHashRouter } from 'react-router-dom';
import Home from './views/Home.tsx';
import ErrorPage from './views/ErrorPage.tsx';
import Recipe from './views/Recipe.tsx';
import App from './App.tsx';

export const router = createHashRouter(
  [
    {
      id: 'root',
      path: '/',
      element: <App />,
      children: [
        {
          id: 'home',
          index: true,
          element: <Home />,
          errorElement: <ErrorPage />,
        },
        {
          id: 'recipe',
          path: 'recipes/:recipeId/:recipeSlug?',
          element: <Recipe />,
          errorElement: <ErrorPage />,
        },
      ],
    },
  ],
  // { basename: '/recipe-collector' },
);
