import Voidstate from '../../lib/builders/Voidstate';

describe('#matches() matches all Voidstate urls', () => {
  test('/view/<id> url', () => {
    const builder = new Voidstate();
    const url = 'http://xwing-builder.co.uk/view/710293/side-event';

    expect(builder.matches(url)).toBe(true);
  });
  test('/xws/<id> url', () => {
    const builder = new Voidstate();
    const url = 'http://xwing-builder.co.uk/xws/710293#view=full';

    expect(builder.matches(url)).toBe(true);
  });
  test('/build/<id> url', () => {
    const builder = new Voidstate();
    const url = 'http://xwing-builder.co.uk/build/710293';

    expect(builder.matches(url)).toBe(true);
  });
  test('url without protocol', () => {
    const builder = new Voidstate();
    const url = 'xwing-builder.co.uk/build/710293';

    expect(builder.matches(url)).toBe(true);
  });
});

test('#getXWSUrl() returns url to xws json', () => {
  const builder = new Voidstate();
  const url = 'http://xwing-builder.co.uk/xws/710293#view=full';
  const result = 'http://xwing-builder.co.uk/xws/710293?raw=1';

  expect(builder.getXWSUrl(url)).toEqual(result);
});
