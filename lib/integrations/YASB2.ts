import { parse as parseURL } from 'url';
import { Integration } from './Integration';

class YASB2 implements Integration {
  private regexp = /^(?:https?:\/\/)?raithos\.github\.io\/\?f=.*&d=[^\s]+/;

  matches(input: string) {
    return this.regexp.exec(input) !== null;
  }

  getXWSUrl(input: string) {
    const parsed = parseURL(input);
    return `https://yasb2-xws.herokuapp.com/${parsed.search}`;
  }
}

export default YASB2;
