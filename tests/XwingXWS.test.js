import XwingXWS from '../lib/XwingXWS';

const XWS_URL = 'http://mybuilder.com/path/to/squad.xws';

describe('#fromURL()', () => {
  describe('throws an error', () => {
    test('when there are no integrations to resolve the url', () => {
      const instance = new XwingXWS([]);
      return expect(instance.fromUrl(XWS_URL)).rejects.toMatchObject({
        message: 'URL does not point to a known XWS integration.',
      });
    });
    test('when given an url that cannot be matched', () => {
      const mockBuilder = {
        matches: jest.fn(() => false),
      };
      const instance = new XwingXWS([mockBuilder]);
      return expect(instance.fromUrl('foo.com')).rejects.toMatchObject({
        message: 'URL does not point to a known XWS integration.',
      });
    });
    test('when XWS cannot be fetched from the integration', () => {
      const error = new Error('Error from integration');
      const mockIntegration = {
        matches: jest.fn(() => true),
        getXWSUrl: jest.fn(() => {
          throw error;
        }),
      };
      const instance = new XwingXWS([mockIntegration]);
      return expect(instance.fromUrl(XWS_URL)).rejects.toMatchObject({
        message: 'There was an error fetching the list: ' + error,
      });
    });
  });
  test('uses the first integration that can resolve the url', () => {
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
    instance.fromUrl(XWS_URL);

    expect(mockBuilder1.matches).toHaveBeenCalled();
    expect(mockBuilder2.matches).toHaveBeenCalled();
    expect(mockBuilder3.matches).not.toHaveBeenCalled();
  });
  test('fetches XWS from the integration', () => {
    const mockFetch = jest.fn();
    const mockBuilder = {
      matches: jest.fn(() => true),
      getXWSUrl: jest.fn(() => XWS_URL),
    };
    const instance = new XwingXWS([mockBuilder], mockFetch);
    instance.fromUrl(XWS_URL);

    expect(mockFetch).toHaveBeenCalledWith(XWS_URL);
  });
});
