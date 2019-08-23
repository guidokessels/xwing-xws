import FFG from '../../lib/integrations/FFG';

describe('#matches() matches all FFG urls', () => {
  test('/squad-preview/<id> url', () => {
    const builder = new FFG();
    const url =
      'https://squadbuilder.fantasyflightgames.com/squad-preview/6dfb3954-2e9b-43e5-87e7-4660ee1e2492';

    expect(builder.matches(url)).toBe(true);
  });
  test('/saved-squads/<id> url', () => {
    const builder = new FFG();
    const url =
      'https://squadbuilder.fantasyflightgames.com/saved-squads/6dfb3954-2e9b-43e5-87e7-4660ee1e2492';

    expect(builder.matches(url)).toBe(true);
  });
  test('/saved-squads/<id>/share url', () => {
    const builder = new FFG();
    const url =
      'https://squadbuilder.fantasyflightgames.com/saved-squads/6dfb3954-2e9b-43e5-87e7-4660ee1e2492/share';

    expect(builder.matches(url)).toBe(true);
  });
  test('url without protocol', () => {
    const builder = new FFG();
    const url =
      'squadbuilder.fantasyflightgames.com/squad-preview/6dfb3954-2e9b-43e5-87e7-4660ee1e2492';

    expect(builder.matches(url)).toBe(true);
  });
});

test('#getXWSUrl() returns url to xws json', () => {
  const builder = new FFG();
  const url =
    'https://squadbuilder.fantasyflightgames.com/squad-preview/6dfb3954-2e9b-43e5-87e7-4660ee1e2492/share';
  const result = 'http://sb2xws.herokuapp.com/translate/6dfb3954-2e9b-43e5-87e7-4660ee1e2492';

  expect(builder.getXWSUrl(url)).toEqual(result);
});
