import module from '../lib';
import XwingListLoader from '../lib/XwingListLoader';

describe('module', () => {
  test('exports an instance of XwingListLoader', () => {
    expect(module).toBeInstanceOf(XwingListLoader);
  });
  test('has a #fromURl() method', () => {
    expect(module.fromUrl).toBeInstanceOf(Function);
  });
});
