import Fabs from '../../lib/builders/Fabs';

describe('#matches() matches all Fabs urls', () => {
  test('http url', () => {
    const builder = new Fabs();
    const url = 'http://x-wing.fabpsb.net/permalink.php?sq=r10a6n1o1r10a6o1r10a6o1';

    expect(builder.matches(url)).toBe(true);
  });
  test('url without protocol', () => {
    const builder = new Fabs();
    const url = 'x-wing.fabpsb.net/permalink.php?sq=r10a6n1o1r10a6o1r10a6o1';

    expect(builder.matches(url)).toBe(true);
  });
});

test('#getXWSUrl() returns url to xws json', () => {
  const builder = new Fabs();
  const url = 'http://x-wing.fabpsb.net/permalink.php?sq=r10a6n1o1r10a6o1r10a6o1';
  const result = 'http://x-wing.fabpsb.net/permalink.php?sq=r10a6n1o1r10a6o1r10a6o1&xws=1';

  expect(builder.getXWSUrl(url)).toEqual(result);
});
