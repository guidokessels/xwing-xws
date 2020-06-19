import { Integration } from './Integration';

class Voidstate implements Integration {
  private regexp = /^(?:http:\/\/)?xwing-builder\.co\.uk\/(?:build|view|xws)\/([0-9]*)/;

  matches(input: string) {
    return this.regexp.exec(input) !== null;
  }

  getXWSUrl(input: string) {
    const matches = this.regexp.exec(input);
    const id = matches![1];
    return `http://xwing-builder.co.uk/xws/${id}?raw=1`;
  }
}

export default Voidstate;
