import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

import './styles/index.css';

import { initI18n } from './i18n';

const init = async () => {
  await initI18n();

  createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
};

init();
