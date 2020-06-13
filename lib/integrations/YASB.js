import { parse as parseURL } from 'url';

class YASB {
  regexp = /^(?:https?:\/\/)?geordanr\.github\.io\/xwing\/\?f=.*&d=[^\s]+/;

  matches(input) {
    return this.regexp.exec(input) !== null;
  }

  getXWSUrl(input) {
    const parsed = parseURL(input);
    return `https://yasb-xws.herokuapp.com/${parsed.search}`;
  }
}

export default YASB;
