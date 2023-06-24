import { createApp } from '../src/app.js';

const app = createApp();
export default async (req: Request, res: Response) => {
  await app.ready();
  app.server.emit('request', req, res);
};
