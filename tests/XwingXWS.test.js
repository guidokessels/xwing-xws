import XwingXWS from '../lib/XwingXWS';

const XWS_URL = 'http://mybuilder.com/path/to/squad.xws';
let mockFetch;
let mockIntegration;

beforeEach(() => {
  mockFetch = jest.fn();
  mockIntegration = {
    matches: jest.fn(() => true),
    getXWSUrl: jest.fn(() => XWS_URL),
  };
});

describe('constructor()', () => {
  test('throws an error when there are no integrations specified', () =>
    expect(() => new XwingXWS([], mockFetch)).toThrow(
      'Requires at least 1 XWS integration to be configured.'
    ));
  test('throws an error when there is no fetch() method specified', () =>
    expect(() => new XwingXWS([mockIntegration])).toThrow(
      'Requires a fetch() method to be defined.'
    ));
});

describe('#fromURL()', () => {
  describe('throws an error', () => {
    test('when an error occurs fetching the XWS from the integration', () => {
      const error = new Error('<error message>');
      mockFetch = jest.fn().mockImplementation(() => {
        throw error;
      });
      const instance = new XwingXWS([mockIntegration], mockFetch);

      return expect(instance.fromUrl(XWS_URL)).rejects.toMatchObject({
        message: 'There was an error fetching the list. ' + error,
      });
    });
  });
  describe('returns `false`', () => {
    test('when given an url that cannot be matched', async () => {
      const mockIntegration = {
        matches: jest.fn(() => false),
      };
      const instance = new XwingXWS([mockIntegration], mockFetch);
      const result = await instance.fromUrl('foo.com');

      expect(result).toEqual(false);
    });
    test('when XWS fetching was unsuccessful', async () => {
      mockFetch = jest.fn().mockImplementation(() => {
        return new Promise((resolve, reject) => {
          resolve({ ok: false });
        });
      });
      const instance = new XwingXWS([mockIntegration], mockFetch);
      const result = await instance.fromUrl(XWS_URL);

      expect(result).toEqual(false);
    });
    test('when received JSON is not valid XWS', async () => {
      const jsonResponse = { foo: 'bar' };
      mockFetch = jest.fn().mockImplementation(() => {
        return new Promise((resolve, reject) => {
          resolve({ ok: true, json: () => jsonResponse });
        });
      });
      const instance = new XwingXWS([mockIntegration], mockFetch);
      const result = await instance.fromUrl(XWS_URL);

      expect(result).toEqual(false);
    });
  });
  test('uses the first integration that can resolve the url', () => {
    const integration1 = { matches: jest.fn(() => false) };
    const integration2 = { matches: jest.fn(() => true) };
    const integration3 = { matches: jest.fn(() => true) };
    const instance = new XwingXWS([integration1, integration2, integration3], mockFetch);
    instance.fromUrl(XWS_URL);

    expect(integration1.matches).toHaveBeenCalled();
    expect(integration2.matches).toHaveBeenCalled();
    expect(integration3.matches).not.toHaveBeenCalled();
  });
  test('fetches XWS from the integration', async () => {
    const instance = new XwingXWS([mockIntegration], mockFetch);
    instance.fromUrl(XWS_URL);

    expect(mockFetch).toHaveBeenCalledWith(XWS_URL);
  });
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

    mockFetch = jest.fn().mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve({ ok: true, json: () => xws });
      });
    });

    const instance = new XwingXWS([mockIntegration], mockFetch);
    const result = await instance.fromUrl(XWS_URL);

    expect(result).toEqual(xws);
  });
});
