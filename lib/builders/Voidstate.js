class Voidstate {
  constructor() {
    this.regexp = /^(?:http:\/\/)?xwing-builder\.co\.uk\/(?:build|view|xws)\/([0-9]*)/;
  }

  matches(input) {
    return this.regexp.exec(input) !== null;
  }

  getXWSUrl(input) {
    const matches = this.regexp.exec(input);
    const id = matches[1];
    return `http://xwing-builder.co.uk/xws/${id}?raw=1`;
  }
}

export default Voidstate;
