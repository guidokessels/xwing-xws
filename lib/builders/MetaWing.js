class MetaWing {
  constructor() {
    this.regexp = /^(?:http:\/\/)?meta-wing.com\/(?:squadrons|squad_visualizations)\/([0-9]*)/;
  }

  matches(input) {
    return this.regexp.exec(input) !== null;
  }

  getXWSUrl(input) {
    return input;
  }
}

export default MetaWing;
