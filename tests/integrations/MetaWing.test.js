import MetaWing from '../../lib/integrations/MetaWing';

describe('#matches() matches all MetaWing urls', () => {
  test('/squadrons url', () => {
    const metawing = new MetaWing();
    const url = 'http://meta-wing.com/squadrons/123';

    expect(metawing.matches(url)).toBe(true);
  });
  test('/squadrons url without protocol', () => {
    const metawing = new MetaWing();
    const url = 'meta-wing.com/squadrons/123';

    expect(metawing.matches(url)).toBe(true);
  });
  test('/squad_visualisations url', () => {
    const metawing = new MetaWing();
    const url = 'http://meta-wing.com/squad_visualizations/4695526';

    expect(metawing.matches(url)).toBe(true);
  });
});

test('#getXWSUrl() returns url to xws json', () => {
  const metawing = new MetaWing();
  const url = 'http://meta-wing.com/squadrons/123';

  // No need to change meta-wing urls as they already
  // point to json files, so input & output is the same
  expect(metawing.getXWSUrl(url)).toEqual(url);
});
