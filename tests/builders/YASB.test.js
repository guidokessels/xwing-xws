import YASB from '../../lib/builders/YASB';

describe('#matches() matches all YASB urls', () => {
  test('https url', () => {
    const builder = new YASB();
    const url =
      'https://geordanr.github.io/xwing/?f=Rebel Alliance&d=v4!s!204:27,136,198,148:41:13:;95:27,23,-1,201:14:27:U.202,m.12&sn=Unnamed Squadron&obs=';

    expect(builder.matches(url)).toBe(true);
  });
  test('http url', () => {
    const builder = new YASB();
    const url =
      'http://geordanr.github.io/xwing/?f=Rebel Alliance&d=v4!s!204:27,136,198,148:41:13:;95:27,23,-1,201:14:27:U.202,m.12&sn=Unnamed Squadron&obs=';

    expect(builder.matches(url)).toBe(true);
  });
  test('url without protocol', () => {
    const builder = new YASB();
    const url =
      'geordanr.github.io/xwing/?f=Rebel Alliance&d=v4!s!204:27,136,198,148:41:13:;95:27,23,-1,201:14:27:U.202,m.12&sn=Unnamed Squadron&obs=';

    expect(builder.matches(url)).toBe(true);
  });
});

test('#getXWSUrl() returns url to yasb-xws backend', () => {
  const builder = new YASB();
  const url =
    'https://geordanr.github.io/xwing/?f=Rebel Alliance&d=v4!s!204:27,136,198,148:41:13:;95:27,23,-1,201:14:27:U.202,m.12&sn=Unnamed Squadron&obs=';
  const result =
    'https://yasb-xws.herokuapp.com/?f=Rebel%20Alliance&d=v4!s!204:27,136,198,148:41:13:;95:27,23,-1,201:14:27:U.202,m.12&sn=Unnamed%20Squadron&obs=';

  expect(builder.getXWSUrl(url)).toBe(result);
});
