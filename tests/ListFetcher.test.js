import { Response } from 'node-fetch';
import ListFetcher from '../lib/ListFetcher';

const XWS_URL = 'http://mybuilder.com/path/to/squad.xws';

describe('listFetcher', () => {
  test('returns XWS on success', async () => {
    const xws = {
      faction: 'imperial',
      pilots: [
        {
          name: 'academypilot',
          points: 12,
          ship: 'tiefighter',
        },
      ],
    };

    const response = new Response(JSON.stringify(xws));
    const instance = new ListFetcher(() => Promise.resolve(response));

    const result = await instance.fetch(XWS_URL);

    expect(result).toEqual(xws);
  });
  describe('returns `false`', () => {
    test('when XWS could not be fetched', async () => {
      const response = new Response('', { status: 404, statusText: 'Not Found' });
      const instance = new ListFetcher(() => Promise.resolve(response));

      const result = await instance.fetch(XWS_URL);
      expect(result).toEqual(false);
    });
    test('when the received JSON is not valid XWS', async () => {
      const invalidXws = { foo: 'bar' }; // Missing `pilots` and `faction` fields
      const response = new Response(JSON.stringify(invalidXws));
      const instance = new ListFetcher(() => Promise.resolve(response));

      const result = await instance.fetch(XWS_URL);
      expect(result).toEqual(false);
    });
  });
});
