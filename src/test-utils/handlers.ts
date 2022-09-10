import { rest } from 'msw';
import cats from './mocks/cats.json';

const handlers = [
  rest.get('https://631c5fa04fa7d3264caca918.mockapi.io/api/cats', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(cats));
  }),
];

export default handlers;
