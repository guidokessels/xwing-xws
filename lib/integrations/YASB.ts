import { parse as parseURL } from 'url';
import { Integration } from './Integration';

class YASB implements Integration {
  private regexp = /^(?:https?:\/\/)?geordanr\.github\.io\/xwing\/\?f=.*&d=[^\s]+/;

  matches(input: string) {
    return this.regexp.exec(input) !== null;
  }

  getXWSUrl(input: string) {
    const parsed = parseURL(input);
    return `https://yasb-xws.herokuapp.com/${parsed.search}`;
  }
}

export default YASB;
