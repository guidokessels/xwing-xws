import XwingListLoader from '../lib/XwingListLoader';

const XWS_URL = 'http://mybuilder.com/path/to/squad.xws';
let mockIntegration;
let mockListFetcher;

beforeEach(() => {
  mockIntegration = {
    matches: jest.fn(() => true),
    getXWSUrl: jest.fn(() => XWS_URL),
  };
  mockListFetcher = jest.fn();
});

describe('constructor()', () => {
  test('throws an error when there are no integrations specified', () =>
    expect(() => new XwingListLoader([], mockListFetcher)).toThrow(
      'Requires at least 1 XWS integration to be configured.'
    ));
  test('throws an error when there is no fetch() method specified', () =>
    expect(() => new XwingListLoader([mockIntegration])).toThrow('Requires a fetch() method.'));
});

describe('#load()', () => {
  describe('throws an error', () => {
    test('when an error occurs fetching the XWS from the integration', () => {
      const error = new Error('<error message>');
      mockListFetcher = jest.fn().mockImplementation(() => {
        throw error;
      });
      const instance = new XwingListLoader([mockIntegration], mockListFetcher);

      return expect(instance.load(XWS_URL)).rejects.toMatchObject(
        new Error('There was an error fetching the list. ' + error)
      );
    });
  });
  describe('returns `false`', () => {
    test('when given an url that cannot be matched to an integration', async () => {
      const mockIntegration = {
        matches: jest.fn(() => false),
      };
      const instance = new XwingListLoader([mockIntegration], mockListFetcher);
      const result = await instance.load('foo.com');

      expect(result).toEqual(false);
    });
    test('when XWS fetching was unsuccessful', async () => {
      mockListFetcher = jest.fn(() => false);
      const instance = new XwingListLoader([mockIntegration], mockListFetcher);
      const result = await instance.load(XWS_URL);

      expect(result).toEqual(false);
    });
  });
  test('stops after finding the first integration that can resolve the url', () => {
    const integration1 = { matches: jest.fn(() => false), getXWSUrl: jest.fn() };
    const integration2 = { matches: jest.fn(() => true), getXWSUrl: jest.fn() };
    const integration3 = { matches: jest.fn(() => true), getXWSUrl: jest.fn() };
    const instance = new XwingListLoader(
      [integration1, integration2, integration3],
      mockListFetcher
    );
    instance.load(XWS_URL);

    expect(integration1.matches).toHaveBeenCalled();
    expect(integration2.matches).toHaveBeenCalled();
    expect(integration3.matches).not.toHaveBeenCalled();
  });
  test('fetches XWS from the integration', async () => {
    const instance = new XwingListLoader([mockIntegration], mockListFetcher);
    instance.load(XWS_URL);

    expect(mockListFetcher).toHaveBeenCalledWith(XWS_URL);
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

    mockListFetcher = jest.fn(() => xws);

    const instance = new XwingListLoader([mockIntegration], mockListFetcher);
    const result = await instance.load(XWS_URL);

    expect(result).toEqual(xws);
  });
});
