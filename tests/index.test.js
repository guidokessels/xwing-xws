import module from '../lib';
import XwingListLoader from '../lib/XwingListLoader';

describe('module', () => {
  test('exports an instance of XwingListLoader', () => {
    expect(module).toBeInstanceOf(XwingListLoader);
  });
  test('has a #load() method', () => {
    expect(module.load).toBeInstanceOf(Function);
  });
});
