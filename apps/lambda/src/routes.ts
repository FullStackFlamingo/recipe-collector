import { FastifyInstance } from 'fastify';
import * as cheerio from 'cheerio';
import Bourne from '@hapi/bourne';
import sanitizeHTML from 'sanitize-html';

const fetchHTML = async (url: string): Promise<string> => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/114.0',
    },
  });
  return response.text();
};

const getRecipeJSONFromHTML = (html: string) => {
  const $ = cheerio.load(html);
  const possibleRecipeJSONs: { '@type'?: string }[] = $('script[type="application/ld+json"]')
    .toArray()
    .map(($el) => {
      try {
        const jsonString = $.text($el.children);
        const cleanJSONString = sanitizeHTML(jsonString, { allowedTags: [], allowedAttributes: {} });
        return Bourne.parse(cleanJSONString);
      } catch (err) {
        console.log(err);
      }
      return null;
    });

  return possibleRecipeJSONs.find((obj) => obj?.['@type']?.toLowerCase() === 'recipe');
};

async function routes(fastify: FastifyInstance /* , options: object */) {
  fastify.get(
    '/',
    {
      schema: {
        querystring: {
          url: { type: 'string', format: 'uri' },
        },
      },
    },
    async (request, reply) => {
      const { url } = request.query as { url: string };
      const html = await fetchHTML(url);
      const recipeJSON = getRecipeJSONFromHTML(html);
      return reply.send(recipeJSON);
    },
  );
}

export default routes;
