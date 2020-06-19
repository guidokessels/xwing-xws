import { Integration } from './Integration';

class MetaWing implements Integration {
  private regexp = /^(?:https?:\/\/)?meta.listfortress.com\/squadrons\/([0-9]*)/;

  matches(input: string) {
    return this.regexp.exec(input) !== null;
  }

  getXWSUrl(input: string) {
    const matches = this.regexp.exec(input);
    const id = matches![1];
    return `https://meta.listfortress.com/squadrons/${id}.json`;
  }
}

export default MetaWing;
