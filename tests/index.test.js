import module from '../lib';
import XwingXWS from '../lib/XwingXWS';

describe('module', () => {
  test('exports an instance of XwingXWS', () => {
    expect(module instanceof XwingXWS).toBe(true);
  });
  test('exports an instance with all builders', () => {
    expect(module._builders.length).toBeTruthy();
  });
  test('exports an instance with fetch', () => {
    expect(module._fetch).toBeInstanceOf(Function);
  });
});
