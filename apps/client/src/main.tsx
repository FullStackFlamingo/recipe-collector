import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './modern.normalize.css';
import './index.css';

import { initi18n } from './i18n';

const init = async () => {
  await initi18n();

  createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
};

init();
