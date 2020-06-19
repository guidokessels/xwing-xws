import { parse as parseURL } from 'url';
import { Integration } from './Integration';

class LaunchBayNext implements Integration {
  private regexp = /^(?:https?:\/\/)?launch-bay-next\.herokuapp\.com\//;

  matches(input: string) {
    return this.regexp.exec(input) !== null;
  }

  getXWSUrl(input: string) {
    const parsed = parseURL(input);
    return `https://launch-bay-next.herokuapp.com/xws${parsed.search}`;
  }
}

export default LaunchBayNext;
