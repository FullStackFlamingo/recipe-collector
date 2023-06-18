import 'dotenv/config';

import { createApp } from './app.js';

createApp().listen({ port: 3333 }, (err) => {
  if (err) console.error(err);
  console.log('server listening on 3333');
});
