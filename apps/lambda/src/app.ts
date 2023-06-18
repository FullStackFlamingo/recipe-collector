import fastify from 'fastify';
import cors from '@fastify/cors';

export function createApp() {
  const app = fastify();
  console.log('#process.env.CORS_ORIGIN', process.env.CORS_ORIGIN);

  app.register(cors, {
    origin: process.env.CORS_ORIGIN,
    // put your options here
  });
  app.register(import('./routes.js'));
  return app;
}
