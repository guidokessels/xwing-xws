import MetaWing2 from '../../lib/integrations/MetaWing2';

describe('#matches() matches all MetaWing2 urls', () => {
  test('/squadrons/<id> url', () => {
    const metawing2 = new MetaWing2();
    const url = 'https://meta.listfortress.com/squadrons/123';

    expect(metawing2.matches(url)).toBe(true);
  });
  test('/squadrons/<id>.json url', () => {
    const metawing2 = new MetaWing2();
    const url = 'https://meta.listfortress.com/squadrons/123.json';

    expect(metawing2.matches(url)).toBe(true);
  });
  test('url without protocol', () => {
    const metawing2 = new MetaWing2();
    const url = 'meta.listfortress.com/squadrons/123';

    expect(metawing2.matches(url)).toBe(true);
  });
});

describe('#getXWSUrl() returns url to xws json', () => {
  test('for /squadrons/<id> url', () => {
    const metawing2 = new MetaWing2();
    const url = 'https://meta.listfortress.com/squadrons/123';
    const result = 'https://meta.listfortress.com/squadrons/123.json';

    expect(metawing2.getXWSUrl(url)).toEqual(result);
  });
  test('for /squadrons/<id>.json url', () => {
    const metawing2 = new MetaWing2();
    const url = 'https://meta.listfortress.com/squadrons/123.json';
    const result = 'https://meta.listfortress.com/squadrons/123.json';

    expect(metawing2.getXWSUrl(url)).toEqual(result);
  });
});
