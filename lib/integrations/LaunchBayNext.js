import { parse as parseURL } from 'url';

class LaunchBayNext {
  constructor() {
    this.regexp = /^(?:https?:\/\/)?launch-bay-next\.herokuapp\.com\//;
  }

  matches(input) {
    return this.regexp.exec(input) !== null;
  }

  getXWSUrl(input) {
    const parsed = parseURL(input);
    return `https://launch-bay-next.herokuapp.com/xws${parsed.search}`;
  }
}

export default LaunchBayNext;
