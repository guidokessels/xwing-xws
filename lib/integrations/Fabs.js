class Fabs {
  constructor() {
    this.regexp = /^(?:http:\/\/)?x-wing.fabpsb.net\/permalink.php\?sq=([a-z0-9]*)/;
  }

  matches(input) {
    return this.regexp.exec(input) !== null;
  }

  getXWSUrl(input) {
    return `${input}&xws=1`;
  }
}

export default Fabs;
