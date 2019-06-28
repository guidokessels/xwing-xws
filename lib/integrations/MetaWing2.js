class MetaWing {
  constructor() {
    this.regexp = /^(?:https?:\/\/)?meta.listfortress.com\/squadrons\/([0-9]*)/;
  }

  matches(input) {
    return this.regexp.exec(input) !== null;
  }

  getXWSUrl(input) {
    const matches = this.regexp.exec(input);
    const id = matches[1];
    return `https://meta.listfortress.com/squadrons/${id}.json`;
  }
}

export default MetaWing;
