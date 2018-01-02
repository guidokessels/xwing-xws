import nock from 'nock';

import fetchList from '../lib/fetch-list';

const DOMAIN = 'https://mybuilder.com';
const PATH = '/path/to/squad.xws';
const XWS_URL = DOMAIN + PATH;

describe('fetch-list', () => {
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
    nock(DOMAIN).get(PATH).reply(200, xws);

    const result = await fetchList(XWS_URL);
    expect(result).toEqual(xws);
  });
  describe('returns `false`', () => {
    test('if XWS could not be fetched', async () => {
      nock(DOMAIN).get(PATH).reply(500);

      const result = await fetchList(XWS_URL);
      expect(result).toEqual(false);
    });
    test('if the received JSON is not valid XWS', async () => {
      const invalidXws = { foo: 'bar' }; // Missing `pilots` and `faction` fields
      nock(DOMAIN).get(PATH).reply(200, invalidXws);

      const result = await fetchList(XWS_URL);
      expect(result).toEqual(false);
    });
  });
});
