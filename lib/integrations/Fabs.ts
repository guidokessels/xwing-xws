import { Integration } from './Integration';

class Fabs implements Integration {
  private regexp = /^(?:http:\/\/)?x-wing.fabpsb.net\/permalink.php\?sq=([a-z0-9]*)/;

  matches(input: string) {
    return this.regexp.exec(input) !== null;
  }

  getXWSUrl(input: string) {
    return `${input}&xws=1`;
  }
}

export default Fabs;
