import YASB2 from '../../lib/integrations/YASB2';

describe('#matches() matches all YASB urls', () => {
  test('https url', () => {
    const builder = new YASB2();
    const url =
      'https://raithos.github.io/?f=Scum%20and%20Villainy&d=v4!s!122:-1,-1,-1,-1,164:-1:-1:;132:-1,164,-1:-1:-1:&sn=Variable%20point%20costs!&obs=';

    expect(builder.matches(url)).toBe(true);
  });
  test('http url', () => {
    const builder = new YASB2();
    const url =
      'http://raithos.github.io/?f=Scum%20and%20Villainy&d=v4!s!122:-1,-1,-1,-1,164:-1:-1:;132:-1,164,-1:-1:-1:&sn=Variable%20point%20costs!&obs=';

    expect(builder.matches(url)).toBe(true);
  });
  test('url without protocol', () => {
    const builder = new YASB2();
    const url =
      'raithos.github.io/?f=Scum%20and%20Villainy&d=v4!s!122:-1,-1,-1,-1,164:-1:-1:;132:-1,164,-1:-1:-1:&sn=Variable%20point%20costs!&obs=';

    expect(builder.matches(url)).toBe(true);
  });
});

test('#getXWSUrl() returns url to yasb-xws backend', () => {
  const builder = new YASB2();
  const url =
    'https://raithos.github.io/?f=Scum%20and%20Villainy&d=v4!s!122:-1,-1,-1,-1,164:-1:-1:;132:-1,164,-1:-1:-1:&sn=Variable%20point%20costs!&obs=';
  const result =
    'https://yasb2-xws.herokuapp.com/?f=Scum%20and%20Villainy&d=v4!s!122:-1,-1,-1,-1,164:-1:-1:;132:-1,164,-1:-1:-1:&sn=Variable%20point%20costs!&obs=';

  expect(builder.getXWSUrl(url)).toEqual(result);
});
