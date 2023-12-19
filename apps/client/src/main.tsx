import React from 'react';
import { createRoot } from 'react-dom/client';

import './styles/index.css';

import { initI18n } from './i18n';
import { RouterProvider } from 'react-router-dom';
import { router } from './router.tsx';

const init = async () => {
  await initI18n();

  createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  );
};

init();
