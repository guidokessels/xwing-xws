import module from '../lib';
import XwingXWS from '../lib/XwingXWS';

describe('module', () => {
  test('exports an instance of XwingXWS', () => {
    expect(module).toBeInstanceOf(XwingXWS);
  });
  test('has a #fromURl() method', () => {
    expect(module.fromUrl).toBeInstanceOf(Function);
  });
});
