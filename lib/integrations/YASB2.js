import { parse as parseURL } from 'url';

class YASB2 {
  regexp = /^(?:https?:\/\/)?raithos\.github\.io\/\?f=.*&d=[^\s]+/;

  matches(input) {
    return this.regexp.exec(input) !== null;
  }

  getXWSUrl(input) {
    const parsed = parseURL(input);
    return `https://yasb2-xws.herokuapp.com/${parsed.search}`;
  }
}

export default YASB2;
