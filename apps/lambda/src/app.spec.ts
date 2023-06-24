import { expectTypeOf, it, describe } from 'vitest';

import { createApp } from './app.js';
import { FastifyInstance } from 'fastify';

describe('app', () => {
  it('returns fastify instance', () => {
    const result = createApp();
    expectTypeOf(result).toMatchTypeOf<FastifyInstance>();
  });
});
