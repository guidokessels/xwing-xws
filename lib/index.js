import fetch from 'node-fetch';

import builders from './builders';

console.log(builders);

export default class XwingXWS {
  async fromUrl(input) {
    const builder = builders.find(builder => builder.matches(input));

    if (!builder) {
      throw new Error('Could not detect builder from input.');
    }

    try {
      const xwsUrl = builder.getXWSUrl(input);
      const response = await fetch(xwsUrl);
      return await response.json();
    } catch (err) {
      throw new Error('Could not fetch list from ', err);
    }
  }
}
