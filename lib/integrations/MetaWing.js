class MetaWing {
  constructor() {
    this.regexp = /^(?:http:\/\/)?meta-wing.com\/(?:squadrons|squad_visualizations)\/([0-9]*)/;
  }

  matches(input) {
    return this.regexp.exec(input) !== null;
  }

  getXWSUrl(input) {
    const matches = this.regexp.exec(input);
    const id = matches[1];
    return `http://meta-wing.com/squadrons/${id}.json`;
  }
}

export default MetaWing;
