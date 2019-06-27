import LaunchBayNext from '../../lib/integrations/LaunchBayNext';

describe('#matches() matches all LBN urls', () => {
  test('/xws url', () => {
    const builder = new LaunchBayNext();
    const url =
      'https://launch-bay-next.herokuapp.com/xws?lbx=(%27New%20Squadron%27.106.2.0.(13.93.(17.251).(2.254).(6.270)))&mode=full';

    expect(builder.matches(url)).toBe(true);
  });
  test('/print url', () => {
    const builder = new LaunchBayNext();
    const url =
      'https://launch-bay-next.herokuapp.com/print?lbx=(%27New%20Squadron%27.106.2.0.(13.93.(17.251).(2.254).(6.270)))&mode=full';

    expect(builder.matches(url)).toBe(true);
  });
  test('url without protocol', () => {
    const builder = new LaunchBayNext();
    const url =
      'launch-bay-next.herokuapp.com/print?lbx=(%27New%20Squadron%27.106.2.0.(13.93.(17.251).(2.254).(6.270)))&mode=full';

    expect(builder.matches(url)).toBe(true);
  });
});

test('#getXWSUrl() returns url to xws endpoint', () => {
  const builder = new LaunchBayNext();
  const url =
    'https://launch-bay-next.herokuapp.com/print?lbx=(%27New%20Squadron%27.106.2.0.(13.93.(17.251).(2.254).(6.270)))&mode=full';
  const result =
    'https://launch-bay-next.herokuapp.com/xws?lbx=(%27New%20Squadron%27.106.2.0.(13.93.(17.251).(2.254).(6.270)))&mode=full';

  expect(builder.getXWSUrl(url)).toEqual(result);
});
