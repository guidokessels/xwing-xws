import MetaWing from './MetaWing';

describe('#matches() matches all MetaWing urls', () => {
  test('/squadrons/<id> url', () => {
    const metawing = new MetaWing();
    const url = 'http://meta-wing.com/squadrons/123';

    expect(metawing.matches(url)).toBe(true);
  });
  test('/squad_visualisations/<id> url', () => {
    const metawing = new MetaWing();
    const url = 'http://meta-wing.com/squad_visualizations/4695526';

    expect(metawing.matches(url)).toBe(true);
  });
  test('url without protocol', () => {
    const metawing = new MetaWing();
    const url = 'meta-wing.com/squadrons/123';

    expect(metawing.matches(url)).toBe(true);
  });
});

describe('#getXWSUrl() returns url to xws json', () => {
  test('/squadrons/<id> url', () => {
    const metawing = new MetaWing();
    const url = 'http://meta-wing.com/squadrons/123';
    const result = 'http://meta-wing.com/squadrons/123.json';

    expect(metawing.getXWSUrl(url)).toEqual(result);
  });
  test('/squad_visualizations/<id> url', () => {
    const metawing = new MetaWing();
    const url = 'http://meta-wing.com/squad_visualizations/4695526';
    const result = 'http://meta-wing.com/squadrons/4695526.json';

    expect(metawing.getXWSUrl(url)).toEqual(result);
  });
});
