import MetaWing from '../../lib/builders/MetaWing';

describe('#matches() matches all MetaWing urls', () => {
  test('http url', () => {
    const builder = new MetaWing();
    const url = 'http://meta-wing.com/squadrons/123';

    expect(builder.matches(url)).toBe(true);
  });
  test('url without protocol', () => {
    const builder = new MetaWing();
    const url = 'meta-wing.com/squadrons/123';

    expect(builder.matches(url)).toBe(true);
  });
});

test('#getXWSUrl() returns url to xws json', () => {
  const builder = new MetaWing();
  const url = 'http://meta-wing.com/squadrons/123';

  // No need to change meta-wing urls as they already
  // point to json files, so input & output is the same
  expect(builder.getXWSUrl(url)).toBe(url);
});
