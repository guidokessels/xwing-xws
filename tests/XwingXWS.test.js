import defaultExport, { XwingXWS } from '../lib';

const YASB_URL =
  'http://geordanr.github.io/xwing/?f=Rebel%20Alliance&d=v4!s!204:27,136,198,148:41:13:;95:27,23,-1,201:14:27:U.202,m.12&sn=Unsaved%20Squadron&obs=';

test('exports a instance with all builders', () => {
  expect(defaultExport instanceof XwingXWS).toBe(true);
  expect(defaultExport._builders.length).toBeTruthy();
});

describe('#fromURL()', () => {
  describe('throws an error', () => {
    test('when there are no builders to resolve the url', () => {
      const instance = new XwingXWS([]);
      return expect(instance.fromUrl(YASB_URL)).rejects.toMatchObject({
        message: 'URL does not point to a known builder.',
      });
    });
    test('when given an url that cannot be matched to a builder', () => {
      return expect(defaultExport.fromUrl('foo.com')).rejects.toMatchObject({
        message: 'URL does not point to a known builder.',
      });
    });
    test('when XWS cannot be fetched from the builder', () => {
      const error = new Error('Error from builder');
      const mockBuilder = {
        matches: jest.fn(() => true),
        getXWSUrl: jest.fn(() => {
          throw error;
        }),
      };
      const instance = new XwingXWS([mockBuilder]);
      return expect(instance.fromUrl(YASB_URL)).rejects.toMatchObject({
        message: 'There was an error fetching the list: ' + error,
      });
    });
  });
  test('uses the first builder that can resolve the url', () => {
    const mockBuilder1 = {
      matches: jest.fn(() => false),
    };
    const mockBuilder2 = {
      matches: jest.fn(() => true),
    };
    const mockBuilder3 = {
      matches: jest.fn(() => true),
    };
    const instance = new XwingXWS([mockBuilder1, mockBuilder2, mockBuilder3]);
    instance.fromUrl(YASB_URL);

    expect(mockBuilder1.matches).toHaveBeenCalled();
    expect(mockBuilder2.matches).toHaveBeenCalled();
    expect(mockBuilder3.matches).not.toHaveBeenCalled();
  });
  test('fetches XWS from the builder', () => {
    const fetch = jest.fn();
    const mockBuilder = {
      matches: jest.fn(() => true),
      getXWSUrl: jest.fn(() => 'http://mybuilder.com/path/to/squad.xws'),
    };
    const instance = new XwingXWS([mockBuilder], fetch);
    instance.fromUrl(YASB_URL);

    expect(fetch).toHaveBeenCalledWith('http://mybuilder.com/path/to/squad.xws');
  });
});
